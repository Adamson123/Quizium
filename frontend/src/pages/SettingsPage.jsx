import { useContext } from "react";
import { dataContext } from "../layouts/Layout";
import Personal from "../components/SettingsComps/Personal";
import Password from "../components/SettingsComps/Password";
import SearchTrigger from "../components/SearchTrigger";

const SettingsPage = () => {
    return (
        <div
            className="pt-16 bg-secMainBg text-textColor min-h-screen flex 
    flex-col items-center md:pl-[180px]"
        >
            <SearchTrigger />
            <h2
                className="text-3xl text-center 
        font-bold text-textColor isidoraBold mt-2"
            >
                Settings
            </h2>
            <div
                className="flex flex-col items-center 
        w-full max-w-[500px] p-4  text-textColor slg:flex-row
         slg:max-w-full md:items-start gap-5 mt-7"
            >
                {/* Personal info content*/}
                <Personal />
                {/* Password content*/}
                <Password />
            </div>
        </div>
    );
};

export default SettingsPage;
