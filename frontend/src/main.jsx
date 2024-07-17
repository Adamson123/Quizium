import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/output.css";
import "./css/global.css";
import "./assets/boostrap-icons/bootstrap-icons.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
//import "react-toastify/ReactToastify.css"
import { Toaster } from "react-hot-toast";

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
                <App />
                <Toaster position="top-center" />
            </QueryClientProvider>
        </Router>
    </React.StrictMode>
);
