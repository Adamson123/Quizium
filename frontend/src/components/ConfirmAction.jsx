const ConfirmAction = ({
    showConfirm,
    setShowConfirm,
    executeAction,
    text,
}) => {
    return (
        <div
            className={`bg-transparentBlack fixed 
            top-0 right-0 bottom-0 left-0 flex justify-center 
            items-center scaleUp  ${
                showConfirm ? "scale-1" : "scale-0"
            } z-[10000000]`}
        >
            <div className="px-6 py-5 bg-secMainBg flex flex-col gap-5 rounded">
                <span className="text-[16px]">{text}</span>
                <div className="flex justify-center isidoraBold gap-3">
                    <button
                        onClick={async () => {
                            await executeAction();
                            setShowConfirm(false);
                        }}
                        className="px-4 py-2 bg-shinyPurple
                     clickable text-[15px] insetShadow rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => setShowConfirm(false)}
                        className="px-4 py-2 bg-grayFive 
                    clickable text-[15px] insetShadow rounded"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmAction;
