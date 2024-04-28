import { NextFunction, Request, Response } from "express";
import repository from "../database/prisma.database";

async function verifiesUserID(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        if (id === "" || !id) {
            return res.status(404).send({
                ok: false,
                message: "The ID must be passed!"
            });
        }

        const user = await repository.user.findUnique({
            where: {
                idUser: id
            }
        });

        if (!user || user === null) {
            return res.status(404).send({
                ok: false,
                message: "User not found!"
            });
        }

        next()

    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: error.toString()
        });
    }
};

export default verifiesUserID;