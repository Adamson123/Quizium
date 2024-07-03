import { Navigate, Outlet } from "react-router";
import { getUserFunc } from "../api/UserApi";

import PageIsLoading from "../components/ui/PageIsLoading";

const ProtectedRoutes = () => {
  const { data, isLoading } = getUserFunc();

  if (isLoading) {
    return <PageIsLoading />;
  }

  if (!data) return <Navigate to="login" />;

  return <Outlet />;
};

export default ProtectedRoutes;
