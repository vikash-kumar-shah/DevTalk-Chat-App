import toast from "react-hot-toast"
export const useUser = () =>{
    const get_user =async () =>{
        const url = "https://devtalk-chat-app.onrender.com/api/users"
        // const token = cookies.get('jwt');
        // console.log("This is token ",document.cookie)
        try {
            const res =await fetch(url,{
                method:"GET",
                credentials:"include"
            })
            const data =await res.json()
            if (data.error) {
                console.log(data.error)
            } else {
                
                // console.log(data)
                return data
            }
        } catch (error) {
            console.log("Error at useUser,js",error.message)
            toast.error("Server Down")
        }
        finally{

        }
    }
    return {get_user}
}