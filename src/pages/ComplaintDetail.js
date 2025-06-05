import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function ComplaintDetail() {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Fetch complaint details from localStorage
    const fetchComplaint = () => {
      try {
        setLoading(true);
        const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
        const foundComplaint = storedComplaints.find(c => c.id === parseInt(id));
        
        if (foundComplaint) {
          setComplaint(foundComplaint);
        } else {
          toast.error('Complaint not found');
          navigate('/student-dashboard');
        }
      } catch (error) {
        console.error('Error fetching complaint:', error);
        toast.error('Error loading complaint details');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id, navigate]);

  const handleBack = () => {
    navigate('/student-dashboard');
  };

  if (loading) {
    return (
      <div className="bg-dark min-vh-100 text-white d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="bg-dark min-vh-100 text-white d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h3>Complaint not found</h3>
          <button className="btn btn-primary mt-3" onClick={handleBack}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark min-vh-100 text-white">
      <nav className="navbar navbar-dark bg-dark shadow-sm px-4">
        <button className="btn btn-outline-secondary" onClick={handleBack}>
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>
        <span className="navbar-brand mb-0 h1">Complaint Details</span>
        <div style={{ width: '100px' }}></div> {/* Spacer for centering */}
      </nav>

      <div className="container py-4">
        <div className="card bg-dark border-secondary">
          <div className="card-header bg-secondary d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Complaint #{complaint.id}</h4>
            <span className={`badge ${
              complaint.status === 'Pending' ? 'bg-warning text-dark' : 
              complaint.status === 'Resolved' ? 'bg-success' : 
              complaint.status === 'Rejected' ? 'bg-danger' : 'bg-info'
            }`}>
              {complaint.status}
            </span>
          </div>
          <div className="card-body">
            <h5 className="card-title">{complaint.subject}</h5>
            <p className="text-muted">
              Submitted on {new Date(complaint.createdAt).toLocaleString()}
            </p>
            <hr className="border-secondary" />
            <div className="mb-4">
              <h6 className="text-secondary mb-3">Description</h6>
              <p className="card-text">{complaint.description}</p>
            </div>
            
            {complaint.attachment && (
              <div className="mb-4">
                <h6 className="text-secondary mb-3">Attachment</h6>
                <div className="d-flex align-items-center">
                  <i className="bi bi-file-earmark-text fs-4 me-2"></i>
                  <span>{complaint.attachment}</span>
                  <button 
                    className="btn btn-sm btn-outline-info ms-3"
                    onClick={() => alert(`Viewing: ${complaint.attachment}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            )}
            
            {complaint.response && (
              <div className="mt-4">
                <h6 className="text-secondary mb-3">Admin Response</h6>
                <div className="card bg-dark border-secondary">
                  <div className="card-body">
                    <p className="card-text">{complaint.response}</p>
                    <p className="text-muted mb-0">
                      Response added on {new Date(complaint.responseDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetail;