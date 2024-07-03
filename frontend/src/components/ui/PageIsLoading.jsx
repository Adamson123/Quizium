const PageIsLoading = () => {
  return (
    <div
      className="fixed text-2xl top-0 bottom-0
 right-0 left-0 bg-mainBg flex 
items-center justify-center text-shinyPurple"
    >
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default PageIsLoading;
