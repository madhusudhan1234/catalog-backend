import express from "express";
import { CategoriesController } from "../http/controllers/CategoriesController";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";

const router = express.Router();

const catagoryController = new CategoriesController();

router.get("/", ErrorHandler.catchErrors(catagoryController.get));
router.post("/", ErrorHandler.catchErrors(catagoryController.create));

export default router;
