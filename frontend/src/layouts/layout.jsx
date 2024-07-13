import { createContext, useState } from "react";
import Header from "../components/Header";
import { getUserFunc } from "../api/UserApi";
import BufferToObjUrl from "../utils/BufferToObjUrl";

export const dataContext = createContext();

const Layout = ({ children }) => {
    const { data, refetch } = getUserFunc();

    const { profileImg, email, name, isLoading } = data;

    const [profileImage, setProfileImage] = useState(
        BufferToObjUrl(profileImg.image.data.data)
    );

    const value = {
        data,
        refetch,
        profileImage,
        setProfileImage,
        email,
        name,
        isLoading,
    };

    return (
        <div className="flex flex-col">
            <dataContext.Provider value={value}>
                <Header />
                {children}
            </dataContext.Provider>
        </div>
    );
};

export default Layout;
