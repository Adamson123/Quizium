import "dotenv/config";
import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/db.js";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { router as authRouter } from "./routers/auth-router.js";
import { router as userRouter } from "./routers/user-router.js";
import { notFoundMiddleWare } from "./middlewares/notFoundMiddleware.js";
import { getInfoAtStart, tableLog } from "./utils/tableLog.js";
import { connectToGridFs } from "./config/gridFsDB.js";

const app = express();

app.use(
  cors({
    origin: ["http://192.168.43.224:5173", "http://localhost:5173"],
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
app.use("/api/user", userRouter);


app.get("/", (req, res) => {
  res.send("welcome to EduFrenzy server🎉");
});

app.use(notFoundMiddleWare);
app.use(errorMiddleware);

const start = async () => {
  try {
    connectToDB();
    connectToGridFs();
    app.listen(3002, () => {
      console.log("Quizium server is on!!! ./backend/server");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
