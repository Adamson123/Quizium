import express from "express";
import { quizExist } from "../middlewares/quizExist.js";
import {
    createResult,
    deleteResult,
    getSingleResult,
    getUserResults,
} from "../controllers/result-controller.js";

export const router = express.Router();

router.post("/", createResult);
router.delete("/:id", deleteResult);
router.get("/single-result/:id", getSingleResult);
router.get("/user-results", getUserResults);
