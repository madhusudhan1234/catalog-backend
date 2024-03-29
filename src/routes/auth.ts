import express from "express";
import { AuthController } from "../http/controllers/AuthController";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";

const router = express.Router();

const authController = new AuthController();

router.post(
  "/register",
  // ErrorHandler.catchErrors(AuthMiddleware.authenticate),
  ErrorHandler.catchErrors(authController.register)
);
router.post("/login", ErrorHandler.catchErrors(authController.login));
router.get("/me", ErrorHandler.catchErrors(authController.me));

export default router;
