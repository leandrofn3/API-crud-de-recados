import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {

    public async create(req: Request, res: Response) {
        try {
            const { name, userName, email, password } = req.body;

            const result = await UserService.create({
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

    public async index(req: Request, res: Response) {
        try{
            
        } catch(error: any){
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

    //  
    public show(req: Request, res: Response) {
        try {

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };


    public update(req: Request, res: Response) {
        try {

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

    public delete(req: Request, res: Response) {
        try {

        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    };

}

export default UserController;