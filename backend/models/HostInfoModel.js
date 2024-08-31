import mongoose from "mongoose";
const HostInfoSchema = new mongoose.Schema(
    {
        joinCode: Number,
        hostedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "quiz-infos",
        },
        participants: [
            {
                socketId: String,
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                name: String,
                image: String,
            },
        ],
        started: {
            type: Boolean,
            default: false,
        },
        played: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
export const HostInfoModel = mongoose.model("host-infos", HostInfoSchema);
