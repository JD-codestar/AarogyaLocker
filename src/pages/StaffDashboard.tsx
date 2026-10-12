import { useState } from 'react';
import { useApp } from '../context/AppContext';

interface StaffDashboardProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function StaffDashboard({ onSignInClick }: StaffDashboardProps) {
  const { currentUser, isLoggedIn, records, users } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchedPatient, setSearchedPatient] = useState<typeof users[0] | null>(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Verify Dr. Sharma's appointment schedule", status: 'Pending' },
    { id: 2, title: 'Upload CBC report for pat-101 (Rahul Sharma)', status: 'Completed' },
    { id: 3, title: 'Check MRI Radiology facility calibration', status: 'Pending' }
  ]);
  const [reportSuccess, setReportSuccess] = useState('');

  if (!isLoggedIn || !currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>Staff Access Restricted</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--color-slate)' }}>Please sign in with staff credentials to view the helpdesk (e.g. Anita Desai).</p>
        <button className="btn btn-primary" onClick={onSignInClick}>Staff Sign In</button>
      </div>
    );
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchedPatient(null);
      return;
    }
    const match = users.find(u => 
      u.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.abhaId?.includes(searchQuery)
    ) || users[0]; // fallback to first user for demo
    setSearchedPatient(match);
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
  };

  const patientRecords = searchedPatient 
    ? records.filter(r => r.patientId === searchedPatient.id || searchedPatient.role === 'patient') 
    : [];

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)',
        color: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 8px 24px rgba(180, 83, 9, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'white',
            color: '#b45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 800
          }}>
            {currentUser.avatar || 'ST'}
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>
              Hospital Reception & Triage Helpdesk
            </h1>
            <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '13px' }}>
              Staff Member: <strong>{currentUser.name}</strong> • Desk: Outpatient Reception & Document Dispatch
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Patient Document Lookup */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ marginBottom: 'var(--space-2)', fontSize: '17px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
            Patient Document & ABHA Lookup
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-slate)', marginBottom: 'var(--space-4)' }}>
            Search by Patient ID (e.g. <code>pat-101</code>), Name (e.g. <code>Rahul</code>), or ABHA ID.
          </p>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Enter Patient ID, Name, or ABHA..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', fontSize: '13px' }} 
            />
            <button className="btn btn-secondary" onClick={handleSearch}>
              Search
            </button>
          </div>

          {searchedPatient ? (
            <div style={{ marginTop: '16px', padding: '14px', background: 'var(--color-ice-blue)', borderRadius: '8px', border: '1px solid #e0f2fe' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--color-deep-blue)' }}>{searchedPatient.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-slate)' }}>ID: {searchedPatient.id} • ABHA: {searchedPatient.abhaId || 'Linked'}</div>
                </div>
                <span className="badge badge-green">Verified Patient</span>
              </div>

              <div style={{ marginTop: '12px', borderTop: '1px solid #e0f2fe', paddingTop: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-blue)', marginBottom: '6px' }}>
                  Linked AarogyaLocker Documents ({patientRecords.length})
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '12px' }}>
                  {patientRecords.map(r => (
                    <li key={r.id} style={{ padding: '4px 0', display: 'flex', justifyContent: 'space-between', color: 'var(--color-slate)' }}>
                      <span>📄 {r.name}</span>
                      <strong style={{ color: 'var(--color-deep-blue)' }}>{r.type}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '16px', padding: '14px', background: '#f8fafc', borderRadius: '8px', fontSize: '13px', color: 'var(--color-slate)', textAlign: 'center' }}>
              Enter a query to look up patient digital records.
            </div>
          )}
        </div>

        {/* Task Assignment */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '17px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
            Staff Workflow Tasks
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
            {tasks.map(t => (
              <li 
                key={t.id} 
                onClick={() => toggleTask(t.id)}
                style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid var(--color-gray-200)', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" checked={t.status === 'Completed'} readOnly />
                  <span style={{ textDecoration: t.status === 'Completed' ? 'line-through' : 'none', color: t.status === 'Completed' ? 'var(--color-slate)' : 'inherit' }}>
                    {t.title}
                  </span>
                </div>
                <span className={`badge ${t.status === 'Completed' ? 'badge-green' : 'badge-blue'}`}>
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Issue Reporting */}
        <div className="card" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '17px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
            Facility & Escalation Dispatch
          </h3>

          {reportSuccess && (
            <div style={{ background: '#ecfdf5', color: '#065f46', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', marginBottom: '12px' }}>
              {reportSuccess}
            </div>
          )}

          <select style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', fontSize: '13px' }}>
            <option>Equipment Malfunction (ECG / Ultrasound)</option>
            <option>ABDM Network Gateway Latency</option>
            <option>OPD Queue Congestion Escalation</option>
            <option>Facility Sanitization Request</option>
          </select>
          <textarea 
            placeholder="Describe clinical dispatch or infrastructure issue..." 
            rows={3} 
            style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid var(--color-gray-200)', borderRadius: '8px', fontSize: '13px', resize: 'none' }}
          />
          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={() => {
              setReportSuccess('✓ Incident logged and dispatched to Facility Admin.');
              setTimeout(() => setReportSuccess(''), 3000);
            }}
          >
            Dispatch Ticket
          </button>
        </div>

      </div>
    </div>
  );
}
