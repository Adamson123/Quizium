import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";



const conn = mongoose.connection;
let gfs;

export const connectToGridFs = async () => {
  try {
    conn.once("open", () => {
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection("images");
      console.log("GridFS is connected and ready to use");
    });
  } catch (err) {
    console.error("Error connecting to GridFS DB", err);
  }
};

conn.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const _id = new mongoose.Types.ObjectId();
      const fileInfo = {
        filename: file.originalname,
        bucketName: "images",
        userId: "req",
        metadata: _id,
        _id
      };

      resolve(fileInfo);
    });
  },
});

export const upload = multer({ storage });
