import { Router } from "express";
import UserController from "../controller/user.controller";

const router = Router();
const controller = new UserController();

router.post("/user/create/", controller.create);
router.get("/users", controller.index);
router.get("/users/list/message/:id", controller.show);
router.put("/user/update/:id", controller.update);
router.delete("/user/delete/:id", controller.delete);

export default router;