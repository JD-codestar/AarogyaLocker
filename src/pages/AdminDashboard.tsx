import React, { useState } from 'react';

interface AdminDashboardProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function AdminDashboard({ isLoggedIn, onSignInClick }: AdminDashboardProps) {
  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <h2>Admin Access Restricted</h2>
        <p style={{ margin: '20px 0', color: 'var(--color-slate)' }}>Please sign in with administrator credentials.</p>
        <button className="btn btn-primary" onClick={onSignInClick}>Admin Sign In</button>
      </div>
    );
  }

  const verifications = [
    { id: 'DOC-902', name: 'Dr. Kavitha Nair', specialty: 'Dermatology', status: 'Pending' },
    { id: 'DOC-903', name: 'Dr. Rahul Mehta', specialty: 'Orthopedics', status: 'Pending' }
  ];

  const complaints = [
    { id: 'TKT-101', subject: 'Refund for cancelled appointment', priority: 'High', status: 'Open' },
    { id: 'TKT-102', subject: 'Login issue with health locker', priority: 'Medium', status: 'Open' }
  ];

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: 'var(--space-6)' }}>Platform Administration</h1>
      
      {/* Overview Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-4)', borderTop: '4px solid var(--color-deep-blue)' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Total Users</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>12,450</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', borderTop: '4px solid var(--color-cyan)' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Verified Doctors</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>342</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', borderTop: '4px solid #F59E0B' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Pending Verifications</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>24</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', borderTop: '4px solid #EF4444' }}>
          <div style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Open Tickets</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>18</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Doctor Verifications */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-4)', background: 'var(--color-ice-blue)', borderBottom: '1px solid var(--color-gray-200)' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Doctor Verification Queue</h3>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {verifications.map(doc => (
              <li key={doc.id} style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{doc.name}</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-slate)' }}>{doc.specialty} • {doc.id}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }}>Reject</button>
                  <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '12px' }}>Verify</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Complaint Resolution */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-4)', background: 'var(--color-ice-blue)', borderBottom: '1px solid var(--color-gray-200)' }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>Active Complaints</h3>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {complaints.map(ticket => (
              <li key={ticket.id} style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-gray-200)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 600 }}>{ticket.subject}</div>
                  <span style={{ fontSize: '12px', padding: '2px 6px', background: ticket.priority === 'High' ? '#fee2e2' : '#fef3c7', color: ticket.priority === 'High' ? '#b91c1c' : '#b45309', borderRadius: '4px', fontWeight: 600 }}>{ticket.priority}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-slate)' }}>Ticket ID: {ticket.id}</div>
                  <button style={{ color: 'var(--color-deep-blue)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>Resolve</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
