import mongoose from "mongoose";
const QuizInfoSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    subject: {
        type: String,
        required: true,
    },
    timeLimit: {
        type: Number,
        required: true,
    },
    questionsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
    },
    coverImg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz-images",
    },
    numOfPlays: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
});

export const QuizInfoModel = mongoose.model("quiz-infos", QuizInfoSchema);
