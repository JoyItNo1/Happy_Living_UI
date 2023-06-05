import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxTissue, faUser, faUserLarge, faUsers, faUtensils } from '@fortawesome/free-solid-svg-icons';

import {
    DesktopOutlined,
  FieldTimeOutlined,
  PhoneOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Layoutpage: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<Array<any>>([]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };
  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };

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


  return (
     
      <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{ marginTop: 0 }}
          >
            <div className="logo" />

            <Menu
              theme="dark"
              onClick={handleMenuClick}
              mode="inline"
              style={{ marginTop: 5 }}
              selectedKeys={selectedKeys}
            >
             <Menu.Item key="" icon={<DesktopOutlined />}>
                <Link to="/SuperAdmin/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="PgAdminsInfoFOR" icon={<FieldTimeOutlined />}>
                <Link to="/SuperAdmin/PgAdminsInfo">PG Admins Info</Link>
              </Menu.Item>
              <Menu.Item key="UserInfo" icon={<ProfileOutlined />}>
                <Link to="/SuperAdmin/UserInfo">UserInfo </Link>
              </Menu.Item>
              <Menu.Item key="SuperAdminInfo" icon={<PhoneOutlined />}>
                <Link to="/SuperAdmin/SuperAdminInfo">Super Admin Info</Link>
              </Menu.Item>
            </Menu>
          </Sider>
  </Layout>
);
}

export default Layoutpage;
