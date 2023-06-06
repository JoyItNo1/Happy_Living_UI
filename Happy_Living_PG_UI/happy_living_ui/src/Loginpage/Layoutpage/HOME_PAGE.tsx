import { useEffect, useState } from "react";
import { Layout } from "antd";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "../Loginpage";
import Layoutpage from "./layout";
import PgAdminsInfo from "../SuperAdminModel/PgAdminsInfo";
import UserInfo from "../SuperAdminModel/UserInfo";
import SuperAdminInfo from "../SuperAdminModel/Admininfo";
import { Register } from "../Register";
import Pginfo from "../Pginfo";
const { Content } = Layout;

const Home = () => { 
  debugger
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
 
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      {
        setIsAuthenticated(true);
      }
    } else {
      navigate("/");
      sessionStorage.removeItem("token");
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);
  return (
    <Layout>
      <Content>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/register"
            element={
               <Register /> }
          />

          <Route path="/" element={<LoginPage />} />
          <Route
            path="/AddPGinfo"
            element={
               <Pginfo /> }
          />
          </Routes>

          <Routes>
         <Route
            path="/SuperAdmin/dashboard"
            element={
               <Layoutpage />  } />
          

           <Route
            path="/SuperAdmin/PgAdminsInfo"
            element={
              "isAuthenticated" ? (
                <PgAdminsInfo />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/SuperAdmin/UserInfo"
            element={
              "isAuthenticated" ? (
                <UserInfo />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
         <Route
            path="/SuperAdmin/SuperAdminInfo"
            element={
              "isAuthenticated" ? <SuperAdminInfo /> : <Navigate to="/" replace />
            }
          /> 
        
        </Routes>

        
      </Content>
    </Layout>
  );
};

const JoyTS = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);

export default JoyTS;
