import {
  Button,
  Form,
  message,
  notification,
  Spin,
  Steps
} from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { postFormFetcher } from "src/api/apiCommand";
import useSWRMutation from "swr/mutation";
import "../../style.css";
import CredentialsStep from "./components/CredentialsStep";
import GeneralInformationStep from "./components/GeneralInformationStep";
import OptionalFieldsStep from "./components/OptionalFieldsStep";
import PositionInformationStep from "./components/PositionInformationStep";
import {
  CustomError,
  RegisterFormObject
} from "./RegisterForm.props";
import { login } from "src/store/authSlice";
import { useDispatch } from "react-redux";
const { Step } = Steps;

export function RegisterForm() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    if (state && state.type) {
      form.setFieldsValue({ userType: state.type.toString() });
    } else {
      form.setFieldsValue({ userType: undefined });
    }
  }, [location, form]);


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

    if (form.getFieldValue("avatar")) {
      formDataToSend.append("avatar", form.getFieldValue("avatar").originFileObj);
    }

    form.getFieldValue("photos").forEach((file: any) => {
      if (file.originFileObj) {
        formDataToSend.append("photos", file.originFileObj);
      }
    });

    trigger(formDataToSend)
      .then((res: any) => {
        dispatch(login({ id: res.id, role:  res.userRole, avatar: res.avatar }));
        notification.success({
          message: "Registration Successful",
          description: "You have successfully registered. Welcome!",
          placement: "topRight",
          duration: 5,
        });
        navigate("/");
        setLoading(false);
      })
      .catch((ex: CustomError) => {
        notification.error({
          message: "Some error was happened",
          description: "You haven't successfully registered. Please try again.",
          placement: "topRight",
          duration: 5,
        });
        setLoading(false);
      });
  };

  const steps = [
    {
      title: "General info",
      description: "General",
      content: <GeneralInformationStep formData={form} />,
    },
    {
      title: "Credentials",
      content: <CredentialsStep formData={form} />,
    },
    {
      title: "Position info",
      content:  <PositionInformationStep formData={form} />,
    },
    {
      title: "Optional fields",
      content: <OptionalFieldsStep formData={form} />
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
    "/api/authentication/register",
    postFormFetcher
  );

  return (
    <div>
      <Title level={2}>Register form</Title>
      <div className="justify-center items-center m-[2%] w-[95%]">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
