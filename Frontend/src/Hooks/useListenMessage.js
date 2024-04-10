import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../Context/SocketContext'
import useConversation from './useConversation'
import notificationSound from "../assets/notification.mp3"
const  useListenMessage=()=>{
    const [notificationFlag, setNotificationFlag] = useState(false)
    const {socket} = useContext(SocketContext)
    const {user_message, setUserMessage, notification,setNotification} = useConversation()

    useEffect(() => {
        if (!socket) return;
        const handleNewMessage = (newMessage) => {
            setNotificationFlag(true);
        };
        
        socket.on('newMessage', handleNewMessage);
        return () => {
            socket.off('newMessage', handleNewMessage);
        };
      }, [socket,notification]);


      useEffect(() => {
        const playNotificationSound = () => {
            const sound = new Audio(notificationSound);
            sound.play()
        };

        if (notificationFlag) {
            playNotificationSound();
            setNotificationFlag(false); 
        }
    }, [notificationFlag, setNotificationFlag]);

}
export default useListenMessage