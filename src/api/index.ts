import * as express from "express";
import AuthenController from "./controllers/authen-controller";
import productRouter from "./routers/product-router";
const api = express();

// config router authen
api.post("/login", AuthenController.login);

api.use("/products", productRouter);

export default api;
