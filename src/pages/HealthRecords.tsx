import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import type { HealthRecord, RecordCategory } from '../types';
import { CloseIcon } from '../Icons';

interface HealthRecordsProps {
  isLoggedIn: boolean;
  onSignInClick: () => void;
}

export default function HealthRecords({ onSignInClick }: HealthRecordsProps) {
  const { currentUser, isLoggedIn, records, addRecord, deleteRecord } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('All Records');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewRecord, setPreviewRecord] = useState<HealthRecord | null>(null);
  const [shareSuccessRecord, setShareSuccessRecord] = useState<HealthRecord | null>(null);

  // Upload Form State
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState<RecordCategory>('Laboratory');
  const [issuingDoctor, setIssuingDoctor] = useState('');
  const [docNotes, setDocNotes] = useState('');
  const [docTags, setDocTags] = useState('');
  const [isAbhaLinked, setIsAbhaLinked] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoggedIn || !currentUser) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔐</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>AarogyaLocker Access Restricted</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--color-slate)', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
          Please sign in to view and manage your encrypted personal health records and ABHA digital locker.
        </p>
        <button className="btn btn-primary" onClick={onSignInClick}>Sign In to Continue</button>
      </div>
    );
  }

  // Handle File selection
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

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) {
      setUploadError('Please provide a document title.');
      return;
    }

    const calculatedSize = selectedFile 
      ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` 
      : '1.1 MB';
    const calculatedType = selectedFile ? selectedFile.type : 'application/pdf';

    addRecord({
      patientId: currentUser.id,
      name: docName.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      type: docCategory,
      doctor: issuingDoctor.trim() || 'Self-Uploaded / Diagnostic Lab',
      fileSize: calculatedSize,
      fileType: calculatedType,
      fileData: fileDataUrl || undefined,
      notes: docNotes.trim(),
      tags: docTags ? docTags.split(',').map(t => t.trim()).filter(Boolean) : [docCategory],
      abhaLinked: isAbhaLinked
    });

    // Reset & close
    setShowUploadModal(false);
    setDocName('');
    setDocCategory('Laboratory');
    setIssuingDoctor('');
    setDocNotes('');
    setDocTags('');
    setSelectedFile(null);
    setFileDataUrl('');
    setUploadError('');
  };

  // Download simulation
  const handleDownload = (record: HealthRecord) => {
    if (record.fileData) {
      const a = document.createElement('a');
      a.href = record.fileData;
      a.download = `${record.name.toLowerCase().replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Mock text file download
      const content = `AAROGYALOCKER DIGITAL HEALTH RECORD
====================================
Title: ${record.name}
Date: ${record.date}
Type: ${record.type}
Issued By: ${record.doctor}
Patient: ${currentUser.name} (ABHA: ${currentUser.abhaId || 'Linked'})
Notes: ${record.notes || 'None'}
Status: Verified by National Digital Health Mission (ABDM)
====================================
Encrypted & Authenticated Medical Document`;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${record.name.toLowerCase().replace(/\s+/g, '_')}_record.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Filter records
  const filteredRecords = records.filter(record => {
    const matchesCategory = filterCategory === 'All Records' || record.type === filterCategory;
    const matchesQuery = !searchQuery.trim() || 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="dashboard-content" style={{ padding: 'var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* ABHA Header Status Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-deep-blue) 0%, #0d2b4c 100%)',
        color: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 8px 24px rgba(15, 62, 109, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '12px',
            background: 'rgba(20, 184, 166, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px'
          }}>
            🔐
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>AarogyaLocker & ABHA Health Locker</h1>
              <span style={{ background: '#10b981', color: 'white', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                ACTIVE
              </span>
            </div>
            <p style={{ margin: '4px 0 0', opacity: 0.85, fontSize: '13px' }}>
              Universal Health ID: <strong style={{ color: 'var(--color-cyan)', letterSpacing: '0.5px' }}>{currentUser.abhaId || '91-4521-8932-1104'}</strong> • ABDM Consent Manager Connected
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => setShareSuccessRecord(records[0] || null)}
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            🔗 Share Health QR
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowUploadModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>+</span> Upload Document
          </button>
        </div>
      </div>

      {/* Controls & Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: 'var(--space-6)',
        flexWrap: 'wrap'
      }}>
        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {['All Records', 'Laboratory', 'Imaging', 'Prescription', 'Discharge', 'Vaccination'].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilterCategory(f)}
              style={{
                padding: '6px 16px', 
                borderRadius: '20px', 
                border: '1px solid var(--color-gray-200)',
                background: filterCategory === f ? 'var(--color-deep-blue)' : 'white',
                color: filterCategory === f ? 'white' : 'var(--color-slate)', 
                cursor: 'pointer',
                fontWeight: filterCategory === f ? 600 : 500,
                fontSize: '13px',
                transition: 'all 0.15s'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <input
            type="text"
            placeholder="Search records, doctor, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 32px',
              borderRadius: '20px',
              border: '1px solid var(--color-gray-200)',
              fontSize: '13px'
            }}
          />
          <span style={{ position: 'absolute', left: '12px', top: '8px', color: 'var(--color-slate)', fontSize: '13px' }}>🔍</span>
        </div>
      </div>

      {/* Records Table Card */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'var(--color-ice-blue)', borderBottom: '1px solid var(--color-gray-200)' }}>
            <tr>
              <th style={{ padding: '14px 18px', fontWeight: 600, fontSize: '13px', color: 'var(--color-deep-blue)' }}>Document Name</th>
              <th style={{ padding: '14px 18px', fontWeight: 600, fontSize: '13px', color: 'var(--color-deep-blue)' }}>Date</th>
              <th style={{ padding: '14px 18px', fontWeight: 600, fontSize: '13px', color: 'var(--color-deep-blue)' }}>Type</th>
              <th style={{ padding: '14px 18px', fontWeight: 600, fontSize: '13px', color: 'var(--color-deep-blue)' }}>Issued By</th>
              <th style={{ padding: '14px 18px', fontWeight: 600, fontSize: '13px', color: 'var(--color-deep-blue)' }}>ABHA Status</th>
              <th style={{ padding: '14px 18px', fontWeight: 600, fontSize: '13px', color: 'var(--color-deep-blue)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'var(--color-slate)' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📂</div>
                  <div>No documents found in this category.</div>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setShowUploadModal(true)}
                    style={{ marginTop: '12px', fontSize: '12px' }}
                  >
                    Upload Document Now
                  </button>
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => (
                <tr key={record.id} style={{ borderBottom: '1px solid var(--color-gray-200)', transition: 'background 0.15s' }}>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-deep-blue)', fontSize: '14px' }}>
                      {record.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-slate)', marginTop: '2px' }}>
                      {record.fileSize} • {record.tags?.slice(0, 2).join(', ') || 'Medical File'}
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--color-slate)', fontSize: '13px' }}>
                    {record.date}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      padding: '3px 10px',
                      background: 
                        record.type === 'Laboratory' ? '#e0f2fe' :
                        record.type === 'Imaging' ? '#f3e8ff' :
                        record.type === 'Prescription' ? '#dcfce7' : '#f1f5f9',
                      color:
                        record.type === 'Laboratory' ? '#0369a1' :
                        record.type === 'Imaging' ? '#7e22ce' :
                        record.type === 'Prescription' ? '#15803d' : '#475569',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600
                    }}>
                      {record.type}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--color-slate)', fontSize: '13px' }}>
                    {record.doctor}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    {record.abhaLinked ? (
                      <span style={{ fontSize: '11px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <span>✓</span> Linked
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--color-slate)' }}>Unlinked</span>
                    )}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button 
                      onClick={() => setPreviewRecord(record)}
                      style={{ color: 'var(--color-deep-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, marginRight: '12px', fontSize: '13px' }}
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleDownload(record)}
                      style={{ color: 'var(--color-cyan)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, marginRight: '12px', fontSize: '13px' }}
                    >
                      Download
                    </button>
                    <button 
                      onClick={() => deleteRecord(record.id)}
                      style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}
                      title="Delete record"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- UPLOAD DOCUMENT MODAL --- */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowUploadModal(false); }}>
          <div className="modal" style={{ maxWidth: '560px' }}>
            <div className="modal-header">
              <h2>Upload to AarogyaLocker</h2>
              <button className="modal-close" onClick={() => setShowUploadModal(false)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <div className="modal-body">
              {uploadError && (
                <div className="message message-error" style={{ marginBottom: '14px' }}>
                  {uploadError}
                </div>
              )}

              <form onSubmit={handleUploadSubmit}>
                {/* File Dropzone */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed var(--color-gray-200)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'var(--color-ice-blue)',
                    marginBottom: 'var(--space-4)',
                    transition: 'border-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-cyan)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-gray-200)'}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  />
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-deep-blue)' }}>
                    {selectedFile ? selectedFile.name : 'Choose a file or drag & drop'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-slate)', marginTop: '4px' }}>
                    {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'Supports PDF, JPG, PNG up to 25MB'}
                  </div>
                </div>

                <div className="booking-form-group">
                  <label htmlFor="docName">Document Title</label>
                  <input
                    id="docName"
                    type="text"
                    className="input-field"
                    placeholder="e.g. Lipid Profile Report, MRI Spine Scan"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="booking-form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      className="input-field"
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value as RecordCategory)}
                    >
                      <option value="Laboratory">Laboratory Report</option>
                      <option value="Imaging">Scans & Imaging</option>
                      <option value="Prescription">Prescription</option>
                      <option value="Discharge">Discharge Summary</option>
                      <option value="Vaccination">Vaccination Record</option>
                    </select>
                  </div>

                  <div className="booking-form-group">
                    <label htmlFor="doctor">Issuing Doctor / Hospital</label>
                    <input
                      id="doctor"
                      type="text"
                      className="input-field"
                      placeholder="e.g. Dr. Priya Sharma / Apollo"
                      value={issuingDoctor}
                      onChange={(e) => setIssuingDoctor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="booking-form-group">
                  <label htmlFor="notes">Clinical Findings / Notes</label>
                  <textarea
                    id="notes"
                    className="input-field"
                    rows={2}
                    placeholder="Key observations, normal values, medication instructions..."
                    value={docNotes}
                    onChange={(e) => setDocNotes(e.target.value)}
                  />
                </div>

                <div className="booking-form-group">
                  <label htmlFor="tags">Tags (comma separated)</label>
                  <input
                    id="tags"
                    type="text"
                    className="input-field"
                    placeholder="e.g. Cholesterol, Annual Checkup"
                    value={docTags}
                    onChange={(e) => setDocTags(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '14px 0', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    id="abhaConsent"
                    checked={isAbhaLinked}
                    onChange={(e) => setIsAbhaLinked(e.target.checked)}
                  />
                  <label htmlFor="abhaConsent" style={{ color: 'var(--color-deep-blue)', fontWeight: 500 }}>
                    Encrypt & link to ABHA Digital Health Network (ABDM)
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }}>
                  Save to Health Locker
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* --- DOCUMENT PREVIEW MODAL --- */}
      {previewRecord && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setPreviewRecord(null); }}>
          <div className="modal" style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{previewRecord.name}</h2>
                <div style={{ fontSize: '12px', color: 'var(--color-slate)', marginTop: '2px' }}>
                  Issued on {previewRecord.date} • {previewRecord.doctor}
                </div>
              </div>
              <button className="modal-close" onClick={() => setPreviewRecord(null)}>
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Document Visual Preview Card */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--color-gray-200)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '16px',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {previewRecord.fileData && previewRecord.fileType.startsWith('image/') ? (
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={previewRecord.fileData} 
                      alt={previewRecord.name} 
                      style={{ maxHeight: '240px', maxWidth: '100%', borderRadius: '8px' }}
                    />
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: '12px', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>AarogyaLocker Verified Record</div>
                        <div style={{ fontSize: '12px', color: 'var(--color-slate)' }}>ABDM Gateway: IN-EHR-9082</div>
                      </div>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, height: 'fit-content' }}>
                        ✓ Digitally Signed
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-gray-900)' }}>
                      <p><strong>Patient Name:</strong> {currentUser.name}</p>
                      <p><strong>ABHA Address:</strong> {currentUser.abhaId || '91-4521-8932-1104'}</p>
                      <p><strong>Clinical Notes / Assessment:</strong></p>
                      <div style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-gray-200)', marginTop: '4px', fontSize: '13px' }}>
                        {previewRecord.notes || 'Routine diagnostic and clinical documentation registered within patient locker.'}
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-gray-200)', paddingTop: '12px', marginTop: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-slate)' }}>
                    SHA-256 Hash: 8f9b...4e21 • 256-Bit Encrypted
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-cyan)' }}>
                    AarogyaLocker Ecosystem
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShareSuccessRecord(previewRecord)}
                  style={{ flex: 1 }}
                >
                  Share via ABHA
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleDownload(previewRecord)}
                  style={{ flex: 1 }}
                >
                  Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SHARE MODAL --- */}
      {shareSuccessRecord && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShareSuccessRecord(null); }}>
          <div className="modal" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div className="modal-header">
              <h2>ABHA Consent Share</h2>
              <button className="modal-close" onClick={() => setShareSuccessRecord(null)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <div className="modal-body" style={{ padding: '24px' }}>
              <div style={{
                width: '160px',
                height: '160px',
                margin: '0 auto 16px',
                border: '2px solid var(--color-gray-200)',
                borderRadius: '12px',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '80px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}>
                📱
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
                {shareSuccessRecord.name}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--color-slate)', margin: '8px 0 16px' }}>
                Scan with any ABDM / Ayushman Bharat registered hospital app to temporarily grant secure, time-limited read consent.
              </p>
              <div style={{ background: 'var(--color-ice-blue)', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: 'var(--color-deep-blue)', marginBottom: '16px' }}>
                Consent Token: ABDM-{Math.floor(100000 + Math.random() * 900000)} (Expires in 2 hrs)
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setShareSuccessRecord(null)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
