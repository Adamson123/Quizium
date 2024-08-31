import userImg from "../../assets/images/defaultProfile/newUser.png";
const Participants = ({ hostInfo }) => {
    return (
        <div className="bg-transparentBlack rounded">
            <div className="p-3 border-b border-grayOne flex items-center gap-2">
                <span className="isidoraSemiBold">3 participants</span>
                <span className="bi-people-fill text-grayFive"></span>
            </div>
            {/* Participants */}
            <div className="p-2 flex flex-col gap-3">
                {hostInfo?.participants.map((par) => {
                    return (
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-10">
                                <img
                                    src={userImg}
                                    alt="participant image"
                                    className="h-full w-full rounded-full"
                                />
                            </span>
                            <span className="text-[14px]">{par.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Participants;
