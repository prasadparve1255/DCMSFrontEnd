import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const AdminCreateForm = ({ onAdminCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'Computer'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, department } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/superadmin/create-admin', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('Admin created successfully');
      setFormData({
        name: '',
        email: '',
        password: '',
        department: 'Computer'
      });
      
      if (onAdminCreated) {
        onAdminCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating admin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card bg-dark text-white border-secondary">
      <div className="card-header bg-secondary">
        <h4 className="mb-0">Create Department Admin</h4>
      </div>
      <div className="card-body">
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter admin name"
              required
              className="bg-dark text-white border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
              className="bg-dark text-white border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="bg-dark text-white border-secondary"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={department}
              onChange={handleChange}
              required
              className="bg-dark text-white border-secondary"
            >
              <option value="Computer">Computer</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            disabled={isLoading}
            className="w-100"
          >
            {isLoading ? 'Creating...' : 'Create Admin'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminCreateForm;