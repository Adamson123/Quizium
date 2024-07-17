import mongoose from "mongoose";
const QuizInfoSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "General Knowledge",
            "Entertainment",
            "Science & Technology",
            "Sports",
            "Pop Culture",
            "Academic",
            "Lifestyle",
            "Miscellaneuos",
        ],
        required: true,
    },
    timeLimit: {
        type: Number,
        required: true,
    },
    applyTime: {
        type: String,
        required: true,
        enum: ["entire", "each"],
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        required: true,
    },
    questionsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
    },
    coverImg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz-images",
        required: true,
    },
    numOfPlays: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
});

export const QuizInfoModel = mongoose.model("quiz-infos", QuizInfoSchema);
