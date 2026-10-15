/**
 * Hero.tsx — The main hero section with high-performance search and quick suggestions.
 */
import { useState } from 'react';
import { SearchIcon, LocationIcon, CloseIcon } from '../Icons';

interface HeroProps {
  onSearch: (query: string, location: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Chandigarh & Mohali');

  const handleSearch = (customQuery?: string) => {
    const q = customQuery !== undefined ? customQuery : query;
    onSearch(q, location);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setQuery('');
    }
  };

  const quickSearches = [
    'Cardiology',
    'PGIMER',
    'Fortis Mohali',
    'Neurology',
    'Pediatrics',
    'Orthopedics'
  ];

  return (
    <section className="hero" aria-labelledby="hero-heading" style={{ 
      padding: 'var(--space-8) 0 var(--space-4) 0',
      textAlign: 'center',
      background: 'var(--color-white)' 
    }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 16px' }}>
        
        {/* Search Bar - Full Width Style with Action Button */}
        <div 
          className="hero-search-wide" 
          role="search" 
          style={{
            display: 'flex',
            maxWidth: '920px',
            margin: '0 auto var(--space-4) auto',
            border: '2px solid #cbd5e1',
            borderRadius: '12px',
            backgroundColor: 'var(--color-white)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            alignItems: 'center',
            transition: 'border-color 0.2s, box-shadow 0.2s'
          }}
        >
          {/* Location Selector */}
          <div 
            className="hero-location-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              flex: '0 0 240px',
              borderRight: '1px solid #e2e8f0',
              background: '#f8fafc'
            }}
          >
            <LocationIcon size={18} color="#1e3a8a" />
            <select
              className="hero-location-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                padding: '12px 8px',
                width: '100%',
                fontSize: '14px',
                fontWeight: 600,
                color: '#1e293b',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              <option value="Chandigarh & Mohali">📍 All Tricity (Mohali & Chd)</option>
              <option value="Chandigarh">📍 Chandigarh</option>
              <option value="Mohali">📍 Mohali (SAS Nagar)</option>
            </select>
          </div>

          {/* Doctor / Specialty Search */}
          <div 
            className="hero-input-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              flex: '1',
              position: 'relative'
            }}
          >
            <SearchIcon size={18} color="#64748b" />
            <input
              className="hero-query-input"
              type="text"
              placeholder="Search doctors, specialties, hospitals (e.g. PGIMER, Fortis, Cardiology)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                border: 'none',
                outline: 'none',
                padding: '14px 10px',
                width: '100%',
                fontSize: '15px',
                color: '#0f172a'
              }}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="hero-query-clear"
                onClick={() => setQuery('')}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748b',
                  marginRight: '8px'
                }}
                title="Clear (Esc)"
              >
                <CloseIcon size={12} />
              </button>
            )}
          </div>

          {/* Search CTA Button */}
          <button
            type="button"
            className="hero-search-submit-btn"
            onClick={() => handleSearch()}
            style={{
              background: '#1e3a8a',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.15s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#1e40af'}
            onMouseOut={(e) => e.currentTarget.style.background = '#1e3a8a'}
          >
            <span>Search</span>
            <span>→</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
          <span className="hero-popular-label" style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Popular:</span>
          {quickSearches.map((item) => (
            <button
              key={item}
              type="button"
              className="hero-quick-chip"
              onClick={() => {
                setQuery(item);
                handleSearch(item);
              }}
              style={{
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#e2e8f0';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h1 id="hero-heading" style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-dark)', marginBottom: 'var(--space-2)', letterSpacing: '-0.5px' }}>
            Your Health, <span style={{ color: 'var(--color-deep-blue)' }}>Our Priority.</span>
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--color-slate)', maxWidth: '640px', margin: '0 auto' }}>
            Find trusted healthcare professionals and book verified appointments across Mohali & Chandigarh.
          </p>
        </div>

      </div>
    </section>
  );
}
