import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import JobListings from './pages/JobListings';
import WorkerDashboard from './pages/WorkerDashboard';
import WorkerProfile from './pages/WorkerProfile';
import ContractorDashboard from './pages/ContractorDashboard';
import ContractorProfile from './pages/ContractorProfile';
import Home from './pages/Home';

function ProtectedRoute({ children, userType: requiredUserType }) {
  const { isAuthenticated, userType } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredUserType && userType !== requiredUserType) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobListings />} />
        
        <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute userType="worker">
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker-profile"
          element={
            <ProtectedRoute userType="worker">
              <WorkerProfile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/contractor-dashboard"
          element={
            <ProtectedRoute userType="contractor">
              <ContractorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contractor-profile"
          element={
            <ProtectedRoute userType="contractor">
              <ContractorProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
