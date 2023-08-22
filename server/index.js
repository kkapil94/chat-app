import express from "express"
import userRoute from "./routes/userRoute.js"
import chatRoute from "./routes/chatRoute.js"
import msgRoute from "./routes/msgRoute.js"
import {connect}from "./utils/mongodb.js"
import {errorHandler} from "./middleware/errorHandler.js"
import singleUpload from "./middleware/multer.js"
import dotenv from "dotenv"
import { isValidated } from "./middleware/isValidated.js"
import {v2 as cloudinary} from "cloudinary"
import { isAdmin } from "./middleware/isGroupAdmin.js"
import cors from "cors"
import http from "http"
import {Server} from "socket.io"
const app = express()
const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:"http://127.0.0.1:5173",
    credentials:true
  },
});


dotenv.config()
cloudinary.config({ 
  cloud_name: "dbssa7j9g", 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});
connect()
app.use(cors())
app.use(express.json())
app.use("/api/v1/auth",userRoute)
app.use("/api/v1/chat",chatRoute)
app.use("/api/v1/msg",msgRoute)
app.use(singleUpload)
app.use(isValidated)
app.use(isAdmin)
app.use(errorHandler)

io.on('connection', (socket) => {
  console.log("connected",socket.id);
});

server.listen(4000,()=>{
    console.log("server connected to PORT 4000")
})