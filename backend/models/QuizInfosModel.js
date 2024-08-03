import mongoose from "mongoose";
const QuizInfosSchema = new mongoose.Schema({
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
        default: "entire",
        enum: ["entire", "each"],
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        required: true,
        default: "public",
    },
    questionsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
    },
    coverImg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quiz-images",
    },
    draft: {
        type: Boolean,
        default: true,
    },
    numOfPlays: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
},{ timestamps: true });

export const QuizInfosModel = mongoose.model("quiz-infos", QuizInfosSchema);
