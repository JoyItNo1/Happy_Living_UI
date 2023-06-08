import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
  InfoOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  
  Table,
  Checkbox,
  message,
  Modal,
} from "antd";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Addworker from "../PGAdminModule/Addworker";
import Card from "antd/es/card/Card";

const PGWorkers: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;
  const [tableData, setData] = useState<Array<any>>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    getData();
  }, []);

  //getting data
  const getData = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/PGAdmin/workerInfos",
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

  //deleting the  list
  const deleteworker = (record: any) => {
    console.log(record.pgWorks_Id);
    axios
      .delete(
        `https://localhost:7181/api/PGAdmin/DeleteWorker?Id=${record.pgWorks_Id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((response: any) => {
        message.success("Successfully Deleted");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
    window.location.reload();
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
          <b>Contact_No</b>
        </center>
      ),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      //for actionsss
      key: "actions",
      render: (text: any, record: any) => {
        return (
          <div hidden={!record.checked}>
            <Button type="primary" danger onClick={() => deleteworker(record)}>
              Delete
            </Button>
          </div>
        );
      },
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

     
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 500,
          background: colorBgContainer,
        }}
      >
        <Card
          style={{
            width: "100%",
            marginTop: 16,
            paddingTop: 35,
            background:
              "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
          }}
        >
          <h1>Workers Information</h1>
          <Addworker />

          <Table
            bordered
            columns={columns}
            dataSource={tableData}
            pagination={false}
          ></Table>
        </Card>
      </Content>
    </Layout>
  );
};

export default PGWorkers;
