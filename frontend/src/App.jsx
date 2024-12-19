import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const ProtectedRoutes = React.lazy(() => import("./pages/ProtectedRoutes"));
const Layout = React.lazy(() => import("./layouts/Layout"));
const ExplorePage = React.lazy(() => import("./pages/ExplorePage"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const QuizEditorPage = React.lazy(() => import("./pages/QuizEditorPage"));
const LibraryPage = React.lazy(() => import("./pages/LibraryPage"));
const DetailsPage = React.lazy(() => import("./pages/DetailsPage"));
const PlayQuizPage = React.lazy(() => import("./pages/PlayQuizPage"));
const ResultPage = React.lazy(() => import("./pages/ResultPage"));
const HostLivePage = React.lazy(() => import("./pages/HostLivePage"));
const JoinLivePage = React.lazy(() => import("./pages/JoinLivePage"));
const Join = React.lazy(() => import("./components/JoinLiveComps/Join"));
const Room = React.lazy(() => import("./components/JoinLiveComps/Room"));
const PlayLiveQuizPage = React.lazy(() => import("./pages/PlayLiveQuizPage"));
const ReportsPage = React.lazy(() => import("./pages/ReportsPage"));
const HostReportPage = React.lazy(() => import("./pages/HostReportPage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const ResetPasswordPage = React.lazy(() => import("./pages/ResetPasswordPage"));
const ForgotPassword = React.lazy(() =>
  import("./components/ResetPasswordComps/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./components/ResetPasswordComps/ResetPassword")
);
import { Link } from "react-router-dom";
import PageIsLoading from "./components/ui/PageIsLoading";

function App() {
  return (
    <Suspense fallback={<PageIsLoading />}>
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
          {/* Library route where crafted and favorite quizzes
        will all be accessed */}
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
          {/* Host report route */}
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
            <div className="flex flex-col gap-4 justify-center items-center">
              <h1 className="text-4xl p-5 isidoraBold">
                404 not found😥
                <Link to="/" className="py-3 px-6 bg-shinyPurple">
                  Go Back
                </Link>
              </h1>
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
    </Suspense>
  );
}

export default App;
