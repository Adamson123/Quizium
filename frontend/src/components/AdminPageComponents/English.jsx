const RandomQuestions = () => {
  return (
    <div>
      <h3 className="text-[13px] mb-3 font-semibold">English Questions</h3>
      {/* random question roll*/}
      <div className="flex gap-4 overflow-x-auto overflow-auto hideScroll">
        {/* Quiz */}
        <div
          className="border box-border border-solid
         border-gray-600 rounded h-[200px] min-w-[170px]"
        >
          {/* Quiz image */}
          <div className="w-full h-[80px] bg-white rounded-tl rounded-tr"></div>
          {/* Quiz info */}
          <div className="p-3 h-[120px] flex flex-col justify-between">
            <div className="flex items-center">
              <span className="h-[25px] w-[25px] rounded-full bg-white mr-1"></span>
              <span className="text-[12px]">Quizium</span>
            </div>
            {/* Quiz name */}
            <h3 className="font-bold text-[14px]">Daily Check in</h3>
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>4 questions</span>
              <span>12 plays</span>
            </div>
          </div>
        </div>

        <div
          className="border box-border border-solid
         border-gray-600 rounded h-[200px] min-w-[170px]"
        >
          {/* Quiz image */}
          <div className="w-full h-[80px] bg-white rounded-tl rounded-tr"></div>
          {/* Quiz info */}
          <div className="p-3 h-[120px] flex flex-col justify-between">
            <div className="flex items-center">
              <span className="h-[25px] w-[25px] rounded-full bg-white mr-1"></span>
              <span className="text-[12px]">Quizium</span>
            </div>
            {/* Quiz name */}
            <h3 className="font-bold text-[14px]">Daily Check in</h3>
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>4 questions</span>
              <span>12 plays</span>
            </div>
          </div>
        </div>

        <div
          className="border box-border border-solid
         border-gray-600 rounded h-[200px] min-w-[170px]"
        >
          {/* Quiz image */}
          <div className="w-full h-[80px] bg-white rounded-tl rounded-tr"></div>
          {/* Quiz info */}
          <div className="p-3 h-[120px] flex flex-col justify-between">
            <div className="flex items-center">
              <span className="h-[25px] w-[25px] rounded-full bg-white mr-1"></span>
              <span className="text-[12px]">Quizium</span>
            </div>
            {/* Quiz name */}
            <h3 className="font-bold text-[14px]">Daily Check in</h3>
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>4 questions</span>
              <span>12 plays</span>
            </div>
          </div>
        </div>
        {/* <div className="skeleton rounded h-[170px] min-w-[170px]"></div> */}
      </div>
    </div>
  );
};

export default RandomQuestions;
