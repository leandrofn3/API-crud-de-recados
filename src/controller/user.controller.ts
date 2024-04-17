import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
    
    public async index(req: Request, res: Response) {

        const users = await userService.findAll()

        return res.status(200).send({
            ok: true,
            message: "User listed successfully",
            data: users
        });
    };
    
    // public create(req: Request, res: Response): {

    // };

    // public show(req: Request, res: Response) {

    // };


    // public update(req: Request, res: Response) {

    // };

    // public delete(req: Request, res: Response) {

    // };

}

export default UserController;