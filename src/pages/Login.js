import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Attempting login with:", email);
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      // Update auth context
      login(user);

      toast.success("Login successful!");
      console.log("User role:", user.role);

      // Redirect based on role
      if (user.role === "superadmin") {
        console.log("Redirecting to superadmin dashboard");
        navigate("/superadmin-dashboard");
      } else if (user.role === "admin") {
        console.log("Redirecting to admin dashboard");
        navigate("/admin-dashboard");
      } else {
        console.log("Redirecting to student dashboard");
        navigate("/student-dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      const msg = err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card bg-dark text-white border-secondary shadow-lg">
              <div className="card-header bg-secondary text-center py-3">
                <h4 className="mb-0">Login</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      ref={emailRef}
                      type="email"
                      className="form-control bg-dark text-white border-secondary"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control bg-dark text-white border-secondary"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary py-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging in...
                        </span>
                      ) : 'Login'}
                    </button>
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

export default Login;