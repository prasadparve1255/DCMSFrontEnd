import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AdminComplaintView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) {
          setComplaint(null);
        } else {
          const data = await res.json();
          setComplaint(data);
        }
      } catch (err) {
        setComplaint(null);
      }
      setLoading(false);
    };
    fetchComplaint();
  }, [id]);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (!complaint) return <div className="container mt-5">Complaint not found.</div>;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="card bg-dark text-white">
        <div className="card-header">
          <h3>Complaint Details</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">{complaint.subject}</h5>
          <p className="card-text"><strong>Description:</strong> {complaint.description}</p>
          <p className="card-text"><strong>Status:</strong> {complaint.status}</p>
          <p className="card-text"><strong>Submitted At:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
          <hr />
          <h5>Student Info</h5>
          <p><strong>Name:</strong> {complaint.student?.name}</p>
          <p><strong>Email:</strong> {complaint.student?.email}</p>
          <p><strong>Role:</strong> {complaint.student?.role}</p>
          <hr />
          <h5>Attachment</h5>
          {complaint.attachment ? (
            <a
              href={`http://localhost:5000/uploads/${complaint.attachment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info"
            >
              View Attachment
            </a>
          ) : (
            <span>No attachment</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminComplaintView;