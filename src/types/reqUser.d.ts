import { Request } from "express"

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            idUser: string,
            name: string,
            email: string,
            iat: number
        }
    };
};