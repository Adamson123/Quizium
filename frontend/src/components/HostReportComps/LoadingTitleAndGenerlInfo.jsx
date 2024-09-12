import React from "react";

const LoadingTitleAndGenerlInfo = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="h-[36px] w-full skeleton rounded-none"></div>
            <div className="flex flex-wrap gap-2 max-h-[148px]">
                {Array.from({ length: 3 }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className="rounded flex-1 h-16 px-20 skeleton"
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default LoadingTitleAndGenerlInfo;
