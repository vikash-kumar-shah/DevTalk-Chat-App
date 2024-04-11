import path from "path"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import auth from "./Routes/auth.routes.js"
import message from "./Routes/message.routes.js"
import users from "./Routes/users.routes.js"

import connectToMongoDB from "./DB/connnectToMongoDB.js"
import { app, server } from "./Socket/socket.js"


dotenv.config()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(cors({
    origin: 'https://devtalk-chat-app.onrender.com',
    credentials: true
  }));
app.use(express.json())
app.use(cookieParser())

  
app.use("/api/auth",auth)
app.use("/api/message",message)
app.use("/api/users",users)
app.use(express.static(path.join(__dirname,"/Frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"Frontend","dist","index.html"))
})


app.get("/",(req,res)=>{
    res.send("Server is Active on / route")
})
server.listen(5000,()=>{
    connectToMongoDB()
    console.log(`Server Listening on Port ${PORT}`)
})