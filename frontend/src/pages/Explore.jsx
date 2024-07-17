import { useState } from "react";
import GeneralKnowledge from "../components/AdminPageComponents/GeneralKnowledge";
import QuizSettings from "../components/QuizSettings";

const Explore = () => {
    const [showQuizPanel, setShowQuizPanel] = useState(false);
    return (
        <div
            className="md:pl-[200px] isidoraReg text-textColor 
    py-[100px] px-[35px] bg-mainBg min-h-screen"
        >
            <QuizSettings setShow={setShowQuizPanel} show={showQuizPanel} />

            <div className="mb-14 flex gap-5 w-full">
                <div
                    className="bg-blurryPurple p-5 rounded w-full
        flex flex-col justify-between h-auto items-start"
                >
                    <div className="">
                        <h1 className="text-4xl isidoraSemiBold">Join Quiz</h1>
                        <h3 className="text-xs mt-2 tracking-wider text-gray-400">
                            Join an Ongoing Quiz or Dive into a World of
                            Questions
                        </h3>
                    </div>

                    <button
                        style={{
                            transition: "transform 0.2s",
                        }}
                        className="bg-shinyPurple mt-3 rounded insetShadow 
          text-xs px-3 py-2 isidoraBold hover:scale-[0.9]"
                    >
                        Join Quiz
                    </button>
                </div>
                <div
                    className="bg-blurryPurple p-5 rounded  w-full
        flex flex-col justify-between h-auto items-start"
                >
                    <div>
                        <h1 className="text-4xl isidoraSemiBold">
                            Create Quiz
                        </h1>
                        <h3 className="text-xs mt-2 tracking-wider text-gray-400">
                            Craft Engaging Quizzes in Minutes
                        </h3>
                    </div>

                    <button
                        onClick={() => setShowQuizPanel(true)}
                        style={{
                            transition: "transform 0.2s",
                        }}
                        className="bg-shinyPurple mt-3 rounded 
          insetShadow text-xs px-3 py-2 isidoraBold hover:scale-[0.9]"
                    >
                        Create a Quiz
                    </button>
                </div>
            </div>

            <GeneralKnowledge />
        </div>
    );
};

export default Explore;
