import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface PatientDashboardProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function PatientDashboard({ onSignInClick }: PatientDashboardProps) {
  const { currentUser, isLoggedIn, appointments, prescriptions, records, cancelAppointment } = useApp();
  const navigate = useNavigate();

  // Vitals state
  const [vitals, setVitals] = useState({
    bp: '120/80',
    hr: '72 bpm',
    spo2: '98%',
    sugar: '95 mg/dL'
  });
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [newBp, setNewBp] = useState(vitals.bp);
  const [newHr, setNewHr] = useState(vitals.hr);
  const [newSpo2, setNewSpo2] = useState(vitals.spo2);
  const [newSugar, setNewSugar] = useState(vitals.sugar);

  if (!isLoggedIn || !currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>👤</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>Access Restricted</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--color-slate)' }}>Please sign in to view your patient dashboard, upcoming appointments, and vitals.</p>
        <button className="btn btn-primary" onClick={onSignInClick}>Sign In</button>
      </div>
    );
  }

  // Filter patient's appointments
  const myAppointments = appointments.filter(
    a => a.patientId === currentUser.id || a.patientName.toLowerCase() === currentUser.name.toLowerCase()
  );

  // Filter patient's prescriptions
  const myPrescriptions = prescriptions.filter(
    p => p.patientId === currentUser.id
  );

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    setVitals({
      bp: newBp,
      hr: newHr,
      spo2: newSpo2,
      sugar: newSugar
    });
    setShowVitalsModal(false);
  };

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-deep-blue) 0%, #1a4f8b 100%)',
        color: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 4px 20px rgba(15, 62, 109, 0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--color-cyan)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            border: '3px solid rgba(255,255,255,0.3)'
          }}>
            {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
              Welcome back, {currentUser.name}!
            </h1>
            <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '13px' }}>
              ABHA Health ID: <strong style={{ color: 'var(--color-cyan)' }}>{currentUser.abhaId || '91-4521-8932-1104'}</strong> • {currentUser.gender || 'Male'}, {currentUser.age || 32} yrs
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowVitalsModal(true)}
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            🩺 Log Vitals
          </button>
          <Link to="/doctors" className="btn btn-primary">
            + Book Appointment
          </Link>
        </div>
      </div>

      {/* Vitals Summary Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: 'var(--space-6)'
      }}>
        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '28px' }}>❤️</div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-slate)' }}>Blood Pressure</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>{vitals.bp}</div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Normal Range</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '28px' }}>💓</div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-slate)' }}>Heart Rate</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>{vitals.hr}</div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Resting Beat</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '28px' }}>🫁</div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-slate)' }}>Blood Oxygen (SpO2)</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>{vitals.spo2}</div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Optimal</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontSize: '28px' }}>🩸</div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-slate)' }}>Fasting Glucose</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>{vitals.sugar}</div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>Fasting Good</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Appointments & Prescriptions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        
        {/* Upcoming Appointments */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
              Upcoming Consultations ({myAppointments.length})
            </h3>
            <Link to="/doctors" style={{ fontSize: '12px', color: 'var(--color-cyan)', fontWeight: 600, textDecoration: 'none' }}>
              Find More Doctors →
            </Link>
          </div>
          
          <div style={{ padding: '16px 20px' }}>
            {myAppointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-slate)' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>🗓️</div>
                <div style={{ fontSize: '14px' }}>No upcoming appointments booked.</div>
                <Link to="/doctors" className="btn btn-secondary" style={{ marginTop: '10px', fontSize: '12px', display: 'inline-block' }}>
                  Book a Consultation
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {myAppointments.map(apt => (
                  <div key={apt.id} style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: 'var(--color-ice-blue)',
                    border: '1px solid #e0f2fe',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--color-deep-blue)', fontSize: '15px' }}>
                          {apt.doctorName}
                        </div>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '11px',
                          fontWeight: 700,
                          background: apt.status === 'Completed' ? '#dcfce7' : apt.status === 'Waiting' ? '#fef3c7' : '#e0e7ff',
                          color: apt.status === 'Completed' ? '#166534' : apt.status === 'Waiting' ? '#92400e' : '#3730a3'
                        }}>
                          {apt.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--color-slate)', marginTop: '2px' }}>
                        {apt.doctorSpecialty} • {apt.consultationType}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-deep-blue)', marginTop: '4px', fontWeight: 600 }}>
                        📅 {apt.date} at {apt.time} • Fee: ₹{apt.fee}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {apt.consultationType.includes('Video') && apt.status !== 'Completed' && (
                        <button
                          onClick={() => navigate('/consultation')}
                          className="btn btn-primary"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          📹 Join Room
                        </button>
                      )}
                      {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            fontSize: '11px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            padding: '4px'
                          }}
                        >
                          Cancel Slot
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
              Active Medications & Prescriptions ({myPrescriptions.length})
            </h3>
            <Link to="/pharmacy" style={{ fontSize: '12px', color: 'var(--color-cyan)', fontWeight: 600, textDecoration: 'none' }}>
              Order Medicines →
            </Link>
          </div>

          <div style={{ padding: '16px 20px' }}>
            {myPrescriptions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-slate)' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>💊</div>
                <div style={{ fontSize: '14px' }}>No active prescriptions on file.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {myPrescriptions.map(rx => (
                  <div key={rx.id} style={{
                    padding: '14px',
                    borderRadius: '10px',
                    background: '#f8fafc',
                    border: '1px solid var(--color-gray-200)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-deep-blue)', fontSize: '14px' }}>
                        💊 {rx.medication}
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--color-slate)', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>
                        {rx.duration}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--color-slate)', marginTop: '4px' }}>
                      <strong>Dosage:</strong> {rx.dosage}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-slate)', marginTop: '2px' }}>
                      <strong>Instructions:</strong> {rx.instructions}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-cyan)', marginTop: '6px', fontWeight: 600 }}>
                      Prescribed by {rx.doctorName} • {rx.date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Recent Health Locker Documents Strip */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
            Recent Health Locker Files ({records.length})
          </h3>
          <Link to="/health-records" style={{ fontSize: '12px', color: 'var(--color-cyan)', fontWeight: 600, textDecoration: 'none' }}>
            Open Full Health Locker →
          </Link>
        </div>

        <div style={{ padding: '16px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {records.slice(0, 4).map(rec => (
              <div key={rec.id} style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--color-gray-200)',
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {rec.type}
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--color-deep-blue)', fontSize: '13px', marginTop: '2px' }}>
                    {rec.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-slate)', marginTop: '2px' }}>
                    {rec.doctor} • {rec.date}
                  </div>
                </div>
                <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-slate)' }}>{rec.fileSize}</span>
                  <Link to="/health-records" style={{ fontSize: '12px', color: 'var(--color-deep-blue)', fontWeight: 600, textDecoration: 'none' }}>
                    View File
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- LOG VITALS MODAL --- */}
      {showVitalsModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowVitalsModal(false); }}>
          <div className="modal" style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h2>Record Health Vitals</h2>
              <button className="modal-close" onClick={() => setShowVitalsModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSaveVitals}>
                <div className="booking-form-group">
                  <label htmlFor="bp">Blood Pressure (mmHg)</label>
                  <input
                    id="bp"
                    type="text"
                    className="input-field"
                    placeholder="e.g. 120/80"
                    value={newBp}
                    onChange={(e) => setNewBp(e.target.value)}
                  />
                </div>

                <div className="booking-form-group">
                  <label htmlFor="hr">Heart Rate (bpm)</label>
                  <input
                    id="hr"
                    type="text"
                    className="input-field"
                    placeholder="e.g. 72 bpm"
                    value={newHr}
                    onChange={(e) => setNewHr(e.target.value)}
                  />
                </div>

                <div className="booking-form-group">
                  <label htmlFor="spo2">Blood Oxygen SpO2 (%)</label>
                  <input
                    id="spo2"
                    type="text"
                    className="input-field"
                    placeholder="e.g. 98%"
                    value={newSpo2}
                    onChange={(e) => setNewSpo2(e.target.value)}
                  />
                </div>

                <div className="booking-form-group">
                  <label htmlFor="sugar">Blood Glucose (mg/dL)</label>
                  <input
                    id="sugar"
                    type="text"
                    className="input-field"
                    placeholder="e.g. 95 mg/dL"
                    value={newSugar}
                    onChange={(e) => setNewSugar(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                  Save Vitals to Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
