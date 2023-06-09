import { Card, Layout, Menu, Table, message, theme } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import { DesktopOutlined, FieldTimeOutlined, PhoneOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

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
    getData();
  }, []);

  const getData = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url:"/api/SuperAdmin/UserData",
    })
      .then((r: any) => {
        console.log(r.data);
        setData(r.data);
        message.success("Data is loaded");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };
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
          {/* <h1  style={{
          fontSize: 25,
          background: "-webkit-linear-gradient(45deg, #09009f, #00ff95 20%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >HR Contact Info</h1> */}
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
      <Table bordered columns={columns} dataSource={tableData} pagination={false}></Table>
      </Card>
  </Layout>
    </div>
  );
};

export default UserInfo;