import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [file, setFile] = useState(null);

  if (!user) {
    return (
      <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <p>No user data available. Please log in.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let avatarFilename = formData.avatar;

    try {
      if (file) {
        const uploadData = new FormData();
        uploadData.append('avatar', file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const uploadJson = await uploadRes.json();
        avatarFilename = uploadJson.filename;
      }

      const success = await updateProfile({
        ...formData,
        avatar: avatarFilename,
      });

      if (success) {
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } else {
        toast.error('Error updating profile');
      }
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Profile update error:', error);
    }
  };

  const avatarUrl = formData.avatar && !formData.avatar.startsWith('data:')
    ? `/uploads/${formData.avatar}`
    : formData.avatar || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjEyOCIgZmlsbD0iIzAwNzBmMyIvPjxjaXJjbGUgY3g9IjEyOCIgY3k9IjEwMCIgcj0iNjAiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjEwLjUgMTk4LjVjLTIwLjY2NyAyNS42NjctNTAuMTY3IDQwLTg4LjUgNDNzLTY4LjUtMTAuMzMzLTkwLjUtNDNjMC0yMCAyMC0zNSA0Mi0zNSA0LjY2NyAwIDM4LjY2NyAxNSA0NiAxNXM0MS4zMzMtMTUgNDYtMTVjMjIgMCA0NSAxNSA0NSAzNXoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=";

  return (
    <div className="bg-dark text-white min-vh-100 p-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card bg-dark border-secondary">
              <div className="card-header bg-secondary d-flex justify-content-between align-items-center">
                <h3 className="mb-0">User Profile</h3>
                {!isEditing && (
                  <button 
                    className="btn btn-sm btn-outline-light" 
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="bi bi-pencil me-1"></i> Edit
                  </button>
                )}
              </div>
              <div className="card-body">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="text-center mb-4">
                      <img 
                        src={avatarUrl}
                        alt="Profile"
                        className="rounded-circle mb-3"
                        width="150"
                        height="150"
                      />
                      <div>
                        <input
                          type="file"
                          className="form-control bg-dark text-white border-secondary"
                          id="avatarFile"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        disabled
                      />
                      <div className="form-text text-muted">Email cannot be changed</div>
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            name: user.name || '',
                            email: user.email || '',
                            avatar: user.avatar || ''
                          });
                          setFile(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <img 
                        src={user.avatar ? `/uploads/${user.avatar}` : avatarUrl}
                        alt="Profile"
                        className="rounded-circle"
                        width="150"
                        height="150"
                      />
                    </div>

                    <div className="mb-3">
                      <h5 className="text-muted">Name</h5>
                      <p className="fs-4">{user.name || 'Not set'}</p>
                    </div>

                    <div className="mb-3">
                      <h5 className="text-muted">Email</h5>
                      <p className="fs-4">{user.email || 'Not set'}</p>
                    </div>

                    <div className="mb-3">
                      <h5 className="text-muted">Role</h5>
                      <p className="fs-4 text-capitalize">{user.role || 'Not set'}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
