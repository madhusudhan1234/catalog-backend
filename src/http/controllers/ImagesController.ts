import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { AppDataSource } from "../../database/data-source";
import { Image } from "../../database/entities/Image";
import { Product } from "../../database/entities/Product";
import { ProductImage } from "../../database/entities/ProductImage";
const url = require("url");

export class ImagesController {
  async getImages(req: Request, res: Response) {
    const search = req.query.search?.toString();

    const builder = await AppDataSource.getRepository(Image)
      .createQueryBuilder()
      .orderBy("id", "DESC");

    if (search) {
      builder.where("LOWER(title) ILIKE :search", {
        search: `%${search.toLowerCase()}%`,
      });
    }

    const { records: images, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );

    const imagesWithFullUrls = images.map((image) => {
      const fullUrl = url.format({
        protocol: req.protocol,
        host: req.get("host"),
        pathname: `/uploads/images/${image.image}`,
      });

      return {
        ...image,
        image: fullUrl,
      };
    });

    return ResponseUtil.sendResponse(
      res,
      "Fetched images successfully",
      imagesWithFullUrls,
      paginationInfo
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const productId = req.body.productId;

    const productRepository = AppDataSource.getRepository(Product);
    const imageProductRepository = AppDataSource.getRepository(ProductImage);
    const product = await productRepository
      .createQueryBuilder("products")
      .where("products.id = :id", { id: productId })
      .getOne();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const images = req.files as Express.Multer.File[];

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    const imageRepository = AppDataSource.getRepository(Image);

    const imageEntities = images.map((image) =>
      imageRepository.create({
        name: image.filename,
      })
    );

    const savedImages = await imageRepository.save(imageEntities);
    await Promise.all(
      savedImages.map(async (image) => {
        const imageSubcategory = imageProductRepository.create({
          imageId: image.id,
          productId: productId,
        });
        await imageProductRepository.save(imageSubcategory);
      })
    );

    return ResponseUtil.sendResponse(
      res,
      "Successfully added new image",
      [],
      200
    );
  }
}
