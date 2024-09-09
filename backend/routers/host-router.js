import express from "express";
import {
    createHost,
    deleteHost,
    getHost,
    getUserHosts,
} from "../controllers/host-controller.js";

export const router = express.Router();

router.post("/", createHost);
router.get("/", getHost);
router.delete("/:id", deleteHost);
router.get("/user-hosts", getUserHosts);
