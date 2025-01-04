import { AuthProvider } from "src/contexts/AuthContext";
import { NotificationProvider } from "src/contexts/NotificationContext";
import AppRoutes from "src/routes/AppRoutes";

const AppWrapper: () => JSX.Element = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default AppWrapper;
