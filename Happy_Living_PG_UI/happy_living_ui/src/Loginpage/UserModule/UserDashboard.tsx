import { Card, Layout, Menu, Table, message, theme } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import { DesktopOutlined, FieldTimeOutlined, PhoneOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";

const UserInfo = () => {
  const [tableData, setData] = useState([]);
  const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(5);
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


  const columns: any = [
    {
      title: (
        <center>
          <b>Column ID</b>
        </center>
      ),
      dataIndex: "id",
       key: "id",
      render: (value: any, item: any, index: any) =>(page - 1) * pageSize + index + 1,
    },
    {
      title: (
        <center>
          <b>Name</b>
        </center>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
        title: (
          <center>
            <b>Gender</b>
          </center>
        ),
        dataIndex: "gender",
        key: "gender",
      },
    {
      title: (
        <center>
          <b>Mail_ID</b>
        </center>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: (
        <center>
          <b>Contact_No</b>
        </center>
      ),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
      {
        title: (
          <center>
            <b>Created Date</b>
          </center>
        ),
        dataIndex: "created_date",
        key: "created_date",
      },
      
  ];

  useEffect(() => {
  }, []);


  return (
    <div>
   
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
                <Link to="/User/UserDashboard">User Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="SearchPG" icon={<FieldTimeOutlined />}>
                <Link to="/User/SearchPG">Search PG</Link>
              </Menu.Item>
              <Menu.Item key="UserInfo" icon={<ProfileOutlined />}>
                <Link to="/User/PGUserInfo">PG User Info </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Card
        style={{
          width: "100%",
          marginTop: 16,
          paddingTop: 35,
          //background: "rgba(235, 235, 235,0.6)",
          background:
            "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
        }}
      >
              </Card>
  </Layout>
    </div>
  );
};

export default UserInfo;