import React from 'react';

interface HealthRecordsProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function HealthRecords({ isLoggedIn, onSignInClick }: HealthRecordsProps) {
  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <h2>Access Restricted</h2>
        <p style={{ margin: '20px 0', color: 'var(--color-slate)' }}>Please sign in to view your health records.</p>
        <button className="btn btn-primary" onClick={onSignInClick}>Sign In</button>
      </div>
    );
  }

  const mockRecords = [
    { id: 1, name: 'Complete Blood Count (CBC)', date: 'Oct 1, 2026', type: 'Laboratory', doctor: 'Dr. Priya Sharma' },
    { id: 2, name: 'Chest X-Ray', date: 'Sep 15, 2026', type: 'Imaging', doctor: 'Dr. Rahul Mehta' },
    { id: 3, name: 'Prescription - Flu', date: 'Aug 20, 2026', type: 'Prescription', doctor: 'Dr. Arjun Patel' },
    { id: 4, name: 'Discharge Summary', date: 'Jan 10, 2026', type: 'Discharge', doctor: 'City Hospital' },
  ];

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Digital Health Locker</h1>
        <button className="btn btn-primary">Upload Document</button>
      </div>
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: 'var(--space-6)', overflowX: 'auto' }}>
        {['All Records', 'Laboratory', 'Imaging', 'Prescriptions', 'Discharge'].map((f) => (
          <button key={f} style={{
            padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--color-gray-200)',
            background: f === 'All Records' ? 'var(--color-deep-blue)' : 'white',
            color: f === 'All Records' ? 'white' : 'var(--color-slate)', cursor: 'pointer'
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Records Table/List */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--color-ice-blue)', borderBottom: '1px solid var(--color-gray-200)' }}>
            <tr>
              <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600 }}>Document Name</th>
              <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600 }}>Date</th>
              <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600 }}>Type</th>
              <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600 }}>Issued By</th>
              <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockRecords.map((record) => (
              <tr key={record.id} style={{ borderBottom: '1px solid var(--color-gray-200)' }}>
                <td style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>{record.name}</td>
                <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-slate)' }}>{record.date}</td>
                <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                  <span style={{ padding: '2px 8px', background: '#f1f5f9', borderRadius: '4px', fontSize: '12px' }}>{record.type}</span>
                </td>
                <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-slate)' }}>{record.doctor}</td>
                <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                  <button style={{ color: 'var(--color-deep-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, marginRight: '10px' }}>View</button>
                  <button style={{ color: 'var(--color-slate)', background: 'none', border: 'none', cursor: 'pointer' }}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
