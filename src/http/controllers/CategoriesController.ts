import { validate } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { AppDataSource } from "../../database/data-source";
import { Category } from "../../database/entities/Category";
import { CategoryDTO } from "../dtos/CategoryDTO";

export class CategoriesController {
  async get(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Category)
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.subcategories", "subcategory")
      .orderBy("category.id", "DESC");

    const { records: categories, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );

    return ResponseUtil.sendResponse(
      res,
      "Fetched categories successfully",
      categories,
      paginationInfo
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const categoryData = req.body;

    const dto = new CategoryDTO();
    Object.assign(dto, categoryData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Category);
    const category = repo.create(categoryData);

    await repo.save(category);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new category",
      category,
      200
    );
  }
}
