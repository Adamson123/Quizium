import { Navigate, Outlet } from "react-router";
import { getUser } from "../api/UserApi";

import PageIsLoading from "../components/ui/PageIsLoading";
import { useQuery } from "react-query";
import bufferToObjUrl from "../utils/bufferToObjUrl";
import newUser from "../assets/images/defaultProfile/newUser.png";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
    const { data, refetch, isLoading } = useQuery(["user"], getUser, {
        retry: false,
    });

    // const [search, setSearch] = useState("");

    // useEffect(() => {
    //     if (!data) {
    //         return;
    //     }
    //     let { profileImg, email, name, isLoading, _id } = data;

    //     const [profileImage, setProfileImage] = useState(
    //         profileImg ? bufferToObjUrl(profileImg.image.data.data) : newUser
    //     );

    //     const value = {
    //         data,
    //         refetch,
    //         profileImage,
    //         setProfileImage,
    //         email,
    //         name,
    //         isLoading,
    //         search,
    //         userId: _id,
    //     };
    // }, [data]);

    if (isLoading) {
        return <PageIsLoading />;
    }

    if (!data) return <Navigate to="login" />;

    return <Outlet />;
};

export default ProtectedRoutes;
