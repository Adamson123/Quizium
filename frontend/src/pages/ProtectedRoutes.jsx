import { Navigate, Outlet } from "react-router";
import { getUser } from "../api/UserApi";

import PageIsLoading from "../components/ui/PageIsLoading";
import { useQuery } from "react-query";

const ProtectedRoutes = () => {
    const { data, refetch, isLoading } = useQuery(["user"], getUser, {
        retry: false,
    });

    if (isLoading) {
        return <PageIsLoading />;
    }

    if (!data) return <Navigate to="login" />;

    return <Outlet />;
};

export default ProtectedRoutes;
