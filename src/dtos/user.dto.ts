export interface CreateUserDto{
    idUser: string
    name: string;
    userName: string;
    email: string;
    password: string;
};

export interface UpdateUserDto {
    idUser: string;
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    token?: string | null;
};