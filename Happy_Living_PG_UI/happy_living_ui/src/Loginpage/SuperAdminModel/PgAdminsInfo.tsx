import {
  Button,
  Card,
  Checkbox,
  Input,
  Layout,
  Menu,
  Table,
  message,
  theme,
} from "antd";
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
  const deletePGAdmin = (record: any) => {
    console.log(record.pgAdmin_Id);
    axios
      .delete(`/api/SuperAdmin/DeleteAdmin?Id=${record.pgAdmin_Id}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
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
      //for actionsss
      key: "actions",
      render: (text: any, record: any) => {
        return (
          <div>
            {/* hidden={!record.checked}> */}
            <Button type="primary" danger onClick={() => deletePGAdmin(record)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const handleActivateDeactivate = (isActive: boolean) => {
    const val = {
      id: selectedRowKeys,
      iS_Active: isActive,
    };
    console.log(val);
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
        <Card
          style={{
            width: "100%",
            marginTop: 16,
            paddingTop: 35,
            background:
              "-webkit-linear-gradient(45deg,rgba(9, 0, 159, 0.2), rgba(0, 255, 149, 0.2) 55%)",
          }}
        >
          <div
            style={{
              display: "flex",
              float: "right",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              hidden={
                selectedRows.filter((row: any) => row.is_Auth == false)
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
                selectedRows.filter((row: any) => row.is_Auth == true)
                  .length === 0
              }
            >
              <Button
                type="primary"
                onClick={() => handleActivateDeactivate(false)}
              >
                Deactivate
              </Button>
            </div>
          </div>

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
            rowKey={(record: any) => record.pgAdmin_Id}
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
