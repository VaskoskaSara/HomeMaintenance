import {
  Button,
  Card,
  Col,
  InputNumber,
  Rate,
  Row,
  Select,
  Slider,
  Spin,
  Switch,
  Typography,
} from "antd";
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
import CategoriesModal from "./components/CategoriesModal";
import { postJsonFetcher } from "src/api/apiCommand";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../common/AuthContext";

const { Option } = Select;

const Services: React.FC = () => {
  const [city, setCity] = useState<string[] | null>(null);
  const [experience, setExperience] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [byContract, setByContract] = useState<boolean | null>(false);
  const [cities, setCities] = useState<ICityOption[]>();
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  const { id } = useAuth();
  const navigate = useNavigate();

  const { data: positions, isLoading } = useSWR<ApiResponse<Position[]>>(
    "/api/user/positions",
    getFetcher
  );

  const { data: fetchedCities, isLoading: isCitiesLoading } = useSWR<
    ApiResponse<string[]>
  >("/api/user/cities", getFetcher);

  const filterData = {
    cities: Array.isArray(city) && city.length > 0 ? city : null,
    price: price ? price.toString() : null,
    experience: experience ? experience.toString() : null,
    excludeByContract: byContract !== undefined ? byContract : null,
    categoryIds: categoryIds,
  };

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState<boolean>(true);

  const { data: empl, isLoading: isLoadingEm } = useSWR<Employee[]>(
    ["/api/user/employees", filterData],
    ([url, filterData]) => postJsonFetcher(url, { arg: filterData }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (empl) {
      setEmployees(empl.filter((x) => x.id !== id));
    }
    setIsLoadingEmployees(isLoadingEm);
  }, [empl, isLoadingEm]);

  const [visible, setVisible] = useState(false);

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
            <Content className="self-center content-center">
              <Spin size="large" tip="Loading..." />
            </Content>
          </AppWrapper>
        );
      }
    }, 1000);
  }

  return (
    <AppWrapper className="block">
      <div className="flex gap-5">
        <Content className="flex">
          <Sider width={400} id="service-aside" className="h-full p-[7%]">
            <div>
              <Title level={4}>Filter by:</Title>
              <div className="inline-grid gap-5">
                <div className="inline-grid gap-1.25">
                  <Typography>Choose by city:</Typography>
                  <Select
                    mode="multiple"
                    placeholder="Select cities"
                    value={city ? city : []}
                    allowClear
                    onChange={(value) => {
                      if (value !== undefined) {
                        setCity(value);
                      }
                    }}
                    onClear={() => setCity(null)}
                    dropdownStyle={{ minHeight: "200px" }}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    {cities?.map((city) => (
                      <Option key={city.value} value={city.value}>
                        {city.label}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="inline-grid gap-1.25">
                  <Typography>
                    Choose the min experience (in months):
                  </Typography>
                  <InputNumber
                    className="w-auto"
                    placeholder="Experience"
                    changeOnWheel
                    onChange={(value) =>
                      setExperience(Number(value ? value : null))
                    }
                    value={experience}
                  />
                </div>
                <div className="inline-grid gap-1.25">
                  <Typography>Choose price range from 0 to:</Typography>
                  <Slider
                    range
                    onChange={(value: number[]) => setPrice(value[0])}
                    value={price !== null ? [price] : [1]}
                    min={0}
                    max={10000}
                  />
                  Iskluchi gi tie po dogovor
                  <Switch
                    defaultChecked={false}
                    checked={byContract ? byContract : undefined}
                    onChange={(value) => setByContract(value)}
                    className="w-fit"
                  />
                </div>
              </div>
            </div>
          </Sider>
          <div className="pt-2 px-5 pb-7 w-full">
            <Button
              className="filterByCategoriesBtn"
              onClick={() => setVisible(true)}
            >
              Filter by categories
            </Button>
            <CategoriesModal
              visible={visible}
              positions={positions?.data}
              onClose={() => setVisible(false)}
              setCategoryIds={setCategoryIds}
              categoryIds={categoryIds}
            />
            <Row className="w-full relative grid grid-cols-4 pt-2 px-5 pb-[3rem] top-[10%]">
              {employees?.map((employee: any) => (
                <Col>
                  <Card
                    className="w-[250px] w-[80%] shadow-[6px_5px_30px_rgba(0,0,0,0.5)] h-full card-style"
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src={employee.avatar}
                        className="h-[200px] object-cover"
                      />
                    }
                  >
                    <Title level={5}>
                      {employee.fullName},{" "}
                      {
                        positions?.data.find(
                          (x) => x.id === employee.positionId
                        )?.positionName
                      }
                    </Title>
                    <Rate disabled defaultValue={2} />
                    <Typography className="text-[16px]">
                      Experience: {employee.experience} months
                    </Typography>
                    <Typography className="text-[16px]">
                      Payment:{" "}
                      {employee.price ? `${employee.price}/h` : "By Contract"}
                    </Typography>
                    <Typography className="text-[16px]">
                      City: {employee.city}
                    </Typography>
                    <Button
                      className="mt-5 bg-black text-white"
                      onClick={() => navigate(`/services/${employee.id}`)}
                    >
                      Details
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
      </div>
    </AppWrapper>
  );
};

export default Services;
