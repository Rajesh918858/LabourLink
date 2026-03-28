import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Hero section */}
      <div className="hero">
        <div className="container">
          <h1>LabourLink</h1>
          <p>Verified Skills & Work-History Platform for Daily Wage Construction Workers</p>
          <div className="hero-buttons">
            <a href="/register" className="hero-btn hero-btn-primary">Get Started</a>
            <a href="/jobs" className="hero-btn" style={{ backgroundColor: '#60a5fa', color: 'white' }}>Browse Jobs</a>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="features-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Key Features</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>Worker Profile</h3>
              <p>Build your profile through completed work, not claims. Earn verified skills through trusted endorsements.</p>
            </div>
            
            <div className="feature-card">
              <h3>Job Discovery</h3>
              <p>Find jobs with skill requirements nearby. Connect with contractors who value your experience.</p>
            </div>
            
            <div className="feature-card">
              <h3>Ratings & Reviews</h3>
              <p>Build trust with mutual ratings. Showcase your work quality through verified reviews.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <a href="/register" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>Register Now</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
