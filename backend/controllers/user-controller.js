import { UsersModel } from "../models/UsersModel.js";
import { CustomError } from "../errors/CustomError.js";
import { hashPassword } from "../utils/hashPassword.js";
import { gfs, gridfsBucket } from "../config/gridFsDB.js";

/*

@

*/
export const getUser = async (req, res) => {
  const { userId } = req;
  const userInfo = await UsersModel.findById(userId);

  res.status(200).json(userInfo);
};

export const getProfileImg = async (req, res) => {
  const { userId } = req;
  const file = await gfs.files.findOne({ filename: userId });

  console.log(userId);
  const readStream = gridfsBucket.openDownloadStream(file._id);

  readStream.pipe(res);
};

export const updatePersonalInfo = async (req, res) => {
  const { name } = req.body;
  const { userId, file } = req;

  if (!name) throw new CustomError("Please provide your new username", 400);

  await UsersModel.findByIdAndUpdate({ _id: userId }, { name });

  if (file) {
    return res
      .status(200)
      .json({ msg: "Name and profile picture has been updated" });
  }

  res.status(200).json({ msg: "Name updated" });
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { userId } = req;

  if (!currentPassword || !newPassword)
    throw new CustomError("Please provide both current and new passwords", 400);

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
