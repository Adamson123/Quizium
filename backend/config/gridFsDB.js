import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const conn = mongoose.connection;
export let gfs;
export let gridfsBucket;
export const connectToGridFs = async () => {
    try {
        conn.once("open", () => {
            gfs = Grid(conn.db, mongoose.mongo);
            gfs.collection("images");

            gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: "images",
            });
            console.log("GridFS is connected and ready to use");

            //console.log("gfs",gfs);
        });
    } catch (err) {
        console.error("Error connecting to GridFS DB", err.message);
    }
};

conn.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
});

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise(async (resolve, reject) => {
            const isExist = await gfs.files
                .find({ filename: req.userId })
                .toArray();

            if (file) {
                console.log("file passed");
            } else {
                console.log("no file passed");
            }

            //checking if file already exist
            if (isExist.length > 0) {
                //true delete file
                console.log("file on delete");
                isExist.forEach((f) => {
                    console.log(f._id);
                    gridfsBucket.delete(f._id);
                });
            }

            const fileInfo = {
                filename: req.userId || "newUser",
                bucketName: "images",
            };

            resolve(fileInfo);
        });
    },
});

export const upload = multer({ storage });
