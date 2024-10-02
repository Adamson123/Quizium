const NavRow = ({ rowRef, showLeftBtn, showRightBtn, styles }) => {
  return (
    <
      // className="absolute w-full bg-re-400 flex
      //      justify-between top-[50%] z-10 text-grayFive"
    >
      <button
        onClick={() => {
          rowRef.current.scrollLeft -= rowRef.current.clientWidth;
        }}
        className={`w-[50px] h-[50px] rounded-full 
        border border-grayFive bg-mainBg absolute  top-[50%] left-2 ${styles} ${
          showLeftBtn ? "opacity-[0.5] z-10" : "opacity-0"
        }`}
      >
        <span className="bi-chevron-left font-extrabold text-[18px]"></span>
      </button>
      {/* Unclickable path */}
      <button
        onClick={() => {
          rowRef.current.scrollLeft += rowRef.current.clientWidth;
        }}
        className={`w-[50px] h-[50px] rounded-full border
        bg-mainBg border-grayFive absolute top-[50%] right-2 ${styles} ${
          showRightBtn ? "opacity-[0.5] z-10" : "opacity-0"
        }`}
      >
        <span className="bi-chevron-right font-extrabold text-[18px]"></span>
      </button>
    </>
  );
};

export default NavRow;
