import {
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  InputNumber,
  Rate,
  Row,
  Slider,
  Spin,
  Typography,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { getFetcher } from "src/api/apiQuery";
import useSWR from "swr";
import AppWrapper from "../common/AppWrapper/AppWrapper";
import { ApiResponse, Position } from "../RegisterPage/RegisterPage.props";
import { Employee, ICityOption } from "./Services.types";
import "./style.css";

const option = [
  {
    value: "zhejiang",
    label: "Zhejiang",
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
  },
];

const Services: React.FC = () => {
  const [city, setCity] = useState<string[] | null>(null);
  const [experience, setExperience] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [byContract, setByContract] = useState<boolean | null>(false);
  const [cities, setCities] = useState<ICityOption[]>();

  const queryString = new URLSearchParams({
    city: city ? city[0] : "",
    price: price ? price.toString() : "",
    experience: experience ? experience.toString() : "",
    byContract: byContract ? byContract.toString() : "",
  }).toString();

  const { data: positions, isLoading } = useSWR<ApiResponse<Position[]>>(
    "/api/user/positions",
    getFetcher
  );
  const { data: fetchedCities, isLoading: isCitiesLoading } = useSWR<
    ApiResponse<string[]>
  >("/api/user/cities", getFetcher);
  const { data: employees, isLoading: isLoadingEmployees } = useSWR<
    ApiResponse<Employee[]>
  >(`/api/user/employees?${queryString}`, getFetcher);

  useEffect(() => {
    let list: ICityOption[] = [];
    fetchedCities?.data.forEach((x) => {
      list.push({
        value: x,
        label: x,
      } as ICityOption);
    });

    setCities(list);
  }, [fetchedCities]);

  if (isLoadingEmployees || isLoading || isCitiesLoading) {
    setTimeout(() => {
      if (isLoadingEmployees || isLoading || isCitiesLoading) {
        return (
          <AppWrapper>
            <Content style={{ alignSelf: "center", alignContent: "center" }}>
              <Spin size="large" tip="Loading..." />
            </Content>
          </AppWrapper>
        );
      }
    }, 1000);
  }

  return (
    <AppWrapper className="block">
      <div style={{ display: "flex", gap: "20px" }}>
        <Content style={{ display: "flex" }}>
          <Sider
            width={400}
            style={{
              height: "100%",
              backgroundColor: "#ededed",
              padding: "7%",
            }}
          >
            <div>
              <Title level={4}>Filter by:</Title>
              <div style={{ display: "inline-grid", gap: "20px" }}>
                <div className="filter-items">
                  <Typography>Choose by city:</Typography>
                  <Cascader
                    options={cities}
                    placeholder="City"
                    value={city ? city : []}
                    onChange={(value) => {
                      if (value !== undefined) {
                        setCity(value);
                      }
                    }}
                    onClear={() => setCity(null)}
                  />
                </div>
                <div className="filter-items">
                  <Typography>Choose by experince (in months):</Typography>
                  <InputNumber
                    style={{ width: "auto" }}
                    placeholder="Experince"
                    changeOnWheel
                    onChange={(value) =>
                      setExperience(Number(value ? value : null))
                    }
                    value={experience}
                  />
                </div>
                <div className="filter-items">
                  <Typography>Chose price range:</Typography>
                  <Slider
                    range
                    onChange={(value: number[]) => setPrice(value[0])}
                    value={price !== null ? [price] : [1]}
                    min={0}
                    max={10000}
                  />
                  <Checkbox
                    onChange={(value: CheckboxChangeEvent) =>
                      setByContract(value.target.checked)
                    }
                    defaultChecked={false}
                    checked={byContract ? byContract : undefined}
                  >
                    Pokazhi po dogovor
                  </Checkbox>
                </div>
              </div>
            </div>
          </Sider>
          <Button className="filterByCategoriesBtn">
            Filter by categories
          </Button>
          <Row
            style={{
              position: "relative",
              display: "inline-flex",
              padding: "7% 5%",
              gap: "25px",
              marginTop: "20px",
            }}
          >
            {employees?.data.map((employee) => (
              <Col>
                <Card
                  style={{ width: "300px" }}
                  hoverable
                  className="card-style"
                  cover={
                    <img
                      alt="example"
                      src={employee.avatar}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  }
                >
                  <Title level={4}>
                    {employee.fullName},{" "}
                    {
                      positions?.data.find((x) => x.id === employee.positionId)
                        ?.positionName
                    }
                  </Title>
                  <Rate disabled defaultValue={2} />
                  <Typography style={{ fontSize: "16px" }}>
                    Experience: {employee.experience} months
                  </Typography>
                  <Typography style={{ fontSize: "16px" }}>
                    Payment: {employee.price}/h
                  </Typography>
                  <Typography style={{ fontSize: "16px" }}>
                    City: {employee.city}
                  </Typography>
                  <Button className="detailsBtn">Details</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </div>
    </AppWrapper>
  );
};

export default Services;
