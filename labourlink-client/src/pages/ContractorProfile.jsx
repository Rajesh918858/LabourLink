import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { contractorApi } from '../services/index';

const ContractorProfile = () => {
  const { user } = useSelector(state => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    bio: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await contractorApi.getProfile();
      setProfile(response.data.contractor);
      setFormData({
        name: response.data.contractor.name || '',
        email: response.data.contractor.email || '',
        phone: response.data.contractor.phone || '',
        companyName: response.data.contractor.companyName || '',
        bio: response.data.contractor.bio || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await contractorApi.updateProfile(formData);
      setProfile({ ...profile, ...formData });
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return <p className="loading">Loading profile...</p>;
  }

  return (
    <div className="container py-8">
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>My Profile</h2>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Company Information</h3>
          <button
            onClick={() => setEditing(!editing)}
            className={`btn ${editing ? 'btn-secondary' : 'btn-primary'}`}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="card-body">
          {editing ? (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="4"
                ></textarea>
              </div>

              <button onClick={handleSave} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <p><strong>Name:</strong> {profile?.name}</p>
              <p><strong>Company:</strong> {profile?.companyName}</p>
              <p><strong>Email:</strong> {profile?.email}</p>
              <p><strong>Phone:</strong> {profile?.phone}</p>
              <p><strong>Bio:</strong> {profile?.bio || 'No bio added'}</p>
              <p><strong>Verified:</strong> {profile?.verified ? '✓ Yes' : '✗ No'}</p>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Statistics</h3>
        </div>
        <div className="card-body" style={{ display: 'grid', gap: '1rem' }}>
          <p><strong>Total Jobs Posted:</strong> {profile?.jobsPosted || 0}</p>
          <p><strong>Active Jobs:</strong> {profile?.activeJobs || 0}</p>
          <p><strong>Completed Jobs:</strong> {profile?.completedJobs || 0}</p>
          <p><strong>Average Rating:</strong> {profile?.averageRating?.toFixed(1) || 'N/A'}/5</p>
        </div>
      </div>
    </div>
  );
};

export default ContractorProfile;
