import { Col, Row, Spin, Table } from "antd";
import Title from "antd/es/typography/Title";
import AppWrapper from "../common/AppWrapper/AppWrapper";
import { useAuth } from "../common/AuthContext";
import { columns } from "../EmployeeBookingMngm/EmployeeBookingMng.helper";
import { getBookingsByUser } from "./ViewBookings.helper";

const ViewBookings: React.FC = () => {
    const { id } = useAuth();
    const { bookings, isLoading } = getBookingsByUser(id as string);

    return (
        <AppWrapper>
          <div className={"p-[20px]"}>
            <Title>Your Bookings</Title>
            {isLoading ? (
              <Spin />
            ) : (
              <Row gutter={50}>
                <Col span={18}>
                  <Table
                    columns={columns}
                    dataSource={bookings?.data}
                    pagination={{ pageSize: 10 }}
                  />
                </Col>
              </Row>
            )}
          </div>
        </AppWrapper>
    )
}

export default ViewBookings;