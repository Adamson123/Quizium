export const convertToWebp = async (src, name) => {
    let image;
    await new Promise((resolve, reject) => {
        const img = new Image();
        let canvas;
        img.onload = () => {
            canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                const file = new File([blob], name, {
                    type: "image/webp",
                });

                resolve(file);
            }, "image/webp");
        };
        img.src = src;
    })
        .then((file) => {
            image = file;
        })
        .catch((err) => {
            console.error(err);
        });

    return image;
};
