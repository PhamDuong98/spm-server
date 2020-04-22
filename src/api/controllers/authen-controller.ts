import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user";
import config from "../config/config";

class AuthenController {
    public static login = async (req: Request, res: Response) => {
        try {
            // Check if username and password are set
            const username = req.body.username;
            const password = req.body.password;

            if (username === undefined || password === undefined) {
                res.status(400).send({
                    message: "Cannot find username or password parameter"
                });
                return;
            }

            const userRepository = getRepository(User);
            const user = await userRepository.createQueryBuilder("user")
                .where("user.username = :username", { username })
                .addSelect("user.encryptedPassword")
                .getOne();
            if (!user) {
                res.status(401).send({
                    message: "Authentication failed, wrong username or password"
                });
                return;
            }

            // Check if encrypted password match
            if (!bcrypt.compareSync(password, user.encryptedPassword)) {
                res.status(401).send({
                    message: "Authentication failed, wrong username or password"
                });
                return;
            }

            // Generate JWT
            const token = jwt.sign(
                { username: user.username },
                config.jwtSecret,
                { algorithm: "HS512" }
            );

            // important - remove encrypted password before send to client
            delete user.encryptedPassword;

            // Send the jwt in the response
            res.send({ token, user });
        } catch (error) {
            res.status(500).send({});
        }
    }
}

export default AuthenController;
