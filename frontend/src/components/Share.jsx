import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const Share = ({ showShare, setShowShare }) => {
    const urlInputRef = useRef();

    return (
        <div
            className={` ${
                !showShare.open && "hidden"
            } fixed top-0 bottom-0 right-0 left-0 z-50`}
        >
            <div
                onClick={() => setShowShare({ ...showShare, open: false })}
                className="absolute top-0 bottom-0 right-0 left-0
             bg-[rgba(0,0,0,0.59)]"
            ></div>
            <div
                className={`absolute bottom-0 bg-mainBg right-0 left-0
             rounded-tl-[15px] max-w-[600px] mx-auto rounded-tr-[15px]
             py-5 px-10 h-[200px] `}
            >
                <h3 className="text-center isidoraBold">
                    Invite Friends to Play
                </h3>

                <div className="flex justify-center items-center flex-col gap-1 mt-7 w-full">
                    <div className="flex justify-center items-center gap-1 w-full">
                        <input
                            ref={urlInputRef}
                            value={showShare.url}
                            readOnly
                            type="text"
                            className="p-2 w-full max-w-[450px] bg-grayOne
                         rounded text-[13px] outline-none isidoraSemiBold"
                        />
                        <button
                            onClick={() => {
                                if (navigator.clipboard) {
                                    navigator.clipboard.writeText(
                                        showShare.url
                                    );
                                } else {
                                    urlInputRef.current.select();
                                    urlInputRef.current.setSelectionRange(
                                        0,
                                        9999999
                                    );
                                    document.execCommand("copy");
                                }
                                toast.success("Copied");
                                urlInputRef.current.setSelectionRange(0, 0);
                            }}
                            className="py-2 px-3 text-[13px] isidoraBold 
                    insetShadow bg-shinyPurple rounded clickable"
                        >
                            Copy
                        </button>
                    </div>

                    <div className="gap-4 mt-5 flex items-center">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                showShare.url
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            // className="bg-white h-[25px] w-[25px]
                            // rounded-full relative flex justify-center items-center"
                        >
                            <span
                                className="bi-facebook
                             text-blue-600 text-[35px]"
                            ></span>
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                                showShare.url
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            // className="bg-green-500 h-[24px] w-[24px] flex
                            //  justify-center items-center rounded-full"
                        >
                            <span className="bi-whatsapp text-green-500 text-[35px]"></span>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                showShare.url
                            )}}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black h-[40px] w-[40px] flex
                             justify-center items-center rounded-full"
                        >
                            <span className="bi-twitter-x text-[15px]"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
