import { connect } from "mongoose";

let isDBConnected = false;

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
        isDBConnected = true;
    } catch (error) {
        console.error("Error connecting to database:", error);
        isDBConnected = false;
    }
};

export { connectDB, isDBConnected };
