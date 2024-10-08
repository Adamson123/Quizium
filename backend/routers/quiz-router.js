import express from "express";
import {
    createQuiz,
    updateQuiz,
    getMultipleQuizzes,
    getSingleQuizWithQuestions,
    getUserQuizzes,
    deleteQuiz,
    searchQuizzes,
} from "../controllers/quiz-controller.js";
import multer from "multer";
import { quizExist } from "../middlewares/quizExist.js";
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });

export const router = express.Router();

router.post("/", upload.single("file"), createQuiz);
router.get("/", getMultipleQuizzes);
router.get("/single-quiz/:id", quizExist, getSingleQuizWithQuestions);
router.get("/user-quizzes", getUserQuizzes);
router.get("/search-quizzes", searchQuizzes);
router.patch("/:id", quizExist, upload.single("file"), updateQuiz);
router.delete("/:id", quizExist, deleteQuiz);
