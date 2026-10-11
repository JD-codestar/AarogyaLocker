import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          bottom: '70px', 
          right: '0', 
          width: '300px', 
          background: 'white', 
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          border: '1px solid var(--color-gray-200)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', background: 'var(--color-deep-blue)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>✨ AI Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>✖</button>
          </div>
          <div style={{ padding: '16px', fontSize: '14px', color: 'var(--color-slate)' }}>
            <p style={{ marginBottom: '16px' }}>Hi! I'm the CareConnect AI. How can I help you today?</p>
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', marginBottom: '8px' }}
              onClick={() => {
                setIsOpen(false);
                navigate('/ai-assistant');
              }}
            >
              Open Full Chat
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
          background: 'var(--color-cyan)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 12px rgba(36, 182, 210, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transition: 'transform 0.2s'
        }}
        aria-label="Toggle AI Assistant"
      >
        ✨
      </button>
    </div>
  );
}
