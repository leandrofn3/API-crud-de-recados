import { NextFunction, Request, Response } from "express";

async function createMessageMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const {  title, description, idUser} = req.body;

        console.log(`esse e o titulo: ${title}`)
        console.log(`essa e a descrição: ${description}`)
        console.log(`esse e o idUser: ${idUser}`)

        if (! title || !description || !idUser || title === "" || description === "" || idUser === "") {
            return res.status(404).send({
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