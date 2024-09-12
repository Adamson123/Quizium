import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getQiuzzes } from "../../api/QuizApi";
import QuizCard from "./ui/QuizCard";
import Skeleton from "./ui/Skeleton";
import { useQuery } from "react-query";
import NavRow from "./NavRow";

const QuizzesRow = ({ category }) => {
    const { data, isLoading, error, isSuccess, refetch } = useQuery(
        ["quiz-cover" + category],
        () => getQiuzzes({ skip: 0, limit: 6, category })
    );
    const quizCover = useMemo(() => {
        return data;
    }, [data]);

    const rowRef = useRef();
    const firstDivRef = useRef();
    const lastDivRef = useRef();
    const otherDivsRef = useRef();
    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(true);
    const updatedOnStart = useRef(false);

    const renderRow = () => {
        return isLoading || quizCover?.length;
    };

    const updateScrollBtn = () => {
        const firstClient = firstDivRef.current?.getBoundingClientRect();
        const lastDivClient = lastDivRef.current?.getBoundingClientRect();

        //firstClient?.x < 35
        if (firstClient?.right <= 0) {
            setShowLeftBtn(true);
        } else {
            setShowLeftBtn(false);
        }

        const scrollWidth = rowRef.current?.scrollWidth;
        const maxScrollVal = scrollWidth - rowRef.current?.scrollLeft;

        //maxScrollVal <= rowRef.current?.clientWidth
        // lastDivClient?.left + 70 <= rowRef.current?.clientWidth
        if (lastDivClient?.left + 70 <= rowRef.current?.clientWidth) {
            setShowRightBtn(false);
        } else {
            setShowRightBtn(true);
        }
    };

    useEffect(() => {
        if (!quizCover?.length || updatedOnStart.current) return;

        updateScrollBtn();
        updatedOnStart.current = true;
        window.addEventListener("resize", updateScrollBtn);

        return () => {
            window.removeEventListener("resize", updateScrollBtn);
        };
    }, [quizCover]);

    const distributeRef = (index) => {
        if (index === 0 && quizCover?.length > 1) {
            return firstDivRef;
        } else if (index === quizCover?.length - 1) {
            return lastDivRef;
        } else {
            return otherDivsRef;
        }
    };

    return renderRow() ? (
        <div className="relative">
            <h3 className="text-[20px] mb-3 font-semibold isidoraBold">
                {category === "Science+Technology"
                    ? category.replace("+", " & ")
                    : category}
            </h3>
            {/* random question roll*/}
            <NavRow
                rowRef={rowRef}
                showLeftBtn={showLeftBtn}
                showRightBtn={showRightBtn}
            />
            <div
                onScroll={updateScrollBtn}
                ref={rowRef}
                className="hideScroll scrollbar-thumb-red-700 quizShelf flex 
                gap-4 overflow-x-auto
                overflow-y-hidden py-2 pr-5 relative scroll-smooth"
            >
                {/* Quiz */}

                {quizCover?.length
                    ? quizCover.map((quiz, index) => {
                          return (
                              <QuizCard
                                  key={index}
                                  info={quiz}
                                  index={index}
                                  ref={distributeRef(index)}
                              />
                          );
                      })
                    : isLoading && (
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
    ) : (
        ""
    );
};

export default QuizzesRow;
