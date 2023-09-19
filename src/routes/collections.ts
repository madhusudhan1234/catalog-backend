import express from "express";
import { CollectionController } from "../http/controllers/CollectionController";
import { AuthMiddleware } from "../http/middlewares/AuthMiddleware";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";

const router = express.Router();

const collectionController = new CollectionController();

router.get("/", ErrorHandler.catchErrors(collectionController.get));
router.post(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(collectionController.create)
);
router.get("/:id", ErrorHandler.catchErrors(collectionController.getDetail));

export default router;
