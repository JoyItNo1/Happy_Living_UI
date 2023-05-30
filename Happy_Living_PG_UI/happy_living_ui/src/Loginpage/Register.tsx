import { Button, Form, Input, Radio } from 'antd';
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from 'react';

const Register = () => {
  const onFinish = (values:any) => {
    console.log('Received values:', values);
  };

  return (
    <div 
    style={{
    backgroundColor:"lavender",
    width:"80%",
    height:"590px",
    marginLeft:"130px",
    marginTop:"30px",
    borderRadius:"10px",
    
    }}> 
        
        <h1
        style={{color:"purple",paddingTop:"30px"}}>
        Register to Happy Living</h1>
        <div style={{marginLeft:"150px",marginTop:"50px",display:"flex",float:"left"}}>
        <img src={"./Images/pgimg.png"} style={{width:"30%",marginRight:"390px"}} />
        </div>

      <Form
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        style={{marginRight:"180px",marginTop:"-270px",float:"right" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
          ]}
          style={{ textAlign: "left" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
          ]}
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
          label="Gender"
          name="gender"
          rules={[
            { required: true, message: "Please select your gender!" },
          ]}
          style={{ textAlign: "left" }}
        >
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          style={{ textAlign: "left" }}
          rules={[
            { required: true, message: "Please input your password!" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          style={{ textAlign: "left" }}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit"
          style={{marginLeft:"150px"}}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
   
  );
};

export default Register;
