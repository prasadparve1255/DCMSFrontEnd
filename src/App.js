import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Context & Components
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";


// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import ComplaintDetail from "./pages/ComplaintDetail";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaintView from "./pages/AdminComplaintView";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

function AppRoutes() {
  const { currentUser, login } = useAuth();

  // Check for stored user data on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken && !currentUser) {
      try {
        const userData = JSON.parse(storedUser);
        login(userData);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, [currentUser, login]);

  return (
    <>
      
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Student Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/complaints/:id" element={<ComplaintDetail />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes (Protected) */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute user={currentUser} allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute user={currentUser} allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <PrivateRoute user={currentUser} allowedRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/complaints/:id"
          element={
            <PrivateRoute user={currentUser} allowedRole="admin">
              <AdminComplaintView />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute user={currentUser} allowedRole="admin">
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <PrivateRoute user={currentUser} allowedRole="admin">
              <Settings />
            </PrivateRoute>
          }
        />

        {/* Super Admin Routes (Protected) */}
        <Route
          path="/superadmin/*"
          element={
            <PrivateRoute user={currentUser} allowedRole="superadmin">
              <SuperAdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/superadmin-dashboard"
          element={
            <PrivateRoute user={currentUser} allowedRole="superadmin">
              <SuperAdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;