import { useNavigate } from "react-router-dom";
import { getUserFunc } from "../api/UserApi";
import { logoutUserFunc } from "../api/AuthUserApi";

import { useMutation } from "react-query";



const NavMenu = ({ show, setShow }) => {
  const { mutateAsync: logoutUser, data: logoutRes } =
    useMutation(logoutUserFunc);
  const { data } = getUserFunc();
  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    await logoutUser();

    console.log(logoutRes);
    window.location.reload();
  };

  return (
    <>
      {/* close NavMenu  */}
      <div
        onClick={() => setShow((o) => (o = !o))}
        className={`fixed right-0 left-0 top-0 bottom-0
      ${show ? "visible" : "hidden"}  bg-[rgba(0,0,0,0.59)] md:hidden`}
      ></div>

      {/* NavMenu */}
      <div
        style={{
          transition: "width 0.3s ease-in-out",
        }}
        className={`fixed py-4 left-0 top-0 bottom-0 
    ${
      show ? "w-[180px]" : "w-0"
    } agbalumo overflow-hidden md:w-[180px] bg-mainBg`}
      >
        <div
          className="h-full w-full flex flex-col 
        px-3 md:border-r border-grayOne"
        >
          {/* logo and profile container */}
          <div
            className="logo text-nowrap flex flex-col
           justify-between  pb-2 pr-2 border-b border-grayOne"
          >
            <h1
              className="font-bold text-4xl
           text-shinyPurple agbalumoFont tracking-tighter"
            >
              Quizium
            </h1>

            {/* name display and profile link */}
            <div className="flex items-end  mt-12 cursor-pointer box-border gap-[0.5px] justify-start">
              <span className="bi-person  mb-[2px] text-[16px] text-textColor"></span>
              <span className="circularSpo break-words text-[16px] tracking-tighter text-textColor">
                {data.name}
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div
            className="flex flex-col text-nowrap justify-between
           h-44 text-textColor isidoraSemiBold mt-4 "
          >
            <div
              onClick={() => {
                setShow((s) => (s = false));
                navigate("/");
              }}
              className="cursor-pointer hover:text-shinyPurple"
            >
              <span className="bi-compass mr-2 font-bold"></span>
              <span>Explore</span>
            </div>
            <div className="cursor-pointer hover:text-shinyPurple">
              <span className="bi-book mr-2 font-bold"></span>
              <span>Your Libary</span>
            </div>
            <div
              onClick={() => {
                setShow((s) => (s = false));
                navigate("/settings");
              }}
              className="cursor-pointer hover:text-shinyPurple"
            >
              <span className="bi-gear mr-2 font-bold"></span>
              <span>Settings</span>
            </div>
            <div>
              <button
                onClick={handleLogoutUser}
                className="bg-shinyPurple px-3 py-2 rounded tracking-wide
                 insetShadow hover:scale-[0.9]"
                style={{
                  transition: "transform 0.2s",
                }}
              >
                Logout <span className="bi-box-arrow-right"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavMenu;
