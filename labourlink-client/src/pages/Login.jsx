import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authApi } from '../services/index';
import { loginSuccess } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('worker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (userType === 'worker') {
        response = await authApi.loginWorker({ email, password });
      } else {
        response = await authApi.loginContractor({ email, password });
      }

      const { token, worker, contractor } = response.data;
      const user = worker || contractor;

      dispatch(loginSuccess({
        token,
        user,
        userType
      }));

      navigate(userType === 'worker' ? '/worker-dashboard' : '/contractor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-card-title">LabourLink</h2>
        
        <div className="auth-tabs">
          <button
            onClick={() => setUserType('worker')}
            className={`auth-tab ${userType === 'worker' ? 'active' : 'inactive'}`}
          >
            Worker
          </button>
          <button
            onClick={() => setUserType('contractor')}
            className={`auth-tab ${userType === 'contractor' ? 'active' : 'inactive'}`}
          >
            Contractor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <a href="/register" style={{ textDecoration: 'underline' }}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
