import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";

export function LoginForm(){

    return(  <div style={{width: "30%"}}>
        <Title level={2}>Login</Title>
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
      </div>)
}