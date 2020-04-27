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
            const allProducts = await productRepository.createQueryBuilder("product")
                .leftJoinAndSelect("product.unit", "unit")
                .leftJoinAndSelect("product.category", "category")
                .getMany();
            for (const prod of allProducts) {
                prod["unitName"] = prod.unit.name;
                delete prod.unit;
                prod["categoryName"] = prod.category.name;
                delete prod.category;
            }

            const user: any = res.locals.user;

            res.send({ allProducts, user });
        } catch (error) {
            res.status(500).send({});
        }
    }
}

export default ProductController;
