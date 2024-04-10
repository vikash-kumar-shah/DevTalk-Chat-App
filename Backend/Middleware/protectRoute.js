import jwt from "jsonwebtoken"
import User from "../Models/user.model.js"
const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt
        // console.log(token) 
        if(!token)
        {
            return res.status(401).json({error:"Invalid User Credentials - no token"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_TOKEN)
        if(!decoded)
        {
            return res.status(401).json({error:"Invalid User Credentials -user doesn't exist in db"})
        } 
        const user =await User.findById(decoded.userId).select("-password")
        if(!user)
        {
            return res.status(401).json({error:"Invalid User Credentials -no user"})
        }
        req.user = user
        next()
    } catch (error) {
        console.log("Error in protectRoute Middleware: ",error.message)
        return res.status(500).json({error:"Internal Server Error"}) 
    }
}

export default protectRoute