import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Radio,
  Row,
  Select,
  Spin,
  Steps,
  Upload,
  UploadFile,
} from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getFetcher } from "src/api/apiQuery";
import useSWR from "swr";
import validator from "validator";
import { ApiResponse, Position } from "../../RegisterPage.props";
import "../../style.css";
import { UploadOutlined } from "@ant-design/icons";
import { postFormFetcher } from "src/api/apiCommand";
import useSWRMutation from "swr/mutation";
import { CustomError, PaymentType, RegisterFormObject } from "./RegisterForm.props";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { parsePhoneNumberFromString, isValidNumber } from 'libphonenumber-js';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "src/pages/common/AuthContext";

const { Step } = Steps;

export function RegisterForm() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const { Option } = Select;

  const navigate = useNavigate();

  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const { state } = location;
    if (state && state.type) {
      form.setFieldsValue({ userType: state.type.toString() });
    }
    else {
      form.setFieldsValue({ userType: undefined });
    }
  }, [location, form]);

  const { data: positions, isLoading } = useSWR<ApiResponse<Position[]>>(
    "/api/user/positions",
    getFetcher
  );
  const [profileImage, setProfileImage] =  useState<File | null>(null);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 0) {
      const newFile = fileList[0].originFileObj as File;
      setProfileImage(newFile);
    } else {
      setProfileImage(null);
    }
  };

  const [photos, setPhotos] =  useState<UploadFile[]>([]);

  const handlePhotosChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setPhotos(fileList);
  };
  
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<number | undefined>();
  const [selectedPosition, setSelectedPosition] = useState<
    string | undefined
  >();

  const handleSelectPaymentTypeChange = (value: number) => {
    setSelectedPaymentOption(value);
  };

  const handleSelectPosition = (value: string) => {
    setSelectedPosition(value);
  };

  const IsValid = (rule: any, value: string) => {
    const { getFieldValue } = form;
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

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        handleFinish();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    setLoading(true);
    const formDataToSend = new FormData();

    const allValues = form.getFieldsValue(true) as RegisterFormObject;

    const filteredModel = Object.entries(allValues)
      .filter(([key]) => key !== "photos" && key !== "avatar")
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as { [key: string]: any });

    for (const key in filteredModel) {
      if (Object.prototype.hasOwnProperty.call(filteredModel, key)) {
        formDataToSend.append(key, filteredModel[key]);
      }
    }

     if (profileImage) {
      formDataToSend.append('avatar', profileImage);
    }

    photos.forEach(file => {
      if (file.originFileObj) {
        formDataToSend.append('photos', file.originFileObj);
      }
    });

      trigger(formDataToSend).then((res: any) => {
        login(res.id, res.userRole, res.avatar);
        notification.success({
          message: 'Registration Successful',
          description: 'You have successfully registered. Welcome!',
          placement: 'topRight',
          duration: 5
        });
  
        setTimeout(() => {
          navigate('/');
          setLoading(false);
        }, 5000);
      }).catch((ex : CustomError) => {
        notification.error({
          message: 'Some error was happened',
          description: 'You haven\'t successfully registered. Please try again.',
          placement: 'topRight',
          duration: 5
        });
        setLoading(false);
      });
  };

  const steps = [
    {
      title: "General Information",
      description: "General Information",
      content: (
        <Form layout="vertical" form={form} key="general" className="general-data">
              <Form.Item
                name="fullName"
                label="Full name"
                rules={[{ required: true, message: "Full name is required" }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "City is required" }]}
              >
                <Input placeholder="Enter your city" />
              </Form.Item>
            <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone number"
                rules={[
                  {
                    validator: (_, value) => {
                      if(!value){
                        return Promise.reject(new Error("Phone number is required"));
                      }
                      const phoneNumber = parsePhoneNumberFromString(value);

                      if (!phoneNumber || !isValidNumber(phoneNumber.number, phoneNumber.country)) {
                        return Promise.reject(new Error('Invalid phone number!'));
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                 <PhoneInput
                 className="phoneInput"
                 international
                 defaultCountry="MK"
                 value={form.getFieldValue('phoneNumber')}
                 onChange={(value) => form.setFieldsValue({ phoneNumber: value })}
                 isValidPhoneNumber={true}
        />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="birthDate"
                label="Birth date"
                rules={[
                  { required: true, message: "Birth date is required" },
                  {
                    validator: (_, value) => {
                      if (!value || dayjs(value).isBefore(dayjs(), "day")) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Birth date cannot be in the future!")
                      );
                    },
                  },
                ]}
              >
                <DatePicker  
                format="DD-MM-YYYY"
                placeholder="Select or enter date (DD-MM-YYYY)" />
              </Form.Item>
            </Col>
            </Row>
        </Form>
      ),
    },
    {
      title: "Credentials",
      content: (
        <Form layout="vertical" form={form} className="credential-data">
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
      ),
    },
    {
      title: "Position information",
      content: (
        <Form layout="vertical" form={form} className="position-data">
          <Form.Item
            name="userType"
            label="Register yourself like"
            rules={[{ required: true, message: "User role is required" }]}
          >
            <Radio.Group className="w-full text-center">
              <Radio.Button value="1" className="w-[33.33%]" checked={form.getFieldValue("userType") === "1" ? true : false}>
                Customer
              </Radio.Button>
              <Radio.Button value="2" className="w-[33.33%]" checked={form.getFieldValue("userType") === "2" ? true : false}>
                Individual employee
              </Radio.Button>
              <Radio.Button value="3" className="w-[33.33%]" checked={form.getFieldValue("userType") === "3" ? true : false}>
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
              getFieldValue("userType") !== "1" &&  getFieldValue("userType") !== undefined ? (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="positionId"
                        label="Position"
                        rules={[
                          {required: true,
                            validator: (_, value) => {
                              if (value !== null && value === undefined) {
                                return Promise.reject(new Error('Position is required'));
                              }
                              return Promise.resolve();
                            },
                          }
                        ]}
                      >
                        <Select
                          placeholder="Select a position"
                          onChange={handleSelectPosition}
                        >
                          <Option value={null}>Other</Option>
                          {!isLoading &&
                            positions?.data.map((option) => (
                              <Option
                                key={option.id}
                                value={option.id}
                              >
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
                          <Option value={PaymentType.Contract}>
                            Contract
                          </Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        label="Price"
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
                    rules={[
                      { required: true, message: "Experience required" },
                    ]}
                  >
                    <InputNumber
                      changeOnWheel
                      placeholder="Enter experience in months"
                    />
                  </Form.Item>
                  </Col>
                  <>
                  {form.getFieldValue("userType") === "3" ? (
                  <Col span={12}>
                  <Form.Item
                    name="numberOfEmployees"
                    label="Number of employees"
                    rules={[
                      { required: true, message: "Number of employees required" },
                    ]}
                  >
                    <InputNumber
                      changeOnWheel
                      placeholder="Enter number of employees"
                    />
                  </Form.Item>
                  </Col>
              ) : (<></>)}
                  </>
                  </Row>
                </>
              ) : null
            }
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Optional fields",
      content: (
        <Form layout="vertical" form={form} className="photos">
         <Form.Item
         label="Upload your profile picture"
          name="avatar"
          getValueFromEvent={({ fileList }: { fileList: UploadFile[] }) => fileList[0]}
      >
        <Upload
          name="avatar"
          fileList={profileImage ? [{ uid: '1', name: profileImage.name, status: 'done', url: URL.createObjectURL(profileImage) }] : []}
          onChange={handleFileChange}
          listType="picture"
          maxCount={1}
          showUploadList={{ showRemoveIcon: true }}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        </Form.Item>
        {form.getFieldValue("userType") !== "1" ? 
          (
            <>
          <Form.Item
            label="Upload Multiple Images (max 10)"
            name="photos"
            getValueFromEvent={({ fileList }: { fileList: UploadFile[] }) => fileList}
          >
            <Upload
              name="photos"
              fileList={photos}
              onChange={handlePhotosChange}
              listType="picture-card"
              maxCount={10}
              showUploadList={{ showRemoveIcon: true }}
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item
        label="Description"
        name="description"
      >
         <Input.TextArea rows={4} placeholder="Enter a brief description" />
      </Form.Item>
    </>) : <></>}
        </Form>
      ),
    },
  ];

  const next = async () => {
    try {
      await form.validateFields();
      console.log(form.getFieldsValue());
      setCurrent(current + 1);
    } catch (error) {
      console.log("Validate Failed:", error);
      message.error("Please fill in all required fields");
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const { trigger } = useSWRMutation(
    "/api/user/userRegistrations",
    postFormFetcher
  );

  return (
    <div>
      <Title level={2}>Register form</Title>
      <div className="inline-grid justify-center items-center m-[2%] max-w-[500px] w-full">
      {isLoading || loading ? 
      (<div className="flex items-center justify-center h-[300px]"><Spin size="large" tip="Loading..."  /></div>) : (
        <>
      <Steps current={current} size="small" className="mb-6">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form form={form} layout="vertical">
        <div>{steps[current].content}</div>
        <div className="flex gap-[20px]">
          <Button disabled={current === 0} onClick={prev}>
            Previous
          </Button>
          <Button
            type="primary"
            onClick={current === steps.length - 1 ? onFinish : next}
          >
            {current === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </Form>
      </>
      )
      }
      </div>
    </div>
  );
}
