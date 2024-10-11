import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const AppWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isAuthenticated, logout } = useAuth();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = [
      {
        key: "home",
        label: (
          <span className="p-2 bg-[darkgoldenrod] rounded-[5px]">
            <a href="/" rel="noopener noreferrer">
              Home
            </a>
          </span>
        ),
      },
      {
        key: "services",
        label: (
          <span className="p-2 bg-[darkgoldenrod] rounded-[5px]">
            <a href="/services" rel="noopener noreferrer">
              Services
            </a>
          </span>
        ),
      },
      {
        key: "contact",
        label: (
          <span className="p-2 bg-[darkgoldenrod] rounded-[5px]">
            <a href="/contact" rel="noopener noreferrer">
              Contact
            </a>
          </span>
        ),
      },
    ];

    // Add the avatar dropdown if authenticated
    if (isAuthenticated) {
      items.push({
        key: "avatar",
        label: (
          <Dropdown
            menu={{
              items: [
                {
                  key: "logout",
                  label: <Button onClick={() => logout()}>Log out</Button>,
                },
                {
                  key: "manageBookings",
                  label: (
                    <Button onClick={() => navigate("/manage-bookings")}>
                      Manage bookings
                    </Button>
                  ),
                },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Avatar style={{ cursor: "pointer" }}>U</Avatar>
          </Dropdown>
        ),
      });
    } else {
      items.push(
        {
          key: "signin",
          label: (
            <Button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white"
            >
              Sign In
            </Button>
          ),
        },
        {
          key: "signup",
          label: (
            <Button
              onClick={() => navigate("/register")}
              className="bg-blue-500 text-white"
            >
              Sign Up
            </Button>
          ),
        }
      );
    }

    setMenuItems(items);
  }, [isAuthenticated, logout]);

  return (
    <Layout className={`min-h-screen ${className}`}>
      <Header className="bg-black flex justify-between items-center p-4">
        <h1 className="min-w-0 float-left text-white flex-1">
          HOME MAINTENANCE
        </h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          className="bg-black float-right custom-menu"
        />
      </Header>
      {children}
      <Footer className="h-[300px] bg-black text-white flex flex-col justify-center items-center gap-5">
        <Title className="text-white">Stay updated.</Title>
        <p>Get notified of new services from your inbox.</p>
        <div className="flex gap-[30px] items-center ml-[10%]">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-[700px] text-gray-500 pl-2.5 rounded"
          />
          <Button size="large">Subscribe</Button>
        </div>
      </Footer>
    </Layout>
  );
};

export default AppWrapper;
