import { useState } from "react";
import NavMenu from "./NavMenu";
import { useNavigate } from "react-router";
const Header = ({ text, setSearch, search }) => {
    const navigate = useNavigate();
    const [openNavMenu, setOpenNavMenu] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);

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
                        {/* logo */}
                        {!searchFocus ? (
                            <div
                                onClick={() => navigate("/")}
                                className={`md:hidden overflow-hidden
                                     w-auto mr-5 cursor-pointer`}
                            >
                                <h1
                                    className="font-bold text-[20px]
                            text-shinyPurple agbalumoFont tracking-tighter"
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

                    {/* notification button */}
                    <button
                        className="bg-shinyPurple px-[10px] py-[7px] rounded-full 
        flex items-center justify-center insetShadowTwo clickable"
                    >
                        <span className="text-textColor bi-bell text-[15px] cursor-pointer"></span>
                    </button>
                </div>
            </div>

            <NavMenu show={openNavMenu} setShow={setOpenNavMenu} />
        </>
    );
};

export default Header;
