import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const { user, userType } = useSelector(state => state.auth);
  
  const [notifications, setNotifications] = useState([
    // New Applicant Alerts
    {
      id: 1,
      type: 'applicant',
      title: '👤 New Applicant',
      message: 'Raj Kumar applied for "House Construction - Foundation Work"',
      timestamp: '5 minutes ago',
      read: false,
      icon: '📥',
      color: '#2563eb',
      action: { text: 'View Applications', link: '/contractor-dashboard' }
    },
    {
      id: 2,
      type: 'applicant',
      title: '👤 New Applicant',
      message: 'Vikram Sharma applied for "Electrical Wiring - Office Building"',
      timestamp: '15 minutes ago',
      read: false,
      icon: '📥',
      color: '#2563eb',
      action: { text: 'View Job', link: '/contractor-dashboard' }
    },
    {
      id: 3,
      type: 'applicant',
      title: '👤 New Applicant',
      message: 'Suresh Kumar applied for "Interior Painting - Apartment"',
      timestamp: '1 hour ago',
      read: true,
      icon: '📥',
      color: '#2563eb',
      action: { text: 'Review' }
    },
    
    // Job Completed Alerts
    {
      id: 4,
      type: 'completed',
      title: '✅ Job Completed',
      message: 'Raj Kumar completed "Metal Fabrication" job. Please review and approve.',
      timestamp: '2 hours ago',
      read: false,
      icon: '✅',
      color: '#10b981',
      action: { text: 'Review & Approve', link: '/contractor-dashboard' }
    },
    {
      id: 5,
      type: 'completed',
      title: '✅ Job Completed',
      message: 'Prakash Singh marked "Electrical Wiring - Office Building" as done.',
      timestamp: '4 hours ago',
      read: false,
      icon: '✅',
      color: '#10b981',
      action: { text: 'Rate Worker' }
    },
    {
      id: 6,
      type: 'completed',
      title: '✅ Job Completed',
      message: 'Your project "House Construction" is now 75% complete!',
      timestamp: '1 day ago',
      read: true,
      icon: '✅',
      color: '#10b981',
      action: { text: 'View Progress' }
    },
    
    // Payment Reminders
    {
      id: 7,
      type: 'payment',
      title: '💰 Payment Reminder',
      message: 'Payment due to Raj Kumar for completed "Carpentry Work" - ₹15,000',
      timestamp: '3 hours ago',
      read: false,
      icon: '💳',
      color: '#f59e0b',
      urgent: true,
      action: { text: 'Pay Now', link: '/payments' }
    },
    {
      id: 8,
      type: 'payment',
      title: '💰 Payment Reminder',
      message: 'Budget utilization: You have spent 75% of allocated budget',
      timestamp: '6 hours ago',
      read: true,
      icon: '💳',
      color: '#f59e0b',
      action: { text: 'View Budget' }
    },
    {
      id: 9,
      type: 'payment',
      title: '⚠️ Overdue Payment',
      message: 'Payment to Vikram Sharma is 2 days overdue. Please pay ₹12,500 immediately.',
      timestamp: '1 day ago',
      read: false,
      icon: '⚠️',
      color: '#ef4444',
      urgent: true,
      action: { text: 'Pay Immediately' }
    },
    
    // Other Alerts
    {
      id: 10,
      type: 'message',
      title: '💬 New Message',
      message: 'Suresh Kumar: "I can start the job this weekend"',
      timestamp: '2 days ago',
      read: true,
      icon: '💬',
      color: '#9333ea',
      action: { text: 'Reply' }
    }
  ]);

  const [filterType, setFilterType] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    const typeMatch = filterType === 'all' || notif.type === filterType;
    const readMatch = !showUnreadOnly || !notif.read;
    return typeMatch && readMatch;
  });

  // Count unread by type
  const unreadCount = {
    applicant: notifications.filter(n => n.type === 'applicant' && !n.read).length,
    completed: notifications.filter(n => n.type === 'completed' && !n.read).length,
    payment: notifications.filter(n => n.type === 'payment' && !n.read).length,
    total: notifications.filter(n => !n.read).length
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handlePlaySound = () => {
    // Simulate notification sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>🔔 Notifications</h2>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>Stay updated with real-time alerts</p>
        </div>
        {unreadCount.total > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            ✓ Mark All as Read
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{
          backgroundColor: '#eff6ff',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          borderLeft: '4px solid #2563eb',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📥 New Applicants</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>{unreadCount.applicant}</p>
        </div>

        <div style={{
          backgroundColor: '#ecfdf5',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          borderLeft: '4px solid #10b981',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✅ Jobs Completed</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{unreadCount.completed}</p>
        </div>

        <div style={{
          backgroundColor: '#fef3c7',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          borderLeft: '4px solid #f59e0b',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>💰 Payments</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{unreadCount.payment}</p>
        </div>

        <div style={{
          backgroundColor: '#f5f3ff',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          borderLeft: '4px solid #9333ea',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📬 Total Unread</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9333ea' }}>{unreadCount.total}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem' }}>Filter by Type</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['all', 'applicant', 'completed', 'payment'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  style={{
                    backgroundColor: filterType === type ? '#2563eb' : '#f3f4f6',
                    color: filterType === type ? 'white' : '#111827',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    textTransform: 'capitalize'
                  }}
                >
                  {type === 'all' ? '📋 All' : type === 'applicant' ? '📥 Applicants' : type === 'completed' ? '✅ Completed' : '💰 Payments'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ color: '#6b7280', fontWeight: '600' }}>Unread Only</span>
            </label>
          </div>
        </div>

        {/* Sound Settings */}
        <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={handlePlaySound}
            style={{
              backgroundColor: '#9333ea',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}
          >
            🔔 Test Sound
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
            <span style={{ color: '#6b7280', fontWeight: '600' }}>Sound Notifications Enabled</span>
          </label>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredNotifications.length > 0 ? filteredNotifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => !notif.read && handleMarkAsRead(notif.id)}
            style={{
              backgroundColor: notif.read ? 'white' : '#f0fafb',
              border: `2px solid ${notif.read ? '#e5e7eb' : notif.color}`,
              borderRadius: '0.75rem',
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '1.5rem',
              alignItems: 'start',
              cursor: 'pointer',
              transition: 'all 0.3s',
              opacity: notif.read ? 0.7 : 1,
              boxShadow: !notif.read ? `0 4px 8px ${notif.color}20` : 'none'
            }}
          >
            {/* Icon & Badge */}
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: notif.urgent ? `${notif.color}20` : `${notif.color}10`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              position: 'relative',
              flexShrink: 0
            }}>
              {notif.icon}
              {notif.urgent && (
                <div style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  animation: 'pulse 2s infinite'
                }}>
                  !
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827' }}>{notif.title}</h4>
                {notif.urgent && (
                  <span style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    🚨 Urgent
                  </span>
                )}
                {!notif.read && (
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#2563eb',
                    borderRadius: '50%'
                  }} />
                )}
              </div>

              <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '0.75rem', lineHeight: '1.5' }}>
                {notif.message}
              </p>

              <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>⏰ {notif.timestamp}</p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column', minWidth: '140px' }}>
              {notif.action && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Action: ${notif.action.text}`);
                  }}
                  style={{
                    backgroundColor: notif.color,
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {notif.action.text}
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotification(notif.id);
                }}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}
              >
                ❌ Dismiss
              </button>
            </div>
          </div>
        )) : (
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '3rem',
            borderRadius: '0.75rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✨ All caught up!</p>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>You don't have any {filterType !== 'all' ? filterType : ''} notifications right now.</p>
          </div>
        )}
      </div>

      {/* Notification Methods Info */}
      <div style={{
        backgroundColor: '#f0f9ff',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginTop: '2rem',
        borderLeft: '4px solid #2563eb'
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>📱 How You'll Receive Notifications</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>🔔 In-App Notifications</p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Real-time alerts appear in your dashboard and notification center</p>
          </div>
          <div>
            <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>📧 Email Alerts</p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Important updates sent to your registered email address</p>
          </div>
          <div>
            <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>📲 SMS Notifications</p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Critical alerts like overdue payments sent via SMS</p>
          </div>
          <div>
            <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>🔊 Sound Alerts</p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Desktop notifications with optional sound when app is open</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Notifications;
