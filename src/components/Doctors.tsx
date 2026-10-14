/**
 * Doctors.tsx — Featured doctors list with search filtering.
 * Redesigned for a dedicated search results page layout.
 */
import { useState } from 'react';
import type { Doctor } from '../data';
import DoctorCard from './DoctorCard';
import { SearchIcon, LocationIcon } from '../Icons';

interface DoctorsProps {
  doctors: Doctor[];
  searchQuery: string;
  onClearSearch: () => void;
  onViewProfile: (doctor: Doctor) => void;
  onBook: (doctor: Doctor) => void;
}

export default function Doctors({
  doctors,
  searchQuery,
  onClearSearch,
  onViewProfile,
  onBook,
}: DoctorsProps) {
  // A local state for the filter pill buttons to simulate a rich UI
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Chandigarh', 'Mohali', 'Available Today', 'Video Consult', 'In-Person'];

  const displayDoctors = doctors.filter((doc) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Chandigarh') return doc.city === 'Chandigarh';
    if (activeFilter === 'Mohali') return doc.city === 'Mohali';
    if (activeFilter === 'Available Today') return doc.availability === 'Available Today';
    if (activeFilter === 'Video Consult') return doc.consultationType.includes('Video');
    if (activeFilter === 'In-Person') return doc.consultationType.includes('In-person');
    return true;
  });

  return (
    <section className="doctors-page" aria-labelledby="doctors-heading" style={{ 
      padding: 'var(--space-4) 0', 
      minHeight: '80vh',
      backgroundColor: '#ffffff',
      backgroundImage: `
        radial-gradient(circle at 15% 50%, rgba(40, 50, 140, 0.04), transparent 25%),
        radial-gradient(circle at 85% 30%, rgba(220, 38, 38, 0.03), transparent 25%),
        linear-gradient(135deg, rgba(255,255,255,1) 0%, #f4f8fc 50%, rgba(255,255,255,1) 100%)
      `,
      backgroundAttachment: 'fixed'
    }}>
      
      {/* Page Header & Search Context */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)', 
        padding: 'var(--space-6) 0', 
        marginBottom: 'var(--space-8)' 
      }}>
        <div className="container">
          <h1 id="doctors-heading" style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: 'var(--space-2)' }}>
            Find the right doctor for you
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-slate)' }}>
            <LocationIcon size={16} /> <span>Chandigarh & Mohali (Tricity)</span>
            <span style={{ margin: '0 var(--space-2)' }}>•</span>
            <SearchIcon size={16} /> <span>{searchQuery ? `Searching for "${searchQuery}"` : 'Top Hospital Specialists'}</span>
            
            {searchQuery && (
              <button
                type="button"
                onClick={onClearSearch}
                style={{
                  color: 'var(--color-deep-blue)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  marginLeft: 'var(--space-2)',
                  fontSize: '14px',
                  textDecoration: 'underline'
                }}
              >
                Clear Search
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: '20px',
                  border: activeFilter === f ? '1px solid var(--color-deep-blue)' : '1px solid var(--color-gray-200)',
                  background: activeFilter === f ? 'var(--color-ice-blue)' : 'var(--color-white)',
                  color: activeFilter === f ? 'var(--color-deep-blue)' : 'var(--color-slate)',
                  fontWeight: activeFilter === f ? 600 : 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {f === 'Chandigarh' || f === 'Mohali' ? `📍 ${f}` : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
          {/* Main Results Column */}
          <div style={{ flex: '1' }}>
            <div style={{ marginBottom: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-dark)' }}>
                {displayDoctors.length} {displayDoctors.length === 1 ? 'Doctor' : 'Doctors'} available in Tricity
              </h2>
              <span style={{ color: 'var(--color-slate)', fontSize: '14px' }}>
                Sorted by <strong>Hospital Affiliation & Rating</strong>
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
              <div className="empty-state" style={{ background: 'var(--color-white)', borderRadius: '12px', padding: 'var(--space-12) var(--space-6)' }}>
                <SearchIcon size={64} color="var(--color-slate)" />
                <h3 style={{ marginTop: 'var(--space-4)' }}>No doctors found</h3>
                <p>
                  No doctors match your search "{searchQuery}". Try a different name or specialty.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onClearSearch}
                  style={{ marginTop: 'var(--space-4)' }}
                >
                  Show All Doctors
                </button>
              </div>
            )}
          </div>
          
          {/* Optional Right Sidebar (Desktop only) */}
          <div style={{ width: '300px', display: 'none' }} className="desktop-sidebar">
             {/* This would contain a map or additional filters in a real app */}
          </div>
        </div>
      </div>
    </section>
  );
}
