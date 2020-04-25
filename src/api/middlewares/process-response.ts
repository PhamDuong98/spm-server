import { Request, Response, NextFunction } from "express";

export const processResponse = async (req: Request, res: Response, next: NextFunction) => {
    const json = res.json;

    res.json = (object): any => {
        const timestamp = new Date().toISOString();
        const statusCode = res.statusCode;
        let statusMessage: string;
        switch (statusCode) {
            case 200:
                statusMessage = "OK";
                break;
            case 201:
                statusMessage = "Created";
                break;
            case 202:
                statusMessage = "Accepted";
                break;
            case 400:
                statusMessage = "Bad Request";
                break;
            case 401:
                statusMessage = "Unauthorized";
                break;
            case 403:
                statusMessage = "Forbidden";
                break;
            case 404:
                statusMessage = "Not Found";
                break;
            case 409:
                statusMessage = "Conflict";
                break;
            case 500:
                statusMessage = "Internal Server Error";
                break;
            default:
                statusMessage = "Unknown";
        }

        object = {
            timestamp,
            statusCode,
            statusMessage,
            data: object
        };
        json.call(res, object);
    };

    // Call the next middleware or controller
    next();
};
