import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import "../../style.css";

export function LoginForm(){

    return(  <div>
        <Title level={2}>Login</Title>
        <div className="login-container">
        <Form>
          <Form.Item>
            <Input placeholder="Email address" />
          </Form.Item>
          <Form.Item>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
        </div>
      </div>)
}