import mongoose from "mongoose";

const ResultsSchema = new mongoose.Schema(
    {
        results: [
            {
                question: String,
                answer: Array,
                questionType: String,
                options: Array,
                userAnswer: Array,
                correct: Boolean,
                questionId: String,
                // image: {
                //     type: mongoose.Schema.Types.ObjectId,
                //     ref: "question-images",
                // },
                timeRemaining: Number,
                answerType: String,
            },
        ],
        questionsLength: {
            type: Number,
        },
        title: String,
        resultOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "quiz-infos",
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
        points: Number,
        entireTimeSpent: Number,
        quizType: {
            type: String,
            required: true,
            enum: ["solo", "live"],
        },
        hostInfos: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "host-infos",
        },
    },
    { timestamps: true }
);

export const ResultsModel = mongoose.model("results", ResultsSchema);
