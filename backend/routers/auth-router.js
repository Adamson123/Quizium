import express from "express";
import {
    googleLogin,
    login,
    logout,
    resetPassword,
    resetPasswordLink,
    signup,
} from "../controllers/auth-controller.js";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.patch("/reset-password", resetPassword);
router.post("/reset-password-link", resetPasswordLink);
router.post("/logout", logout);
