// AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'May', 'Jun'],
  datasets: [
    {
      label: 'Complaints',
      data: [10, 12, 22, 18, 26],
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
      tension: 0.3,
    },
    {
      label: 'Unresolved',
      data: [6, 8, 15, 13, 18],
      borderColor: '#22c55e',
      backgroundColor: '#22c55e',
      tension: 0.3,
    },
  ],
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  // Default avatar URL if user doesn't have one
  const avatarUrl = currentUser?.avatar || "https://via.placeholder.com/32";
  
  const handleViewProfile = () => {
    navigate('/profile');
  };
  
  const handleSettings = () => {
    navigate('/admin/settings');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="d-flex bg-dark text-light" style={{ minHeight: '100vh' }}>
      <div className="bg-black p-4" style={{ width: '250px' }}>
        <h4 className="text-warning">⚡ CMS</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-3 text-light">
            <i className="bi bi-columns-gap me-2" /> Dashboard
          </li>
          <li className="nav-item mb-3 text-light">
            <i className="bi bi-envelope me-2" /> Complaints
          </li>
          <li className="nav-item mb-3 text-light">
            <i className="bi bi-person me-2" /> Students
          </li>
          <li className="nav-item mb-3 text-light">
            <i className="bi bi-bar-chart me-2" /> Reports
          </li>
        </ul>
        <div className="mt-auto small">
          <i className="bi bi-gear me-1"></i> Agrin
        </div>
      </div>

      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Admin Dashboard</h3>
          <div className="ms-auto d-flex align-items-center gap-3">
            <div className="dropdown">
              <button
                className="btn btn-dark dropdown-toggle d-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <img
                  src={avatarUrl}
                  alt="profile"
                  className="rounded-circle me-2"
                  width="32"
                  height="32"
                />
                <span className="d-none d-sm-inline">{currentUser?.name || "User"}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                <li>
                  <button className="dropdown-item" onClick={handleViewProfile}>
                    <i className="bi bi-person-circle me-2"></i>
                    View Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleSettings}>
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider bg-secondary" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5>Complaints Overview</h5>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i> Create Complaint
          </button> 
          </div>
        <div className="mb-2">
          <h5 className="text-muted">Welcome to the Admin Dashboard</h5>
          <p className="text-muted">
            Here you can manage all complaints, view statistics, and monitor the status of issues reported by students.
          </p>
        </div>

        <div className="d-flex gap-5 mb-4">
          <div className="bg-info text-white p-3 rounded" style={{ width: '150px' }}>
            <h4>12</h4>
            <p>New Complaints</p>
          </div>
          <div className="bg-primary text-white p-3 rounded" style={{ width: '150px' }}>
            <h4>83</h4>
            <p>Total Complaints</p>
          </div>
          <div className="bg-success text-white p-3 rounded" style={{ width: '150px' }}>
            <h4>34</h4>
            <p>Resolved</p>
          </div>
          <div className="bg-warning text-white p-3 rounded" style={{ width: '150px' }}>
            <h4>22</h4>
            <p>In Progress</p>
          </div>
          <div className="bg-dark border text-white p-3 rounded" style={{ width: '150px' }}>
            <h4>27</h4>
            <p>Pending</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="bg-secondary rounded p-3">
              <h5>Complaints Overview</h5>
              <Line data={lineData} />
            </div>
          </div>

          <div className="col-md-15 mt-4">
            <div className="bg-secondary rounded p-3">
              <h5>Search Complaints</h5>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search complaints"
              />
              <div className="mb-2">
                <span className="badge bg-success me-2">Resolved</span>
                Internet connectivity issue
              </div>
              <div className="mb-2">
                <span className="badge bg-warning text-dark me-2">InProgress</span>
                Laboratory equipment malfunction
              </div>
              <div className="mb-2">
                <span className="badge bg-danger me-2">Pending</span>
                Issue with course registration
              </div>
              <div className="mb-2">
                <span className="badge bg-danger me-2">Pending</span>
                Water leakage in classroom
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;