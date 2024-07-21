import mongoose from "mongoose";

const quizImagesSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
});

export const QuizImagesModel = mongoose.model("quiz-images", quizImagesSchema);
