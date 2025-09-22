import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


interface ProtectedRouteProps {
    children: ReactNode;
    roles?: Array<"freelancer" | "user" | "admin">;
    hiddenWhen?: "loggedIn" | "loggedOut";
}

export default function ProtectedRoute({ children, roles, hiddenWhen }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>
    }

    if (hiddenWhen === "loggedIn" && user) {
        return <Navigate to="/dashboard" replace />;
    }

    if (hiddenWhen === "loggedOut" && !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" replace />; //notfound? Unauth? home?
    }

    return <>{children}</>;
}