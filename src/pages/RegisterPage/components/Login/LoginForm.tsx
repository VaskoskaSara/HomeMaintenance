/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form, Input, notification, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { postJsonFetcher } from "src/api/apiCommand";
import useSWRMutation from "swr/mutation";
import "../../style.css";
import { LoginFormObject } from "./LoginForm.props";
import { useState } from "react";
import { useAuth } from "src/pages/common/AuthContext";
import { useNotifications } from "src/pages/common/NotificationContext";

export function LoginForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const { trigger } = useSWRMutation("/api/user/userLogin", postJsonFetcher);
  const [loading, setLoading] = useState(false);
  const { setReviews } = useNotifications();

  const handleFinish = async () => {
    setLoading(true);
    const allValues = form.getFieldsValue(true) as LoginFormObject;

    trigger(allValues)
      .then((res: any) => {
        login(res.id, res.userRole, res.avatar);
        notification.success({
          message: "Login Successful",
          description: "You have successfully login. Welcome!",
          placement: "topLeft",
          duration: 5,
        });

        setTimeout(() => {
          setReviews(res.notifications ? res.notifications : []);
          navigate("/");
          setLoading(false);
        }, 5000);
      })
      .catch(() => {
        notification.error({
          message: "Some error was happened",
          description: "You haven't successfully login. Please try again.",
          placement: "topLeft",
          duration: 5,
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <Title level={2}>Login</Title>
      <div className="my-8 mx-12">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
          <Form form={form} onFinish={handleFinish}>
            <Form.Item
              name="email"
              label="Email address"
              rules={[{ required: true, message: "Email address is required" }]}
              className="login-label"
            >
              <Input placeholder="Email address" className="h-45" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="login-label"
            >
              <Input.Password placeholder="Password" className="h-45" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
