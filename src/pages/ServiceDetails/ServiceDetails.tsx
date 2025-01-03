import { Card, Col, Divider, Rate, Row, Spin, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import { getFetcher } from "src/api/apiQuery";
import useSWR from "swr";
import AppWrapper from "../common/AppWrapper/AppWrapper";
import { ApiResponse } from "../RegisterPage/RegisterPage.props";
import { EmployeeDetails } from "../Services/Services.types";
import "../Services/style.css";
import BookingComponent from "./components/BookingComponent";
import PhotoGallery from "./components/PhotoGalery";
import "./style.css";
import { useAuth } from "../common/AuthContext";
import ReviewsComponent from "./components/ReviewsComponent";
import { getPaymentTypeText } from "./components/ServiceDetails.helper";

const ServiceDetails: React.FC = () => {
  const { id } = useParams();
  const { Title, Text } = Typography;
  const { isAuthenticated } = useAuth();

  const { data: employee, isLoading } = useSWR<ApiResponse<EmployeeDetails>>(
    `/api/user/employee/${id}`,
    getFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return (
      <AppWrapper>
        <Content className="self-center content-center">
          <Spin size="large" tip="Loading..." />
        </Content>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <div className="bg-white">
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <img
                src={employee?.data?.avatar}
                alt={`${employee?.data?.fullName}'s avatar`}
                style={{
                  width: 300,
                  maxHeight: 300,
                  borderRadius: "8px",
                  marginLeft: "50px",
                }}
              />
            </Col>
            <Col span={13}>
              <Title
                level={4}
              >{`${employee?.data?.fullName}, ${employee?.data.positionName}`}</Title>
              <Row>
                <Rate disabled defaultValue={employee?.data.rating.rating} />
                <Title level={5} className="ml-[8px] mt-[-3px]">
                  ({employee?.data.rating.numberOfReviews})
                </Title>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Text strong>City: </Text>
                  <Text>{employee?.data?.city}</Text>
                </Col>
              </Row>
              <Divider />
              <Row gutter={16}>
                <Col span={24}>
                  <Text strong>Payment: </Text>
                  <Text>
                    {employee?.data?.price
                      ? `${employee?.data?.price}${getPaymentTypeText(employee.data.paymentType)}`
                      : `${getPaymentTypeText(employee?.data?.paymentType!)}`}
                  </Text>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Text strong>Contact info: </Text>
                  <Text>{`${employee?.data?.phoneNumber}, ${employee?.data?.email}`}</Text>
                  <br />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Text strong>Experience: </Text>
                  <Text>{`${employee?.data?.experience} months`}</Text>
                </Col>
              </Row>
              {employee?.data.roleName === "Employee as business" &&
                employee?.data.numberOfEmployees && (
                  <Row gutter={16}>
                    <Col span={24}>
                      <Text strong>Number of employees: </Text>
                      <Text>{`${employee?.data?.numberOfEmployees}`}</Text>
                    </Col>
                  </Row>
                )}
              {employee?.data.description && (
                <Row gutter={16}>
                  <Col span={24}>
                    <Text strong>Description: </Text>
                    <Text>{`${employee?.data?.description}`}</Text>
                  </Col>
                </Row>
              )}
              {employee?.data.photos && (
                <PhotoGallery photos={employee?.data.photos} photoGallerySize={4}/>
              )}
            </Col>
            <Col span={3}>
              {isAuthenticated ? (
                <BookingComponent
                  paymentType={employee?.data.paymentType!}
                  price={employee?.data.price ?? null}
                />
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Card>
        <ReviewsComponent />
      </div>
    </AppWrapper>
  );
};

export default ServiceDetails;
