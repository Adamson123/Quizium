import { Navigate, Outlet } from "react-router";
import { getUser } from "../api/UserApi";

import PageIsLoading from "../components/ui/PageIsLoading";
import { useQuery } from "react-query";

const ProtectedRoutes = () => {
    const { data, isLoading } = useQuery(["user"], getUser);

    if (isLoading) {
        return <PageIsLoading />;
    }

    if (!data) return <Navigate to="login" />;

    return <Outlet />;
};

export default ProtectedRoutes;
