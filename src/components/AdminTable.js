import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import EditAdminModal from "./EditAdminModal";

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchAdmins = async () => {
    try {
      const { data } = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAdmins(data.filter((user) => user.role === "admin"));
    } catch (err) {
      toast.error("Failed to fetch admins");
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await axios.delete(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Admin deleted");
        fetchAdmins();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const groupedByDept = admins.reduce((acc, admin) => {
    acc[admin.department] = acc[admin.department] || [];
    acc[admin.department].push(admin);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-light mb-4">Admins by Department</h2>
      {Object.entries(groupedByDept).map(([dept, deptAdmins]) => (
        <div key={dept} className="mb-4">
          <h4 className="text-info">{dept} Department</h4>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deptAdmins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    {/* Future: Add Edit button here */}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteHandler(admin._id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedAdmin(admin);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
      <EditAdminModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        admin={selectedAdmin}
        onAdminUpdated={fetchAdmins}
      />
    </div>
  );
};

export default AdminTable;
