import express from "express";
import { ProductsController } from "../http/controllers/ProductsController";
import { AuthMiddleware } from "../http/middlewares/AuthMiddleware";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";

const router = express.Router();

const productController = new ProductsController();

router.get("/", ErrorHandler.catchErrors(productController.get));
router.post(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(productController.create)
);
router.get("/:id", ErrorHandler.catchErrors(productController.show));

export default router;
