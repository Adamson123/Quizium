import { useState } from "react";
import NavMenu from "./NavMenu";
const Header = () => {
  const [openNavMenu, setOpenNavMenu] = useState(false);

  return (
    <>
      <div
        className="bg-mainBg px-3 pb-2 pt-[17px] fixed left-0 
      right-0 top-0 md:left-[180px] "
      >
        <div
          className="flex justify-between gap-5
         items-center isidoraSemiBold"
        >
          <span
            onClick={() => setOpenNavMenu((o) => (o = true))}
            className="bi-list text-textColor
          cursor-pointer text-[25px] block md:hidden"
          ></span>
          <div className="flex-1 relative">
            <span
              className="bi-search text-[13px] font-bold text-textColor
          absolute top-[11px] left-[13px]"
            ></span>
            <input
              type="search"
              placeholder="Search Quizuim library"
              className="placeholder:text-placeholder
               box-border text-textColor
               w-[100%] rounded-[2px] px-2 pl-10 py-2 
               bg-grayOne  border-none outline-none"
            />
          </div>
        {/* notification button */}
          <button
            className="bg-shinyPurple px-[10px] py-[7px] rounded-full 
        flex items-center justify-center insetShadowTwo"
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
