
export const useSend = () =>{
    const send_message=async (uid,message)=>{
        try {
            const url = `https://devtalk-chat-app.onrender.com/api/message/send/${uid}`
            const res =await fetch(url,{
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({message:message})
            })
            const data =await res.json()
            if (data.error) {
                console.log(data.error)
            } else {
                // console.log(data)
                return
            }
            
        } catch (error) {
            console.log("Error at useSend",error.message)
        }
    } 

    return {send_message}
}