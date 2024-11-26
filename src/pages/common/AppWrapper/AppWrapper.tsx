import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Popover } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNotifications } from "../NotificationContext";
import "./index.css";

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
            role !== 1 ? (
              <Button onClick={() => navigate("/manage-bookings")}>
                Manage bookings
              </Button>
            ) : (
              <Button onClick={() => navigate("/view-bookings")}>
                View bookings
              </Button>
            ),
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
      <Header className="bg-black flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={
              "https://homemaintenanceapp.s3.us-east-1.amazonaws.com/logo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA2UC26MP7VFUFHETX%2F20241113%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241113T234325Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLWVhc3QtMSJGMEQCIHDfW6lLU9X%2FM1ptY4MpT6HN3WtW8SD5p8vc4bYqYWixAiBCTKZuaFq6z6dwfn7YPNBnKs9AzgwYfAmIqdZJNkdp8SrxAgjh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDczMDMzNTE3NTY3OSIMr42JHx9%2Be0PFUfWsKsUCK1yP88N7lirloB0ToZEXa3hTysfvKbp5g4Qc3WER4pGeQQUsvPUDjVwndDdboaT2L5cyMIdIhfB5ZZQvkuJTWjDIdUZiARn2rf08Y%2Bsot5vkWaOSOHnwinziuzkj74k1ymM5tZR5fyff%2FBHlOwz%2BtMS8YvCleRkN1aZMQ5eVKeeZZ73i82SQNErMYDQbaVflhcuXcXOoJWq20P4wFiDW0mCExENQ%2Fu8Wd0x%2F7BoC5pAvqJFgupXhqZO9KGbbZuTfEnz9G%2BrCwRUgu6%2F7kbNMqA%2BtHOxHH11EKSl9QCC8YI6nWwnrMaDAEM%2F1qVBUmsYq7dhP8MAzNGeGGHaNf9oeBc21B%2Fl3naY%2FWfZ8oGhULxlkujsbXl2OoGj%2FmlHZPvIiJL7N6wyd6FLejs3vK3LseC%2Bs9RRdtfAFwYEP97z9agfSVx3NZjDf6dS5Bjq0As%2F4oE%2BDqzmkxXF7wlphX0cq0%2B5qcSRUmrPvAYI9EdMowAPO%2BTOKrRi%2FpkAWdqoNTacKI30FPaQnQzarOFati4LU7%2FhOohuBMJaTmGRldMmVHHc%2Fxs0NukS75%2B7xwYadZSSOd7TpDVelQgIxsIkg1b%2FTzOO93yOnulljnpOcgzIc0Dr8gSaTxjVHZKTtuPELoY%2FQXXnBDRZR1Oi5sJqpoGY5SWOzWDYsFAqQf89%2FIoZKtHBexXtGjMnCX1VNU0Md4R2YJpSIwtamksbuu1%2BwixT2cpmabgFryRY7hTBcufBSvrDwc2Q6RrBffCGiYKars31xufIWMz%2BbGYBNY75sudvmU434SpnHEbXMYIVAPHb%2FxzEksGoWLLHceDth8tPhJgp8JU7b%2BGdc9I1ir%2FZVYNozTBJY&X-Amz-Signature=9a62c77770121deea27a995bcbb4d38a408db25648f19f7e13e47a815bb8f577&X-Amz-SignedHeaders=host&response-content-disposition=inline"
            }
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
