import express from "express";
import { createHost, getHost } from "../controllers/host-controller.js";

export const router = express.Router();

router.post("/", createHost);
router.get("/", getHost);
