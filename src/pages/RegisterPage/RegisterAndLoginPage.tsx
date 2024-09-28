import { Button } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppWrapper from "../common/AppWrapper/AppWrapper";
import { LoginForm } from "./components/Login/LoginForm";
import { RegisterForm } from "./components/Register/RegisterForm";


function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
    const [isRegisterPage, setIsRegisterPage] = useState(false);

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    let container = document.getElementById("container");
    setIsRegisterPage(location.pathname.endsWith("register"));


    if (location.pathname.endsWith("register")) {
      container!.classList.add("right-panel-active");
    }

    signUpButton!.addEventListener("click", () => {
      container!.classList.add("right-panel-active");
      navigate('/register');
    });
    signInButton!.addEventListener("click", () => {
      container!.classList.remove("right-panel-active");
      navigate('/login');
    });

    document.addEventListener("DOMContentLoaded", function () {
      const sections = document.querySelectorAll(".section");

      sections.forEach(function (section) {
        const arrow = section.querySelector(".arrow");
        const content = section.querySelector(".content");

        arrow?.addEventListener("click", function () {
          content?.classList.toggle("collapsed");
          arrow.classList.toggle("down");
        });
      });
    });

    return () => {
      if (signUpButton) {
        signUpButton.removeEventListener("click", () => {});
      }
    };
  }, [location.pathname]);

  return (
    <>
      <AppWrapper>
        <Content className="min-h-[280px] flex">
          <div
           id="container"
           className="bg-white text-[#170d0d] flex flex-1"
          >
            { isRegisterPage ? (
            <div className="transition-all duration-600 ease-in-out flex-1 self-center text-center sign-up-container">
              <div className="bg-white">
                <RegisterForm />
              </div>
            </div> ) :  (
            <div className="transition-all duration-600 ease-in-out flex-1 self-center text-center sign-in-container">
              <div
                className="bg-white text-left"
              >
                <LoginForm />
              </div>
            </div> )}
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p className="mb-2.5">
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <Button id="signIn">Sign In</Button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p className="mb-2.5">Enter your personal details and start journey with us</p>
                  <Button id="signUp">Sign Up</Button>
                </div>
              </div>
            </div>
          </div> 
        </Content>
        </AppWrapper>
      <script src="script.js"></script>
    </>
  );
}

export default RegisterPage;
