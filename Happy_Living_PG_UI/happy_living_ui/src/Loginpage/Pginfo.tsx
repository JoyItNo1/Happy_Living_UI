import { Input, Form, Button, Select, Table, Checkbox } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const { Option } = Select;

const Pginfo = () => {
  const [stateOptions] = useState(["Karnataka"]);

  const onFinish = (values: any) => {
    // Handle form submission here
    console.log(values);
  };

  const handleAdd = (record: any) => {
    console.log("Adding values for record:", record);
  };

  const [selectedState, setSelectedState] = useState("Karnataka");
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
  const [districtOptions, setDistrictOptions] = useState(["Bengaluru"]);

  const handleStateChange = (state: any) => {
    setSelectedState(state);
  };

  const [isTableVisible, setTableVisible] = useState(false);

  const [isTableVisible1, setTableVisible1] = useState(false);

  const handleClick = () => {
    setTableVisible(true);
  };

  const handleClick1 = () => {
    setTableVisible1(true);
  };
  const [inputValue, setInputValue] = useState("Sharing Type");
  const [inputValues, setInputValues] = useState("Price");

  

  const sharingtypes = [
    {
      title: "Sharing type",
      key: "sharingtype",
      dataIndex: "sharingtype",
    },
    {
      key: "Price",
      title: "Price",
      dataIndex: "price",
      render: () => (
        //   <Select defaultValue="--" style={{ width: 120 }}>
        //     <Option value="$10">12000</Option>
        //     <Option value="$20">9000</Option>
        //     <Option value="$30">7500</Option>
        //     <Option value="$40">6000</Option>
        //   </Select>
        <Input defaultValue="" style={{ width: 120 }} />
      ),
    },
    {
      title: "Action",
      key: "add",
      dataIndex: "add",
      render: (text: any, record: any) => (
        <Button
          onClick={() => handleAdd(record)}
          style={{ backgroundColor: "purple", color: "white" }}
        >
          Add
        </Button>
      ),
    },
  ];

  const data = Array.from({ length: 4 }, (_, index) => ({
    sharingtype: (index + 1).toString(),
    add: "Add",
  }));

  const data1 = [
    {
      duration: "3 Months",
      price:"300 Rs"
    },
    {
        duration: "6 Months",
        price:"600 Rs"
    },
    {
        duration: "9 Months",
        price:"900 Rs"
    },
    {
        duration: "1 Year",
        price:"1999 Rs"
    },
  ];

  const subscriptionmethods = [
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      render: (_:any, record:any) => (
        <Input defaultValue={record.duration} style={{ width: 120 }} readOnly />
      ),
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (_:any, record:any) => (
        <Input defaultValue={record.price} style={{ width: 120 }} readOnly />
      ),
    },
    {
      title: "Select",
      key: "select",
      dataIndex: "select",
      render: (_: any, record: any) => (
        <Checkbox
          style={{ width: 120 }}
         
        />
      ),
    },
  ];
  


  return (
    <div
    //   style={{
    //     backgroundColor: "lavender",
    //     width: "80%",
    //     height: "590px",
    //     marginLeft: "130px",
    //     marginTop: "30px",
    //     borderRadius: "10px",
    //   }}
    >
      <h1 style={{ color: "purple", paddingTop: "30px" }}>
        Add your PG details here
      </h1>
      {/* <div
        style={{
          marginLeft: "150px",
          marginTop: "50px",
          display: "flex",
          float: "left",
        }}
      >
        <img src="./Images/pgimg.png" style={{ width: "30%", marginRight: "390px" }} />
      </div> */}

      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        style={{ marginRight: "180px", marginTop: "0px", float: "left" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
          style={{ textAlign: "left" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          style={{ textAlign: "left" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone No."
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please select your state!" }]}
        >
          <Input readOnly defaultValue={selectedState} />
        </Form.Item>

        <Form.Item
          label="District"
          name="District"
          rules={[{ required: true, message: "Please select your District!" }]}
        >
          <Input readOnly defaultValue={districtOptions} />
        </Form.Item>

        {/* <Form.Item
          label="District"
          name="district"
          rules={[{ required: true, message: "Please select your district!" }]}
        >
          <Select placeholder="Select district">
            {districtOptions.map((district) => (
              <Option key={district} value={district}>
                {district}
              </Option>
            ))}
          </Select>
        </Form.Item> */}

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please select your district!" }]}
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
          label="PG Name"
          name="pgname"
          rules={[{ required: true, message: "Please input your PG name!" }]}
          style={{ textAlign: "left" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="PG Address"
          name="pgaddress"
          rules={[{ required: true, message: "Please input your PG Address!" }]}
          style={{ textAlign: "left" }}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="PG Type"
          name="pgtype"
          rules={[{ required: true, message: "Please select PG Type!" }]}
        >
          <Select placeholder="Select your PG Type">
            <Option value="Men">Men</Option>
            <Option value="Ladies">Ladies</Option>
            <Option value="CoPG">Co-PG</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button
            onClick={handleClick}
            type="primary"
            style={{ marginLeft: "150px", backgroundColor: "purple" }}
          >
            Select sharing types
          </Button>
          {isTableVisible && (
            <Table bordered columns={sharingtypes} dataSource={data} pagination={false}/>
          )}
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button
            onClick={handleClick1}
            type="primary"
            style={{ marginLeft: "150px", backgroundColor: "purple" }}
          >
            Select Subscription Method
          </Button>
          {isTableVisible1 && (
            <Table bordered columns={subscriptionmethods} dataSource={data1} pagination={false} />
          )}
          <Button type="primary">Pay</Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "150px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Pginfo;
