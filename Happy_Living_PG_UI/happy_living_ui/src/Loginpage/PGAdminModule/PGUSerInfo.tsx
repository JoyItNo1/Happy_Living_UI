import React, { useState } from "react";
import {
  UsergroupDeleteOutlined,
  UserOutlined,
  InfoOutlined,
  ProfileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, message, Checkbox, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import AddRoom from "./AddRoom";
import AddUser from "./AddUser";

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
      url: "/api/PGAdmin/Userinfo",
    })
      .then((r: any) => {
        console.log(r.data);
        setData(r.data);
        message.success("User Information Loaded");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const deleteworker = (record: any) => {
    console.log(record.pgUser_Id);
    axios
      .delete(
        `/api/PGAdmin/DeleteWorker?Id=${record.pgUser_Id}`,
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
          <b>PG User Id</b>
        </center>
      ),
      dataIndex: "pgUser_Id",
      key: "pgUser_Id",
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
      dataIndex: "room_sharing",
      key: "room_sharing",
    },
    {
      title: (
        <center>
          <b>Email</b>
        </center>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: (
        <center>
          <b>Phone Number</b>
        </center>
      ),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: (
        <center>
          <b>Building.No</b>
        </center>
      ),
      dataIndex: "building_No",
      key: "building_No",
    },
    {
      title: (
        <center>
          <b>Floor.No</b>
        </center>
      ),
      dataIndex: "flour_no",
      key: "flour_no",
    },
    {
      title: (
        <center>
          <b>Room.No</b>
        </center>
      ),
      dataIndex: "room_no",
      key: "room_no",
    },
    {
      title: (
        <center>
          <b>Status</b>
        </center>
      ),
      dataIndex: "stetus",
      key: "stetus",
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
          <h1>Add Rooms</h1>
          <AddUser />
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
