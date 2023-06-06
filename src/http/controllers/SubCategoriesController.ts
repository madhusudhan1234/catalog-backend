import { validate } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { AppDataSource } from "../../database/data-source";
import { SubCategory } from "../../database/entities/SubCategory";
import { SubCategoryDTO } from "../dtos/SubcategoryDTO";

export class SubCategoriesController {
  async get(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(SubCategory)
      .createQueryBuilder()
      .orderBy("id", "DESC");
    const { records: categories, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );
    return ResponseUtil.sendResponse(
      res,
      "Fetched subcategories successfully",
      categories,
      paginationInfo
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const subCategoryData = req.body;
    const dto = new SubCategoryDTO();
    Object.assign(dto, subCategoryData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(SubCategory);
    const subCategory = repo.create(subCategoryData);

    await repo.save(subCategory);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new category",
      subCategory,
      200
    );
  }

  async getDetail(req: Request, res: Response) {
    const subcategoryId = req.params.id;

    const subCategory = await AppDataSource.getRepository(SubCategory)
      .createQueryBuilder("subCategory")
      .leftJoinAndSelect("subCategory.products", "product")
      .leftJoinAndSelect("subCategory.category", "category")
      .where("subCategory.id = :id", { id: subcategoryId })
      .getOneOrFail();

    return ResponseUtil.sendResponse(
      res,
      "Successfully fetched category",
      subCategory,
      200
    );
  }
}
