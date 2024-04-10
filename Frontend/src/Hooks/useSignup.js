import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
const useSignup = () =>{
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {setAuthUser} = useContext(AuthContext)
    const signup =async ({fullName, userName, password, confirmPassword, gender}) =>{
        const success = validation({fullName, userName, password, confirmPassword, gender})
        if(!success) return;
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup",{
                method:"POST",
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({fullName, userName, password, confirmPassword, gender})
            })

            const data = await res.json()
            if(data.error)
            {
                toast(data.error)
                console.log(data.error)
            }
            else{
                console.log(data)
                localStorage.setItem("chat-user",JSON.stringify(data))
                setAuthUser(data)
                navigate("/login")
                toast.success("Account Created Successfully")
            }
        } catch (error) {
            toast.error("Server Down")
            console.log("Error in useSignup Hook",error.message)
        }
        finally{
            setLoading(false)
            // history.push("/login");
        }

    }
    return { loading, signup };
}



export default useSignup


function validation({fullName, userName, password, confirmPassword, gender}){
    if(!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Fill all the fields")
        return false
    }
    if(password.length <8) {
        toast.error("Password must be atleast 6 characters")
        return false
    }
    return true
}