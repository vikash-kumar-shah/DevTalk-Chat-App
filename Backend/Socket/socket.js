import express from "express";
import { Server } from "socket.io";
import http from 'http'

const app = express()
const server = http.createServer(app)
const io= new Server(server,{
    cors:{
        origin:['https://devtalk-chat-app.onrender.com'],
        methods:["GET","POST"],
        credentials: true,
    }
})

const userSocketMap={}

const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId]
}

io.on("connection",(socket)=>{
    console.log(`User Connected ${socket.id}`)

    const userId = socket.handshake.query.userId
    if(userId!=="undefined")
    {
        userSocketMap[userId]=socket.id
    }

    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("User Disconnected ", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})


export {app,io,server, getReceiverSocketId}