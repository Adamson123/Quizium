import { Navigate, Route, Routes } from "react-router";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Layout from "./layouts/layout";
import Explore from "./pages/Explore";
import SettingsPage from "./pages/SettingsPage";
import CreateQuestionPage from "./pages/CreateQuestionPage";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                {/* Admin route */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Explore />
                        </Layout>
                    }
                />

                {/* settings route */}
                <Route
                    path="/settings"
                    element={
                        <Layout>
                            <SettingsPage />
                        </Layout>
                    }
                />
                <Route
                    path="/create_questions/:id"
                    element={<CreateQuestionPage />}
                />
            </Route>
            <Route
                path="/404"
                element={
                    <div>
                        <h1 className="text-4xl">404 not found</h1>
                    </div>
                }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    );
}

export default App;
