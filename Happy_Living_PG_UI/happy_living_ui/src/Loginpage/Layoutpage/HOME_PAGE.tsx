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


const { Content } = Layout;

const Home = () => {
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
  }, [navigate]);
  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", isAuthenticated.toString());
  }, [isAuthenticated]);
  return (
    <Layout>
      <Content>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/SuperAdmin/dashboard"
            element={
              "isAuthenticated" ? ( <Layoutpage />) : (  <Navigate to="/" replace />) } />
          {/* <Route
            path="/SuperAdmin/PgAdminsInfo"
            element={
              "isAuthenticated" ? <PgAdminsInfo /> : <Navigate to="/" replace />
            }
          /> */}

        {/*  admin routes   */}
          {/* <Route
            path="/SuperAdmin/dashboard"
            element={
              "isAuthenticated" ? (
                <Layoutpage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />  */}
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
         {/*   <Route
            path="/admin/user_profile"
            element={
              "isAuthenticated" ? <UserProfile /> : <Navigate to="/" replace />
            } */}
          {/* />  */}
        </Routes>

        {/*  employee routes   */}
        {/* <Routes>
          <Route
            path="/employee/dashboard"
            element={
              "isAuthenticated" ? <EmpDashboard /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/employee/timesheet"
            element={
              "isAuthenticated" ? <EmpTimesheet /> : <Navigate to="/" replace />
            }
          /> */}
          {/* <Route
            path="/employee/timesheetsummary"
            element={
              "isAuthenticated" ? (
                <TimeSheetSummary />
              ) : (
                <Navigate to="/" replace />
              )
            }
          /> */}
          {/* <Route
            path="/employee/hrcontact"
            element={
              "isAuthenticated" ? (
                <HRContactInfo />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/employee/userprofile"
            element={
              "isAuthenticated" ? <EUserProfile /> : <Navigate to="/" replace />
            }
          /> */}
        {/* </Routes>  */}
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
