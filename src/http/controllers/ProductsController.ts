import { validate } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { AppDataSource } from "../../database/data-source";
import { Product } from "../../database/entities/Product";
import { ProductDTO } from "../dtos/ProductDTO";
const url = require("url");

export class ProductsController {
  async get(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Product)
      .createQueryBuilder()
      .orderBy("id", "DESC");

    const { records: products, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );

    return ResponseUtil.sendResponse(
      res,
      "Fetched products successfully",
      products,
      paginationInfo
    );
  }

  async show(req: Request, res: Response): Promise<Response> {
    const productId = req.params.id;

    const product = await AppDataSource.getRepository(Product)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.images", "image")
      .leftJoinAndSelect("product.subCategory", "subcategory")
      .where("product.id = :id", { id: productId })
      .getOneOrFail();

    const imagesWithFullUrls = product?.images?.map((image) => {
      const fullUrl = url.format({
        protocol: "https",
        host: req.get("host"),
        pathname: `/uploads/images/${image.name}`,
      });

      return {
        ...image,
        image: fullUrl,
      };
    });

    product.images = imagesWithFullUrls;

    if (!product) {
      throw new Error("Product not found");
    }

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new category",
      product,
      200
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const productData = req.body;

    const dto = new ProductDTO();
    Object.assign(dto, productData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Product);
    const product = repo.create(productData);

    await repo.save(product);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new product.",
      product,
      200
    );
  }
}
