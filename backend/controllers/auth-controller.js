import { UsersModel } from "../models/UsersModel.js";
import { CustomError } from "../errors/CustomError.js";
import { handleTokenAndCookie } from "../utils/handleTokenAndCookie.js";
import { hashPassword } from "../utils/hashPassword.js";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    console.log("somebody hit create user");
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new CustomError("Please provide all required info", 400);
    }

    const userExist = await UsersModel.findOne({ email });

    if (userExist) throw new CustomError("Email has already been used", 400);

    if (password.length < 4) {
        throw new CustomError(
            "Password must be atleast 4 characters long",
            400
        );
    }

    const nameUsed = await UsersModel.findOne({ name });
    if (nameUsed) {
        throw new CustomError("Username has already been taken", 400);
    }
    if (name.length < 3) {
        throw new CustomError(
            "Username must be atleast 3 characters long",
            400
        );
    } else if (name.length > 35) {
        throw new CustomError("Username cannot exceed 35 characters", 400);
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        throw new CustomError("Please provide a valid email address", 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await UsersModel.create({
        ...req.body,
        password: hashedPassword,
    });
    //}

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

    if (!user?.password) {
        throw new CustomError("Invalid Password", 401);
    }
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) throw new CustomError("Invalid Password", 401);

    handleTokenAndCookie(user._id, res);

    return res.status(200).json({ msg: "Welcome Back" });
};

export const googleLogin = async (req, res) => {
    const { token } = req.body;
    if (!token) throw new CustomError("Authentication error", 401);

    const client = new OAuth2Client(process.env.CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await UsersModel.findOne({ email });

    if (!user) {
        user = await UsersModel.create({
            email,
            name,
            googleId,
        });
    }

    handleTokenAndCookie(user._id, res);

    return res.status(200).json({ msg: "Welcome" });
    //console.log(userInfo);
};

export const resetPassword = async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;

    const verifyToken = jwt.verify(token, process.env.JWT_KEY);
    if (!verifyToken) {
        throw new CustomError("Invalid token", 401);
    }
    const { id } = verifyToken;

    const hashedPassword = await hashPassword(password);

    await UsersModel.findByIdAndUpdate(id, {
        password: hashedPassword,
    });

    return res.status(200).json({ msg: "Password has been rest" });
};

export const resetPasswordLink = async (req, res) => {
    const { email } = req.body;

    const user = await UsersModel.findOne({ email: email.email });

    if (!user) throw new CustomError("User with email does not exist", 404);

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dapoajibade66@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const localApi = "http://localhost:5173";
    const publicApi = "https://quizium.onrender.com";

    const mailOptions = {
        from: '"Quizium Support" <dapoajibade66@gmail.com>',
        to: email.email,
        subject: "Reset your password",
        text: "Click the link to reset your password: <link>",
        html: `<p>Click the link to reset your password: <a href=${publicApi}/reset-password/${token}>Reset Password</a></p>`,
    };

    transporter
        .sendMail(mailOptions)
        .then((info) => {
            //console.log(info);

            return res
                .status(200)
                .json({ msg: "Reset link has been sent to your email" });
        })
        .catch((error) => {
            console.log(error);

            return res.status(500).json({ err: "Error sending reset link" });
        });
};

export const logout = async (req, res) => {
    console.log("somebody hit logout user");
    res.cookie("token", {});
    return res.status(200).json({ msg: "logged out successfully" });
};
