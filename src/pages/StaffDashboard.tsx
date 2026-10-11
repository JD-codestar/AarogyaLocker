import React from 'react';

interface StaffDashboardProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function StaffDashboard({ isLoggedIn, onSignInClick }: StaffDashboardProps) {
  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <h2>Staff Access Restricted</h2>
        <p style={{ margin: '20px 0', color: 'var(--color-slate)' }}>Please sign in with staff credentials to view the helpdesk.</p>
        <button className="btn btn-primary" onClick={onSignInClick}>Staff Sign In</button>
      </div>
    );
  }

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: 'var(--space-6)' }}>Hospital Staff Helpdesk</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Patient Document Lookup (Demo) */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '18px', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>Patient Document Lookup</h3>
          <p style={{ fontSize: '14px', color: 'var(--color-slate)', marginBottom: 'var(--space-4)' }}>Simulate workflow: Retrieve a patient's ECG or Lab report by Patient ID.</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="Enter Patient ID (e.g. PAT-102)" style={{ flex: 1, padding: '8px', border: '1px solid var(--color-gray-200)', borderRadius: '4px' }} />
            <button className="btn btn-secondary">Search</button>
          </div>
          <div style={{ marginTop: '16px', padding: '12px', background: 'var(--color-ice-blue)', borderRadius: '4px', fontSize: '14px' }}>
            <strong>Demo Result:</strong> No patient selected.
          </div>
        </div>

        {/* Task Assignment */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '18px', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>My Tasks</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px' }}>
            <li style={{ padding: '8px 0', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Verify Dr. Sharma's schedule</span>
              <span className="badge badge-blue">Pending</span>
            </li>
            <li style={{ padding: '8px 0', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Upload CBC report for PAT-102</span>
              <span className="badge badge-green">Completed</span>
            </li>
            <li style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>Check MRI machine maintenance</span>
              <span className="badge badge-blue">Pending</span>
            </li>
          </ul>
        </div>

        {/* Issue Reporting */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '18px', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-2)' }}>Report Facility Issue</h3>
          <select style={{ width: '100%', padding: '8px', marginBottom: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '4px' }}>
            <option>Equipment Malfunction</option>
            <option>IT / Network Issue</option>
            <option>Maintenance Request</option>
          </select>
          <textarea placeholder="Describe the issue..." rows={3} style={{ width: '100%', padding: '8px', marginBottom: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '4px' }}></textarea>
          <button className="btn btn-primary" style={{ width: '100%' }}>Submit Report</button>
        </div>

      </div>
    </div>
  );
}
