// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('student'); // Default role
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, role })
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.message || 'Registration failed');
//       } else {
//         toast.success('Registration successful! Please login.');
//         navigate('/login');
//       }
//     } catch (err) {
//       toast.error('Network error');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit} className="bg-dark p-4 rounded">
//         <div className="mb-3">
//           <label>Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={e => setName(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//             disabled={loading}
//           />
//         </div>
//         <div className="mb-3">
//           <label>Role</label>
//           <select
//             className="form-select"
//             value={role}
//             onChange={e => setRole(e.target.value)}
//             disabled={loading}
//           >
//             <option value="student">Student</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button className="btn btn-success w-100" type="submit" disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    studentId: '',
    department: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (formData.role === 'student' && (!formData.studentId || !formData.department)) {
        toast.error('Student ID and Department are required for student accounts');
        setIsLoading(false);
        return;
      }

      // Backend API call for registration (context function)
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role
        // Optionally: pass studentId, department if your backend supports
      );

      if (result.success) {
        toast.success('Registration successful!');
        if (result.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-dark text-white border-secondary shadow-lg">
              <div className="card-header bg-secondary text-center py-3">
                <h4 className="mb-0">Register</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border-secondary"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control bg-dark text-white border-secondary"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control bg-dark text-white border-secondary"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control bg-dark text-white border-secondary"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Account Type</label>
                    <select
                      className="form-select bg-dark text-white border-secondary"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  {formData.role === 'student' && (
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="studentId" className="form-label">Student ID</label>
                        <input
                          type="text"
                          className="form-control bg-dark text-white border-secondary"
                          id="studentId"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleChange}
                          placeholder="Enter student ID"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="department" className="form-label">Department</label>
                        <input
                          type="text"
                          className="form-control bg-dark text-white border-secondary"
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          placeholder="Enter department"
                        />
                      </div>
                    </div>
                  )}
                  <div className="d-grid mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary py-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Registering...
                        </span>
                      ) : 'Register'}
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <p className="mb-0">Already have an account? <a href="/login" className="text-primary">Login</a></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;