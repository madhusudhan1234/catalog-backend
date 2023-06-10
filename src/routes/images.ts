import express from "express";
import { ImagesController } from "../http/controllers/ImagesController";
import { AuthMiddleware } from "../http/middlewares/AuthMiddleware";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import { FileUploader } from "../http/middlewares/FileUploader";

const router = express.Router();

const imagesController = new ImagesController();

router.get("/", ErrorHandler.catchErrors(imagesController.getImages));
router.post(
  "/",
  ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  FileUploader.upload("image", "images", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(imagesController.create)
);

export default router;
