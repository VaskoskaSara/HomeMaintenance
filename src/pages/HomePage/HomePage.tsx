import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Col, Layout, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppWrapper from "../common/AppWrapper/AppWrapper";
import { carouselImages, employeeCards } from "./HomePage.helper";
import "./style.css";
import AddReviewModal from "../AddReview/AddReview";
import useReviewModalHook from "../AddReview/AddReview.helper";
import { useNotifications } from "../common/NotificationContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const { handleClose, isModalVisible, setIsModalVisible } =
    useReviewModalHook();
  const { reviews } = useNotifications();

  useEffect(() => {
    if (reviews.length > 0) {
      setIsModalVisible(true);
    }
  }, []);

  return (
    <div className="bg-black">
      <AppWrapper>
        <Layout>
          <Content>
            <Carousel effect="fade" autoplay>
              {carouselImages.map((image, index) => (
                <div className="relative text-center">
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className="w-full h-[700px] block object-cover"
                  />
                  <div className="absolute bottom-[11%] left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 p-2.5 rounded-md text-lg">
                    <article>
                      <h3>
                        You are on right place because we make your life easier.
                        Join us.
                      </h3>
                      <p>
                        Looking for someone to complete an obligation in your
                        home?
                      </p>
                      <footer className="text-center mt-4">
                        <Button
                          type="primary"
                          size="large"
                          href="/services"
                          className="bg-darkgoldenrod"
                        >
                          Explore services
                        </Button>
                      </footer>
                    </article>
                  </div>
                </div>
              ))}
            </Carousel>
            <Row gutter={200} justify="center" className="py-[4%]">
              <Title level={2} className="mb-[3%]">
                You want to join us like employee?
              </Title>
              <Row className="flex justify-around gap-[50px]">
                {employeeCards.map((item) => (
                  <Col className="w-[30%]">
                    <Card
                      hoverable
                      className="h-full shadow-[6px_5px_30px_rgba(0,0,0,0.5)] pb-[24px] card"
                      cover={
                        <img
                          alt="example"
                          src={item.image}
                          className="h-full"
                        />
                      }
                    >
                      <Meta title={item.title} />
                      <Button
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        className="mt-[40px]"
                        onClick={() =>
                          navigate("/register", { state: { type: item.type } })
                        }
                      >
                        GO TO
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Row>
            <AddReviewModal
              isVisible={isModalVisible}
              onClose={handleClose}
              notifications={reviews}
            />
          </Content>
        </Layout>
      </AppWrapper>
    </div>
  );
};

export default HomePage;
