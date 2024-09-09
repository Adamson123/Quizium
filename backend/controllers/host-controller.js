import { HostInfoModel } from "../models/HostInfoModel.js";
import { CustomError } from "../errors/CustomError.js";

export const createHost = async (req, res) => {
    const { id, applyTime, questionsLength, title } = req.body;
    if (!id) throw new CustomError("Please provide host id", 400);

    const generateRandomCode = () => {
        const randomCode = Math.floor(Math.random() * 90000000) + 10000000;
        return randomCode;
    };
    let joinCode = generateRandomCode();

    const alreadyExist = await HostInfoModel.findOne({ joinCode: joinCode });
    //making sure code generated is not already used for another hosted quiz

    while (alreadyExist) {
        console.log("already existed");
        joinCode = generateRandomCode();
    }
    const userId = req.userId;
    const hostInfo = await HostInfoModel.create({
        joinCode,
        hostedBy: userId,
        quizId: id,
        participants: [],
        questionsLength,
        applyTime,
        participantsResults: [],
        title,
    });

    res.status(200).json({ msg: "Hosty ghosty", id: hostInfo._id });
};

export const getHost = async (req, res) => {
    const { joinCode, id } = req.query;
    // console.log(joinCode, id);

    if (!joinCode && id)
        throw new CustomError("Please provide host code or id", 400);

    let host = {};
    if (Number(joinCode)) {
        host["joinCode"] = Number(joinCode);
    }
    if (id) {
        host["_id"] = id;
    }

    let hostInfo;
    if (!id) {
        hostInfo = await HostInfoModel.findOne(host);
    } else {
        hostInfo = await HostInfoModel.findOne(host).populate(
            "participantsResults.result"
        );
    }

    if (!hostInfo) {
        throw new CustomError("Room not found", 400);
    }

    //if we are trying to get the quiz with joincode and it's ended
    if (hostInfo.ended && Number(joinCode)) {
        throw new CustomError("Quiz has ended", 400);
    }

    res.status(200).json({
        msg: joinCode ? "Room Successfully found!." : "Getty Hosty",
        hostInfo,
    });
};

export const getUserHosts = async (req, res) => {
    const userId = req.userId;
    const hosts = await HostInfoModel.find({ hostedBy: userId });
    return res
        .status(200)
        .json({ msg: "You asked for your results?🤔", hosts });
};

export const deleteHost = async (req, res) => {
    //console.log(id, "here");
    const { id } = req.params;
    const host = await HostInfoModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Host info deleted", host });
};

const alreadyJoined = async (info) => {
    const hostInfo = await HostInfoModel.findByIdAndUpdate(info.id);
    const joined = hostInfo.participants
        .map((par) => {
            return par.userId;
        })
        .includes(info.userId);
    return { joined, hostInfo };
};

export const getHostInfo = (socket, io) => {
    socket.on("get-host-info", async (id) => {
        socket.join(id);
        const hostInfo = await HostInfoModel.findById(id);

        if (hostInfo.ended) {
            // socket
            //     .to(id)
            //     .emit("get-host-info-res", { err: "Live quiz was ended" });
            socket.join(socket.id);
            io.to(socket.id).emit("get-host-info-res", {
                err: "Quiz was ended",
            });
            return;
        }
        //socket.to(id).emit("get-host-info-res", hostInfo);
        io.to(id).emit("get-host-info-res", hostInfo);
    });
};

export const joinUser = (socket, io) => {
    socket.on("join-user", async (info) => {
        socket.join(info.id);
        let hostInfo;
        const alreadyJoinedRoom = await alreadyJoined(info);
        //checking if user has already joined

        if (!alreadyJoinedRoom.joined) {
            console.log("never joined");
            hostInfo = await HostInfoModel.findByIdAndUpdate(
                info.id,
                {
                    $push: {
                        participants: [info],
                    },
                },
                { new: true }
            );
        } else {
            console.log("already joined");
            hostInfo = alreadyJoinedRoom.hostInfo;
        }

        //socket.to(info.id).emit("get-host-info-res", hostInfo);
        io.to(info.id).emit("get-host-info-res", hostInfo);
    });
};

export const endLive = (socket, io) => {
    socket.on("end-live", async (id) => {
        socket.join(id);
        const hostInfo = await HostInfoModel.findByIdAndUpdate(
            id,
            { ended: true },
            { new: true }
        );
        const {
            _id,
            joinCode,
            hostedBy,
            quizId,
            participants,
            started,
            ended,
            createdAt,
            updatedAt,
            participantsResults,
        } = hostInfo;
        //
        io.to(id).emit("get-host-info-res", {
            err: "Quiz was ended",
            msg: "Live quiz ended",
            _id,
            joinCode,
            hostedBy,
            quizId,
            participants,
            started,
            ended,
            createdAt,
            updatedAt,
            participantsResults,
        });
        //io.to(id).emit("get-host-info-res", { err: "live quiz ended" });
    });
};

export const startQuiz = (socket, io) => {
    socket.on("start-quiz", async (id) => {
        socket.join(id);
        const hostInfo = await HostInfoModel.findByIdAndUpdate(
            id,
            {
                started: true,
            },
            { new: true }
        );
        const {
            _id,
            joinCode,
            hostedBy,
            quizId,
            participants,
            started,
            ended,
            createdAt,
            updatedAt,
            participantsResults,
        } = hostInfo;

        io.to(id).emit("get-host-info-res", {
            _id,
            joinCode,
            hostedBy,
            quizId,
            participants,
            started,
            ended,
            createdAt,
            updatedAt,
            triggerPlay: true,
            participantsResults,
        });
    });
};

export const leaveRoom = (socket, io) => {
    socket.on("leave-room", async (info) => {
        socket.join(info.id);
        const hostInfo = await HostInfoModel.findByIdAndUpdate(
            info.id,
            {
                $pull: { participants: { userId: info.userId } },
            },
            { new: true }
        );

        io.to(info.id).emit("get-host-info-res", hostInfo);
        // io.to(info.id).emit("remove-room", hostInfo);
        //socket.in(info.id).socketsLeave(info.id);
    });
};

export const updatePoints = (socket, io) => {
    socket.on("update-points", async (info) => {
        socket.join(info.id);

        const hostInfo = await HostInfoModel.findOneAndUpdate(
            {
                _id: info.id,
                "participants.userId": info.userId,
            },
            {
                $set: { "participants.$.points": info.points },
            },
            { new: true }
        );

        //socket.to(info.id).emit("get-host-info-res", hostInfo);
        io.to(info.id).emit("get-host-info-res", hostInfo);
    });
};

export const quizEnded = (socket, io) => {
    //tells us if quiz has ended
    socket.on("quiz-ended", async (id) => {
        const hostInfo = await HostInfoModel.findById(id);
        const {
            _id,
            joinCode,
            hostedBy,
            quizId,
            participants,
            started,
            ended,
            createdAt,
            updatedAt,
            participantsResults,
        } = hostInfo;
        if (ended) {
            socket.join(socket.id);
            io.to(socket.id).emit("quiz-ended-res", {
                _id,
                joinCode,
                hostedBy,
                quizId,
                participants,
                started,
                ended,
                createdAt,
                updatedAt,
                participantsResults,
            });
        }
    });
};
