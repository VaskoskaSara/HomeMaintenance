import { Card, Col, Divider, Rate, Row, Spin, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import { getFetcher } from "src/api/apiQuery";
import useSWR from "swr";
import AppWrapper from "src/components/AppWrapper";
import { ApiResponse } from "../RegisterPage/RegisterPage.props";
import { EmployeeDetails } from "../Services/Services.types";
import "../Services/style.css";
import BookingComponent from "./components/BookingComponent/BookingComponent";
import PhotoGallery from "./components/PhotoGalery";
import "./style.css";
import { useAuth } from "../../contexts/AuthContext";
import ReviewsComponent from "./components/ReviewsComponent";
import { getPaymentTypeText } from "./ServiceDetails.helper";

const ServiceDetails: React.FC = () => {
  const { id } = useParams();
  const { Title, Text } = Typography;
  const { isAuthenticated, role } = useAuth();

  const { data: employee, error, isLoading } = useSWR<ApiResponse<EmployeeDetails>>(
    `/api/employee/${id}`,
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

  if (error) {
    return (
      <AppWrapper>
        <Content className="self-center content-center">
          <Typography.Text type="danger">Failed to load employee details.</Typography.Text>
        </Content>
      </AppWrapper>
    );
  }

  const { data } = employee ?? {};

  if (!data) return null;

  const {
    avatar,
    fullName,
    positionName,
    rating,
    city,
    price,
    phoneNumber,
    email,
    experience,
    roleName,
    numberOfEmployees,
    description,
    photos,
  } = data;

  return (
    <AppWrapper>
      <div className="bg-white">
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={6}>
              <img
                src={avatar}
                alt={`${fullName}'s avatar`}
                className="employee-avatar"
              />
            </Col>
            <Col span={13}>
              <Title level={4}>{`${fullName}, ${positionName}`}</Title>
              <Row>
                <Rate disabled defaultValue={rating.rating} />
                <Title level={5} className="ml-[8px] mt-[-3px]">
                  ({rating.numberOfReviews})
                </Title>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Text strong>City: </Text>
                  <Text>{city}</Text>
                </Col>
              </Row>
              <Divider />
              <Row gutter={16}>
                <Col span={24}>
                  <Text strong>Payment: </Text>
                  <Text>
                    {price
                      ? `${price}${getPaymentTypeText(data.paymentType)}`
                      : `${getPaymentTypeText(data.paymentType)}`}
                  </Text>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Text strong>Contact info: </Text>
                  <Text>{`${phoneNumber}, ${email}`}</Text>
                  <br />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Text strong>Experience: </Text>
                  <Text>{`${experience} months`}</Text>
                </Col>
              </Row>
              {roleName === "Employee as business" && numberOfEmployees && (
                <Row gutter={16}>
                  <Col span={24}>
                    <Text strong>Number of employees: </Text>
                    <Text>{numberOfEmployees}</Text>
                  </Col>
                </Row>
              )}
              {description && (
                <Row gutter={16}>
                  <Col span={24}>
                    <Text strong>Description: </Text>
                    <Text>{description}</Text>
                  </Col>
                </Row>
              )}
              {photos && <PhotoGallery photos={photos} photoGallerySize={4} />}
            </Col>
            <Col span={3}>
              {isAuthenticated && role !== 3 && (
                <BookingComponent paymentType={data.paymentType!} price={price ?? null} />
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
