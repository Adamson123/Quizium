import { useQuery } from "react-query";

export const getQiuzCoverFunc = (skip, limit) => {
    const getQiuzCover = async () => {
        const res = await fetch(`/api/quiz?skip=${skip}&limit=${limit}`, {
            credentials: "include",
        });
        //const res = await axios.post(`http://localhost:3002/api/auth/signup`, info);

        if (!res.ok) throw new Error("error signing up");
        const data = await res.json();

        //console.log("getQiuzCover called");

        return data;
    };

    const { data, isLoading, error, isSuccess, refetch } = useQuery({
        queryFn: getQiuzCover,
        queryKey: ["quiz-cover"],
        retry: false,
    });

    // console.log(data);

    // console.log("data from quiz cover", data);
    return { data, isLoading, error, isSuccess, refetch };
};
