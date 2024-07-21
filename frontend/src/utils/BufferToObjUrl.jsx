export const BufferToObjUrl = (arr) => {
    const byteArray = new Uint8Array(arr);

    const imfg = new Blob([byteArray], { type: "image/jpeg" });

    const url = URL.createObjectURL(imfg);

    return url;
};

export default BufferToObjUrl;
