import { Router } from "express";
import UserController from "../controller/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();
const controller = new UserController();

router.post("/user/create/", controller.create);
router.get("/users", authMiddleware, controller.index);
router.get("/users/list/message/:id", authMiddleware,controller.show);
router.put("/user/update/:id", authMiddleware,controller.update);
router.delete("/user/delete/:id", authMiddleware,controller.delete);

export default router;