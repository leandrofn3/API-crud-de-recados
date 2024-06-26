import  express, { Request, Response }  from "express";
import cors from "cors";
import * as dotenv from "dotenv"
import UserRouter from "./routes/user.routes";
import MessagesRouter from "./routes/message.routes"
import Authrouter from "./routes/auth.routes";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./docs/swagger.json"

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(UserRouter);
app.use(MessagesRouter);
app.use(Authrouter);

app.use("/docs", swaggerUi.serve);
app.use("/docs", swaggerUi.setup(swaggerDoc));


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