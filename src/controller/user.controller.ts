import { Request, Response } from "express";
import UserService from "../services/user.service";
import userService from "../services/user.service";

class UserController {

    public async create(req: Request, res: Response) {
        try {
            const { name, userName, email, password } = req.body;

            const result = await UserService.create({
                name,
                userName,
                email,
                password,
                idUser: ""
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
            const result = await UserService.findAll();

            res.status(result.code).send(result);

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

    public async show(req: Request, res: Response) {
        try {
            const { idUser } = req.body;

            const result = await UserService.listByMessagesUser(idUser);

            return res.status(result.code).send(result);

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

    public async update(req: Request, res: Response) {
        try {
            const { idUser } = req.params;
            const { name, userName, email, password } = req.body;

            console.log(`aqui e o idUser: ${idUser}`)
            console.log(`aqui controller: ${name}, ${userName}, ${email}, ${password}`)

            const result = await userService.update({
                idUser,
                name,
                userName,
                email,
                password
            });

            return res.status(result.code).send(result);

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

    public async delete(req: Request, res: Response) {
        try {
            const { idUser } = req.params;

            const result = await UserService.delete(idUser);

            return res.status(result.code).send(result);

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

}

export default UserController;