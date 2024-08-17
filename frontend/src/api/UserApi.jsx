import { useQuery } from "react-query";

import { requestOptions } from "./utils/RequestOptions";

export const getUser = async () => {
    const res = await fetch(`/api/user`, {
        credentials: "include",
    });
    //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

    if (!res.ok) throw new Error("error signing up");
    const data = await res.json();
    //console.log(data);
    return data;
};

export const getProfilePicFunc = (info) => {
    const getProfilePic = async () => {
        try {
            const res = await fetch(
                `/api/user/image`,
                requestOptions(info, "", "GET")
            );
            //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

            if (!res.ok) throw new Error("error getting pic");

            let data = await res.blob();
            data = URL.createObjectURL(data);
            //  console.log(data);
            return data;
        } catch (error) {
            console.log("error fr crt", error);
        }
    };

    const {
        data: image,
        isLoading,
        error,
        isSuccess,
        refetch: refecthImage,
    } = useQuery({
        queryFn: getProfilePic,
        queryKey: ["image"],
        retry: false,
    });

    return { image, isLoading, error, isSuccess, refecthImage };
};

export const updatePersonalInfoFunc = async (info) => {
    try {
        const res = await fetch(
            `/api/user/personal`,
            requestOptions(info, "", "PATCH")
        );
        //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

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
        //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

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

export const addToFavorites = async (info) => {
    try {
        const res = await fetch(
            `/api/user/favorite/`,
            requestOptions(info, "application/json", "PATCH")
        );
        //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

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
