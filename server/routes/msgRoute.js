import {Router} from "express"
import { deleteMsg, getMsg, sendMsg } from "../ApiController/msgController.js";
import { isValidated } from "../middleware/isValidated.js";

const route = Router();

route.get("/",isValidated,getMsg);
route.post("/send",isValidated,sendMsg);
route.delete("/delete/:id",isValidated,deleteMsg);

export default route
