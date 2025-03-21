import { createContext, ReactNode, useContext, useState } from "react";

interface Notification {
    userId: string;
    message: string;
    read: boolean;
}

interface NotificationContextType {
    notifications: Notification[];
    addNotification: (userId: string, message: string) => void;
    markAsRead: (index: number) => void; 
    reviews: any;
    setReviews: React.Dispatch<React.SetStateAction<any[]>>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);

    const addNotification = (userId: string, message: string) => {
        setNotifications(prev => [...prev, { userId, message, read: false }]);
    };

    const markAsRead = (index: number) => {
        setNotifications(prev =>
            prev.map((notification, i) =>
                i === index ? { ...notification, read: true } : notification
            )
        );
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, setReviews, reviews }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};