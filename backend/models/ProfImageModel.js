import mongoose from "mongoose";

const ProfImageSchema = new mongoose.Schema({
    profId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizinfos",
    },
    image: {
        data: Buffer,
        contentType: String,
    },
});

export const ProfImageModel = mongoose.model("profile-images", ProfImageSchema);
