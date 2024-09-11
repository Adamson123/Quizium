import { useState } from "react";
import Loading from "../ui/Loading";
import { useMutation } from "react-query";

const ResetPassword = () => {
    const { mutateAsync: resetPasswordFunc, isLoading } = useMutation(() => {});

    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    return (
        <div className="flex justify-center min-h-screen items-center">
            <form className="flex flex-col gap-3 justify-center m-auto">
                <h2 className="agbalumoFont text-textColor text-center text-3xl">
                    Enter New Password
                </h2>
                <div className="flex flex-col gap-2">
                    <div className="relative">
                        <input
                            name="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            type={show ? "text" : "password"}
                            placeholder="Password"
                            required
                            className="placeholder:text-placeholder 
                                isidoraBold p-2 pr-7 w-[300px] h-[50px] rounded-[5px]
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
                            "Reset Password"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
