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
        style={{color:"purple",textShadow:"2px 2px 2px pink",paddingTop:"30px"}}>
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
          label={<b>Name</b>}
          name="name"
          rules={[
            { required: true, message: "Please input your name!" },
            {
              pattern: /^[A-Za-z]+$/,
              message: "Please enter alphabetic characters only!",
            }]}
          style={{ textAlign: "left" }}
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
            }]}
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
            }]}
        >
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item
          label={<b>Gender</b>}
          name="gender"
          rules={[
            { required: true, message: "Please select your gender!" },
          ]}
          style={{ textAlign: "left" }}
        >
          <Radio.Group>
            <Radio value="Male"><b>Male</b></Radio><br></br>
            <Radio value="Female"><b>Female</b></Radio><br></br>
            <Radio value="Others"><b>Others</b></Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={<b>Password</b>}
          name="password"
          style={{ textAlign: "left" }}
          rules={[
            { required: true, message: "Please input your password!" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          label={<b>Confirm Password</b>}
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
