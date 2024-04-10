import React, { useContext,useEffect, useState, useRef } from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { useLogout } from '../../Hooks/useLogout';
import { useMessages } from '../../Hooks/useMessages';
import { useUser } from '../../Hooks/useUser';
import { useSend } from '../../Hooks/useSend';
import Third from '../Preloader/Third';
import { SocketContext } from '../../../Context/SocketContext';
import useListenMessage from '../../Hooks/useListenMessage';
import useConversation from '../../Hooks/useConversation';
function Home() {
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate();
  const {logout,loading} = useLogout()
  const {get_user} = useUser()
  const {get_message} = useMessages()
  const [selectedUser, setSelectedUser] = useState({profile:"",name:"",uid:"",state:false})
  const [users, setUsers]= useState([])
  const [users2, setUsers2] = useState([])
  const [searchUser,setSearchUser] = useState("")
  const { user_message, setUserMessage, notification,setNotification } = useConversation();
  const [chatMessage,setChatMessage] = useState("")
  const {send_message} = useSend()
  const chatContainerRef = useRef(null);
  const {onlineUsers} = useContext(SocketContext)
  const [count,setCount] = useState(0)
  const [latestMessage, setLatestMessage]= useState([])



  useListenMessage();

  //useEffect to change display while screen resizing
  useEffect(() => {
      const handleResize = () => {
        const width= window.innerWidth
        if(width>640) {
          document.querySelector(".third").style.display="block";
          document.querySelector(".second").style.display="block";
        }
        else{
          document.querySelector(".third").style.display="none";
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  //useEffect to Fetch All Users
    useEffect(() => {
      
      const fetchData = async () => {
        try {
          if (!authUser) {
            navigate('/signup');
          }
          const fetchedUsers = await get_user();
          setUsers(fetchedUsers)
          setUsers2(fetchedUsers)
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

    fetchData();
  }, [authUser, navigate]);


  // useEffect to fetch user Conversartion
  useEffect(()=>{
    if(selectedUser.state)
    {
    async function msg(){
      // console.log(selectedUser)
      const user_msg=await get_message(selectedUser.uid)
      setUserMessage(user_msg)
    }
    msg()
    }
  },[selectedUser,count,notification,user_message])

// useEffect to autoScroll Chat to Bottom
  useEffect(()=>{
    const scrollToBottom = () => {
      if (chatContainerRef.current && latestMessage.length!==user_message.length) {
        setLatestMessage(user_message)
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        console.log("New Message")
        }
    };
    scrollToBottom();
  },[user_message])


  // Func to get focus on Input BOx
  const focus = () =>{
    document.getElementById("input").focus()
  }

  // Func to handle back functionality in Mobile Devices
  const handleback = () =>{
    if (window.innerWidth <= 640)
    {
      document.querySelector(".second").style.display="block"
      document.querySelector(".third").style.display="none"
    }
  }

  // Func to set Current User Conversation
  const handleuser =async (e) =>{
    if (window.innerWidth <= 640)
    {
      document.querySelector(".second").style.display="none"
      document.querySelector(".third").style.display="block"
    }
    const name = e.currentTarget.getAttribute('name')
    const profile = e.currentTarget.getAttribute('profile')
    const uid = e.currentTarget.getAttribute('uid')
    const state = true
    setSelectedUser({name,profile,uid,state})
  }

  const handlelogout =()=>{
    console.log("Logged Out")
    logout()
  } 

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior (e.g., line break in textarea)
      sendMessage();
    }
  };

  const sendMessage =async () =>{
    // console.log(chatMessage)
    await send_message(selectedUser.uid,chatMessage)
    setChatMessage("")
    // setSelectedUser(prev=>({...prev}))
    setSelectedUser(prevUser => ({ ...prevUser }));
    // setNotification((notification+1)%2)
    setNotification(prevNotification => (prevNotification + 1) % 2);
    // setCount((count+1)%2)
    setCount(prevCount => (prevCount + 1) % 2);
  }

  const handleSearch = (e) =>{
    const searchTerm = e.target.value;
    if(searchTerm==="") setUsers2(users)
    setSearchUser(searchTerm)
    const newList = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
    if(newList.length!==0)
    setUsers2(newList)
  }
  return (
    <>
    {authUser && <div className="main-home">
      <div className="first">
        <img src={authUser.profilePic} className='profile' />
        <i className="fa-solid fa-arrow-right-from-bracket" id="logout" style={{color: "#FFFFFF"}} onClick={handlelogout}></i>
      </div>
      <div className="second">
        <div className="search-bar">
          <input type="text" id="input" value={searchUser} onChange={handleSearch}/>
          <i className="fa-solid fa-magnifying-glass" style={{color: "#FFFFFF"}} id="search" onClick={focus}></i>
        </div>
        <div className="chat-list">
        {users2.map((u) => (
            <div className="individual-chat" onClick={(e)=>{handleuser(e)}} key={u._id} uid={u._id} name={u.fullName} profile={u.profilePic}>
            <img src={u.profilePic} className='individual-profile' />
            <p className='individual-name'>{u.fullName}</p>
            <span className={onlineUsers.includes(u._id)?'onlineStatus':'onlineStatusNo'}><i className="fa-solid fa-circle" style={{color: "#39FF14",fontSize:"10px"}}></i></span>
          </div>
          ))}
        </div>
      </div>
      <div className="third">
        {!selectedUser.state && <Third/>}
        {selectedUser.state && <><div className="top">
            <img src={selectedUser.profile} className='individual-profile-2' />
            <p className='individual-name-2'>{selectedUser.name}</p>
            <i className="fa-solid fa-arrow-left" id="back" onClick={handleback}></i>
        </div>
        <div className="middle" ref={chatContainerRef}>
          <div className="note-message">Start Conversation</div>
          {user_message.map((user_messages)=>{
            return <div className={selectedUser.uid===user_messages.senderId?"your-message":"my-message"} key={user_messages._id}>
            <img src={selectedUser.uid===user_messages.senderId? selectedUser.profile :authUser.profilePic} className='individual-profile-3' alt="" />
            <div className="otp-message">
              <p className='msg'>{user_messages.message}</p>
              <div className="my-time"><p>{}</p></div>
            </div>
          </div>
          })}
        </div>
        <div className="bottom">
          <input type="text" id="input-2" placeholder='Send a Message' value={chatMessage} onChange={(e)=>{setChatMessage(e.target.value)}} onKeyDown={handleKeyDown}/>
          <i className="fa-solid fa-paper-plane" id="send" onClick={sendMessage}></i>
        </div></>}
      </div>
    </div>}
    </>
  )
}

export default Home