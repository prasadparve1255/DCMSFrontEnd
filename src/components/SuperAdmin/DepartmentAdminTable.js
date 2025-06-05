import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const DepartmentAdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/superadmin/admins', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAdmins(response.data);
    } catch (error) {
      toast.error('Failed to fetch admins');
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/superadmin/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Admin deleted successfully');
      fetchAdmins();
    } catch (error) {
      toast.error('Failed to delete admin');
      console.error('Error deleting admin:', error);
    }
  };

  // Group admins by department
  const adminsByDepartment = admins.reduce((acc, admin) => {
    const dept = admin.department || 'Unassigned';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(admin);
    return acc;
  }, {});

  if (loading) {
    return <div className="text-center py-4 text-white">Loading admins...</div>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-white mb-3">Department Admins</h3>
      
      {Object.keys(adminsByDepartment).length === 0 ? (
        <div className="alert alert-info">No department admins found.</div>
      ) : (
        Object.entries(adminsByDepartment).map(([department, deptAdmins]) => (
          <div key={department} className="mb-4">
            <h5 className="text-white">
              <Badge bg="secondary" className="me-2">{deptAdmins.length}</Badge>
              {department} Department
            </h5>
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deptAdmins.map(admin => (
                  <tr key={admin._id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDelete(admin._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))
      )}
    </div>
  );
};

export default DepartmentAdminTable;