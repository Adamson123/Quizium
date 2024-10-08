import { useRef } from "react";
import HoverForInfo from "../HoverForInfo";

const SubSettingsFirst = ({ quizSettings, handleQuizSettings }) => {
    const timeLimitRef = useRef();
    return (
        <div className="flex-1 flex flex-col gap-16 md:gap-[97px]">
            {/* Title and description container */}
            <div className="h-[210px]">
                {/* Title */}
                <div className="flex flex-col justify-between mb-4">
                    <span className="text-[14px] font-bold mb-2">
                        Title{" "}
                        <span className="text-grayTwo text-[12px]">
                            (required)
                        </span>
                    </span>

                    <div className="relative">
                        <span className="text-[12px] text-shinyPurple absolute right-2 top-[8px]">
                            {70 - quizSettings.title.length}
                        </span>
                        <input
                            onChange={handleQuizSettings}
                            value={quizSettings.title}
                            minLength={3}
                            maxLength={70}
                            required
                            type="text"
                            name="title"
                            className="pl-3 pr-6 py-2 w-full text-textColor border-[1px]
                            border-grayTwo bg-transparent outline-none rounded
                        focus:border-shinyPurple text-[13px]"
                            placeholder="Enter quiz title..."
                        />
                    </div>
                </div>
                {/* Description */}
                <div className="flex flex-col h-full">
                    <span className="mb-2 text-[14px] font-bold">
                        Description{" "}
                        <span className="text-grayTwo text-[12px]">
                            (Optional)
                        </span>
                    </span>

                    <div className="relative h-full">
                        <span
                            className="text-[12px] text-shinyPurple
                 absolute right-2"
                        >
                            {500 - quizSettings.description.length}
                        </span>
                        <textarea
                            onChange={handleQuizSettings}
                            value={quizSettings.description}
                            maxLength={500}
                            type="text"
                            name="description"
                            className="resize-none px-3 py-2 w-full
                            text-textColor border-[1px]
                            border-grayTwo h-36 bg-transparent outline-none
                            rounded focus:border-shinyPurple
                            relative md:h-full textarea text-[13px]"
                        ></textarea>
                    </div>
                </div>
            </div>
            {/* Time limit and visibity  */}
            <div>
                <div className="flex flex-col mb-4">
                    <span className="text-[14px] font-bold mb-2">
                        Time limit{" "}
                        <span className="text-grayTwo text-[12px]">
                            (minimum -{" "}
                            {quizSettings.applyTime === "entire" ? 1 : 5}
                            ,&nbsp; maximum -{" "}
                            {quizSettings.applyTime === "entire" ? 120 : 250}
                            ),
                        </span>
                    </span>

                    <div className="relative">
                        <span
                            className="text-[12px] text-shinyPurple
                 absolute right-2 top-[10px]"
                        >
                            {quizSettings.applyTime === "entire"
                                ? "minutes"
                                : "seconds"}
                        </span>
                        {
                            <input
                                onChange={handleQuizSettings}
                                onWheel={() => {
                                    //prevents time limit input from being modified while scrolling with mouse wheel
                                    timeLimitRef.current.blur();
                                }}
                                value={quizSettings.timeLimit}
                                type="number"
                                name="timeLimit"
                                ref={timeLimitRef}
                                required
                                min={
                                    quizSettings.applyTime === "entire" ? 1 : 5
                                }
                                max={
                                    quizSettings.applyTime === "entire"
                                        ? 120
                                        : 250
                                }
                                className="py-2 pl-3 pr-16 bg-transparent
                                    border-grayTwo border rounded
                                    focus:border-shinyPurple
                                    outline-none text-[13px] w-full"
                                placeholder="Enter time limit..."
                            />
                        }

                        {}
                        {/* set limit for each questions or quiz as a whole */}
                        <div className="flex items-center mt-2 text-[12px]">
                            <input
                                onChange={handleQuizSettings}
                                type="radio"
                                name="applyTime"
                                value="entire"
                                id="entire"
                                checked={quizSettings.applyTime === "entire"}
                                className="cursor-pointer radio optionsChecked
                    h-4 w-4 mt-1 mr-1 bg-transparent"
                            />
                            <span className="mr-2 cursor-pointer flex gap-2 items-center">
                                <label
                                    htmlFor="entire"
                                    className="cursor-pointer"
                                >
                                    For entire quiz
                                </label>{" "}
                                <HoverForInfo
                                    edit={"left-[-100px] md:left-0"}
                                    text={
                                        <>
                                            <h2 className="text-[15px] isidoraBold mb-1">
                                                Exam-Style Scoring
                                            </h2>
                                            <p>
                                                This type of quiz is designed
                                                for completeness and accuracy.
                                                The participant has one single
                                                time limit for the entire quiz,
                                                and he/she gets point only by
                                                the accuracy of the answer.
                                                There are no extra points for
                                                early completion, and the format
                                                is ideal for formal assessments
                                                and exam-like quizzes where much
                                                careful consideration is needed.
                                            </p>
                                        </>
                                    }
                                />
                            </span>

                            <input
                                onChange={handleQuizSettings}
                                type="radio"
                                name="applyTime"
                                value="each"
                                id="each"
                                checked={quizSettings.applyTime === "each"}
                                className="cursor-pointer radio optionsChecked 
                                h-4 w-4 
                              mt-1 mr-1"
                            />
                            <span className="cursor-pointer flex gap-2 items-center">
                                <label
                                    htmlFor="each"
                                    className="cursor-pointer"
                                >
                                    For each questions{" "}
                                </label>
                                <HoverForInfo
                                    edit={"left-[-100px] md:left-0"}
                                    text={
                                        <>
                                            <h2 className="text-[15px] isidoraBold mb-1">
                                                Speed-Based Scoring
                                            </h2>
                                            <p>
                                                This style of quiz rewards quick
                                                thinking and fast responses.
                                                Each question has an allotted
                                                time in itself. and points are
                                                given not only for the correct
                                                answer but for how quick you can
                                                answer, The quicker you are, the
                                                more points added! ideal for
                                                competitive quizzes, games, and
                                                events where speed is as
                                                important as the right answer.
                                            </p>
                                        </>
                                    }
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="text-[14px] font-bold mb-2">
                        Visibility
                    </span>
                    <div className="flex items-center">
                        <input
                            onChange={handleQuizSettings}
                            type="radio"
                            name="visibility"
                            value="public"
                            id="public"
                            checked={quizSettings.visibility === "public"}
                            className="cursor-pointer radio optionsChecked
                    h-4 w-4 mt-1 mr-1 bg-transparent"
                        />
                        <label htmlFor="public" className="mr-2 cursor-pointer">
                            Public
                        </label>

                        <input
                            onChange={handleQuizSettings}
                            type="radio"
                            name="visibility"
                            value="private"
                            id="private"
                            checked={quizSettings.visibility === "private"}
                            className="cursor-pointer radio optionsChecked h-4 w-4 
                    mt-1 mr-1"
                        />
                        <label htmlFor="private" className="cursor-pointer">
                            Private
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubSettingsFirst;
