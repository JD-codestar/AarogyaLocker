import { useState } from 'react';

export default function OnlineConsultation() {
  const [isInWaitingRoom, setIsInWaitingRoom] = useState(false);

  if (isInWaitingRoom) {
    return (
      <section style={{ height: 'calc(100vh - var(--nav-height))', background: '#111827', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #374151' }}>
          <div>
            <h2 style={{ fontSize: '18px', margin: 0 }}>Consultation with Dr. Priya Sharma</h2>
            <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>General Physician</p>
          </div>
          <button className="btn" style={{ background: '#EF4444', color: 'white', border: 'none' }} onClick={() => setIsInWaitingRoom(false)}>
            End Call
          </button>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
            📹
          </div>
          <h3 style={{ margin: 0 }}>Waiting for doctor to join...</h3>
          <p style={{ color: '#9CA3AF' }}>You are 1st in the queue. Please do not close this window.</p>
        </div>
        <div style={{ padding: 'var(--space-4)', display: 'flex', justifyContent: 'center', gap: '16px', borderTop: '1px solid #374151' }}>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', background: '#374151', color: 'white', cursor: 'pointer', fontSize: '20px' }}>🎤</button>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', background: '#374151', color: 'white', cursor: 'pointer', fontSize: '20px' }}>📷</button>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', background: '#374151', color: 'white', cursor: 'pointer', fontSize: '20px' }}>💬</button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: 'var(--space-6) 0', background: 'var(--color-bg-light)', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-dark)', marginBottom: 'var(--space-2)' }}>Your Consultations</h1>
        <p style={{ color: 'var(--color-slate)', marginBottom: 'var(--space-8)' }}>Manage your upcoming and past online video consultations.</p>

        <div className="card" style={{ padding: 'var(--space-5)', maxWidth: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div>
              <h3 style={{ fontSize: '20px', color: 'var(--color-deep-blue)', marginBottom: '4px' }}>Dr. Priya Sharma</h3>
              <p style={{ color: 'var(--color-slate)', fontSize: '14px' }}>General Physician</p>
            </div>
            <span className="badge badge-green">Starts in 5 mins</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--color-dark)', fontSize: '14px' }}>
              <strong>Date:</strong> <span>Today</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--color-dark)', fontSize: '14px' }}>
              <strong>Time:</strong> <span>10:30 AM - 10:45 AM</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', color: 'var(--color-dark)', fontSize: '14px' }}>
              <strong>Patient:</strong> <span>Demo User</span>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}
            onClick={() => setIsInWaitingRoom(true)}
          >
            📹 Join Waiting Room
          </button>
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-slate)', marginTop: '12px' }}>
            Note: This is a simulated video consultation environment.
          </p>
        </div>
      </div>
    </section>
  );
}
