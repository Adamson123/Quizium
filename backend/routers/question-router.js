import express from "express";
import {
    createQuestion,
    updateQuestion,
} from "../controllers/question-controller.js";

export const router = express.Router();

router.post("/:id", createQuestion);
router.patch("/:id", updateQuestion);
