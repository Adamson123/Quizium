import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to db");
    } catch (error) {
        console.error("error Connecting to db", error.message);
    }
};
