const SocketState = ({ socket }) => {
    socket.on("connecting", () => {
        return (
            <h1 className="text-yellow-400 isidoraBold text-[13px]">
                connect<span className="">...</span>
            </h1>
        );
    });

    if (socket.connected) {
        return (
            <h1 className="text-green-400 isidoraBold text-[13px]">
                connected <span className="bi-wifi"></span>
            </h1>
        );
    } else {
        return (
            <h1 className="text-red-400 isidoraBold text-[13px]">
                disconnected <span className="bi-wifi-off"></span>
            </h1>
        );
    }
};

export default SocketState;
