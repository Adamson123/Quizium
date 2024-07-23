import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { getQuizWithQuestions } from "../api/QuizApi";
import { useMutation, useQuery } from "react-query";
import { createQuestion, updateQuestion } from "../api/QuestionApi";
import QuizSettings from "../components/QuizSettings";
import quiziumImg from "../assets/images/defaultCover/quizium-8.webp";
import BufferToObjUrl from "../utils/BufferToObjUrl";
import Loading from "../components/ui/Loading";
import { convertToWebp } from "../utils/convertToWebp";
import PageIsLoading from "../components/ui/PageIsLoading";
const CreateQuestionPage = () => {
    const { id } = useParams();

    const { data, isLoading, error, refetch } = useQuery(
        ["quiz-questions", id],
        () => getQuizWithQuestions(id),
        {
            retry: false,
        }
    );

    const { mutateAsync: createQuestionFunc } = useMutation(createQuestion);
    const { mutateAsync: updateQuestionFunc } = useMutation(updateQuestion);

    //all quiz questions
    const [allQuestions, setAllQuestions] = useState();

    const questionRef = useRef(null);
    const optionRefs = useRef([]);
    const uploadRef = useRef();

    //new data to be sent
    const [singleQuestion, setSingleQuestion] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [showQuizPanel, setShowQuizPanel] = useState(false);
    const navigate = useNavigate();

    const [updateText, setUpdateText] = useState(true);

    const [optionsTextColor, setOptionsTextColor] = useState([
        "#e779c1",
        "#408fb9",
        "#e8bf05",
        "#e48775",
    ]);

    const [imagePicked, setPickedImage] = useState();

    const allQuestions_2 = useMemo(() => {
        if (data) {
            return data.questionsId.questions;
        }
    }, [data]);

    const config = useMemo(() => {
        if (data) {
            return {
                title: data.title,
                description: data.description,
                timeLimit: data.timeLimit,
                applyTime: data.applyTime,
                visibility: data.visibility,
                category: data.category,
                coverImg: data.coverImg,
            };
        }
    }, [data]);

    //updating all questions array if questions has been fetched
    useEffect(() => {
        if (data) {
            setAllQuestions(data.questionsId.questions);
            console.log("ran again");
            setUpdateText((u) => (u = true));
        }
    }, [data]);

    //updating single questions array if allQuestions array has been populated or if currentQuestion changes
    useEffect(() => {
        if (allQuestions) {
            setSingleQuestion((q) => (q = allQuestions[currentQuestion]));
        }
    }, [allQuestions, currentQuestion]);

    // displaying question and options if singleQuestion array has been populated
    useEffect(() => {
        if (singleQuestion && updateText) {
            questionRef.current.innerText =
                allQuestions[currentQuestion].question;

            // Add text to options
            allQuestions[currentQuestion].options.forEach((option, i) => {
                optionRefs.current[i].innerText = option.text;
            });

            setUpdateText((u) => (u = false));
        }
    }, [singleQuestion, currentQuestion]);

    useEffect(() => {
        setUpdateText((u) => (u = true));
    }, [currentQuestion]);

    const updateOptions = (event, id) => {
        //update option
        const updatedOption = singleQuestion.options.map((o) => {
            return o._id !== id ? o : { ...o, text: event.target.innerText };
        });

        //joining remaining data with options
        const updatedSingleQuestion = {
            ...singleQuestion,
            options: updatedOption,
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions((a) => (a = updatedMultipleQuestion));
    };

    const updateQuestionText = (event) => {
        const updatedSingleQuestion = {
            ...singleQuestion,
            question: event.target.innerText,
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions((a) => (a = updatedMultipleQuestion));
    };

    const updateAnswer = (event) => {
        const updatedSingleQuestion = {
            ...singleQuestion,
            answer: event.target.value,
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions((a) => (a = updatedMultipleQuestion));
    };

    const handleCreateQuiz = async () => {
        const data = {
            data: {
                question: "",
                answer: "",
                explanation: "",
                options: [
                    {
                        text: "",
                        isCorrect: false,
                    },
                    {
                        text: "",
                        isCorrect: false,
                    },
                    {
                        text: "",
                        isCorrect: false,
                    },
                    {
                        text: "",
                        isCorrect: false,
                    },
                ],
                questionType: "quiz",
            },
            id,
        };
        await createQuestionFunc(data);

        refetch();
    };

    const handleUpdateQuiz = async () => {
        if ((allQuestions_2 !== allQuestions || imagePicked) && !isLoading) {
            console.log("updating");
            const formData = new FormData();
            formData.append("file", imagePicked);
            formData.append("question", JSON.stringify(singleQuestion));

            const data = {
                data: formData,
                id,
            };

            await updateQuestionFunc(data);

            await refetch();

            setPickedImage("");
        }
    };

    const updateImage = async (event) => {
        const image = event.target.files[0];
        // console.log(image);
        if (image) {
            let optimizedImage = image;
            if (optimizedImage.name.split(".")[1] !== "webp") {
                console.log("not webp");
                //convert to webp for performance
                optimizedImage = await convertToWebp(
                    URL.createObjectURL(image),
                    image.name
                );
            } else {
                console.log("is webp");
            }
            console.log("image low", optimizedImage, image, "image high");
            setPickedImage(optimizedImage);
        }

        //event.target.value = "";
    };
    useEffect(() => {
        if (imagePicked) {
            handleUpdateQuiz();
        }
    }, [imagePicked]);

    if (!data) {
        return <PageIsLoading message={"Setting up quiz editor..."} />;
    }

    return (
        <div className="isidoraReg">
            {/* Header */}
            <div className="p-3 bg-mainBg flex justify-between fixed right-0 left-0  top-0 z-10 ">
                <h1
                    onClick={() => {
                        navigate("/");
                    }}
                    className="font-bold text-2xl
           text-shinyPurple agbalumoFont tracking-tighter cursor-pointer"
                >
                    Quizium
                </h1>
                {/* quiz settings , save button , change question type*/}
                <div className="flex items-center gap-3">
                    {/* quiz settings*/}
                    <div
                        onClick={() => setShowQuizPanel((s) => (s = true))}
                        className="border border-grayOne p-[3px] pl-2 rounded 
                    flex items-center gap-2 cursor-pointer"
                    >
                        <span className="isidoraBold text-[13px]">
                            Quiz settings
                        </span>
                        <button className="bg-grayTwo py-1 px-2 rounded">
                            <span className="bi-gear-fill"></span>
                        </button>
                    </div>
                    {/* question type */}
                    <button className="p-[7px] clickable font-bold px-4 relative isidoraBold bg-shinyPurple insetShadow rounded">
                        <span className="bi-chat text-1xl"></span>
                        <span className="bi-question absolute left-[16px]"></span>
                    </button>
                    {/* save button*/}
                    <button className="p-[7px] clickable isidoraBold bg-shinyPurple insetShadow rounded">
                        Save
                    </button>
                </div>
            </div>
            <div className="min-h-screen pt-24 pb-28 px-7 md:pl-44 md:pb-5">
                {config && (
                    <QuizSettings
                        config={config}
                        refetch={refetch}
                        id={id}
                        setShow={setShowQuizPanel}
                        show={showQuizPanel}
                    />
                )}
                {/*  Enter Question &  options container*/}

                <div className="w-full max-w-[500px] m-auto">
                    {/*  Enter Question */}

                    <div
                        className="bg-mainBg border border-grayOne rounded text-center
                         text-[15px] p-2 w-full h-auto text-wrap break-words flex items-center justify-center"
                    >
                        <div
                            onInput={updateQuestionText}
                            className="w-full font-bold outline-none overflow-y-auto max-h-full"
                            contentEditable
                            data-placeholder="Enter question..."
                            ref={questionRef}
                        />
                    </div>
                    {/* Upload Image */}
                    <div
                        className={`w-full h-[300px] border-2 border-grayOne mt-4 rounded 
                            relative m-auto`}
                    >
                        <input
                            onChange={updateImage}
                            ref={uploadRef}
                            type="file"
                            className="absolute w-0 h-0 pointer-events-none opacity-0"
                            accept=".png, .jpg, .jpeg, .webp"
                        />
                        <div
                            className="absolute top-[50%] bottom-[50%] flex flex-col justify-center items-center
                           gap-2 w-full fill text-grayTwo"
                        >
                           { imagePicked && <Loading
                                cus={
                                    " loading-lg absolute top-[-75px] bg-shinyPurple"
                                }
                            />

}
                            <span className="text-center text-[15px] font-bold">
                                File supported - .png, .jpg, .jpeg, .webp
                            </span>
                            {!imagePicked && (
                                <button
                                    onClick={() => {
                                        uploadRef.current.click();
                                    }}
                                    className=" flex justify-center items-center p-3 h-[40px]
                                     bg-transparent 
                          w-16 rounded  border-2 border-grayTwo"
                                >
                                    <span className="bi-upload font-bold"></span>
                                </button>
                            )}
                        </div>

                        {((singleQuestion && singleQuestion.image) ||
                            imagePicked) && (
                            <img
                                src={
                                    imagePicked
                                        ? URL.createObjectURL(imagePicked)
                                        : BufferToObjUrl(
                                              singleQuestion.image.image.data
                                                  .data
                                          )
                                }
                                className="h-full w-full object-cover"
                                alt="question based on quiz question"
                            />
                        )}
                    </div>

                    {/*  Enter Options */}
                    <div className="flex flex-col gap-4 mt-10">
                        {singleQuestion &&
                            singleQuestion.options.map((option, i) => {
                                return (
                                    <div
                                        style={{
                                            borderColor: optionsTextColor[i],
                                            color: optionsTextColor[i],
                                        }}
                                        key={i}
                                        className={`relative bg-mainBg border-2
                                    rounded text-center
                                 text-[15px] p-2 px-10 w-full h-16 text-wrap break-words
                                  overflow-y-auto flex items-center justify-center`}
                                    >
                                        <input
                                            onChange={updateAnswer}
                                            style={{
                                                borderColor:
                                                    optionsTextColor[i],
                                            }}
                                            value={option._id}
                                            checked={
                                                option._id ===
                                                singleQuestion.answer
                                            }
                                            type="radio"
                                            className={`absolute left-3 radio w-5 h-5 optionChecked${i} `}
                                            name="option"
                                        />
                                        <div
                                            onInput={(event) =>
                                                updateOptions(event, option._id)
                                            }
                                            className={`w-full outline-none overflow-y-auto max-h-full`}
                                            contentEditable
                                            data-placeholder="Enter option..."
                                            ref={(el) =>
                                                (optionRefs.current[i] = el)
                                            }
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* quizzes menu  */}
                <div
                    className="fixed overflow-x-auto bottom-0 right-0 left-0 bg-mainBg gap-2
                 flex p-2 md:top-0 md:flex-col md:w-44 md:pt-20 md:overflow-y-auto items-center  md:px-10"
                >
                    {allQuestions &&
                        allQuestions.map((q, i) => {
                            return (
                                <div
                                    onClick={() => {
                                        if (!imagePicked) {
                                            handleUpdateQuiz();
                                            setCurrentQuestion((c) => (c = i));
                                        }
                                        // setPickedImage("");
                                    }}
                                    key={i}
                                    className={`min-h-16 min-w-24  border-2  ${
                                        currentQuestion === i
                                            ? "border-shinyPurple text-shinyPurple"
                                            : "border-grayOne text-grayOne"
                                    } 
                            cursor-pointer rounded text-center  flex 
                            justify-center items-center font-bold text-3xl md:min-w-32 md:min-h-20`}
                                >
                                    {i + 1}
                                </div>
                            );
                        })}
                    <button
                        className="p-2 h-10 w-10 bg-shinyPurple
                     insetShadow text-2xl rounded flex justify-center items-center
                      font-bold md:h-10 md:w-28 clickable"
                        onClick={() => {
                            handleUpdateQuiz();
                            handleCreateQuiz();
                        }}
                    >
                        <span className="text-[13px] hidden md:block isidoraBold">
                            Add Question
                        </span>
                        <span className="bi-plus block md:hidden"></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateQuestionPage;
