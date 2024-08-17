import { requestOptions } from "./utils/RequestOptions";

export const getQiuzzes = async (skip, limit) => {
    try {
        const res = await fetch(`/api/quiz?skip=${skip}&limit=${limit}`, {
            credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (error) {
        console.log("error from get quiz cover", error);
        throw { err: error.message };
    }
};

export const createQuiz = async (info) => {
    try {
        const res = await fetch(`/api/quiz`, requestOptions(info, "", "POST"));

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (error) {
        console.log("error fr crt", error);
        throw { err: error.message };
    }
};

export const updateQuiz = async (info) => {
    try {
        const res = await fetch(
            `/api/quiz/${info.id}`,
            requestOptions(info.formData, "", "PATCH")
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (error) {
        console.log("error from  update quiz settings ", error);
        throw { err: error.message };
    }
};

export const deleteQuiz = async (id) => {
    try {
        const res = await fetch(
            `/api/quiz/${id}`,
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

export const getQuizWithQuestions = async (config) => {
    const { id, checkOwner } = config;
    try {
        const res = await fetch(
            `/api/quiz/single-quiz/${id}?checkOwner=${checkOwner}`,
            {
                credentials: "include",
            }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.err);
        return data;
    } catch (error) {
        throw { err: error.message };
    }
};

export const getUserQuizzes = async () => {
    try {
        const res = await fetch(`/api/quiz/by-user`, {
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.err);
        return data;
    } catch (error) {
        throw { err: error.message };
    }
};
