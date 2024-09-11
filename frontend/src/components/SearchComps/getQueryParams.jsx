const getQueryParams = () => {
    const parsedUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(parsedUrl.search);
    return queryParams;
};

export default getQueryParams;
