import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Form, Button, Alert } from 'react-bootstrap';

const SuperAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    department: '',
  });
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const departments = ['ENTC', 'Computer', 'IT', 'Mechanical', 'Civil'];

  const fetchAdmins = async () => {
    try {
      const res = await axios.get('/api/admins');
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/admins', formData);
      setMessage('Admin created successfully');
      setError('');
      setFormData({ username: '', password: '', department: '' });
      fetchAdmins();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating admin');
      setMessage('');
    }
  };

  return (
    <Container className="mt-5 text-light">
      <h2 className="mb-4">Super Admin Panel</h2>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={5}>
          <h4>Create Department Admin</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">Create Admin</Button>
          </Form>
        </Col>

        <Col md={7}>
          <h4>All Department Admins</h4>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin._id}>
                  <td>{index + 1}</td>
                  <td>{admin.username}</td>
                  <td>{admin.department}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SuperAdmin;
