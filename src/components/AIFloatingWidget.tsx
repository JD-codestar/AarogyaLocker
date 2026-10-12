import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickInput, setQuickInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Hi! I am the AarogyaLocker AI triage specialist. Type your symptoms or choose a quick prompt below!' }
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
      let reply = 'For optimal recovery, monitor symptoms closely and maintain good hydration.';
      const lower = q.toLowerCase();
      if (lower.includes('fever') || lower.includes('temperature')) {
        reply = 'Mild fever is commonly caused by viral infection. Keep hydrated and check temperature every 6 hours. Consider consulting a General Physician if fever exceeds 102°F or lasts >3 days.';
      } else if (lower.includes('headache')) {
        reply = 'Rest in a quiet room and drink fluids. If accompanied by sudden visual changes or neck stiffness, seek emergency care.';
      } else if (lower.includes('cough') || lower.includes('cold')) {
        reply = 'Steam inhalation and warm saline gargling provide airway relief. If cough persists over 2 weeks, consult a physician.';
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
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
          maxHeight: '480px'
        }}>
          {/* Header */}
          <div style={{ padding: '14px 16px', background: 'var(--color-deep-blue)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>✨</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>AarogyaLocker AI Triage</div>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Online • Instant Guidance</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}>✖</button>
          </div>

          {/* Messages */}
          <div style={{ padding: '14px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', maxHeight: '250px' }}>
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: m.sender === 'user' ? 'var(--color-cyan)' : 'var(--color-ice-blue)',
                  color: m.sender === 'user' ? 'white' : 'var(--color-deep-blue)',
                  padding: '8px 12px',
                  borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  maxWidth: '85%',
                  lineHeight: 1.4
                }}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', background: 'var(--color-ice-blue)', padding: '6px 10px', borderRadius: '8px', fontSize: '12px', color: 'var(--color-slate)' }}>
                Triage analyzing...
              </div>
            )}
          </div>

          {/* Quick suggestions pills */}
          <div style={{ padding: '6px 12px', display: 'flex', gap: '6px', overflowX: 'auto', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
            {['Mild Fever', 'Persistent Cough', 'Severe Headache'].map((pill, i) => (
              <button
                key={i}
                onClick={() => handleQuickSend(pill)}
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
