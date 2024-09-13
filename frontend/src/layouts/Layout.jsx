import { createContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { getUser } from "../api/UserApi";
import bufferToObjUrl from "../utils/bufferToObjUrl";
import newUser from "../assets/images/defaultProfile/newUser.png";
import { useQuery } from "react-query";

export const dataContext = createContext();

const Layout = ({ children, text, showHeader = true }) => {
    const { data, refetch } = useQuery(["user"], getUser, { retry: false });
    let { profileImg, email, name, isLoading, _id } = data;

    const [profileImage, setProfileImage] = useState(
        profileImg ? bufferToObjUrl(profileImg.image.data.data) : newUser
    );

    const [search, setSearch] = useState("");
    const [searchFocus, setSearchFocus] = useState(false);

    const [value, setValue] = useState({
        refetch: () => {},
        profileImage: "",
        setProfileImage: () => {},
        email: "",
        name: "",
        isLoading: "",
        search: "",
        setSearch: () => {},
        userId: "",
        setSearchFocus: () => {},
        searchFocus: "",
    });

    useState(() => {
        setValue({
            refetch,
            profileImage,
            setProfileImage,
            email,
            name,
            isLoading,
            search,
            setSearch,
            userId: _id,
            setSearchFocus,
            searchFocus,
            setValue,
        });
        console.log("val rerendered");
    }, [data, search, searchFocus, profileImage]);

    // const value = {

    //     //data,
    //     refetch,
    //     profileImage,
    //     setProfileImage,
    //     email,
    //     name,
    //     isLoading,
    //     search,
    //     setSearch,
    //     userId: _id,
    //     setSearchFocus,
    //     searchFocus,
    // };

    return (
        <div className="flex flex-col">
            <dataContext.Provider value={value}>
                {showHeader && (
                    <Header
                        text={text}
                        search={search}
                        setSearch={setSearch}
                        searchFocus={searchFocus}
                        setSearchFocus={setSearchFocus}
                        setValue={setValue}
                    />
                )}
                {children}
            </dataContext.Provider>
        </div>
    );
};

export default Layout;
