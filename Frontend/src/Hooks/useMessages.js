export const useMessages = ()=>{
    const get_message =async (uid)=>{
        const url = `http://localhost:5000/api/message/${uid}`
        try {
            // console.log(uid)
            const res =await fetch(url,{
                method:"GET",
                credentials: "include",
            })
            const data = await res.json()
            if (data.error) {
                console.log(data.error)
            } else {
                return data
            }
        } catch (error) {
            console.log("Server Down",error.message)
        }
        finally{

        }
    }
    return {get_message}
}