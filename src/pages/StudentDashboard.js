// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import axios from 'axios';

// function StudentDashboard() {
//   const [subject, setSubject] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState(null);
//   const [complaints, setComplaints] = useState([]);
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [selectedComplaint, setSelectedComplaint] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editSubject, setEditSubject] = useState('');
//   const [editDescription, setEditDescription] = useState('');
//   const [editFile, setEditFile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/complaints/my', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setComplaints(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error('Error fetching complaints:', error);
//         toast.error('Failed to load complaints');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchComplaints();
//   }, []);

//   const handleCloseModal = () => {
//     setSelectedComplaint(null);
//     setEditMode(false);
//   };

//   const handleViewProfile = () => {
//     navigate('/profile');
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
//       formData.append('subject', subject);
//       formData.append('description', description);
//       if (file) {
//         formData.append('attachment', file);
//       }
      
//       await axios.post('http://localhost:5000/api/complaints', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       toast.success('Complaint submitted successfully!');
      
//       // Refresh complaints list
//       const response = await axios.get('http://localhost:5000/api/complaints/my', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setComplaints(Array.isArray(response.data) ? response.data : []);
      
//       // Reset form
//       setSubject('');
//       setDescription('');
//       setFile(null);
//     } catch (error) {
//       console.error('Error submitting complaint:', error);
//       toast.error('Failed to submit complaint');
//     }
//   };

//   // Stats for cards
//   const total = complaints.length;
//   const resolved = complaints.filter(c => c.status === "Resolved").length;
//   const pending = complaints.filter(c => c.status === "Pending").length;
//   const inProgress = complaints.filter(c => c.status === "In Progress").length;

//   if (loading) {
//     return (
//       <div className="bg-dark min-vh-100 text-white d-flex justify-content-center align-items-center">
//         <div className="spinner-border text-light" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-dark min-vh-100 text-white">
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4 py-2">
//         <Sidebar />
//         <span className="navbar-brand fw-bold fs-4">
//           <i className="bi bi-person-circle me-2 text-warning"></i>
//           Student Dashboard
//         </span>
//         <div className="ms-auto d-flex align-items-center gap-3">
//           <div className="dropdown">
//             <button 
//               className="btn btn-dark dropdown-toggle d-flex align-items-center" 
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <img 
//                 src={currentUser?.avatar || "https://i.pravatar.cc/32"} 
//                 alt={`${currentUser?.name || 'User'}'s profile`}
//                 className="rounded-circle me-2" 
//                 width="32" 
//                 height="32" 
//               />
//               <span className="d-none d-sm-inline">{currentUser?.name || 'User'}</span>
//             </button>
//             <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
//               <li>
//                 <button 
//                   className="dropdown-item d-flex align-items-center" 
//                   onClick={handleViewProfile}
//                 >
//                   <i className="bi bi-person-circle me-2"></i>
//                   View Profile
//                 </button>
//               </li>
//               <li><hr className="dropdown-divider bg-secondary" /></li>
//               <li>
//                 <button 
//                   className="dropdown-item d-flex align-items-center text-danger" 
//                   onClick={handleLogout}
//                 >
//                   <i className="bi bi-box-arrow-right me-2"></i>
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Stats Cards */}
//       <div className="container py-4">
//         <div className="row g-3 mb-4">
//           <div className="col-6 col-md-3">
//             <div className="card bg-primary text-white shadow rounded-4 h-100">
//               <div className="card-body d-flex align-items-center">
//                 <i className="bi bi-collection fs-1 me-3"></i>
//                 <div>
//                   <div className="fs-6">Total Complaints</div>
//                   <div className="fs-4 fw-bold">{total}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-6 col-md-3">
//             <div className="card bg-success text-white shadow rounded-4 h-100">
//               <div className="card-body d-flex align-items-center">
//                 <i className="bi bi-check-circle fs-1 me-3"></i>
//                 <div>
//                   <div className="fs-6">Resolved</div>
//                   <div className="fs-4 fw-bold">{resolved}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-6 col-md-3">
//             <div className="card bg-warning text-dark shadow rounded-4 h-100">
//               <div className="card-body d-flex align-items-center">
//                 <i className="bi bi-hourglass-split fs-1 me-3"></i>
//                 <div>
//                   <div className="fs-6">Pending</div>
//                   <div className="fs-4 fw-bold">{pending}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-6 col-md-3">
//             <div className="card bg-info text-white shadow rounded-4 h-100">
//               <div className="card-body d-flex align-items-center">
//                 <i className="bi bi-arrow-repeat fs-1 me-3"></i>
//                 <div>
//                   <div className="fs-6">In Progress</div>
//                   <div className="fs-4 fw-bold">{inProgress}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Complaint Form */}
//         <div className="row">
//           <div className="col-lg-6 mb-4">
//             <div className="card bg-dark border-secondary shadow rounded-4">
//               <div className="card-header bg-secondary rounded-top-4">
//                 <h4 className="mb-0"><i className="bi bi-pencil-square me-2"></i>Submit a Complaint</h4>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="subject" className="form-label">Subject</label>
//                     <input 
//                       type="text" 
//                       className="form-control bg-dark text-white border-secondary" 
//                       id="subject"
//                       value={subject}
//                       onChange={e => setSubject(e.target.value)}
//                       required 
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="description" className="form-label">Description</label>
//                     <textarea 
//                       className="form-control bg-dark text-white border-secondary" 
//                       id="description"
//                       rows="4"
//                       value={description}
//                       onChange={e => setDescription(e.target.value)}
//                       required
//                     ></textarea>
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="attachment" className="form-label">Attachment (optional)</label>
//                     <input 
//                       type="file" 
//                       className="form-control bg-dark text-white border-secondary" 
//                       id="attachment"
//                       onChange={e => setFile(e.target.files[0])}
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-warning fw-bold px-4">
//                     <i className="bi bi-send me-2"></i>Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>

