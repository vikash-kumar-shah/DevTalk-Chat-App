import { useState } from 'react';

function useConversation() {
  const [user_message, setUserMessage] = useState([]);
  const [notification,setNotification] = useState(0);
  return { user_message, setUserMessage, notification,setNotification };
}

export default useConversation; 
