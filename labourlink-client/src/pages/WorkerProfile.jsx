import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { workerApi } from '../services/index';

const WorkerProfile = () => {
  const { user } = useSelector(state => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    bio: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await workerApi.getProfile();
      setProfile(response.data.worker);
      setFormData({
        name: response.data.worker.name || '',
        email: response.data.worker.email || '',
        phone: response.data.worker.phone || '',
        experience: response.data.worker.experience || '',
        bio: response.data.worker.bio || ''
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
      await workerApi.updateProfile(formData);
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
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Personal Information</h3>
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
                <label className="form-label">Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="form-input"
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
              <p><strong>Email:</strong> {profile?.email}</p>
              <p><strong>Phone:</strong> {profile?.phone}</p>
              <p><strong>Experience:</strong> {profile?.experience || 'Not specified'} years</p>
              <p><strong>Bio:</strong> {profile?.bio || 'No bio added'}</p>
              <p><strong>Verified:</strong> {profile?.verified ? '✓ Yes' : '✗ No'}</p>
            </div>
          )}
        </div>
      </div>

      {profile?.skills && profile.skills.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Skills</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {profile.skills.map(skill => (
                <span
                  key={skill}
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerProfile;
