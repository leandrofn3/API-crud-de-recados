import { Request, Response } from "express";
import userService from "../services/user.service";
import { ResponseDto } from "../dtos/response.dto";
import { v4 as CreateToken } from "uuid";

class AuthController {
    public async create(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            if (!email || !password || email === "" || password === "") {
                return res.status(404).send({
                    ok: false,
                    message: "All fields must be filled in!"
                });
            }

            const user = await userService.getByEmailAndPassword(email, password);

            if (!user) {
                return res.status(401).send({
                    ok: false,
                    message: "Email or password wrong!"
                });
            };

            const token = CreateToken();

            const update = await userService.update({ ...user, token: token, idUser: user.idUser });

            const response: ResponseDto = {
                code: 200,
                message: "Login sucess",
                data: { token: token }
            };

            if (update.code === 200) {
                return res.status(response.code).send(response);
            };
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        }
    };

    public async delete(req: Request, res: Response) {
        try {
            const  token  = req.headers.authorization;

            const user = await userService.getByToken( token as string);

            console.log(`esse e o token do controller: ${token}`)

            if (user) {
                const response: ResponseDto = {
                    code: 200,
                    message: "Logout success!"
                };
                await userService.update({ ...user, token: null || undefined, idUser: user.idUser });

                return res.status(response.code).send(response);
            }

            const response: ResponseDto = {
                code: 404,
                message: "Logout not found!"
            };

            return res.status(response.code).send(response);
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString()
            });
        };
    }
}

export default AuthController;