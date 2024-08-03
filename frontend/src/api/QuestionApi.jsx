import { requestOptions } from "./utils/RequestOptions";

export const createQuestion = async (info) => {
    try {
        const res = await fetch(
            `/api/question/${info.id}`,
            requestOptions(info.data, "application/json", "POST")
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (error) {
        throw { err: error.message };
    }
};

export const updateQuestion = async (info) => {
    try {
        const res = await fetch(
            `/api/question/${info.id}`,
            requestOptions(info.data, "application/json", "PATCH")
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.err);
        }

        return data;
    } catch (error) {
        throw { err: error.message };
    }
};