import jwt from "jsonwebtoken"
const generateTokenAndSetCookie =async (userId, res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET_TOKEN)
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
    })
}
export default generateTokenAndSetCookie