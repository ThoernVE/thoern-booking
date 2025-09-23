import { useContext, createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type User from "../interfaces/User";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    };
    return context;
}