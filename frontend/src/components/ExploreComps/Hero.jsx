import { useNavigate } from "react-router";

const Hero = ({ setShowQuizPanel }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 w-full pr-[15px] mb-8">
      <div
        className="bg-blurryPurple p-5 rounded  w-[50%]
 flex flex-col justify-between h-auto items-start"
      >
        <div className="">
          <h1 className="text-4xl isidoraSemiBold">Join Quiz</h1>
          <h3 className="text-xs mt-2 tracking-wider text-grayFive">
            Join an Ongoing Quiz or Dive into a World of Questions.
          </h3>
        </div>

        <button
          onClick={() => navigate("/join-live")}
          className="clickable bg-shinyPurple mt-3 rounded insetShadow 
            text-xs px-3 py-2 isidoraBold"
        >
          Join Quiz
        </button>
      </div>
      <div
        className="bg-blurryPurple p-5 rounded  w-[50%]
        flex flex-col justify-between h-auto items-start"
      >
        <div>
          <h1 className="text-4xl isidoraSemiBold">Create Quiz</h1>
          <h3 className="text-xs mt-2 tracking-wider text-grayFive">
            Craft Engaging Quizzes in Minutes.
          </h3>
        </div>

        <button
          onClick={() => setShowQuizPanel(true)}
          className="bg-shinyPurple mt-3 rounded 
              insetShadow text-xs px-3 py-2 isidoraBold clickable"
        >
          Create a Quiz
        </button>
      </div>
    </div>
  );
};

export default Hero;
