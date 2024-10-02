import { useEffect, useState } from "react";
import SearchTrigger from "../SearchTrigger";
import getQueryParams from "./getQueryParams";

const Filters = ({ refetch, isLoading }) => {
  const [category, setCategory] = useState(getQueryParams().get("category"));
  const [scoring, setScoring] = useState(getQueryParams().get("scoring"));
  const [numOfQuests, setNumOfQuests] = useState({
    min: getQueryParams().get("min"),
    max: getQueryParams().get("max"),
  });
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("category", category);
    url.searchParams.set("scoring", scoring);
    url.searchParams.set("min", numOfQuests.min);
    url.searchParams.set("max", numOfQuests.max);
    window.history.replaceState(null, "", url);
    if (triggerRefetch) {
      refetch();
      setTriggerRefetch(false);
    }
  }, [category, scoring, numOfQuests, triggerRefetch]);

  return (
    <div
      className="flex justify-center gap-y-2 gap-x-5
 items-center flex-wrap px-3 w-full max-w-[600x]"
    >
      <SearchTrigger
        category={category}
        scoring={scoring}
        numOfQuests={numOfQuests}
        refetch={refetch}
      />
      {/*Category */}
      <div
        className="flex flex-col items-center
             gap-1 w-[160px]"
      >
        <span className="isidoraBold text-[14px]">Category</span>
        <select
          value={category}
          className="select select-xs rounded text-[12px] 
                    outline-none w-full border-mainBg"
          onChange={(event) => {
            setCategory(event.target.value);
            setTriggerRefetch(true);
          }}
        >
          {[
            "All",
            "General Knowledge",
            "Entertainment",
            "Science Technology",
            "Sports",
            "Pop Culture",
            "Academic",
            "Lifestyle",
            "Miscellaneous",
          ].map((category, index) => {
            return (
              <option value={category} key={index}>
                {category === "Science Technology"
                  ? "Science & Technology"
                  : category}
              </option>
            );
          })}
        </select>
      </div>

      {/* Scoring */}

      <div className="flex flex-col items-center gap-1 w-[160px]">
        <span className="isidoraBold text-[14px] outline-none">Scoring</span>
        <select
          value={scoring}
          className="select select-xs rounded text-[12px]
                   w-full border-mainBg"
          onChange={(event) => {
            setScoring(event.target.value);
            setTriggerRefetch(true);
          }}
        >
          {["Any", "Exam-Style Scoring", "Speed-Based Scoring"].map(
            (scoring, index) => {
              return (
                <option value={scoring} key={index}>
                  {scoring}
                </option>
              );
            }
          )}
        </select>
      </div>

      {/* Number of questions */}
      <div className="flex flex-col items-center gap-1 w-[160px]">
        <span className="isidoraBold text-[14px] outline-none">
          Num. of questions
        </span>
        <select
          value={JSON.stringify(numOfQuests)}
          onChange={(event) => {
            setNumOfQuests(JSON.parse(event.target.value));
            setTriggerRefetch(true);
          }}
          className="select select-xs rounded text-[12px]
           w-full border-mainBg"
        >
          {[
            { min: "", max: "" },
            { min: "1", max: "6" },
            { min: "7", max: "12" },
            { min: "13", max: "19" },
            { min: "20", max: "25" },
          ].map((number, index) => {
            return (
              <option value={JSON.stringify(number)} key={index}>
                {number.min + "-" + number.max}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Filters;
