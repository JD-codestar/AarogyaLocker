/**
 * Doctors.tsx — Featured doctors list with real-time multi-field search and responsive filters.
 * Tricity healthcare network: Chandigarh & Mohali.
 */
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Doctor } from '../data';
import DoctorCard from './DoctorCard';
import { SearchIcon, LocationIcon, CloseIcon } from '../Icons';

interface DoctorsProps {
  doctors: Doctor[];
  searchQuery: string;
  onSearchChange?: (query: string) => void;
  onClearSearch: () => void;
  onViewProfile: (doctor: Doctor) => void;
  onBook: (doctor: Doctor) => void;
}

export default function Doctors({
  doctors,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onViewProfile,
  onBook,
}: DoctorsProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Local query state for immediate snappy responsiveness
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [activeCity, setActiveCity] = useState<'All' | 'Chandigarh' | 'Mohali'>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'today' | 'video' | 'in-person'>('all');

  // Sync from URL search params on mount or param changes
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCity = searchParams.get('city');

    if (urlSearch !== null) {
      setLocalQuery(urlSearch);
      if (onSearchChange) onSearchChange(urlSearch);
    } else if (searchQuery) {
      setLocalQuery(searchQuery);
    }

    if (urlCity === 'Chandigarh' || urlCity === 'Mohali') {
      setActiveCity(urlCity);
    }
  }, [searchParams]);

  // Keep local query updated if prop changes from outside (e.g. Hero search)
  useEffect(() => {
    if (searchQuery !== localQuery) {
      setLocalQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleQueryChange = (val: string) => {
    setLocalQuery(val);
    if (onSearchChange) onSearchChange(val);

    // Update URL params smoothly
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('search', val.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleClear = () => {
    setLocalQuery('');
    onClearSearch();
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams, { replace: true });
  };

  const handleCityChange = (city: 'All' | 'Chandigarh' | 'Mohali') => {
    setActiveCity(city);
    const newParams = new URLSearchParams(searchParams);
    if (city !== 'All') {
      newParams.set('city', city);
    } else {
      newParams.delete('city');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleResetAll = () => {
    handleClear();
    setActiveCity('All');
    setSelectedSpecialty('All');
    setAvailabilityFilter('all');
  };

  // Keyboard shortcut: Escape clears search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  const popularSpecialties = [
    'All',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Oncology',
    'Endocrinology',
    'Nephrology',
    'Dermatology'
  ];

  // Comprehensive multi-field filter
  const displayDoctors = useMemo(() => {
    const q = localQuery.trim().toLowerCase();

    return doctors.filter((doc) => {
      // City filter
      if (activeCity !== 'All' && doc.city !== activeCity) return false;

      // Specialty filter tag
      if (selectedSpecialty !== 'All') {
        const specMatch = doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
        if (!specMatch) return false;
      }

      // Availability / Consultation Type filter
      if (availabilityFilter === 'today' && doc.availability !== 'Available Today') return false;
      if (availabilityFilter === 'video' && !doc.consultationType.includes('Video')) return false;
      if (availabilityFilter === 'in-person' && !doc.consultationType.includes('In-person')) return false;

      // Text search matching across all fields
      if (!q) return true;

      const nameMatch = doc.name.toLowerCase().includes(q);
      const specMatch = doc.specialty.toLowerCase().includes(q);
      const hospitalMatch = doc.hospitalAffiliation ? doc.hospitalAffiliation.toLowerCase().includes(q) : false;
      const eduMatch = doc.education ? doc.education.toLowerCase().includes(q) : false;
      const bioMatch = doc.bio ? doc.bio.toLowerCase().includes(q) : false;
      const locationMatch = doc.location ? doc.location.toLowerCase().includes(q) : false;
      const cityMatch = doc.city ? doc.city.toLowerCase().includes(q) : false;

      return nameMatch || specMatch || hospitalMatch || eduMatch || bioMatch || locationMatch || cityMatch;
    });
  }, [doctors, localQuery, activeCity, selectedSpecialty, availabilityFilter]);

  return (
    <section className="doctors-page" aria-labelledby="doctors-heading" style={{ 
      padding: 'var(--space-4) 0 var(--space-12)', 
      minHeight: '85vh',
      backgroundColor: '#f8fafc'
    }}>
      
      {/* Top Search & Filter Bar */}
      <div style={{ 
        background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
        borderBottom: '1px solid #e2e8f0', 
        padding: '28px 0 24px', 
        marginBottom: '28px' 
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#047857', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, marginBottom: '8px', border: '1px solid #a7f3d0' }}>
                <LocationIcon size={14} /> <span>Chandigarh & Mohali (Tricity Network)</span>
              </div>
              <h1 id="doctors-heading" style={{ fontSize: '30px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                Find Top Doctors & Specialists
              </h1>
              <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0' }}>
                Consult leading clinicians from PGIMER, Fortis Mohali, Max Hospital, and GMCH 32.
              </p>
            </div>

            {/* City Selector Buttons */}
            <div style={{ display: 'flex', background: '#e2e8f0', padding: '3px', borderRadius: '12px', gap: '4px' }}>
              {(['All', 'Chandigarh', 'Mohali'] as const).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleCityChange(city)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    background: activeCity === city ? '#1e3a8a' : 'transparent',
                    color: activeCity === city ? '#ffffff' : '#475569',
                    fontWeight: activeCity === city ? 700 : 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {city === 'All' ? '🌐 All Tricity' : `📍 ${city}`}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive In-Page Search Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            borderRadius: '14px',
            border: '2px solid #cbd5e1',
            padding: '8px 18px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            gap: '12px',
            transition: 'border-color 0.2s, box-shadow 0.2s'
          }}>
            <div style={{ color: '#1e3a8a', display: 'flex', alignItems: 'center' }}>
              <SearchIcon size={20} />
            </div>
            <input
              type="text"
              value={localQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search doctor name, specialty, hospital, degrees (e.g. Cardiologist, Fortis, PGIMER, MBBS)..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#1e293b'
              }}
            />
            {localQuery && (
              <button
                type="button"
                onClick={handleClear}
                title="Clear search (Esc)"
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
              >
                <CloseIcon size={14} />
              </button>
            )}
            <span style={{ fontSize: '11px', color: '#94a3b8', borderLeft: '1px solid #e2e8f0', paddingLeft: '10px' }}>
              Press <strong>Esc</strong> to clear
            </span>
          </div>

          {/* Specialty Quick Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>Specialty:</span>
            {popularSpecialties.map((spec) => (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: selectedSpecialty === spec ? '#1e3a8a' : '#e2e8f0',
                  background: selectedSpecialty === spec ? '#1e3a8a' : '#ffffff',
                  color: selectedSpecialty === spec ? '#ffffff' : '#475569',
                  fontSize: '12px',
                  fontWeight: selectedSpecialty === spec ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Mode & Availability Filter Badges */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Modes' },
              { id: 'today', label: '⚡ Available Today' },
              { id: 'video', label: '📹 Video Consult' },
              { id: 'in-person', label: '🏥 In-Person' }
            ].map(pill => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setAvailabilityFilter(pill.id as any)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: availabilityFilter === pill.id ? '#047857' : '#cbd5e1',
                  background: availabilityFilter === pill.id ? '#ecfdf5' : 'transparent',
                  color: availabilityFilter === pill.id ? '#047857' : '#64748b',
                  fontSize: '12px',
                  fontWeight: availabilityFilter === pill.id ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                {pill.label}
              </button>
            ))}

            {(localQuery || activeCity !== 'All' || selectedSpecialty !== 'All' || availabilityFilter !== 'all') && (
              <button
                type="button"
                onClick={handleResetAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc2626',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  marginLeft: 'auto'
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Results Column */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            {displayDoctors.length} {displayDoctors.length === 1 ? 'Doctor' : 'Doctors'} available {activeCity !== 'All' ? `in ${activeCity}` : 'in Tricity'}
            {localQuery && <span style={{ color: '#2563eb', fontWeight: 500, fontSize: '15px' }}> matching "{localQuery}"</span>}
          </h2>
          <span style={{ color: '#64748b', fontSize: '13px' }}>
            Verified hospital appointments & video consults
          </span>
        </div>

        {displayDoctors.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {displayDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onViewProfile={onViewProfile}
                onBook={onBook}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ 
            background: '#ffffff', 
            borderRadius: '16px', 
            padding: '50px 24px', 
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{ color: '#94a3b8', display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <SearchIcon size={56} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
              No doctors found matching your criteria
            </h3>
            <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto 20px', fontSize: '14px', lineHeight: 1.5 }}>
              We couldn't find any doctors matching "{localQuery || selectedSpecialty}". Try broadening your search or resetting filters to view all Tricity hospital doctors.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleResetAll}
              style={{ padding: '10px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px' }}
            >
              Show All Verified Doctors
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
