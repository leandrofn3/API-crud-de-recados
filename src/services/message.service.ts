import repository from "../database/prisma.database";
import { CreateMessageDto, UpdateMassageDto, listByIdMessagesOrDelete } from "../dtos/message.dto";
import { ResponseDto } from "../dtos/response.dto";
import { MessageModel } from "../models/messages.model";
import { Messages } from "@prisma/client";

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
            }
        });

        return {
            code: 201,
            message: "Message created successfully",
            data: this.mapTomodel(createMessage).toJson
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
                idMessage: idMessage,
            }
        });

        if (!messages) {
            return {
                code: 404,
                message: "Messages not found!"
            }
        }

        return {
            code: 200,
            message: "Messages successfully listed!",
            data: this.mapTomodel(messages).toJson
        };
    };

    public async update(data: UpdateMassageDto) {

        const updatedMassage = await repository.messages.update({
            where: {
                idMessage: data.idMessage,
            },
            data: {
                title: data.title,
                description: data.description
            }
        });

        return {
            code: 200,
            message: "Message successfully updated!",
            data: this.mapTomodel(updatedMassage).toJson
        };
    };

    public async delete(data: listByIdMessagesOrDelete): Promise<ResponseDto> {
        await repository.messages.delete({
            where: {
                idMessage: data.idMessage,
            }
        });

        return {
            code: 200,
            message: "Message successfully deleted!"
        };
    };

    public mapTomodel(message: Messages): MessageModel {
        const model = new MessageModel(message.title, message.description, message.idUser);

        model.idMessage = message.idMessage

        return model;
    }
}


export default new MessageService();