import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import config from "../config/config";
import { User } from "../entity/user";

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    // Get the jwt token from the head
    const token = req.headers.authorization as string;

    let jwtPayload: any;
    // Try to validate the token and get data
    try {
        jwtPayload = (jwt.verify(token, config.jwtSecret) as any);
    } catch (error) {
        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({
            message: "Authentication failed, JWT not valid"
        });
        return;
    }

    // Get user from database
    const userRepository = getRepository(User);
    const user = await userRepository.createQueryBuilder("user")
        .addSelect("user.encryptedPassword")
        .where("user.username = :username", { username: jwtPayload.username })
        .getOne();

    if (!user) {
        res.status(401).send({
            message: "Authentication failed, cannot find user"
        });
        return;
    }

    res.locals.user = user;

    // Call the next middleware or controller
    next();
};
