import { Button, Card, Checkbox, Input, Layout, Menu, Table, message, theme } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import {
  DesktopOutlined,
  EditFilled,
  FieldTimeOutlined,
  PhoneOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

const PgAdminsInfo = () => {
  const [tableData, setData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<Array<any>>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRows, setSelectedRows] = useState<{ isActive: boolean }[]>([]);
  const [page, setPage]: any = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const pageSizeOptions = [3, 5, 10, 20];
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const handlePagination = (pagination: any) => {
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
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
          <b>State</b>
        </center>
      ),
      dataIndex: "select_State",
      key: "select_State",
    },
    {
      title: (
        <center>
          <b>City</b>
        </center>
      ),
      dataIndex: "select_City",
      key: "select_City",
    },
    {
      title: (
        <center>
          <b>Area</b>
        </center>
      ),
      dataIndex: "select_Area",
      key: "select_Area",
    },
    {
      title: (
        <center>
          <b>Location</b>
        </center>
      ),
      dataIndex: "pG_Location",
      key: "pG_Location",
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
    {
      title: (
        <center>
          <b>Payment_Methods</b>
        </center>
      ),
      dataIndex: "payment_Methods",
      key: "payment_Methods",
    },
    {
      title: (
        <center>
          <b>Stetus</b>
        </center>
      ),
      dataIndex: "Is_Auth",
      key: "Is_Auth",
    },
  ];
  const handleActivateDeactivate = (isActive: boolean) => {
    const val = {
      id: selectedRowKeys, 
    };
    if (selectedRowKeys == null) {
      message.error("No selected row");
      return;
    }
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      url: `/api/SuperAdmin/ActiveInactive`,
      data: val,
    })
      .then((response) => {
        message.success("Record's status updated");
        window.location.reload();
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const filteredData = tableData.filter((record: any) => {
    const values = Object.values(record).join(" ").toLowerCase();
    return values.includes(searchText.toLowerCase());
  });
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
      url: "/api/SuperAdmin/PGAdminData",
    })
      .then((r: any) => {
        setData(r.data);
        message.success("Data is loaded");
      })
      .catch((error: any) => {
        message.error(error.message);
      });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: any, selectedRows: any) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedRows(selectedRows);
    },
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
      <div
            hidden={
              selectedRows.filter((row: any) => row.is_Active == false)
                .length === 0
            }
          >
            <Button
              onClick={() => handleActivateDeactivate(true)}
              type="primary"
              style={{
                width: 85,
                background:
                  "-webkit-linear-gradient(45deg, darkgreen, lightgreen 105%)",
                fontWeight: 500,
                marginRight: 4,
              }}
            >
              Activate
            </Button>
          </div>
          <div
            hidden={
              selectedRows.filter((row: any) => row.is_Active == true)
                .length === 0
            }
          >
            <Button
              type="primary"
              style={{
                width: 100,
                fontWeight: 500,
                marginRight: 4,
                background:
                  "-webkit-linear-gradient(45deg, #8B0000, #FFC0CB 105%)",
                top:100,
              }}
              onClick={() => handleActivateDeactivate(false)}
            >
              Deactivate
            </Button>
          </div>
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
           <Input.Search
          value={searchText}
          onChange={(e: any) => setSearchText(e.target.value)}
          placeholder="Search"
          style={{
            width: 120,
            display: "flex",
            float: "left",
            textAlign: "center",
            marginRight: 5,
            borderRadius: 4,
            padding: 3,
            background:
              "-webkit-linear-gradient(45deg, rgba(9, 0, 159, 0.9), rgba(0, 255, 149, 0.5) 105%)",
            color: "black",
            fontWeight: "bold",
          }}
        />
          <Table
           dataSource={filteredData}
           columns={columns}
           rowSelection={rowSelection}
           rowKey={(record: any) => record.employee_Id}
           pagination={{
             current: page,
             pageSize,
             showTotal: (total: any) => `Total ${total} items`,
             showSizeChanger: true,
             pageSizeOptions,
           }}
           onChange={handlePagination}
           style={{ width: 4500, fontWeight: 600, marginTop: 8 }}
           scroll={{ x: "max-content" }}
          ></Table>
        </Card>
      </Layout>
    </div>
  );
};

export default PgAdminsInfo;
