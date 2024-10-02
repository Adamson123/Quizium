import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Options = ({
  options,
  allQuestionsResults,
  setAllQuestionsResults,
  singleQuestion,
  currentQuestion,
  findQuestionResult,
  selectAnswer,
  timeSpent,
}) => {
  const optionsBg = ["#e779c1", "#408fb9", "#e8bf05", "#e48775"];
  const [multiSelectAns, setMultiSelectAns] = useState(
    findQuestionResult()?.userAnswer || []
  );

  useEffect(() => {
    setMultiSelectAns(findQuestionResult()?.userAnswer || []);
  }, [currentQuestion, singleQuestion]);

  //  console.log(allQuizResults, "allQ");

  const handleMultiSelectAns = (id) => {
    if (findQuestionResult()) {
      return;
    }

    const exist = multiSelectAns.find((ans) => ans === id);
    const filterAns = multiSelectAns.filter((ans) => {
      return ans !== id;
    });
    setMultiSelectAns(!exist ? [...multiSelectAns, id] : filterAns);
  };

  const changeOptionColor = (id) => {
    //will change all wrong to red
    const allToWrongToRed = () => {
      return findQuestionResult().answer.includes(id) ? "rgb(74,222,128)" : "";
    };

    //will change choosen option to orange or correct but not choosen to orange , else lives it as it's coming from color
    // const changeSelectdToOrg = () => {
    //     return !findQuestionResult().correct &&
    //         findQuestionResult().userAnswer.includes(id) &&
    //         (!findQuestionResult().answer.includes(id) ||
    //             findQuestionResult().answer.includes(id))
    //         ? "#e67e22"
    //         : color;
    // };

    const changeSelected = () => {
      //if option picked by user and is wrong
      return findQuestionResult().userAnswer.includes(id) &&
        // !findQuestionResult().correct &&
        !findQuestionResult().answer.includes(id)
        ? "rgb(255,45,45)"
        : color;
    };

    let color = findQuestionResult() ? allToWrongToRed() : "";
    color = findQuestionResult() ? changeSelected() : color;
    return color;
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {options?.map((opt, index) => {
        return (
          opt.text.trim(" ") && (
            <div
              onClick={() => {
                singleQuestion.answerOption === "singleAnswer"
                  ? selectAnswer([opt._id])
                  : handleMultiSelectAns(opt._id);
              }}
              key={index}
              style={{
                background: changeOptionColor(opt._id)
                  ? changeOptionColor(opt._id)
                  : "rgb( 10, 8, 45)",
                transition: "transform 0.3s ease-in-out",
                color: findQuestionResult() ? "white" : optionsBg[index],
                opacity:
                  findQuestionResult() &&
                  !findQuestionResult()?.answer.includes(opt._id) &&
                  "0.5",
                wordBreak: "break-word",
              }}
              className={`relative ${""}
                            rounded text-center
                            text-[15px] p-2 px-10 w-full  min-h-12
                            flex items-center justify-center isidoraBold
                            insetShadow 
                            cursor-pointer
                            shadowAround box-border
                            `}
            >
              {
                /* check option */
                singleQuestion.answerOption === "multiSelect" &&
                  !findQuestionResult() && (
                    <input
                      style={{
                        borderColor: optionsBg[index],
                      }}
                      value={opt._id}
                      readOnly
                      checked={multiSelectAns.includes(opt._id)}
                      type={"checkbox"}
                      className={`absolute left-3 bg-secMainBg
                                            checkbox optionChecked${index} tickColor
                                            w-5 h-5 ${index} `}
                    />
                  )
              }
              {/* highlights answer picked by user */}
              {findQuestionResult() &&
                findQuestionResult()?.userAnswer.includes(opt._id) && (
                  <span className="bi-hand-index-fill absolute left-3"></span>
                )}

              {/* option text */}
              {opt.text}
              {findQuestionResult() && (
                <span
                  className={` ${
                    findQuestionResult().answer.includes(opt._id)
                      ? "bi-check"
                      : "bi-x"
                  } absolute right-3 text-[25px] font-bold`}
                ></span>
              )}
            </div>
          )
        );
      })}
      {/* submit answer */}
      {singleQuestion.answerOption === "multiSelect" &&
        !findQuestionResult() && (
          <button
            onClick={() => {
              if (!multiSelectAns.length) {
                toast.error("Select atleast one option");
                return;
              }
              selectAnswer(multiSelectAns);
            }}
            className="bg-shinyPurple w-[110px] py-2 rounded 
                        clickable insetShadow text-[14px] isidoraSemiBold"
          >
            Submit Answer
          </button>
        )}
    </div>
  );
};

export default Options;
