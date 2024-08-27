import { Navigate, Route, Routes } from "react-router";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Layout from "./layouts/Layout";
import ExplorePage from "./pages/ExplorePage";
import SettingsPage from "./pages/SettingsPage";
import QuizEditorPage from "./pages/QuizEditorPage";
import LibraryPage from "./pages/LibraryPage";
import DetailsPage from "./pages/DetailsPage";
import PlayQuizPage from "./pages/PlayQuizPage";
import ResultPage from "./pages/ResultPage";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                {/* Admin route */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <ExplorePage />
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
                    path="/library"
                    element={
                        <Layout text={"Your library"}>
                            <LibraryPage />
                        </Layout>
                    }
                />
                <Route path="/quiz-editor/:id" element={<QuizEditorPage />} />
                <Route
                    path="/play/:id"
                    element={
                        <Layout showHeader={false}>
                            <PlayQuizPage />
                        </Layout>
                    }
                />
                <Route
                    path="/details/:id"
                    element={
                        <Layout>
                            <DetailsPage />
                        </Layout>
                    }
                />
                <Route
                    path="/result/:id"
                    element={
                        <Layout>
                            <ResultPage />
                        </Layout>
                    }
                />
            </Route>

            {/* Non protected routes */}
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
