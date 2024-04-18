import { Request, Response } from "express";
import MessageService from "../services/message.service";


export class MessageController {
    public async create(req: Request, res: Response) {
        try {
            const {title, description, idUser} = req.body;

            const result = await MessageService.create({
                title,
                description,
                idUser
            });

            return res.status(result.code).send(result);
            
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

    public async index(req: Request, res: Response) {
        try {
            const result = await MessageService.findAll();

            return res.status(result.code).send(result);

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

    public async show(req: Request, res: Response) {
        try {

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

    public async update(req: Request, res: Response) {
        try {

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

    public async delete(req: Request, res: Response) {
        try {

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };
}