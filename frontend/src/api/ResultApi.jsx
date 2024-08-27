import { requestOptions } from "./utils/RequestOptions";

export const createResult = async (info) => {
    try {
        const res = await fetch(
            `/api/result`,
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

export const getSingleResult = async (id) => {
    try {
        const res = await fetch(`/api/result/${id}`);

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (error) {
        console.log("error fr crt", error);
        throw { err: error.message };
    }
};
