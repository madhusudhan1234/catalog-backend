import express from "express";
import { SubscribersController } from "../http/controllers/SubscribersController";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";

const router = express.Router();

const subscribersController = new SubscribersController();

router.get("/", ErrorHandler.catchErrors(subscribersController.get));
router.post("/", ErrorHandler.catchErrors(subscribersController.create));

export default router;
