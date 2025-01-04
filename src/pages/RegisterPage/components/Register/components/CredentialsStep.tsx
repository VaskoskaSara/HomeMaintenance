import { Form, FormInstance, Input } from "antd";
import validator from "validator";
import "../../../style.css";

function CredentialsStep({ formData } : {formData : FormInstance<any>}) {
  const onValuesChange = (changedValues: any, allValues: any) => {
    const key = Object.keys(changedValues)[0];
    formData.setFieldValue(key, changedValues[key]);
  };

  const IsValid = (rule: any, value: string) => {
    const { getFieldValue } = formData;
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject("The two passwords that you entered do not match!");
  };

  const IsPasswordStrong = (rule: any, value: string) => {
    if (!value) return Promise.resolve();
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return Promise.resolve();
    } else {
      return Promise.reject(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character!"
      );
    }
  };

  return (
    <Form
      layout="vertical"
      form={formData}
      className="credential-data"
      onValuesChange={onValuesChange}
    >
      <Form.Item
        name="email"
        label="Email address"
        rules={[
          { required: true, message: "Email address is required" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input placeholder="Enter email address" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Please input your password!" },
          { validator: IsPasswordStrong },
        ]}
      >
        <Input.Password placeholder="Enter a password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm password"
        rules={[
          { required: true, message: "Please input your password again!" },
          { validator: IsValid },
        ]}
      >
        <Input.Password placeholder="Confirm your password" />
      </Form.Item>
    </Form>
  );
}

export default CredentialsStep;
