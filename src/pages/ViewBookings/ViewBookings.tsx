import { Button, Col, Row, Spin, Table } from "antd";
import Title from "antd/es/typography/Title";
import AddReviewModal from "../AddReview/AddReview";
import useReviewModalHook from "../AddReview/AddReview.helper";
import AppWrapper from "src/components/AppWrapper";
import { columns } from "../EmployeeBookingMngm/EmployeeBookingMng.helper";
import { NotificationDto } from "./ViewBookings.helper";
import { useNotifications } from "../../contexts/NotificationContext";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const ViewBookings: React.FC = () => {
  const { id } = useSelector((state: RootState) => ({
    id: state.auth.id
  }));

  const {
    isModalVisible,
    handleClose,
    showModal,
    bookings,
    isLoading,
    mutate,
  } = useReviewModalHook(id as string);

  const { setReviews } = useNotifications();

  const handleModalClose = async () => {
    await handleClose();
    mutate();
  };

  const additionalColumns = [
    ...columns,
    {
      title: "Review Status",
      dataIndex: "isEmployeeReviewed",
      render: (text: boolean, record: any) =>
        !text ? (
          new Date(record.endDateTime) < new Date() ? (
            <Button
              color="blue"
              type="dashed"
              onClick={() => {
                setReviews([
                  {
                    employeeName: record.fullName,
                    employeeId: record.employeeId,
                    paymentId: record.paymentId,
                    userPaymentId: record.userPaymentId,
                  } as NotificationDto,
                ]);

                showModal();
              }}
            >
              Add review
            </Button>
          ) : (
            <p>Upcoming...</p>
          )
        ) : null,
    },
  ];

  return (
    <AppWrapper className="grid">
      <div className={"p-[20px]"}>
        <Title>Your Bookings</Title>
        {isLoading ? (
          <Spin />
        ) : (
          <Row gutter={50}>
            <Col span={18}>
              <Table
                columns={additionalColumns}
                dataSource={bookings?.data}
                pagination={{ pageSize: 10 }}
              />
            </Col>
            <AddReviewModal
              isVisible={isModalVisible}
              onClose={handleModalClose}
            />
          </Row>
        )}
      </div>
    </AppWrapper>
  );
};

export default ViewBookings;
