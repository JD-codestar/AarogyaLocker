/**
 * Hero.tsx — The main hero section with search functionality.
 */
import { useState } from 'react';
import { SearchIcon, LocationIcon } from '../Icons';

interface HeroProps {
  onSearch: (query: string, location: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Chandigarh & Mohali');

  const handleSearch = () => {
    onSearch(query, location);
    // Scroll to doctors section
    document.getElementById('doctors')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-heading" style={{ 
      padding: 'var(--space-8) 0 var(--space-4) 0',
      textAlign: 'center',
      background: 'var(--color-white)' 
    }}>
      <div className="container">
        
        {/* Search Bar - Full Width Style */}
        <div 
          className="hero-search-wide" 
          role="search" 
          style={{
            display: 'flex',
            maxWidth: '900px',
            margin: '0 auto var(--space-8) auto',
            border: '1px solid var(--color-gray)',
            borderRadius: '4px',
            backgroundColor: 'var(--color-white)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          {/* Location Search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 var(--space-4)',
            flex: '0 0 300px',
            borderRight: '1px solid var(--color-gray)'
          }}>
            <LocationIcon size={18} color="var(--color-slate)" />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                border: 'none',
                outline: 'none',
                padding: 'var(--space-3)',
                width: '100%',
                fontSize: '15px'
              }}
              autoComplete="off"
            />
          </div>

          {/* Doctor / Specialty Search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 var(--space-4)',
            flex: '1'
          }}>
            <SearchIcon size={18} color="var(--color-slate)" />
            <input
              type="text"
              placeholder="Search doctors, clinics, hospitals, etc."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                border: 'none',
                outline: 'none',
                padding: 'var(--space-3)',
                width: '100%',
                fontSize: '15px'
              }}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Content (kept as requested) */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h1 id="hero-heading" style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: 'var(--space-2)' }}>
            Your Health, <span style={{ color: 'var(--color-deep-blue)' }}>Our Priority.</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-slate)' }}>
            Find trusted healthcare professionals and book appointments with confidence.
          </p>
        </div>

      </div>
    </section>
  );
}
