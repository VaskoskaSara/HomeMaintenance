import { Avatar, Button, Layout, Menu } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { ReactNode } from 'react';

export const menuItems = [
    {
      key: 'home',
      label: (
        <span className="p-2 bg-[darkgoldenrod] rounded-[5px]">
        <a href="/" rel="noopener noreferrer">
          Home
        </a>
        </span>
      ),
    },
    {
      key: 'services',
      label: (
        <span className="p-2 bg-[darkgoldenrod] rounded-[5px]">
        <a href="/services" rel="noopener noreferrer">
          Services
        </a>
        </span>
      ),
    },
    {
      key: 'contact',
      label: (
        <span className="p-2 bg-[darkgoldenrod] rounded-[5px]">
        <a href="/contact" rel="noopener noreferrer">
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
        <Layout className={`min-h-screen ${className}`}>
           <Header className="bg-black">
             <h1 className="min-w-0 float-left text-white">HOME MAINTENANCE</h1>
             <Menu
               theme="dark"
               mode="horizontal"
               defaultSelectedKeys={['1']}
               items={menuItems}
               className="bg-black float-right" />
           </Header>
          {children}
          <Footer className="h-[300px] bg-black text-white flex flex-col justify-center items-center gap-5">
        <Title className="text-white">Stay updated.</Title>
        <p>Get notified of new services from your inbox.</p>
        <div className="flex gap-[30px] items-center ml-[10%]">
        <input type="email" name="email" placeholder="Enter your email" className="w-[700px] text-gray-500 pl-2.5 rounded" />
        <Button size="large">Subscribe</Button>
        </div>
      </Footer>
          </Layout>
        )
    };

export default AppWrapper;
