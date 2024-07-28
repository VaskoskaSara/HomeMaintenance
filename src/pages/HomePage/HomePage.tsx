import { Avatar, Button, Card, Carousel, Col, Layout, Menu, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import './style.css';
import Meta from "antd/es/card/Meta";
import { ArrowRightOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

export const menuItems = [
  {
    key: 'home',
    label: (
      <span className="menu-item">
      <a href="/" target="_blank" rel="noopener noreferrer">
        Home
      </a>
      </span>
    ),
  },
  {
    key: 'services',
    label: (
      <span className="menu-item">
      <a href="/services" target="_blank" rel="noopener noreferrer">
        Services
      </a>
      </span>
    ),
  },
  {
    key: 'contact',
    label: (
      <span className="menu-item">
      <a href="/contact" target="_blank" rel="noopener noreferrer">
        Contact
      </a>
      </span>
    ),
  },
  {
    key: 'avatar',
    label: (
      <Avatar>U</Avatar>
    ),
  }
]

const HomePage: React.FC = () => (
  <div className="bgded" style={{ backgroundColor: 'black' }}>
    <Layout>
      <Header style={{backgroundColor: "black"}}>
        <h1 style={{ flex: 1, minWidth: 0, float: "left", color: "white", fontFamily: "" }}>HOME MAINTENANCE</h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={menuItems}
          style={{ backgroundColor: "black", float:"right" }} />
      </Header>
      <Layout>
        <Content>
          <Carousel effect="fade" autoplay>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <img
                src="https://th.bing.com/th/id/R.42274ae040c301e4c1125aa18c0beefb?rik=7JxGSMB1j6Msmg&pid=ImgRaw&r=0"
                alt="Slide 1"
                style={{ width: '100%', height: '700px', display: 'block' }} />
              <div style={{
                position: 'absolute',
                bottom: '11%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '18px'
              }}>
                <article>
                  <h3 className="heading">You are on right place because we make your life easier. Join us.</h3>
                  <p>Looking for someone to complete an obligation in your home?</p>
                  <footer style={{ textAlign: "center", marginTop: "15px" }}>
                    <Button type="primary" size="large" href="/services" style={{ backgroundColor: "darkgoldenrod" }}>Explore services</Button>
                  </footer>
                </article>
              </div>
            </div>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <img
                src="https://cdn.smartstuff.howstuffworks.com/smartstuffhowstuffworks/wp-content/uploads/2021/03/smartstuff-handyman.jpg"
                alt="Slide 2"
                style={{ width: '100%', height: '700px', display: 'block' }} />
              <div style={{
                position: 'absolute',
                bottom: '11%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '18px'
              }}>
                <article>
                  <h3 className="heading">You are on right place because we make your life easier. Join us.</h3>
                  <p>Looking for someone to complete an obligation in your home?</p>
                  <footer style={{ textAlign: "center", marginTop: "15px" }}>
                    <Button type="primary" size="large" href="/services" style={{ backgroundColor: "darkgoldenrod" }}>Explore services</Button>
                  </footer>
                </article>
              </div>
            </div>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <img
                src="https://drpipe.ca/wp-content/uploads/2023/07/prepare-swimming-pool-1024x683.jpg"
                alt="Slide 3"
                style={{ width: '100%', height: '700px', display: 'block' }} />
              <div style={{
                position: 'absolute',
                bottom: '11%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '18px'
              }}>
                <article>
                  <h3 className="heading">You are on right place because we make your life easier. Join us.</h3>
                  <p>Looking for someone to complete an obligation in your home?</p>
                  <footer style={{ textAlign: "center", marginTop: "15px" }}>
                    <Button type="primary" size="large" href="/services" style={{ backgroundColor: "darkgoldenrod" }}>Explore services</Button>
                  </footer>
                </article>
              </div>
            </div>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <img
                src="https://th.bing.com/th/id/OIP.kHg9Yd1XDYlRTVdu0chkDwHaE8?rs=1&pid=ImgDetMain"
                alt="Slide 4"
                style={{ width: '100%', height: '700px', display: 'block' }} />
              <div style={{
                position: 'absolute',
                bottom: '11%',
                left: '50%',
                transform: 'translateX(-50%)',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '18px'
              }}>
                <article>
                  <h3 className="heading">You are on right place because we make your life easier. Join us.</h3>
                  <p>Looking for someone to complete an obligation in your home?</p>
                  <footer style={{ textAlign: "center", marginTop: "15px" }}>
                    <Button type="primary" size="large" href="/services" style={{ backgroundColor: "darkgoldenrod" }}>Explore services</Button>
                  </footer>
                </article>
              </div>
            </div>
          </Carousel>
          <Row gutter={200} justify="center" style={{ padding: "4% 0" }}>
          <Title level={2} style={{marginBottom: "3%"}}>You want to join us like employee?</Title>
          <Row className="row-cards">
            <Col className="width-40">
              <Card
                hoverable
                className="card"
                cover={<img alt="example" src="https://th.bing.com/th/id/OIP.uF5NZ8-FFWZfpNF2u33dygHaEW?w=570&h=335&rs=1&pid=ImgDetMain" />}
              >
                <Meta title="Register yourself like individual/bussiness" />
                <Button icon={<ArrowRightOutlined />} iconPosition="end" style={{ marginTop: "40px" }}>GO TO</Button>
              </Card>
            </Col>
            <Col className="width-40">
              <Card
                hoverable
                className="card"
                cover={<img alt="example" src="https://cnectgpo.com/wp-content/uploads/2023/11/become-a-member-header-image_Compressed.jpg" /> }
              >
                <Meta title="Register yourself like customer" />
                <Button icon={<ArrowRightOutlined />} iconPosition="end" style={{ marginTop: "40px" }}>GO TO</Button>
              </Card>
            </Col>
            </Row>
          </Row>
        </Content>
      </Layout>
      <Footer style={{height: "450px", backgroundColor:"black", color: "white", display: "flex", justifyContent:"center", flexDirection:"column", alignItems: "center", gap: "20px"}}>
        <Title style={{color:"white"}}>Stay updated.</Title>
        <p>Get notified of new services from your inbox.</p>
        <div style={{display:"flex", gap:"30px", alignItems: "center", marginLeft:"10%"}}>
        <input type="email" name="email" placeholder="Enter your email" style={{ width: '700px', color: 'grey', paddingLeft: '10px', borderRadius: "5px" }} />
        <Button size="large">Subscribe</Button>
        </div>
      </Footer>
    </Layout>
  </div>
);

export default HomePage;