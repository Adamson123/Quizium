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
import HostLivePage from "./pages/HostLivePage";
import JoinLivePage from "./pages/JoinLivePage";
import Join from "./components/JoinLiveComps/Join";
import Room from "./components/JoinLiveComps/Room";
import PlayLiveQuizPage from "./pages/PlayLiveQuizPage";
import ReportsPage from "./pages/ReportsPage";
import HostReportPage from "./pages/HostReportPage";
import SearchPage from "./pages/SearchPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPassword from "./components/ResetPasswordComps/ForgotPassword";
import ResetPassword from "./components/ResetPasswordComps/ResetPassword";

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                {/* Explore route */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <ExplorePage />
                        </Layout>
                    }
                />
                {/* Search route */}
                <Route
                    path="/search"
                    element={
                        <Layout>
                            <SearchPage />
                        </Layout>
                    }
                />

                {/* Profile settings route */}
                <Route
                    path="/settings"
                    element={
                        <Layout>
                            <SettingsPage />
                        </Layout>
                    }
                />

                {/* Library route where crafted and favorite quizzes will all be accessed */}
                <Route
                    path="/library"
                    element={
                        <Layout text={"Your library"}>
                            <LibraryPage />
                        </Layout>
                    }
                />
                {/* This is where quiz will be crafted */}
                <Route path="/quiz-editor/:id" element={<QuizEditorPage />} />
                {/* Solo quiz route */}
                <Route path="/play/:id" element={<PlayQuizPage />} />
                {/* live quiz route */}
                <Route path="/play-live/:id" element={<PlayLiveQuizPage />} />
                {/* Quiz details route */}
                <Route
                    path="/details/:id"
                    element={
                        <Layout>
                            <DetailsPage />
                        </Layout>
                    }
                />

                {/* Join live route */}
                <Route path="/join-live" element={<JoinLivePage />}>
                    {/* Where code will be inputed */}
                    <Route index element={<Join />} />
                    {/* where quiz live profile will be setup, and where quiz Participants
                     will be displayed */}
                    <Route path=":id" element={<Room />} />
                </Route>

                {/* Hosted live quiz route */}
                <Route path="/host-live/:id" element={<HostLivePage />} />

                {/* Reports route */}
                <Route
                    path="/reports"
                    element={
                        <Layout text="Reports">
                            <ReportsPage />
                        </Layout>
                    }
                />
                <Route
                    path="/host-report/:id"
                    element={
                        <Layout>
                            <HostReportPage />
                        </Layout>
                    }
                />
                {/* Quiz result route */}
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
            <Route path="/reset-password" element={<ResetPasswordPage />}>
                <Route index element={<ForgotPassword />} />
                <Route path=":token" element={<ResetPassword />} />
            </Route>
            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    );
}

export default App;
