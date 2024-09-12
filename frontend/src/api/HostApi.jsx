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

export const getUserHosts = async () => {
    try {
        const res = await fetch(`/api/host/user-hosts`, {
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.err);
        return data;
    } catch (error) {
        throw { err: error.message };
    }
};

export const deleteHost = async (id) => {
    try {
        const res = await fetch(
            `/api/host/${id}`,
            requestOptions({}, "", "DELETE")
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (error) {
        console.log("error from  update quiz settings ", error);
        throw { err: error.message };
    }
};

//http://localhost:3002

const localApi =
    window.location.origin.substring(
        0,
        window.location.origin.lastIndexOf(":")
    ) + ":3002/host-live";

const publicApi = "https://quizium-test.onrender.com/host-live";

export const socket = io(publicApi, {
    autoConnect: false,
});
