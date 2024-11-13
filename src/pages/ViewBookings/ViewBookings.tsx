import { Button, Col, Row, Spin, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import AddReviewModal from "../AddReview/AddReview";
import useReviewModalHook from "../AddReview/AddReview.helper";
import AppWrapper from "../common/AppWrapper/AppWrapper";
import { useAuth } from "../common/AuthContext";
import { columns } from "../EmployeeBookingMngm/EmployeeBookingMng.helper";
import { NotificationDto } from "./ViewBookings.helper";

const ViewBookings: React.FC = () => {
  const { id } = useAuth();

  const {
    isModalVisible,
    handleClose,
    showModal,
    bookings,
    isLoading
  } = useReviewModalHook(id as string);

  const [notifications, setNotifications] = useState<NotificationDto[] | any[]>(
    []
  );

  const handleModalClose = async () => {
    await handleClose();
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
                setNotifications([
                  {
                    employeeName: record.fullName,
                    employeeId: record.employeeId,
                    paymentId: record.paymentId,
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
              notifications={notifications}
            />
          </Row>
        )}
      </div>
    </AppWrapper>
  );
};

export default ViewBookings;
