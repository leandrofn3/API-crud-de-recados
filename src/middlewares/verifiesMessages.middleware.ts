import { NextFunction, Request, Response } from "express";
import repository from "../database/prisma.database";

async function verifiesMessagesID(req: Request, res: Response, next: NextFunction) {
    try {
        const { idMessage } = req.params;

    const message = await repository.messages.findUnique({
        where: {
            idMessage: idMessage,
        }
    });

    console.log(`esse e o message: ${message}`)

        if (!message || message === null) {
            return res.status(404).send({
                ok: false,
                message: "Message not found!"
            });
        };

        next()

    } catch (error: any) {
        res.status(500).send({
            ok: false,
            message: error.toString()
        });
    };
};

export default verifiesMessagesID;