import React, { useState } from "react";
import { useMutation } from "react-query";
import { updateQuiz } from "../../api/QuizApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const SaveOptions = ({
    config,
    showSaveOption,
    setShowSaveOption,
    setShowQuizValid,
    analizeQuiz,
    refetch,
}) => {
    const navigate = useNavigate();
    const { mutateAsync: updateQuizSettingsFunc } = useMutation(updateQuiz);
    const [settings, setSettings] = useState(config);

    const setDraft = (value) => {
        const updatedSettings = { ...config, draft: value };

        setSettings(updatedSettings);
    };

    const submitSetting = async () => {
        // draft is false, analizeQuiz returns something positive and the uppermost draft value is true
        if (!settings.draft && analizeQuiz() && config.draft) {
            setShowSaveOption(false);
            return setShowQuizValid(true);
        }
        const formData = new FormData();
        formData.append(
            "settings",
            JSON.stringify({
                ...settings,
                draft: analizeQuiz() ? true : settings.draft,
            })
        );
        formData.append("file", {});

        const promise = updateQuizSettingsFunc({ formData, id: config.id });
        toast.promise(promise, {
            loading: "Updating quiz settings",
            success: (data) => {
                return data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });
        await promise;

        refetch();
        setShowSaveOption(false);

        //if analizeQuiz and user is try to publish quiz
        if (analizeQuiz() && !settings.draft) {
            setShowQuizValid(true);
        }

        if (!settings.draft && !analizeQuiz()) {
            navigate("/library");
        }
    };
    return (
        <div
            style={{
                transition: "transform 0.2s",
            }}
            className={`fixed top-0 right-0 bottom-0 left-0
         bg-[rgba(0,0,0,0.7)] z-50 px-4 flex justify-center items-center ${
             showSaveOption ? "scale-1" : "scale-0"
         }`}
        >
            <div className="px-8 pt-5 pb-8 bg-mainBg w-full max-w-[500px] flex flex-col items-center">
                <h2 className="text-center isidoraBold mt-2 text-[23px]">
                    Save Options
                </h2>
                <div className="w-full mt-8 flex flex-col gap-7">
                    {/* Publish */}

                    <label
                        htmlFor="publish"
                        className={`flex items-center gap-5 border-2 border-grayOne 
                   ${
                       !settings.draft && "border-shinyPurple"
                   } p-4 rounded cursor-pointer`}
                    >
                        <input
                            onChange={() => setDraft(false)}
                            type="radio"
                            name="save"
                            value={false}
                            id="publish"
                            checked={settings.draft === false}
                            className="radio w-5 h-5 border-2 border-grayOne
                             checked:bg-shinyPurple checked:border-shinyPurple"
                        />
                        <div>
                            <h3 className="isidoraBold">Publish</h3>
                            <p className="text-[12px] isidoraBold w-full text-gray-500">
                                Will be visible to others to play and use base
                                on the quiz Visibility.
                            </p>
                        </div>
                    </label>

                    {/* Draft */}

                    <label
                        htmlFor="draft"
                        className={`flex items-center gap-5 border-2 border-grayOne 
                          ${
                              settings.draft && "border-shinyPurple"
                          } p-4 rounded cursor-pointer`}
                    >
                        <input
                            onChange={() => setDraft(true)}
                            type="radio"
                            name="save"
                            value={true}
                            id="draft"
                            checked={settings.draft === true}
                            className="radio w-5 h-5 border-2 border-grayOne
                             checked:bg-shinyPurple checked:border-shinyPurple"
                        />
                        <div>
                            <h3 className="isidoraBold">Draft</h3>
                            <p className="text-[12px] w-full isidoraBold  text-gray-500">
                                Won't be visible to others, but will be saved in
                                your quiz Library.
                            </p>
                        </div>
                    </label>
                </div>

                <div className="flex justify-center mt-10">
                    <button
                        onClick={submitSetting}
                        className="px-3 py-2 bg-shinyPurple rounded
                     insetShadow isidoraBold clickable"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveOptions;
