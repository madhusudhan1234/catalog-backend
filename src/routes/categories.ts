import express from "express";
import { CategoriesController } from "../http/controllers/CategoriesController";
import { AuthMiddleware } from "../http/middlewares/AuthMiddleware";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";

const router = express.Router();

const catagoryController = new CategoriesController();

router.get("/", ErrorHandler.catchErrors(catagoryController.get));
router.post(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(catagoryController.create)
);

export default router;
