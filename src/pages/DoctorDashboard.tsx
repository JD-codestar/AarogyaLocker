import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SearchIcon, CloseIcon } from '../Icons';

interface DoctorDashboardProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function DoctorDashboard({ onSignInClick }: DoctorDashboardProps) {
  const { currentUser, isLoggedIn, appointments, updateAppointmentStatus, addDoctorNotesAndPrescription } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [patientSearch, setPatientSearch] = useState('');
  const [selectedAptId, setSelectedAptId] = useState<string>('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  
  // E-prescription builder state
  const [showRxBuilder, setShowRxBuilder] = useState(false);
  const [medicines, setMedicines] = useState<Array<{ name: string; dosage: string; duration: string; instructions: string }>>([
    { name: 'Paracetamol 650mg', dosage: '1 tablet TDS', duration: '3 days', instructions: 'After food' }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedDuration, setNewMedDuration] = useState('');
  const [newMedInstructions, setNewMedInstructions] = useState('');

  const [notificationMsg, setNotificationMsg] = useState('');

  if (!isLoggedIn || !currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🩺</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>Doctor Access Restricted</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--color-slate)' }}>Please sign in with provider credentials (e.g. Dr. Priya Sharma).</p>
        <button className="btn btn-primary" onClick={onSignInClick}>Provider Sign In</button>
      </div>
    );
  }

  // Doctor appointments
  const doctorAppointments = appointments.filter(
    a => a.doctorId === currentUser.id || a.doctorName.toLowerCase().includes(currentUser.name.toLowerCase()) || currentUser.role === 'admin'
  );

  const displayedAppointments = doctorAppointments.filter(a => {
    if (filterStatus === 'waiting' && a.status !== 'Waiting') return false;
    if (filterStatus === 'scheduled' && a.status !== 'Scheduled') return false;
    if (filterStatus === 'completed' && a.status !== 'Completed') return false;
    if (!patientSearch.trim()) return true;
    const q = patientSearch.toLowerCase();
    return (
      a.patientName.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      (a.notes && a.notes.toLowerCase().includes(q))
    );
  });

  const selectedApt = doctorAppointments.find(a => a.id === selectedAptId) || displayedAppointments[0];

  const handleAddMedicine = () => {
    if (!newMedName.trim()) return;
    setMedicines(prev => [
      ...prev,
      {
        name: newMedName.trim(),
        dosage: newMedDosage.trim() || '1 tablet daily',
        duration: newMedDuration.trim() || '5 days',
        instructions: newMedInstructions.trim() || 'After meals'
      }
    ]);
    setNewMedName('');
    setNewMedDosage('');
    setNewMedDuration('');
    setNewMedInstructions('');
  };

