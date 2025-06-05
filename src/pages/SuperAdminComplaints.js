import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";

const SuperAdminComplaints = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchComplaints = async () => {
      const res = await axios.get("/api/complaints/by-department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data);
    };

    fetchComplaints();
  }, []);

  return (
    <div className="container mt-4 text-light">
      <h3>Complaints by Department</h3>
      {Object.entries(data).map(([dept, complaints]) => (
        <Card key={dept} className="mb-4 bg-dark text-white shadow">
          <Card.Header as="h5">{dept}</Card.Header>
          <Card.Body>
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Submitted By</th>
                  <th>Assigned Admin</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c._id}>
                    <td>{c._id}</td>
                    <td>{c.title}</td>
                    <td>{c.status}</td>
                    <td>{c.user?.name}</td>
                    <td>{c.admin?.name || "Unassigned"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SuperAdminComplaints;
