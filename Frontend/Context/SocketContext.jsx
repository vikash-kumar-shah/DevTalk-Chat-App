import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import io from 'socket.io-client'
export const SocketContext = createContext()


export const SocketContextProvider = ({children})=>{

    const [socket,setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {authUser}= useContext(AuthContext)
    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:5000",{
                query:{
                    userId: authUser._id
                }
            })
            setSocket(socket)

            socket.on("getOnlineUsers",(Onlineusers)=>{
                setOnlineUsers(Onlineusers)
                // console.log(Onlineusers)
            })
            return ()=>{socket.close()}
        }
        else{

            if(socket){
                socket.close();
                setSocket(null)
            }
        }
    },[authUser])
    return (<SocketContext.Provider value={{socket,onlineUsers}}>
        {children}
    </SocketContext.Provider>)
}