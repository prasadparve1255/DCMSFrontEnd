import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const DepartmentAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get("/api/users/department-admins", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setAdmins(res.data);
      } catch (err) {
        toast.error("Failed to fetch admins");
      }
    };

    fetchAdmins();
  }, [user]);

  const handleDelete = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await axios.delete(`/api/users/${adminId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setAdmins(admins.filter((admin) => admin._id !== adminId));
      toast.success("Admin deleted successfully");
    } catch (err) {
      toast.error("Failed to delete admin");
    }
  };

  return (
    <div>
      <h5 className="text-white">Department Admins</h5>
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.department}</td>
              <td>
                {/* Optional: Add edit logic later */}
                <Button variant="danger" size="sm" onClick={() => handleDelete(admin._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DepartmentAdmins;
