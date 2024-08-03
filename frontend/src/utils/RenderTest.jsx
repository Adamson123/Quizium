import { memo, useMemo } from "react";

const RenderTest = memo(({ data }) => {
    console.log(data);
    console.log("I re-rendered for quizzzzzzzziiiiiiiiiiuuuuuuuuuummmmmmmmm");

    return <div>{data.data}</div>;
});

export default RenderTest;
