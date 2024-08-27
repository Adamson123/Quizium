import "dotenv/config";
import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { router as authRouter } from "./routers/auth-router.js";
import { router as userRouter } from "./routers/user-router.js";
import { router as quizRouter } from "./routers/quiz-router.js";
import { router as questionRouter } from "./routers/question-router.js";
import { router as resultRouter } from "./routers/result-router.js";
import { notFoundMiddleWare } from "./middlewares/notFoundMiddleware.js";
import { getInfoAtStart, tableLog } from "./utils/tableLog.js";
import { jwtCheckAndVerify } from "./middlewares/jwtCheckAndVerify.js";

const app = express();

app.use(
    cors({
        origin: [
            "http://192.168.43.224:5173",
            "http://localhost:5173",
            "http://127.0.0.1:5500",
        ],
        credentials: true,
    })
);
app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(getInfoAtStart);
app.use(tableLog);

app.use("/api/auth", authRouter);
app.use("/api/user", jwtCheckAndVerify, userRouter);
app.use("/api/quiz", jwtCheckAndVerify, quizRouter);
app.use("/api/question", jwtCheckAndVerify, questionRouter);
app.use("/api/result", jwtCheckAndVerify, resultRouter);

app.get("/", (req, res) => {
    res.send("welcome to EduFrenzy server🎉");
});

app.use(notFoundMiddleWare);
app.use(errorMiddleware);

export default app;
