import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUserFunc } from "../api/AuthUserApi";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import Loading from "../components/ui/Loading";

const LoginPage = () => {
    const [info, setInfo] = useState({ email: "", password: "" });
    const [show, setShow] = useState(false);

    const { mutateAsync: loginUser, isLoading } = useMutation(loginUserFunc);
    const navigate = useNavigate();
    const handleInfo = (event) => {
        setInfo(
            (i) => (i = { ...info, [event.target.name]: event.target.value })
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isLoading) {
            const promise = loginUser({ ...info });

            toast.promise(promise, {
                loading: "Logging In",
                success: (data) => {
                    //console.log(data.msg);
                    return data.msg;
                },
                error: (data) => {
                    return data.err;
                },
            });
            const newData = await promise;
            //alert(newData.err);

            if (newData.msg) navigate("/");
        }
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
                            className={`isidoraBold p-2 w-[300px] h-[50px] rounded-[5px]
            ${
                isLoading ? "bg-grayTwo" : "bg-shinyPurple"
            }   outline-none text-[20px] insetShadow clickable`}
                        >
                            {isLoading ? (
                                <Loading cus={"loading-md"} />
                            ) : (
                                "LOGIN"
                            )}
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
