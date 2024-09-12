import { useQuery } from "react-query";

import { requestOptions } from "./utils/RequestOptions";

export const getUser = async () => {
    const res = await fetch(`https://quizium.onrender.com/api/user`, {
        credentials: "include",
    });

    if (!res.ok) throw new Error("error signing up");
    const data = await res.json();
    //console.log(data);
    return data;
};

export const updatePersonalInfoFunc = async (info) => {
    try {
        const res = await fetch(
            `/api/user/personal`,
            requestOptions(info, "", "PATCH")
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err);
        }

        return data;
    } catch (error) {
        console.log("error fr crt", error);
        throw { err: error.message };
    }
};

export const updatePasswordFunc = async (info) => {
    try {
        const res = await fetch(
            `/api/user/password`,
            requestOptions(info, "application/json", "PATCH")
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err);
        }

        return data;
    } catch (error) {
        console.log("error fr crt", error);

        throw { err: error.message };
    }
};

export const addToFavorites = async (info) => {
    try {
        const res = await fetch(
            `/api/user/favorite/`,
            requestOptions(info, "application/json", "PATCH")
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err);
        }

        return data;
    } catch (error) {
        console.log("error fr crt", error);
        if (error.message === "Failed to fetch") {
            throw { err: "Please check your connection" };
        }
        throw { err: error.message };
    }
};
