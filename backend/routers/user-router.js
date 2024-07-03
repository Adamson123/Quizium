import express from "express";
import {
  getUser,
  updatePassword,
  updatePersonalInfo,
} from "../controllers/user-controller.js";
import { jwtCheckAndVerify } from "../middlewares/jwtCheckAndVerify.js";
//import { uploadFile } from "../config/gridFsDB";
import { upload } from "../config/gridFsDB.js";

export const router = express.Router();

router.get("/", jwtCheckAndVerify, getUser);
router.patch("/personal", jwtCheckAndVerify, upload.single("file"), updatePersonalInfo);
router.patch("/password", jwtCheckAndVerify, updatePassword);
