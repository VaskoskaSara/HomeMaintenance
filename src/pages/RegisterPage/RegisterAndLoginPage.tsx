import { Button, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Title from 'antd/es/typography/Title';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { menuItems } from "../HomePage/HomePage";
import { LoginForm } from "./components/Login/LoginForm";
import { RegisterForm } from "./components/Register/RegisterForm";
import "./style.css";

function RegisterPage(){
  const location = useLocation();

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    let container = document.getElementById("container");

    if(location.pathname.endsWith("register")){
      container!.classList.add("right-panel-active");
    }

    signUpButton!.addEventListener("click", () => {
      container!.classList.add("right-panel-active");
    });
    signInButton!.addEventListener("click", () => {
      container!.classList.remove("right-panel-active");
    });

    document.addEventListener("DOMContentLoaded", function() {
      const sections = document.querySelectorAll('.section');
    
      sections.forEach(function(section) {
        const arrow = section.querySelector('.arrow');
        const content = section.querySelector('.content');
    
        arrow?.addEventListener('click', function() {
          content?.classList.toggle('collapsed');
          arrow.classList.toggle('down');
        });
      });
    });

    return () => {
      if (signUpButton) {
        signUpButton.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <>
    <Layout className='stil'>
        <Header style={{backgroundColor: "black"}}>
        <h1 style={{ flex: 1, minWidth: 0, float: "left", color: "white", fontFamily: "" }}>HOME MAINTENANCE</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={menuItems}
          style={{ backgroundColor: "black", float:"right" }} />
      </Header>
      <Content>
      <div
        className="container"
        id="container"
        style={{ color: "#170d0d"}}
      >
        <div className="form-container sign-up-container">
          <div className="container" style={{ textAlign: "left" }}>
            <RegisterForm />
          </div>
        </div>
        {/* LOGIN */}
        <div className="form-container sign-in-container">
          <div
            className="container"
            style={{ textAlign: "left", paddingTop: "100px" }}
          >
            <LoginForm />
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p style={{ marginBottom: "10px" }}>
                To keep connected with us please login with your personal info
              </p>
              <Button id="signIn">Sign In</Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Button id="signUp">Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
      </Content>
      <Footer style={{backgroundColor:"black", color: "white", display: "flex", justifyContent:"center", flexDirection:"column", alignItems: "center", gap: "20px"}}>
        <Title style={{color:"white"}}>Stay updated.</Title>
        <p>Get notified of new services from your inbox.</p>
      </Footer>
      </Layout>
      <script src="script.js"></script>
    </>
  );
};

export default RegisterPage;
