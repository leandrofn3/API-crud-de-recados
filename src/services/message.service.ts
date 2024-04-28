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
                idUser: message.idUser
            }
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

    public async listById(idMessage: string): Promise<ResponseDto> {
        const messages = await repository.messages.findUnique({
            where: {
                idMessage
            }
        });

        return {
            code: 200,
            message: "Messages successfully listed!",
            data: messages
        };
    };

    public async update(data: UpdateMassageDto) {

        const updatedMassage = await repository.messages.update({
            where: {
                idMessage: data.id
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