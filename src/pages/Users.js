import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Sample users data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'student', status: 'active' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'student', status: 'inactive' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'student', status: 'active' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'student', status: 'active' }
  ]);

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: '',
    status: ''
  });

  // Handle edit button click
  const handleEdit = (user) => {
    setCurrentUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowEditModal(true);
  };

  // Handle delete button click
  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    }
  };

  // Handle save edit
  const handleSaveEdit = () => {
    setUsers(users.map(u => 
      u.id === currentUser.id ? { ...u, ...editForm } : u
    ));
    setShowEditModal(false);
    toast.success('User updated successfully');
  };

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle add user
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: 'New User',
      email: 'newuser@example.com',
      role: 'student',
      status: 'active'
    };
    setUsers([...users, newUser]);
    toast.success('New user added');
  };

  return (
    <div className="bg-dark min-vh-100 d-flex">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
          <button 
            className="btn btn-outline-light d-md-none me-2" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>
          <span className="navbar-brand fw-bold">User Management</span>
        </nav>

        {/* Users Content */}
        <div className="container-fluid py-4">
          <div className="card bg-dark text-white border-secondary">
            <div className="card-header bg-secondary d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Users</h4>
              <button className="btn btn-primary btn-sm" onClick={handleAddUser}>
                <i className="bi bi-plus-circle me-1"></i> Add User
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-striped mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="text-capitalize">{user.role}</td>
                        <td>
                          <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-outline-primary" onClick={() => handleEdit(user)}>
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-outline-danger" onClick={() => handleDelete(user.id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header bg-secondary">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark text-white border-secondary" 
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control bg-dark text-white border-secondary" 
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Role</label>
                  <select 
                    className="form-select bg-dark text-white border-secondary" 
                    id="role"
                    name="role"
                    value={editForm.role}
                    onChange={handleFormChange}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select 
                    className="form-select bg-dark text-white border-secondary" 
                    id="status"
                    name="status"
                    value={editForm.status}
                    onChange={handleFormChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;