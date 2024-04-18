import repository from "../database/prisma.database";
import { CreateMessageDto } from "../dtos/message.dto";
import { MessangeModel } from "../models/messages.model";

class MessageService {

    public async create(data: CreateMessageDto) {
        const message = new MessangeModel(data.title, data.description, data.idUser);

        const createMessage = await repository.messages.create({
            data: {
                idMessages: message.idMessage,
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

    public async findAll() {
        const data = await repository.messages.findMany()

        return {
            code: 200,
            message: "Message successfully listed!",
            data: data
        }
    };

    public async show() {

    };

    public async update() {

    };

    public async delete() {

    };
}

export default new MessageService();