import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user";
import config from "../config/config";
import { Product } from "../entity/product";

class ProductController {
    public static getListProduct = async (req: Request, res: Response) => {
        try {
            const pageIndex = req.query.pageIndex;
            const pageSize = req.query.pageSize;

            const productRepository = getRepository(Product);
            const allProducts = await productRepository.createQueryBuilder("product")
                .leftJoinAndSelect("product.unit", "unit")
                .leftJoinAndSelect("product.category", "category")
                .orderBy("product.id", "ASC")
                .skip(+pageIndex * +pageSize)
                .take(+pageSize)
                .getMany();
            for (const prod of allProducts) {
                prod["unitName"] = prod.unit.name;
                delete prod.unit;
                prod["categoryName"] = prod.category.name;
                delete prod.category;
            }

            const count = await productRepository.createQueryBuilder("product").getCount();

            res.send({ allProducts, count });
        } catch (error) {
            console.log(error);
            res.status(500).send({});
        }
    }
}

export default ProductController;
