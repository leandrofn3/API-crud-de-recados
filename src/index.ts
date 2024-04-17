import  express, { Request, Response }  from "express";
import cors from "cors";
import * as dotenv from "dotenv"
import UserRouter from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(UserRouter);

const port = process.env.PORT; 


app.listen(port, ()=> {
    console.log(`APP está rodando na porta ${port}`);
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({
        ok: true,
        message: "Bem vindo a API de recados!"
    });
});