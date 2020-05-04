import { Router } from "express";
import { checkJwt } from "../middlewares/check-jwt";
import ProductController from "../controllers/product-controller";

const productRouter = Router();

productRouter.get("/list-product", [checkJwt], ProductController.getListProduct);

export default productRouter;
