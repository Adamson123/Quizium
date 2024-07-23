export const requestOptions = (data, head, method) => {
    const isFormData = data instanceof FormData;

    const options = {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": head,
        },
        body: isFormData ? data : JSON.stringify(data),
    };

    if (isFormData) {
        // Delete the Content-Type header so that the browser can set it correctly
        delete options.headers["Content-Type"];
    }

    return options;
};
