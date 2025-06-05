// import React, { useState } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import AdminCreateForm from '../components/SuperAdmin/AdminCreateForm';
// import DepartmentAdminTable from '../components/SuperAdmin/DepartmentAdminTable';

// const SuperAdminDashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [refreshAdmins, setRefreshAdmins] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleAdminCreated = () => {
//     setRefreshAdmins(!refreshAdmins);
//   };

//   return (
//     <div className="bg-dark min-vh-100 text-white">
//       <nav className="navbar navbar-dark bg-dark border-bottom border-secondary mb-4">
//         <Container>
//           <span className="navbar-brand">
//             <i className="bi bi-shield-lock me-2"></i>
//             Super Admin Dashboard
//           </span>
//           <div className="d-flex align-items-center">
//             <span className="me-3">Welcome, {user?.name || 'Super Admin'}</span>
//             <button 
//               className="btn btn-outline-danger btn-sm"
//               onClick={handleLogout}
//             >
//               <i className="bi bi-box-arrow-right me-1"></i>
//               Logout
//             </button>
//           </div>
//         </Container>
//       </nav>

//       <Container>
//         <Row>
//           <Col md={4}>
//             <Card bg="dark" text="white" className="mb-4 border-secondary">
//               <Card.Header className="bg-secondary">System Stats</Card.Header>
//               <Card.Body>
//                 <div className="d-flex justify-content-between mb-3">
//                   <span>Total Admins:</span>
//                   <span className="badge bg-primary">12</span>
//                 </div>
//                 <div className="d-flex justify-content-between mb-3">
//                   <span>Total Students:</span>
//                   <span className="badge bg-info">156</span>
//                 </div>
//                 <div className="d-flex justify-content-between mb-3">
//                   <span>Total Complaints:</span>
//                   <span className="badge bg-warning text-dark">48</span>
//                 </div>
//                 <div className="d-flex justify-content-between">
//                   <span>Resolved Complaints:</span>
//                   <span className="badge bg-success">32</span>
//                 </div>
//               </Card.Body>
//             </Card>

//             <AdminCreateForm onAdminCreated={handleAdminCreated} />
//           </Col>
          
//           <Col md={8}>
//             <DepartmentAdminTable key={refreshAdmins} />
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SuperAdminDashboard;


import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SuperAdminDashboard = () => {
  const pieData = {
    labels: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ['#007bff', '#28a745', '#fd7e14'],
        borderColor: ['#fff', '#fff', '#fff'],
      },
    ],
  };

  return (
    <div className="d-flex bg-dark text-white" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-black p-3" style={{ width: '250px' }}>
        <h4 className="text-warning mb-4">⚡ CMS</h4>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <i className="bi bi-house me-2"></i>Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-primary" href="#">
              <i className="bi bi-person-badge me-2"></i>Departments
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              <i className="bi bi-image me-2"></i>Settings
            </a>
          </li>
        </ul>
        <div className="mt-auto text-muted small mt-5">
          <i className="bi bi-gear me-2"></i>Sepert
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Complaints by Department</h3>
          <h5>Super Admin <i className="bi bi-list"></i></h5>
        </div>

        <div className="row g-4">
          {/* Pie Chart */}
          <div className="col-md-6">
            <div className="bg-dark border rounded p-3">
              <Pie data={pieData} />
              <ul className="mt-3">
                <li><span className="text-primary">●</span> Computer Science - 40%</li>
                <li><span className="text-success">●</span> Electrical Engineering - 35%</li>
                <li><span className="text-warning">●</span> Mechanical Engineer - 25%</li>
              </ul>
              <button className="btn btn-primary mt-3 w-100">Create</button>
            </div>
          </div>

          {/* Department Info */}
          <div className="col-md-6">
            <div className="bg-dark border rounded p-3 mb-3">
              <h5>Complaints by Department</h5>
              <div className="form-group">
                <label>Department Name</label>
                <input type="text" className="form-control" value="Computer.Science" readOnly />
              </div>
              <div className="form-group mt-3">
                <label>Admin / HOD Email</label>
                <input type="email" className="form-control" value="cs.hod@university.com" readOnly />
              </div>
            </div>
            <div className="bg-dark border rounded p-3">
              <h5>Departments</h5>
              <p>Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
