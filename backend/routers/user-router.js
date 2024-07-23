import express from "express";
import {
    //getProfileImg,
    getUser,
    updatePassword,
    updatePersonalInfo,
} from "../controllers/user-controller.js";
import multer from "multer";
import { ProfImagesModel } from "../models/ProfImagesModel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const router = express.Router();

router.get("/", getUser);
router.patch("/personal", upload.single("file"), updatePersonalInfo);

router.patch("/password", updatePassword);
