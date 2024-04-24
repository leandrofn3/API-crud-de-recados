import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).send({
                ok: false,
                message: "Authentication token fail!"
            });
        };

        const user = await userService.getByToken(token as string);

        if(!user){
            return res.status(401).send({
                ok: false,
                message: "Authentication token fail!"
            });
        }

        next();

    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: error.toString()
        });
    };
};

export default authMiddleware;