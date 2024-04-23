import { Router } from "express";
import { MessageController } from "../controller/message.controller";

const router = Router();
const controller = new MessageController();

router.post("/message/create", controller.create);
router.get("/messages", controller.index);
router.get("/message/list-by-id/:id", controller.show);
router.put("/message/update/:id", controller.update);
router.delete("/message/delete/:id", controller.delete);

export default router;