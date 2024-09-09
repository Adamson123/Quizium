const NavRow = ({ rowRef, showLeftBtn, showRightBtn }) => {
    return (
        <div
            className="absolute w-full bg-re-400 flex
                 justify-between top-[50%] z-10 text-grayFive"
        >
            {
                <button
                    onClick={() => {
                        rowRef.current.scrollLeft -= rowRef.current.clientWidth;
                    }}
                    className={`w-[50px] h-[50px] rounded-full 
                            border border-grayFive bg-mainBg ${
                                showLeftBtn ? "opacity-[0.5]" : "opacity-0"
                            }`}
                >
                    <span
                        className="bi-chevron-left
                             font-extrabold text-[18px]"
                    ></span>
                </button>
            }
            <button
                onClick={() => {
                    rowRef.current.scrollLeft += rowRef.current.clientWidth;
                }}
                className={`w-[50px] h-[50px] rounded-full border
                            bg-mainBg border-grayFive ${
                                showRightBtn ? "opacity-[0.5]" : "opacity-0"
                            }`}
            >
                <span
                    className="bi-chevron-right 
                        font-extrabold text-[18px]"
                ></span>
            </button>
        </div>
    );
};

export default NavRow;
