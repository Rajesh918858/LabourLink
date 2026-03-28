import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { contractorApi } from '../services/index';

const ContractorDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await contractorApi.getDashboard();
      setDashboard(response.data.dashboard);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="container py-8">
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>Contractor Dashboard</h2>

      {dashboard && (
        <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card" style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)' }}>
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Total Jobs Posted</p>
            <p className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#2563eb' }}>{dashboard.stats.totalJobsPosted}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Active Jobs</p>
            <p className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#10b981' }}>{dashboard.stats.activeJobs}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }}>
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Completed Jobs</p>
            <p className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#9333ea' }}>{dashboard.stats.completedJobs}</p>
          </div>
          <div className="stat-card" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}>
            <p style={{ color: '#6b7280', fontWeight: '600' }}>Total Spent</p>
            <p className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#f59e0b' }}>₹{dashboard.stats.totalSpent}</p>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>Recent Jobs</h3>
        <a href="/post-job" className="btn btn-primary">Post New Job</a>
      </div>
    </div>
  );
};

export default ContractorDashboard;
