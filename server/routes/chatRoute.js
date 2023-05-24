import { Router } from "express";
import { accesChat,addUser,allChats, groupChat, removeUser, renameGroup } from "../ApiController/chatController.js";
import { isValidated } from "../middleware/isValidated.js";
import { isAdmin } from "../middleware/isGroupAdmin.js";

const route = Router()

route.post("/",isValidated,accesChat)
route.get("/",isValidated,allChats)
route.post("/group",isValidated,groupChat)
route.put("/group/rename/:id",isValidated,isAdmin,renameGroup)
route.put("/group/add/:id",isValidated,isAdmin,addUser)
route.put("/group/remove/:id",isValidated,isAdmin,removeUser)

export default route