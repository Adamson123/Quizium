import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/output.css";
import "./css/global.css";
import "./assets/boostrap-icons/bootstrap-icons.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { clientID } from "./utils/envImport.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={clientID}>
                    <App />
                </GoogleOAuthProvider>

                <Toaster
                    position="top-center"
                    containerStyle={{
                        textAlign: "center",
                        fontFamily: "isidoraSemiBold",
                    }}
                />
            </QueryClientProvider>
        </Router>
    </React.StrictMode>
);
