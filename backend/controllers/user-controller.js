import { UsersModel } from "../models/UsersModel.js";
import { CustomError } from "../errors/CustomError.js";
import { hashPassword } from "../utils/hashPassword.js";
import { gfs, gridfsBucket } from "../config/profileImagesCol.js";
import { ProfImageModel } from "../models/ProfImageModel.js";

//get user info function
export const getUser = async (req, res) => {
    const { userId } = req;
    const userInfo = await UsersModel.findById(userId).populate("profileImg");

    if (!userInfo) throw new CustomError("404 user not", 404);

    res.status(200).json(userInfo);
};

//update personal info function
export const updatePersonalInfo = async (req, res) => {
    const { name } = req.body;
    const { userId, file } = req;

    if (!name) throw new CustomError("Please provide your new username", 400);

    if (file) {
        const { buffer, mimetype } = file;

        let image = await ProfImageModel.findOne({ profId: userId });

        //if the user doesn't have a profile image, create one
        if (!image) {
            image = await ProfImageModel.create({
                profId: userId,
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
            });
        } else {
            //if they do, update it
            image = await ProfImageModel.findOneAndUpdate(
                { profId: userId },
                {
                    image: {
                        data: buffer,
                        contentType: mimetype,
                    },
                }
            );
        }

        await UsersModel.findByIdAndUpdate(
            { _id: userId },
            { name, profileImg: image._id }
        );

        return res
            .status(200)
            .json({ msg: "Name and profile picture has been updated" });
    }

    await UsersModel.findByIdAndUpdate({ _id: userId }, { name });

    res.status(200).json({ msg: "Name updated" });
};

//update password function
export const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req;

    if (!currentPassword || !newPassword)
        throw new CustomError(
            "Please provide both current and new passwords",
            400
        );

    const user = await UsersModel.findById(userId);

    if (!user) throw new CustomError("User not found", 404);

    const isMatch = await user.verifyPassword(currentPassword);

    if (!isMatch)
        throw new CustomError(
            "Current Password is incorrect, Please try again",
            403
        );

    const hashedPassword = await hashPassword(newPassword);

    await UsersModel.findByIdAndUpdate(
        { _id: userId },
        { password: hashedPassword }
    );

    res.status(200).json({ msg: "Password Updated" });
};
