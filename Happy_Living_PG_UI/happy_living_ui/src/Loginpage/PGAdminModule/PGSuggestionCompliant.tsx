import React, { useRef, useState } from "react";
import {
  UsergroupDeleteOutlined,
  UserOutlined,
  InfoOutlined,
  ProfileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  message,
  Checkbox,
  Table,
  Space,
  Input,
  Switch,
  InputRef,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import TextArea from "antd/es/input/TextArea";

const { Header, Sider, Content } = Layout;

const SuggestionCompliant: React.FC = () => {
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
      url: "/api/PGAdmin/RoomInfo",
    })
      .then((r: any) => {
        console.log(r.data);
        setData(r.data);
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };
  const inputRef = useRef<InputRef>(null);
  const [input, setInput] = useState(true);

  const sharedProps = {
    style: { width: "100%" },
    defaultValue: "Enter your Compliants  or Suggestions!",
    ref: inputRef,
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
          <p style={{ fontSize: 30, fontWeight: 500 }}>
            Compliants/Suggestions
          </p>
          <Input.TextArea rows={10} cols={5} {...sharedProps} />
          <Button
            style={{
              marginTop: 10,
              width: 100,
              backgroundColor: "salmon",
              color: "white",
            }}
          >
            Submit
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SuggestionCompliant;
