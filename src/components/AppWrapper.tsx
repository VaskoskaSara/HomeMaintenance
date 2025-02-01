import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Popover } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useAuth } from "../../src/contexts/AuthContext";
import { useNotifications } from "../../src/contexts/NotificationContext";

const AppWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isAuthenticated, logout, role, avatar } = useAuth();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const navigate = useNavigate();

  const { notifications, markAsRead } = useNotifications();
  const { id: currentUserId } = useAuth();

  var unreadCount = notifications.filter(
    (notification) =>
      notification.userId === currentUserId && !notification.read
  );

  const handleBellClick = () => {
    if (unreadCount.length > 0) {
      markAsRead(notifications.findIndex((x) => x.userId === currentUserId));
      unreadCount = [];
    }
    setVisible(!visible);
  };

  const [visible, setVisible] = useState(unreadCount.length > 0);

  const content = (
    <div style={{ padding: "10px" }}>
      {unreadCount.length > 0 ? (
        <p>Hey, you have another booking! Check your bookings.</p>
      ) : (
        <p>Hey, there aren't any new bookings!</p>
      )}
    </div>
  );

  useEffect(() => {
    const items = [
      {
        key: "home",
        label: <Button onClick={() => navigate("/")}>Home </Button>,
      },
      {
        key: "services",
        label: <Button onClick={() => navigate("/services")}>Services </Button>,
      },
    ];

    if (isAuthenticated) {
      items.push(
        {
          key: "manageBookings",
          label:
            (role === 3 || role === 2) ? (
              <Button onClick={() => navigate("/manage-bookings")}>
                Manage bookings
              </Button>
            ) : <></>,
        },
        {
          key: "viewBookings",
          label: (role === 1 || role === 2) ? 
          (
            <Button onClick={() => navigate("/view-bookings")}>
              View bookings
            </Button>
          ) : <></>,
        },
        {
          key: "notifications",
          label: (
            <>
              <Popover content={content} trigger="click" placement="bottom">
                <Badge
                  count={visible ? unreadCount.length : 0}
                  overflowCount={99}
                  style={{ backgroundColor: "red" }}
                >
                  <BellOutlined
                    style={{ fontSize: "24px", color: "white" }}
                    onClick={() => handleBellClick()}
                  />
                </Badge>
              </Popover>
            </>
          ),
        }
      );

      items.push({
        key: "avatar",
        label: (
          <Dropdown
            menu={{
              items: [
                {
                  key: "logout",
                  label: (
                    <Button
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                    >
                      Log out
                    </Button>
                  ),
                },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Avatar style={{ cursor: "pointer" }} src={avatar} size={50} />
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
      <Header id="headerId" className="bg-black flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            style={{ width: "40px", height: "40px", marginRight: "8px" }}
          />
          <h1 style={{ fontSize: "2rem", margin: 0, color: "white" }}>
            HOME MAINTENANCE
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          className="bg-black flex items-center w-auto justify-end h-full menu-items min-w-[600px]"
        />
      </Header>
      {children}
      <Footer className="bg-black text-white flex flex-col justify-center items-center gap-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <p>📞 Phone: (123) 456-7890</p>
              <p>
                📧 Email:{" "}
                <a
                  href="mailto:support@homemaintenance.com"
                  className="text-blue-600"
                >
                  support@homemaintenance.com
                </a>
              </p>
              <p>
                🌐 Website:{" "}
                <a
                  href="https://www.homemaintenance.com"
                  className="text-blue-600"
                >
                  www.homemaintenance.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Services Offered</h3>
              <ul>
                <li>Plumbing</li>
                <li>Electrical Work</li>
                <li>HVAC Maintenance</li>
                <li>Cleaning Services</li>
                <li>Handyman Services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Helpful Links</h3>
              <ul>
                <li>
                  <a href="/" className="text-blue-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/" className="text-blue-600">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/" className="text-blue-600">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/" className="text-blue-600">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">Stay Informed</h3>
            <form action="#" method="POST" className="flex">
              <input
                type="email"
                placeholder="Your Email"
                required
                className="text-black border rounded-l py-2 px-4 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r py-2 px-4 hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default AppWrapper;
