import express from "express";
import { quizExist } from "../middlewares/quizExist.js";
import {
    createResult,
    getSingleResult,
} from "../controllers/result-controller.js";

export const router = express.Router();

router.post("/", createResult);
router.get("/:id", getSingleResult);
