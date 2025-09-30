import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type User from "../interfaces/User";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {
        refreshUser().finally(() => setLoading(false));
    }, []);

    const login = async (email: string, password: string) => {
        const response = await fetch("api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Login failed")
        }

        const data: User = await response.json();
        setUser(data);
    };

    const logout = async () => {
        await fetch("/api/login", {
            method: "DELETE",
            credentials: "include",
        });
        setUser(null);
        navigator("/");
    };

    const refreshUser = async () => {
        try {
            const response = await fetch("/api/login", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data: User = await response.json();
            setUser(data);
        }
        catch {
            setUser(null);
        }
    };

    const value: AuthContextType = { user, loading, login, logout, refreshUser }

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}

export default AuthProvider;