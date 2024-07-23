const PageIsLoading = (props) => {
    return (
        <div
            className="fixed text-2xl top-0 bottom-0
 right-0 left-0 bg-mainBg flex flex-col
items-center justify-center text-shinyPurple"
        >
            <span className="loading loading-spinner loading-lg"></span>

            <h2 className="text-shinyPurple text-[15px] isidoraBold">
                {props.message}
            </h2>
        </div>
    );
};

export default PageIsLoading;
