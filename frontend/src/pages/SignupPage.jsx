import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserFunc } from "../api/AuthUserApi";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
const SignupPage = () => {
    const [info, setInfo] = useState({ name: "", email: "", password: "" });
    const [show, setShow] = useState(false);
    const { mutateAsync: createUser } = useMutation(createUserFunc);
    const navigate = useNavigate();
    const handleInfo = (event) => {
        setInfo(
            (i) => (i = { ...info, [event.target.name]: event.target.value })
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const promise = createUser({ ...info });

        toast.promise(promise, {
            loading: "Creating Account",
            success: (data) => {
                return data.msg;
            },
            error: (data) => {
                console.log(data);
                return data.err;
            },
        });
        const newData = await promise;

        if (newData.msg) navigate("/");
    };

    return (
        <div
            className="flex bg-mainBg flex-col items-center justify-center
     min-h-screen p-20"
        >
            <form onSubmit={handleSubmit}>
                <div className="login flex-col flex  items-center">
                    <div className="h-[65px] flex flex-col items-center justify-between mb-[15px] ">
                        <h2 className="agbalumoFont text-textColor text-center text-3xl">
                            Create Account
                        </h2>
                        <p className="isidoraBold text-grayTwo text-[13px]">
                            Please fill in your info
                        </p>
                    </div>

                    <div className="h-[170px] flex flex-col justify-between">
                        <input
                            name="name"
                            value={info.name}
                            onChange={handleInfo}
                            type="text"
                            placeholder="Username"
                            required
                            minLength={2}
                            className=" placeholder:text-placeholder isidoraBold p-2 w-[300px] h-[50px] rounded-[5px]
             bg-grayOne border-[3px]
             outline-none text-textColor text-[17px] border-lightGray"
                        />

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
                                maxLength={15}
                                minLength={4}
                                className="placeholder:text-placeholder isidoraBold p-2 pr-7 w-[300px] h-[50px] rounded-[5px]
             bg-grayOne border-[3px] outline-none text-textColor text-[17px] 
             border-lightGray"
                            />
                            <span
                                onClick={() => setShow((s) => (s = !s))}
                                className={`${
                                    show ? "bi-eye-slash-fill" : "bi-eye-fill"
                                }
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
                            className="hover:scale-[0.9] isidoraBold p-2 w-[300px] h-[50px] rounded-[5px]
             bg-shinyPurple  outline-none text-[20px] insetShadow"
                        >
                            SIGN UP
                        </button>
                        <Link to="/login">
                            <p className="isidoraBold text-textColor mt-2">
                                Already have an account?{" "}
                                <span className="text-shinyPurple">Login</span>
                            </p>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;
