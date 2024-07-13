import { useEffect, useRef, useState } from "react";
import { getQiuzCoverFunc } from "../../api/QuizApi";
import QuizCard from "./ui/QuizCard";
import Skeleton from "./ui/Skeleton";
const Mathematics = () => {
    const [quizCover, setQuizCover] = useState([]);

    const { data } = getQiuzCoverFunc(0, 7);

    useEffect(() => {
        setQuizCover((q) => (q = data));
    }, [data]);

    return (
        <div>
            <h3 className="text-[16px] mb-3 font-semibold">
                Mathematics Questions
            </h3>
            {/* random question roll*/}
            <div
                className="hideScroll scrollbar-thumb-red-700 quizShelf flex gap-4 overflow-x-auto overflow-auto
             overflow-y-hidden pt-1 scroll-smooth"
            >
                {/* Quiz */}

                {quizCover ? (
                    quizCover.map((q, index) => {
                        return <QuizCard key={index} info={q} />;
                    })
                ) : (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                )}
            </div>
        </div>
    );
};

export default Mathematics;
