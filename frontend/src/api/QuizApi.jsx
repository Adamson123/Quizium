import { useQuery } from "react-query";

const postOptions = (info, head, method) => {
    const isFormData = info instanceof FormData;
    console.log(isFormData);
    const options = {
        method: method ? method : "POST",
        credentials: "include",
        headers: {
            "Content-Type": head,
        },
        body: isFormData ? info : JSON.stringify(info),
    };

    if (isFormData) {
        // Delete the Content-Type header so that the browser can set it correctly
        delete options.headers["Content-Type"];
    }

    return options;
};

export const getQiuzCoverFunc = (skip, limit) => {
    const getQiuzCover = async () => {
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

    const { data, isLoading, error, isSuccess, refetch } = useQuery({
        queryFn: getQiuzCover,
        queryKey: ["quiz-cover"],
        retry: false,
    });

    return { data, isLoading, error, isSuccess, refetch };
};

export const createQuizFunc = async (info) => {
    try {
        const res = await fetch(`/api/quiz`, postOptions(info));

        const data = await res.json();

        if (!res.ok) throw new Error(data.err);

        return data;
    } catch (error) {
        console.log("error fr crt", error);
        throw { err: error.message };
    }
};
