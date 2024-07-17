import { delayTest } from "../utils/delayTest";

const postOptions = (info) => {
    return {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    };
};

export const createUserFunc = async (info) => {
    try {
        // await delayTest();
        const res = await fetch(`/api/auth/signup`, postOptions(info));
        //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

        const data = await res.json();

        if (!res.ok) {
            console.log(data);
            throw new Error(data.err);
        }

        return data;
    } catch (error) {
        console.log("error from create", error);
        throw { err: error.message };
    }
};

export const loginUserFunc = async (info) => {
    try {
        // await delayTest();

        const res = await fetch(`/api/auth/login`, postOptions(info));
        //const res = await axios.post(`http://localhost:3002/api/auth/login`, info);

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err);
        }
        return data;
    } catch (error) {
        console.log(error);
        throw { err: error.message };
    }
};

export const logoutUserFunc = async () => {
    try {
        const res = await fetch("/api/auth/logout", postOptions({}));

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err);
        }

        return data;
    } catch (error) {
        console.log(error);
        throw { err: error.message };
    }
};
