import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { isAuthenticated, userType } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">LabourLink</a>
        </div>

        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <a href="/jobs">Jobs</a>
              <NotificationBell unreadCount={3} />
              <a href="/chat">💬 Chat</a>
              <a href="/nearby-workers">📍 Nearby Workers</a>
              <a href="/worker-verification">🔐 Trust & Verification</a>
              {userType === 'worker' ? (
                <>
                  <a href="/worker-dashboard">Dashboard</a>
                  <a href="/worker-profile">Profile</a>
                </>
              ) : (
                <>
                  <a href="/contractor-dashboard">Dashboard</a>
                  <a href="/contractor-profile">Profile</a>
                </>
              )}
              <button
                onClick={handleLogout}
                className="navbar-logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register" style={{ display: 'inline-block', background: 'white', color: '#2563eb', padding: '0.5rem 1rem', borderRadius: '0.375rem' }}>Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
