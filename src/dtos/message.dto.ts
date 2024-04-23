export interface CreateMessageDto {
    title: string;
    description: string;
    idUser: string;
}

export interface UpdateMassageDto {
    id: string;
    title?: string;
    description?: string;
}