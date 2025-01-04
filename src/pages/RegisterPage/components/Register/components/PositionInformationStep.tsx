import { Col, Form, FormInstance, Input, InputNumber, Radio, Row, Select } from "antd";
import { useState } from "react";
import "react-phone-number-input/style.css";
import { getFetcher } from "src/api/apiQuery";
import { ApiResponse, Position } from "src/pages/RegisterPage/RegisterPage.props";
import useSWR from "swr";
import "../../../style.css";
import { PaymentType } from "../RegisterForm.props";

function PositionInformationStep({ formData } : {formData : FormInstance<any>}) {
  const { Option } = Select;

  const { data: positions, isLoading } = useSWR<ApiResponse<Position[]>>(
    "/api/position",
    getFetcher
  );

  const onValuesChange = (changedValues: any, allValues: any) => {
    const key = Object.keys(changedValues)[0];
    formData.setFieldValue(key, changedValues[key]);
  };

  const [selectedPosition, setSelectedPosition] = useState<string | undefined>();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<number | undefined>();

  const handleSelectPosition = (value: string) => {
    setSelectedPosition(value);
  };
  
  const handleSelectPaymentTypeChange = (value: number) => {
    setSelectedPaymentOption(value);
  };

  return (
    <Form
      layout="vertical"
      form={formData}
      className="position-data"
      onValuesChange={onValuesChange}
    >
      <Form.Item
        name="userType"
        label="Register yourself like"
        rules={[{ required: true, message: "User role is required" }]}
      >
        <Radio.Group className="w-full text-center">
          <Radio.Button
            value="1"
            className="w-[33.33%]"
            checked={formData.getFieldValue("userType") === "1" ? true : false}
          >
            Customer
          </Radio.Button>
          <Radio.Button
            value="2"
            className="w-[33.33%]"
            checked={formData.getFieldValue("userType") === "2" ? true : false}
          >
            Individual employee
          </Radio.Button>
          <Radio.Button
            value="3"
            className="w-[33.33%]"
            checked={formData.getFieldValue("userType") === "3" ? true : false}
          >
            Business/Group
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.userType !== currentValues.userType
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("userType") !== "1" &&
          getFieldValue("userType") !== undefined ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="positionId"
                    label="Position"
                    rules={[
                      {
                        required: true,
                        validator: (_, value) => {
                          if (value !== null && value === undefined) {
                            return Promise.reject(
                              new Error("Position is required")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select a position"
                      onChange={handleSelectPosition}
                    >
                      <Option value={null}>Other</Option>
                      {!isLoading &&
                        positions?.data.map((option) => (
                          <Option key={option.id} value={option.id}>
                            {option.positionName}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="newPosition"
                    label="Write down another position"
                    rules={[
                      {
                        required: selectedPosition === null,
                        message: "Write down your position",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Write down another position"
                      disabled={selectedPosition !== null}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="paymentType"
                    label="Payment type"
                    rules={[
                      {
                        required: true,
                        message: "Payment type is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select payment type"
                      onChange={handleSelectPaymentTypeChange}
                    >
                      <Option value={PaymentType.Hourly}>Hourly</Option>
                      <Option value={PaymentType.Overall}>Daily</Option>
                      <Option value={PaymentType.Contract}>Contract</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Price($)"
                    name="price"
                    rules={[
                      {
                        required: selectedPaymentOption !== 3,
                        message: "Price is required",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Enter a number"
                      disabled={selectedPaymentOption === 3}
                      min={1}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="experience"
                    label="Experience (in months)"
                    rules={[{ required: true, message: "Experience required" }]}
                  >
                    <InputNumber
                      changeOnWheel
                      placeholder="Enter experience in months"
                    />
                  </Form.Item>
                </Col>
                <>
                  {formData.getFieldValue("userType") === "3" ? (
                    <Col span={12}>
                      <Form.Item
                        name="numberOfEmployees"
                        label="Number of employees"
                        rules={[
                          {
                            required: true,
                            message: "Number of employees required",
                          },
                        ]}
                      >
                        <InputNumber
                          changeOnWheel
                          placeholder="Enter number of employees"
                        />
                      </Form.Item>
                    </Col>
                  ) : (
                    <></>
                  )}
                </>
              </Row>
            </>
          ) : null
        }
      </Form.Item>
    </Form>
  );
}

export default PositionInformationStep;