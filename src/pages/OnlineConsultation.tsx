import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function OnlineConsultation() {
  const navigate = useNavigate();
  const { currentUser, addDoctorNotesAndPrescription, appointments, addRecord } = useApp();

  const [isInCall, setIsInCall] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // In-call chat messages
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'doctor' | 'patient'; text: string; time: string }>>([
    { sender: 'doctor', text: 'Hello! I am Dr. Manmohanjit Singh from PGIMER Chandigarh. I have reviewed your AarogyaLocker health records. How are you feeling today?', time: '10:30 AM' }
  ]);

  // Doctor vitals assessment
  const [vitals] = useState({
    bp: '122/82 mmHg',
    pulse: '74 bpm',
    spo2: '99%',
    temp: '98.6°F'
  });

  // Local media stream
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 } },
          audio: true
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraError(null);
      }
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera access unavailable or permission was not granted. Using simulated patient feed.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Start WebRTC camera stream when entering call
  useEffect(() => {
    if (isInCall && isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isInCall, isCameraOn]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: 'patient' as const,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    // Simulate doctor clinical response after a brief pause
    setTimeout(() => {
      const replies = [
        'Understood. I have verified your symptom log against your previous lab tests in your health locker.',
        'I am issuing an official e-prescription with standard dosage instructions. It will be digitally signed and deposited into your AarogyaLocker.',
        'Make sure to stay well hydrated and monitor your temperature twice daily.',
        'If symptoms persist beyond 48 hours, please book a follow-up consultation.'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'doctor',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const handleEndCall = () => {
    stopCamera();
    setIsInCall(false);
    setIsCallEnded(true);

    const patientId = currentUser?.id || 'pat-101';
    const patientName = currentUser?.name || 'Rahul Sharma';
    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    // 1. Update appointment status if exists
    const waitingApt = appointments.find(a => a.status === 'Waiting' || a.status === 'Scheduled');
    if (waitingApt) {
      addDoctorNotesAndPrescription(
        waitingApt.id,
        'Tele-consultation completed via encrypted WebRTC channel. Vitals stable. Prescribed supportive medications.',
        [
          { name: 'Paracetamol 650mg', dosage: '1 tablet TDS', duration: '3 days', instructions: 'After food' },
          { name: 'Cetirizine 10mg', dosage: '1 tablet OD', duration: '5 days', instructions: 'At bedtime' }
        ]
      );
    } else {
      // 2. Direct locker record addition
      addRecord({
        patientId,
        name: 'Tele-Consultation Summary & E-Prescription',
        date: nowStr,
        type: 'Prescription',
        doctor: 'Dr. Priya Sharma (Reg #KMC-48291)',
        hospitalOrLab: 'AarogyaLocker Telemedicine Clinic (Tricity)',
        fileSize: '410 KB',
        fileType: 'application/pdf',
        notes: `Clinical Telemedicine Assessment for ${patientName}: General consultation completed. Vitals: BP ${vitals.bp}, Pulse ${vitals.pulse}, SpO2 ${vitals.spo2}. Prescribed: Paracetamol 650mg, Multivitamin supplement.`,
        tags: ['Tele-Consultation', 'E-Prescription', 'General Medicine', 'ABHA Linked'],
        abhaLinked: true,
        isIssued: true,
        verifiedBy: 'Dr. Priya Sharma — Reg #KMC-48291',
        documentNumber: `TELE-RX-${Date.now().toString().slice(-6)}`,
        medicines: [
          { name: 'Paracetamol 650mg', dosage: '1 tablet', frequency: 'Thrice daily (TDS)', duration: '3 days', instructions: 'After meals' },
          { name: 'Vitamin C & Zinc Chews', dosage: '1 chewable tablet', frequency: 'Once daily (OD)', duration: '15 days', instructions: 'Any time' }
        ]
      });
    }
  };

  // Call Ended Summary View
  if (isCallEnded) {
    return (
      <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 16px', textAlign: 'center' }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '36px 24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#dcfce7',
            color: '#15803d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            margin: '0 auto 16px'
          }}>
            ✓
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
            Consultation Completed
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 24px' }}>
            Your video session with Dr. Priya Sharma has concluded successfully.
          </p>

          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '16px',
            padding: '18px',
            textAlign: 'left',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
              <span>🔐</span>
              <span>Official E-Prescription Deposited in AarogyaLocker!</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#15803d', lineHeight: 1.5 }}>
              Dr. Priya Sharma has generated your digital prescription with clinical notes and registered credentials. It is linked to your <strong>ABHA Universal Health ID</strong> and ready for immediate pharmacy fulfillment.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => navigate('/pharmacy')}
              style={{
                flex: 1,
                padding: '12px',
                background: '#f1f5f9',
                color: '#334155',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Order Prescribed Medicines →
            </button>
            <button
              onClick={() => navigate('/health-records')}
              style={{
                flex: 1.2,
                padding: '12px',
                background: '#047857',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              View in AarogyaLocker
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Video Room View
  if (isInCall) {
    return (
      <div style={{
        height: 'calc(100vh - 72px)',
        background: '#0f172a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Header */}
        <div style={{
          padding: '12px 24px',
          background: 'rgba(15,23,42,0.95)',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 10px #22c55e'
            }} />
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
                Live Consultation — Dr. Priya Sharma, MD
              </h2>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                Encrypted WebRTC Channel • General Physician • ABDM Reg #KMC-48291
              </p>
            </div>
          </div>

          <button
            onClick={handleEndCall}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            End Consultation
          </button>
        </div>

        {/* Video Feeds + Live Clinical Chat Split */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left: Video Canvas Area */}
          <div style={{
            flex: 2,
            position: 'relative',
            background: '#020617',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}>
            {/* Main Remote Feed: Doctor Simulation */}
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #334155'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #047857, #10b981)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '44px',
                  margin: '0 auto 16px',
                  boxShadow: '0 0 40px rgba(16,185,129,0.3)',
                  border: '4px solid rgba(255,255,255,0.2)'
                }}>
                  👩‍⚕️
                </div>
                <h3 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 700 }}>Dr. Priya Sharma</h3>
                <p style={{ margin: 0, color: '#34d399', fontSize: '14px', fontWeight: 600 }}>
                  Active Audio & Video Feed Connected
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px', fontSize: '11px' }}>
                    HD 1080p
                  </span>
                  <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px', fontSize: '11px' }}>
                    Latency: 18ms
                  </span>
                </div>
              </div>

              {/* Vitals Telemetry HUD Overlay */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(15,23,42,0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                gap: '16px',
                fontSize: '12px'
              }}>
                <div><span style={{ color: '#94a3b8' }}>BP:</span> <strong>{vitals.bp}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Pulse:</span> <strong style={{ color: '#f43f5e' }}>❤️ {vitals.pulse}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>SpO2:</span> <strong style={{ color: '#38bdf8' }}>{vitals.spo2}</strong></div>
              </div>

              {/* Patient Local Video PIP (Picture-in-Picture) */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                width: '200px',
                height: '140px',
                background: '#1e293b',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isCameraOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '4px' }}>👤</div>
                    Camera Off
                  </div>
                )}
                <div style={{
                  position: 'absolute',
                  bottom: '6px',
                  left: '8px',
                  fontSize: '10px',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  You ({currentUser?.name || 'Patient'})
                </div>
              </div>
            </div>
          </div>

          {/* Right: In-call Clinical Chat & Consultation Notes */}
          <div style={{
            flex: 1,
            background: '#1e293b',
            borderLeft: '1px solid #334155',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '420px'
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #334155', fontSize: '14px', fontWeight: 700 }}>
              💬 In-Call Clinical Chat
            </div>

            {/* Messages Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chatMessages.map((m, idx) => {
                const isPatient = m.sender === 'patient';
                return (
                  <div
                    key={idx}
                    style={{
                      alignSelf: isPatient ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      background: isPatient ? '#047857' : '#334155',
                      color: 'white',
                      padding: '10px 14px',
                      borderRadius: isPatient ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      fontSize: '13px',
                      lineHeight: 1.4
                    }}
                  >
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>
                      {isPatient ? 'You' : 'Dr. Priya Sharma'} • {m.time}
                    </div>
                    {m.text}
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input */}
            <div style={{ padding: '12px', borderTop: '1px solid #334155', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Ask doctor or mention symptoms..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                style={{
                  flex: 1,
                  background: '#0f172a',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  background: '#047857',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Media Controls Bar */}
        <div style={{
          padding: '16px',
          background: '#0f172a',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              background: isMicOn ? '#334155' : '#ef4444',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer'
            }}
            title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {isMicOn ? '🎤' : '🔇'}
          </button>

          <button
            onClick={() => setIsCameraOn(!isCameraOn)}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: 'none',
              background: isCameraOn ? '#334155' : '#ef4444',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer'
            }}
            title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            {isCameraOn ? '📷' : '🚫'}
          </button>

          <button
            onClick={handleEndCall}
            style={{
              padding: '12px 28px',
              borderRadius: '24px',
              border: 'none',
              background: '#ef4444',
              color: 'white',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>End Call & Generate E-Prescription</span>
          </button>
        </div>

        {cameraError && (
          <div style={{ background: '#7f1d1d', color: '#fecaca', padding: '6px 16px', textAlign: 'center', fontSize: '12px' }}>
            {cameraError}
          </div>
        )}
      </div>
    );
  }

  // Pre-Call Lobby Screen
  return (
    <section style={{ padding: '40px 16px', background: 'var(--color-bg-light)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 6px' }}>
            Telemedicine & Online Consultations
          </h1>
          <p style={{ color: 'var(--color-slate)', margin: 0, fontSize: '15px' }}>
            Connect with verified healthcare practitioners via encrypted WebRTC audio/video calls. Consultation notes and prescriptions sync directly to your AarogyaLocker.
          </p>
        </div>

        {/* Scheduled Doctor Card */}
        <div className="card" style={{ padding: '28px', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #047857, #10b981)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                👩‍⚕️
              </div>
              <div>
                <h3 style={{ fontSize: '20px', color: 'var(--color-deep-blue)', margin: '0 0 4px', fontWeight: 800 }}>
                  Dr. Priya Sharma
                </h3>
                <p style={{ color: 'var(--color-slate)', fontSize: '14px', margin: 0 }}>
                  General Physician • 12 Yrs Exp • ABDM Verified
                </p>
              </div>
            </div>

            <span className="badge badge-green" style={{ fontSize: '13px', padding: '6px 12px' }}>
              Ready to Join Now
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Consultation Date:</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Today</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Time Slot:</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Active Session</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Patient Profile:</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{currentUser?.name || 'Rahul Sharma'}</div>
            </div>
          </div>

          {/* Locker Linking Notice */}
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '20px' }}>🔐</span>
            <div style={{ fontSize: '13px', color: '#1e40af' }}>
              <strong>AarogyaLocker Auto-Sync Active:</strong> Your medical history and past lab reports are shared securely with the doctor under ABDM digital consent.
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 800,
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
            }}
            onClick={() => setIsInCall(true)}
          >
            <span>📹 Enter Video Consultation Room</span>
          </button>
        </div>

      </div>
    </section>
  );
}
