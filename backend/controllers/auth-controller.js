import { UsersModel } from "../models/UsersModel.js";
import { CustomError } from "../errors/CustomError.js";
import { handleTokenAndCookie } from "../utils/handleTokenAndCookie.js";
import { hashPassword } from "../utils/hashPassword.js";
import { ProfImageModel } from "../models/ProfImageModel.js";

export const signup = async (req, res) => {
    console.log("somebody hit create user");
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomError("Please provide all required info", 400);
    }

    const userExist = await UsersModel.findOne({ email });

    if (userExist) throw new CustomError("Email has already been used", 400);

    const hashedPassword = await hashPassword(password);

    let user;

    if (req.file) {
        const { buffer, mimetype } = req.file;

        const image = await ProfImageModel.create({
            image: {
                data: buffer,
                contentType: mimetype,
            },
        });

        user = await UsersModel.create({
            ...req.body,
            password: hashedPassword,
            profileImg: image_id,
        });
    } else {
        user = await UsersModel.create({
            ...req.body,
            password: hashedPassword,
        });
    }

    handleTokenAndCookie(user._id, res);

    return res.status(201).json({ msg: "Account created" });
};

export const login = async (req, res) => {
    console.log("somebody hit login user");
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError("Please provide all info", 400);
    }

    const user = await UsersModel.findOne({ email });

    if (!user) throw new CustomError("Invalid Credentials", 401);

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) throw new CustomError("Invalid Password", 401);

    handleTokenAndCookie(user._id, res);

    return res.status(200).json({ msg: "Welcome Back" });
};

export const logout = async (req, res) => {
    console.log("somebody hit logout user");
    res.cookie("token", {});
    res.status(200).json({ msg: "logged out successfully" });
};
