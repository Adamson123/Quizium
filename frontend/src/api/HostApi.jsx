import { requestOptions } from "./utils/RequestOptions";
import { io } from "socket.io-client";
export const createHost = async (info) => {
    try {
        const res = await fetch(
            `/api/host`,
            requestOptions(info, "application/json", "POST")
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (error) {
        console.log("error fr crt", error);
        throw { err: error.message };
    }
};

export const getHost = async (info) => {
    try {
        const res = await fetch(
            `/api/host?joinCode=${info.joinCode}&id=${info.id}`
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (error) {
        console.log("error fr crt", error);
        throw { err: error.message };
    }
};

export const socket = io("http://localhost:3002/host-live", {
    autoConnect: false,
});
