import { Router } from "express";
import { accesChat,addUser,allChats, groupChat, removeUser, renameGroup, singleChat } from "../ApiController/chatController.js";
import { isValidated } from "../middleware/isValidated.js";
import { isAdmin } from "../middleware/isGroupAdmin.js";
import singleUpload from "../middleware/multer.js";

const route = Router()

route.post("/",isValidated,accesChat)
route.get("/",isValidated,allChats)
route.get('/:id',isValidated,singleChat)
route.post("/group",isValidated,singleUpload,groupChat)
route.put("/group/rename/:id",isValidated,isAdmin,renameGroup)
route.put("/group/add/:id",isValidated,isAdmin,addUser)
route.put("/group/remove/:id",isValidated,isAdmin,removeUser)
route.put("/group/exit/:id",isValidated,removeUser)

export default route