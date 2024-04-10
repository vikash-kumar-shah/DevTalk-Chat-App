import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"



export const useLogin = () =>{
    const {setAuthUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const url = "http://localhost:5000/api/auth/login"
    const navigate = useNavigate()
    const login =async ({userName,password})=>{
        try {
            setLoading(true)
            const res =await fetch(url,{
                method: "POST",
                credentials: 'include',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({userName,password})
            })
    
            const data = await res.json()
            if (data.error) {
                console.log(data.error)
                toast.error(data.error)
            } else {
                localStorage.setItem("chat-user",JSON.stringify(data))
                setAuthUser(data)   
                navigate("/")
                toast.success("Successfully Logged In")    
            }
        } catch (error) {
            console.log("Server Down")
            toast.error("Server Down")
            console.log("Error in useLogin",error.messager)
        }
        finally{
            setLoading(false)
        }
    }

    return {login,loading}
}  