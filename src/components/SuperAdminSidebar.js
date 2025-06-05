import React from "react";
import { NavLink } from "react-router-dom";

const SuperAdminSidebar = () => {
  return (
    <div className="d-flex flex-column p-3 bg-dark text-white" style={{ height: "100vh", width: "250px" }}>
      <h4 className="mb-4">Super Admin</h4>
      <NavLink className="nav-link text-white mb-2" to="/superadmin/create-admin">➕ Create Admin</NavLink>
      <NavLink className="nav-link text-white mb-2" to="/superadmin/admins">📋 Admin List</NavLink>
    </div>
  );
};

export default SuperAdminSidebar;
