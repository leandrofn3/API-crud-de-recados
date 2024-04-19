import repository from "../database/prisma.database";
import { CreateMessageDto, UpdateMassageDto } from "../dtos/message.dto";
import { ResponseDto } from "../dtos/response.dto";
import { MessageModel } from "../models/messages.model";

class MessageService {

    public async create(data: CreateMessageDto): Promise<ResponseDto> {
        const message = new MessageModel(data.title, data.description, data.idUser);

        const createMessage = await repository.messages.create({
            data: {
                idMessage: message.idMessage,
                title: message.title,
                description: message.description,
                idUser: message.idUser,
                dateTimeCadrerated: message.dateTimeCadrerated
            },
        });

        return {
            code: 201,
            message: "Message created successfully",
            data: createMessage
        };
    };

    public async findAll(): Promise<ResponseDto> {
        const data = await repository.messages.findMany()

        return {
            code: 200,
            message: "Message successfully listed!",
            data: data
        }
    };

    // public async listById(): Promise<ResponseDto> {
    //     const user = await repository.messages
    // };

    public async update(data: UpdateMassageDto) {
        const message = await repository.messages.findUnique({
            where: {
                idMessage: data.idMessage
            }
        });

        if (!message) {
            return {
                code: 404,
                message: "Message not found!"
            }
        };

        const updatedMassage = await repository.messages.update({
            where: {
                idMessage: message.idMessage
            },
            data: {
                title: data.title,
                description: data.description
            }
        });

        return {
            code: 200,
            message: "Message successfully updated!",
            data: updatedMassage
        };
    };


    public async delete(idMessage: string): Promise<ResponseDto> {
        const message = await repository.messages.findUnique({
            where: {
                idMessage
            }
        });

        if (!message) {
            return {
                code: 404,
                message: "Message not found!"
            }
        }

        await repository.messages.delete({
            where: {
                idMessage
            }
        });

        return {
            code: 200,
            message: "Message successfully deleted!"
        };
    };
}

export default new MessageService();