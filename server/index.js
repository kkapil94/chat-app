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
    origin:process.env.FRONT_URL,
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
  socket.on("create",(user)=>{
    socket.join(user._id)
    socket.emit("connected")
  })
  socket.on("join-chat",(room)=>{
    socket.join(room);
  })
  socket.on("send-msg",(data,room)=>{
    socket.to(room).emit("receive-msg",data)
  })
  socket.on("typing",(room)=>{
    socket.to(room).emit('typing')
  })
  socket.on("stop-typing",(room)=>{
    socket.to(room).emit('stop-typing')
  })
});

server.listen( process.env.PORT || 4000,()=>{
    console.log("server connected to PORT 4000")
})