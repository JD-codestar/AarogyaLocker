import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface WidgetMessage {
  sender: 'user' | 'ai';
  text: string;
  recSearches?: Array<{ label: string; url: string; icon?: string }>;
}

export default function AIFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickInput, setQuickInput] = useState('');
  const [messages, setMessages] = useState<WidgetMessage[]>([
    {
      sender: 'ai',
      text: 'Hi! I am the AarogyaLocker AI triage specialist. Ask symptoms, query medicines, or pick a recommendation below:',
      recSearches: [
        { label: 'Find Cardiologist', url: '/doctors?search=Cardiologist', icon: '💓' },
        { label: 'PGIMER OPD Booking', url: '/hospitals?search=PGIMER', icon: '🏥' },
        { label: 'Full Body Health Checkup', url: '/lab-tests', icon: '🧪' }
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuickSend = (text?: string) => {
    const q = text || quickInput;
    if (!q.trim() || loading) return;

    setMessages(prev => [...prev, { sender: 'user', text: q.trim() }]);
    setQuickInput('');
    setLoading(true);

    setTimeout(() => {
      let reply = 'For optimal recovery, monitor symptoms closely, maintain good hydration, and consult a registered physician.';
      let recSearches: Array<{ label: string; url: string; icon?: string }> = [
        { label: 'Search Doctors in Tricity', url: `/doctors?search=${encodeURIComponent(q.slice(0, 20))}`, icon: '🩺' },
        { label: 'Tricity Hospital Directory', url: '/hospitals', icon: '🏥' }
      ];

      const lower = q.toLowerCase();
      if (lower.includes('chest') || lower.includes('heart') || lower.includes('breath')) {
        reply = '⚠️ Alert: Chest pain, breathlessness, or tightness requires urgent clinical evaluation to rule out cardiac emergencies.';
        recSearches = [
          { label: 'Find Cardiologists (Fortis, Max)', url: '/doctors?search=Cardiologist', icon: '💓' },
          { label: 'Emergency Hospital OPDs', url: '/hospitals?search=Emergency', icon: '🏥' },
          { label: 'Lipid Profile & ECG Screen', url: '/lab-tests?search=Lipid Profile', icon: '🧪' }
        ];
      } else if (lower.includes('fever') || lower.includes('temperature') || lower.includes('flu')) {
        reply = 'Mild fever often stems from viral infections. Hydrate well (2.5–3L/day) and monitor temperature every 6 hours. Consider Paracetamol 650mg if needed.';
        recSearches = [
          { label: 'General Physicians in Tricity', url: '/doctors?search=General Physician', icon: '🩺' },
          { label: 'Complete Blood Count (CBC)', url: '/lab-tests?search=Complete Blood Count', icon: '🧪' },
          { label: 'Fever Relief & Medicines', url: '/pharmacy?search=Paracetamol', icon: '💊' }
        ];
      } else if (lower.includes('headache') || lower.includes('migraine')) {
        reply = 'Rest in a quiet, dark room, hydrate, and apply a cool forehead compress. Consult a specialist if accompanied by visual disturbance or neck stiffness.';
        recSearches = [
          { label: 'Neurologists in Chandigarh & Mohali', url: '/doctors?search=Neurologist', icon: '🧠' },
          { label: 'Vitamin D & B12 Screen', url: '/lab-tests?search=Vitamin', icon: '🧪' },
          { label: 'Pain Relief at Pharmacy', url: '/pharmacy?search=Pain Relief', icon: '💊' }
        ];
      } else if (lower.includes('cough') || lower.includes('cold') || lower.includes('throat')) {
        reply = 'Steam inhalation, warm saline gargles, and honey ginger tea soothe airway lining. Consult a physician if cough lasts >2 weeks.';
        recSearches = [
          { label: 'Pulmonologists & ENT', url: '/doctors?search=Pulmonology', icon: '🫁' },
          { label: 'Chest X-Ray Digital', url: '/lab-tests?search=Chest X-Ray', icon: '🧪' },
          { label: 'Cough Syrups & Lozenges', url: '/pharmacy?search=Cough', icon: '💊' }
        ];
      } else if (lower.includes('sugar') || lower.includes('diabet')) {
        reply = 'Diabetes requires glycemic monitoring (fasting & post-meal), low glycemic meals, and routine HbA1c screening.';
        recSearches = [
          { label: 'Diabetologists & Endocrinologists', url: '/doctors?search=Endocrinologist', icon: '🩺' },
          { label: 'HbA1c Blood Sugar Test', url: '/lab-tests?search=HbA1c', icon: '🧪' },
          { label: 'Diabetic Supplies & Pharmacy', url: '/pharmacy?search=Diabetes', icon: '💊' }
        ];
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply, recSearches }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          bottom: '70px', 
          right: '0', 
          width: '340px', 
          background: 'white', 
          borderRadius: '16px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
          border: '1px solid var(--color-gray-200)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '500px'
        }}>
          {/* Header */}
          <div style={{ padding: '14px 16px', background: 'var(--color-deep-blue)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>✨</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>AarogyaLocker AI Triage</div>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Online • Instant Guidance & Recommendations</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}>✖</button>
          </div>

          {/* Messages */}
          <div style={{ padding: '14px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', maxHeight: '270px' }}>
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div
                  style={{
                    background: m.sender === 'user' ? 'var(--color-cyan)' : 'var(--color-ice-blue)',
                    color: m.sender === 'user' ? 'white' : 'var(--color-deep-blue)',
                    padding: '8px 12px',
                    borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    lineHeight: 1.4
                  }}
                >
                  {m.text}
                </div>

                {/* Recommended searches chips */}
                {m.recSearches && m.recSearches.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                    {m.recSearches.map((rec, rIdx) => (
                      <button
                        key={rIdx}
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          navigate(rec.url);
                        }}
                        style={{
                          background: 'white',
                          border: '1px solid #93c5fd',
                          borderRadius: '12px',
                          padding: '3px 8px',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: '#1e40af',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>{rec.icon || '🔍'}</span>
                        <span>{rec.label}</span>
                        <span style={{ fontSize: '9px', color: '#60a5fa' }}>↗</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--color-ice-blue)', padding: '6px 10px', borderRadius: '8px', fontSize: '12px', color: 'var(--color-slate)' }}>
                Triage analyzing...
              </div>
            )}
          </div>

          {/* Quick suggestions pills */}
          <div style={{ padding: '6px 10px', display: 'flex', gap: '6px', overflowX: 'auto', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
            {[
              '🌡️ Mild Fever',
              '💓 Chest Pain',
              '🤕 Severe Headache',
              '🧪 High Sugar',
              '👶 Baby Cough',
              '🏥 PGIMER OPD'
            ].map((pill, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickSend(pill.replace(/^[^\s]+\s/, ''))}
                style={{
                  background: 'white',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: '12px',
                  padding: '3px 8px',
                  fontSize: '11px',
                  color: 'var(--color-deep-blue)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Quick Input Bar */}
          <div style={{ padding: '10px', borderTop: '1px solid var(--color-gray-200)', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ask a quick question..."
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleQuickSend(); }}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid var(--color-gray-200)',
                fontSize: '12px'
              }}
            />
            <button
              onClick={() => handleQuickSend()}
              className="btn btn-primary"
              style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '8px' }}
            >
              Send
            </button>
          </div>

          <div style={{ padding: '8px 12px', background: '#f8fafc', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
            <button 
              onClick={() => {
                setIsOpen(false);
                navigate('/ai-assistant');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-deep-blue)',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Open Full-Screen AI Specialist →
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #14b8a6 0%, #0f3e6d 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 6px 16px rgba(15, 62, 109, 0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '26px',
          transition: 'transform 0.2s',
        }}
        aria-label="Toggle AI Assistant"
      >
        ✨
      </button>
    </div>
  );
}
