const PageIsLoading = ({ message }) => {
    return (
        <div
            className="fixed text-2xl top-0 bottom-0
 right-0 left-0 bg-mainBg flex flex-col
items-center justify-center text-shinyPurple"
        >
            <span className="loading loading-dots loading-lg"></span>

            <h2 className="text-shinyPurple text-[15px] isidoraBold">
                {message}
            </h2>
        </div>
    );
};

export default PageIsLoading;
