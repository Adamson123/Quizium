import express from "express";
import { createQuiz, getAllQuizzes } from "../controllers/quiz-controller.js";
import multer from "multer";
import { QuizImageModel } from "../models/QuizImageModel.js";
import { CustomError } from "../errors/CustomError.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const router = express.Router();

router.post("/", upload.single("file"), createQuiz);
router.get("/", getAllQuizzes);
router.post("/uploadImage", upload.single("file"), async (req, res) => {
    try {
        const { originalname, buffer, mimetype } = req.file;

        console.log("buffer", buffer);

        const image = await QuizImageModel.create({
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
