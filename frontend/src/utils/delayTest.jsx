export const delayTest = async () => {
    await new Promise((resolve, _) => setTimeout(resolve, 3000));

    console.log("waited");
};
