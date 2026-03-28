import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const WorkerVerification = () => {
  const { user, userType } = useSelector(state => state.auth);

  const [worker] = useState({
    id: 1,
    name: 'Raj Kumar',
    skill: 'Carpenter & Mason',
    verificationLevel: 'Platinum',
    verifiedBadge: '✅ Verified Professional',
    trustScore: 4.85,
    yearsExperience: 10,
    totalJobsCompleted: 145,
    verifiedJobsCompleted: 98,
    totalEarnings: 12.5, // in lakhs
    averageRating: 4.8,
    reviewsCount: 143,
    phone: '9876543210',
    email: 'raj@example.com',
    joinedDate: 'January 2015',
    documents: [
      { id: 1, name: 'Aadhaar Card', verified: true, date: '2025-01-15' },
      { id: 2, name: 'PAN Card', verified: true, date: '2025-01-15' },
      { id: 3, name: 'Bank Account', verified: true, date: '2025-01-15' },
      { id: 4, name: 'Police Verification', verified: true, date: '2024-12-10' }
    ]
  });

  const [workProof] = useState([
    {
      id: 1,
      title: 'Residential Construction Project',
      location: 'Delhi',
      date: '2026-02-15',
      description: 'Complete house construction including foundation, walls, and roofing',
      beforeImage: '🏗️',
      afterImage: '🏠',
      clientName: 'Mr. Sharma',
      clientRating: 5,
      clientReview: 'Excellent work! Completed on time with highest quality.',
      jobValue: 8.5, // in lakhs
      duration: '45 days',
      team: 'Team of 5 workers',
      materials: 'Cement, Bricks, Steel, Concrete',
      verified: true,
      evidence: ['Photo Proof', 'Client Review', 'Payment Receipt'],
      tags: ['Construction', 'Masonry', 'Quality Work']
    },
    {
      id: 2,
      title: 'Commercial Building - Interior Carpentry',
      location: 'Mumbai',
      date: '2026-01-20',
      description: 'Custom wooden furniture and interior carpentry for office spaces',
      beforeImage: '🏢',
      afterImage: '✨',
      clientName: 'ABC Enterprises',
      clientRating: 4.8,
      clientReview: 'Very professional team. Great attention to detail.',
      jobValue: 6.2,
      duration: '30 days',
      team: 'Team of 3 workers',
      materials: 'Sheesham Wood, Plywood, Hardware',
      verified: true,
      evidence: ['5 Photos', 'Client Review', 'Payment Receipt'],
      tags: ['Carpentry', 'Interior Design', 'Commercial']
    },
    {
      id: 3,
      title: 'Apartment Renovation - Full Makeover',
      location: 'Pune',
      date: '2025-12-05',
      description: 'Complete apartment renovation including walls, flooring, and carpentry',
      beforeImage: '🪜',
      afterImage: '🎨',
      clientName: 'Mrs. Patel',
      clientRating: 4.9,
      clientReview: 'Outstanding quality! Would definitely hire again.',
      jobValue: 5.8,
      duration: '25 days',
      team: 'Team of 4 workers',
      materials: 'Paint, Tiles, Wood, Plaster',
      verified: true,
      evidence: ['8 Photos', 'Client Review', 'Payment Receipt'],
      tags: ['Renovation', 'Flooring', 'Painting']
    },
    {
      id: 4,
      title: 'Foundation Work - Industrial Building',
      location: 'Delhi',
      date: '2025-11-10',
      description: 'Complex foundation work for industrial facility',
      beforeImage: '⛏️',
      afterImage: '🏭',
      clientName: 'Industrial Corp Ltd',
      clientRating: 4.7,
      clientReview: 'Professional execution. Met all safety standards.',
      jobValue: 12.0,
      duration: '60 days',
      team: 'Team of 15 workers',
      materials: 'Concrete, Steel, Rebar',
      verified: true,
      evidence: ['12 Photos', 'Client Review', 'Payment Receipt', 'Safety Certificate'],
      tags: ['Industrial', 'Foundation', 'Heavy Construction']
    }
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedWork, setSelectedWork] = useState(null);

  // Verification Level Colors
  const getLevelColor = (level) => {
    const colors = {
      'Bronze': '#CD7F32',
      'Silver': '#C0C0C0',
      'Gold': '#FFD700',
      'Platinum': '#E5E8FF'
    };
    return colors[level] || '#2563eb';
  };

  const getLevelBgColor = (level) => {
    const colors = {
      'Bronze': '#FDE2E4',
      'Silver': '#F0F0F0',
      'Gold': '#FFFBF0',
      'Platinum': '#F0F3FF'
    };
    return colors[level] || '#F0F9FF';
  };

  return (
    <div className="container py-8">
      {/* Worker Header */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderTop: `4px solid ${getLevelColor(worker.verificationLevel)}`
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
          {/* Worker Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3.5rem' }}>👨‍💼</div>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
                  {worker.name}
                </h2>
                <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '0.5rem' }}>{worker.skill}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    backgroundColor: getLevelBgColor(worker.verificationLevel),
                    color: getLevelColor(worker.verificationLevel),
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    ✅ {worker.verificationLevel} Verified
                  </span>
                  <span style={{
                    backgroundColor: '#ecfdf5',
                    color: '#10b981',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    🎖️ {worker.yearsExperience} Years Experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Score Widget */}
          <div style={{
            backgroundColor: getLevelBgColor(worker.verificationLevel),
            borderRadius: '0.75rem',
            padding: '1.5rem',
            borderLeft: `4px solid ${getLevelColor(worker.verificationLevel)}`,
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.75rem' }}>🏆 Trust Score</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: getLevelColor(worker.verificationLevel), marginBottom: '0.5rem' }}>
              {worker.trustScore}/5.0
            </p>
            <div style={{ color: '#f59e0b', fontSize: '1rem', marginBottom: '0.75rem' }}>
              {'⭐'.repeat(Math.floor(worker.trustScore))}
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{worker.reviewsCount} verified reviews</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
          <div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Jobs</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2563eb' }}>{worker.totalJobsCompleted}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Verified Jobs</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#10b981' }}>{worker.verifiedJobsCompleted}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Earnings</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f59e0b' }}>₹{worker.totalEarnings}L+</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Member Since</p>
            <p style={{ fontSize: '1rem', fontWeight: '600', color: '#111827' }}>{worker.joinedDate}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', borderBottom: '2px solid #e5e7eb' }}>
        {['overview', 'workProof', 'documents', 'reviews'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              paddingBottom: '1rem',
              marginBottom: '-2px',
              borderBottom: activeTab === tab ? '3px solid #2563eb' : 'none',
              color: activeTab === tab ? '#2563eb' : '#6b7280',
              fontWeight: activeTab === tab ? 'bold' : '600',
              cursor: 'pointer',
              fontSize: '1rem',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'overview' && '📊 Overview'}
            {tab === 'workProof' && '📷 Work Proof (4)'}
            {tab === 'documents' && '📄 Verified Docs'}
            {tab === 'reviews' && '⭐ Reviews'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Verification Progress */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>🎖️ Verification Status</h3>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Identity Verified */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <p style={{ fontWeight: 'bold', color: '#111827' }}>Identity Verified</p>
                </div>
                <div style={{ backgroundColor: '#ecfdf5', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981' }} />
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.5rem' }}>Aadhaar, PAN, Bank Account verified</p>
              </div>

              {/* Work Experience Verified */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <p style={{ fontWeight: 'bold', color: '#111827' }}>Work Experience Proven</p>
                </div>
                <div style={{ backgroundColor: '#ecfdf5', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981' }} />
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.5rem' }}>{worker.verifiedJobsCompleted} jobs with photo proof & client reviews</p>
              </div>

              {/* Background Check */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <p style={{ fontWeight: 'bold', color: '#111827' }}>Background Check Passed</p>
                </div>
                <div style={{ backgroundColor: '#ecfdf5', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981' }} />
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.5rem' }}>Police verification completed on {worker.documents[3].date}</p>
              </div>

              {/* Skill Certifications */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✅</span>
                  <p style={{ fontWeight: 'bold', color: '#111827' }}>Skill Certifications</p>
                </div>
                <div style={{ backgroundColor: '#ecfdf5', height: '8px', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981' }} />
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.5rem' }}>Advanced Carpentry, Masonry, Safety Training certified</p>
              </div>
            </div>
          </div>

          {/* Verification Levels */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>📈 Verification Levels</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {['Bronze', 'Silver', 'Gold', 'Platinum'].map((level, idx) => {
                const isActive = level === worker.verificationLevel;
                return (
                  <div
                    key={level}
                    style={{
                      backgroundColor: getLevelBgColor(level),
                      border: `3px solid ${isActive ? getLevelColor(level) : '#e5e7eb'}`,
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      textAlign: 'center',
                      opacity: isActive ? 1 : 0.6
                    }}
                  >
                    <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      {['🥉', '🥈', '🥇', '💎'][idx]}
                    </p>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: getLevelColor(level), marginBottom: '0.5rem' }}>
                      {level}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      {[10, 25, 50, 100][idx]}+ verified jobs
                    </p>
                    {isActive && (
                      <span style={{
                        backgroundColor: getLevelColor(level),
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        fontWeight: 'bold',
                        fontSize: '0.85rem'
                      }}>
                        ✓ Current Level
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Work Proof Gallery */}
      {activeTab === 'workProof' && (
        <div>
          {selectedWork ? (
            // Work Detail View
            <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <button
                onClick={() => setSelectedWork(null)}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginBottom: '1.5rem'
                }}
              >
                ← Back to Gallery
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Before/After */}
                <div>
                  <p style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>Before Work</p>
                  <div style={{
                    fontSize: '6rem',
                    backgroundColor: '#fee2e2',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}>
                    {selectedWork.beforeImage}
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>After Work</p>
                  <div style={{
                    fontSize: '6rem',
                    backgroundColor: '#ecfdf5',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    textAlign: 'center',
                    marginBottom: '1rem'
                  }}>
                    {selectedWork.afterImage}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Project Duration</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827', marginBottom: '1rem' }}>{selectedWork.duration}</p>

                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Team Size</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827', marginBottom: '1rem' }}>{selectedWork.team}</p>

                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Project Value</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>₹{selectedWork.jobValue} Lakhs</p>
                </div>

                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Client Rating</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#f59e0b', marginBottom: '1rem' }}>
                    {'⭐'.repeat(Math.floor(selectedWork.clientRating))} {selectedWork.clientRating}
                  </p>

                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Client Name</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>{selectedWork.clientName}</p>

                  <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Completed Date</p>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>{selectedWork.date}</p>
                </div>
              </div>

              {/* Client Review */}
              <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '0.75rem', borderLeft: '4px solid #2563eb', marginBottom: '2rem' }}>
                <p style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>💬 Client Review</p>
                <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.6' }}>"{selectedWork.clientReview}"</p>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '1rem' }}>— {selectedWork.clientName}</p>
              </div>

              {/* Evidence Tags */}
              <div>
                <p style={{ fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>✅ Proof & Evidence</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {selectedWork.evidence.map((ev, idx) => (
                    <span key={idx} style={{
                      backgroundColor: '#ecfdf5',
                      color: '#10b981',
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      ✓ {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Gallery View
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {workProof.map(work => (
                <div
                  key={work.id}
                  onClick={() => setSelectedWork(work)}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'}
                >
                  {/* Before/After Preview */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '200px' }}>
                    <div style={{
                      backgroundColor: '#fee2e2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem'
                    }}>
                      {work.beforeImage}
                    </div>
                    <div style={{
                      backgroundColor: '#ecfdf5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem'
                    }}>
                      {work.afterImage}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ fontWeight: 'bold', fontSize: '1rem', color: '#111827', marginBottom: '0.25rem' }}>
                          {work.title}
                        </h4>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>📍 {work.location}</p>
                      </div>
                      <span style={{
                        backgroundColor: '#ecfdf5',
                        color: '#10b981',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        whiteSpace: 'nowrap'
                      }}>
                        ✅ Verified
                      </span>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ color: '#f59e0b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {'⭐'.repeat(Math.floor(work.clientRating))} {work.clientRating}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{work.clientName}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
                      <span>₹{work.jobValue}L</span>
                      <span>{work.duration}</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {work.tags.map((tag, idx) => (
                        <span key={idx} style={{
                          backgroundColor: '#f3f4f6',
                          color: '#6b7280',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Verified Documents */}
      {activeTab === 'documents' && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {worker.documents.map(doc => (
            <div
              key={doc.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                borderLeft: `4px solid ${doc.verified ? '#10b981' : '#ef4444'}`
              }}
            >
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '1rem', color: '#111827', marginBottom: '0.25rem' }}>
                  📄 {doc.name}
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Verified on {doc.date}</p>
              </div>
              <span style={{
                backgroundColor: '#ecfdf5',
                color: '#10b981',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                ✅ {doc.verified ? 'Verified' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {workProof.slice(0, 3).map(work => (
            <div key={work.id} style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '1rem', color: '#111827', marginBottom: '0.25rem' }}>
                    {work.clientName}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{work.title}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {'⭐'.repeat(Math.floor(work.clientRating))}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{work.date}</p>
                </div>
              </div>
              <p style={{ color: '#111827', fontSize: '0.95rem', lineHeight: '1.6' }}>{work.clientReview}</p>
            </div>
          ))}
        </div>
      )}

      {/* Info Section */}
      <div style={{
        backgroundColor: '#f0f9ff',
        borderRadius: '0.75rem',
        padding: '2rem',
        marginTop: '2rem',
        borderLeft: '4px solid #2563eb'
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
          🔒 How Verification Works
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>1. Identity Verification</p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Aadhaar, PAN, and Bank account verification with government authorities</p>
          </div>
          <div>
            <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>2. Work Photo Proof</p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Before/after photos of completed projects with client verification</p>
          </div>
          <div>
            <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>3. Client Reviews</p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Authentic feedback from verified clients who hired the worker</p>
          </div>
          <div>
            <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>4. Background Check</p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Police verification and safety certification to ensure trustworthiness</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerVerification;
