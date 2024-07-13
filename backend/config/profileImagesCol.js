import mongoose from "mongoose";
import Grid from "gridfs-stream";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const conn = mongoose.connection;
export let gfs;
export let gridfsBucket;
export const connectToProfileImagesCol = async () => {
    try {
        console.log(conn);
        conn.once("open", () => {
            gfs = Grid(conn.db, mongoose.mongo);
            gfs.collection("profile-images");

            gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: "profile-images",
            });
            console.log("GridFS is connected to profile Images collection");

            //console.log("gfs",gfs);
        });
    } catch (error) {
        console.error(
            "Error connecting to profile Images collection",
            error.message
        );
    }
};

// conn.on("error", (err) => {
//     console.error("MongoDB connection error:", err.message);
// });

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: async (req, file) => {
        // return new Promise(async (resolve, reject) => {
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
                // console.log(f._id);
                gridfsBucket.delete(f._id);
            });
        }

        const fileInfo = {
            filename: req.userId || "newUser",
            bucketName: "profile-images",
        };

        return fileInfo;

        //  });
    },
});

export const uploadToProfileImagesCol = multer({ storage });
