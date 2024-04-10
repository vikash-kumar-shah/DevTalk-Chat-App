import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectToMongoDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Database Successfully Connected")
    } catch (error) {
            console.log("Database couldn't Connect",error.message)
            console.log("Db URL: ", process.env.MONGO_DB_URI)
    }
}

export default connectToMongoDB