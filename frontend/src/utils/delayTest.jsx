const delayTest = async (time) => {
    await new Promise((resolve, _) => setTimeout(resolve, time));

    console.log("waited");
};

export default delayTest;
