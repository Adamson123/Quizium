import mongoose from "mongoose";

const quizImageSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizinfos",
    },
    image: {
        data: Buffer,
        contentType: String,
    },
});

export const QuizImageModel = mongoose.model("quiz-images", quizImageSchema);

//export default QuizImageModel;
