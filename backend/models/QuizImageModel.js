import mongoose from "mongoose";

const quizImageSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
});

export const QuizImageModel = mongoose.model("quiz-images", quizImageSchema);
