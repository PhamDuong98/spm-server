import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user";
import config from "../config/config";
import { Product } from "../entity/product";

class ProductController {
    public static getAll = async (req: Request, res: Response) => {
        try {
            const productRepository = getRepository(Product);
            const allProducts = await productRepository.find();

            const user: any = res.locals.user;

            res.send({ allProducts, user });
        } catch (error) {
            res.status(500).send({});
        }
    }
}

export default ProductController;
