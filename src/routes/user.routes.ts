import { Router } from "express";
import UserController from "../controller/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import createMiddleware from "../middlewares/createUser.middleware";
import verifiesUserID from "../middlewares/verifiesUserId.middleware";

const router = Router();
const controller = new UserController();

router.post("/user/create/", createMiddleware, controller.create);
router.get("/users", authMiddleware, controller.index);
router.get("/users/list/message/:id", [authMiddleware, verifiesUserID], controller.show);
router.put("/user/update/:id", [authMiddleware, verifiesUserID], controller.update);
router.delete("/user/delete/:id", [authMiddleware, verifiesUserID], controller.delete);

export default router;