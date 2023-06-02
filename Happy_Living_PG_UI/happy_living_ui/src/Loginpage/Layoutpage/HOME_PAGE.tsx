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
            path="/admin"
            element={
              "isAuthenticated" ? ( <Layoutpage />) : (  <Navigate to="/" replace />) } />
          {/* <Route
            path="/employee"
            element={
              "isAuthenticated" ? <EmpDashboard /> : <Navigate to="/" replace />
            }
          /> */}
        </Routes>

        {/*  admin routes   */}
        {/* <Routes>
          <Route
            path="/admin/dashboard"
            element={
              "isAuthenticated" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin/configuration"
            element={
              "isAuthenticated" ? (
                <Configuration />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/admin/timesheet_status"
            element={
              "isAuthenticated" ? (
                <TimesheetStatus />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin/employees"
            element={
              "isAuthenticated" ? <EmployeeA /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/admin/user_profile"
            element={
              "isAuthenticated" ? <UserProfile /> : <Navigate to="/" replace />
            }
          />
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
