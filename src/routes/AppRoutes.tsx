import { Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import NeedAuthorizationPage from "src/pages/AuthorisationPage";
import RegisterPage from "src/pages/RegisterPage/RegisterAndLoginPage";
import privateRoutes from "./privateRoutes";
import publicRoutes from "./publicRoutes";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const PrivateRoute: React.FC<{ children: JSX.Element; isAllowed: boolean }> = ({
  children,
  isAllowed,
}) => {
  return isAllowed ? children : <NeedAuthorizationPage />;
};

const AppRoutes: () => JSX.Element = () => {
  const { role, isAuthenticated } = useSelector((state: RootState) => ({
    role: state.auth.role,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  return (
    <Router basename="">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public routes */}
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          {/* Unauthenticated Routes */}
          <Route
            path="/login"
            element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
          />

          {/* Private routes */}
          {privateRoutes.map(({ path, element, allowedRoles }) => (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute
                  isAllowed={isAuthenticated && allowedRoles?.includes(role!)}
                >
                  {element}
                </PrivateRoute>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
