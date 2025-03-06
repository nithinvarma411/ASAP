import {connect} from "mongoose";

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log("database connected successfully")
        return
    } catch (error) {
        console.error("error connecting database", error)
    }
}

export default connectDB