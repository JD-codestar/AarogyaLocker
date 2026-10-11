import React, { useState } from 'react';

interface DoctorDashboardProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function DoctorDashboard({ isLoggedIn, onSignInClick }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState('queue');

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <h2>Doctor Access Restricted</h2>
        <p style={{ margin: '20px 0', color: 'var(--color-slate)' }}>Please sign in with provider credentials.</p>
        <button className="btn btn-primary" onClick={onSignInClick}>Provider Sign In</button>
      </div>
    );
  }

  const appointments = [
    { id: 'APT-001', time: '10:00 AM', patient: 'Demo User', type: 'Video Consult', status: 'Waiting' },
    { id: 'APT-002', time: '10:30 AM', patient: 'Amit Singh', type: 'In-person', status: 'Scheduled' },
    { id: 'APT-003', time: '11:15 AM', patient: 'Neha Sharma', type: 'In-person', status: 'Scheduled' },
  ];

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Dr. Priya Sharma's Portal</h1>
          <p style={{ color: 'var(--color-slate)' }}>Welcome back. You have 3 appointments today.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary">Update Schedule</button>
          <button className="btn btn-primary">Join Next Call</button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--color-ice-blue)', border: 'none' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Today's Patients</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>3</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', background: '#ecfdf5', border: 'none' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Completed</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#047857' }}>12</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', background: '#fef2f2', border: 'none' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Pending Reports</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#b91c1c' }}>2</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        {/* Patient Queue */}
        <div className="card" style={{ flex: '1 1 400px', padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Patient Queue</h3>
            <span style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Oct 10, 2026</span>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {appointments.map(apt => (
              <li key={apt.id} style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{apt.time} - {apt.patient}</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-slate)' }}>{apt.type} • {apt.id}</div>
                </div>
                {apt.status === 'Waiting' ? (
                  <span className="badge badge-green">Waiting Room</span>
                ) : (
                  <span className="badge badge-blue">{apt.status}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Consultation Notes UI */}
        <div className="card" style={{ flex: '1 1 400px', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: 0, fontSize: '18px', marginBottom: 'var(--space-4)' }}>Consultation Notes</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)' }}>
            <span style={{ fontSize: '14px', background: 'var(--color-ice-blue)', padding: '4px 8px', borderRadius: '4px' }}>Patient: Demo User</span>
            <span style={{ fontSize: '14px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>View History</span>
          </div>
          <textarea 
            placeholder="Type clinical notes, symptoms, and diagnosis here..." 
            style={{ width: '100%', flex: 1, minHeight: '150px', padding: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', marginBottom: 'var(--space-4)', resize: 'none' }}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
            <button className="btn btn-secondary" style={{ flex: 1 }}>Add E-Prescription</button>
            <button className="btn btn-primary" style={{ flex: 1 }}>Save Notes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
