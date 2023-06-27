import { Router } from "express";
import { getAllUsers, login, register, searchUser} from "../ApiController/userController.js";
import { isValidated } from "../middleware/isValidated.js";
import singleUpload from "../middleware/multer.js";

const router = Router();

router.post("/register",singleUpload,register)
router.post("/login",login)
router.get("/",isValidated,searchUser)
router.get('/users',isValidated,getAllUsers)
export default router 