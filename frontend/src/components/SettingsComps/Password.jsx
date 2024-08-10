import toast from "react-hot-toast";
import { updatePasswordFunc } from "../../api/UserApi";
import SettingInputComp from "./SettingInputComp";
import { useState } from "react";
import { useMutation } from "react-query";

const Password = () => {
    //function for updating user password
    const { mutateAsync: updatePassword } = useMutation(updatePasswordFunc);

    //value for password new-passsword and confirm-password
    const [passwordInput, setPasswordInput] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const allPasswordFieldFilled = () => {
        return (
            passwordInput.currentPassword &&
            passwordInput.newPassword &&
            passwordInput.confirmPassword
        );
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        const promise = updatePassword(passwordInput);
        toast.promise(promise, {
            loading: "Updating password...",
            success: (data) => {
                return data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });
        await promise;
        setPasswordInput({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    return (
        <div className=" isidoraReg w-full mt-7">
            <h2 className="isidoraSemiBold">Password</h2>
            {/* Password info form*/}

            <form onSubmit={handlePasswordSubmit} className="mt-3 text-[13px]">
                <div className="border-[2px] border-mainBg rounded">
                    <div className="flex flex-col  p-3 pb-5 border-grayTwo">
                        {/* Current Password input */}

                        <SettingInputComp
                            input={passwordInput.currentPassword}
                            setInput={setPasswordInput}
                            type="password"
                            name="current Password"
                        />
                    </div>
                    <div className="flex flex-col p-3 pb-5">
                        {/* New Password input */}

                        <SettingInputComp
                            input={passwordInput.newPassword}
                            setInput={setPasswordInput}
                            type="password"
                            name="new Password"
                        />
                    </div>
                    <div className="flex flex-col p-3 pb-5">
                        {/* Confirm New Password input */}

                        <SettingInputComp
                            input={passwordInput.confirmPassword}
                            setInput={setPasswordInput}
                            type="password"
                            name="confirm Password"
                        />
                    </div>
                </div>
                <button
                    type={`${allPasswordFieldFilled() ? "submit" : "button"}`}
                    className={`${
                        allPasswordFieldFilled() && "clickable"
                    } w-full rounded-[3px] mt-3 p-3
                    ${
                        allPasswordFieldFilled()
                            ? "bg-shinyPurple"
                            : "bg-grayTwo"
                    } font-bold insetShadow isidoraBold`}
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Password;
