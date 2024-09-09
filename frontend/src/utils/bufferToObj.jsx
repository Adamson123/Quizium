export const bufferToObj = (arr) => {
    if (!arr) {
        return;
    }
    const byteArray = new Uint8Array(arr);
    const imfg = new Blob([byteArray], { type: "image/webp" });
    const file = new File([imfg], "image", {
        type: "image/webp",
    });

    return file;
};

export default bufferToObj;
