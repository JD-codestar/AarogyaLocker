/**
 * AboutUs.tsx — Comprehensive About Us & Mission Story for AarogyaLocker.
 * Showcases the platform's genesis, ABDM integration, executive leadership,
 * clinical advisors, institutional partners, and technical architecture.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  DoctorIcon, 
  LabIcon, 
  CheckupIcon, 
  HeartPulseIcon 
} from '../Icons';

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="about-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '80px', fontFamily: 'var(--font-family)' }}>
      {/* 1. HERO BANNER */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #091a3c 0%, #0f3d64 50%, #0a4f5f 100%)',
          color: 'white',
          padding: '60px 20px 48px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb & Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#67e8f9' }}>
              <Link to="/" style={{ color: '#67e8f9', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'white', fontWeight: 600 }}>About Us</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#cbd5e1', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '20px' }}>
              <ClockIcon size={14} />
              <span>Established 2026 • Made in India 🇮🇳</span>
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.12)', padding: '6px 14px', borderRadius: '30px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.4px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ShieldIcon size={16} />
            <span>PIONEERING INDIA'S AYUSHMAN BHARAT DIGITAL REVOLUTION</span>
          </div>

          <h1 style={{ fontSize: '38px', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.8px', lineHeight: 1.2 }}>
            Empowering Every Indian Citizen With Sovereign Health Records
          </h1>

          <p style={{ fontSize: '16px', color: '#cffafe', maxWidth: '820px', margin: '0 0 28px', lineHeight: 1.6 }}>
            AarogyaLocker eliminates fragmented paper files and lost diagnostic scans. We connect hospitals, top clinicians, diagnostic labs, and pharmacies into one unified, bank-grade encrypted digital healthcare ecosystem.
          </p>

          {/* Key Impact Metrics Strip */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginTop: '28px'
            }}
          >
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#38bdf8', marginBottom: '2px' }}>45+</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Partner Hospitals</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>PGIMER, Fortis, Max & Premier Healthcare Institutions.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#38bdf8', marginBottom: '2px' }}>1,200+</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Verified Doctors</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Top-rated specialists across Chandigarh, Mohali, and Panchkula.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#38bdf8', marginBottom: '2px' }}>250,000+</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Secured Records</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Zero breaches with military-grade AES-256 cloud encryption.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#38bdf8', marginBottom: '2px' }}>&lt; 30s</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>OPD Check-In</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Fast QR code scan at hospital counters to skip the line.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT: FULL CONTENT */}
      <div 
        style={{
          maxWidth: '960px',
          margin: '36px auto 0',
          padding: '0 20px'
        }}
      >
        {/* ABOUT CONTENT BODY */}
        <main 
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px 48px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0',
            fontSize: '15px',
            lineHeight: 1.8,
            color: '#334155'
          }}
        >
          {/* Mission Callout */}
          <div style={{ background: '#ecfeff', border: '1px solid #a5f3fc', borderRadius: '12px', padding: '18px 22px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <HeartPulseIcon size={22} color="#0891b2" />
              <strong style={{ fontSize: '15px', color: '#155e75' }}>Our Sovereign Promise to Patients:</strong>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#164e63', lineHeight: 1.6 }}>
              "Your health history belongs to you, not to any hospital, insurer, or tech giant. We build tools that put every prescription, scan, and consultation permanently in your pocket—encrypted, portable, and accessible anytime."
            </p>
          </div>

          {/* Section 1 */}
          <section id="mission" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#cffafe', color: '#0891b2', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 1</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Our Genesis</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              1. Our Founding Mission & Vision
            </h2>
            <p>
              AarogyaLocker was born out of a stark clinical reality across Indian hospitals: families rushing into emergency rooms carrying heavy polyethylene bags of tattered paper files, duplicate X-ray films, and smudged lab slips—often losing critical minutes while doctors struggle to reconstruct previous surgeries or drug allergies.
            </p>
            <p>
              With the visionary launch of the <strong>Ayushman Bharat Digital Mission (ABDM)</strong> by the Government of India, we recognized a historic opportunity: to architect a unified, sovereign digital locker that connects directly with hospital systems via ABDM APIs, giving 1.4 billion citizens a lifelong, portable health passport.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 2 */}
          <section id="problem-solution" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#cffafe', color: '#0891b2', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 2</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>The Healthcare Divide</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              2. The Healthcare Divide & Our Solution
            </h2>
            
            {/* Contrast Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '18px' }}>
                <strong style={{ color: '#b91c1c', display: 'block', fontSize: '14px', marginBottom: '8px' }}>
                  ❌ The Traditional Broken System
                </strong>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#7f1d1d', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Lost physical prescriptions and duplicate costly lab tests</li>
                  <li>Hours wasted waiting in OPD counters just for an appointment slip</li>
                  <li>Zero medical history continuity when switching specialists</li>
                  <li>Opaque hospital bed availability in critical trauma emergencies</li>
                </ul>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '18px' }}>
                <strong style={{ color: '#15803d', display: 'block', fontSize: '14px', marginBottom: '8px' }}>
                  ✅ The AarogyaLocker Standard
                </strong>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#14532d', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>Encrypted ABHA locker syncing all hospital visits automatically</li>
                  <li>Instant QR check-in bypassing OPD queues in under 30 seconds</li>
                  <li>Instant video consults with certified Tricity medical specialists</li>
                  <li>Live, verified ICU and emergency bed tracking across hospitals</li>
                </ul>
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 3 */}
          <section id="four-pillars" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#cffafe', color: '#0891b2', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 3</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Platform Capabilities</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              3. The 4 Architectural Pillars
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', margin: '20px 0' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <ShieldIcon size={24} color="#0284c7" />
                  <strong style={{ fontSize: '15px', color: '#0f172a' }}>1. Health Records Vault</strong>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  Direct FHIR interoperability with the National Health Authority. Store lifetime labs, immunization shots, discharge summaries, and digital prescriptions.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <DoctorIcon size={24} color="#0891b2" />
                  <strong style={{ fontSize: '15px', color: '#0f172a' }}>2. Tricity Doctor Network</strong>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  Direct access to premier cardiologists, pediatricians, neurologists, and oncologists across Chandigarh, Mohali, and Panchkula for in-clinic and video visits.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <LabIcon size={24} color="#0d9488" />
                  <strong style={{ fontSize: '15px', color: '#0f172a' }}>3. Doorstep Diagnostics</strong>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  Certified home sample collection through NABL labs. Encrypted digital reports delivered directly into your locker within 12 hours.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <CheckupIcon size={24} color="#4f46e5" />
                  <strong style={{ fontSize: '15px', color: '#0f172a' }}>4. Live Hospital Bed Tracker</strong>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6 }}>
                  Real-time visibility into ICU, ventilator, and oxygen beds across tertiary care institutions to prevent emergency redirect delays.
                </p>
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 4 */}
          <section id="abdm-ecosystem" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#cffafe', color: '#0891b2', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 4</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>National Health Authority</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              4. National ABDM Digital Integration
            </h2>
            <p>
              AarogyaLocker is built upon the architectural foundations prescribed by the National Health Authority (NHA):
            </p>
            <ul style={{ paddingLeft: '22px', margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>ABHA (Ayushman Bharat Health Account):</strong> Your unique 14-digit national health identity that stitches together records across all states and hospital groups.</li>
              <li><strong>Electronic Consent Manager:</strong> You decide who sees your records, which specific visits they can view, and for how many hours access remains active.</li>
              <li><strong>Interoperable FHIR Standard:</strong> Medical records are standardized according to HL7 FHIR (Fast Healthcare Interoperability Resources) specifications.</li>
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 5 */}
          <section id="leadership" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#cffafe', color: '#0891b2', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 5</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Team & Governance</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              5. Clinical & Engineering Leadership
            </h2>

            {/* Leadership Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', margin: '20px 0' }}>
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>👨‍⚕️</div>
                <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block' }}>Dr. Vikram Sharma, MD, DM</strong>
                <span style={{ fontSize: '12px', color: '#0891b2', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Chief Medical Officer & Clinical Governance</span>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Former Senior Registrar at PGIMER Chandigarh with 18+ years in clinical cardiology and healthcare ethics.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>💻</div>
                <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block' }}>Aarav Mehta, B.Tech, MS</strong>
                <span style={{ fontSize: '12px', color: '#0891b2', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Chief Technology Officer & Cryptography Lead</span>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  IIT Delhi alumnus specializing in zero-knowledge proofs, distributed ledger systems, and high-concurrency cloud systems.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>🏛️</div>
                <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block' }}>Priya Nambiar</strong>
                <span style={{ fontSize: '12px', color: '#0891b2', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Head of ABDM Ecosystem & Standards</span>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Advised state health departments on digital health mission integration, EHR compliance, and patient data protection.
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>🛡️</div>
                <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block' }}>Col. (Retd.) Dr. R. Bakshi</strong>
                <span style={{ fontSize: '12px', color: '#0891b2', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Advisory Chair, Public Health & Disaster Response</span>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  Armed Forces Medical College (AFMC) veteran guiding our emergency hospital triage and crisis management network.
                </p>
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 6 */}
          <section id="core-values" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#cffafe', color: '#0891b2', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 6</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Our Compass</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              6. Our Non-Negotiable Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ background: '#ecfeff', color: '#0891b2', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: '13px' }}>1</span>
                <div>
                  <strong style={{ color: '#0f172a', fontSize: '14px' }}>Patient Sovereignty Above All</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>You own your data. We never sell, monetize, or disclose your clinical information to third parties.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ background: '#ecfeff', color: '#0891b2', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: '13px' }}>2</span>
                <div>
                  <strong style={{ color: '#0f172a', fontSize: '14px' }}>Zero-Breach Cryptographic Rigor</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>Every document is sealed with AES-256 bit encryption and stored solely in MeitY-certified domestic cloud data centers.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ background: '#ecfeff', color: '#0891b2', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: '13px' }}>3</span>
                <div>
                  <strong style={{ color: '#0f172a', fontSize: '14px' }}>Frictionless Access for Every Citizen</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>Designed with extreme simplicity, high contrast, and screen reader compatibility so elderly grandparents and rural families can use it effortlessly.</p>
                </div>
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 7 */}
          <section id="partners" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#cffafe', color: '#0891b2', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 7</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Network Integration</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              7. Partner Hospitals & Diagnostic Labs
            </h2>
            <p>
              AarogyaLocker collaborates with leading public and private healthcare delivery institutions across the Tricity region and North India:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', margin: '18px 0' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>
                PGIMER Chandigarh
              </div>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>
                Fortis Hospital Mohali
              </div>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>
                Max Super Speciality
              </div>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>
                Apollo Clinic
              </div>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>
                Dr. Lal PathLabs
              </div>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>
                SRL Diagnostics
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 8 */}
          <section id="headquarters">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#cffafe', color: '#0891b2', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 8</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Connect With Us</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              8. Innovation Hub & Contact Details
            </h2>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block', marginBottom: '6px' }}>Corporate Headquarters:</strong>
                  <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    AarogyaLocker Health Technologies Ltd.<br />
                    Tower 3, Rajiv Gandhi Chandigarh Technology Park (RGCTP)<br />
                    Chandigarh, UT 160101, India
                  </div>
                </div>

                <div>
                  <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block', marginBottom: '6px' }}>Direct Support & Partnerships:</strong>
                  <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    <strong>General Support:</strong> support@aarogyalocker.in<br />
                    <strong>Hospital Onboarding:</strong> partners@aarogyalocker.in<br />
                    <strong>Media & Press:</strong> media@aarogyalocker.in<br />
                    <strong>Toll-Free Helpline:</strong> 1800-890-4433
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '13.5px', fontWeight: 700 }}>
              <CheckCircleIcon size={20} />
              <span>Ayushman Bharat Digital Mission (ABDM) Recognized</span>
            </div>
            <Link
              to="/"
              style={{
                background: '#0e7490',
                color: 'white',
                padding: '10px 22px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '13px',
                boxShadow: '0 2px 8px rgba(14, 116, 144, 0.25)'
              }}
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
