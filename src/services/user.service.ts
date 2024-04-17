import repository from "../database/prisma.database";

class UserService {

    public async findAll() {
        const data = await repository.user.findMany();
        return data;
    }
}

export default new UserService();