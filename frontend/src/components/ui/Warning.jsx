const Warning = ({ text, absolute = true, cus }) => {
    return (
        <span
            className={`w-4 h-4 bg-red-600 rounded-full text-white
   text-center font-bold text-[13px] ${
       absolute && "absolute cursor-pointer"
   } right-[-10px] top-[-10px]
   flex justify-center items-center shadow-inner ${cus}`}
        >
            <span className="bi-exclamation" title={text}></span>
        </span>
    );
};

export default Warning;
