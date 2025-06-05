import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-dark text-white">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100" style={{ zIndex: 1000 }}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <i className="bi bi-lightning-charge-fill text-warning me-2 fs-3"></i>
            <span className="fw-bold fs-4">DCMS</span>
          </a>
          <div className="ms-auto">
            <button className="btn btn-outline-light me-2" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="btn btn-warning" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-vh-100 d-flex align-items-center" style={{
        background: "linear-gradient(135deg, rgba(13, 17, 23, 0.95) 0%, rgba(33, 37, 43, 0.95) 100%), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4">Complaint Management System</h1>
              <p className="lead mb-4 opacity-75">
                A streamlined platform for students to submit and track complaints, and for administrators to efficiently manage and resolve issues.
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-warning btn-lg px-4 py-2" onClick={() => navigate("/login")}>
                  Get Started
                </button>
                <button className="btn btn-outline-light btn-lg px-4 py-2" onClick={() => navigate("/register")}>
                  Learn More
                </button>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block text-center">
              <img src="https://cdn-icons-png.flaticon.com/512/3588/3588614.png" alt="Complaint Management" className="img-fluid" style={{ maxHeight: "400px", filter: "drop-shadow(0 0 0.75rem rgba(255,255,255,0.2))" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-5" style={{ background: "#111827" }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h6 className="text-warning text-uppercase fw-bold mb-2">Features</h6>
            <h2 className="display-5 fw-bold mb-3">Everything You Need</h2>
            <p className="lead  mx-auto" style={{ maxWidth: "700px" }}>
              Our system provides a comprehensive solution for managing complaints with a user-friendly interface and powerful features.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card bg-dark h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <i className="bi bi-file-earmark-text text-primary fs-3"></i>
                  </div>
                  <h4 className="card-title">Easy Submission</h4>
                  <p className="card-text">Submit complaints with a simple form, including attachments and detailed descriptions.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-dark h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="rounded-circle bg-warning bg-opacity-10 p-3 d-inline-flex mb-3">
                    <i className="bi bi-bell text-warning fs-3"></i>
                  </div>
                  <h4 className="card-title">Real-time Updates</h4>
                  <p className="card-text">Receive notifications about the status of your complaints as they progress.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-dark h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex mb-3">
                    <i className="bi bi-shield-check text-info fs-3"></i>
                  </div>
                  <h4 className="card-title">Admin Dashboard</h4>
                  <p className="card-text">Administrators can efficiently manage complaints with a robust dashboard.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card bg-dark h-100 border-0 shadow-sm hover-lift">
                <div className="card-body p-4">
                  <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-flex mb-3">
                    <i className="bi bi-check-circle text-success fs-3"></i>
                  </div>
                  <h4 className="card-title">Status Tracking</h4>
                  <p className="card-text">Track the status of your complaints throughout the resolution process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <h6 className="text-warning text-uppercase fw-bold mb-2">Process</h6>
              <h2 className="display-5 fw-bold mb-4">How It Works</h2>
              <p className="lead  mb-4">
                Our complaint management process is designed to be straightforward and efficient, ensuring quick resolution of issues.
              </p>
              <img src="https://cdn-icons-png.flaticon.com/512/3273/3273666.png" alt="Process" className="img-fluid d-none d-lg-block" style={{ maxHeight: "200px", opacity: 0.8 }} />
            </div>
            <div className="col-lg-7">
              <div className="card bg-dark border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center fs-4 fw-bold" style={{width: "50px", height: "50px", minWidth: "50px"}}>
                      1
                    </div>
                    <div className="ms-4">
                      <h3>Submit a Complaint</h3>
                      <p className="mb-0">Log in to your student account, navigate to the dashboard, and fill out the complaint form with all relevant details.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card bg-dark border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center fs-4 fw-bold" style={{width: "50px", height: "50px", minWidth: "50px"}}>
                      2
                    </div>
                    <div className="ms-4">
                      <h3>Admin Review</h3>
                      <p className="mb-0">Administrators review the submitted complaints and update their status to "In Progress" once they begin working.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card bg-dark border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center fs-4 fw-bold" style={{width: "50px", height: "50px", minWidth: "50px"}}>
                      3
                    </div>
                    <div className="ms-4">
                      <h3>Resolution</h3>
                      <p className=" mb-0">Once the issue is resolved, the admin will mark the complaint as "Resolved" and you'll receive a notification.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-5" style={{ background: "linear-gradient(135deg, #1a1f2c 0%, #2d3748 100%)" }}>
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-3">Ready to Get Started?</h2>
              <p className="lead  mb-4">Join our platform today and experience a streamlined complaint management process.</p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-warning btn-lg px-4" onClick={() => navigate("/register")}>
                  Register Now
                </button>
                <button className="btn btn-outline-light btn-lg px-4" onClick={() => navigate("/login")}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 bg-black">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <i className="bi bi-lightning-charge-fill text-warning me-2 fs-4"></i>
                <span className="fw-bold fs-5">Complaint Management System</span>
              </div>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0 ">&copy; {new Date().getFullYear()} K.A.A.N.M.Sonawane Arts,Commers & Science / Computer Science Department</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;