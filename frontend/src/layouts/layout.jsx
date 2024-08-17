import { createContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { getUser } from "../api/UserApi";
import bufferToObjUrl from "../utils/bufferToObjUrl";
import newUser from "../assets/images/defaultProfile/newUser.png";
import { useQuery } from "react-query";

export const dataContext = createContext();

const Layout = ({ children, text }) => {
    const { data, refetch } = useQuery(["user"], getUser, { retry: false });
    let { profileImg, email, name, isLoading, _id } = data;

    const [profileImage, setProfileImage] = useState(
        profileImg ? bufferToObjUrl(profileImg.image.data.data) : newUser
    );

    const [search, setSearch] = useState("");
    const value = {
        data,
        refetch,
        profileImage,
        setProfileImage,
        email,
        name,
        isLoading,
        search,
        userId: _id,
    };

    return (
        <div className="flex flex-col">
            <dataContext.Provider value={value}>
                <Header text={text} search={search} setSearch={setSearch} />
                {children}
            </dataContext.Provider>
        </div>
    );
};

export default Layout;
