import { UsersModel } from "../models/UsersModel.js";
import { CustomError } from "../errors/CustomError.js";
import { hashPassword } from "../utils/hashPassword.js";
import { ProfImagesModel } from "../models/ProfImagesModel.js";

//get user info function
export const getUser = async (req, res) => {
    const { userId } = req;
    const userInfo = await UsersModel.findById(userId)
        .populate("profileImg")
        .select("-password");

    if (!userInfo) throw new CustomError("404 user not", 404);

    res.status(200).json(userInfo);
};

//update personal info function
export const updatePersonalInfo = async (req, res) => {
    const { name } = req.body;
    const { userId, file } = req;

    if (!name) throw new CustomError("Please provide your new username", 400);

    if (name.length < 3) {
        throw new CustomError(
            "Username must be atleast 3 characters long",
            400
        );
    } else if (name.length > 35) {
        throw new CustomError("Username cannot exceed 35 characters", 400);
    }

    const user = req.user;

    let image;
    if (file) {
        const { buffer, mimetype } = file;

        image = await ProfImagesModel.findById(user.profileImg);

        if (image) {
            console.log("already here");
            //if they do, update it
            image = await ProfImagesModel.findOneAndUpdate(user.profileImg, {
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
            });
        } else {
            //if the user doesn't have a profile image, create one
            console.log("not here");
            image = await ProfImagesModel.create({
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
            });
        }

        const updateImage = () => {
            const hasProfileImg = () => {
                return user.profileImg && user.profileImg;
            };
            /*return profile image id if one was created or updated above, else return 
              the id of the old profileImg of the quiz if there is one else nothing🙄
            */
            return image ? image._id : hasProfileImg();
        };

        await UsersModel.findByIdAndUpdate(
            { _id: userId },
            { name, profileImg: updateImage() }
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
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const { userId } = req;

    if (!currentPassword || !newPassword)
        throw new CustomError(
            "Please provide both current and new passwords",
            400
        );
    if (newPassword.length < 4) {
        throw new CustomError(
            "Password must be atleast 4 characters long",
            400
        );
    }

    if (newPassword !== confirmPassword) {
        throw new CustomError(
            "New password and Confirm password inputs does not match",
            400
        );
    }

    const user = req.user;

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
