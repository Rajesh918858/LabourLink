import React from 'react';

const TrustBadge = ({ level = 'Platinum', trustScore = 4.85, verifiedJobs = 98, size = 'medium' }) => {
  const levels = {
    'Bronze': { color: '#CD7F32', emoji: '🥉', minJobs: 10 },
    'Silver': { color: '#C0C0C0', emoji: '🥈', minJobs: 25 },
    'Gold': { color: '#FFD700', emoji: '🥇', minJobs: 50 },
    'Platinum': { color: '#E5E8FF', emoji: '💎', minJobs: 100 }
  };

  const levelInfo = levels[level] || levels['Bronze'];

  const sizes = {
    'small': { fontSize: '0.8rem', padding: '0.25rem 0.5rem', badgeFontSize: '0.9rem' },
    'medium': { fontSize: '0.95rem', padding: '0.5rem 1rem', badgeFontSize: '1rem' },
    'large': { fontSize: '1.1rem', padding: '0.75rem 1.5rem', badgeFontSize: '1.25rem' }
  };

  const sizeInfo = sizes[size] || sizes['medium'];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      {/* Badge */}
      <span
        title={`${level} Verified - ${verifiedJobs} verified jobs, ${trustScore}/5 trust score`}
        style={{
          display: 'inline-block',
          backgroundColor: levelInfo.color,
          color: 'white',
          padding: sizeInfo.padding,
          borderRadius: '9999px',
          fontWeight: 'bold',
          fontSize: sizeInfo.badgeFontSize,
          cursor: 'pointer',
          boxShadow: `0 2px 4px ${levelInfo.color}40`
        }}
      >
        {"✅ " + level}
      </span>

      {/* Trust Score */}
      <span
        title={`${trustScore}/5.0 trust score based on ${verifiedJobs} verified jobs`}
        style={{
          fontSize: sizeInfo.fontSize,
          fontWeight: 'bold',
          color: levelInfo.color
        }}
      >
        ⭐ {trustScore}
      </span>
    </div>
  );
};

export default TrustBadge;
