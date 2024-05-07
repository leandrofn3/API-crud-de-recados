import { Request, Response } from "express";
import authService from "../services/auth.service";
import jwt from "jsonwebtoken";

class AuthController {
    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            if (!email || !password || email === "" || password === "") {
                return res.status(400).send({
                    code: 400,
                    message: "All fields must be filled in!"
                });
            }

            const user = await authService.login(email, password);

            if (!user) {
                return res.status(401).send({
                    code: 401,
                    message: "Invalid email or password!!"
                });
            };

            const payload = {
                idUser: user.idUser,
                name: user.name,
                email: user.email
            }

            const token = jwt.sign({
                idUser: user.idUser,
                name: user.name,
                email: user.email
            },
                process.env.JWT_SECRET || "",
                { expiresIn: "1h" }
            )


            return res.status(200).send({
                code: 200,
                message: "login successfuly!",
                data: { token: token, payload }
            });


        } catch (error: any) {
            res.status(500).send({
                code: 500,
                message: error.toString()
            });
        }
    };
}

export default AuthController;