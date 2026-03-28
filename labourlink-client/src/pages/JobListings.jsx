import React, { useEffect, useState } from 'react';
import { jobApi } from '../services/index';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('open');

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobApi.getAllJobs(filter);
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>Available Jobs</h2>
      
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('open')}
          className={`btn ${filter === 'open' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Open
        </button>
        <button
          onClick={() => setFilter('in-progress')}
          className={`btn ${filter === 'in-progress' ? 'btn-primary' : 'btn-secondary'}`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="loading">No jobs found</p>
      ) : (
        <div className="grid">
          {jobs.map(job => (
            <div key={job._id} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-description">{job.description.substring(0, 100)}...</p>
              
              <div className="job-details">
                <p><strong>Location:</strong> {job.location?.city || 'N/A'}</p>
                <p><strong>Type:</strong> {job.jobType}</p>
                <p className="job-rate"><strong>Rate:</strong> ₹{job.budget?.dailyRate || 'N/A'}/day</p>
              </div>

              <div className="job-actions">
                <a href={`/job/${job._id}`} className="btn btn-primary">View Details</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListings;
