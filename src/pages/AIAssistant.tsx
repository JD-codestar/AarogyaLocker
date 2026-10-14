import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { ChatMessage } from '../types';

export default function AIAssistant() {
  const navigate = useNavigate();
  const { currentUser, addRecord, geminiApiKey, setGeminiApiKey } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(geminiApiKey);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Initial demo conversation
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'I have had a mild fever of 100.4°F and body ache for the last 2 days. What precautions should I take?',
      timestamp: 'Today, 10:15 AM'
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: 'Based on your symptoms (mild fever of 100.4°F and generalized body aches for 48 hours), this presentation is characteristic of a viral flu syndrome or upper respiratory response. Here is your structured triage breakdown:',
      timestamp: 'Today, 10:15 AM',
      triageData: {
        urgency: 'Moderate',
        possibleCauses: ['Viral Influenza / Common Cold', 'Seasonal Viral Fever', 'Mild Upper Respiratory Infection'],
        precautions: [
          'Hydration: Drink at least 2.5–3 liters of warm water and electrolyte fluids daily.',
          'Rest: Complete bed rest to assist immune defense.',
          'Temperature monitoring: Keep a log every 6 hours.',
          'Paracetamol 650mg can be used for fever reduction after food (if not allergic).'
        ],
        recommendedSpecialist: 'General Physician'
      }
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Medical Triage Simulation Engine
  const generateClinicalResponse = (query: string): { text: string; triageData?: ChatMessage['triageData'] } => {
    const q = query.toLowerCase();

    if (q.includes('chest') && (q.includes('pain') || q.includes('tightness') || q.includes('breath'))) {
      return {
        text: '⚠️ EMERGENCY ALERT: Chest pain, tightness, or shortness of breath requires urgent medical evaluation to rule out acute coronary syndrome or pulmonary complications.',
        triageData: {
          urgency: 'Urgent',
          possibleCauses: ['Angina / Myocardial Ischemia', 'Costochondritis', 'Severe Acid Reflux (GERD)', 'Pulmonary Embolism'],
          precautions: [
            'Do NOT exert yourself or engage in physical activity.',
            'Sit in an upright position and loosen tight clothing.',
            'Seek immediate emergency medical attention or call an ambulance if accompanied by left arm pain, sweating, or dizziness.'
          ],
          recommendedSpecialist: 'Cardiologist'
        }
      };
    }

    if (q.includes('headache') || q.includes('migraine')) {
      return {
        text: 'Headache analysis: Headaches can stem from muscle tension, migraine triggers, dehydration, or eye strain.',
        triageData: {
          urgency: 'Low / Self-care',
          possibleCauses: ['Tension Headache', 'Migraine Episode', 'Dehydration / Eye Fatigue', 'Cervical Strain'],
          precautions: [
            'Rest in a quiet, dark room.',
            'Apply a cold or warm compress to forehead and neck.',
            'Stay hydrated and avoid skipping meals.',
            'Consult a doctor if accompanied by visual aura or stiff neck.'
          ],
          recommendedSpecialist: 'Neurologist / General Physician'
        }
      };
    }

    if (q.includes('rash') || q.includes('skin') || q.includes('itch')) {
      return {
        text: 'Dermatological assessment: Skin eruptions and itching frequently arise from contact allergens, eczema, urticaria, or fungal issues.',
        triageData: {
          urgency: 'Moderate',
          possibleCauses: ['Contact Dermatitis', 'Allergic Urticaria (Hives)', 'Eczema Flare-up', 'Heat Rash'],
          precautions: [
            'Avoid scratching to prevent secondary bacterial infection.',
            'Use mild, fragrance-free moisturizers or calamine lotion.',
            'Avoid harsh soaps and synthetic fabrics.',
            'Consider antihistamines if itching is severe.'
          ],
          recommendedSpecialist: 'Dermatologist'
        }
      };
    }

    if (q.includes('cough') || q.includes('throat') || q.includes('cold')) {
      return {
        text: 'Respiratory assessment: Persistent cough or pharyngeal irritation commonly accompanies seasonal viral infections or bronchitis.',
        triageData: {
          urgency: 'Moderate',
          possibleCauses: ['Viral Pharyngitis', 'Acute Bronchitis', 'Post-nasal Drip', 'Allergic Rhinitis'],
          precautions: [
            'Steam inhalation twice daily.',
            'Warm saline gargles 3 times a day.',
            'Honey and warm ginger tea to soothe airway lining.',
            'Visit a clinician if cough lasts >2 weeks or produces colored phlegm.'
          ],
          recommendedSpecialist: 'General Physician / Pulmonologist'
        }
      };
    }

    // Default intelligent clinical response
    return {
      text: `Clinical assessment for your inquiry regarding "${query}": Your symptoms should be monitored closely for progression or onset of red flag indicators.`,
      triageData: {
        urgency: 'Moderate',
        possibleCauses: ['Non-specific Symptom Complex', 'Lifestyle / Metabolic Adaptation', 'Early Stage Infection'],
        precautions: [
          'Maintain balanced nutrition, adequate hydration, and restorative sleep.',
          'Record daily temperature and symptom severity.',
          'Schedule a comprehensive clinical consultation if symptoms persist >48 hours.'
        ],
        recommendedSpecialist: 'General Physician'
      }
    };
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (geminiApiKey.trim()) {
        // Real Gemini API Call
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `You are AarogyaLocker's AI Clinical Triage Specialist. Provide a structured, helpful, and empathetic health response. Suggest possible causes, precautions, and recommended doctor specialty. Query: ${query}` }]
              }
            ]
          })
        });

        const data = await res.json();
        const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (geminiText) {
          const aiMsg: ChatMessage = {
            id: `msg-ai-${Date.now()}`,
            sender: 'ai',
            text: geminiText,
            timestamp: 'Just now',
            triageData: {
              urgency: 'Moderate',
              possibleCauses: ['Clinical Condition Analyzed by Gemini AI'],
              precautions: ['Follow clinical triage instructions', 'Schedule consultation with a specialist'],
              recommendedSpecialist: 'General Physician'
            }
          };
          setMessages(prev => [...prev, aiMsg]);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to built-in medical triage engine:', e);
    }

    // Fallback simulation engine
    setTimeout(() => {
      const response = generateClinicalResponse(query);
      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: 'Just now',
        triageData: response.triageData
      };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 700);
  };

  const handleSaveToLocker = (msg: ChatMessage) => {
    if (!currentUser) return;

    addRecord({
      patientId: currentUser.id,
      name: `AI Clinical Triage Summary — ${msg.triageData?.recommendedSpecialist || 'General Health'}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      type: 'Laboratory',
      doctor: 'AarogyaLocker AI Medical Specialist (v5.0)',
      fileSize: '180 KB',
      fileType: 'application/pdf',
      notes: `${msg.text} \n\nRecommended: ${msg.triageData?.recommendedSpecialist}. Precautions: ${msg.triageData?.precautions.join('; ')}`,
      tags: ['AI Triage', 'Symptom Check', msg.triageData?.recommendedSpecialist || 'Health'],
      abhaLinked: true
    });

    setSaveSuccessMsg('✓ Triage summary saved to your AarogyaLocker records!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: 'Hello! I am your AarogyaLocker AI Health Specialist. Describe your symptoms or medical query to begin triage.',
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: 'calc(100vh - var(--nav-height))', padding: '24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '24px', height: 'calc(100vh - var(--nav-height) - 48px)' }}>
        
        {/* Left Sidebar */}
        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0 }}>
          {/* Top Card */}
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', letterSpacing: '0.5px' }}>YOUR AI SPECIALIST</span>
              <span style={{ fontSize: '11px', backgroundColor: '#0f3e6d', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>V 5.0</span>
            </div>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: 'var(--color-deep-blue)' }}>Family Doctor AI</h2>
            <p style={{ margin: 0, fontSize: '12px', color: '#666', lineHeight: '1.5' }}>
              Conversational triage & preliminary health insights. Informational only — not a clinical substitute for licensed medical examination.
            </p>
            
            <button 
              onClick={handleNewChat}
              style={{ 
                background: 'linear-gradient(90deg, #2db6fa 0%, #17d9a3 100%)', 
                color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', 
                fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
            >
              + New Consultation
            </button>

            <button
              onClick={() => setShowApiKeyModal(true)}
              style={{
                background: 'none',
                border: '1px solid var(--color-gray-200)',
                color: 'var(--color-slate)',
                padding: '8px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ⚙️ {geminiApiKey ? 'Gemini Key Configured' : 'Configure Gemini API'}
            </button>
          </div>

          {/* Prompt Templates */}
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '20px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 'bold', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Common Triage Prompts
            </div>
            {[
              'Fever and chills for 2 days',
              'Severe headache and light sensitivity',
              'Chest tightness during exertion',
              'Skin rash with severe itching',
              'Persistent cough for past two weeks',
              'Low carbohydrate diet for diabetes'
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                style={{
                  background: 'var(--color-ice-blue)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  textAlign: 'left',
                  fontSize: '12px',
                  color: 'var(--color-deep-blue)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  lineHeight: 1.4
                }}
              >
                {p} →
              </button>
            ))}
          </div>
        </div>

        {/* Center Chat Area */}
        <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          {/* Header */}
          <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: 'var(--color-deep-blue)' }}>
                AI Health Specialist Conversation
              </h2>
              <div style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                AI Online & Ready • ABHA Locker Integration Active
              </div>
            </div>

            {saveSuccessMsg && (
              <span style={{ fontSize: '12px', color: '#047857', fontWeight: 600, background: '#dcfce7', padding: '4px 10px', borderRadius: '8px' }}>
                {saveSuccessMsg}
              </span>
            )}
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map((m) => (
              <div key={m.id}>
                {m.sender === 'user' ? (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <div style={{ backgroundColor: 'var(--color-deep-blue)', color: 'white', padding: '14px 18px', borderRadius: '16px 4px 16px 16px', maxWidth: '75%', fontSize: '14px', lineHeight: '1.5' }}>
                      {m.text}
                    </div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-cyan)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px', flexShrink: 0 }}>
                      {currentUser?.avatar || 'U'}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#a6f4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#006c5b', fontSize: '12px', flexShrink: 0 }}>
                      AI
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '80%' }}>
                      <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '4px 16px 16px 16px', fontSize: '14px', color: '#333', lineHeight: '1.6' }}>
                        <p style={{ margin: '0 0 10px' }}>{m.text}</p>

                        {/* Structured Triage Card */}
                        {m.triageData && (
                          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-blue)' }}>
                                📋 CLINICAL TRIAGE ANALYSIS
                              </span>
                              <span style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '10px',
                                background: m.triageData.urgency === 'Urgent' ? '#fee2e2' : m.triageData.urgency === 'Moderate' ? '#fef3c7' : '#dcfce7',
                                color: m.triageData.urgency === 'Urgent' ? '#dc2626' : m.triageData.urgency === 'Moderate' ? '#b45309' : '#16a34a'
                              }}>
                                Urgency: {m.triageData.urgency}
                              </span>
                            </div>

                            {m.triageData.possibleCauses.length > 0 && (
                              <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                                <strong>Possible Underlying Factors:</strong>
                                <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
                                  {m.triageData.possibleCauses.map((c, idx) => (
                                    <li key={idx}>{c}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {m.triageData.precautions.length > 0 && (
                              <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                                <strong>Recommended Precautions:</strong>
                                <ul style={{ margin: '4px 0 0 18px', padding: 0 }}>
                                  {m.triageData.precautions.map((p, idx) => (
                                    <li key={idx}>{p}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '8px' }}>
                              <span style={{ fontSize: '12px', color: 'var(--color-deep-blue)' }}>
                                🩺 Recommended Specialist: <strong>{m.triageData.recommendedSpecialist}</strong>
                              </span>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                  onClick={() => navigate('/doctors')}
                                  style={{
                                    background: 'var(--color-ice-blue)',
                                    border: '1px solid var(--color-cyan)',
                                    color: 'var(--color-deep-blue)',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Book Specialist →
                                </button>
                                <button
                                  onClick={() => handleSaveToLocker(m)}
                                  style={{
                                    background: 'var(--color-cyan)',
                                    border: 'none',
                                    color: 'white',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                  }}
                                >
                                  💾 Save to Health Locker
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: '11px', color: '#999' }}>{m.timestamp}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#a6f4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#006c5b', fontSize: '12px' }}>
                  AI
                </div>
                <div style={{ backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '4px 16px 16px 16px', fontSize: '13px', color: '#666' }}>
                  Analyzing symptoms & formulating clinical triage...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '12px' }}>
            <input
              type="text"
              placeholder="Describe symptoms, query medications, or ask for healthcare guidance..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid var(--color-gray-200)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="btn btn-primary"
              style={{ padding: '0 24px', borderRadius: '12px' }}
            >
              Send
            </button>
          </div>
        </div>

      </div>

      {/* --- GEMINI API KEY MODAL --- */}
      {showApiKeyModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowApiKeyModal(false); }}>
          <div className="modal" style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h2>Configure Gemini API</h2>
              <button className="modal-close" onClick={() => setShowApiKeyModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '13px', color: 'var(--color-slate)', margin: '0 0 14px' }}>
                Optional: Enter your Google Gemini API key to enable live LLM multimodal responses. If left empty, the intelligent built-in clinical triage engine will be used.
              </p>
              <div className="booking-form-group">
                <label htmlFor="apiKey">Gemini API Key</label>
                <input
                  id="apiKey"
                  type="password"
                  className="input-field"
                  placeholder="AIzaSy..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '12px' }}
                onClick={() => {
                  setGeminiApiKey(apiKeyInput.trim());
                  setShowApiKeyModal(false);
                }}
              >
                Save API Key
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