//           {/* Complaints Table */}
//           <div className="col-lg-6 mb-4">
//             <div className="card bg-dark border-secondary shadow rounded-4 h-100">
//               <div className="card-header bg-secondary rounded-top-4 d-flex justify-content-between align-items-center">
//                 <h4 className="mb-0"><i className="bi bi-list-ul me-2"></i>My Complaints</h4>
//               </div>
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-dark table-striped mb-0">
//                     <thead>
//                       <tr>
//                         <th>Subject</th>
//                         <th>Status</th>
//                         <th>Date</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {complaints.map(complaint => (
//                         <tr 
//                           key={complaint._id}
//                           className="complaint-row"
//                         >
//                           <td>{complaint.subject}</td>
//                           <td>
//                             <span className={`badge ${
//                               complaint.status === 'Pending' ? 'bg-warning text-dark' : 
//                               complaint.status === 'Resolved' ? 'bg-success' : 
//                               complaint.status === 'Rejected' ? 'bg-danger' : 'bg-info'
//                             }`}>
//                               {complaint.status}
//                             </span>
//                           </td>
//                           <td>{new Date(complaint.createdAt).toLocaleString()}</td>
//                           <td>
//                             <button
//                               className="btn btn-sm btn-outline-light"
//                               onClick={() => setSelectedComplaint(complaint)}
//                             >
//                               <i className="bi bi-eye"></i> View
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {complaints.length === 0 && (
//                         <tr>
//                           <td colSpan="4" className="text-center py-3">No complaints submitted yet.</td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>  

//       {/* Complaint Detail Modal */}
//       {selectedComplaint && (
//         <div className="modal fade show" style={{display: 'block', background: 'rgba(0,0,0,0.7)'}} tabIndex="-1">
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content bg-dark text-white border-secondary">
//               <div className="modal-header border-secondary">
//                 <h5 className="modal-title">
//                   <i className="bi bi-info-circle me-2"></i>
//                   Complaint Details
//                 </h5>
//                 <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
//               </div>
//               <div className="modal-body">
//                 <p><strong>Subject:</strong> {selectedComplaint.subject}</p>
//                 <p><strong>Status:</strong> <span className={`badge ${
//                   selectedComplaint.status === 'Pending' ? 'bg-warning text-dark' : 
//                   selectedComplaint.status === 'Resolved' ? 'bg-success' : 
//                   selectedComplaint.status === 'Rejected' ? 'bg-danger' : 'bg-info'
//                 }`}>{selectedComplaint.status}</span></p>
//                 <p><strong>Date:</strong> {new Date(selectedComplaint.createdAt).toLocaleString()}</p>
//                 <p><strong>Description:</strong><br />{selectedComplaint.description}</p>
//                 <p>
//                   <strong>Attachment:</strong> {selectedComplaint.attachment ? (
//                     <a href={`http://localhost:5000/uploads/${selectedComplaint.attachment}`} 
//                        target="_blank" 
//                        rel="noopener noreferrer"
//                        className="btn btn-sm btn-info ms-2">
//                       View Attachment
//                     </a>
//                   ) : (
//                     <span className="text-muted ms-2">No file</span>
//                   )}
//                 </p>
//               </div>
//               <div className="modal-footer border-secondary">
//                 <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         .complaint-row:hover {
//           background-color: rgba(255, 255, 255, 0.08) !important;
//           transition: background 0.2s;
//         }
//         .modal {
//           z-index: 2000;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default StudentDashboard;






import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

function StudentDashboard() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/complaints/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaints(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        toast.error('Failed to load complaints');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('description', description);
      if (file) formData.append('attachment', file);

      await axios.post('http://localhost:5000/api/complaints', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Complaint submitted successfully!');
      const res = await axios.get('http://localhost:5000/api/complaints/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);
      setSubject('');
      setDescription('');
      setFile(null);
    } catch (error) {
      toast.error('Failed to submit complaint');
    }
  };

  const handleViewProfile = () => navigate('/profile');
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;

  if (loading) {
    return (
      <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center text-white">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark min-vh-100 text-white">
      <Sidebar />
      {/* Navbar with Profile Dropdown */}
      {/* <nav className="navbar navbar-dark bg-dark shadow-sm px-4 py-2"> */}
        {/* <span className="navbar-brand fw-bold fs-4">
          <i className="bi bi-person-circle me-2 text-warning"></i> Student Dashboard
        </span> */}
        <div className="ms-auto ">
          <div className="dropdown ">
            <button className="btn btn-dark dropdown-toggle " data-bs-toggle="dropdown">
              <img src={currentUser?.avatar || 'https://i.pravatar.cc/32'} alt="Profile" className="rounded-circle me-2" width="32" height="32" />
              {currentUser?.name || 'User'}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
              <li><button className="dropdown-item" onClick={handleViewProfile}><i className="bi bi-person me-2"></i>View Profile</button></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
            </ul>
          </div>
        </div>
      {/* </nav> */}

      {/* Stats Summary */}
      <div className="container py-4">
        <div className="row g-3">
          {[
            { label: 'Total', value: total, icon: 'collection', color: 'primary' },
            { label: 'Resolved', value: resolved, icon: 'check-circle', color: 'success' },
            { label: 'Pending', value: pending, icon: 'hourglass-split', color: 'warning', textColor: 'text-dark' },
            { label: 'In Progress', value: inProgress, icon: 'arrow-repeat', color: 'info' },
          ].map((item, idx) => (
            <div key={idx} className="col-sm-6 col-md-3">
              <div className={`card bg-${item.color} ${item.textColor || 'text-white'} shadow h-100 rounded-4`}>
                <div className="card-body d-flex align-items-center">
                  <i className={`bi bi-${item.icon} fs-1 me-3`}></i>
                  <div>
                    <div>{item.label}</div>
                    <h4 className="fw-bold mb-0">{item.value}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="row mt-4">
          {/* Complaint Submission Form */}
          <div className="col-lg-6 mb-4">
            <div className="card bg-dark border-secondary shadow rounded-4">
              <div className="card-header bg-secondary text-white rounded-top-4">
                <h5 className="mb-0"><i className="bi bi-pencil-square me-2"></i> Submit Complaint</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input type="text" className="form-control bg-dark text-white border-secondary" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control bg-dark text-white border-secondary" id="description" rows="4" value={description} onChange={e => setDescription(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="attachment" className="form-label">Attachment</label>
                    <input type="file" className="form-control bg-dark text-white border-secondary" id="attachment" onChange={e => setFile(e.target.files[0])} />
                  </div>
                  <button type="submit" className="btn btn-warning fw-bold px-4">
                    <i className="bi bi-send me-2"></i> Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Complaint History Table */}
          <div className="col-lg-6 mb-4">
            <div className="card bg-dark border-secondary shadow rounded-4">
              <div className="card-header bg-secondary text-white rounded-top-4">
                <h5 className="mb-0"><i className="bi bi-list-ul me-2"></i> Complaint History</h5>
              </div>
              <div className="card-body table-responsive">
                <table className="table table-dark table-hover table-bordered align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Subject</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center text-muted">No complaints found</td>
                      </tr>
                    ) : (
                      complaints.map((c, index) => (
                        <tr key={c._id}>
                          <td>{index + 1}</td>
                          <td>{c.subject}</td>
                          <td>
                            <span className={`badge bg-${c.status === 'Resolved' ? 'success' : c.status === 'Pending' ? 'warning text-dark' : 'info'}`}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
