import { Router } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();
const controller = new AuthController();


router.post("/login", controller.login);
// router.get("/logout", controller.logout);

export default router;