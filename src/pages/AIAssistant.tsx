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
        recommendedSpecialist: 'General Physician',
        recommendedSearches: [
          { label: 'General Physicians in Chandigarh & Mohali', url: '/doctors?search=General Physician', icon: '🩺', type: 'doctor' },
          { label: 'PGIMER & GMCH 32 OPD Passes', url: '/hospitals?search=General Medicine', icon: '🏥', type: 'hospital' },
          { label: 'Complete Blood Count (CBC) Test', url: '/lab-tests?search=Complete Blood Count', icon: '🧪', type: 'test' },
          { label: 'Paracetamol & Viral Cold Relief', url: '/pharmacy?search=Paracetamol', icon: '💊', type: 'pharmacy' },
          { label: 'When does a fever require hospitalization?', url: '', icon: '❓', type: 'prompt' }
        ]
      }
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Medical Triage Simulation Engine with Recommended Searches
  const generateClinicalResponse = (query: string): { text: string; triageData?: ChatMessage['triageData'] } => {
    const q = query.toLowerCase();

    // 1. Cardiac / Emergency
    if (q.includes('chest') && (q.includes('pain') || q.includes('tightness') || q.includes('breath') || q.includes('pressure'))) {
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
          recommendedSpecialist: 'Cardiologist',
          recommendedSearches: [
            { label: 'Find Cardiologists (Fortis Mohali, Max, PGIMER)', url: '/doctors?search=Cardiologist', icon: '💓', type: 'doctor' },
            { label: 'Emergency OPDs at Tricity Hospitals', url: '/hospitals?search=Emergency', icon: '🏥', type: 'hospital' },
            { label: 'Cardiac Risk Marker / Lipid Profile', url: '/lab-tests?search=Lipid Profile', icon: '🧪', type: 'test' },
            { label: 'Blood Pressure & ECG Monitoring', url: '/lab-tests?search=ECG', icon: '📊', type: 'test' },
            { label: 'What are the red flag signs of angina?', url: '', icon: '❓', type: 'prompt' }
          ]
        }
      };
    }

    // 2. Headache / Neurological
    if (q.includes('headache') || q.includes('migraine') || q.includes('dizz') || q.includes('vertigo')) {
      return {
        text: 'Headache & Neurological Analysis: Symptoms can stem from muscle tension, migraine triggers, dehydration, cervical fatigue, or vestibular inner-ear sensitivity.',
        triageData: {
          urgency: 'Low / Self-care',
          possibleCauses: ['Tension Headache', 'Migraine Episode with Aura', 'Cervical Spondylosis', 'Dehydration / Eye Fatigue'],
          precautions: [
            'Rest in a quiet, dark room away from bright screens.',
            'Apply a cold compress to the temples or warm wrap around the neck.',
            'Hydrate with electrolyte water and avoid skipping meals.',
            'Consult immediately if accompanied by sudden numbness, speech slurring, or neck stiffness.'
          ],
          recommendedSpecialist: 'Neurologist',
          recommendedSearches: [
            { label: 'Neurologists in Chandigarh & Mohali', url: '/doctors?search=Neurologist', icon: '🧠', type: 'doctor' },
            { label: 'PGIMER & Max Hospital Neurology OPD', url: '/hospitals?search=Neurology', icon: '🏥', type: 'hospital' },
            { label: 'Vitamin B12 & Vitamin D3 Screen', url: '/lab-tests?search=Vitamin', icon: '🧪', type: 'test' },
            { label: 'Migraine & Tension Headache Relief', url: '/pharmacy?search=Pain Relief', icon: '💊', type: 'pharmacy' },
            { label: 'Natural ways to prevent migraine triggers', url: '', icon: '❓', type: 'prompt' }
          ]
        }
      };
    }

    // 3. Skin / Dermatology
    if (q.includes('rash') || q.includes('skin') || q.includes('itch') || q.includes('acne') || q.includes('allergy')) {
      return {
        text: 'Dermatological Assessment: Eruptions, hives, or pruritus (itching) frequently arise from contact allergens, fungal exposure, eczema flare-ups, or environmental sensitivity.',
        triageData: {
          urgency: 'Moderate',
          possibleCauses: ['Allergic Contact Dermatitis', 'Urticaria (Hives)', 'Eczema / Atopic Dermatitis', 'Tinea / Fungal Dermatitis'],
          precautions: [
            'Avoid scratching to prevent secondary bacterial infection or scarring.',
            'Apply calamine lotion or fragrance-free ceramide moisturizer.',
            'Wear loose, breathable cotton clothing and avoid hot showers.',
            'Do not self-prescribe high-potency steroid creams without specialist oversight.'
          ],
          recommendedSpecialist: 'Dermatologist',
          recommendedSearches: [
            { label: 'Top Dermatologists in Chandigarh & Mohali', url: '/doctors?search=Dermatologist', icon: '🧴', type: 'doctor' },
            { label: 'Dermatology OPD at GMCH Sector 32', url: '/hospitals?search=GMCH', icon: '🏥', type: 'hospital' },
            { label: 'Comprehensive Allergy Screening Panel', url: '/lab-tests?search=Allergy', icon: '🧪', type: 'test' },
            { label: 'Antihistamines & Soothing Lotions', url: '/pharmacy?search=Ointment', icon: '💊', type: 'pharmacy' },
            { label: 'How to differentiate eczema from fungal infection?', url: '', icon: '❓', type: 'prompt' }
          ]
        }
      };
    }

    // 4. Respiratory / Cough / Cold / Phlegm
    if (q.includes('cough') || q.includes('throat') || q.includes('cold') || q.includes('phlegm') || q.includes('sinus')) {
      return {
        text: 'Respiratory Tract Assessment: Persistent cough, sore throat, or sinus congestion points towards seasonal viral bronchitis, post-nasal drip, or allergic rhinitis.',
        triageData: {
          urgency: 'Moderate',
          possibleCauses: ['Viral Pharyngitis / Laryngitis', 'Acute Bronchitis', 'Allergic Sinusitis', 'Post-viral Cough Reflex'],
          precautions: [
            'Steam inhalation with eucalyptus or menthol twice daily.',
            'Warm saline gargles (1/2 tsp salt in warm water) 3 times daily.',
            'Honey and warm ginger tea to coat and soothe airway mucosal lining.',
            'Consult if cough lasts >2 weeks or produces rust-colored or yellow phlegm.'
          ],
          recommendedSpecialist: 'Pulmonologist / General Physician',
          recommendedSearches: [
            { label: 'Pulmonologists & ENT Specialists', url: '/doctors?search=Pulmonology', icon: '🫁', type: 'doctor' },
            { label: 'PGIMER Pulmonary Medicine OPD', url: '/hospitals?search=Pulmonology', icon: '🏥', type: 'hospital' },
            { label: 'Digital Chest X-Ray & Sputum Culture', url: '/lab-tests?search=Chest X-Ray', icon: '🧪', type: 'test' },
            { label: 'Cough Syrups & Lozenges', url: '/pharmacy?search=Cough', icon: '💊', type: 'pharmacy' },
            { label: 'Best home remedies for chronic dry cough', url: '', icon: '❓', type: 'prompt' }
          ]
        }
      };
    }

    // 5. Stomach / Acidity / Digestion
    if (q.includes('stomach') || q.includes('acid') || q.includes('gas') || q.includes('bloat') || q.includes('vomit') || q.includes('diarrhea') || q.includes('belly') || q.includes('gut')) {
      return {
        text: 'Gastrointestinal Assessment: Abdominal discomfort, reflux, or bowel irregularity often stems from acute gastroenteritis, GERD, dietary intolerance, or dysbiosis.',
        triageData: {
          urgency: 'Moderate',
          possibleCauses: ['Acute Gastroenteritis / Food Toxicity', 'Gastroesophageal Reflux (GERD)', 'Irritable Bowel Syndrome (IBS)', 'Gastritis / Peptic Irritation'],
          precautions: [
            'Sip Oral Rehydration Salts (ORS) or coconut water continuously to avoid dehydration.',
            'Eat bland foods: rice congee, curd, boiled apples (BRAT diet).',
            'Avoid spicy, fried, citrus, and caffeinated foods.',
            'Seek immediate care if you notice blood in stool or severe right-lower quadrant pain.'
          ],
          recommendedSpecialist: 'Gastroenterologist',
          recommendedSearches: [
            { label: 'Gastroenterologists in Tricity', url: '/doctors?search=Gastroenterologist', icon: '🩺', type: 'doctor' },
            { label: 'Max Hospital & Fortis GI OPD', url: '/hospitals?search=Gastroenterology', icon: '🏥', type: 'hospital' },
            { label: 'Liver Function Test (LFT) & Stool Analysis', url: '/lab-tests?search=Liver', icon: '🧪', type: 'test' },
            { label: 'ORS, Antacids & Probiotics', url: '/pharmacy?search=Antacid', icon: '💊', type: 'pharmacy' },
            { label: 'When to seek emergency help for abdominal pain?', url: '', icon: '❓', type: 'prompt' }
          ]
        }
      };
    }

    // 6. Diabetes / Blood Sugar / Metabolic
    if (q.includes('sugar') || q.includes('diabet') || q.includes('glucose') || q.includes('hba1c') || q.includes('thyroid')) {
      return {
        text: 'Metabolic & Endocrine Evaluation: Glycemic fluctuations and metabolic concerns need structured HbA1c surveillance, dietary management, and therapeutic titration.',
        triageData: {
          urgency: 'Moderate',
          possibleCauses: ['Type 2 Diabetes Mellitus', 'Impaired Fasting Glucose (Prediabetes)', 'Metabolic Syndrome', 'Thyroid Dysfunction'],
          precautions: [
            'Check both fasting and post-prandial (2hr after meal) capillary blood glucose.',
            'Prioritize complex fiber, green vegetables, and lean proteins over refined carbohydrates.',
            'Engage in 30 minutes of moderate aerobic walking daily.',
            'Maintain strict adherence to prescribed glycemic medications.'
          ],
          recommendedSpecialist: 'Endocrinologist',
          recommendedSearches: [
            { label: 'Endocrinologists & Diabetologists', url: '/doctors?search=Endocrinologist', icon: '🩺', type: 'doctor' },
            { label: 'PGIMER Advanced Endocrinology Center', url: '/hospitals?search=PGIMER', icon: '🏥', type: 'hospital' },
            { label: 'HbA1c & Fasting Blood Sugar Test', url: '/lab-tests?search=HbA1c', icon: '🧪', type: 'test' },
            { label: 'Glucometer Strips & Diabetic Supplies', url: '/pharmacy?search=Diabetes', icon: '💊', type: 'pharmacy' },
            { label: 'Recommended target HbA1c ranges by age', url: '', icon: '❓', type: 'prompt' }
          ]
        }
      };
    }

    // 7. Orthopedic / Joint / Back / Knee Pain
    if (q.includes('bone') || q.includes('joint') || q.includes('knee') || q.includes('back') || q.includes('spine') || q.includes('fracture') || q.includes('sprain')) {
      return {
        text: 'Musculoskeletal & Orthopedic Assessment: Joint stiffness, localized swelling, or back pain commonly relates to ligament strain, lumbar fatigue, or osteoarthritic wear.',
        triageData: {
          urgency: 'Moderate',
          possibleCauses: ['Lumbar Muscle Strain / Sciatica', 'Osteoarthritis of Knee / Hip', 'Ligament Sprain / Tendinitis', 'Postural Cervical Syndrome'],
          precautions: [
            'RICE protocol for acute injuries: Rest, Ice pack (15 min), Compression wrap, Elevation.',
            'Avoid heavy lifting or sudden twisting movements.',
            'Use ergonomic seating with lumbar support.',
            'Consult for imaging (X-Ray / MRI) if unable to bear weight.'
          ],
          recommendedSpecialist: 'Orthopedic Surgeon',
          recommendedSearches: [
            { label: 'Orthopedic Specialists in Tricity', url: '/doctors?search=Orthopedic', icon: '🦴', type: 'doctor' },
            { label: 'Fortis & Shalby Joint Replacement OPD', url: '/hospitals?search=Orthopedic', icon: '🏥', type: 'hospital' },
            { label: 'Calcium, Vitamin D & Bone Density', url: '/lab-tests?search=Calcium', icon: '🧪', type: 'test' },
            { label: 'Pain Relief Sprays & Gel', url: '/pharmacy?search=Pain Relief', icon: '💊', type: 'pharmacy' },
            { label: 'Exercises for chronic lower back pain', url: '', icon: '❓', type: 'prompt' }
          ]
        }
      };
    }

    // 8. Pediatric / Child Symptoms
    if (q.includes('child') || q.includes('baby') || q.includes('infant') || q.includes('kid') || q.includes('pediatric') || q.includes('toddler')) {
      return {
        text: 'Pediatric Care Assessment: Pediatric patients require prompt dosage calculation by weight and close observation for activity level, fluid intake, and breathing rate.',
        triageData: {
          urgency: 'Moderate',
          possibleCauses: ['Pediatric Viral Exanthem', 'Otitis Media (Ear Infection)', 'Pediatric Bronchiolitis', 'Teething / Fever'],
          precautions: [
            'Ensure adequate fluid intake; monitor wet diapers (minimum 4-6 wet diapers in 24 hours).',
            'Never administer adult medications or aspirin to children.',
            'Give weight-based paracetamol syrup only under pediatrician instructions.',
            'Seek immediate hospital attention if child shows lethargy, grunting breathing, or refuses feeds.'
          ],
          recommendedSpecialist: 'Pediatrician',
          recommendedSearches: [
            { label: 'Leading Pediatricians in Chandigarh & Mohali', url: '/doctors?search=Pediatrician', icon: '👶', type: 'doctor' },
            { label: 'PGIMER Advanced Pediatrics Centre (APC)', url: '/hospitals?search=PGIMER', icon: '🏥', type: 'hospital' },
            { label: 'Routine Pediatric Blood & Urine Screen', url: '/lab-tests?search=Blood', icon: '🧪', type: 'test' },
            { label: 'Pediatric Paracetamol & Electrolyte Syrups', url: '/pharmacy?search=Syrup', icon: '💊', type: 'pharmacy' },
            { label: 'Signs of dehydration in young children', url: '', icon: '❓', type: 'prompt' }
          ]
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
        recommendedSpecialist: 'General Physician',
        recommendedSearches: [
          { label: 'Search Top Doctors & Specialists', url: `/doctors?search=${encodeURIComponent(query.slice(0, 25))}`, icon: '🩺', type: 'doctor' },
          { label: 'Search Chandigarh & Mohali Hospitals', url: '/hospitals', icon: '🏥', type: 'hospital' },
          { label: 'Routine Health Checkup Package', url: '/lab-tests', icon: '🧪', type: 'test' },
          { label: 'Online Pharmacy & Medicine Delivery', url: '/pharmacy', icon: '💊', type: 'pharmacy' },
          { label: 'What lifestyle changes improve immunity?', url: '', icon: '❓', type: 'prompt' }
        ]
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
          const fallback = generateClinicalResponse(query);
          const aiMsg: ChatMessage = {
            id: `msg-ai-${Date.now()}`,
            sender: 'ai',
            text: geminiText,
            timestamp: 'Just now',
            triageData: fallback.triageData || {
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

                            {/* Recommended Searches & Next Actions */}
                            {m.triageData.recommendedSearches && m.triageData.recommendedSearches.length > 0 && (
                              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed #cbd5e1' }}>
                                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-deep-blue)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span>🔍</span>
                                  <span>RECOMMENDED SEARCHES & TRICITY HEALTH SERVICES:</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                  {m.triageData.recommendedSearches.map((recSearch, sIdx) => (
                                    <button
                                      key={sIdx}
                                      type="button"
                                      onClick={() => {
                                        if (recSearch.type === 'prompt') {
                                          handleSend(recSearch.label);
                                        } else if (recSearch.url) {
                                          navigate(recSearch.url);
                                        }
                                      }}
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: '#ffffff',
                                        border: '1px solid #93c5fd',
                                        borderRadius: '16px',
                                        padding: '4px 10px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        color: '#1e40af',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#eff6ff';
                                        e.currentTarget.style.borderColor = '#2563eb';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#ffffff';
                                        e.currentTarget.style.borderColor = '#93c5fd';
                                      }}
                                    >
                                      <span>{recSearch.icon || '🔍'}</span>
                                      <span>{recSearch.label}</span>
                                      <span style={{ fontSize: '10px', color: '#60a5fa' }}>↗</span>
                                    </button>
                                  ))}
                                </div>
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

          {/* Quick Recommended Prompt Chips */}
          <div style={{ 
            padding: '8px 20px', 
            background: '#f8fafc', 
            borderTop: '1px solid #f1f5f9', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            overflowX: 'auto' 
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>
              💡 Quick Triage:
            </span>
            {[
              '🌡️ 101°F fever for 2 days',
              '💓 Chest tightness or palpitations',
              '🤕 Migraine with light sensitivity',
              '🧪 Explain high blood sugar HbA1c',
              '🏥 OPD timing at PGIMER Chandigarh',
              '👶 Child has ear pain & fever',
              '🦵 Knee joint swelling & pain'
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip.replace(/^[^\s]+\s/, ''))}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '5px 12px',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  fontSize: '12px',
                  color: '#1e293b',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.background = '#f0f9ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = 'white';
                }}
              >
                {chip}
              </button>
            ))}
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
