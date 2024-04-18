import repository from "../database/prisma.database";
import { CreateUserDto } from "../dtos/user.dto";
import UserModel from "../models/user.model";

class UserService {

    public async findAll() {
        const data = await repository.user.findMany();
        return data;
    };

    public async create(data: CreateUserDto) {
        const user = new UserModel(data.name, data.userName, data.email, data.password)

        const createdUser = await repository.user.create({
            data: {
                idUser: user.idUser,
                name: user.name,
                username: user.userName,
                email: user.email,
                password: user.password
            },
        });

        return {
            code: 201,
            message: "User created successfully!",
            data: createdUser
        };
    }
}

export default new UserService();