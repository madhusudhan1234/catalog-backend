import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { ErrorHandler } from "./http/middlewares/ErrorHandler";
import authRoute from "./routes/auth";
import categoryRoute from "./routes/categories";
import imagesRoute from "./routes/images";
import productRoute from "./routes/products";
import subCategoryRoute from "./routes/subcategories";
import subscriberRoute from "./routes/subscribers";
const path = require("path");

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: process.env.BASEURL,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/images", imagesRoute);
app.use("/categories", categoryRoute);
app.use("/subcategories", subCategoryRoute);
app.use("/subscribers", subscriberRoute);
app.use("/products", productRoute);
app.use("/auth", authRoute);
app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Invalid Route",
  });
});

// Define a middleware function to handle the errors
app.use(ErrorHandler.handleErrors);

export default app;
