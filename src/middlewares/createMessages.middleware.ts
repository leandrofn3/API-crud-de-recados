import { NextFunction, Request, Response } from "express";

async function createMessageMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const {  title, description, idUser} = req.body;

        if (! title || !description || !idUser || title === "" || description === "" || idUser === "") {
            return res.status(400).send({
                ok: false,
                message: "All fields must be filled in!"
            });
        };

        next();

    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: error.toString()
        });
    };
};

export default createMessageMiddleware;