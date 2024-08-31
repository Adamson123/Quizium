import { HostInfoModel } from "../models/HostInfoModel.js";
import { CustomError } from "../errors/CustomError.js";
export const createHost = async (req, res) => {
    const { id } = req.body;
    if (!id) throw new CustomError("Please provide host id", 400);

    const generateRandomCode = () => {
        const randomCode = Math.floor(Math.random() * 9000000) + 1000000;
        return randomCode;
    };
    const userId = req.userId;
    const hostInfo = await HostInfoModel.create({
        joinCode: generateRandomCode(),
        hostedBy: userId,
        quizId: id,
        participants: [],
    });

    res.status(200).json({ msg: "Hosty ghosty", id: hostInfo._id });
};

export const getHost = async (req, res) => {
    const { joinCode, id } = req.query;
    if (!joinCode && id)
        throw new CustomError("Please provide host code or id", 400);

    let host = {};
    if (joinCode) {
        host["joinCode"] = Number(joinCode);
    }
    if (id) {
        host["_id"] = id;
    }
    const hostInfo = await HostInfoModel.findOne(host);

    if (!hostInfo) {
        throw new CustomError("Room not found", 400);
    }

    res.status(200).json({ msg: "Room found ✔", id: hostInfo._id });
};

export const getHostInfo = (socket, io) => {
    socket.on("get-host-info", async (id) => {
        const hostInfo = await HostInfoModel.findById(id);
        socket.broadcast.emit("get-host-info-res", hostInfo);
        io.emit("get-host-info-res", hostInfo);
    });
};

export const addUser = (socket, io) => {
    socket.on("get-user-info", async (info) => {
        await HostInfoModel.findByIdAndUpdate(info.id, {
            $push: {
                participants: [info],
            },
        });
        const hostInfo = await HostInfoModel.findById(info.id);
        socket.broadcast.emit("get-host-info-res", hostInfo);
        io.emit("get-host-info-res", hostInfo);
    });
};
