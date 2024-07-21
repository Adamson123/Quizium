import { requestOptions } from "./utils/RequestOptions";

export const createQuestion = async (info) => {
    console.log(info);
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
