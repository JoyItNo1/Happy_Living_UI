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
import PgAdminsInfo from "../SuperAdminModule/PgAdminsInfo";
import UserInfo from "../SuperAdminModule/UserInfo";
import SuperAdminInfo from "../SuperAdminModule/Admininfo";
import { Register } from "../Register";
import Pginfo from "../Pginfo";
import UserDashboard from "../UserModule/UserDashboard";
import AddpageToUser from "../UserModule/SearchPG";
import AdminDashboard from "../PGAdminModule/PGAdminDashboard";
import PGADminUSerInfo from "../PGAdminModule/PGUSerInfo";
import PGWorkers from "../PGAdminModule/PGWorkers";
import PGUserInfo from "../UserModule/PGUserInfo";
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
          <Route path="/register" element={<Register />} />
          <Route path="/AddPGinfo" element={<Pginfo />}/>
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
           {/* User Module */}
           <Routes>
        <Route
            path="/User/UserDashboard"
            element={
              "isAuthenticated" ? <UserDashboard /> : <Navigate to="/" replace />
            }
          /> 
          <Route
            path="/User/SearchPG"
            element={
              "isAuthenticated" ? <AddpageToUser /> : <Navigate to="/" replace />
            }
          /> 
          <Route
            path="/User/PGUserInfo"
            element={
              "isAuthenticated" ? <PGUserInfo /> : <Navigate to="/" replace />
            }
          /> 
        </Routes>

        {/* PG Admin  */}
           <Routes>
        <Route
            path="/PGAdmin/AdminDashboard"
            element={
              "isAuthenticated" ? <AdminDashboard /> : <Navigate to="/" replace />
            }
          /> 
          <Route
            path="/PGAdmin/PGWorkers"
            element={
              "isAuthenticated" ? <PGWorkers/> : <Navigate to="/" replace />
            }
          /> 
          <Route
            path="/PGAdmin/PGUserInfo"
            element={
              "isAuthenticated" ? <PGADminUSerInfo /> : <Navigate to="/" replace />
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