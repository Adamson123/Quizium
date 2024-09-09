import generateAvatar from "../utils/generateAvatar";
const Participants = ({ hostInfo, edit, style, showHead = true }) => {
    console.log(edit);

    return (
        <div style={style} className={`bg-transparentBlack rounded ${edit}`}>
            {showHead && (
                <div
                    className="p-3 border-b border-grayOne
                     flex items-center gap-2"
                >
                    <span className="isidoraSemiBold">
                        {hostInfo?.participants.length} participants
                    </span>
                    <span className="bi-people-fill text-grayFive"></span>
                </div>
            )}
            {/* Participants */}
            <div className="p-2 flex flex-col gap-3">
                {hostInfo?.participants.map((par, index) => {
                    return (
                        <div className="flex items-center gap-3" key={index}>
                            <span className="w-10 h-10">
                                <img
                                    src={generateAvatar(par.avatar)}
                                    alt="participant image"
                                    className="h-full w-full rounded-full"
                                />
                            </span>
                            <span className="text-[14px]">{par.nickname}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Participants;
