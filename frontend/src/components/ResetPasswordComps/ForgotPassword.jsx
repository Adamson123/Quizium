import { useState } from "react";
import Loading from "../ui/Loading";
import { resetPasswordLink } from "../../api/AuthUserApi";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const ForgotPassword = () => {
    const { mutateAsync: resetPasswordLFunc, isLoading } =
        useMutation(resetPasswordLink);
    const [email, setEmail] = useState("");

    const getResetPasswordLink = async (event) => {
        event.preventDefault();
        if (isLoading) {
            return;
        }

        const promise = resetPasswordLFunc({ email });

        toast.promise(promise, {
            loading: "Sending reset link",
            success: (data) => {
                //console.log(data.msg);
                return data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });
        const res = await promise;
        console.log(res);
    };

    return (
        <div className="flex justify-center min-h-screen items-center">
            <form
                onSubmit={(event) => getResetPasswordLink(event)}
                className="flex flex-col gap-3 justify-center m-auto"
            >
                <h2 className="agbalumoFont text-textColor text-center text-3xl">
                    Forgot Password
                </h2>
                <div className="flex flex-col gap-2">
                    <input
                        value={email}
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        placeholder="Email"
                        required
                        className="placeholder:text-placeholder isidoraBold
                             p-2 w-[300px] h-[50px] rounded-[5px] 
                            bg-grayOne border-[3px] outline-none text-textColor
                            text-[17px] border-lightGray"
                    />
                    <button
                        type="submit"
                        className={`isidoraBold p-2 w-[300px] h-[50px] rounded-[5px]
                                ${
                                    isLoading ? "bg-grayTwo" : "bg-shinyPurple"
                                }   outline-none text-[20px] insetShadow clickable`}
                    >
                        {isLoading ? <Loading cus={"loading-md"} /> : "Send"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
