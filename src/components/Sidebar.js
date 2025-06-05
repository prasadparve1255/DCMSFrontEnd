// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white vh-100 p-3">
      <div className="sidebar-header mb-4">
        <h4 className="text-warning">Student Menu</h4>
      </div>
      <ul className="nav flex-column sidebar-menu">
        <li className="nav-item mb-3">
          <NavLink to="/student-dashboard" className="nav-link text-white" activeClassName="active">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/profile" className="nav-link text-white" activeClassName="active">
            <i className="bi bi-person-circle me-2"></i>
            Profile
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/complaints" className="nav-link text-white" activeClassName="active">
            <i className="bi bi-file-earmark-text me-2"></i>
            Complaints
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/settings" className="nav-link text-white" activeClassName="active">
            <i className="bi bi-gear me-2"></i>
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
