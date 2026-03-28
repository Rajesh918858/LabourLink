import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const LocationBasedHiring = () => {
  const { user, userType } = useSelector(state => state.auth);
  
  const [distanceFilter, setDistanceFilter] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showMap, setShowMap] = useState(true);

  // Sample workers with location data
  const [workers] = useState([
    { id: 1, name: 'Raj Kumar', skill: 'Carpenter', rating: 4.8, distance: 1.2, lat: 28.6139, lng: 77.2090, jobsCompleted: 35, experience: '10 years', phone: '9876543210' },
    { id: 2, name: 'Vikram Sharma', skill: 'Mason', rating: 4.7, distance: 2.1, lat: 28.6155, lng: 77.2115, jobsCompleted: 28, experience: '8 years', phone: '9876543211' },
    { id: 3, name: 'Suresh Kumar', skill: 'Electrician', rating: 4.6, distance: 3.5, lat: 28.6200, lng: 77.2050, jobsCompleted: 24, experience: '9 years', phone: '9876543212' },
    { id: 4, name: 'Prakash Singh', skill: 'Painter', rating: 4.5, distance: 1.8, lat: 28.6120, lng: 77.2120, jobsCompleted: 32, experience: '7 years', phone: '9876543213' },
    { id: 5, name: 'Arjun Patel', skill: 'Plumber', rating: 4.4, distance: 4.2, lat: 28.6170, lng: 77.2080, jobsCompleted: 20, experience: '6 years', phone: '9876543214' },
    { id: 6, name: 'Deepak Roy', skill: 'Carpenter', rating: 4.3, distance: 2.9, lat: 28.6180, lng: 77.2100, jobsCompleted: 18, experience: '5 years', phone: '9876543215' },
    { id: 7, name: 'Mohan Singh', skill: 'Welder', rating: 4.9, distance: 3.1, lat: 28.6140, lng: 77.2140, jobsCompleted: 40, experience: '12 years', phone: '9876543216' },
    { id: 8, name: 'Akhil Verma', skill: 'Electrician', rating: 4.2, distance: 2.5, lat: 28.6125, lng: 77.2095, jobsCompleted: 15, experience: '4 years', phone: '9876543217' },
  ]);

  const categories = ['all', 'Carpenter', 'Mason', 'Electrician', 'Painter', 'Plumber', 'Welder'];

  // Filter workers
  const filteredWorkers = workers.filter(w => {
    const skillMatch = selectedCategory === 'all' || w.skill === selectedCategory;
    const distanceMatch = w.distance <= distanceFilter;
    return skillMatch && distanceMatch;
  });

  // Sort by rating + distance
  const sortedWorkers = [...filteredWorkers].sort((a, b) => {
    const ratingDiff = b.rating - a.rating;
    return ratingDiff !== 0 ? ratingDiff : a.distance - b.distance;
  });

  // Calculate canvas coordinates for map visualization
  const getMapCoordinates = (lat, lng) => {
    // Simple projection for visualization
    const x = (lng - 77.2050) * 500; // Scale for canvas
    const y = (28.6200 - lat) * 500;
    return { x: x + 250, y: y + 250 };
  };

  return (
    <div className="container py-8">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>📍 Location-Based Hiring</h2>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>Find skilled workers nearby and hire instantly</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showMap ? '1fr 1fr' : '1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Map Section */}
        {showMap && (
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>🗺️ Worker Map</h3>
            
            {/* Map Canvas */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '400px',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.5rem',
              border: '2px solid #e5e7eb',
              overflow: 'hidden',
              marginBottom: '1rem'
            }}>
              <svg width="100%" height="100%" style={{ backgroundColor: '#e0f2fe' }}>
                {/* Grid background */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b0e0e6" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Your location center */}
                <circle cx="50%" cy="50%" r="15" fill="#2563eb" opacity="0.8" />
                <circle cx="50%" cy="50%" r="25" fill="none" stroke="#2563eb" strokeWidth="2" opacity="0.3" strokeDasharray="5,5" />

                {/* Distance rings */}
                <circle cx="50%" cy="50%" r={Math.min(500 * (distanceFilter / 5), 200)} fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
                <text x="50%" y="20" textAnchor="middle" fontSize="12" fill="#111827" fontWeight="bold">
                  🎯 You
                </text>

                {/* Worker markers */}
                {sortedWorkers.map((worker, idx) => {
                  const coords = getMapCoordinates(worker.lat, worker.lng);
                  const isSelected = selectedWorker?.id === worker.id;
                  return (
                    <g
                      key={worker.id}
                      onClick={() => setSelectedWorker(worker)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={`${(coords.x / 500) * 100}%`}
                        cy={`${(coords.y / 500) * 100}%`}
                        r={isSelected ? 10 : 8}
                        fill={isSelected ? '#10b981' : '#ef4444'}
                        opacity="0.9"
                      />
                      <circle
                        cx={`${(coords.x / 500) * 100}%`}
                        cy={`${(coords.y / 500) * 100}%`}
                        r={isSelected ? 15 : 12}
                        fill="none"
                        stroke={isSelected ? '#10b981' : '#fca5a5'}
                        strokeWidth="2"
                        opacity="0.5"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.9)', padding: '0.5rem 1rem', borderRadius: '0.375rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#2563eb', borderRadius: '50%' }} />
                    <span>You</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
                    <span>Workers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                onClick={() => alert('Zooming in...')}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                🔍 Zoom In
              </button>
              <button
                onClick={() => alert('Zooming out...')}
                style={{
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                🔍 Zoom Out
              </button>
            </div>

            {/* Info Text */}
            <div style={{ backgroundColor: '#ecfdf5', padding: '1rem', borderRadius: '0.375rem', marginTop: '1rem', borderLeft: '4px solid #10b981' }}>
              <p style={{ color: '#111827', fontSize: '0.9rem' }}>
                💡 <strong>Tip:</strong> Filter by skill and distance to find the perfect worker near you. Distance radius: <strong>0 - {distanceFilter} km</strong>
              </p>
            </div>
          </div>
        )}

        {/* Filters & Workers List */}
        <div>
          {/* Filter Section */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.rem', color: '#111827' }}>🔍 Filters</h3>

            {/* Distance Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#6b7280', fontWeight: '600', marginBottom: '0.75rem' }}>
                📏 Distance: <strong>{distanceFilter} km</strong>
              </label>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(parseFloat(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b7280', marginTop: '0.5rem' }}>
                <span>0.5 km</span>
                <span>10 km</span>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ display: 'block', color: '#6b7280', fontWeight: '600', marginBottom: '0.75rem' }}>
                🏗️ Skills
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      backgroundColor: selectedCategory === cat ? '#2563eb' : '#f3f4f6',
                      color: selectedCategory === cat ? 'white' : '#111827',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      textTransform: 'capitalize'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Counter */}
            <div style={{ marginTop: '1.5rem', backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: '0.375rem', borderLeft: '4px solid #2563eb' }}>
              <p style={{ color: '#111827', fontWeight: '600' }}>
                📊 {sortedWorkers.length} worker{sortedWorkers.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* Toggle Map */}
          <button
            onClick={() => setShowMap(!showMap)}
            style={{
              width: '100%',
              backgroundColor: '#9333ea',
              color: 'white',
              border: 'none',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}
          >
            {showMap ? '👁️ Hide Map' : '🗺️ Show Map'}
          </button>
        </div>
      </div>

      {/* Workers Grid */}
      <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
          👨‍💼 Available Workers
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {sortedWorkers.length > 0 ? sortedWorkers.map(worker => (
            <div
              key={worker.id}
              onClick={() => setSelectedWorker(worker)}
              style={{
                backgroundColor: selectedWorker?.id === worker.id ? '#ecfdf5' : '#f9fafb',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                borderLeft: `4px solid ${['#ef4444', '#f59e0b', '#2563eb', '#10b981', '#ec4899', '#9333ea', '#0284c7', '#8b5cf6'][worker.id % 8]}`,
                border: selectedWorker?.id === worker.id ? '2px solid #10b981' : '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: selectedWorker?.id === worker.id ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              {/* Header */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827' }}>{worker.name}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{worker.skill}</p>
                  </div>
                  <span style={{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}>
                    📍 {worker.distance} km
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
                <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.375rem' }}>
                  <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Rating</p>
                  <p style={{ fontWeight: 'bold', color: '#f59e0b' }}>⭐ {worker.rating}/5</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.375rem' }}>
                  <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Completed</p>
                  <p style={{ fontWeight: 'bold', color: '#2563eb' }}>{worker.jobsCompleted} jobs</p>
                </div>
              </div>

              {/* Details */}
              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#6b7280' }}>Experience:</span>
                  <span style={{ fontWeight: '600', color: '#111827' }}>{worker.experience}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Phone:</span>
                  <span style={{ fontWeight: '600', color: '#111827' }}>{worker.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <button style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                  💬 Chat
                </button>
                <button style={{
                  width: '100%',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                  ✅ Hire Now
                </button>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', backgroundColor: '#f3f4f6', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center' }}>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>No workers found matching your criteria. Try adjusting your filters!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationBasedHiring;
