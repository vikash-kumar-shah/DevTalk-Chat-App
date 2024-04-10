import User from "../Models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../Utils/generateToken.js";
export const signup =async (req,res) =>{
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords doesn't Match"})
        }
        const user = await User.findOne({userName})
        if (user){
            return res.status(400).json({error : "User Already exists"})
        }
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=[${userName}]`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=[${userName}]`

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser =new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic : gender === 'male' ? boyProfilePic : girlProfilePic
        })

        await newUser.save()
        await generateTokenAndSetCookie(newUser._id,res)
        return res.status(200).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        })
    } catch (error) {
        console.log("Error in Signup controller: ",error.message)
        return res.status(500).json({error:"Internal Server Error"})
    }
}
export const login =async (req,res) =>{
    try {
        const {userName, password} = req.body;
        const newUser =await User.findOne({userName})
        const isPasswordCorrect = await bcrypt.compare(password,newUser?.password || "")
        if(!newUser || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Credentials"})
        }

        await generateTokenAndSetCookie(newUser._id,res)
        res.status(200).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        })
    } catch (error) {
        console.log("Error in Loginin controller: ",error.message)
        return res.status(500).json({error:"Internal Server Error"}) 
    }
}
export const logout = (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({msg:"Successfully logged out"})

    } catch (error) {
        console.log("Error in Logout controller: ",error.message)
        return res.status(500).json({error:"Internal Server Error"}) 
    }
}