import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send({
                code: 401,
                message: "Authentication token fail! 1"
            });
        };

        const user = await userService.getByToken(token);

        if (!user) {
            return res.status(401).send({
                code: 401,
                message: "Authentication token fail! 2"
            });
        }

        req.body.idUser = user.idUser;

        next();

    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: error.toString()
        });
    };
};

export default authMiddleware;