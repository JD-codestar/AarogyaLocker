import { useState } from 'react';
import { useApp } from '../context/AppContext';

interface AdminDashboardProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function AdminDashboard({ onSignInClick }: AdminDashboardProps) {
  const { currentUser, isLoggedIn, appointments, records, users } = useApp();

  const [verifications, setVerifications] = useState([
    { id: 'DOC-902', name: 'Dr. Kavitha Nair', specialty: 'Dermatology', status: 'Pending' },
    { id: 'DOC-903', name: 'Dr. Rahul Mehta', specialty: 'Orthopedics', status: 'Pending' }
  ]);

  const [complaints, setComplaints] = useState([
    { id: 'TKT-101', subject: 'Refund for cancelled appointment', priority: 'High', status: 'Open' },
    { id: 'TKT-102', subject: 'Sync issue with ABHA health locker', priority: 'Medium', status: 'Open' }
  ]);

  if (!isLoggedIn || !currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚙️</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>Admin Access Restricted</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--color-slate)' }}>Please sign in with administrator credentials (e.g. Vikram Malhotra).</p>
        <button className="btn btn-primary" onClick={onSignInClick}>Admin Sign In</button>
      </div>
    );
  }

  const handleVerify = (id: string, newStatus: string) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const handleResolveTicket = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
  };

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
        color: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 8px 24px rgba(76, 29, 149, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'white',
            color: '#4c1d95',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 800
          }}>
            {currentUser.avatar || 'AD'}
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>
              National Health Network & Platform Admin
            </h1>
            <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '13px' }}>
              Administrator: <strong>{currentUser.name}</strong> • ABDM Gateway: Connected • Node Security: Enforced
            </p>
          </div>
        </div>
      </div>
      
      {/* Overview Analytics Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-4)', borderTop: '4px solid var(--color-deep-blue)' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-slate)' }}>Platform Users</div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>{users.length + 12450}</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', borderTop: '4px solid var(--color-cyan)' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-slate)' }}>Active Appointments</div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-cyan)' }}>{appointments.length}</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', borderTop: '4px solid #10b981' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-slate)' }}>Encrypted Locker Records</div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#10b981' }}>{records.length}</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', borderTop: '4px solid #EF4444' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-slate)' }}>Open Grievances</div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#ef4444' }}>{complaints.filter(c => c.status === 'Open').length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Doctor Verification Queue */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', background: 'var(--color-ice-blue)', borderBottom: '1px solid var(--color-gray-200)' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
              Doctor Credential Verification Pipeline
            </h3>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {verifications.map(doc => (
              <li key={doc.id} style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-deep-blue)' }}>{doc.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-slate)' }}>{doc.specialty} • {doc.id}</div>
                  <div style={{ fontSize: '11px', color: doc.status === 'Verified' ? '#059669' : doc.status === 'Rejected' ? '#dc2626' : 'var(--color-slate)', fontWeight: 600, marginTop: '2px' }}>
                    Status: {doc.status}
                  </div>
                </div>
                {doc.status === 'Pending' ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleVerify(doc.id, 'Rejected')}
                      className="btn btn-secondary" 
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleVerify(doc.id, 'Verified')}
                      className="btn btn-primary" 
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                    >
                      Verify
                    </button>
                  </div>
                ) : (
                  <span className={`badge ${doc.status === 'Verified' ? 'badge-green' : 'badge-blue'}`}>
                    {doc.status}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Complaint Resolution */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', background: 'var(--color-ice-blue)', borderBottom: '1px solid var(--color-gray-200)' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
              Patient Grievance Resolution
            </h3>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {complaints.map(ticket => (
              <li key={ticket.id} style={{ padding: '14px 20px', borderBottom: '1px solid var(--color-gray-200)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-deep-blue)', fontSize: '14px' }}>{ticket.subject}</div>
                  <span style={{ fontSize: '11px', padding: '2px 8px', background: ticket.priority === 'High' ? '#fee2e2' : '#fef3c7', color: ticket.priority === 'High' ? '#b91c1c' : '#b45309', borderRadius: '4px', fontWeight: 700 }}>
                    {ticket.priority}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-slate)' }}>Ticket ID: {ticket.id} • Status: <strong>{ticket.status}</strong></div>
                  {ticket.status === 'Open' ? (
                    <button 
                      onClick={() => handleResolveTicket(ticket.id)}
                      style={{ color: 'var(--color-deep-blue)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700 }}
                    >
                      Mark Resolved ✓
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>✓ Resolved</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
