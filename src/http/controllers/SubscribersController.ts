import { validate } from "class-validator";
import { Request, Response } from "express";
import { ResponseUtil } from "../../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { AppDataSource } from "../../database/data-source";
import { Subscriber } from "../../database/entities/Subscriber";
import { SubscriberDTO } from "../dtos/SubscriberDTO";

export class SubscribersController {
  async get(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Subscriber)
      .createQueryBuilder()
      .orderBy("id", "DESC");
    const { records: subscribers, paginationInfo } = await Paginator.paginate(
      builder,
      req
    );

    return ResponseUtil.sendResponse(
      res,
      "Fetched subscribers successfully",
      subscribers,
      paginationInfo
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const subscriberData = req.body;

    const dto = new SubscriberDTO();
    Object.assign(dto, subscriberData);

    const errors = await validate(dto);
    if (errors.length > 0) {
      return ResponseUtil.sendError(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Subscriber);
    const subscriber = repo.create(subscriberData);

    await repo.save(subscriber);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new category",
      subscriber,
      200
    );
  }
}
