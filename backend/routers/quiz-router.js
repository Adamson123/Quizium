import express from "express";
import {
    createQuiz,
    updateSingleQuizSettings,
    getMultipleQuizzes,
    getSingleQuizWithQuestions,
} from "../controllers/quiz-controller.js";
import multer from "multer";
import { QuizImagesModel } from "../models/QuizImagesModel.js";
import { CustomError } from "../errors/CustomError.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const router = express.Router();

router.post("/", upload.single("file"), createQuiz);
router.get("/", getMultipleQuizzes);
router.get("/:id", getSingleQuizWithQuestions);
router.patch("/:id", upload.single("file"), updateSingleQuizSettings);
router.post("/uploadImage", upload.single("file"), async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;

        console.log("buffer", buffer);

        const image = await QuizImagesModel.create({
            image: {
                data: buffer,
                contentType: mimetype,
            },
        });

        res.status(201).json({
            msg: "image uploaded successfully " + originalname + " " + mimetype,
        });
    } catch (error) {
        console.log("error uploading", error.message);
        throw CustomError("error uploading", error.message, 400);
    }
});
