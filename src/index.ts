import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import api from './api';

createConnection().then(async (connection) => {

    const app = express();

    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.send({
            message: 'Hi there, test done'
        });
    });

    app.use('/api/v1', api);

    app.listen(3000);

    console.log('Express server has started on port 3000.');

}).catch((error) => console.log(error));
