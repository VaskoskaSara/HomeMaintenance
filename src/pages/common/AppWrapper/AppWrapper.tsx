import { Avatar, Button, Layout, Menu } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { ReactNode } from 'react';

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
  ];


const AppWrapper = ({ children, className } : {children: ReactNode, className?: string}) => {
    return(
        <Layout style={{minHeight: "100vh"}} className={className}>
           <Header style={{backgroundColor: "black"}}>
             <h1 style={{ minWidth: 0, float: "left", color: "white", fontFamily: "" }}>HOME MAINTENANCE</h1>
             <Menu
               theme="dark"
               mode="horizontal"
               defaultSelectedKeys={['1']}
               items={menuItems}
               style={{ backgroundColor: "black", float:"right" }} />
           </Header>
          {children}
          <Footer style={{height: "300px", backgroundColor:"black", color: "white", display: "flex", justifyContent:"center", flexDirection:"column", alignItems: "center", gap: "20px"}}>
        <Title style={{color:"white"}}>Stay updated.</Title>
        <p>Get notified of new services from your inbox.</p>
        <div style={{display:"flex", gap:"30px", alignItems: "center", marginLeft:"10%"}}>
        <input type="email" name="email" placeholder="Enter your email" style={{ width: '700px', color: 'grey', paddingLeft: '10px', borderRadius: "5px" }} />
        <Button size="large">Subscribe</Button>
        </div>
      </Footer>
          </Layout>
        )
    };

export default AppWrapper;
