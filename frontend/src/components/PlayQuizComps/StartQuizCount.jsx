import { useEffect, useRef, useState } from "react";

//     const [count, setCount] = useState(5);

//     const countRef = useRef();
//     useEffect(() => {
//         if (startQuiz) {
//             return;
//         }
//         const interValId = setInterval(() => {
//             if (count > 0) {
//                 const counting = count - 1;
//                 setCount(counting);
//             } else {
//                 setStartQuiz(true);
//             }
//         }, 1000);

//         return () => {
//             clearInterval(interValId);
//         };
//     }, [startQuiz, count]);

//     return (
//         <div
//             className="fixed top-0 right-0 bottom-0 left-0
//          bg-transparentBlack z-20 flex justify-center items-center"
//         >
//             <span
//                 className={` ${count > 0 && "countdown"} text-7xl isidoraBold`}
//             >
//                 <span style={{ "--value": count }} className="text-shinyPurple">
//                     GO!
//                 </span>
//             </span>
//         </div>
//     );
// };

// export default StartQuizCount;

const StartQuizCount = ({ startQuiz, setStartQuiz, setShowStartCount }) => {
    const [count, setCount] = useState(5);

    useEffect(() => {
        if (startQuiz) {
            return;
        }
        const interValId = setInterval(() => {
            if (count > 0) {
                const counting = count - 1;
                setCount(counting);
            }

            if (count === 0) {
                setStartQuiz(true);
                setShowStartCount(false);
            }
        }, 1000);

        return () => {
            clearInterval(interValId);
        };
    }, [startQuiz, count]);

    return (
        <div
            className="popBlock
        bg-transparentBlack z-20"
        >
            <span
                className={`text-7xl isidoraBold ${count && "count"} absolute
                     left-[50%] top-[50%] translate-y-[-50%]
                     translate-x-[-50%]`}
            >
                {count ? count : "GO!"}
            </span>
        </div>
    );
};

export default StartQuizCount;
