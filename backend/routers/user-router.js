import express from "express";
import {
    //getProfileImg,
    getUser,
    updatePassword,
    updatePersonalInfo,
} from "../controllers/user-controller.js";
import multer from "multer";
import { ProfImageModel } from "../models/ProfImageModel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const router = express.Router();

router.get("/", getUser);
//router.get("/image", getProfileImg);
router.post("/upload-prof", upload.single("file"), async (req, res) => {
    const { buffer, mimetype } = req.file;

    await ProfImageModel.create({
        // profId: userId,
        image: {
            data: buffer,
            contentType: mimetype,
        },
    });

    res.json({ msg: "uploaded To Profile Images collection" });
});
router.patch("/personal", upload.single("file"), updatePersonalInfo);

router.patch("/password", updatePassword);
