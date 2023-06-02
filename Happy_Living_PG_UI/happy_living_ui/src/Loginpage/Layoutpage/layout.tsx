import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxTissue, faUser, faUserLarge, faUsers, faUtensils } from '@fortawesome/free-solid-svg-icons';

import {
    DesktopOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Layoutpage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

    function thin(arg0: string): import("@fortawesome/fontawesome-svg-core").IconProp {
        throw new Error('Function not implemented.');
    }

    const navigate = useNavigate();

    function handleLogout() {
      window.history.replaceState(null, "", "/");
      navigate("/", { replace: true });
      localStorage.clear();
    }

    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const handleChangePasswordClick = () => {
      setShowChangePasswordModal(true);
    };
        const userMenu = (
          <Menu>
            <Menu.Item key="logout" onClick={handleLogout}>
              Logout
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleChangePasswordClick}>
              Change Password
            </Menu.Item>
          </Menu>
        );


  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
      style={{paddingTop:"20px",textAlign:"left"}}>
         <img src="./Images/pglogo.jpg" alt="Logo" style={{ width: "50%", height: "auto",borderRadius:"50px",marginLeft:"40px",marginTop:"-10px"}} />
        <div className="demo-logo-vertical" 
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DesktopOutlined />,
              label: 'Dashboard',
            },
            {
                key: '2',
                icon: <FontAwesomeIcon icon={faUsers} />,
                label: 'Workers',
              },
              {
                key: '3',
                icon: <HomeOutlined />,
                label: 'Room Info',
              },
            {
                key: '4',
                icon: <UserOutlined />,
                label: 'User Info',
              },
              {
                key: '5',
                icon: <FontAwesomeIcon icon={faUserLarge} />,
                label: 'Admin Profile',
              },
              {
                key: '6',
                icon: <FontAwesomeIcon icon={faBoxTissue} />,
                label: 'Suggestions/Complaints',
              },
              {
                key: '7',
                icon: <FontAwesomeIcon icon={faUtensils} />,
                label: 'Food Menu',
              },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer,backgroundColor:"#E7DECC" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 100,
              display:"flex",
              marginLeft:"20px",
              marginTop:"15px",
              height: 64,
              background: 'none',
            }}
          />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginRight: "20px"}}>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar
                style={{ backgroundColor: "navy", cursor: "pointer", marginRight: 16,marginTop:"-105px"  }}
                icon={<FontAwesomeIcon icon={faUser} />}
              />
            </Dropdown>
          </div>
        </Header>
        <Content style={{
          margin: '',
          padding: 24,
          minHeight: 650,
          background: colorBgContainer,
          backgroundColor: "#ECE5DA",
          color: "purple",
          fontSize: "30px",
          textAlign: "center",
          paddingTop: "0px",
          textShadow: "2px 2px 2px pink",
          fontFamily: "cursive"
        }}
      >
        <h1>
          <b>Welcome to Happy Living</b>
        </h1>
      </Content>
    </Layout>
  </Layout>
);
}

export default Layoutpage;
