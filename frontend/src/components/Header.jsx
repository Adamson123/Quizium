import { useEffect, useRef, useState } from "react";
import NavMenu from "./NavMenu";
import { useNavigate } from "react-router";
const Header = ({
    text,
    setSearch,
    search,
    searchFocus,
    setSearchFocus,
    setValue,
}) => {
    const navigate = useNavigate();
    const [openNavMenu, setOpenNavMenu] = useState(false);
    const searchRef = useRef();

    useEffect(() => {
        if (!searchFocus) {
            searchRef?.current.blur();
        }
        setValue((value) => (value = { ...value, searchFocus }));
    }, [searchFocus]);

    useEffect(() => {
        setValue((value) => (value = { ...value, search }));
    }, [search]);

    return (
        <>
            <div
                className="bg-mainBg z-20 px-3 py-[13px] fixed left-0 
      right-0 top-0 md:left-[180px]"
            >
                <div
                    className="flex justify-between gap-5
                items-center isidoraSemiBold"
                >
                    {/* hamburger menu */}
                    <span
                        onClick={() => setOpenNavMenu(true)}
                        className="bi-list text-textColor
                        cursor-pointer text-[25px] block md:hidden"
                    ></span>

                    <div className="flex-1 flex items-center">
                        {/* Quizium */}
                        {!searchFocus && !search ? (
                            <div
                                onClick={() => navigate("/")}
                                className={`md:hidden overflow-hidden
                                     w-auto mr-3 cursor-pointer`}
                            >
                                <h1
                                    className="font-bold text-[23px]
                                    text-shinyPurple agbalumoFont mb-[6px] tracking-tighter"
                                >
                                    Quizium
                                </h1>
                            </div>
                        ) : (
                            ""
                        )}
                        {/*search bar */}
                        <div className="relative flex-1">
                            <span
                                className="bi-search text-[13px] 
                                font-bold text-textColor
                                absolute top-[11px] left-[13px]"
                            ></span>
                            <input
                                ref={searchRef}
                                onFocus={() => setSearchFocus(true)}
                                onBlur={() => setSearchFocus(false)}
                                onChange={(event) => {
                                    setSearch(event.target.value);
                                }}
                                value={search}
                                type="search"
                                placeholder={`Search ${
                                    text ? text : "Quizuim library"
                                }`}
                                className="placeholder:text-placeholder
                                box-border text-textColor
                                w-[100%] rounded-[2px] px-2 pl-10 py-2 
                                bg-grayOne  border-none outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <NavMenu show={openNavMenu} setShow={setOpenNavMenu} />
        </>
    );
};

export default Header;
