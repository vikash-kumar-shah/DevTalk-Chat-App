import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"


export const useLogout = () =>{
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {setAuthUser}=useContext(AuthContext)
    const logout =async () =>{
        try {
            setLoading(true)
            const url = "https://devtalk-chat-app.onrender.com/api/auth/logout"
            const res =await fetch(url,{
                method: "POST",
            })
            const data = await res.json()
            if(data.error)
            {
                console.log(data.error)
                toast.error(data.error)
            }
            else{
                localStorage.removeItem("chat-user")
                setAuthUser(null)
                navigate("/login")
                toast.success("Successfully Logged Out")
            }
        } catch (error) {
            console.log("Error at useLogout.js", error.message)
            toast.error("Server Down")
        }
        finally{
            setLoading(false)
        }
    }
    return {logout , loading}
}
