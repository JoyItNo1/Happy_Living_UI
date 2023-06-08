import { Card, Layout, Menu, Select, Table, message, theme } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import { DesktopOutlined, FieldTimeOutlined, PhoneOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Label } from "@material-ui/icons";


const AddpageToUser:React.FC = () => {
  const [tableData, setData] = useState([]);

const [selectedKeys, setSelectedKeys] = useState<Array<any>>([]);
  const [collapsed, setCollapsed] = useState(false);
  const { Option } = Select;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };
  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };


  const [options, setOptions] = useState([]);

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
      url:"/api/SuperAdmin/AddPGToUser",
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
          background:
            "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
        }}
      >
        <Card>
        <div>
        <span>Select State</span>
        <Select showSearch placeholder="Select State" optionFilterProp="label">
      {options.map((option:any) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
    <span>Select City</span>
    <Select showSearch placeholder="Select City" optionFilterProp="label">
      {options.map((option:any) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
    </div>
    <div>
    <span>Select Area</span>
    <Select showSearch placeholder="Select Area" optionFilterProp="label">
      {options.map((option:any) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
    <span>Select PG Type</span>
    <Select showSearch placeholder="Select PG Type" optionFilterProp="label">
      {options.map((option:any) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
    </div>
    <div>
    <span>Select PG Name</span>
    <Select showSearch placeholder="Select PG Name" optionFilterProp="label">
      {options.map((option:any) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
    <span>Select Location</span>
    <Select showSearch placeholder="Select Location" optionFilterProp="label">
      {options.map((option:any) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
    </div>
  
  
  
  </Card>
      </Card>
  </Layout>
    </div>
  );
};


export default AddpageToUser;
