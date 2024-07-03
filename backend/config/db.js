import mongoose from "mongoose";

export const connectToDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
  } catch (error) {
    console.error("error Connecting to db",error);
  }
};
