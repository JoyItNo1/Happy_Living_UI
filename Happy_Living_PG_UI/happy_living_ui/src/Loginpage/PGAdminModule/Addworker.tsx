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

const Addworker: React.FC = () => {
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
      url: "/api/PGAdmin/AddPgWorkers",
      data: values,
    })
      .then((r: any) => {
        message.success("worker Added Successfully");
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
        Add Worker
      </Button>

      <Modal
        title="Add worker"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
        ]}
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
          <h1 style={{ color: "blue" }}>Add-Worker</h1>

          <Form.Item
            label="pgAdminId"
            name="pgAdminId"
            rules={[{ required: true, message: "Please input your ID!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input worker name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="phoneNumber"
            name="phoneNumber"
            rules={[{ required: true, message: "Please add phoneNumber!" }]}
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Addworker;
