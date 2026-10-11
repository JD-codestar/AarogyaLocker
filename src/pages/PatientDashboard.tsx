import React from 'react';

interface PatientDashboardProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function PatientDashboard({ isLoggedIn, onSignInClick }: PatientDashboardProps) {
  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <h2>Access Restricted</h2>
        <p style={{ margin: '20px 0', color: 'var(--color-slate)' }}>Please sign in to view your patient dashboard.</p>
        <button className="btn btn-primary" onClick={onSignInClick}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: 'var(--space-6)' }}>Dashboard Overview</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        {/* Profile Summary */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '18px', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>Patient Profile</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-cyan)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>U</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '18px' }}>Demo User</div>
              <div style={{ color: 'var(--color-slate)', fontSize: '14px' }}>Male, 32 Years</div>
              <div style={{ color: 'var(--color-slate)', fontSize: '14px' }}>demo.user@example.com</div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '18px', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>Upcoming Appointments</h3>
          <div style={{ background: 'var(--color-ice-blue)', padding: 'var(--space-3)', borderRadius: '8px', marginBottom: 'var(--space-2)' }}>
            <div style={{ fontWeight: 600 }}>Dr. Priya Sharma</div>
            <div style={{ color: 'var(--color-slate)', fontSize: '14px' }}>Tomorrow, 10:00 AM</div>
            <div style={{ color: 'var(--color-slate)', fontSize: '14px' }}>Video Consultation</div>
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '18px', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>Notifications</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid var(--color-gray-200)' }}>
              <strong>Appointment Confirmed:</strong> Dr. Priya Sharma
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid var(--color-gray-200)' }}>
              <strong>Lab Report Ready:</strong> Complete Blood Count
            </li>
            <li style={{ padding: '8px 0' }}>
              <strong>Reminder:</strong> Upcoming health checkup next month
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
