import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { CustomError } from "../errors/CustomError.js";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [3, "Username must be atleast 3 characters long"],
            maxlength: [35, "Username cannot exceed 35 characters"],
            unique:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: [4, "Password must be atleast 4 characters long"],
        },
        profileImg: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "profile-images",
        },
    },
    { timestamps: true }
);

UserSchema.methods.verifyPassword = async function (inputedPassword) {
    if (!this.password) {
        throw new CustomError("Something went wrong", 500);
    }
    const isMatch = await bcrypt.compare(inputedPassword, this.password);
    return isMatch;
};

export const UsersModel = mongoose.model("users", UserSchema);
