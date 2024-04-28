import { NextFunction, Request, Response } from "express";

async function createUserMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, userName, email, password } = req.body;

        if (name === "" || userName === "" || email === "" || password === "") {
            return res.status(404).send({
                ok: false,
                message: "All fields must be filled in!"
            });
        };

        next()

    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: error.toString()
        });
    }
};

export default createUserMiddleware;