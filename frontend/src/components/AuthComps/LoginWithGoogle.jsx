import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { googleLogin } from "../../api/AuthUserApi";
import toast from "react-hot-toast";

const LoginWithGoogle = () => {
    const { mutateAsync: googleLoginFunc, isLoading } =
        useMutation(googleLogin);
    const navigate = useNavigate();

    const handleGoogleLogin = async (info) => {
        if (isLoading) {
            return;
        }
        const promise = googleLoginFunc(info);

        toast.promise(promise, {
            loading: "Logging In",
            success: (data) => {
            
                return data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });
        const newData = await promise;
        //alert(newData.err);

        if (newData.msg) navigate("/");
    };
    return (
        <div className="flex flex-col items-center gap-2">
            <span className="isidoraBold">or</span>
            <GoogleLogin
                width={280}
                onSuccess={(credential) => {
                    //console.log(credential);
                    handleGoogleLogin(credential);
                }}
                onError={() => {
                    console.log("failed");
                }}
                buttonText="Login with google"
            />
        </div>
    );
};

export default LoginWithGoogle;
