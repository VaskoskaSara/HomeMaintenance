import React from "react";
import { Button, Card, Col, Row } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { employeeCards } from "../HomePageData";

const EmployeeCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={200} justify="center" className="py-[4%]">
      <h2 className="mb-[3%] text-2xl font-semibold">You want to join us like employee?</h2>
      <Row className="flex justify-around gap-[50px]">
        {employeeCards.map((item) => (
          <Col key={item.title} className="w-[30%]">
            <Card
              hoverable
              className="h-full shadow-[6px_5px_30px_rgba(0,0,0,0.5)] pb-[24px] card"
              cover={<img alt="example" src={item.image} className="h-full" />}
            >
              <Card.Meta title={item.title} />
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
  );
};

export default EmployeeCards;
