import { requestOptions } from "./utils/RequestOptions";

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

export const googleLogin = async (info) => {
    try {
        const res = await fetch(
            `/api/auth/google-login`,
            postOptions({ token: info.credential })
        );
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

export const resetPasswordLink = async (email) => {
    try {
        const res = await fetch(
            `/api/auth/reset-password-link`,
            requestOptions({ email }, "application/json", "POST")
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

export const resetPassword = async (info) => {
    try {
        const res = await fetch(
            `/api/auth/reset-password?token=${info.token}`,
            requestOptions(
                { password: info.password },
                "application/json",
                "PATCH"
            )
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
