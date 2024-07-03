import { useState } from "react";
import SettingInputComp from "../components/SettingInputComp";
import {
  getUserFunc,
  updatePasswordFunc,
  updatePersonalInfoFunc,
} from "../api/UserApi";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

const SettingsPage = () => {
  const { data, refetch } = getUserFunc();
  const { email, name } = data;

  const { mutateAsync: updatePersonalData } = useMutation(
    updatePersonalInfoFunc
  );

  const { mutateAsync: updatePassword } = useMutation(updatePasswordFunc);

  const [personalInput, setPersonalInput] = useState({ name, email, file: "" });
  const [passwordInput, setPasswordInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [image, setimage] = useState("");

  const handlePersonalInfoSubmit = async (
    event
  ) => {
    event.preventDefault();
    

    const formdata = new FormData();
    formdata.append("file", image);
    formdata.append("name",  personalInput.name );

    const personalDataUpdRes = await updatePersonalData(formdata);
    const err = personalDataUpdRes.err;
    if (err) {
      toast.error(err);
    } else {
      refetch();
      toast.success(personalDataUpdRes.msg);
    }
  };

  const chooseImage = (event) => {
    setimage(event.target.files[0]);
    console.log(event.target.value, image);
  };

  const handlePasswordSubmit = async (
    event
  ) => {
    event.preventDefault();

    const passwordUpdRes = await updatePassword(passwordInput);
    const err = passwordUpdRes.err;
    if (err) {
      toast.error(err);
    } else {
      refetch();
      toast.success(passwordUpdRes.msg);
    }
  };
  return (
    <div
      className="pt-16 bg-mainBg min-h-screen flex 
    flex-col items-center md:pl-[180px]"
    >
      <div
        className="flex flex-col items-center 
        w-full max-w-[450px] p-4  text-textColor "
      >
        <h2
          className="text-3xl text-center 
        font-bold text-textColor isidora mb-7"
        >
          Settings
        </h2>
        {/* Personal info content*/}
        <div className=" isidoraReg w-full">
          <h2 className="isidoraSemiBold">Personal Info</h2>
          {/* Personal info form*/}

          <form
            onSubmit={handlePersonalInfoSubmit}
            className="mt-3 text-[13px]"
            encType="multipart/form-data"
          >
            <div className="border-[2px] border-grayTwo rounded">
              <div className="flex flex-col  p-3 pb-5 border-b-[2px]  border-grayTwo ">
                <input
                  type="file"
                  onChange={chooseImage}
                  className="cursor-pointer"
                />
                {/* Username input */}

                <SettingInputComp
                  input={personalInput.name}
                  setInput={setPersonalInput}
                  type="text"
                  name="name"
                  maxLength={15}
                  minLength={2}
                />
              </div>
              <div className="flex flex-col p-3 pb-5">
                {/* Email input */}

                <SettingInputComp
                  input={personalInput.email}
                  setInput={setPersonalInput}
                  type="email"
                  name="email"
                  disabled
                />
              </div>
            </div>
            <button
              type="submit"
              style={{
                transition: "transform 0.2s",
              }}
              className="hover:scale-[0.9] w-full rounded-[3px] mt-3 
              p-3 bg-shinyPurple font-bold insetShadow"
            >
              Save changes
            </button>
          </form>

          {/* Password info */}
        </div>
        {/* Password content*/}
        <div className=" isidoraReg w-full mt-7">
          <h2 className="isidoraSemiBold">Password</h2>
          {/* Password info form*/}

          <form onSubmit={handlePasswordSubmit} className="mt-3 text-[13px]">
            <div className="border-[2px] border-grayTwo rounded">
              <div className="flex flex-col  p-3 pb-5 border-grayTwo ">
                {/* Current Password input */}

                <SettingInputComp
                  input={passwordInput.currentPassword}
                  setInput={setPasswordInput}
                  type="text"
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
              type="submit"
              style={{
                transition: "transform 0.2s",
              }}
              className="hover:scale-[0.9] w-full rounded-[3px] mt-3 p-3
             bg-shinyPurple font-bold insetShadow "
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
