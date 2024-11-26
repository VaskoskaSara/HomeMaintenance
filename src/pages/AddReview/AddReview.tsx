import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Rate,
  Tabs,
  Typography,
  Upload,
} from "antd";
import { useState } from "react";
import { postFormFetcher } from "src/api/apiCommand";
import useSWRMutation from "swr/mutation";
import { useAuth } from "../common/AuthContext";
import { useNotifications } from "../common/NotificationContext";
import moment from "moment";

const { TabPane } = Tabs;

const AddReviewModal = ({
  isVisible,
  onClose
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [fileList, setFileList] = useState([]);
  const { id } = useAuth();
  const { Text } = Typography;

  const { setReviews, reviews } = useNotifications();

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const { trigger } = useSWRMutation("/api/user/submitReview", postFormFetcher);

  const handleSubmit = (
    values: any,
    paymentId: number,
    employeeId: string,
    userPaymentId: string
  ) => {
    const formDataToSend = new FormData();

    const filteredModel = Object.entries(values)
      .filter(([key]) => key !== "photos")
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as { [key: string]: any });

    for (const key in filteredModel) {
      if (Object.prototype.hasOwnProperty.call(filteredModel, key)) {
        formDataToSend.append(key, filteredModel[key]);
      }
    }

    formDataToSend.append("userId", id as any);
    formDataToSend.append("employeeId", employeeId as any);
    formDataToSend.append("paymentId", paymentId as any);
    formDataToSend.append("userPaymentId", userPaymentId as any);

    fileList.forEach((file: any) => {
      if (file.originFileObj) {
        formDataToSend.append("photos", file.originFileObj);
      }
    });

    trigger(formDataToSend)
      .then((res: any) => {
        notification.success({
          message: "Review was added sucessfully",
          placement: "topRight",
          duration: 5,
        });
      })
      .catch(() => {
        notification.error({
          message: "Some error was happened",
          description:
            "You haven't successfully added review. Please try again later from 'View bookings'.",
          placement: "topRight",
          duration: 5,
        });
      });

    form.resetFields();
    setFileList([]);
    const newReviews = reviews.filter(
      (x: any) =>
        userPaymentId !== x.userPaymentId
    );
    setReviews(newReviews);

    if (newReviews.length === 0) {
      onClose();
    }
  };

  return (
    <Modal
      title={`Add review for your bookings`}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      style={{ minWidth: "600px" }}
    >
      <Tabs defaultActiveKey="1" onTabClick={()=> {
        form.resetFields();
        setFileList([]);
        setRating(0);
      }}>
        {reviews.map((item: any, index: number) => (
          <TabPane tab={`Add Review for ${item.employeeName}`} key={index}>
            <Form
              form={form}
              onFinish={() =>
                handleSubmit(
                  form.getFieldsValue(true),
                  item.paymentId,
                  item.employeeId,
                  item.userPaymentId
                )
              }
              layout="vertical"
            >
              <Text>{moment.utc(item.startDate).format('YYYY/MM/DD')}</Text> - <Text>{moment.utc(item.endDate).format('YYYY/MM/DD')}</Text>
              <Form.Item
                name="rating"
                rules={[{ required: true, message: "Please select a rating!" }]}
              >
                <Rate onChange={setRating} value={rating} />
              </Form.Item>

              <Form.Item name="comment">
                <Input.TextArea
                  placeholder="Write your comment here..."
                  rows={4}
                />
              </Form.Item>

              <Form.Item
                name="photos"
                valuePropName="fileList"
                getValueFromEvent={handleUploadChange}
              >
                <Upload
                  multiple
                  beforeUpload={() => false}
                  fileList={fileList}
                  maxCount={10}
                >
                  <Button icon={<UploadOutlined />}>Upload Photos</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Review
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};

export default AddReviewModal;
