import express from "express";
import {
    createQuestion,
    deleteQuestion,
    updateQuestion,
} from "../controllers/question-controller.js";
import { quizExist } from "../middlewares/quizExist.js";
import multer from "multer";

export const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });

router.post("/:id", quizExist, upload.single("file"), createQuestion);
router.patch("/:id", quizExist, upload.single("file"), updateQuestion);
router.delete("/:id", quizExist, deleteQuestion);
