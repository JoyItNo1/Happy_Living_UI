
import React, { useState } from "react";
import {
  UsergroupDeleteOutlined,
  UserOutlined,
  InfoOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, message, Checkbox, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const PGADminUSerInfo: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [tableData, setData] = useState<Array<any>>([]);
  const [checkAll, setCheckAll] = useState(false);
   const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [selectedKeys, setSelectedKeys] = useState<Array<any>>([]);
  
  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };
  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };
  const handleCheckboxChange = (checked: boolean, record: any) => {
    const newData: any = [...tableData];
    const index = newData.findIndex(
      (item: any) => record.pgWorks_Id === item.pgWorks_Id
    );
    newData[index].checked = checked;
    setData(newData);
  };
  const handleCheckAll = (e: any) => {
    const checked = e.target.checked;
    const newData: any = tableData.map((item: any) => ({ ...item, checked }));
    setData(newData);
    setCheckAll(checked);
  };
  //getting data
  const getroomdetails = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/PGAdmin/RoomInfo",
    })
      .then((r: any) => {
        console.log(r.data);
        setData(r.data);
        message.success("The value has been Loaded to the table");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  
   const columns: any = [
     {
       title: () => <Checkbox checked={checkAll} onChange={handleCheckAll} />,
       dataIndex: "checkBox",
       key: "checkBox",
       render: (_: any, record: any) => (
         <Checkbox
           checked={record.checked}
           onChange={(e) => handleCheckboxChange(e.target.checked, record)}
         />
       ),
     },

     {
       title: (
         <center>
           <b>Worker Id</b>
         </center>
       ),
       dataIndex: "pgWorks_Id",
       key: "pgWorks_Id",
       render: (value: any, item: any, index: any) =>
         (page - 1) * pageSize + index + 1,
     },
     {
       title: (
         <center>
           <b>name</b>
         </center>
       ),
       dataIndex: "name",
       key: "name",
     },
     {
       title: (
         <center>
           <b>room_sharing</b>
         </center>
       ),
       dataIndex: "room_sharing",
       key: "room_sharing",
     },
     {
       title: (
         <center>
           <b>room_no</b>
         </center>
       ),
       dataIndex: "room_no",
       key: "room_no",
     },
     {
       title: (
         <center>
           <b>flore_no</b>
         </center>
       ),
       dataIndex: "flore_no",
       key: "flore_no",
     },
     {
       title: (
         <center>
           <b>building_No</b>
         </center>
       ),
       dataIndex: "building_No",
       key: "building_No",
     },
    
   ];

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
            <Link to="/PGAdmin/PGWorkers">Worker info</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupDeleteOutlined />}>
            <Link to="/PGAdmin/PGUserInfo">PG UserInfo</Link>
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
          <Table
            bordered
            columns={columns}
            dataSource={tableData}
            pagination={false}
          ></Table>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PGADminUSerInfo;
