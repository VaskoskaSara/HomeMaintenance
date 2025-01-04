import { Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppWrapper from "src/components/AppWrapper";
import { LoginForm } from "./components/Login/LoginForm";
import { RegisterForm } from "./components/Register/RegisterForm";

const RegisterPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRegisterPage, setIsRegisterPage] = useState(false);

  useEffect(() => {
    setIsRegisterPage(location.pathname.endsWith("register"));
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsRegisterPage(path.endsWith("register"));
  };

  return (
    <AppWrapper>
      <Content className="min-h-[280px] flex">
        <div
          id="container"
          className={`bg-white text-[#170d0d] flex flex-1 ${
            isRegisterPage ? "right-panel-active" : ""
          }`}
        >
          {/* Register Form */}
          {isRegisterPage ? (
            <div className="transition-all duration-600 ease-in-out flex-1 self-center text-center sign-up-container">
              <div className="bg-white">
                <RegisterForm />
              </div>
            </div>
          ) : (
            /* Login Form */
            <div className="transition-all duration-600 ease-in-out flex-1 self-center text-center sign-in-container">
              <div className="bg-white text-left">
                <LoginForm />
              </div>
            </div>
          )}

          {/* Overlay Section */}
          <div className="overlay-container">
            <div className="overlay">
              {/* Left Panel */}
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p className="mb-2.5">
                  To keep connected with us please login with your personal info
                </p>
                <Button onClick={() => handleNavigate("/login")}>Sign In</Button>
              </div>

              {/* Right Panel */}
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p className="mb-2.5">
                  Enter your personal details and start your journey with us
                </p>
                <Button onClick={() => handleNavigate("/register")}>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </AppWrapper>
  );
};

export default RegisterPage;
