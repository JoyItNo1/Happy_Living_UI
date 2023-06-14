

import {
  Input,
  Form,
  Button,
  Select,
  Table,
  Checkbox,
  Modal,
  message,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Upload } from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const Pginfo = () => {
  const [selectedState, setSelectedState] = useState("Karnataka");
  const [stateOptions] = useState(["Karnataka"]);
  const [districtOptions, setDistrictOptions] = useState(["Bengaluru"]);
  const [cityOptions, setCityOptions] = useState([
    "Indiranagar",
    "Kalyan Nagar",
    "Jayanagar",
    "Koramangala",
    "Whitefield",
    "Marathahalli",
    "Electronic City",
    "HSR Layout",
    "BTM Layout",
    "Malleshwaram",
    "Banashankari",
    "Yelahanka",
    "Hebbal",
    "Bellandur",
    "Basavanagudi",
    "Rajajinagar",
    "Ulsoor",
    "KR Puram",
    "Cunningham Road",
    "Majestic",
    "Vijayanagar",
    "Domlur",
    "Sanjay Nagar",
    "JP Nagar",
    "Shivajinagar",
    "Cox Town",
    "Frazer Town",
    "Sadashivanagar",
    "Basaveshwaranagar",
  ]);
  const [checkedRow, setCheckedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [rows, setRows] = useState(Array<any>);
  const [isTableVisible, setTableVisible] = useState(false);
  const [isTableVisible1, setTableVisible1] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleFileChange1 = (a: any) => {
    setFile1(a.target.files[0]);
  };


  const handleUpload = (info: any) => {
    setSelectedImages(info.fileList);
  };

  const handleFormSubmit = (values: any) => {
    console.log(selectedImages);
    console.log(selectedImages.length);

    if (selectedImages.length < 2) {
      message.error("Please select at least 2 images.");
      return;
    }
    if (selectedImages.length > 4) {
      message.error("Please select up to 4 images.");
      return;
    }
  };

  const handleAddRow = () => {
    const newRow = {
      sharingtype: "",
      price: "",
    };
    setRows([...rows, newRow]);
  };

  const handleDelete = (key: any) => {
    const updatedRows = [...rows];
    updatedRows.splice(key, 1);
    setRows(updatedRows);
  };

  const showModal = () => {
    setIsModalOpen(true);
    setTableVisible(true);
  };

  const showModal1 = () => {
    setIsModalOpen1(true);
    setTableVisible1(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const handleCheckboxChange = (index: any) => {
    setCheckedRow(index);
  };

  const sharingtypes = [
    {
      title: "Sharing type",
      key: "sharingtype",
      dataIndex: "sharingtype",
      render: (_: any, record: any) => (
        <Input
          defaultValue={record.sharingtype}
          style={{ width: 120 }}
          type="number"
        />
      ),
    },
    {
      key: "Price",
      title: "Price",
      dataIndex: "price",
      render: (_: any, record: any) => (
        <Input
          defaultValue={record.price}
          style={{ width: 120 }}
          type="number"
        />
      ),
    },
  ];

  const data1 = [
    {
      duration: "3 Months",
      price: "399 Rs",
    },
    {
      duration: "6 Months",
      price: "599 Rs",
    },
    {
      duration: "9 Months",
      price: "799 Rs",
    },
    {
      duration: "1 Year",
      price: "999 Rs",
    },
  ];

  const subscriptionmethods = [
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      render: (_: any, record: any, index: number) => (
        <Input defaultValue={record.duration} style={{ width: 120 }} readOnly />
      ),
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (_: any, record: any) => (
        <Input defaultValue={record.price} style={{ width: 120 }} readOnly />
      ),
    },
    {
      title: "Select",
      key: "select",
      dataIndex: "select",
      render: (_: any, record: any, index: number) => (
        <Checkbox
          style={{ width: 50 }}
          checked={checkedRow === index}
          onChange={() => handleCheckboxChange(index)}
        />
      ),
    },
  ];

  const subscriptionMethods = subscriptionmethods.map((record, index) => ({
    ...record,
    select: (
      <Checkbox
        style={{ width: 120 }}
        checked={checkedRow === index}
        onChange={() => handleCheckboxChange(index)}
      />
    ),
  }));

  return (
    <div
      style={{
        backgroundColor: "thistle",
        width: "100%",
        height: "100%",
        borderRadius: "50px",
        marginTop: "-25px",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          color: "peru",
          paddingTop: "30px",
          textShadow: "2px 2px 2px blue",
          height: "90px",
        }}
      >
        Add your PG details here
      </h1>

      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 4 }}
        layout="horizontal"
        onFinish={handleFormSubmit}
        style={{
          marginRight: "180px",
          marginTop: "-25px",
          float: "left",
          backgroundColor: "antiquewhite",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
        }}
      >
        <Form.Item
          label={<b>First Name</b>}
          name="firstname"
          rules={[
            { required: true, message: "Please input your name!" },
            {
              pattern: /^[A-Za-z]+$/,
              message: "Please enter alphabetic characters only!",
            },
          ]}
          style={{ textAlign: "left", marginTop: "10px" }}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={<b>Last Name</b>}
          name="lastname"
          rules={[
            { required: true, message: "Please input your name!" },
            {
              pattern: /^[A-Za-z]+$/,
              message: "Please enter alphabetic characters only!",
            },
          ]}
          style={{ textAlign: "left", marginTop: "10px" }}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={<b>Email</b>}
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Please enter a valid email address!",
            },
          ]}
          style={{ textAlign: "left" }}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={<b>Phone No.</b>}
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: /^[a-zA-Z0-9]{10}$/,
              message: "Please enter 10-digit phone number!",
            },
          ]}
          style={{ textAlign: "left" }}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={<b>State</b>}
          name="state"
          //   rules={[{ required: true, message: "Please select your state!" }]}
          style={{ textAlign: "left" }}
        >
          <Input readOnly defaultValue={selectedState} />
        </Form.Item>

        <Form.Item
          label={<b>District</b>}
          name="District"
          //   rules={[{ required: true, message: "Please select your District!" }]}
          style={{ textAlign: "left" }}
        >
          <Input readOnly defaultValue={districtOptions} />
        </Form.Item>

        <Form.Item
          label={<b>City</b>}
          name="city"
          rules={[{ required: true, message: "Please select your district!" }]}
          style={{ textAlign: "left" }}
        >
          <Select placeholder="Select city">
            {cityOptions.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={<b>PG Name</b>}
          name="pgname"
          rules={[{ required: true, message: "Please input your PG name!" }]}
          style={{ textAlign: "left" }}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={<b>PG Address</b>}
          name="pgaddress"
          rules={[{ required: true, message: "Please input your PG Address!" }]}
          style={{ textAlign: "left" }}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label={<b>PG Type</b>}
          name="pgtype"
          rules={[{ required: true, message: "Please select PG Type!" }]}
          style={{ textAlign: "left" }}
        >
          <Select placeholder="Select your PG Type">
            <Option value="Men">Men</Option>
            <Option value="Ladies">Ladies</Option>
            <Option value="CoPG">Co-PG</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<b>Upload Image</b>}
          name="pgimage"
          style={{ textAlign: "left", marginLeft: "60px" }}
        >
          <Upload multiple onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Select Images</Button>
          </Upload>
        </Form.Item>

       <Form.Item>
            <div
              style={{
                position: "relative",
                paddingLeft: "100%",
                left: 200,
                top: -120,
                marginTop: 117,
                marginBottom:"-130px"
              }}
            >
              
                <Space>
                  <Button
                    type="primary"
                    ghost
                    style={{
                      backgroundColor: "#69b1ff",           //"#69b1ff",
                      color: "black",
                      marginLeft: 120,
                      marginBottom: 0,
                    }}
                    onClick={() => setIsFormVisible(true)}
                  >
                    <PlusCircleOutlined />
                    Upload Your PG Images Here
                  </Button>

                  <Modal title="Here, Upload Your PG Images"
                    visible={isFormVisible}
                    footer={null}
                    onCancel={() => {
                      setIsFormVisible(false);
                    }}
                  >
                    <Form layout="vertical" onFinish={handleFormSubmit}>
                      <Form.Item
                        style={{
                          color: "blue",
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                        label="Upload Image 1"
                        name="imagePathTimesheet"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Upload Image!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Upload Image 1"
                          name="imagePathTimesheet"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </Form.Item>

                      <Form.Item
                        style={{
                          color: "blue",
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                        label="Upload Image 2"
                        name="imagePathUpload"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Approval Image!",
                          },
                        ]}
                      >
                        {/* <label >Approval Image</label> */}
                        <Input
                          placeholder="Upload Image 2"
                          name="imagePathUpload"
                          type="file"
                          onChange={handleFileChange1}
                          accept="image/*"
                        />
                      </Form.Item>

                      <Form.Item
                        style={{
                          color: "blue",
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                        label="Upload Image 3"
                        name="imagePathTimesheet"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please input your Upload Image!",
                        //   },
                        // ]}
                      >
                        <Input
                          placeholder="Upload Image 3"
                          name="imagePathTimesheet"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </Form.Item>

                      <Form.Item
                        style={{
                          color: "blue",
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                        label="Upload Image 4"
                        name="imagePathTimesheet"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please input your Upload Image!",
                        //   },
                        // ]}
                      >
                        <Input
                          placeholder="Upload Image 4"
                          name="imagePathTimesheet"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </Form.Item>

                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: 200, backgroundColor: "green" }}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Modal>
                </Space>
              </div>
              </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button
            onClick={showModal}
            type="primary"
            style={{
              marginLeft: "103px",
              backgroundColor: "#FC6C85",
              width: "21%",
            }}
          >
            Sharing Types
          </Button>
          <Modal
            title="Select Sharing Types"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {isTableVisible && (
              <Table
                bordered
                columns={sharingtypes}
                dataSource={rows}
                pagination={false}
                style={{
                  width: "60%",
                  marginLeft: "90px",
                  marginTop: "5px",
                  color: "pink",
                }}
              />
            )}
            <Button
              type="primary"
              onClick={handleAddRow}
              style={{
                backgroundColor: "green",
                color: "white",
                marginLeft: "19%",
                marginTop: "5px",
              }}
            >
              Add Row
            </Button>

            <Button
              type="primary"
              onClick={handleDelete}
              style={{
                backgroundColor: "red",
                color: "white",
                marginLeft: "20%",
                marginTop: "5px",
              }}
            >
              Delete Row
            </Button>
          </Modal>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button
            onClick={showModal1}
            type="primary"
            style={{ marginLeft: "100px", backgroundColor: "#FC6C85" }}
          >
            Subscription Method
          </Button>
          <br></br>
          <Modal
            title="Select Subscription Method"
            open={isModalOpen1}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {isTableVisible1 && (
              <Table
                bordered
                columns={subscriptionMethods}
                dataSource={data1}
                pagination={false}
                style={{
                  width: "50%",
                  marginLeft: "40px",
                  marginTop: "5px",
                  color: "pink",
                }}
              />
            )}
            <Link to="/Pay">
              <Button
                type="primary"
                style={{
                  marginTop: "10px",
                  marginLeft: "210px",
                  backgroundColor: "green",
                }}
              >
                Pay
              </Button>
            </Link>
          </Modal>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "110px", backgroundColor: "#C154C1" }}
            // onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Pginfo;