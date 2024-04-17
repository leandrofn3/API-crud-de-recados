import { Router } from "express";
import UserController from "../controller/user.controller";

const router = Router();
const controller = new UserController();

router.get("/users", controller.index);

export default router;