  const handleRemoveMedicine = (idx: number) => {
    setMedicines(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSaveConsultation = () => {
    if (!selectedApt) return;

    addDoctorNotesAndPrescription(
      selectedApt.id,
      clinicalNotes || selectedApt.notes || 'Routine follow-up completed. Vitals stable.',
      medicines.length > 0 ? medicines : undefined
    );

    setNotificationMsg(`E-Prescription & Consultation Notes saved for ${selectedApt.patientName}! Added directly to patient's AarogyaLocker.`);
    setShowRxBuilder(false);
    setTimeout(() => setNotificationMsg(''), 4000);
  };

  const completedCount = doctorAppointments.filter(a => a.status === 'Completed').length;
  const waitingCount = doctorAppointments.filter(a => a.status === 'Waiting').length;
  const scheduledCount = doctorAppointments.filter(a => a.status === 'Scheduled').length;

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
        color: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 8px 24px rgba(6, 95, 70, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'white',
            color: '#065f46',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 800
          }}>
            {currentUser.avatar || 'DR'}
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>
              {currentUser.name}'s Provider Portal
            </h1>
            <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '13px' }}>
              Specialty: <strong>{currentUser.specialty || 'General Medicine'}</strong> • Medical Council Reg: MCI-2014-9842
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn btn-secondary" 
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
          >
            🗓️ Schedule Manager
          </button>
        </div>
      </div>

      {notificationMsg && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #10b981',
          color: '#065f46',
          padding: '12px 16px',
          borderRadius: '10px',
          marginBottom: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600,
          fontSize: '14px'
        }}>
          <span>✓</span> {notificationMsg}
        </div>
      )}
      
      {/* Quick Stats Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <div className="card" style={{ padding: 'var(--space-4)', background: 'var(--color-ice-blue)', border: 'none' }}>
          <div style={{ fontSize: '13px', color: 'var(--color-slate)' }}>Total Roster</div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>{doctorAppointments.length}</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', background: '#fef3c7', border: 'none' }}>
          <div style={{ fontSize: '13px', color: '#92400e' }}>In Waiting Room</div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#b45309' }}>{waitingCount}</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', background: '#ecfdf5', border: 'none' }}>
          <div style={{ fontSize: '13px', color: '#065f46' }}>Completed Consultations</div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#047857' }}>{completedCount}</div>
        </div>
        <div className="card" style={{ padding: 'var(--space-4)', background: '#e0e7ff', border: 'none' }}>
          <div style={{ fontSize: '13px', color: '#3730a3' }}>Upcoming Scheduled</div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#4338ca' }}>{scheduledCount}</div>
        </div>
      </div>

      {/* Main Layout: Patient Queue + Consultation Console */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 'var(--space-6)' }}>
        
        {/* Patient Queue Column */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
              Today's Patient Queue
            </h3>
            
            {/* Filter */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['all', 'waiting', 'scheduled', 'completed'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '12px',
                    border: '1px solid var(--color-gray-200)',
                    background: filterStatus === s ? 'var(--color-deep-blue)' : 'white',
                    color: filterStatus === s ? 'white' : 'var(--color-slate)',
                    fontSize: '11px',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Quick Search Input */}
          <div style={{ padding: '8px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SearchIcon size={16} color="#64748b" />
            <input
              type="text"
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') setPatientSearch(''); }}
              placeholder="Search patient name, token ID or condition..."
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '12px',
                color: '#1e293b'
              }}
            />
            {patientSearch && (
              <button
                type="button"
                onClick={() => setPatientSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
                title="Clear (Esc)"
              >
                <CloseIcon size={12} />
              </button>
            )}
          </div>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {displayedAppointments.length === 0 ? (
              <li style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--color-slate)', fontSize: '14px' }}>
                No appointments in this category.
              </li>
            ) : (
              displayedAppointments.map(apt => {
                const isSelected = selectedApt?.id === apt.id;
                return (
                  <li 
                    key={apt.id} 
                    onClick={() => {
                      setSelectedAptId(apt.id);
                      setClinicalNotes(apt.notes || '');
                    }}
                    style={{ 
                      padding: '14px 20px', 
                      borderBottom: '1px solid var(--color-gray-200)', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      background: isSelected ? 'var(--color-ice-blue)' : 'white',
                      borderLeft: isSelected ? '4px solid var(--color-cyan)' : '4px solid transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-deep-blue)', fontSize: '14px' }}>
                        {apt.time} • {apt.patientName}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-slate)', marginTop: '2px' }}>
                        {apt.consultationType} • ID: {apt.id}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {/* Consultation Console Column */}
        {selectedApt ? (
          <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: '14px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
                  Active Consultation Console
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--color-slate)', marginTop: '3px' }}>
                  Patient: <strong style={{ color: 'var(--color-deep-blue)' }}>{selectedApt.patientName}</strong> • {selectedApt.consultationType}
                </div>
              </div>

              {/* Status Updater */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {selectedApt.status !== 'In Consultation' && selectedApt.status !== 'Completed' && (
                  <button
                    onClick={() => updateAppointmentStatus(selectedApt.id, 'In Consultation')}
                    className="btn btn-secondary"
                    style={{ fontSize: '12px', padding: '4px 10px' }}
                  >
                    ▶ Begin Call
                  </button>
                )}
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: selectedApt.status === 'Completed' ? '#dcfce7' : '#e0f2fe',
                  color: selectedApt.status === 'Completed' ? '#166534' : '#0369a1'
                }}>
                  Status: {selectedApt.status}
                </span>
              </div>
            </div>

            {/* Clinical Notes */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-deep-blue)', display: 'block', marginBottom: '6px' }}>
                Clinical Assessment & Diagnosis
              </label>
              <textarea
                placeholder="Enter patient symptoms, diagnosis, vitals check, and clinical findings..."
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--color-gray-200)',
                  fontSize: '13px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* E-Prescription Medication List */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-deep-blue)' }}>
                  💊 E-Prescription Medicines ({medicines.length})
                </span>
                <button
                  type="button"
                  onClick={() => setShowRxBuilder(!showRxBuilder)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-cyan)',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {showRxBuilder ? '− Close Rx Drawer' : '+ Add Medication'}
                </button>
              </div>

              {/* Rx Add drawer */}
              {showRxBuilder && (
                <div style={{ background: 'var(--color-ice-blue)', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      placeholder="Medicine Name (e.g. Azithromycin 500mg)"
                      value={newMedName}
                      onChange={(e) => setNewMedName(e.target.value)}
                      style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', fontSize: '12px' }}
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g. 1 tab OD)"
                      value={newMedDosage}
                      onChange={(e) => setNewMedDosage(e.target.value)}
                      style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', fontSize: '12px' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      placeholder="Duration (e.g. 5 days)"
                      value={newMedDuration}
                      onChange={(e) => setNewMedDuration(e.target.value)}
                      style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', fontSize: '12px' }}
                    />
                    <input
                      type="text"
                      placeholder="Instructions (e.g. After food)"
                      value={newMedInstructions}
                      onChange={(e) => setNewMedInstructions(e.target.value)}
                      style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--color-gray-200)', fontSize: '12px' }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMedicine}
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '12px', padding: '6px' }}
                  >
                    Add to Prescription List
                  </button>
                </div>
              )}

              {/* Medicine items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {medicines.map((m, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: '#f8fafc',
                    border: '1px solid var(--color-gray-200)',
                    fontSize: '12px'
                  }}>
                    <div>
                      <strong style={{ color: 'var(--color-deep-blue)' }}>{m.name}</strong> • {m.dosage} • {m.duration} ({m.instructions})
                    </div>
                    <button
                      onClick={() => handleRemoveMedicine(idx)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-gray-200)', display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSaveConsultation}
                className="btn btn-primary"
                style={{ flex: 1, padding: '10px' }}
              >
                ✓ Complete & Issue E-Prescription
              </button>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-slate)' }}>
            Select an appointment from the queue to start consultation notes.
          </div>
        )}

      </div>
    </div>
  );
}
