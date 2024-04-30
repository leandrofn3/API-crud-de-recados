export interface CreateMessageDto {
    title: string;
    description: string;
    idUser: string;
}

export interface UpdateMassageDto {
    idMessage: string;
    idUser: string;
    title?: string;
    description?: string;
}

export interface listByIdMessagesOrDelete {
    idMessage: string;
    idUser: string;
}

