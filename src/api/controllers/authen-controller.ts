import { Request, Response } from 'express';

class AuthenController {
    public static login = async (req: Request, res: Response) => {
        console.log('sadasdasdsad');
        try {
            res.send({
                asdadas: "sadasdsd"
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "error"
            });
        }
    }
}

export default AuthenController;
