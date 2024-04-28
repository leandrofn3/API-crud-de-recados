import { Router } from "express";
import { MessageController } from "../controller/message.controller";
import createMessageMiddleware from "../middlewares/createMessages.middleware";
import verifiesMessagesID from "../middlewares/verifiesMessages.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();
const controller = new MessageController();

router.post("/message/create", [authMiddleware, createMessageMiddleware], controller.create);
router.get("/messages", authMiddleware, controller.index);
router.get("/message/list-by-id/:id", [authMiddleware, verifiesMessagesID], controller.show);
router.put("/message/update/:id", [authMiddleware, verifiesMessagesID], controller.update);
router.delete("/message/delete/:id", [authMiddleware, verifiesMessagesID], controller.delete);

export default router;