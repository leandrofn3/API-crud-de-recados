export interface CreateUserDto{
    name: string;
    userName: string;
    email: string;
    password: string;
};

export interface UpdateUserDto {
    id: string;
    name?: string;
    userName?: string;
    email?: string;
    password?: string;
    token?: string | null;
};