import * as express from "express";
import AuthenController from "./controllers/authen-controller";
const api = express();

// config router authen
api.post("/login", AuthenController.login);

// api.use('/users', userRouter);
// api.use('/reports', reportFormRouter);
// api.use('/customers', customerRouter);

export default api;
