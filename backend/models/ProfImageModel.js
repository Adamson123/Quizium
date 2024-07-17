import mongoose from "mongoose";

const ProfImageSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
});

export const ProfImageModel = mongoose.model("profile-images", ProfImageSchema);
