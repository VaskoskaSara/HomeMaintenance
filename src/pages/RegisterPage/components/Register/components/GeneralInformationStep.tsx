import { Form, Input, Row, Col, DatePicker, FormInstance } from "antd";
import dayjs from "dayjs";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { parsePhoneNumberFromString, isValidNumber } from 'libphonenumber-js';
import "../../../style.css";

function GeneralInformationStep({ formData } : {formData : FormInstance<any>}) {
  const onValuesChange = (changedValues: any, allValues: any) => {
    const key = Object.keys(changedValues)[0];
    formData.setFieldValue(key, changedValues[key]);
  };

  return (
    <Form layout="vertical" form={formData} onValuesChange={onValuesChange}>
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: "Full Name is required" }]}
      >
        <Input placeholder="Enter full name" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: "City is required" }]}
          >
            <Input placeholder="Enter city" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="birthDate"
            label="Birth Date"
            rules={[
              { required: true, message: "Birth date is required" },
              {
                validator: (_, value) =>
                  !value || dayjs(value).isBefore(dayjs(), "day")
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Birth date cannot be in the future!")
                      ),
              },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" placeholder="Select birth date" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(
                      new Error("Phone number is required")
                    );
                  }
                  const phoneNumber = parsePhoneNumberFromString(value);

                  if (
                    !phoneNumber ||
                    !isValidNumber(phoneNumber.number, phoneNumber.country)
                  ) {
                    return Promise.reject(new Error("Invalid phone number!"));
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <PhoneInput
              international
              defaultCountry="MK"
              value={formData.getFieldValue("phoneNumber")}
              onChange={(value) => formData.setFieldsValue({ phoneNumber: value })}
              isValidPhoneNumber={true}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default GeneralInformationStep;
