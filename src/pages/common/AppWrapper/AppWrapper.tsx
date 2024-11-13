import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Popover } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
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
    if(unreadCount.length > 0 ){
      markAsRead(notifications.findIndex(x => x.userId === currentUserId));
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
                  label: <Button onClick={() => {
                    logout();
                    navigate("/login");
                  }}>Log out</Button>,
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
              "https://homemaintenanceapp.s3.amazonaws.com/logo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA2UC26MP7SOPGX4IG%2F20241019%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241019T164241Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDBNGj3tZ6vPQVVNJrw3h5tiyflhuE5DsuuKCQl7quTswIgbwAA5J1vb3HPK7SUDc4ilJEuQwb7uKD843sChuLXPRIq6AIIYhAAGgw3MzAzMzUxNzU2NzkiDPu2qL5nW6dIlvbAoyrFAmJd8LvE9ZAXo8GCVVO7K6VUR2zY4TdrB%2Bl28ANRhKAysWp2o2ypLWh5%2Fw2wdIeYlMcZ4%2BOlJzjEYmmrIJUXoGXGN1zu5vm8xVx6XtAFA7Eq%2BNy%2BH6GbNrtpRfs0wvVjgo1iqlgwd6JYfw8jMRwMGX4Mc8c4smAZJnaBUqwqhCfVxtqK%2FLTVOhCD4Zp1X%2FfKNrX%2BvVdIrsjoq%2Fc1I5eVzBmuzrgCLaYN%2BjWWMOdHPBZEcRJ3E5xyQHsCPUfmVp6ARusoal4bu25Mv56lh7g1IfdkfvLVMifIhKlK8Bha8OeD%2BD0DL5E8JAiJ1jPPfAj8yCjXGdi5E0L5UUaoZ57GVKF7cvqKlE03ZN3DI7qmOGjcWNMw9kJXxE9PyP1oD%2BBhR5h3rvfWf7sn%2BZjvmTYJtK25U2T%2Bu0XqJtNGpJxkIJlQSAcKkXQwpsLPuAY6swLsdVUP8rNvCAnVPLBLWKzYpHAMNs9eKkxNPpRKLSjqcr9ToTsz5f5bQoHaEocb22wIah1RY0ozIRhRhzsubCc%2FBASc2RyTQNpn7B5krz7SyMRbhZBLMn5hEKFdUrKOWc%2BZJCA%2FUTfCu%2FFLVfJXU4lAY157Dbn2pKHejxc4yZl6J4vWQyp4DGnb0MU4OokCW9yjjpBMSSorTUpdbmKQf8DkV12r0sWr4sF8HpdmcsUnyLy%2Bn24Y1YVgim4%2FHNvPJFBgb5JfYTACVeCGi5mnNsRHV9EBA2NACsP65HTfKztzVneCQkTwwYpuq3HiBRf1f48v%2FrHiPp6J8xsFnPx%2B%2BgKIYpu%2FGHxWerKJIPEsxWsjeg9r3KVNhJLcijFmymfuu%2FY8K%2BRhaTStXmJca4PzGX8J8fn9&X-Amz-Signature=cb9462fb01e80c27bcacd3f9a422d09a1dff50f0eb70ab3b72925a2e33ee305c&X-Amz-SignedHeaders=host&response-content-disposition=inline"
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
                    <p>📧 Email: <a href="mailto:support@homemaintenance.com" className="text-blue-600">support@homemaintenance.com</a></p>
                    <p>🌐 Website: <a href="https://www.homemaintenance.com" className="text-blue-600">www.homemaintenance.com</a></p>
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
                        <li><a href="#" className="text-blue-600">About Us</a></li>
                        <li><a href="#" className="text-blue-600">FAQs</a></li>
                        <li><a href="#" className="text-blue-600">Terms of Service</a></li>
                        <li><a href="#" className="text-blue-600">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Stay Informed</h3>
                <form action="#" method="POST" className="flex">
                    <input type="email" placeholder="Your Email" required className="text-black border rounded-l py-2 px-4 w-full" />
                    <button type="submit" className="bg-blue-500 text-white rounded-r py-2 px-4 hover:bg-blue-700">Subscribe</button>
                </form>
            </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default AppWrapper;
