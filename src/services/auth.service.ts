import repository from "../database/prisma.database";
import bcrypt from "bcrypt";

class AuthService {
    public async login(email: string, password: string) {
        const user = await repository.user.findUnique({
            where: {
                email: email,
            }
        });

        if (!user) {
            return null
        };

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return null
        };

        return user;
    };

};

export default new AuthService();