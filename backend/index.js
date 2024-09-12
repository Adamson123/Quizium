import "dotenv/config";
import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

import { router as hostRouter } from "./routers/host-router.js";
import { router as authRouter } from "./routers/auth-router.js";
import { router as userRouter } from "./routers/user-router.js";
import { router as quizRouter } from "./routers/quiz-router.js";
import { router as questionRouter } from "./routers/question-router.js";
import { router as resultRouter } from "./routers/result-router.js";
import { notFoundMiddleWare } from "./middlewares/notFoundMiddleware.js";
import { getInfoAtStart, tableLog } from "./utils/tableLog.js";
import { jwtCheckAndVerify } from "./middlewares/jwtCheckAndVerify.js";
import { Server } from "socket.io";
import path from "path";
import {
    joinUser,
    getHostInfo,
    endLive,
    startQuiz,
    leaveRoom,
    updatePoints,
    quizEnded,
} from "./controllers/host-controller.js";

const app = express();
const __dirname = path.resolve();
const server = http.createServer(app);

app.use(
    cors({
        origin: [
            "http://192.168.43.224:5173",
            "http://localhost:5173",
            "http://127.0.0.1:5500",
            "https://quiziumtest.onrender.com",
        ],
        credentials: true,
        methods: ["POST", "GET", "DELETE", "PATCH"],
    })
);

let io = new Server(server, {
    cors: {
        origin: "*",
    },
});

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
app.use("/api/host", jwtCheckAndVerify, hostRouter);

app.get("/api", (req, res) => {
    res.send("welcome to Quizium server🎉");
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend", "dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.use(notFoundMiddleWare);
app.use(errorMiddleware);

io = io.of("/host-live");

io.on("connection", async (socket) => {
    console.log("user connected with id:" + socket.id);
    socket.on("testing", (msg) => {
        console.log("Someone is testing", msg);
        io.to(socket.id).emit("testing-res", "Responding");
    });
    getHostInfo(socket, io);
    joinUser(socket, io);
    startQuiz(socket, io);
    leaveRoom(socket, io);
    updatePoints(socket, io);
    endLive(socket, io);
    quizEnded(socket, io);
    socket.on("disconnect", () => {
        console.log("user with id:" + socket.id + " has been disconnected");
    });
});

export default server;
