import React, { useState } from 'react';

const JobListings = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Voice Search Function
  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Voice search not supported in your browser. Use Chrome, Edge, or Safari.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Hindi language
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setSearchLocation(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Voice error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const jobCategories = {
    construction: {
      name: '🏗️ Construction & Building Workers',
      jobs: [
        {
          id: 1,
          company: 'BuildRight Construction',
          position: 'Carpenter',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹800/day',
          description: 'Experienced carpenter needed for residential project'
        },
        {
          id: 2,
          company: 'ElectroWorks Ltd.',
          position: 'Electrician',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹700/day',
          description: 'Skilled electrician for commercial wiring'
        },
        {
          id: 3,
          company: 'PlumbPro Services',
          position: 'Plumber',
          location: 'Delhi, Delhi',
          workTime: 'On-Site',
          employmentType: 'Part Time',
          salary: '₹600/day',
          description: 'Experienced plumber for water supply systems'
        },
        {
          id: 4,
          company: 'Raj Construction',
          position: 'Mason (Raj Mistri)',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹1000/day',
          description: 'Expert mason for wall construction and finishing'
        },
        {
          id: 5,
          company: 'ColorWash Painters',
          position: 'Painter',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹500/day',
          description: 'Professional painter for interior and exterior work'
        },
        {
          id: 51,
          company: 'Premier Builders',
          position: 'Carpenter',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹850/day',
          description: 'Skilled carpenter for modern construction projects'
        },
        {
          id: 52,
          company: 'Modern Electrix',
          position: 'Electrician',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹750/day',
          description: 'Certified electrician for residential wiring'
        },
        {
          id: 53,
          company: 'Delhi Build Co.',
          position: 'Mason (Raj Mistri)',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹950/day',
          description: 'Experienced mason for concrete and brickwork'
        },
        {
          id: 54,
          company: 'Pro Plumbers Network',
          position: 'Plumber',
          location: 'Pune, Maharashtra',
          workTime: 'On-Site',
          employmentType: 'Part Time',
          salary: '₹650/day',
          description: 'Plumber for maintenance and repairs'
        },
        {
          id: 55,
          company: 'Urban Painters',
          position: 'Painter',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹550/day',
          description: 'House and commercial painting services'
        }
      ]
    },
    technical: {
      name: '⚙️ Technical & Repair Workers',
      icon: '⚙️',
      jobs: [
        {
          id: 6,
          company: 'CoolTech Services',
          position: 'AC Technician',
          location: 'Mumbai, Maharashtra',
          workTime: 'On-Site',
          employmentType: 'Full Time',
          salary: '₹900/day',
          description: 'AC maintenance and repair technician'
        },
        {
          id: 7,
          company: 'Steel Works Inc.',
          position: 'Welder',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹850/day',
          description: 'Skilled welder for metal fabrication'
        },
        {
          id: 8,
          company: 'AutoRepair Hub',
          position: 'Mechanic',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹750/day',
          description: 'Experienced auto mechanic needed'
        },
        {
          id: 9,
          company: 'SecurityTech Solutions',
          position: 'CCTV Technician',
          location: 'Mumbai, Maharashtra',
          workTime: 'On-Site',
          employmentType: 'Part Time',
          salary: '₹600/day',
          description: 'CCTV installation and maintenance'
        },
        {
          id: 10,
          company: 'TechRepair Store',
          position: 'Mobile Repair Worker',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹550/day',
          description: 'Mobile phone repair and troubleshooting'
        },
        {
          id: 61,
          company: 'Cool Comfort Services',
          position: 'AC Technician',
          location: 'Delhi, Delhi',
          workTime: 'On-Site',
          employmentType: 'Full Time',
          salary: '₹950/day',
          description: 'Expert AC installation and repair'
        },
        {
          id: 62,
          company: 'Premium Welding Co.',
          position: 'Welder',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹900/day',
          description: 'Professional welder for industrial work'
        },
        {
          id: 63,
          company: 'Quick Fix Mechanics',
          position: 'Mechanic',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹800/day',
          description: 'Car and bike mechanic services'
        },
        {
          id: 64,
          company: 'Tech Security Systems',
          position: 'CCTV Technician',
          location: 'Pune, Maharashtra',
          workTime: 'On-Site',
          employmentType: 'Part Time',
          salary: '₹650/day',
          description: 'CCTV camera installation and monitoring'
        },
        {
          id: 65,
          company: 'Mobile Solutions Ltd.',
          position: 'Mobile Repair Worker',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹600/day',
          description: 'Expert mobile phone repairs'
        }
      ]
    },
    household: {
      name: '🏠 Household & Daily Work Labour',
      icon: '🏠',
      jobs: [
        {
          id: 11,
          company: 'HomeCare Services',
          position: 'House Maid',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹400/day',
          description: 'House cleaning and maintenance services'
        },
        {
          id: 12,
          company: 'SecureGuard Company',
          position: 'Security Guard',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹650/day',
          description: '24-hour security guard for residential complex'
        },
        {
          id: 13,
          company: 'GreenScape Maintenance',
          position: 'Gardener (Mali)',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹450/day',
          description: 'Garden maintenance and landscaping'
        },
        {
          id: 14,
          company: 'QuickDeliver Logistics',
          position: 'Delivery Worker',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹700/day',
          description: 'Fast delivery services for packages'
        },
        {
          id: 15,
          company: 'DishDelights Catering',
          position: 'Cook',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹550/day',
          description: 'Professional cook for events and catering'
        },
        {
          id: 71,
          company: 'Sparkle Clean Services',
          position: 'House Maid',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹450/day',
          description: 'Professional house cleaning services'
        },
        {
          id: 72,
          company: 'Guardian Security',
          position: 'Security Guard',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹600/day',
          description: '24-hour security for homes and offices'
        },
        {
          id: 73,
          company: 'Green Gardens Co.',
          position: 'Gardener (Mali)',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹500/day',
          description: 'Professional garden care and landscaping'
        },
        {
          id: 74,
          company: 'Express Delivery Hub',
          position: 'Delivery Worker',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹750/day',
          description: 'Same-day delivery services'
        },
        {
          id: 75,
          company: 'Chef\'s Kitchen',
          position: 'Cook',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Part Time',
          salary: '₹600/day',
          description: 'Cooking services for parties and events'
        }
      ]
    },
    heavy: {
      name: '🚧 Heavy & Site Labour',
      icon: '🚧',
      jobs: [
        {
          id: 16,
          company: 'MegaBuild Projects',
          position: 'Construction Labour (Helper)',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹500/day',
          description: 'General construction site laborer'
        },
        {
          id: 17,
          company: 'RoadInfra Ltd.',
          position: 'Road Worker',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹600/day',
          description: 'Road construction and maintenance work'
        },
        {
          id: 18,
          company: 'Cargo Express Services',
          position: 'Loader/Unloader',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹550/day',
          description: 'Material loading and unloading services'
        },
        {
          id: 19,
          company: 'MegaFactory Inc.',
          position: 'Factory Worker',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹650/day',
          description: 'Manufacturing plant assembly work'
        },
        {
          id: 20,
          company: 'LogiHub Warehouse',
          position: 'Warehouse Worker',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹580/day',
          description: 'Warehouse storage and inventory management'
        },
        {
          id: 81,
          company: 'Industrial Builders Co.',
          position: 'Construction Labour (Helper)',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹550/day',
          description: 'Skilled construction site helper'
        },
        {
          id: 82,
          company: 'Heavy Transport Ltd.',
          position: 'Road Worker',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹650/day',
          description: 'Road maintenance and repairs'
        },
        {
          id: 83,
          company: 'SuperCargo Services',
          position: 'Loader/Unloader',
          location: 'Delhi, Delhi',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹600/day',
          description: 'Professional cargo loading services'
        },
        {
          id: 84,
          company: 'Premium Manufacturing',
          position: 'Factory Worker',
          location: 'Pune, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹700/day',
          description: 'Factory floor production work'
        },
        {
          id: 85,
          company: 'Apex Warehouse Group',
          position: 'Warehouse Worker',
          location: 'Mumbai, Maharashtra',
          workTime: 'Daily',
          employmentType: 'Full Time',
          salary: '₹620/day',
          description: 'Warehouse operations and stock management'
        }
      ]
    }
  };

  return (
    <div className="container py-8">
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827', textAlign: 'center' }}>
        📋 Available Job Categories
      </h2>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>
        Browse jobs by category or search by location
      </p>

      {/* Search Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="🔍 Search jobs by position, location, or company..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="form-input"
            style={{
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              width: '100%',
              borderRadius: '0.5rem',
              border: '2px solid #e5e7eb'
            }}
          />
          <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '0.5rem' }}>
            {searchLocation && (
              <button
                onClick={() => setSearchLocation('')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ✕
              </button>
            )}
            <button
              onClick={startVoiceSearch}
              style={{
                background: isListening ? '#ef4444' : '#2563eb',
                color: 'white',
                border: 'none',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
              title="Click to speak or say job position / location"
            >
              🎤 {isListening ? 'Listening...' : 'Voice'}
            </button>
          </div>
        </div>
      </div>

      {/* All Categories in Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
        {Object.entries(jobCategories).map(([categoryKey, category]) => {
          const filteredCategoryJobs = searchLocation.trim()
            ? category.jobs.filter(job =>
                job.position.toLowerCase().includes(searchLocation.toLowerCase()) ||
                job.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
                job.company.toLowerCase().includes(searchLocation.toLowerCase()) ||
                job.description.toLowerCase().includes(searchLocation.toLowerCase())
              )
            : category.jobs;

          return (
            <div
              key={categoryKey}
              style={{
                border: '2px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                backgroundColor: '#f9fafb'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                {category.name}
              </h3>
              
              {filteredCategoryJobs.length > 0 ? (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {filteredCategoryJobs.map(job => (
                    <div
                      key={job.id}
                      style={{
                        backgroundColor: 'white',
                        borderLeft: '4px solid #2563eb',
                        padding: '1rem',
                        borderRadius: '0.5rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>
                            {job.position}
                          </h4>
                          <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                            {job.company}
                          </p>
                        </div>
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                          {job.salary}
                        </p>
                      </div>
                      
                      <p style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                        {job.description}
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                        <div>
                          <p style={{ color: '#6b7280', margin: '0 0 0.25rem 0' }}>📍 Location</p>
                          <p style={{ fontWeight: '600', color: '#111827', margin: 0 }}>{job.location}</p>
                        </div>
                        <div>
                          <p style={{ color: '#6b7280', margin: '0 0 0.25rem 0' }}>⏱️ Work Time</p>
                          <p style={{ fontWeight: '600', color: '#111827', margin: 0 }}>{job.workTime}</p>
                        </div>
                      </div>

                      <button className="btn btn-primary" style={{ width: '100%', padding: '0.5rem', fontSize: '0.9rem' }}>
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#6b7280', textAlign: 'center', padding: '1rem' }}>
                  No jobs found in this category
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results Message */}
      {searchLocation && Object.values(jobCategories).every(cat =>
        cat.jobs.every(job =>
          !job.position.toLowerCase().includes(searchLocation.toLowerCase()) &&
          !job.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
          !job.company.toLowerCase().includes(searchLocation.toLowerCase()) &&
          !job.description.toLowerCase().includes(searchLocation.toLowerCase())
        )
      ) && (
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fef2f2', borderRadius: '0.5rem', marginTop: '2rem' }}>
          <p style={{ fontSize: '1.1rem', color: '#991b1b' }}>
            No jobs found for "{searchLocation}". Try searching for:
          </p>
          <ul style={{ color: '#991b1b', marginTop: '1rem', listStyle: 'none', padding: 0 }}>
            <li>✓ Job positions (e.g., "Carpenter", "Electrician")</li>
            <li>✓ Locations (e.g., "Mumbai", "Delhi", "Bangalore")</li>
            <li>✓ Company names</li>
          </ul>
          <button
            onClick={() => setSearchLocation('')}
            style={{
              marginTop: '1rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListings;
