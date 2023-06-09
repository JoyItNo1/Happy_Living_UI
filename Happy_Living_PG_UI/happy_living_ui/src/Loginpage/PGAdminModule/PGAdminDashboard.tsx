import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
  InfoOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
// const [currentUser, setCurrentUser] = useState("");

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [selectedKeys, setSelectedKeys] = useState<Array<any>>([]);

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };
  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };

  return (
    <Layout>
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
          <Menu.Item key="1" icon={<InfoOutlined />}>
            <Link to="/PGAdmin/AdminDashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/PGAdmin/PGWorkers">Workers info</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupDeleteOutlined />}>
            <Link to="/PGAdmin/PGUserInfo">PG UserInfo</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<HomeOutlined />}>
            <Link to="/PGAdmin/PGRoomInfo">Room Info</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<HomeOutlined />}>
            <Link to="/PGAdmin/PGAdminProfile">PG Admin Profile</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ProfileOutlined />}>
            <Link to="/PGAdmin/Suggestion&Compliant">
              Compliants/Suggestions
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <h2>Hello, {currentUser}!</h2>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
