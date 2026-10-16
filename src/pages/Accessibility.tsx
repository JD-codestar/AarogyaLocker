/**
 * Accessibility.tsx — Dedicated Digital Accessibility Statement & Conformance Report
 * for AarogyaLocker in accordance with W3C Web Content Accessibility Guidelines (WCAG) 2.1
 * Level AA and the Rights of Persons with Disabilities (RPwD) Act, 2016.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  ClockIcon 
} from '../Icons';

export default function Accessibility() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div 
      className="accessibility-page"
      style={{ 
        background: '#f8fafc', 
        color: '#334155',
        minHeight: '100vh', 
        paddingBottom: '80px', 
        fontFamily: 'var(--font-family)',
        fontSize: '15px'
      }}
    >
      {/* 1. HERO BANNER */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #062c43 0%, #054569 50%, #0f172a 100%)',
          color: 'white',
          padding: '60px 20px 48px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb & Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#7dd3fc' }}>
              <Link to="/" style={{ color: '#7dd3fc', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'white', fontWeight: 600 }}>Accessibility</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#cbd5e1', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '20px' }}>
              <ClockIcon size={14} />
              <span>Standard: WCAG 2.1 Level AA & RPwD Act 2016</span>
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.12)', padding: '6px 14px', borderRadius: '30px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.4px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ShieldIcon size={16} />
            <span>UNIVERSAL HEALTHCARE ACCESSIBILITY CHARTER</span>
          </div>

          <h1 style={{ fontSize: '38px', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.8px', lineHeight: 1.2 }}>
            AarogyaLocker Digital Accessibility Statement
          </h1>

          <p style={{ fontSize: '16px', color: '#e0f2fe', maxWidth: '820px', margin: '0 0 28px', lineHeight: 1.6 }}>
            Healthcare is a fundamental human right. AarogyaLocker is built from the ground up to ensure every citizen—regardless of physical, sensory, or cognitive abilities—can manage medical records, consult certified doctors, and access emergency resources seamlessly.
          </p>

          {/* Key Accessibility Pillars Strip */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginTop: '28px'
            }}
          >
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>👁️</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Screen Reader First</strong>
              <span style={{ fontSize: '12px', color: '#e2e8f0' }}>Full ARIA landmarks, alt descriptions, and live announcements for NVDA & JAWS.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>⌨️</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>100% Keyboard Navigable</strong>
              <span style={{ fontSize: '12px', color: '#e2e8f0' }}>Logical tab progression, visible focus rings, and bypass skip links.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>🎨</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>High Contrast Ratios</strong>
              <span style={{ fontSize: '12px', color: '#e2e8f0' }}>Minimum 4.5:1 text-to-background contrast with glare-reduction modes.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>🗣️</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Multilingual & Voice</strong>
              <span style={{ fontSize: '12px', color: '#e2e8f0' }}>Structured for browser voice dictation and Indian vernacular translation.</span>
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
        {/* ACCESSIBILITY CONTENT BODY */}
        <main 
          style={{
            background: 'var(--color-white)',
            borderRadius: '16px',
            padding: '40px 48px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid var(--color-gray-200)',
            color: 'var(--color-dark-text)',
            lineHeight: 1.8
          }}
        >
          {/* Statutory Patient Callout */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px 20px', marginBottom: '32px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ color: '#2563eb', marginTop: '2px', flexShrink: 0 }}>
              <AlertCircleIcon size={22} />
            </div>
            <div style={{ fontSize: '13.5px', color: '#1e40af', lineHeight: 1.5 }}>
              <strong>Commitment to Equal Health Access:</strong> Under the Rights of Persons with Disabilities Act (2016) and Government of India Guidelines for Indian Government Websites (GIGW 3.0), AarogyaLocker is engineered to deliver zero-barrier digital health services to all citizens.
            </div>
          </div>

          {/* Section 1 */}
          <section id="commitment" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 1</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Our Core Principle</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              1. Universal Access Commitment
            </h2>
            <p>
              At AarogyaLocker, we recognize that patients accessing our services often do so under conditions of physical vulnerability, illness, or distress. Ensuring that our platform is effortlessly usable by individuals with temporary or permanent disabilities is central to our engineering ethics.
            </p>
            <p>
              We commit to continuous conformance with the <strong>World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> across all patient portals, doctor booking flows, telemedicine consultations, and laboratory dispatch services.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 2 */}
          <section id="wcag-status" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 2</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Conformance Metrics</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              2. WCAG 2.1 Level AA Conformance
            </h2>
            <p>
              The Web Content Accessibility Guidelines define four foundational principles for digital interfaces:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', margin: '20px 0' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', color: '#0284c7', fontSize: '14px', marginBottom: '4px' }}>1. Perceivable</strong>
                <span style={{ fontSize: '13px' }}>Information and UI components are presented in ways users can perceive through sight, sound, or touch.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', color: '#0284c7', fontSize: '14px', marginBottom: '4px' }}>2. Operable</strong>
                <span style={{ fontSize: '13px' }}>All navigation, buttons, modals, and appointment pickers are operable using only a keyboard or switch device.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', color: '#0284c7', fontSize: '14px', marginBottom: '4px' }}>3. Understandable</strong>
                <span style={{ fontSize: '13px' }}>Clinical instructions, error validations, and OPD queue notices are written in plain, unambiguous language.</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', color: '#0284c7', fontSize: '14px', marginBottom: '4px' }}>4. Robust</strong>
                <span style={{ fontSize: '13px' }}>Compliant with modern assistive technologies, braille displays, and cross-browser screen readers.</span>
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 3 */}
          <section id="aria-design" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 3</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Technical Architecture</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              3. Semantic HTML & ARIA Architecture
            </h2>
            <p>
              AarogyaLocker enforces semantic markup conventions to ensure that automated accessibility tools parse page topology accurately:
            </p>
            <ul style={{ paddingLeft: '22px', margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>ARIA Landmarks:</strong> Every page utilizes landmark roles including <code>&lt;header&gt;</code>, <code>&lt;nav role="navigation"&gt;</code>, <code>&lt;main id="main-content"&gt;</code>, and <code>&lt;footer role="contentinfo"&gt;</code>.</li>
              <li><strong>Live Regions:</strong> Dynamic updates such as booking confirmations, OTP countdown timers, and bed availability counters utilize <code>aria-live="polite"</code> announcements.</li>
              <li><strong>Modal Trapping:</strong> Dialogs (such as doctor booking or medical record previews) automatically trap focus inside the modal and return focus to the trigger button upon closure.</li>
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 4 */}
          <section id="keyboard-nav" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 4</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Shortcut Cheat Sheet</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              4. Keyboard Navigation & Focus Flow
            </h2>
            <p>
              Patients can navigate every workflow without touching a mouse. Visible 3px focus indicators are provided on all interactive buttons, links, and form fields.
            </p>

            {/* Keyboard Shortcuts Table */}
            <div style={{ overflowX: 'auto', margin: '20px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '12px 14px' }}>Keystroke</th>
                    <th style={{ padding: '12px 14px' }}>Global Action</th>
                    <th style={{ padding: '12px 14px' }}>Context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>Tab</td>
                    <td style={{ padding: '12px 14px' }}>Advance focus to the next interactive control</td>
                    <td style={{ padding: '12px 14px' }}>All pages</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>Shift + Tab</td>
                    <td style={{ padding: '12px 14px' }}>Return focus to the previous interactive control</td>
                    <td style={{ padding: '12px 14px' }}>All pages</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>Enter / Space</td>
                    <td style={{ padding: '12px 14px' }}>Activate button, trigger modal, or select slot</td>
                    <td style={{ padding: '12px 14px' }}>Interactive controls</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: 700, color: '#0284c7' }}>Escape (Esc)</td>
                    <td style={{ padding: '12px 14px' }}>Dismiss open modal dialog or slide-over drawer</td>
                    <td style={{ padding: '12px 14px' }}>Modals & popups</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 5 */}
          <section id="screen-readers" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 5</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Assisted Technologies</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              5. Screen Reader Compatibility
            </h2>
            <p>
              AarogyaLocker is regularly verified against the latest versions of leading screen readers:
            </p>
            <ul style={{ paddingLeft: '22px', margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>NVDA (NonVisual Desktop Access):</strong> Windows Chrome, Edge, and Firefox.</li>
              <li><strong>JAWS (Job Access With Speech):</strong> Enterprise Windows environments.</li>
              <li><strong>Apple VoiceOver:</strong> iOS (iPhone/iPad Safari) and macOS.</li>
              <li><strong>Google TalkBack:</strong> Android smartphones and tablets.</li>
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 6 */}
          <section id="visual-contrast" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 6</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Visual Comfort</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              6. Visual Readability & Color Contrast
            </h2>
            <p>
              We avoid conveying critical diagnostic or clinical information through color alone. Error messages include both icon indicators and unambiguous textual alerts. Text maintains a contrast ratio exceeding <strong>4.5:1</strong> for normal body text and <strong>3:1</strong> for large headlines.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 7 */}
          <section id="telehealth-access" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 7</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Consultation Features</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              7. Teleconsultation Accommodations
            </h2>
            <p>
              For patients with hearing or speech challenges, our virtual consultation rooms feature integrated real-time text chat, document-sharing windows, and pre-consultation symptom questionnaires so patients can communicate clinical concerns with maximum clarity.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 8 */}
          <section id="audit-testing" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 8</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Engineering Pipeline</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              8. Ongoing Testing & Automated Audits
            </h2>
            <p>
              Accessibility is continuously verified in our CI/CD development pipeline utilizing Google Lighthouse audits, axe-core automated linting, and scheduled manual accessibility walkthroughs with real patients.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 9 */}
          <section id="known-limitations" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 9</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Transparency</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              9. Known Areas for Continuous Improvement
            </h2>
            <p>
              While we strive for comprehensive compliance, legacy clinical scan documents (such as historical handwritten doctor prescriptions uploaded as low-resolution photos) may not be fully readable by OCR screen readers. We are rolling out AI-assisted clinical transcription to bridge this gap.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 10 */}
          <section id="feedback-officer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 10</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Get in Touch</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              10. Accessibility Coordinator & Feedback
            </h2>
            <p>
              We welcome your suggestions, feedback, or reports of any accessibility obstacles you may encounter:
            </p>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '16px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px', marginBottom: '6px' }}>
                Office of Digital Accessibility & Inclusion
              </div>
              <div style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.7 }}>
                <strong>Lead Coordinator:</strong> Meenakshi Sundaram<br />
                <strong>Direct Email:</strong> accessibility@aarogyalocker.in<br />
                <strong>Toll-Free Accessibility Desk:</strong> 1800-890-4433 (Ext. 4)<br />
                <strong>Response Guarantee:</strong> Inquiries acknowledged within 2 business days
              </div>
            </div>
          </section>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '13.5px', fontWeight: 700 }}>
              <CheckCircleIcon size={20} />
              <span>Conforming to WCAG 2.1 Level AA</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                🖨️ Print Guide
              </button>
              <Link
                to="/"
                style={{
                  background: '#0284c7',
                  color: 'white',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '13px',
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)'
                }}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
