import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    role?: number;
    login: (id: string, role: number, avatar: string) => void;
    logout: () => void;
    id?: string;
    avatar?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<number | undefined>();
    const [id, setId] = useState<string | undefined>();
    const [avatar, setAvatar] = useState<string | undefined>();

    const login = (id: string, role: number, avatar: string) => {
        setIsAuthenticated(true);
        setRole(role);
        setId(id);
        setAvatar(avatar);

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('role', role.toString()); // Store role
        localStorage.setItem('id', id); // Store ID
        localStorage.setItem('avatar', avatar); // Store ID
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole(undefined);
        setId(undefined);
        setAvatar(undefined);
        
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('role'); // Clear role
        localStorage.removeItem('id'); // Clear ID
        localStorage.removeItem('avatar'); 
    };

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        const storedRole = localStorage.getItem('role');
        const storedId = localStorage.getItem('id');
        const storedAvatar = localStorage.getItem('avatar');

        setIsAuthenticated(authStatus === 'true');
        setRole(storedRole ? parseInt(storedRole) : undefined);
        setId(storedId || undefined);
        setAvatar(storedAvatar || undefined);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role, id, avatar }}>
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