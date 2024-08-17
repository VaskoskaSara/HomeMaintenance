import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Col, Layout, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import React from "react";
import AppWrapper from "../common/AppWrapper/AppWrapper";
import './style.css';


const HomePage: React.FC = () => (
  <div className="bgded" style={{ backgroundColor: 'black' }}>
    <AppWrapper>
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
            <Col className="width-30">
              <Card
                hoverable
                className="card"
                cover={<img alt="example" src="https://th.bing.com/th/id/OIP.uF5NZ8-FFWZfpNF2u33dygHaEW?w=570&h=335&rs=1&pid=ImgDetMain" />}
              >
                <Meta title="Register yourself like individual/bussiness" />
                <Button icon={<ArrowRightOutlined />} iconPosition="end" style={{ marginTop: "40px" }}>GO TO</Button>
              </Card>
            </Col>
            <Col className="width-30">
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
    </AppWrapper>
  </div>
);

export default HomePage;