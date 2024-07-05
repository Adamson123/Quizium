import RandomQuestions from "../components/AdminPageComponents/English";

const Admin = () => {
  return (
    <div
      className="md:pl-[200px] isidoraReg text-textColor 
    py-[100px] px-[35px] bg-mainBg min-h-screen"
    >
      <div className="mb-14 flex gap-5 w-full">
        <div
          className="bg-blurryPurple p-5 rounded w-full
        flex flex-col justify-between h-auto items-start"
        >
          <div className="">
            <h1 className="text-4xl isidoraSemiBold">Join Quiz</h1>
            <h3 className="text-xs mt-2 tracking-wider text-gray-400">
              Join an Ongoing Quiz or Dive into a World of Questions
            </h3>
          </div>

          <button
            className="bg-shinyPurple mt-3 rounded insetShadow 
          text-xs px-3 py-2 isidoraBold"
          >
            Join Quiz
          </button>
        </div>
        <div
          className="bg-blurryPurple p-5 rounded  w-full
        flex flex-col justify-between h-auto items-start"
        >
          <div>
            <h1 className="text-4xl isidoraSemiBold">Create Quiz</h1>
            <h3 className="text-xs mt-2 tracking-wider text-gray-400">
              Craft Engaging Quizzes in Minutes
            </h3>
          </div>

          <button
            className="bg-shinyPurple mt-3 rounded 
          insetShadow text-xs px-3 py-2 isidoraBold"
          >
            Create a Quiz
          </button>
        </div>
      </div>

      <RandomQuestions />
    </div>
  );
};

export default Admin;
