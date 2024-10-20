import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Rate,
  Tabs,
  Upload,
} from "antd";
import { useState } from "react";
import { postFormFetcher } from "src/api/apiCommand";
import useSWRMutation from "swr/mutation";
import { useAuth } from "../common/AuthContext";
import { useNotifications } from "../common/NotificationContext";

const { TabPane } = Tabs;

const AddReviewModal = ({
  isVisible,
  onClose,
  notifications,
}: {
  isVisible: boolean;
  onClose: () => void;
  notifications: any[];
}) => {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [fileList, setFileList] = useState([]);
  const { id } = useAuth();

  const { setReviews, reviews } = useNotifications();

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const { trigger } = useSWRMutation("/api/user/submitReview", postFormFetcher);

  const handleSubmit = (values: any, paymentId: number, employeeId: string) => {
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
    const newReviews = reviews.filter(
      (x: any) =>
        x.employeeId !== employeeId &&
        x.userId !== id &&
        paymentId !== x.paymentId
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
      <Tabs defaultActiveKey="1">
        {notifications.map((item, index) => (
          <TabPane tab={`Add Review for ${item.employeeName}`} key={index}>
            <Form
              form={form}
              onFinish={() =>
                handleSubmit(
                  form.getFieldsValue(true),
                  item.paymentId,
                  item.employeeId
                )
              }
              layout="vertical"
            >
              <Form.Item name="rating">
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
