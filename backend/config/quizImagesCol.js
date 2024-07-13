import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const conn = mongoose.connection;

let gfs;

export const connectToQuizImagesCol = () => {
    try {
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection("quiz-images");

        console.log("connected to quiz images collection");
    } catch (error) {
        console.log(
            "error connecting to quiz images collection",
            error.message
        );
    }
};

const storage = GridFsStorage({
    url: process.env.MONGO_URI,
    file: async (req, res) => {
        const fileInfo = {
            filename: "default",
            bucketName: "quiz-images",
        };
    },
});

const uploadToQuizImagesCol = multer({ storage });
