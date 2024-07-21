import { createContext, useState } from "react";
import Header from "../components/Header";
import { getUser } from "../api/UserApi";
import BufferToObjUrl from "../utils/BufferToObjUrl";
import newUser from "../assets/images/defaultProfile/newUser.png";
import { useQuery } from "react-query";

export const dataContext = createContext();

const Layout = ({ children }) => {
    const { data, refetch } = useQuery(["user"], getUser, { retry: false });
    let { profileImg, email, name, isLoading } = data;

    const [profileImage, setProfileImage] = useState(
        profileImg ? BufferToObjUrl(profileImg.image.data.data) : newUser
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
