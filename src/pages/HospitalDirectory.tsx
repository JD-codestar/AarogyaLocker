import { useState } from 'react';
import { LocationIcon, SearchIcon } from '../Icons';

export default function HospitalDirectory() {
  const [search, setSearch] = useState('');

  const hospitals = [
    { id: 1, name: 'Apollo Indraprastha', location: 'New Delhi', beds: 710, specialties: ['Cardiology', 'Neurology', 'Oncology'], rating: 4.8 },
    { id: 2, name: 'Fortis Escorts', location: 'New Delhi', beds: 310, specialties: ['Cardiology', 'Orthopedics'], rating: 4.7 },
    { id: 3, name: 'Max Super Speciality', location: 'Saket, New Delhi', beds: 500, specialties: ['Multi-specialty', 'Pediatrics'], rating: 4.9 },
  ];

  const filtered = hospitals.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.specialties.join(' ').toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="hospitals-page" style={{ padding: 'var(--space-6) 0', background: 'var(--color-bg-light)', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-dark)', marginBottom: 'var(--space-2)' }}>Find Top Hospitals & Clinics</h1>
          <p style={{ color: 'var(--color-slate)' }}>Search for specialized facilities, book admissions, or contact helpdesks directly.</p>
          
          <div style={{ display: 'flex', maxWidth: '600px', margin: 'var(--space-6) auto 0', background: 'white', border: '1px solid var(--color-gray-200)', borderRadius: '8px', padding: 'var(--space-2)' }}>
            <div style={{ padding: 'var(--space-2)', color: 'var(--color-slate)' }}><SearchIcon size={20} /></div>
            <input 
              type="text" 
              placeholder="Search by hospital name or specialty (e.g. Cardiology)" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '16px' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--space-6)' }}>
          {filtered.map(hospital => (
            <div key={hospital.id} className="card" style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>{hospital.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-slate)', fontSize: '14px', marginTop: '4px' }}>
                  <LocationIcon size={14} /> {hospital.location}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {hospital.specialties.map(spec => (
                  <span key={spec} style={{ padding: '4px 8px', background: 'var(--color-ice-blue)', color: 'var(--color-deep-blue)', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>{spec}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: 'var(--color-slate)', borderTop: '1px solid var(--color-gray-200)', paddingTop: 'var(--space-3)' }}>
                <span>🛏️ {hospital.beds} Beds</span>
                <span>⭐ {hospital.rating} Rating</span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}>Enquire</button>
                <button className="btn btn-primary" style={{ flex: 1, padding: '8px' }}>View Details</button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-slate)' }}>
            <p>No hospitals found matching "{search}".</p>
          </div>
        )}
      </div>
    </section>
  );
}
