export interface CreateMessageDto {
    title: string;
    description: string;
    idUser: string;
}

export interface UpdateMassageDto {
    idMessage: string;
    title?: string;
    description?: string;
}