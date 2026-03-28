import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { contractorApi } from '../services/index';
import TrustBadge from '../components/TrustBadge';

const ContractorDashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Job Management State
  const [jobs, setJobs] = useState([
    { id: 1, title: 'House Construction - Foundation Work', location: 'Delhi', category: 'Construction', salary: 50000, status: 'active', postedDate: '2026-03-25', applicants: 12, description: 'Need experienced masons for foundation work on residential project' },
    { id: 2, title: 'Electrical Wiring - Office Building', location: 'Pune', category: 'Technical', salary: 35000, status: 'active', postedDate: '2026-03-24', applicants: 8, description: 'Complete electrical installation in new office complex' },
    { id: 3, title: 'Interior Painting - Apartment', location: 'Mumbai', category: 'Household', salary: 25000, status: 'paused', postedDate: '2026-03-22', applicants: 5, description: 'Professional painting for 3BHK apartment' },
    { id: 4, title: 'Heavy Equipment Operation', location: 'Delhi', category: 'Heavy', salary: 60000, status: 'completed', postedDate: '2026-03-18', applicants: 6, description: 'Operate JCB and excavators for construction site' }
  ]);

  const [jobApplicants, setJobApplicants] = useState({
    1: [
      { id: 101, workerName: 'Vikram Sharma', skills: 'Masonry, Carpentry', rating: 4.7, experience: '8 years', phone: '9876543210', status: 'pending', jobsCompleted: 24, verificationLevel: 'Silver', trustScore: 4.7, verifiedJobs: 22 },
      { id: 102, workerName: 'Deepak Roy', skills: 'Masonry', rating: 4.5, experience: '5 years', phone: '9876543211', status: 'pending', jobsCompleted: 15, verificationLevel: 'Bronze', trustScore: 4.5, verifiedJobs: 14 },
      { id: 103, workerName: 'Sunil Kumar', skills: 'Masonry, Painting', rating: 4.9, experience: '10 years', phone: '9876543212', status: 'accepted', jobsCompleted: 32, verificationLevel: 'Gold', trustScore: 4.9, verifiedJobs: 30 }
    ],
    2: [
      { id: 201, workerName: 'Prakash Singh', skills: 'Electrical Wiring', rating: 4.6, experience: '6 years', phone: '9876543220', status: 'pending', jobsCompleted: 18, verificationLevel: 'Silver', trustScore: 4.6, verifiedJobs: 16 },
      { id: 202, workerName: 'Akhil Verma', skills: 'Electrical, Cable', rating: 4.4, experience: '4 years', phone: '9876543221', status: 'rejected', jobsCompleted: 10, verificationLevel: 'Bronze', trustScore: 4.4, verifiedJobs: 9 }
    ],
    3: [
      { id: 301, workerName: 'Arjun Patel', skills: 'Painting, Decoration', rating: 4.5, experience: '7 years', phone: '9876543230', status: 'pending', jobsCompleted: 22, verificationLevel: 'Silver', trustScore: 4.5, verifiedJobs: 20 },
      { id: 302, workerName: 'Ramesh Singh', skills: 'Painting', rating: 4.2, experience: '3 years', phone: '9876543231', status: 'pending', jobsCompleted: 8, verificationLevel: 'Bronze', trustScore: 4.2, verifiedJobs: 7 }
    ],
    4: [
      { id: 401, workerName: 'Rajesh Kumar', skills: 'Heavy Machinery', rating: 4.8, experience: '12 years', phone: '9876543240', status: 'pending', jobsCompleted: 35, verificationLevel: 'Gold', trustScore: 4.8, verifiedJobs: 33 }
    ]
  });

  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicants, setShowApplicants] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', salary: '', description: '' });
  const [chatWith, setChatWith] = useState(null);

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

  // ==================== JOB MANAGEMENT HANDLERS ====================
  const handleEditJob = (job) => {
    setEditingJob(job.id);
    setEditForm({ title: job.title, salary: job.salary, description: job.description });
  };

  const handleSaveJob = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, title: editForm.title, salary: editForm.salary, description: editForm.description }
        : job
    ));
    setEditingJob(null);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
      alert('Job deleted successfully!');
    }
  };

  const handlePauseJob = (jobId) => {
    setJobs(jobs.map(job =>
      job.id === jobId
        ? { ...job, status: job.status === 'paused' ? 'active' : 'paused' }
        : job
    ));
  };

  const handleCompleteJob = (jobId) => {
    if (window.confirm('Mark this job as completed?')) {
      setJobs(jobs.map(job =>
        job.id === jobId ? { ...job, status: 'completed' } : job
      ));
      alert('Job marked as completed!');
    }
  };

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setShowApplicants(true);
  };

  const handleAcceptApplicant = (jobId, applicantId) => {
    setJobApplicants(prev => ({
      ...prev,
      [jobId]: prev[jobId].map(app =>
        app.id === applicantId ? { ...app, status: 'accepted' } : app
      )
    }));
    alert('Applicant accepted! You can now chat and hire.');
  };

  const handleRejectApplicant = (jobId, applicantId) => {
    setJobApplicants(prev => ({
      ...prev,
      [jobId]: prev[jobId].map(app =>
        app.id === applicantId ? { ...app, status: 'rejected' } : app
      )
    }));
    alert('Applicant rejected.');
  };

  const handleChatApplicant = (applicant) => {
    setChatWith(applicant);
    alert(`Chat window opened with ${applicant.workerName}\n\nYou can discuss job details, rates, and schedule before hiring.`);
  };

  // Sample Analytics Data
  const jobPerformanceData = {
    completed: 24,
    pending: 8,
    cancelled: 2
  };

  const monthlySpending = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 62000 },
    { month: 'Mar', amount: 38000 },
    { month: 'Apr', amount: 71000 },
    { month: 'May', amount: 55000 },
    { month: 'Jun', amount: 89000 }
  ];

  const topWorkers = [
    { id: 1, name: 'Raj Kumar', rating: 4.8, jobsCompleted: 15, skills: 'Carpenter, Mason' },
    { id: 2, name: 'Prakash Singh', rating: 4.6, jobsCompleted: 12, skills: 'Electrician, Plumber' },
    { id: 3, name: 'Arjun Patel', rating: 4.5, jobsCompleted: 10, skills: 'Painter, Decorator' },
    { id: 4, name: 'Vikram Sharma', rating: 4.4, jobsCompleted: 9, skills: 'Welder, Technician' }
  ];

  const revenueMetrics = {
    totalBudget: 360000,
    totalSpent: 260000,
    remaining: 100000,
    averageJobCost: 10833,
    spentPercentage: (260000 / 360000) * 100
  };

  // Worker Management Data
  const applications = [
    { id: 1, workerName: 'Ramesh Gupta', position: 'Carpenter', appliedDate: '2026-03-27', status: 'pending', skills: 'Carpentry, Woodwork' },
    { id: 2, workerName: 'Suresh Kumar', position: 'Electrician', appliedDate: '2026-03-26', status: 'pending', skills: 'Electrical Wiring, Cable Installation' },
    { id: 3, workerName: 'Mohan Singh', position: 'Plumber', appliedDate: '2026-03-25', status: 'pending', skills: 'Plumbing, Water Systems' },
    { id: 4, workerName: 'Arun Patel', position: 'Painter', appliedDate: '2026-03-24', status: 'pending', skills: 'Interior & Exterior Painting' }
  ];

  const shortlistedWorkers = [
    { id: 1, name: 'Raj Kumar', position: 'Carpenter', rating: 4.8, jobsCompleted: 15, profileImage: '👨‍💼', lastWorked: '2 days ago' },
    { id: 2, name: 'Prakash Singh', position: 'Electrician', rating: 4.6, jobsCompleted: 12, profileImage: '👨‍🔧', lastWorked: '5 days ago' },
    { id: 3, name: 'Arjun Patel', position: 'Painter', rating: 4.5, jobsCompleted: 10, profileImage: '👷', lastWorked: '1 week ago' }
  ];

  const workerReviews = [
    { id: 1, workerName: 'Vikram Sharma', rating: 4.7, review: 'Excellent welding work, very professional and punctual.', jobTitle: 'Metal Fabrication', date: '2026-03-20' },
    { id: 2, workerName: 'Deepak Singh', rating: 4.4, review: 'Good quality work, communication could be better.', jobTitle: 'House Construction', date: '2026-03-18' },
    { id: 3, workerName: 'Sunil Kumar', rating: 4.9, review: 'Outstanding attention to detail, delivered ahead of schedule!', jobTitle: 'Painting Service', date: '2026-03-15' },
    { id: 4, workerName: 'Akhil Verma', rating: 3.8, review: 'Average work, some rework was needed.', jobTitle: 'Plumbing Repair', date: '2026-03-12' }
  ];

  const favoriteWorkers = [
    { id: 1, name: 'Raj Kumar', position: 'Carpenter', timesHired: 15, avgRating: 4.8, totalEarnings: 1.2, lastHired: '2 days ago' },
    { id: 2, name: 'Prakash Singh', position: 'Electrician', timesHired: 12, avgRating: 4.6, totalEarnings: 0.95, lastHired: '5 days ago' },
    { id: 3, name: 'Arjun Patel', position: 'Painter', timesHired: 10, avgRating: 4.5, totalEarnings: 0.85, lastHired: '1 week ago' },
    { id: 4, name: 'Vikram Sharma', position: 'Welder', timesHired: 8, avgRating: 4.7, totalEarnings: 0.72, lastHired: '10 days ago' }
  ];

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="container py-8">
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>📊 Contractor Analytics Dashboard</h2>

      {/* Main KPI Cards */}
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

      {/* 1️⃣ JOB PERFORMANCE CHART */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>📈 Job Performance Overview</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Pie Chart Representation */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="200" height="200" style={{ marginBottom: '1rem' }}>
              <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="30" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="30" 
                strokeDasharray={`${(jobPerformanceData.completed / (jobPerformanceData.completed + jobPerformanceData.pending + jobPerformanceData.cancelled)) * 502.65} 502.65`}
                strokeDashoffset="0" />
              <text x="100" y="105" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#111827">
                {jobPerformanceData.completed}
              </text>
              <text x="100" y="125" textAnchor="middle" fontSize="12" fill="#6b7280">Completed</text>
            </svg>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ backgroundColor: '#ecfdf5', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #10b981' }}>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✅ Completed Jobs</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{jobPerformanceData.completed}</p>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.5rem' }}>{((jobPerformanceData.completed / (jobPerformanceData.completed + jobPerformanceData.pending + jobPerformanceData.cancelled)) * 100).toFixed(1)}% Success Rate</p>
            </div>

            <div style={{ backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b' }}>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>⏳ Pending Jobs</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{jobPerformanceData.pending}</p>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.5rem' }}>In Progress</p>
            </div>

            <div style={{ backgroundColor: '#fee2e2', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #ef4444' }}>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>❌ Cancelled Jobs</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{jobPerformanceData.cancelled}</p>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.5rem' }}>Not Completed</p>
            </div>

            <div style={{ backgroundColor: '#eff6ff', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #3b82f6' }}>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📊 Total Jobs</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>{jobPerformanceData.completed + jobPerformanceData.pending + jobPerformanceData.cancelled}</p>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.5rem' }}>All Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2️⃣ SPENDING ANALYTICS - Monthly Spending Graph */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>💰 Monthly Spending Trend</h3>
        
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '250px', padding: '1rem 0', borderBottom: '2px solid #e5e7eb' }}>
          {monthlySpending.map((data, idx) => {
            const maxAmount = Math.max(...monthlySpending.map(m => m.amount));
            const barHeight = (data.amount / maxAmount) * 200;
            
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '40px',
                  height: `${barHeight}px`,
                  backgroundColor: '#2563eb',
                  borderRadius: '0.25rem 0.25rem 0 0',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }} 
                title={`₹${data.amount.toLocaleString()}`}
                />
                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#111827' }}>{data.month}</p>
                <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>₹{(data.amount / 1000).toFixed(0)}K</p>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Average Monthly Spending</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0284c7' }}>₹{(monthlySpending.reduce((sum, m) => sum + m.amount, 0) / monthlySpending.length).toLocaleString()}</p>
          </div>
          <div style={{ backgroundColor: '#ecfdf5', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Highest Spending</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>₹{Math.max(...monthlySpending.map(m => m.amount)).toLocaleString()}</p>
          </div>
          <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Lowest Spending</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>₹{Math.min(...monthlySpending.map(m => m.amount)).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 3️⃣ WORKER PERFORMANCE RATING */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>⭐ Top Performing Workers</h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {topWorkers.map((worker, idx) => (
            <div key={worker.id} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gap: '1rem',
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              borderLeft: `4px solid ${['#2563eb', '#10b981', '#9333ea', '#f59e0b'][idx]}`
            }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Worker Name</p>
                <p style={{ fontWeight: 'bold', color: '#111827' }}>#{idx + 1} {worker.name}</p>
              </div>
              
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Rating</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>{worker.rating}</p>
                  <p style={{ color: '#6b7280' }}>{'⭐'.repeat(Math.floor(worker.rating))}</p>
                </div>
              </div>
              
              <div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Jobs Completed</p>
                <p style={{ fontWeight: 'bold', color: '#111827' }}>{worker.jobsCompleted} jobs</p>
              </div>

              <div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Skills</p>
                <p style={{ fontSize: '0.85rem', color: '#111827' }}>{worker.skills}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4️⃣ REVENUE REPORT - Budget Tracking */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>💵 Budget & Revenue Report</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Budget Progress */}
          <div>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Budget Usage</p>
            <div style={{ backgroundColor: '#e5e7eb', height: '30px', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{
                width: `${revenueMetrics.spentPercentage}%`,
                height: '100%',
                backgroundColor: '#2563eb',
                transition: 'width 0.3s'
              }} />
            </div>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>₹{revenueMetrics.totalSpent.toLocaleString()} of ₹{revenueMetrics.totalBudget.toLocaleString()} ({revenueMetrics.spentPercentage.toFixed(1)}%)</p>
          </div>

          {/* Remaining Budget */}
          <div>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Remaining Budget</p>
            <div style={{ backgroundColor: '#e5e7eb', height: '30px', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{
                width: `${100 - revenueMetrics.spentPercentage}%`,
                height: '100%',
                backgroundColor: '#10b981',
                transition: 'width 0.3s'
              }} />
            </div>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>₹{revenueMetrics.remaining.toLocaleString()} remaining</p>
          </div>
        </div>

        {/* Revenue Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #2563eb' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Budget Allocated</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2563eb' }}>₹{revenueMetrics.totalBudget.toLocaleString()}</p>
          </div>

          <div style={{ backgroundColor: '#fef3c7', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Spent</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f59e0b' }}>₹{revenueMetrics.totalSpent.toLocaleString()}</p>
          </div>

          <div style={{ backgroundColor: '#ecfdf5', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #10b981' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Remaining Budget</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#10b981' }}>₹{revenueMetrics.remaining.toLocaleString()}</p>
          </div>

          <div style={{ backgroundColor: '#fce7f3', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #ec4899' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Avg Job Cost</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#ec4899' }}>₹{revenueMetrics.averageJobCost.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Recent Jobs Section */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>📋 Job Management ({jobs.length} Total)</h3>
          <a href="/post-job" className="btn btn-primary" style={{ display: 'inline-block', padding: '0.75rem 1.5rem' }}>+ Post New Job</a>
        </div>

        {/* Job List */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {jobs.map((job) => (
            <div key={job.id} style={{
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              borderLeft: `4px solid ${job.status === 'active' ? '#10b981' : job.status === 'paused' ? '#f59e0b' : '#6b7280'}`,
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
            }}>
              {/* Job Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', marginBottom: '1rem', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>{job.title}</p>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: job.status === 'active' ? '#dcfce7' : job.status === 'paused' ? '#fef3c7' : '#e5e7eb',
                      color: job.status === 'active' ? '#15803d' : job.status === 'paused' ? '#92400e' : '#374151',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {job.status === 'active' ? '🟢 Active' : job.status === 'paused' ? '⏸️ Paused' : '✅ Completed'}
                    </span>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{job.description}</p>
                </div>

                {/* Stats */}
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>₹{job.salary.toLocaleString()}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{job.location} • {job.postedDate}</p>
                </div>

                {/* Applicants Badge */}
                <div style={{
                  backgroundColor: '#eff6ff',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.375rem',
                  textAlign: 'center',
                  borderLeft: '3px solid #2563eb'
                }}>
                  <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2563eb' }}>{jobApplicants[job.id]?.length || 0}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>Applicants</p>
                </div>
              </div>

              {/* Edit Form (if editing) */}
              {editingJob === job.id && (
                <div style={{
                  backgroundColor: '#eff6ff',
                  padding: '1.5rem',
                  borderRadius: '0.375rem',
                  marginBottom: '1rem',
                  border: '1px solid #bfdbfe'
                }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>✏️ Edit Job Details</p>
                  
                  <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ color: '#6b7280', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Job Title</label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #ccc',
                          borderRadius: '0.375rem',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ color: '#6b7280', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Salary (₹)</label>
                      <input
                        type="number"
                        value={editForm.salary}
                        onChange={(e) => setEditForm({ ...editForm, salary: parseInt(e.target.value) })}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #ccc',
                          borderRadius: '0.375rem',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ color: '#6b7280', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Description</label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #ccc',
                          borderRadius: '0.375rem',
                          fontSize: '0.95rem',
                          minHeight: '80px'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleSaveJob(job.id)}
                      style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      ✓ Save Changes
                    </button>
                    <button
                      onClick={() => setEditingJob(null)}
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                <button
                  onClick={() => handleViewApplicants(job)}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                >
                  👀 View Applicants
                </button>

                {job.status !== 'completed' && (
                  <>
                    <button
                      onClick={() => handleEditJob(job)}
                      style={{
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handlePauseJob(job.id)}
                      style={{
                        backgroundColor: job.status === 'paused' ? '#10b981' : '#f59e0b',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      {job.status === 'paused' ? '▶️ Resume' : '⏸️ Pause'}
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleCompleteJob(job.id)}
                  disabled={job.status === 'completed'}
                  style={{
                    backgroundColor: job.status === 'completed' ? '#d1d5db' : '#10b981',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    cursor: job.status === 'completed' ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                >
                  ✅ Complete
                </button>

                <button
                  onClick={() => handleDeleteJob(job.id)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== APPLICANTS MODAL ==================== */}
      {showApplicants && selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '2rem',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflow: 'auto',
            width: '100%',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
                  📥 Applicants for: {selectedJob.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total: {jobApplicants[selectedJob.id]?.length || 0} applicants</p>
              </div>
              <button
                onClick={() => setShowApplicants(false)}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}
              >
                ✕ Close
              </button>
            </div>

            {/* Applicants List */}
            <div style={{ display: 'grid', gap: '1rem' }}>
              {jobApplicants[selectedJob.id] && jobApplicants[selectedJob.id].map((applicant) => (
                <div key={applicant.id} style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  borderLeft: `4px solid ${applicant.status === 'accepted' ? '#10b981' : applicant.status === 'rejected' ? '#ef4444' : '#3b82f6'}`,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr auto',
                  gap: '1.5rem',
                  alignItems: 'center'
                }}>
                  {/* Worker Info */}
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827', marginBottom: '0.5rem' }}>👤 {applicant.workerName}</p>
                    
                    {/* Trust Badge */}
                    <div style={{ marginBottom: '1rem' }}>
                      <TrustBadge 
                        level={applicant.verificationLevel} 
                        trustScore={applicant.trustScore}
                        verifiedJobs={applicant.verifiedJobs}
                        size="small"
                      />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                      <div>
                        <p style={{ color: '#6b7280' }}>Skills</p>
                        <p style={{ fontWeight: '600', color: '#111827' }}>{applicant.skills}</p>
                      </div>
                      <div>
                        <p style={{ color: '#6b7280' }}>Experience</p>
                        <p style={{ fontWeight: '600', color: '#111827' }}>{applicant.experience}</p>
                      </div>
                      <div>
                        <p style={{ color: '#6b7280' }}>Rating</p>
                        <p style={{ fontWeight: '600', color: '#f59e0b' }}>⭐ {applicant.rating}</p>
                      </div>
                      <div>
                        <p style={{ color: '#6b7280' }}>Jobs Completed</p>
                        <p style={{ fontWeight: '600', color: '#2563eb' }}>{applicant.jobsCompleted}</p>
                      </div>
                    </div>

                    <p style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.75rem' }}>📞 {applicant.phone}</p>
                  </div>

                  {/* Profile Preview Card */}
                  <div style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <p style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>👁️ Profile Preview</p>
                    
                    <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Name:</span>
                        <span style={{ fontWeight: '600', color: '#111827' }}>{applicant.workerName}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Rating:</span>
                        <span style={{ fontWeight: '600', color: '#f59e0b' }}>{applicant.rating}/5.0</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Experience:</span>
                        <span style={{ fontWeight: '600', color: '#111827' }}>{applicant.experience}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Status:</span>
                        <span style={{
                          fontWeight: '600',
                          color: applicant.status === 'accepted' ? '#10b981' : applicant.status === 'rejected' ? '#ef4444' : '#f59e0b',
                          textTransform: 'uppercase'
                        }}>
                          {applicant.status === 'accepted' ? '✅ Accepted' : applicant.status === 'rejected' ? '❌ Rejected' : '⏳ Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {applicant.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleAcceptApplicant(selectedJob.id, applicant.id)}
                          style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                          }}
                        >
                          ✅ Accept
                        </button>

                        <button
                          onClick={() => handleChatApplicant(applicant)}
                          style={{
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                          }}
                        >
                          💬 Chat First
                        </button>

                        <button
                          onClick={() => handleRejectApplicant(selectedJob.id, applicant.id)}
                          style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                          }}
                        >
                          ❌ Reject
                        </button>
                      </>
                    ) : applicant.status === 'accepted' ? (
                      <>
                        <button
                          onClick={() => handleChatApplicant(applicant)}
                          style={{
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                          }}
                        >
                          💬 Message
                        </button>
                        <button
                          style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                          }}
                        >
                          💼 Hire Now
                        </button>
                      </>
                    ) : (
                      <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: '600', textAlign: 'center', padding: '0.75rem' }}>
                        ❌ Rejected
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {!jobApplicants[selectedJob.id] || jobApplicants[selectedJob.id].length === 0 && (
                <div style={{
                  backgroundColor: '#f3f4f6',
                  padding: '2rem',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#6b7280', fontSize: '1rem' }}>No applicants yet. Share your job posting to attract workers!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* ==================== WORKER MANAGEMENT SECTION ==================== */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>👥 Worker Management</h2>

        {/* 1️⃣ APPLICATIONS RECEIVED */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>📬 Applications Received ({applications.length})</h3>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {applications.map((app) => (
              <div key={app.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: '1rem',
                padding: '1.5rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #3b82f6',
                alignItems: 'center'
              }}>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Worker Name</p>
                  <p style={{ fontWeight: 'bold', color: '#111827' }}>{app.workerName}</p>
                </div>
                
                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Position Applied</p>
                  <p style={{ fontWeight: '600', color: '#111827' }}>{app.position}</p>
                </div>

                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Skills</p>
                  <p style={{ fontSize: '0.9rem', color: '#111827' }}>{app.skills}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>Accept</button>
                  <button style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2️⃣ SHORTLISTED WORKERS */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>✅ Shortlisted Workers ({shortlistedWorkers.length})</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {shortlistedWorkers.map((worker) => (
              <div key={worker.id} style={{
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                borderTop: '4px solid #10b981',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2.5rem' }}>{worker.profileImage}</div>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>{worker.name}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{worker.position}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ backgroundColor: '#fef3c7', padding: '0.75rem', borderRadius: '0.375rem' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>Rating</p>
                    <p style={{ fontWeight: 'bold', color: '#f59e0b' }}>⭐ {worker.rating}</p>
                  </div>
                  <div style={{ backgroundColor: '#ecfdf5', padding: '0.75rem', borderRadius: '0.375rem' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>Jobs Done</p>
                    <p style={{ fontWeight: 'bold', color: '#10b981' }}>{worker.jobsCompleted}</p>
                  </div>
                </div>

                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem' }}>Last worked: {worker.lastWorked}</p>

                <button style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>Hire Again</button>
              </div>
            ))}
          </div>
        </div>

        {/* 3️⃣ WORKER RATINGS & REVIEWS */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>⭐ Worker Ratings & Reviews</h3>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {workerReviews.map((review) => (
              <div key={review.id} style={{
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                borderLeft: '4px solid #f59e0b'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>{review.workerName}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{review.jobTitle}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>⭐ {review.rating}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>{review.date}</p>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '0.375rem',
                  borderLeft: '3px solid #f59e0b',
                  marginBottom: '1rem'
                }}>
                  <p style={{ color: '#111827', fontSize: '0.95rem', lineHeight: '1.5' }}>"{review.review}"</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{
                    backgroundColor: '#ec4899',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>👍 Helpful</button>
                  <button style={{
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>Report</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4️⃣ FAVORITE WORKERS */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>❤️ Favorite Workers - Repeat Hires ({favoriteWorkers.length})</h3>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {favoriteWorkers.map((worker, idx) => (
              <div key={worker.id} style={{
                display: 'grid',
                gridTemplateColumns: '0.5fr 1fr 1fr 1fr 1fr 1fr',
                gap: '1rem',
                padding: '1.5rem',
                backgroundColor: idx % 2 === 0 ? '#f9fafb' : '#ffffff',
                borderRadius: '0.5rem',
                borderLeft: `4px solid ${['#ec4899', '#f59e0b', '#10b981', '#2563eb'][idx % 4]}`,
                alignItems: 'center'
              }}>
                <div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>#{idx + 1}</p>
                </div>

                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Name</p>
                  <p style={{ fontWeight: 'bold', color: '#111827' }}>{worker.name}</p>
                </div>

                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Position</p>
                  <p style={{ fontWeight: '600', color: '#111827' }}>{worker.position}</p>
                </div>

                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Times Hired</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#2563eb' }}>{worker.timesHired}x</p>
                </div>

                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Avg Rating</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#f59e0b' }}>⭐ {worker.avgRating}</p>
                </div>

                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Total Paid</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#10b981' }}>₹{(worker.totalEarnings * 100000).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#ecfdf5', padding: '1.5rem', borderRadius: '0.5rem', marginTop: '1.5rem', borderLeft: '4px solid #10b981' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>💡 Tip</p>
            <p style={{ color: '#111827' }}>Your favorite workers have completed an average of {Math.round(favoriteWorkers.reduce((sum, w) => sum + w.timesHired, 0) / favoriteWorkers.length)} jobs each. Keep them engaged for consistent quality work!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;
