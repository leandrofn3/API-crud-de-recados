import { Public } from "@prisma/client/runtime/library";
import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import UserModel from "../models/user.model";
import { MessageModel } from "../models/messages.model";
import { MessageType } from "../types/message.type";

class UserService {
    public async create(data: CreateUserDto): Promise<ResponseDto> {
        const user = new UserModel(data.name, data.userName, data.email, data.password);

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
    };

    public async findAll(): Promise<ResponseDto> {
        const data = await repository.user.findMany();

        return {
            code: 200,
            message: "User successfully listed!",
            data: data
        };
    };

    public async listFromUser(idUser: string): Promise<ResponseDto> {
        const user = await repository.user.findUnique({
            where: {
                idUser
            }
        });

        if (!user) {
            return {
                code: 404,
                message: "User not found!"
            }
        };

        const messages = await repository.messages.findMany({
            where: {
                idUser
            }
        });

        const messageModel = messages.map(item => this.mapToModel(item));

        return {
            code: 200,
            message: "Message successfully listed!",
            data: messageModel.map((item) => item)
        };
    };

    public mapToModel(message: MessageType){
        const model = new MessageModel(
            message.title,
            message.description,
            message.idUser,
        );

        model.idMessage = message.idMessage;
    }

    public async update(data: UpdateUserDto): Promise<ResponseDto> {
        const user = await repository.user.findUnique({
            where: {
                idUser: data.idUser
            }
        });

        if (!user) {
            return {
                code: 404,
                message: "User not found!"
            };
        };

        const updatedUser = await repository.user.update({
            where: {
                idUser: data.idUser
            },

            data: {
                name: data.name,
                username: data.userName,
                email: data.email,
                password: data.password
            }
        });

        return {
            code: 200,
            message: "User successfully update!",
            data: updatedUser
        };
    };

    public async delete(idUser: string): Promise<ResponseDto> {
        const user = await repository.user.findUnique({
            where: {
                idUser
            }
        });

        if (!user) {
            return {
                code: 404,
                message: "User not found!"
            };
        };

        await repository.user.delete({
            where: {
                idUser
            }
        });

        return {
            code: 200,
            message: "User successfuly deleted!"
        };
    };
};

export default new UserService();