import Leaderboard from "../../components/HostLiveComps/Leaderboard";

const ResLeaderboard = ({ toShow, getUserResult, userId, data }) => {
    return (
        <div
            className={`p-2 md:w-[50%] bg-mainBg
                 rounded flex flex-col gap-3  ${
                     toShow === "LD" ? "flex" : "hidden"
                 } md:flex`}
        >
            <div className="flex gap-3 w-full">
                {/* Title  Answer Summary*/}
                <div
                    className="text-center p-2 border
                         border-grayFive rounded isidoraBold text-[13px]
                          flex-1 hidden md:flex justify-center"
                >
                    Leaderboard
                </div>
            </div>

            <Leaderboard
                showHeader={false}
                participants={data?.hostInfo.participants}
                //each row/participants style
                rowEdit={`bg-transparentBlack w-full p-1 px-3
                         rounded overflow-y-auto overflow-x-hidden 
                         shadow-[rgba(0, 0, 0, 0.4)] cursor-pointer`}
                //all parents result
                style={{ background: "transparent" }}
                //board containing participants style
                boardStyle={{
                    padding: "0px",
                    gap: "8px",
                }}
                setResult={getUserResult}
                userId={userId}
            />
        </div>
    );
};

export default ResLeaderboard;
