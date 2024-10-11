import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    role: string | undefined;
    login: (id: string, role: string) => void;
    logout: () => void;
    id: string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<string | undefined>();
    const [id, setId] = useState<string | undefined>();

    const login = (id: string, role: string) => {
        setIsAuthenticated(true);
        setRole(role);
        setId(id);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole(undefined);
        setId(undefined);
        localStorage.removeItem('isAuthenticated');
    };

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuthenticated(authStatus === 'true');
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role, id }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};