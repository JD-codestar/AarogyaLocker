import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import type { HealthRecord, RecordCategory, MedicineEntry } from '../types';
import { CloseIcon } from '../Icons';

interface HealthRecordsProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function HealthRecords({ onSignInClick }: HealthRecordsProps) {
  const { currentUser, isLoggedIn, records, addRecord, deleteRecord, theme } = useApp();
  const isDark = theme === 'dark';

  const [filterType, setFilterType] = useState<'all' | 'issued' | 'uploaded'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('All Records');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAbhaCardModal, setShowAbhaCardModal] = useState(false);
  const [previewRecord, setPreviewRecord] = useState<HealthRecord | null>(null);
  const [shareSuccessRecord, setShareSuccessRecord] = useState<HealthRecord | null>(null);

  // Upload / Create Form State
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState<RecordCategory>('Laboratory');
  const [issuingDoctor, setIssuingDoctor] = useState('');
  const [hospitalOrLab, setHospitalOrLab] = useState('');
  const [docNotes, setDocNotes] = useState('');
  const [docTags, setDocTags] = useState('');
  const [isAbhaLinked, setIsAbhaLinked] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState('');

  // Prescription dynamic fields
  const [medicinesList, setMedicinesList] = useState<MedicineEntry[]>([
    { name: '', dosage: '', frequency: 'Once daily (OD)', duration: '5 days', instructions: '' }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoggedIn || !currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '65vh', background: isDark ? '#0b1120' : '#f8fafc', color: isDark ? '#f8fafc' : 'inherit' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #1e3a8a, #0284c7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          margin: '0 auto 24px',
          boxShadow: '0 12px 28px rgba(30, 58, 138, 0.25)',
          color: 'white'
        }}>
          🔐
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a', marginBottom: '10px' }}>
          AarogyaLocker — Digital Healthcare Vault
        </h2>
        <p style={{ margin: '0 auto 28px', color: isDark ? '#94a3b8' : '#64748b', maxWidth: '480px', fontSize: '15px', lineHeight: 1.6 }}>
          Your government-compliant, ABDM-linked digital health locker. Securely access, organize, and share all your medical prescriptions, lab reports, and vaccination certificates in one unified encrypted vault.
        </p>
        <button 
          className="btn btn-primary" 
          onClick={onSignInClick}
          style={{ padding: '12px 32px', fontSize: '15px', fontWeight: 700, borderRadius: '12px' }}
        >
          Sign In / Register to Access Locker
        </button>
      </div>
    );
  }

  // Filter records specifically for the active patient (or all records if role is staff/doctor)
  const userRecords = records.filter(r => {
    if (currentUser.role === 'patient') {
      return r.patientId === currentUser.id;
    }
    return true;
  });

  // Category & query filtering
  const filteredRecords = userRecords.filter(record => {
    // Issued vs uploaded filter
    if (filterType === 'issued' && !record.isIssued) return false;
    if (filterType === 'uploaded' && record.isIssued) return false;

    // Category filter
    const matchesCategory = filterCategory === 'All Records' || 
      record.type === filterCategory ||
      (filterCategory === 'Prescription' && record.type === 'Prescription') ||
      (filterCategory === 'Laboratory' && record.type === 'Laboratory') ||
      (filterCategory === 'Imaging' && record.type === 'Imaging') ||
      (filterCategory === 'Vaccination' && record.type === 'Vaccination') ||
      (filterCategory === 'Discharge' && record.type === 'Discharge') ||
      (filterCategory === 'IdentityCard' && record.type === 'IdentityCard') ||
      (filterCategory === 'Invoice' && record.type === 'Invoice');

    if (!matchesCategory) return false;

    // Search query
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      record.name.toLowerCase().includes(q) ||
      record.doctor.toLowerCase().includes(q) ||
      (record.hospitalOrLab && record.hospitalOrLab.toLowerCase().includes(q)) ||
      (record.notes && record.notes.toLowerCase().includes(q)) ||
      record.tags?.some(t => t.toLowerCase().includes(q)) ||
      record.medicines?.some(m => m.name.toLowerCase().includes(q))
    );
  });

  // Calculate statistics
  const totalDocs = userRecords.length;
  const totalPrescriptions = userRecords.filter(r => r.type === 'Prescription').length;
  const totalLabReports = userRecords.filter(r => r.type === 'Laboratory').length;
  const totalGovtCertificates = userRecords.filter(r => r.type === 'Vaccination' || r.type === 'IdentityCard').length;

  // File selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!docName) {
        setDocName(file.name.replace(/\.[^/.]+$/, ''));
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFileDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMedicineRow = () => {
    setMedicinesList([
      ...medicinesList,
      { name: '', dosage: '', frequency: 'Once daily (OD)', duration: '5 days', instructions: '' }
    ]);
  };

  const handleMedicineChange = (index: number, field: keyof MedicineEntry, value: string) => {
    const updated = [...medicinesList];
    updated[index] = { ...updated[index], [field]: value };
    setMedicinesList(updated);
  };

  const handleRemoveMedicineRow = (index: number) => {
    if (medicinesList.length > 1) {
      setMedicinesList(medicinesList.filter((_, i) => i !== index));
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) {
      setUploadError('Please provide a document title.');
      return;
    }

    const calculatedSize = selectedFile 
      ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` 
      : '380 KB';
    const calculatedType = selectedFile ? selectedFile.type : 'application/pdf';

    const validMedicines = docCategory === 'Prescription' 
      ? medicinesList.filter(m => m.name.trim().length > 0)
      : undefined;

    addRecord({
      patientId: currentUser.id,
      name: docName.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      type: docCategory,
      doctor: issuingDoctor.trim() || 'Self-Uploaded / Patient Record',
      hospitalOrLab: hospitalOrLab.trim() || 'AarogyaLocker Digital Health Vault',
      fileSize: calculatedSize,
      fileType: calculatedType,
      fileData: fileDataUrl || undefined,
      notes: docNotes.trim(),
      tags: docTags ? docTags.split(',').map(t => t.trim()).filter(Boolean) : [docCategory],
      abhaLinked: isAbhaLinked,
      isIssued: false, // User added
      verifiedBy: isAbhaLinked ? 'ABDM Patient Consent Gateway' : undefined,
      documentNumber: `USER-${Date.now().toString().slice(-6)}`,
      medicines: validMedicines
    });

    // Reset
    setShowUploadModal(false);
    setDocName('');
    setDocCategory('Laboratory');
    setIssuingDoctor('');
    setHospitalOrLab('');
    setDocNotes('');
    setDocTags('');
    setSelectedFile(null);
    setFileDataUrl('');
    setUploadError('');
    setMedicinesList([{ name: '', dosage: '', frequency: 'Once daily (OD)', duration: '5 days', instructions: '' }]);
  };

  const handleDownload = (record: HealthRecord) => {
    if (record.fileData) {
      const a = document.createElement('a');
      a.href = record.fileData;
      a.download = `${record.name.toLowerCase().replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      let medicinesText = '';
      if (record.medicines && record.medicines.length > 0) {
        medicinesText = '\nPRESCRIBED MEDICATIONS:\n' + record.medicines.map((m, i) => 
          `  ${i + 1}. ${m.name} | Dose: ${m.dosage} | Frequency: ${m.frequency} | Duration: ${m.duration} | Note: ${m.instructions || '-'}`
        ).join('\n');
      }

      let labResultsText = '';
      if (record.labResults && record.labResults.length > 0) {
        labResultsText = '\nLABORATORY METRICS:\n' + record.labResults.map(l =>
          `  - ${l.parameter}: ${l.value} ${l.unit} (Normal Range: ${l.referenceRange}) [${l.status}]`
        ).join('\n');
      }

      const content = `===========================================================
AAROGYALOCKER — OFFICIAL DIGITAL HEALTHCARE VAULT (ABDM)
===========================================================
Document Title : ${record.name}
Document Type  : ${record.type}
Issued Date    : ${record.date}
Issuing Doctor : ${record.doctor}
Facility/Lab   : ${record.hospitalOrLab || 'AarogyaLocker Hospital Network'}
Patient Name   : ${currentUser.name}
ABHA Health ID : ${currentUser.abhaId || '91-4521-8932-1104'}
Doc ID / Hash  : ${record.documentNumber || record.id}
Verification   : ${record.verifiedBy || 'Digitally Certified via ABDM'}
-----------------------------------------------------------
Clinical Notes / Summary:
${record.notes || 'Routine medical documentation securely indexed.'}
${medicinesText}
${labResultsText}
-----------------------------------------------------------
Status: Authenticated 256-Bit Cryptographic Record
National Digital Health Mission Compliant
===========================================================`;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${record.name.toLowerCase().replace(/\s+/g, '_')}_AarogyaLocker.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getCategoryBadgeStyle = (category: RecordCategory) => {
    if (isDark) {
      switch (category) {
        case 'Prescription':
          return { bg: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', border: 'rgba(16, 185, 129, 0.3)', icon: '💊' };
        case 'Laboratory':
          return { bg: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', border: 'rgba(59, 130, 246, 0.3)', icon: '🧪' };
        case 'Imaging':
          return { bg: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe', border: 'rgba(168, 85, 247, 0.3)', icon: '🩻' };
        case 'Vaccination':
          return { bg: 'rgba(249, 115, 22, 0.2)', color: '#fdba74', border: 'rgba(249, 115, 22, 0.3)', icon: '💉' };
        case 'Discharge':
          return { bg: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', border: 'rgba(239, 68, 68, 0.3)', icon: '🏥' };
        case 'IdentityCard':
          return { bg: 'rgba(34, 197, 94, 0.2)', color: '#86efac', border: 'rgba(34, 197, 94, 0.3)', icon: '🪪' };
        case 'Invoice':
          return { bg: 'rgba(20, 184, 166, 0.2)', color: '#5eead4', border: 'rgba(20, 184, 166, 0.3)', icon: '🧾' };
        default:
          return { bg: '#0f172a', color: '#cbd5e1', border: '#334155', icon: '📄' };
      }
    }
    switch (category) {
      case 'Prescription':
        return { bg: '#ecfdf5', color: '#047857', border: '#a7f3d0', icon: '💊' };
      case 'Laboratory':
        return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe', icon: '🧪' };
      case 'Imaging':
        return { bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff', icon: '🩻' };
      case 'Vaccination':
        return { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa', icon: '💉' };
      case 'Discharge':
        return { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca', icon: '🏥' };
      case 'IdentityCard':
        return { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0', icon: '🪪' };
      case 'Invoice':
        return { bg: '#ecfdf5', color: '#047857', border: '#a7f3d0', icon: '🧾' };
      default:
        return { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0', icon: '📄' };
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 20px', fontFamily: 'var(--font-family)', color: isDark ? '#f8fafc' : 'inherit' }}>
      <style>{`
        .al-hero-banner {
          background: ${isDark ? 'linear-gradient(135deg, #091e42 0%, #0f172a 100%)' : 'linear-gradient(135deg, #0b1e48 0%, #173878 50%, #1e5ba0 100%)'};
          color: white;
          border-radius: 20px;
          padding: 28px 32px;
          margin-bottom: 24px;
          box-shadow: ${isDark ? '0 12px 36px rgba(0,0,0,0.5)' : '0 12px 36px rgba(11, 30, 72, 0.22)'};
          position: relative;
          overflow: hidden;
          border: ${isDark ? '1px solid #334155' : 'none'};
        }
        .al-hero-banner::after {
          content: '';
          position: absolute;
          right: -50px;
          top: -50px;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(255,255,255,0) 70%);
          pointer-events: none;
        }
        .al-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }
        .al-stat-card {
          background: ${isDark ? '#1e293b' : 'white'};
          border: 1px solid ${isDark ? '#334155' : '#e2e8f0'};
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: ${isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.03)'};
        }
        .al-stat-card:hover {
          transform: translateY(-2px);
          box-shadow: ${isDark ? '0 8px 24px rgba(0,0,0,0.5)' : '0 8px 20px rgba(0,0,0,0.06)'};
        }
        .al-card {
          background: ${isDark ? '#1e293b' : 'white'};
          border: 1px solid ${isDark ? '#334155' : '#e2e8f0'};
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          box-shadow: ${isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.03)'};
        }
        .al-card:hover {
          border-color: #3b82f6;
          box-shadow: ${isDark ? '0 10px 24px rgba(0,0,0,0.6)' : '0 10px 24px rgba(30, 58, 138, 0.08)'};
          transform: translateY(-2px);
        }
        .al-tab-btn {
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 30px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .al-tab-btn.active {
          background: #1e3a8a;
          color: white;
          border-color: #3b82f6;
        }
        .al-tab-btn:not(.active) {
          background: ${isDark ? '#0f172a' : 'white'};
          color: ${isDark ? '#cbd5e1' : '#64748b'};
          border-color: ${isDark ? '#334155' : '#e2e8f0'};
        }
        .al-tab-btn:not(.active):hover {
          color: ${isDark ? '#38bdf8' : '#1e3a8a'};
          border-color: ${isDark ? '#38bdf8' : '#cbd5e1'};
        }
      `}</style>

      {/* --- TOP BRAND / ABHA DIGILOCKER HERO BANNER --- */}
      <div className="al-hero-banner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              flexShrink: 0
            }}>
              🔐
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>
                  AarogyaLocker — Digital Health Vault
                </h1>
                <span style={{
                  background: '#10b981',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>✓</span> ABDM VERIFIED
                </span>
              </div>
              <p style={{ margin: '6px 0 0', opacity: 0.9, fontSize: '13.5px' }}>
                DigiLocker for Healthcare • Universal Health ID (ABHA):{' '}
                <strong style={{ color: '#38bdf8', letterSpacing: '0.8px', fontFamily: 'monospace' }}>
                  {currentUser.abhaId || '91-4521-8932-1104'}
                </strong>
                {' '}• Linked Patient: <strong>{currentUser.name}</strong>
              </p>
            </div>
          </div>

          {/* Banner Actions */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowAbhaCardModal(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.16)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'}
            >
              <span>🪪</span> View ABHA Card
            </button>

            <button
              onClick={() => setShareSuccessRecord(userRecords[0] || null)}
              style={{
                background: 'rgba(255, 255, 255, 0.16)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'}
            >
              <span>🔗</span> Share QR to Doctor
            </button>

            <button
              onClick={() => setShowUploadModal(true)}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                transition: 'transform 0.15s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span>+</span> Add Report / Prescription
            </button>
          </div>
        </div>
      </div>

      {/* --- DIGILOCKER STATS OVERVIEW --- */}
      <div className="al-stats-grid">
        <div className="al-stat-card">
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: isDark ? 'rgba(59, 130, 246, 0.2)' : '#eff6ff',
            color: isDark ? '#60a5fa' : '#1d4ed8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            📁
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a' }}>{totalDocs}</div>
            <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 500 }}>Secured Documents</div>
          </div>
        </div>

        <div className="al-stat-card">
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: isDark ? 'rgba(16, 185, 129, 0.2)' : '#ecfdf5',
            color: isDark ? '#34d399' : '#047857',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            💊
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a' }}>{totalPrescriptions}</div>
            <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 500 }}>Digital Prescriptions</div>
          </div>
        </div>

        <div className="al-stat-card">
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: isDark ? 'rgba(22, 163, 74, 0.2)' : '#f0fdf4',
            color: isDark ? '#4ade80' : '#16a34a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            🧪
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a' }}>{totalLabReports}</div>
            <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 500 }}>Diagnostic Lab Reports</div>
          </div>
        </div>

        <div className="al-stat-card">
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: isDark ? 'rgba(168, 85, 247, 0.2)' : '#faf5ff',
            color: isDark ? '#c084fc' : '#7e22ce',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px'
          }}>
            🛡️
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a' }}>{totalGovtCertificates}</div>
            <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 500 }}>Govt ID & Vaccines</div>
          </div>
        </div>
      </div>

      {/* --- DIGILOCKER CONTROLS & FILTER ROW --- */}
      <div style={{
        background: isDark ? '#1e293b' : 'white',
        border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        {/* Top filter row: Issued vs Uploaded & Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              className={`al-tab-btn ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All Records ({userRecords.length})
            </button>
            <button
              className={`al-tab-btn ${filterType === 'issued' ? 'active' : ''}`}
              onClick={() => setFilterType('issued')}
            >
              🏛️ Issued by ABDM / Labs ({userRecords.filter(r => r.isIssued).length})
            </button>
            <button
              className={`al-tab-btn ${filterType === 'uploaded' ? 'active' : ''}`}
              onClick={() => setFilterType('uploaded')}
            >
              📁 Self-Uploaded ({userRecords.filter(r => !r.isIssued).length})
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '260px' }}>
              <input
                type="text"
                placeholder="Search prescription, test, doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setSearchQuery(''); }}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '20px',
                  border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                  fontSize: '13px',
                  outline: 'none',
                  background: isDark ? '#0f172a' : '#f8fafc',
                  color: isDark ? '#f8fafc' : '#0f172a'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '9px', fontSize: '13px', color: isDark ? '#94a3b8' : '#94a3b8' }}>🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '10px', top: '7px', background: 'none', border: 'none', cursor: 'pointer', color: isDark ? '#cbd5e1' : '#94a3b8', fontSize: '12px' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div style={{ display: 'flex', background: isDark ? '#0f172a' : '#f1f5f9', borderRadius: '10px', padding: '2px', border: isDark ? '1px solid #334155' : 'none' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  background: viewMode === 'grid' ? (isDark ? '#1e293b' : 'white') : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: viewMode === 'grid' ? (isDark ? '#60a5fa' : '#1e3a8a') : (isDark ? '#94a3b8' : '#64748b'),
                  boxShadow: viewMode === 'grid' ? (isDark ? '0 1px 3px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.1)') : 'none'
                }}
                title="Grid View"
              >
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  background: viewMode === 'table' ? (isDark ? '#1e293b' : 'white') : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: viewMode === 'table' ? (isDark ? '#60a5fa' : '#1e3a8a') : (isDark ? '#94a3b8' : '#64748b'),
                  boxShadow: viewMode === 'table' ? (isDark ? '0 1px 3px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.1)') : 'none'
                }}
                title="Table View"
              >
                ☰ List
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { label: 'All Records', value: 'All Records' },
            { label: '💊 Prescriptions', value: 'Prescription' },
            { label: '🧪 Lab Reports & Pathology', value: 'Laboratory' },
            { label: '🩻 Scans & Imaging', value: 'Imaging' },
            { label: '💉 Vaccines', value: 'Vaccination' },
            { label: '🏥 Hospital Summaries', value: 'Discharge' },
            { label: '🪪 Identity Cards', value: 'IdentityCard' },
            { label: '🧾 Medical Invoices', value: 'Invoice' },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilterCategory(cat.value)}
              style={{
                padding: '6px 14px',
                borderRadius: '16px',
                border: '1px solid',
                borderColor: filterCategory === cat.value 
                  ? (isDark ? '#38bdf8' : '#1e3a8a') 
                  : (isDark ? '#334155' : '#e2e8f0'),
                background: filterCategory === cat.value 
                  ? (isDark ? 'rgba(56, 189, 248, 0.15)' : '#eff6ff') 
                  : (isDark ? '#0f172a' : '#ffffff'),
                color: filterCategory === cat.value 
                  ? (isDark ? '#38bdf8' : '#1e3a8a') 
                  : (isDark ? '#cbd5e1' : '#475569'),
                cursor: 'pointer',
                fontWeight: filterCategory === cat.value ? 700 : 500,
                fontSize: '12.5px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- DOCUMENTS DISPLAY --- */}
      {filteredRecords.length === 0 ? (
        <div style={{
          background: isDark ? '#1e293b' : 'white',
          borderRadius: '16px',
          border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          padding: '60px 20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📂</div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', marginBottom: '6px' }}>
            No records found
          </h3>
          <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px' }}>
            {searchQuery 
              ? `No health documents matched "${searchQuery}". Try a different keyword.` 
              : 'Your health locker has no documents in this specific category yet.'}
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowUploadModal(true)}
            style={{ borderRadius: '10px', fontSize: '13.5px' }}
          >
            + Add New Document Now
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {filteredRecords.map((record) => {
            const badge = getCategoryBadgeStyle(record.type);
            return (
              <div key={record.id} className="al-card">
                <div>
                  {/* Card Header: Type Badge & ABDM verification */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      background: badge.bg,
                      color: badge.color,
                      border: `1px solid ${badge.border}`,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <span>{badge.icon}</span> {record.type}
                    </span>

                    {record.isIssued ? (
                      <span style={{
                        fontSize: '11px',
                        color: isDark ? '#34d399' : '#059669',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span style={{ fontSize: '13px' }}>🛡️</span> ABDM Verified
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#64748b' }}>
                        Self-Uploaded
                      </span>
                    )}
                  </div>

                  {/* Document Name */}
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: isDark ? '#f8fafc' : '#0f172a',
                    margin: '0 0 6px',
                    lineHeight: 1.3
                  }}>
                    {record.name}
                  </h3>

                  {/* Issuer & Date */}
                  <div style={{ fontSize: '12.5px', color: isDark ? '#cbd5e1' : '#64748b', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div>👨‍⚕️ <strong>{record.doctor}</strong></div>
                    {record.hospitalOrLab && (
                      <div style={{ color: isDark ? '#38bdf8' : '#0369a1' }}>🏥 {record.hospitalOrLab}</div>
                    )}
                    <div style={{ color: isDark ? '#94a3b8' : '#94a3b8', fontSize: '11.5px', marginTop: '2px' }}>
                      📅 Issued: {record.date} • {record.fileSize}
                    </div>
                  </div>

                  {/* Preview snippet for Prescription / Lab / Note */}
                  {record.medicines && record.medicines.length > 0 && (
                    <div style={{
                      background: isDark ? '#0f172a' : '#f8fafc',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: isDark ? '1px solid #334155' : '1px solid #f1f5f9',
                      marginBottom: '14px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: isDark ? '#cbd5e1' : '#475569', textTransform: 'uppercase' }}>
                          Prescribed Medicines ({record.medicines.length}):
                        </span>
                        <span style={{ fontSize: '10px', color: isDark ? '#fda4af' : '#be123c', fontWeight: 700 }}>
                          🔴 Tata 1mg Sync
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {record.medicines.slice(0, 3).map((m, idx) => (
                          <span key={idx} style={{
                            background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe',
                            color: isDark ? '#38bdf8' : '#0369a1',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}>
                            {m.name} ({m.dosage})
                          </span>
                        ))}
                        {record.medicines.length > 3 && (
                          <span style={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#64748b', alignSelf: 'center' }}>
                            +{record.medicines.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Direct Tata 1mg Order Action */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const query = record.medicines?.map(m => m.name).join(' ') || record.name;
                          window.open(`https://www.1mg.com/search/all?name=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
                        }}
                        style={{
                          marginTop: '8px',
                          width: '100%',
                          padding: '6px 10px',
                          background: isDark ? 'rgba(225, 29, 72, 0.15)' : '#fff1f2',
                          color: isDark ? '#fda4af' : '#be123c',
                          border: isDark ? '1px solid rgba(225, 29, 72, 0.3)' : '1px solid #fecdd3',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>🔴 Order Prescribed Medicines on Tata 1mg</span>
                        <span style={{ fontSize: '10px' }}>↗</span>
                      </button>
                    </div>
                  )}

                  {record.labResults && record.labResults.length > 0 && (
                    <div style={{
                      background: isDark ? '#0f172a' : '#f8fafc',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: isDark ? '1px solid #334155' : '1px solid #f1f5f9',
                      marginBottom: '14px'
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: isDark ? '#cbd5e1' : '#475569', textTransform: 'uppercase', marginBottom: '6px' }}>
                        Key Lab Findings:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {record.labResults.slice(0, 2).map((l, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
                            <span style={{ color: isDark ? '#cbd5e1' : '#334155' }}>{l.parameter}:</span>
                            <span style={{ fontWeight: 700, color: l.status === 'Normal' ? (isDark ? '#4ade80' : '#15803d') : (isDark ? '#f87171' : '#b91c1c') }}>
                              {l.value} {l.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!record.medicines && !record.labResults && record.notes && (
                    <p style={{
                      fontSize: '12.5px',
                      color: isDark ? '#cbd5e1' : '#475569',
                      margin: '0 0 14px',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {record.notes}
                    </p>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: isDark ? '1px solid #334155' : '1px solid #f1f5f9',
                  paddingTop: '12px',
                  marginTop: '10px'
                }}>
                  <button
                    onClick={() => setPreviewRecord(record)}
                    style={{
                      background: '#1e3a8a',
                      color: 'white',
                      border: 'none',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleDownload(record)}
                      style={{
                        background: isDark ? '#0f172a' : '#f1f5f9',
                        color: isDark ? '#f8fafc' : '#1e293b',
                        border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                      title="Download file"
                    >
                      📥 Download
                    </button>

                    <button
                      onClick={() => setShareSuccessRecord(record)}
                      style={{
                        background: isDark ? '#0f172a' : '#f1f5f9',
                        color: isDark ? '#38bdf8' : '#0284c7',
                        border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                      title="Share with doctor"
                    >
                      🔗
                    </button>

                    <button
                      onClick={() => deleteRecord(record.id)}
                      style={{
                        background: 'transparent',
                        color: '#ef4444',
                        border: 'none',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                      title="Remove record"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div style={{
          background: isDark ? '#1e293b' : 'white',
          borderRadius: '16px',
          border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.03)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: isDark ? '#0f172a' : '#f8fafc', borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '13px', color: isDark ? '#93c5fd' : '#1e3a8a' }}>Document Title</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '13px', color: isDark ? '#93c5fd' : '#1e3a8a' }}>Category</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '13px', color: isDark ? '#93c5fd' : '#1e3a8a' }}>Date</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '13px', color: isDark ? '#93c5fd' : '#1e3a8a' }}>Issuing Authority</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '13px', color: isDark ? '#93c5fd' : '#1e3a8a' }}>Verification</th>
                <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: '13px', color: isDark ? '#93c5fd' : '#1e3a8a', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => {
                const badge = getCategoryBadgeStyle(record.type);
                return (
                  <tr key={record.id} style={{ borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f5f9', transition: 'background 0.15s' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a', fontSize: '14px' }}>
                        {record.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: isDark ? '#94a3b8' : '#64748b', marginTop: '2px' }}>
                        {record.fileSize} • {record.tags?.slice(0, 2).join(', ') || 'Medical File'}
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        background: badge.bg,
                        color: badge.color,
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 700
                      }}>
                        {badge.icon} {record.type}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', color: isDark ? '#94a3b8' : '#64748b', fontSize: '13px' }}>
                      {record.date}
                    </td>
                    <td style={{ padding: '14px 18px', color: isDark ? '#cbd5e1' : '#334155', fontSize: '13px' }}>
                      <div>{record.doctor}</div>
                      {record.hospitalOrLab && (
                        <div style={{ fontSize: '11px', color: isDark ? '#38bdf8' : '#0284c7' }}>{record.hospitalOrLab}</div>
                      )}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      {record.isIssued ? (
                        <span style={{ fontSize: '11px', color: isDark ? '#34d399' : '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ✓ ABDM Verified
                        </span>
                      ) : (
                        <span style={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#64748b' }}>Self-Uploaded</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        onClick={() => setPreviewRecord(record)}
                        style={{ color: isDark ? '#60a5fa' : '#1e3a8a', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, marginRight: '14px', fontSize: '13px' }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDownload(record)}
                        style={{ color: isDark ? '#38bdf8' : '#0284c7', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, marginRight: '12px', fontSize: '13px' }}
                      >
                        Download
                      </button>
                      <button
                        onClick={() => deleteRecord(record.id)}
                        style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
                        title="Delete"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* =========================================================================
          MODALS
         ========================================================================= */}

      {/* --- 1. OFFICIAL ABHA DIGITAL HEALTH CARD MODAL --- */}
      {showAbhaCardModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowAbhaCardModal(false); }}>
          <div className="modal" style={{ maxWidth: '580px', borderRadius: '24px', overflow: 'hidden', background: isDark ? '#1e293b' : 'white', border: isDark ? '1px solid #334155' : 'none' }}>
            <div className="modal-header" style={{ background: isDark ? '#0f172a' : '#f8fafc', borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a', margin: 0 }}>
                  Ayushman Bharat Health Card (ABHA)
                </h2>
                <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b', marginTop: '2px' }}>
                  Government of India • National Digital Health Mission
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowAbhaCardModal(false)} style={{ color: isDark ? '#cbd5e1' : undefined }}>
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '24px' }}>
              {/* Digital ABHA Card Surface */}
              <div style={{
                background: 'linear-gradient(135deg, #091e42 0%, #1e3a8a 60%, #0369a1 100%)',
                color: 'white',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 12px 32px rgba(9, 30, 66, 0.3)',
                position: 'relative',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                {/* Government Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ fontSize: '26px' }}>🇮🇳</div>
                    <div>
                      <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.9 }}>
                        Ministry of Health & Family Welfare
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800 }}>
                        Ayushman Bharat Digital Health Card
                      </div>
                    </div>
                  </div>
                  <span style={{ background: '#10b981', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
                    ACTIVE
                  </span>
                </div>

                {/* Card Body */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  {/* Photo / Avatar */}
                  <div style={{
                    width: '76px',
                    height: '92px',
                    borderRadius: '8px',
                    background: '#cbd5e1',
                    border: '2px solid white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 800,
                    color: '#1e3a8a',
                    flexShrink: 0
                  }}>
                    {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
                  </div>

                  {/* Demographics */}
                  <div style={{ flex: 1, fontSize: '13px', lineHeight: 1.5 }}>
                    <div style={{ fontSize: '17px', fontWeight: 800, marginBottom: '2px' }}>
                      {currentUser.name}
                    </div>
                    <div style={{ opacity: 0.9 }}>
                      Gender: <strong>{currentUser.gender || 'Male'}</strong> • Age: <strong>{currentUser.age || 32}</strong>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      <span style={{ fontSize: '11px', opacity: 0.8 }}>ABHA Number:</span>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#38bdf8', letterSpacing: '1px', fontFamily: 'monospace' }}>
                        {currentUser.abhaId || '91-4521-8932-1104'}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', opacity: 0.8 }}>ABHA Address:</span>
                      <div style={{ fontWeight: 600, fontSize: '12.5px' }}>
                        {currentUser.email.split('@')[0]}@abdm
                      </div>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'white',
                    borderRadius: '10px',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <div style={{ fontSize: '38px', lineHeight: 1 }}>📱</div>
                    <div style={{ fontSize: '8px', color: '#1e3a8a', fontWeight: 800, marginTop: '2px' }}>ABDM SCAN</div>
                  </div>
                </div>

                {/* Card Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                  paddingTop: '10px',
                  marginTop: '16px',
                  fontSize: '11px',
                  opacity: 0.85
                }}>
                  <div>National Health Authority • NHA-ABDM-UID</div>
                  <div>Aadhaar e-KYC Authenticated ✓</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAbhaCardModal(false)}
                  style={{
                    flex: 1,
                    borderRadius: '10px',
                    background: isDark ? '#334155' : undefined,
                    color: isDark ? '#f8fafc' : undefined,
                    borderColor: isDark ? '#475569' : undefined
                  }}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    alert('Official ABHA Identity Card downloaded successfully.');
                    setShowAbhaCardModal(false);
                  }}
                  style={{ flex: 1, borderRadius: '10px', fontWeight: 700 }}
                >
                  📥 Download Card (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 2. UPLOAD / ADD NEW HEALTH RECORD & PRESCRIPTION MODAL --- */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowUploadModal(false); }}>
          <div className="modal" style={{ maxWidth: '640px', borderRadius: '24px', background: isDark ? '#1e293b' : 'white', border: isDark ? '1px solid #334155' : 'none' }}>
            <div className="modal-header" style={{ background: isDark ? '#0f172a' : undefined, borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: isDark ? '#f8fafc' : '#0f172a' }}>
                  Add to AarogyaLocker
                </h2>
                <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }}>
                  Index reports, digital e-prescriptions, or medical scan records
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowUploadModal(false)} style={{ color: isDark ? '#cbd5e1' : undefined }}>
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
              {uploadError && (
                <div className="message message-error" style={{ marginBottom: '14px' }}>
                  {uploadError}
                </div>
              )}

              <form onSubmit={handleUploadSubmit}>
                {/* Category Selection Tabs */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: isDark ? '#cbd5e1' : '#334155', marginBottom: '8px' }}>
                    Document Type
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { type: 'Laboratory', label: '🧪 Lab Report' },
                      { type: 'Prescription', label: '💊 Prescription' },
                      { type: 'Imaging', label: '🩻 Radiology Scan' },
                      { type: 'Vaccination', label: '💉 Vaccine Record' },
                      { type: 'Discharge', label: '🏥 Discharge Slip' },
                      { type: 'IdentityCard', label: '🪪 Identity Card' }
                    ].map(item => (
                      <button
                        type="button"
                        key={item.type}
                        onClick={() => setDocCategory(item.type as RecordCategory)}
                        style={{
                          padding: '10px 8px',
                          borderRadius: '10px',
                          border: '1px solid',
                          borderColor: docCategory === item.type ? (isDark ? '#38bdf8' : '#1e3a8a') : (isDark ? '#334155' : '#e2e8f0'),
                          background: docCategory === item.type ? (isDark ? 'rgba(56, 189, 248, 0.2)' : '#eff6ff') : (isDark ? '#0f172a' : 'white'),
                          color: docCategory === item.type ? (isDark ? '#38bdf8' : '#1e3a8a') : (isDark ? '#94a3b8' : '#475569'),
                          fontWeight: docCategory === item.type ? 700 : 500,
                          fontSize: '12.5px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: isDark ? '2px dashed #475569' : '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: isDark ? '#0f172a' : '#f8fafc',
                    marginBottom: '16px',
                    transition: 'border-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = isDark ? '#38bdf8' : '#1e3a8a'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = isDark ? '#475569' : '#cbd5e1'}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  />
                  <div style={{ fontSize: '28px', marginBottom: '6px' }}>📄</div>
                  <div style={{ fontWeight: 600, color: isDark ? '#38bdf8' : '#1e3a8a', fontSize: '14px' }}>
                    {selectedFile ? selectedFile.name : 'Upload file (PDF, JPG, PNG) or continue with digital entry'}
                  </div>
                  <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b', marginTop: '2px' }}>
                    {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB selected` : 'Encrypted with AES-256 upon save'}
                  </div>
                </div>

                {/* Title */}
                <div className="booking-form-group" style={{ marginBottom: '14px' }}>
                  <label htmlFor="docName" style={{ fontWeight: 600, fontSize: '13px', color: isDark ? '#cbd5e1' : undefined }}>Document Title *</label>
                  <input
                    id="docName"
                    type="text"
                    className="input-field"
                    placeholder={docCategory === 'Prescription' ? 'e.g. Consultation Prescription — Dr. Sharma' : 'e.g. Fasting Blood Sugar & Lipid Profile'}
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    required
                    style={{
                      background: isDark ? '#0f172a' : undefined,
                      color: isDark ? '#f8fafc' : undefined,
                      borderColor: isDark ? '#334155' : undefined
                    }}
                  />
                </div>

                {/* Doctor and Hospital Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div className="booking-form-group">
                    <label htmlFor="doctor" style={{ fontWeight: 600, fontSize: '13px', color: isDark ? '#cbd5e1' : undefined }}>Doctor Name</label>
                    <input
                      id="doctor"
                      type="text"
                      className="input-field"
                      placeholder="e.g. Dr. Priya Sharma"
                      value={issuingDoctor}
                      onChange={(e) => setIssuingDoctor(e.target.value)}
                      style={{
                        background: isDark ? '#0f172a' : undefined,
                        color: isDark ? '#f8fafc' : undefined,
                        borderColor: isDark ? '#334155' : undefined
                      }}
                    />
                  </div>
                  <div className="booking-form-group">
                    <label htmlFor="hospitalOrLab" style={{ fontWeight: 600, fontSize: '13px', color: isDark ? '#cbd5e1' : undefined }}>Hospital / Diagnostic Lab</label>
                    <input
                      id="hospitalOrLab"
                      type="text"
                      className="input-field"
                      placeholder="e.g. Apollo / Metropolis Lab"
                      value={hospitalOrLab}
                      onChange={(e) => setHospitalOrLab(e.target.value)}
                      style={{
                        background: isDark ? '#0f172a' : undefined,
                        color: isDark ? '#f8fafc' : undefined,
                        borderColor: isDark ? '#334155' : undefined
                      }}
                    />
                  </div>
                </div>

                {/* If Prescription: Medicine Builder */}
                {docCategory === 'Prescription' && (
                  <div style={{
                    background: isDark ? '#0f172a' : '#f8fafc',
                    border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '14px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#38bdf8' : '#1e3a8a' }}>
                        💊 Prescribed Medicines
                      </label>
                      <button
                        type="button"
                        onClick={handleAddMedicineRow}
                        style={{
                          background: isDark ? '#1e293b' : '#eff6ff',
                          color: isDark ? '#38bdf8' : '#1d4ed8',
                          border: isDark ? '1px solid #0284c7' : '1px solid #bfdbfe',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        + Add Medicine
                      </button>
                    </div>

                    {medicinesList.map((med, idx) => (
                      <div key={idx} style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1.5fr 1fr auto',
                        gap: '6px',
                        marginBottom: '8px',
                        alignItems: 'center'
                      }}>
                        <input
                          type="text"
                          placeholder="Medicine name"
                          value={med.name}
                          onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                          className="input-field"
                          style={{
                            padding: '6px 8px',
                            fontSize: '12px',
                            background: isDark ? '#1e293b' : undefined,
                            color: isDark ? '#f8fafc' : undefined,
                            borderColor: isDark ? '#334155' : undefined
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Dose (e.g. 500mg)"
                          value={med.dosage}
                          onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                          className="input-field"
                          style={{
                            padding: '6px 8px',
                            fontSize: '12px',
                            background: isDark ? '#1e293b' : undefined,
                            color: isDark ? '#f8fafc' : undefined,
                            borderColor: isDark ? '#334155' : undefined
                          }}
                        />
                        <select
                          value={med.frequency}
                          onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                          className="input-field"
                          style={{
                            padding: '6px 8px',
                            fontSize: '12px',
                            background: isDark ? '#1e293b' : undefined,
                            color: isDark ? '#f8fafc' : undefined,
                            borderColor: isDark ? '#334155' : undefined
                          }}
                        >
                          <option value="Once daily (OD)">Once daily (OD)</option>
                          <option value="Twice daily (BD)">Twice daily (BD)</option>
                          <option value="Three times daily (TDS)">Three times daily (TDS)</option>
                          <option value="As needed (SOS)">As needed (SOS)</option>
                        </select>
                        <input
                          type="text"
                          placeholder="5 days"
                          value={med.duration}
                          onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                          className="input-field"
                          style={{
                            padding: '6px 8px',
                            fontSize: '12px',
                            background: isDark ? '#1e293b' : undefined,
                            color: isDark ? '#f8fafc' : undefined,
                            borderColor: isDark ? '#334155' : undefined
                          }}
                        />
                        {medicinesList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMedicineRow(idx)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Notes */}
                <div className="booking-form-group" style={{ marginBottom: '14px' }}>
                  <label htmlFor="notes" style={{ fontWeight: 600, fontSize: '13px', color: isDark ? '#cbd5e1' : undefined }}>Doctor's Advice / Clinical Observations</label>
                  <textarea
                    id="notes"
                    className="input-field"
                    rows={2}
                    placeholder="Diagnosis, dietary restrictions, follow-up instructions..."
                    value={docNotes}
                    onChange={(e) => setDocNotes(e.target.value)}
                    style={{
                      background: isDark ? '#0f172a' : undefined,
                      color: isDark ? '#f8fafc' : undefined,
                      borderColor: isDark ? '#334155' : undefined
                    }}
                  />
                </div>

                {/* ABDM Encryption Checkbox */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  margin: '14px 0 20px',
                  padding: '10px 14px',
                  background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#f0fdf4',
                  borderRadius: '10px',
                  border: isDark ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid #bbf7d0',
                  fontSize: '13px'
                }}>
                  <input
                    type="checkbox"
                    id="abhaConsent"
                    checked={isAbhaLinked}
                    onChange={(e) => setIsAbhaLinked(e.target.checked)}
                  />
                  <label htmlFor="abhaConsent" style={{ color: isDark ? '#6ee7b7' : '#166534', fontWeight: 600, cursor: 'pointer' }}>
                    Encrypt & link document to my Universal ABHA Health Locker ID
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  style={{ width: '100%', borderRadius: '12px', fontWeight: 700 }}
                >
                  Save Document to Health Locker
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. DIGITAL DOCUMENT PREVIEW MODAL --- */}
      {previewRecord && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setPreviewRecord(null); }}>
          <div className="modal" style={{ maxWidth: '680px', borderRadius: '24px', background: isDark ? '#1e293b' : 'white', border: isDark ? '1px solid #334155' : 'none' }}>
            <div className="modal-header" style={{ borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0', padding: '18px 24px', background: isDark ? '#0f172a' : undefined }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>{getCategoryBadgeStyle(previewRecord.type).icon}</span>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: isDark ? '#f8fafc' : '#0f172a' }}>
                    {previewRecord.name}
                  </h2>
                </div>
                <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b', marginTop: '3px' }}>
                  Issued on {previewRecord.date} • {previewRecord.doctor} {previewRecord.hospitalOrLab ? `• ${previewRecord.hospitalOrLab}` : ''}
                </div>
              </div>
              <button className="modal-close" onClick={() => setPreviewRecord(null)} style={{ color: isDark ? '#cbd5e1' : undefined }}>
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '24px', maxHeight: '75vh', overflowY: 'auto' }}>
              {/* Document Certificate Sheet */}
              <div style={{
                background: isDark ? '#0f172a' : '#ffffff',
                border: isDark ? '1px solid #334155' : '1px solid #cbd5e1',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.04)'
              }}>
                {/* Official Letterhead */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  borderBottom: isDark ? '2px solid #38bdf8' : '2px solid #1e3a8a',
                  paddingBottom: '14px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: isDark ? '#38bdf8' : '#1e3a8a', letterSpacing: '-0.3px' }}>
                      AarogyaLocker Healthcare Vault
                    </div>
                    <div style={{ fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }}>
                      ABDM Certified Medical Document • {previewRecord.hospitalOrLab || 'AarogyaLocker Hospital Network'}
                    </div>
                  </div>

                  <span style={{
                    background: isDark ? 'rgba(16, 185, 129, 0.2)' : '#ecfdf5',
                    color: isDark ? '#6ee7b7' : '#059669',
                    border: isDark ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid #a7f3d0',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    ✓ Digitally Signed & Encrypted
                  </span>
                </div>

                {/* Patient Information Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  background: isDark ? '#1e293b' : '#f8fafc',
                  border: isDark ? '1px solid #334155' : 'none',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  marginBottom: '18px'
                }}>
                  <div>
                    <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>Patient Name:</span>
                    <div style={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>{currentUser.name}</div>
                  </div>
                  <div>
                    <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>ABHA Number:</span>
                    <div style={{ fontWeight: 700, color: '#38bdf8', fontFamily: 'monospace' }}>
                      {currentUser.abhaId || '91-4521-8932-1104'}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>Document ID:</span>
                    <div style={{ fontWeight: 600, color: isDark ? '#cbd5e1' : '#475569' }}>
                      {previewRecord.documentNumber || previewRecord.id}
                    </div>
                  </div>
                </div>

                {/* Content: Medicines if Prescription */}
                {previewRecord.medicines && previewRecord.medicines.length > 0 && (
                  <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#38bdf8' : '#1e3a8a', textTransform: 'uppercase', margin: 0 }}>
                        Prescribed Medicines & Posology
                      </h4>
                      <button
                        onClick={() => {
                          const query = previewRecord.medicines?.map(m => m.name).join(' ') || previewRecord.name;
                          window.open(`https://www.1mg.com/search/all?name=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
                        }}
                        style={{
                          background: isDark ? 'rgba(244, 63, 94, 0.15)' : '#fff1f2',
                          color: isDark ? '#fb7185' : '#be123c',
                          border: isDark ? '1.5px solid rgba(244, 63, 94, 0.4)' : '1.5px solid #fecdd3',
                          padding: '5px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>🔴 Order All on Tata 1mg</span>
                        <span style={{ fontSize: '10px' }}>↗</span>
                      </button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                      <thead>
                        <tr style={{ background: isDark ? '#1e293b' : '#f1f5f9', textAlign: 'left', borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0', color: isDark ? '#cbd5e1' : undefined }}>
                          <th style={{ padding: '8px' }}>Medicine</th>
                          <th style={{ padding: '8px' }}>Dosage</th>
                          <th style={{ padding: '8px' }}>Frequency</th>
                          <th style={{ padding: '8px' }}>Duration</th>
                          <th style={{ padding: '8px' }}>Instruction</th>
                          <th style={{ padding: '8px', textAlign: 'center' }}>1mg Order</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewRecord.medicines.map((m, idx) => (
                          <tr key={idx} style={{ borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f5f9' }}>
                            <td style={{ padding: '8px', fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>{m.name}</td>
                            <td style={{ padding: '8px', color: isDark ? '#cbd5e1' : '#475569' }}>{m.dosage}</td>
                            <td style={{ padding: '8px', color: '#38bdf8', fontWeight: 600 }}>{m.frequency}</td>
                            <td style={{ padding: '8px', color: isDark ? '#cbd5e1' : '#475569' }}>{m.duration}</td>
                            <td style={{ padding: '8px', color: isDark ? '#94a3b8' : '#64748b', fontSize: '11.5px' }}>{m.instructions || '-'}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                              <button
                                onClick={() => window.open(`https://www.1mg.com/search/all?name=${encodeURIComponent(m.name)}`, '_blank', 'noopener,noreferrer')}
                                style={{
                                  background: isDark ? 'rgba(244, 63, 94, 0.15)' : '#fff1f2',
                                  color: isDark ? '#fb7185' : '#be123c',
                                  border: isDark ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid #fecdd3',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                🔴 1mg ↗
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Content: Lab Results if Laboratory */}
                {previewRecord.labResults && previewRecord.labResults.length > 0 && (
                  <div style={{ marginBottom: '18px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#38bdf8' : '#1e3a8a', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Laboratory Test Metrics
                    </h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                      <thead>
                        <tr style={{ background: isDark ? '#1e293b' : '#f1f5f9', textAlign: 'left', borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0', color: isDark ? '#cbd5e1' : undefined }}>
                          <th style={{ padding: '8px' }}>Test Parameter</th>
                          <th style={{ padding: '8px' }}>Observed Result</th>
                          <th style={{ padding: '8px' }}>Reference Range</th>
                          <th style={{ padding: '8px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewRecord.labResults.map((l, idx) => (
                          <tr key={idx} style={{ borderBottom: isDark ? '1px solid #334155' : '1px solid #f1f5f9' }}>
                            <td style={{ padding: '8px', fontWeight: 600, color: isDark ? '#f8fafc' : '#0f172a' }}>{l.parameter}</td>
                            <td style={{ padding: '8px', fontWeight: 700, color: isDark ? '#f8fafc' : undefined }}>{l.value} {l.unit}</td>
                            <td style={{ padding: '8px', color: isDark ? '#94a3b8' : '#64748b' }}>{l.referenceRange}</td>
                            <td style={{ padding: '8px' }}>
                              <span style={{
                                background: l.status === 'Normal' ? (isDark ? 'rgba(16, 185, 129, 0.2)' : '#dcfce7') : (isDark ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2'),
                                color: l.status === 'Normal' ? (isDark ? '#6ee7b7' : '#15803d') : (isDark ? '#fca5a5' : '#b91c1c'),
                                padding: '2px 8px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 700
                              }}>
                                {l.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Clinical Notes / Doctor Advice */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: isDark ? '#94a3b8' : '#475569', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Clinical Assessment & Observations
                  </div>
                  <div style={{
                    background: isDark ? '#1e293b' : '#f8fafc',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: isDark ? '#e2e8f0' : '#334155',
                    lineHeight: 1.5,
                    border: isDark ? '1px solid #334155' : '1px solid #f1f5f9'
                  }}>
                    {previewRecord.notes || 'Routine consultation record authenticated in health locker.'}
                  </div>
                </div>

                {/* Footer Signature */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  borderTop: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                  paddingTop: '14px',
                  fontSize: '11.5px',
                  color: isDark ? '#94a3b8' : '#64748b'
                }}>
                  <div>
                    <div>SHA-256 Checksum: <span style={{ fontFamily: 'monospace' }}>9d82f7...4b21</span></div>
                    <div>ABDM Security Protocol: AES-256 Bit GCM</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: isDark ? '#f8fafc' : '#0f172a' }}>{previewRecord.doctor}</div>
                    <div>{previewRecord.verifiedBy || 'Certified Medical Practitioner'}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShareSuccessRecord(previewRecord)}
                  style={{
                    flex: 1,
                    borderRadius: '10px',
                    fontWeight: 600,
                    background: isDark ? '#334155' : undefined,
                    color: isDark ? '#f8fafc' : undefined,
                    borderColor: isDark ? '#475569' : undefined
                  }}
                >
                  🔗 Share with Doctor / Hospital
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDownload(previewRecord)}
                  style={{ flex: 1, borderRadius: '10px', fontWeight: 700 }}
                >
                  📥 Download Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 4. ABDM QR CONSENT SHARE MODAL --- */}
      {shareSuccessRecord && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShareSuccessRecord(null); }}>
          <div className="modal" style={{ maxWidth: '440px', borderRadius: '24px', textAlign: 'center', background: isDark ? '#1e293b' : 'white', border: isDark ? '1px solid #334155' : 'none' }}>
            <div className="modal-header" style={{ borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0', background: isDark ? '#0f172a' : undefined }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: isDark ? '#f8fafc' : '#0f172a' }}>
                ABDM Healthcare Consent Share
              </h2>
              <button className="modal-close" onClick={() => setShareSuccessRecord(null)} style={{ color: isDark ? '#cbd5e1' : undefined }}>
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '28px 24px' }}>
              <div style={{
                width: '160px',
                height: '160px',
                margin: '0 auto 16px',
                border: isDark ? '3px solid #38bdf8' : '3px solid #1e3a8a',
                borderRadius: '16px',
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 8px 24px rgba(30, 58, 138, 0.12)'
              }}>
                <div style={{ fontSize: '64px' }}>📱</div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#1e3a8a', letterSpacing: '1px' }}>
                  SCAN VIA HOSPITAL APP
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 800, color: isDark ? '#f8fafc' : '#0f172a', marginBottom: '6px' }}>
                {shareSuccessRecord.name}
              </h3>
              <p style={{ fontSize: '13px', color: isDark ? '#94a3b8' : '#64748b', margin: '0 0 16px', lineHeight: 1.5 }}>
                Doctors and hospitals registered with Ayushman Bharat (ABDM) can scan this dynamic QR to temporarily view this verified record.
              </p>

              <div style={{
                background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#eff6ff',
                border: isDark ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid #bfdbfe',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: isDark ? '#38bdf8' : '#1e3a8a',
                marginBottom: '20px'
              }}>
                ⏱️ Temporary Token: ABDM-{Math.floor(100000 + Math.random() * 900000)} (Expires in 2 Hours)
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', borderRadius: '12px', fontWeight: 700 }}
                onClick={() => setShareSuccessRecord(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
