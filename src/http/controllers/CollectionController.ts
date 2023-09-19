import { validate } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { AppDataSource } from "../../database/data-source";
import { Collection } from "../../database/entities/Collection";
import { CollectionDTO } from "../dtos/CollectionDTO";

export class CollectionController {
  async get(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Collection)
      .createQueryBuilder()
      .orderBy("id", "DESC");
    const { records: collections, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );
    return ResponseUtil.sendResponse(
      res,
      "Fetched collections successfully",
      collections,
      paginationInfo
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const collectionData = req.body;
    const dto = new CollectionDTO();
    Object.assign(dto, collectionData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Collection);
    const collection = repo.create(collectionData);

    await repo.save(collection);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new collection",
      collection,
      200
    );
  }

  async getDetail(req: Request, res: Response) {
    const collectionId = req.params.id;

    const collection = await AppDataSource.getRepository(Collection)
      .createQueryBuilder("collection")
      .leftJoinAndSelect("collection.products", "product")
      .where("collection.id = :id", { id: collectionId })
      .getOneOrFail();

    return ResponseUtil.sendResponse(
      res,
      "Successfully fetched collection",
      collection,
      200
    );
  }
}
