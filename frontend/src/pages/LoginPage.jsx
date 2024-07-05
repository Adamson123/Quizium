import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserFunc } from "../api/AuthUserApi";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

const LoginPage = () => {
  const [info, setInfo] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);

  const { mutateAsync: loginUser } = useMutation(loginUserFunc);
  const navigate = useNavigate();
  const handleInfo = (event) => {
    setInfo((i) => (i = { ...info, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await loginUser({ ...info });
    console.log(data);
    const err = data.err;
    if (err) {
      return toast.error(err);
    }

    navigate("/");
  };

  return (
    <div
      className="flex bg-mainBg flex-col items-center
     justify-center min-h-screen p-20"
    >
      <form onSubmit={handleSubmit}>
        <div className="login flex-col flex  items-center">
          <div
            className="h-[65px] flex flex-col items-center
           justify-between mb-[15px] "
          >
            <h2
              className="agbalumoFont text-textColor
            text-center text-3xl"
            >
              Login to Account
            </h2>
            <p className="isidoraBold text-grayTwo text-[13px]">
              Please fill in your info
            </p>
          </div>

          <div className="h-[110px] flex flex-col justify-between">
            <input
              name="email"
              value={info.email}
              onChange={handleInfo}
              type="email"
              placeholder="Email"
              required
              className="placeholder:text-placeholder isidoraBold p-2 w-[300px] h-[50px] rounded-[5px] 
            bg-grayOne border-[3px] outline-none text-textColor
            text-[17px] border-lightGray"
            />

            <div className="relative">
              <input
                name="password"
                value={info.password}
                onChange={handleInfo}
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                className="placeholder:text-placeholder isidoraBold p-2 pr-7 w-[300px] h-[50px] rounded-[5px]
             bg-grayOne border-[3px] outline-none text-textColor text-[17px] 
             border-lightGray"
              />
              <span
                onClick={() => setShow((s) => (s = !s))}
                className={`${show ? "bi-eye-slash-fill" : "bi-eye-fill"}
                 absolute text-[18px] font-bold 
                right-3 top-[13px] cursor-pointer text-grayThird`}
              ></span>
            </div>
          </div>

          <div className="mt-[18px] text-center">
            <button
              type="submit"
              style={{
                transition: "transform 0.2s",
              }}
              className="isidoraBold p-2 w-[300px] h-[50px] rounded-[5px]
             bg-shinyPurple  outline-none text-[20px] insetShadow hover:scale-[0.9]"
            >
              LOGIN
            </button>
            <Link to="/signup">
              <p className="isidoraBold text-textColor mt-2">
                Don't have an account?{" "}
                <span className="text-shinyPurple">Signup</span>
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
