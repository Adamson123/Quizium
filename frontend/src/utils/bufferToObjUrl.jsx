export const bufferToObjUrl = (arr) => {
    if (!arr) {
        return;
    }
    const byteArray = new Uint8Array(arr);

    const imfg = new Blob([byteArray], { type: "image/webp" });

    const url = URL.createObjectURL(imfg);

    return url;
};

export default bufferToObjUrl;