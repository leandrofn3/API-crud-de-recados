import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers["authorization"];

        if (!authorization) {
            return res.status(401).send({
                code: 401,
                message: "Check your email or password!"
            });
        }

        jwt.verify(authorization, process.env.JWT_SECRET || "", (error: any, user: any ) => {
            if (error) {
                return res.status(403).send({
                    code: 403,
                    message: "Invalid or expired token!"
                });
            }
            req.user = user;
            req.body.idUser = user.idUser;
            next();
        });

    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: error.toString()
        });
    };
};

export default authMiddleware;