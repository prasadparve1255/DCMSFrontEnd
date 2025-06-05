import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Complaint Management System',
    siteDescription: 'A platform for managing student complaints',
    adminEmail: 'admin@example.com',
    maxFileSize: 5,
    allowRegistration: true,
    maintenanceMode: false
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newComplaintAlert: true,
    statusUpdateAlert: true,
    commentAlert: true,
    dailyDigest: false,
    weeklyReport: true
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordExpiry: 90,
    loginAttempts: 5,
    sessionTimeout: 30,
    twoFactorAuth: false,
    strongPassword: true
  });

  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'dark',
    primaryColor: '#0d6efd',
    secondaryColor: '#6c757d',
    fontSize: 'medium',
    sidebarCollapsed: false
  });

  // Handle general settings change
  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle notification settings change
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  // Handle security settings change
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle appearance settings change
  const handleAppearanceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppearanceSettings({
      ...appearanceSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Save settings
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="bg-dark min-vh-100 d-flex">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
          <button 
            className="btn btn-outline-light d-md-none me-2" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>
          <span className="navbar-brand fw-bold">Settings</span>
        </nav>

        {/* Settings Content */}
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card bg-dark border-secondary">
                <div className="card-header bg-secondary">
                  <h5 className="mb-0">Settings Menu</h5>
                </div>
                <div className="card-body p-0">
                  <div className="list-group list-group-flush bg-dark">
                    <button 
                      className={`list-group-item list-group-item-action bg-dark text-white border-secondary ${activeTab === 'general' ? 'active' : ''}`}
                      onClick={() => setActiveTab('general')}
                    >
                      <i className="bi bi-gear me-2"></i> General
                    </button>
                    <button 
                      className={`list-group-item list-group-item-action bg-dark text-white border-secondary ${activeTab === 'notifications' ? 'active' : ''}`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      <i className="bi bi-bell me-2"></i> Notifications
                    </button>
                    <button 
                      className={`list-group-item list-group-item-action bg-dark text-white border-secondary ${activeTab === 'security' ? 'active' : ''}`}
                      onClick={() => setActiveTab('security')}
                    >
                      <i className="bi bi-shield-lock me-2"></i> Security
                    </button>
                    <button 
                      className={`list-group-item list-group-item-action bg-dark text-white border-secondary ${activeTab === 'appearance' ? 'active' : ''}`}
                      onClick={() => setActiveTab('appearance')}
                    >
                      <i className="bi bi-palette me-2"></i> Appearance
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-9">
              <div className="card bg-dark border-secondary">
                <div className="card-header bg-secondary">
                  <h5 className="mb-0">
                    {activeTab === 'general' && 'General Settings'}
                    {activeTab === 'notifications' && 'Notification Settings'}
                    {activeTab === 'security' && 'Security Settings'}
                    {activeTab === 'appearance' && 'Appearance Settings'}
                  </h5>
                </div>
                <div className="card-body">
                  {/* General Settings */}
                  {activeTab === 'general' && (
                    <form>
                      <div className="mb-3">
                        <label htmlFor="siteName" className="form-label">Site Name</label>
                        <input
                          type="text"
                          className="form-control bg-dark text-white border-secondary"
                          id="siteName"
                          name="siteName"
                          value={generalSettings.siteName}
                          onChange={handleGeneralChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="siteDescription" className="form-label">Site Description</label>
                        <textarea
                          className="form-control bg-dark text-white border-secondary"
                          id="siteDescription"
                          name="siteDescription"
                          rows="2"
                          value={generalSettings.siteDescription}
                          onChange={handleGeneralChange}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="adminEmail" className="form-label">Admin Email</label>
                        <input
                          type="email"
                          className="form-control bg-dark text-white border-secondary"
                          id="adminEmail"
                          name="adminEmail"
                          value={generalSettings.adminEmail}
                          onChange={handleGeneralChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="maxFileSize" className="form-label">Max File Size (MB)</label>
                        <input
                          type="number"
                          className="form-control bg-dark text-white border-secondary"
                          id="maxFileSize"
                          name="maxFileSize"
                          value={generalSettings.maxFileSize}
                          onChange={handleGeneralChange}
                        />
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="allowRegistration"
                          name="allowRegistration"
                          checked={generalSettings.allowRegistration}
                          onChange={handleGeneralChange}
                        />
                        <label className="form-check-label" htmlFor="allowRegistration">Allow User Registration</label>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="maintenanceMode"
                          name="maintenanceMode"
                          checked={generalSettings.maintenanceMode}
                          onChange={handleGeneralChange}
                        />
                        <label className="form-check-label" htmlFor="maintenanceMode">Maintenance Mode</label>
                      </div>
                    </form>
                  )}

                  {/* Notification Settings */}
                  {activeTab === 'notifications' && (
                    <form>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="emailNotifications"
                          name="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label" htmlFor="emailNotifications">Enable Email Notifications</label>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="newComplaintAlert"
                          name="newComplaintAlert"
                          checked={notificationSettings.newComplaintAlert}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label" htmlFor="newComplaintAlert">New Complaint Alerts</label>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="statusUpdateAlert"
                          name="statusUpdateAlert"
                          checked={notificationSettings.statusUpdateAlert}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label" htmlFor="statusUpdateAlert">Status Update Alerts</label>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="commentAlert"
                          name="commentAlert"
                          checked={notificationSettings.commentAlert}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label" htmlFor="commentAlert">Comment Alerts</label>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="dailyDigest"
                          name="dailyDigest"
                          checked={notificationSettings.dailyDigest}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label" htmlFor="dailyDigest">Daily Digest</label>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="weeklyReport"
                          name="weeklyReport"
                          checked={notificationSettings.weeklyReport}
                          onChange={handleNotificationChange}
                        />
                        <label className="form-check-label" htmlFor="weeklyReport">Weekly Report</label>
                      </div>
                    </form>
                  )}

                  {/* Security Settings */}
                  {activeTab === 'security' && (
                    <form>
                      <div className="mb-3">
                        <label htmlFor="passwordExpiry" className="form-label">Password Expiry (days)</label>
                        <input
                          type="number"
                          className="form-control bg-dark text-white border-secondary"
                          id="passwordExpiry"
                          name="passwordExpiry"
                          value={securitySettings.passwordExpiry}
                          onChange={handleSecurityChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="loginAttempts" className="form-label">Max Login Attempts</label>
                        <input
                          type="number"
                          className="form-control bg-dark text-white border-secondary"
                          id="loginAttempts"
                          name="loginAttempts"
                          value={securitySettings.loginAttempts}
                          onChange={handleSecurityChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="sessionTimeout" className="form-label">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          className="form-control bg-dark text-white border-secondary"
                          id="sessionTimeout"
                          name="sessionTimeout"
                          value={securitySettings.sessionTimeout}
                          onChange={handleSecurityChange}
                        />
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="twoFactorAuth"
                          name="twoFactorAuth"
                          checked={securitySettings.twoFactorAuth}
                          onChange={handleSecurityChange}
                        />
                        <label className="form-check-label" htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="strongPassword"
                          name="strongPassword"
                          checked={securitySettings.strongPassword}
                          onChange={handleSecurityChange}
                        />
                        <label className="form-check-label" htmlFor="strongPassword">Require Strong Passwords</label>
                      </div>
                    </form>
                  )}

                  {/* Appearance Settings */}
                  {activeTab === 'appearance' && (
                    <form>
                      <div className="mb-3">
                        <label htmlFor="theme" className="form-label">Theme</label>
                        <select
                          className="form-select bg-dark text-white border-secondary"
                          id="theme"
                          name="theme"
                          value={appearanceSettings.theme}
                          onChange={handleAppearanceChange}
                        >
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                          <option value="blue">Blue</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="primaryColor" className="form-label">Primary Color</label>
                        <input
                          type="color"
                          className="form-control form-control-color bg-dark border-secondary"
                          id="primaryColor"
                          name="primaryColor"
                          value={appearanceSettings.primaryColor}
                          onChange={handleAppearanceChange}
                          title="Choose primary color"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="secondaryColor" className="form-label">Secondary Color</label>
                        <input
                          type="color"
                          className="form-control form-control-color bg-dark border-secondary"
                          id="secondaryColor"
                          name="secondaryColor"
                          value={appearanceSettings.secondaryColor}
                          onChange={handleAppearanceChange}
                          title="Choose secondary color"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="fontSize" className="form-label">Font Size</label>
                        <select
                          className="form-select bg-dark text-white border-secondary"
                          id="fontSize"
                          name="fontSize"
                          value={appearanceSettings.fontSize}
                          onChange={handleAppearanceChange}
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="sidebarCollapsed"
                          name="sidebarCollapsed"
                          checked={appearanceSettings.sidebarCollapsed}
                          onChange={handleAppearanceChange}
                        />
                        <label className="form-check-label" htmlFor="sidebarCollapsed">Sidebar Collapsed by Default</label>
                      </div>
                    </form>
                  )}

                  <div className="d-flex justify-content-end mt-4">
                    <button 
                      className="btn btn-primary"
                      onClick={handleSaveSettings}
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;