import './style.css';
import { Button, Card, Cascader, Checkbox, Col, InputNumber, Layout, Menu, Rate, Row, Slider, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { menuItems } from "../HomePage/HomePage";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import { getFetcher } from 'src/api/apiQuery';
import useSWR from 'swr';
import { ApiResponse, Position } from '../RegisterPage/RegisterPage.props';
import { Employee } from './Services.types';


const option = [
  {
    value: 'zhejiang',
    label: 'Zhejiang'
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu'
  },
];

const Services: React.FC = () => {
  const { data : positions, isLoading } = useSWR<ApiResponse<Position[]>>('/api/user/positions', getFetcher);

  const { data : employees, isLoading: isLoadingEmployees } = useSWR<ApiResponse<Employee[]>>('/api/user/employees', getFetcher);



    return(
    <Layout style={{display:"block"}}>
      <Header style={{backgroundColor: "black"}}>
        <h1 style={{ minWidth: 0, float: "left", color: "white", fontFamily: "" }}>HOME MAINTENANCE</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={menuItems}
          style={{ backgroundColor: "black", float:"right" }} />
      </Header>
      <div style={{display: "flex", gap:"20px"}}>
        <Content style={{display: "flex"}}>
        <Sider width={400} style={{height: "100%", backgroundColor:"#ededed", padding: "7%"}}>
          <div>
        <Title level={4}>Filter by:</Title>
        <div style={{display:"inline-grid", gap:"20px"}}>
          <div className="filter-items">
        <Typography>Choose by city:</Typography>
        <Cascader options={option} placeholder="City" />
        </div>
        <div className="filter-items">
        <Typography>Choose by experince (in months):</Typography>
        <InputNumber style={{width:"auto"}} placeholder="Experince" changeOnWheel/>
        </div>
        <div className="filter-items">
        <Typography>Chose price range:</Typography>
        <Slider range={{ draggableTrack: true }} />
        <Checkbox>Pokazhi po dogovor</Checkbox>
        </div>
        </div>
        </div>
        </Sider>
        <Button className="filterByCategoriesBtn">Filter by categories</Button>
        <Row style={{position: "relative", display:"inline-flex", padding:"7% 5%", gap:"25px", marginTop:"20px"}}>
       {employees?.data.map(employee => (
         <Col>
            <Card
            style={{width:"300px"}}
                hoverable
                className="card-style"
                cover={<img alt="example" src={employee.avatar} style={{height:"200px", objectFit:"cover"}}/>}
              >
                <Title level={4}>{employee.fullName}, {positions?.data.find(x => x.id === employee.positionId)?.positionName}</Title>
                <Rate disabled defaultValue={2} />
                <Typography style={{fontSize: "16px"}}>Experience: {employee.experience} months</Typography>
                <Typography style={{fontSize: "16px"}}>Payment: {employee.price}/h</Typography>
                <Typography style={{fontSize: "16px"}}>City: {employee.city}</Typography>
                <Button className="detailsBtn">Details</Button>
              </Card>
         </Col>
       ))}   
    </Row>
        </Content>
      </div>
      <Footer style={{height: "100px", backgroundColor:"black"}}>
      </Footer>
    </Layout>
    );
}

export default Services;