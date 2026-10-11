import React, { useState } from 'react';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  
  // Mock data to match UI exactly
  const history = [
    { title: "What should I do if I have a sore throa...", category: "TODAY" },
    { title: "How can I distinguish between a cold...", category: "TODAY" },
    { title: "What can I do to relieve a severe hea...", category: "TODAY" },
    { title: "Are there any preventive measures fo...", category: "MAY" },
    { title: "What are the common symptoms of...", category: "MAY" },
    { title: "How can I manage my seasonal allerg...", category: "MAY" },
    { title: "What are the common symptoms of...", category: "MAY" },
    { title: "How can I manage my seasonal allerg...", category: "MAY" },
    { title: "What are the common symptoms of...", category: "APRIL" }
  ];

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: 'calc(100vh - var(--nav-height))', padding: '24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '24px', height: 'calc(100vh - var(--nav-height) - 48px)' }}>
        
        {/* Left Sidebar */}
        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '24px', flexShrink: 0 }}>
          {/* Top Card */}
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', letterSpacing: '0.5px' }}>YOUR AI SPECIALIST</span>
              <span style={{ fontSize: '11px', backgroundColor: '#222', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>V 5.0</span>
            </div>
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '600', color: '#222' }}>Family doctor</h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
              This chat is not a substitute for a real doctor. Please consult a qualified healthcare professional for medical assistance. Self-medication can be harmful to your health.
            </p>
            <button style={{ 
              background: 'linear-gradient(90deg, #2db6fa 0%, #17d9a3 100%)', 
              color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', 
              fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '8px',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              New Chat
            </button>
          </div>

          {/* History Card */}
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '0.5px' }}>TODAY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {history.filter(h => h.category === 'TODAY').map((h, i) => (
                  <div key={i} style={{ fontSize: '13px', color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>{h.title}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '0.5px' }}>MAY</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {history.filter(h => h.category === 'MAY').map((h, i) => (
                  <div key={i} style={{ fontSize: '13px', color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>{h.title}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '0.5px' }}>APRIL</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {history.filter(h => h.category === 'APRIL').map((h, i) => (
                  <div key={i} style={{ fontSize: '13px', color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>{h.title}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Chat Area */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          {/* Header */}
          <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#222' }}>AI Specialist Chat</h2>
            <button style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}>⋮</button>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', fontWeight: 'bold', letterSpacing: '0.5px' }}>TODAY</div>
            
            {/* User message */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <div style={{ backgroundColor: '#f9fafc', padding: '16px', borderRadius: '16px 4px 16px 16px', maxWidth: '70%', fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
                Hello! I visited the doctor and received a prescription for medication. Can you help me add this information to my medical record?
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ddd', backgroundImage: 'url(https://i.pravatar.cc/100?img=5)', backgroundSize: 'cover', flexShrink: 0 }} />
            </div>

            {/* AI Message */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#a6f4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#006c5b', fontSize: '12px', flexShrink: 0 }}>OK</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '70%' }}>
                <div style={{ backgroundColor: '#f9fafc', padding: '16px', borderRadius: '4px 16px 16px 16px', fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
                  Good day! Of course, I can help you with this. Please provide me with your documents, and I will add this information to your medical record.
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, fontSize: '14px' }}>⎘</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, fontSize: '14px' }}>👍</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, fontSize: '14px' }}>👎</button>
              </div>
            </div>

            {/* User message (Image) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <div style={{ backgroundColor: '#f9fafc', padding: '12px', borderRadius: '16px 4px 16px 16px', maxWidth: '70%' }}>
                <div style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', width: '260px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '16px' }}>⚕️</span> Pharmacy
                    </span>
                    <span style={{ fontSize: '9px', color: '#888', fontWeight: 'bold' }}>PRESCRIBED 28 MAY 2024</span>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#4caf50', textAlign: 'center', marginTop: '8px' }}>PRESCRIPTION RECEIPT</div>
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '8px', lineHeight: '1.5' }}>
                    <strong>Rx Details</strong><br/>
                    Patient Name: Gretta Foxters<br/>
                    Medication: Amoxicillin 500mg<br/>
                    Sig: 1 cap PO TID x 7 days
                  </div>
                </div>
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ddd', backgroundImage: 'url(https://i.pravatar.cc/100?img=5)', backgroundSize: 'cover', flexShrink: 0 }} />
            </div>

            {/* AI Message */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#a6f4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#006c5b', fontSize: '12px', flexShrink: 0 }}>OK</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '70%' }}>
                <div style={{ backgroundColor: '#f9fafc', padding: '16px', borderRadius: '4px 16px 16px 16px', fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
                  Adding this information to your record. The prescription will be saved in our system. If you need anything else, please let me know.
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, fontSize: '14px' }}>⎘</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, fontSize: '14px' }}>👍</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, fontSize: '14px' }}>👎</button>
              </div>
            </div>

            {/* User message */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <div style={{ backgroundColor: '#f9fafc', padding: '16px', borderRadius: '16px 4px 16px 16px', maxWidth: '70%', fontSize: '14px', color: '#333', lineHeight: '1.5' }}>
                And recommend where I can purchase the necessary medication?
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ddd', backgroundImage: 'url(https://i.pravatar.cc/100?img=5)', backgroundSize: 'cover', flexShrink: 0 }} />
            </div>

          </div>

          {/* Input Area */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}>
              AI Chat Assistant typing 
              <span style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '4px', height: '4px', backgroundColor: '#888', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out' }} />
                <span style={{ width: '4px', height: '4px', backgroundColor: '#888', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out 0.2s' }} />
                <span style={{ width: '4px', height: '4px', backgroundColor: '#888', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out 0.4s' }} />
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button style={{ width: '52px', height: '52px', borderRadius: '16px', backgroundColor: '#f8f9fa', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#666', cursor: 'pointer', flexShrink: 0 }}>+</button>
              <input 
                type="text" 
                placeholder="Write your request..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ flex: 1, height: '52px', backgroundColor: '#f8f9fa', border: 'none', borderRadius: '16px', padding: '0 20px', fontSize: '15px', outline: 'none' }}
              />
              <button style={{ padding: '0 24px', height: '52px', borderRadius: '16px', backgroundColor: '#2b2d35', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', flexShrink: 0 }}>
                Send
                <span style={{ fontSize: '18px' }}>↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '24px', flexShrink: 0 }}>
          {/* Patient Info Card */}
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#222' }}>Family members (5)</h3>
            
            {/* Avatars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#aaa', padding: 0 }}>‹</button>
              <img src="https://i.pravatar.cc/100?img=11" alt="Member" style={{ width: '48px', height: '48px', borderRadius: '16px', objectFit: 'cover', opacity: 0.7 }} />
              <div style={{ padding: '3px', border: '2px solid #2db6fa', borderRadius: '20px' }}>
                <img src="https://i.pravatar.cc/100?img=5" alt="Gretta" style={{ width: '56px', height: '56px', borderRadius: '16px', objectFit: 'cover' }} />
              </div>
              <img src="https://i.pravatar.cc/100?img=12" alt="Member" style={{ width: '48px', height: '48px', borderRadius: '16px', objectFit: 'cover', opacity: 0.7 }} />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#aaa', padding: 0 }}>›</button>
            </div>

            {/* Details */}
            <div style={{ marginTop: '4px' }}>
              <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '600', color: '#222' }}>Gretta Foxters</h2>
              <div style={{ fontSize: '13px', color: '#666', display: 'flex', gap: '8px', alignItems: 'center' }}>
                Female <span style={{ fontSize: '20px', lineHeight: '0' }}>·</span> 32 yrs <span style={{ fontSize: '20px', lineHeight: '0' }}>·</span> Married
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '13px', color: '#888', lineHeight: '1.6' }}>
              The girl is in good health, with no detected pathologies or allergies. She regularly undergoes preventive medical check-ups and has no chronic illnesses.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#666' }}>Total number of requests</span>
                <span style={{ color: '#222', fontWeight: '600' }}>157</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#666' }}>Downloaded images</span>
                <span style={{ color: '#222', fontWeight: '600' }}>57</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#666' }}>Uploaded documents</span>
                <span style={{ color: '#222', fontWeight: '600' }}>19</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#666' }}>Uploaded video</span>
                <span style={{ color: '#222', fontWeight: '600' }}>7</span>
              </div>
            </div>
          </div>

          {/* Ad Card */}
          <div style={{ 
            background: 'linear-gradient(135deg, #17d9a3 0%, #2db6fa 50%, #1c5ff0 100%)', 
            borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', color: '#fff',
            position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '4px' }}>Get a specialist</div>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '600', lineHeight: '1.2' }}>Second Opinion</h3>
            </div>
            <button style={{ 
              backgroundColor: '#fff', color: '#2db6fa', border: 'none', padding: '14px', borderRadius: '12px', 
              fontSize: '15px', fontWeight: '600', cursor: 'pointer', zIndex: 1, marginTop: '12px', width: 'fit-content'
            }}>
              Get started
            </button>
            {/* Abstract shapes inside ad card */}
            <div style={{ position: 'absolute', right: '-20px', top: '-10px', width: '120px', height: '120px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', zIndex: 0 }} />
            <div style={{ position: 'absolute', right: '40px', bottom: '-40px', width: '90px', height: '90px', backgroundColor: 'rgba(255,255,255,0.15)', transform: 'rotate(45deg)', borderRadius: '16px', zIndex: 0 }} />
          </div>
        </div>

      </div>
    </div>
  );
}
