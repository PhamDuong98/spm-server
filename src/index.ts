import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import * as multer from "multer";
import "reflect-metadata";
import { createConnection } from "typeorm";
import api from "./api";
import { processResponse } from "./api/middlewares/process-response";

createConnection().then(async (connection) => {

    const app = express();
    const upload = multer();

    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
        res.send({
            message: "Hi there, test done"
        });
    });

    app.use("/api/v1", upload.none(), [processResponse], api);

    app.listen(3000);

    console.log("Express server has started on port 3000.");

}).catch((error) => console.log(error));
