import { useNavigate } from "react-router-dom";
import { logoutUserFunc } from "../api/AuthUserApi";

import { useMutation } from "react-query";
import { useContext } from "react";

import { dataContext } from "../layouts/cayout";
import shortenText from "../utils/shortenText";

const NavMenu = ({ show, setShow }) => {
    const { mutateAsync: logoutUser, data: logoutRes } =
        useMutation(logoutUserFunc);
    // const { profileImage, name } = useContext(dataContext);
    const value = useContext(dataContext);

    const navigate = useNavigate();

    const handleLogoutUser = async () => {
        await logoutUser();
        window.location.reload();
    };

    const returnPathname = () => {
        return window.location.pathname;
    };

    return (
        <>
            {/* close NavMenu and transparent background */}
            <div
                onClick={() => setShow((o) => (o = !o))}
                className={`fixed right-0 left-0 top-0 bottom-0
                ${show ? "visible" : "hidden"}  bg-[rgba(0,0,0,0.59)] 
                z-20 md:hidden `}
            ></div>

            {/* NavMenu */}
            <div
                style={{
                    transition: "width 0.3s ease-in-out",
                }}
                className={`fixed z-30 py-4 left-0 top-0 bottom-0 
                    ${show ? "w-[180px]" : "w-0"} 
                    agbalumo overflow-hidden md:w-[180px]
                    bg-mainBg md:border-r border-grayOne `}
            >
                <div
                    className="h-full w-full flex flex-col
                    px-3"
                >
                    {/* logo and profile container */}
                    <div
                        className="logo text-nowrap flex flex-col
           justify-between  pb-2 pr-2 border-b border-grayOne"
                    >
                        <h1
                            onClick={() => navigate("/")}
                            className="font-bold text-4xl
                            text-shinyPurple agbalumoFont 
                            tracking-tighter cursor-pointer"
                        >
                            Quizium
                        </h1>

                        {/* name and email display */}
                        <div
                            className="flex items-center  mt-12 cursor-pointer 
              box-border gap-[0.5px] justify-start"
                        >
                            <span
                                className="overflow-hidden text-[16px] 
              border rounded-full text-textColor h-[30px] max-w-[30px] 
               min-w-[30px] mr-1"
                            >
                                <img
                                    src={value?.profileImage}
                                    alt="profile image"
                                    className="w-full h-full object-cover"
                                />
                            </span>
                            <div className="flex flex-col">
                                <span
                                    className="text-[14px] 
                                    tracking-tighter font-bold"
                                >
                                    {shortenText(value?.name, 18)}
                                </span>
                                <span className="text-[11px] text-grayFive font-bold">
                                    {shortenText(value?.email, 18)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Nav links */}
                    <div
                        className="flex flex-col text-nowrap
                         text-textColor text-[14px] isidoraReg 
                         mt-4 gap-[27px] pl-1"
                    >
                        <div
                            onClick={() => {
                                setShow((s) => (s = false));
                                navigate("/");
                            }}
                            className={`cursor-pointer hover:text-shinyPurple ${
                                returnPathname() === "/" && "text-shinyPurple"
                            }`}
                        >
                            <span className="bi-compass mr-2"></span>
                            <span>Explore</span>
                        </div>
                        <div
                            onClick={() => {
                                setShow((s) => (s = false));
                                navigate("/library");
                            }}
                            className={`cursor-pointer hover:text-shinyPurple ${
                                returnPathname() === "/library" &&
                                "text-shinyPurple"
                            }`}
                        >
                            <span className="bi-book mr-2"></span>
                            <span>Your Libary</span>
                        </div>
                        <div
                            onClick={() => {
                                setShow((s) => (s = false));
                                navigate("/reports");
                            }}
                            className={`cursor-pointer hover:text-shinyPurple ${
                                returnPathname() === "/reports" &&
                                "text-shinyPurple"
                            }`}
                        >
                            <span className="bi-bar-chart-line mr-2"></span>
                            <span>Reports</span>
                        </div>
                        <div
                            // to="/setting"
                            onClick={() => {
                                setShow((s) => (s = false));
                                navigate("/settings");
                            }}
                            className={`cursor-pointer hover:text-shinyPurple ${
                                returnPathname() === "/settings" &&
                                "text-shinyPurple"
                            }`}
                        >
                            <span className="bi-gear mr-2"></span>
                            <span>Settings</span>
                        </div>
                        <div>
                            <button
                                onClick={handleLogoutUser}
                                className="bg-grayTwo px-5 py-2 rounded
                                insetShadow hover:scale-[0.9] isidoraBold tracking-tighter"
                                style={{
                                    transition: "transform 0.2s",
                                }}
                            >
                                Log Out{" "}
                                <span className="bi-box-arrow-righ text-[13px]"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavMenu;
