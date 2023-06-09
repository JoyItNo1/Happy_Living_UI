import React, { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import axios from "axios";

const AddUser: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //For Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { Option } = Select;

  //For Add
  const onFinish = (values: any) => {
    console.log(values);
    axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "/api/PGAdmin/PGUserAdd",
      data: values,
    })
      .then((r: any) => {
        message.success("Room Added Successfully");
      })
      .catch((error: any) => {
        message.error(error.response.data);
        window.location.reload();
      });
  };

  return (
    <div>
      <Button
        id="b1"
        type="primary"
        onClick={showModal}
        style={{ left: "40%" }}
      >
        Add User
      </Button>
      <Modal
        title="Add User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <h1 style={{ color: "blue" }}>Add User</h1>
          <Form.Item
            label="PG Admin ID"
            name="pgAdminId"
            rules={[{ required: true, message: "Please input your ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input UserName!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please add Email!" }]}
          >
            {" "}
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please add Phone Number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Building Number"
            name="bulding_no"
            rules={[{ required: true, message: "Please add Building Number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Floor Number"
            name="flour_no"
            rules={[{ required: true, message: "Please add Floor Number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room Number"
            name="room_no"
            rules={[{ required: true, message: "Please add Room Number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button key="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUser;
