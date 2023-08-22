import {Router} from "express"
import { deleteMsg, getMsg, sendMsg } from "../ApiController/msgController.js";

const route = Router();

route.get("/msg",getMsg);
route.post("/msg/send/:id",sendMsg);
route.delete("/msg/delete/:id",deleteMsg);

export default route
