import React from 'react';

const NotificationBell = ({ unreadCount = 0 }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <a href="/notifications" style={{
        fontSize: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s'
      }}>
        🔔
      </a>
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          backgroundColor: '#ef4444',
          color: 'white',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          animation: 'pulse 2s infinite'
        }}>
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default NotificationBell;
