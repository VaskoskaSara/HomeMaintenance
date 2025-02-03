import { Layout } from "antd";
import React, { useEffect } from "react";
import AppWrapper from "src/components/AppWrapper";
import { useNotifications } from "../../contexts/NotificationContext";
import AddReviewModal from "../AddReview/AddReview";
import useReviewModalHook from "../AddReview/AddReview.helper";
import CarouselSection from "./components/CarouselSection";
import "./style.css";
import EmployeeCards from "./components/EmployeeCards";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const { Content } = Layout;

const HomePage: React.FC = () => {
  const { id } = useSelector((state: RootState) => ({
    id: state.auth.id
  }));
  const { handleClose, isModalVisible, setIsModalVisible } = useReviewModalHook(id as string);
  const { reviews } = useNotifications();

  useEffect(() => {
    if (reviews.length > 0) {
      setIsModalVisible(true);
    }
  }, [reviews]);

  return (
    <div className="bg-black">
      <AppWrapper>
        <Layout>
          <Content>
            <CarouselSection />
            <EmployeeCards />
            <AddReviewModal isVisible={isModalVisible} onClose={handleClose} />
          </Content>
        </Layout>
      </AppWrapper>
    </div>
  );
};

export default HomePage;
