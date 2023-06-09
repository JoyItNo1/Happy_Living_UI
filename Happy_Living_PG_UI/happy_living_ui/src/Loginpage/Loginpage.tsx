import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import "./Loginpage.css";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [AddProjectForm] = Form.useForm();
  const navigate = useNavigate();
  const [token, settoken] = useState("");

  const onFinish = (values: any) => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      url: "/api/UserLogin/LogIn",
      data: values,
    })
      .then((r: any) => {
        sessionStorage.setItem("token", r.data.token);
        sessionStorage.setItem("Admin_Id", r.data.admin_Id);
        sessionStorage.setItem("Role_Id", r.data.role_Id);
        console.log(r.data.Admin_Id);
        debugger;
        if (r.data.role_Id === 3) {
          navigate("/SuperAdmin/dashboard");
          Modal.success({
            title: "Welcome",
            content: "Login successfull",
          });
        } else if (r.data.role_Id === 2) {
          navigate("/");
          Modal.success({
            title: "Welcome",
            content: "Login successfull",
          });
        } else {
          message.error("You are not a registered user");
          navigate("/");
        }
        // message.success({
        //   content: "Login successfull",
        // }
        // );

        settoken(r.data.token);
        AddProjectForm.resetFields();
      })

      .catch((error: any) => {
        message.error(error.response.data);
        //AddProjectForm.resetFields();
      });
  };
  // <Register />;
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
  };

  const handleFPCancel = () => {
    setShowForgotPasswordModal(false);
    setOtpSent(false);
    setEmail("");
    setOtp("");
    setNewPassword("");
  };

  const handleGetOTP = async () => {
    try {
      await axios.post(`/api/Auth/GenerateOTP?email=${email}`);
      setOtpSent(true);
    } catch (error: any) {
      message.error(error.response.data);
    }
  };

  const handleSetNewPassword = async () => {
    try {
      await axios.post(
        `/api/Auth/VerifyOTP?email=${email}&otp=${otp}&newPassword=${newPassword}`
      );
      Modal.success({
        title: "Success",
        content: "Your password has been reset successfully",
      });
      handleFPCancel();
    } catch (error: any) {
      message.error(error.response.data);
      Modal.error({
        title: "Error",
        content:
          "An error occurred while resetting your password. Please try again",
      });
      handleFPCancel();
    }
  };

  return (
    <div style={{ position: "relative", }}>
      {/* <img
        src={"./Images/bgimage.jpg"}
        alt="img"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      /> */}
      <video autoPlay muted loop style={{width:"90%", height:"90%",}}>
  <source src="./Images/sterco-video.mp4" type="video/mp4" />
</video>

      <div
        style={{
          position: "absolute",
          top: 40,
          left: -330,
          width: "350px",
          height: "600px",
          //background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
          //background: "linear-gradient(to bottom, #87CEEB, #ADD8E6, #00BFFF)",
          backgroundColor: "pink",
          overflow: "hidden",
          borderRadius: "10px 70px 10px 70px",
          boxShadow: "5px 20px 50px #000",
          marginTop: "-10px",
          marginBottom: 50,
          marginLeft: "500px",
          //position: "absolute",
        }}
        >
        <Card style={{   
          backgroundImage: 'url("./Images/lightimg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#957DAD",
          borderColor:"purple"}}>
          <Form
            onFinish={onFinish}
            form={AddProjectForm}
            style={{ margin: "0 auto", width: "80%" }}
          >
            <Form.Item>
              <label
                htmlFor="chk"
                style={{
                  color: "blue",
                  fontSize: "2.3em",
                  justifyContent: "center",
                  display: "flex",
                  marginBottom: 30,
                  marginTop: 160,
                  fontWeight: "bold",
                  textShadow: "2px 2px 2px brown",
                }}
              >
                Welcome
              </label>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
              name="email"
              style={{ textAlign: "left",color:"#800808",fontWeight:"bold" }}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                style={{
                  height: 40,
                  justifyContent: "center",
                  display: "flex",
                  borderRadius: "5px",
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              style={{ textAlign: "left",color:"#800808",fontWeight:"bold" }}
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                style={{
                  justifyContent: "center",
                  display: "flex",
                  height: 40,
                  borderRadius: "5px",
                }}
              />
            </Form.Item>

            

            <Form.Item>
              <div style={{ display: "flex" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginLeft: "5%",
                    display: "flex",
                    background: "green",
                    color: "black",
                    marginTop: 20,
                  }}
                >
                  Login
                </Button>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: 65,
                  }}
                >
                  <Form.Item>
                    <Button
                      type="primary"
                      style={{
                        marginLeft: "-80%",
                        background: "orange",
                        color: "black",
                        marginTop: 20,
                        display: "left",
                      }}
                      onClick={handleForgotPasswordClick}
                    >
                      Forgot Password
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form.Item>

            <h4 style={{ color: "black" }}>
              Not registerd yet?
              <Link to="/register">
                <a> Register Now </a>
              </Link>
            </h4>

            <h4 style={{ color: "black" }}>
              Add PG info Here:
              <Link to="/AddPGinfo">
                <a> Add Here</a>
              </Link>
            </h4>

            <Form onFinish={handleSetNewPassword}>
              <Form.Item
                name="forgotPassword"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Modal
                  title="Forgot Password"
                  visible={showForgotPasswordModal}
                  onCancel={handleFPCancel}
                  footer={[
                    otpSent ? (
                      <>
                        <Button key="cancel" onClick={handleFPCancel}>
                          Cancel
                        </Button>

                        <Button
                          key="set-password"
                          type="primary"
                          onClick={handleSetNewPassword}
                        >
                          Set New Password
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="link"
                          style={{ marginRight: "20%" }}
                          onClick={handleForgotPasswordClick}
                        >
                          Try with another way
                        </Button>

                        <Button key="cancel" onClick={handleFPCancel}>
                          Cancel
                        </Button>

                        <Button
                          key="get-otp"
                          type="primary"
                          onClick={handleGetOTP}
                        >
                          Get OTP
                        </Button>
                      </>
                    ),
                  ]}
                >
                  {otpSent ? (
                    <>
                      <Form.Item
                        label="OTP"
                        name="otp"
                        rules={[
                          {
                            required: true,

                            message: "Please enter the OTP you received",
                          },

                          {
                            pattern: /^\d{4}$/,

                            message: "Please enter a 4-digit OTP",
                          },
                        ]}
                      >
                        <Input
                          value={otp}
                          onChange={(e: any) => setOtp(e.target.value)}
                        />
                      </Form.Item>

                      <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                          {
                            required: true,

                            message: "Please enter a new password",
                          },

                          {
                            min: 8,

                            message:
                              "Password must be at least 8 characters long",
                          },

                          {
                            pattern:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,

                            message:
                              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                          },
                        ]}
                      >
                        <Input.Password
                          value={newPassword}
                          onChange={(e: any) => setNewPassword(e.target.value)}
                        />
                      </Form.Item>
                    </>
                  ) : (
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,

                          message: "Please input your email!",
                        },

                        {
                          type: "email",

                          message: "Please enter a valid email address!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                        style={{
                          height: 40,

                          justifyContent: "center",

                          display: "flex",

                          borderRadius: "5px",
                        }}
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                  )}
                </Modal>
              </Form.Item>
            </Form>

            <Form onFinish={handleSetNewPassword}>
              <Form.Item
                name="forgotPassword"
                rules={[{ required: true, message: "Please enter your Email" }]}
              >
                <Modal
                  title="Forgot Password"
                  visible={showForgotPasswordModal}
                  onCancel={handleFPCancel}
                  footer={[
                    otpSent ? (
                      <>
                        <Button key="cancel" onClick={handleFPCancel}>
                          Cancel
                        </Button>

                        <Button
                          key="set-password"
                          type="primary"
                          onClick={handleSetNewPassword}
                        >
                          Set New Password
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button key="cancel" onClick={handleFPCancel}>
                          Cancel
                        </Button>

                        <Button
                          key="get-otp"
                          type="primary"
                          onClick={handleGetOTP}
                        >
                          Get OTP
                        </Button>
                      </>
                    ),
                  ]}
                >
                  {otpSent ? (
                    <>
                      <Form.Item
                        label="OTP"
                        name="otp"
                        rules={[
                          {
                            required: true,

                            message: "Please enter the OTP you received",
                          },

                          {
                            pattern: /^\d{4}$/,

                            message: "Please enter a 4-digit OTP",
                          },
                        ]}
                      >
                        <Input
                          value={otp}
                          onChange={(e: any) => setOtp(e.target.value)}
                        />
                      </Form.Item>

                      <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                          {
                            required: true,

                            message: "Please enter a new password",
                          },

                          {
                            min: 8,

                            message:
                              "Password must be at least 8 characters long",
                          },

                          {
                            pattern:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,

                            message:
                              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                          },
                        ]}
                      >
                        <Input.Password
                          value={newPassword}
                          onChange={(e: any) => setNewPassword(e.target.value)}
                        />
                      </Form.Item>
                    </>
                  ) : (
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,

                          message: "Please enter your EmailId!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Enter your Email Id"
                        style={{
                          height: 40,

                          justifyContent: "center",

                          display: "flex",

                          borderRadius: "5px",
                        }}
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                  )}
                </Modal>
              </Form.Item>
            </Form>

            {/* <Form.Item>
              <b>Add PG info Here: </b>
              <Link to="/AddPGinfo">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginLeft: 0,
                    background: "brown",
                    color: "black",
                    marginBottom: 20,
                    marginTop: -40,
                    marginRight: 5,
                  }}
                  //onClick={Register}
                >
                  Click Here
                </Button>
              </Link>
            </Form.Item> */}
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default LoginPage;