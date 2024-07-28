import { Button, DatePicker, Form, Input, Steps } from "antd";
import Title from "antd/es/typography/Title";
import "./style.css";
import { useState } from "react";

export function RegisterForm(){
    const steps = [
        {
          title: 'General Information',
          description: "General Information",
          content: (
            <Form 
            layout="vertical">
              <Form.Item name="firstName" label="Full name" rules={[{ required: true, message: 'Please input your full name!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="adress" label="City" rules={[{ required: true, message: 'Please input your city!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="phoneNumber" label="Phone number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="birthDate" label="Birth date" rules={[{ required: true, message: 'Please input your birth date!' }]}>
                <DatePicker />
              </Form.Item>
            </Form>
          ),
        },
        {
          title: 'Credentials',
          content: (
            <Form layout="vertical">
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item name="confirmPassword" label="ConfirmPassword" rules={[{ required: true, message: 'Please input your password again!' }]}>
                <Input.Password />
              </Form.Item>
            </Form>
          ),
        },
        {
          title: 'Position informations',
          content: (
            <Form  layout="vertical">
              <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please input your city!' }]}>
                <Input />
              </Form.Item>
            </Form>
          ),
        },
        {
          title: 'Photos',
          content: (
            <div>
              <Title level={4}>Review your details:</Title>
              {/* <p>First Name: {form.getFieldValue('firstName')}</p>
              <p>Last Name: {form.getFieldValue('lastName')}</p>
              <p>Email: {form.getFieldValue('email')}</p>
              <p>Address: {form.getFieldValue('address')}</p>
              <p>City: {form.getFieldValue('city')}</p> */}
            </div>
          ),
        },
      ];
      const [current, setCurrent] = useState(0);
    
      const next = () => {
          setCurrent(current + 1);
      };
    
      const prev = () => {
        setCurrent(current - 1);
      };
    return(
        <div style={{width: "40%"}}>
        <Title level={2}>Register form</Title>
        <Steps current={current} size="small" style={{ marginBottom: '24px' }}>
    {steps.map(item => (
      <Steps responsive key={item.title} />
    ))}
  </Steps>
  <div className="steps-content">{steps[current].content}</div>
  <div className="steps-action">
    {current > 0 && (
      <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
        Previous
      </Button>
    )}
    {current < steps.length - 1 && (
      <Button type="primary" onClick={() => next()}>
        Next
      </Button>
    )}
    {current === steps.length - 1 && (
      <Button type="primary" onClick={() => console.log('Submitting...')}>
        Submit
      </Button>
    )}
  </div>
      </div>
    )
}
