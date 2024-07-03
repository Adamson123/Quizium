import { Navigate, Route, Routes } from "react-router";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Layout from "./layouts/layout";
import Admin from "./pages/Admin";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        {/* Admin route */}
        <Route
          path="/"
          element={
            <Layout>
              <Admin />
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
      </Route>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
