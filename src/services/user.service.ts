import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt"

class UserService {
    public async create(data: CreateUserDto): Promise<ResponseDto> {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(data.password, salt);

        const user = new UserModel(data.name, data.userName, data.email, passwordHash);

        const createdUser = await repository.user.create({
            data: {
                idUser: user.idUser,
                name: user.name,
                username: user.userName,
                email: user.email,
                password: passwordHash
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

    public async getByEmailAndPassword(email: string, password: string) {
        const user = await repository.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user){
            return null;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            return null;
        }

        return user;
    };

    public async getByToken(token: string) {
        const user = await repository.user.findUnique({
            where: {
                token: token
            }
        });

        return user
    }

    public async listByMessagesUser(idUser: string): Promise<ResponseDto> {

        const messages = await repository.messages.findMany({
            where: {
                idUser
            }
        });

        return {
            code: 200,
            message: "Message successfully listed!",
            data: messages
        };
    };

    public async update(data: UpdateUserDto): Promise<ResponseDto> {

        if(data.password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword;
        }
        
        const updatedUser = await repository.user.update({
            where: {
                idUser: data.idUser
            },

            data: {
                name: data.name,
                username: data.userName,
                email: data.email,
                password: data.password,
                token: data.token
            }
        });

        return {
            code: 200,
            message: "User successfully update!",
            data: updatedUser
        };
    };

    public async delete(idUser: string): Promise<ResponseDto> {

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