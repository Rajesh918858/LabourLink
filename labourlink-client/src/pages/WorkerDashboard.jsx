import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { workerApi } from '../services/index';

const WorkerDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await workerApi.getProfile();
      setProfile(response.data.worker);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="container py-8">
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>Worker Dashboard</h2>

      {profile && (
        <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card" style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)' }}>
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Completed Jobs</p>
            <p className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#2563eb' }}>{profile.completedJobs}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Average Rating</p>
            <p className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#10b981' }}>{profile.averageRating?.toFixed(1)}/5</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }}>
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Total Earnings</p>
            <p className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#9333ea' }}>₹{profile.totalEarnings}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Endorsements</p>
            <p className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#f59e0b' }}>{profile.endorsements?.length || 0}</p>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/jobs" className="btn btn-primary">Browse Jobs</a>
          <a href="/worker-profile" className="btn btn-secondary">View Profile</a>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
