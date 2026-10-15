/**
 * TermsOfService.tsx — Comprehensive Terms of Service & Patient Service Agreement
 * for AarogyaLocker in accordance with National Medical Commission (NMC) Telemedicine
 * Practice Guidelines, the Indian IT Act 2000, and ABDM interoperability rules.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldIcon, 
  AlertCircleIcon, 
  ClockIcon, 
  CheckCircleIcon 
} from '../Icons';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="terms-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '80px', fontFamily: 'var(--font-family)' }}>
      {/* 1. HERO BANNER */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #091a3c 0%, #172554 45%, #1e3a8a 100%)',
          color: 'white',
          padding: '60px 20px 48px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb & Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#93c5fd' }}>
              <Link to="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'white', fontWeight: 600 }}>Terms of Service</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#cbd5e1', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '20px' }}>
              <ClockIcon size={14} />
              <span>Effective Date: October 15, 2026 • Version 3.4</span>
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.12)', padding: '6px 14px', borderRadius: '30px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.4px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ShieldIcon size={16} />
            <span>NMC TELEMEDICINE GUIDELINES & ABDM INTEROPERABILITY CHARTER</span>
          </div>

          <h1 style={{ fontSize: '38px', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.8px', lineHeight: 1.2 }}>
            AarogyaLocker Terms of Service & Patient Agreement
          </h1>

          <p style={{ fontSize: '16px', color: '#bfdbfe', maxWidth: '780px', margin: '0 0 28px', lineHeight: 1.6 }}>
            Please read these terms carefully before utilizing AarogyaLocker. This agreement outlines your legal rights, doctor-patient responsibilities, teleconsultation guidelines, electronic locker permissions, and our zero-hidden-fee refund guarantees.
          </p>

          {/* Key Terms Highlights Strip */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginTop: '28px'
            }}
          >
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>⚖️</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Patient Sovereignty</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>You retain 100% legal ownership of all clinical health records in your vault.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>🩺</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Verified Clinicians</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>100% of doctors are cross-verified with NMC & State Medical Councils.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>💳</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Guaranteed Refunds</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Unfulfilled or doctor-cancelled appointments refunded automatically in 24h.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>🚨</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Emergency Protocol</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Not for acute life-threatening trauma. Dial 112 / 108 for immediate emergency care.</span>
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
        {/* TERMS DOCUMENT CONTENT */}
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
          {/* Critical Emergency Notice Banner */}
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px 20px', marginBottom: '32px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ color: '#dc2626', marginTop: '2px', flexShrink: 0 }}>
              <AlertCircleIcon size={22} />
            </div>
            <div style={{ fontSize: '13.5px', color: '#991b1b', lineHeight: 1.5 }}>
              <strong>CRITICAL EMERGENCY NOTICE:</strong> AarogyaLocker is a digital healthcare coordination, health record vault, and elective teleconsultation platform. <strong>It is NOT intended for life-threatening acute emergencies</strong> (such as severe chest pain, major trauma, stroke symptoms, uncontrolled bleeding, or respiratory arrest). In an emergency, immediately call <strong>112</strong> or <strong>108</strong>, or proceed to the nearest emergency department.
            </div>
          </div>

          {/* Section 1 */}
          <section id="acceptance" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 1</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Legally Binding Contract</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              1. Acceptance & User Eligibility
            </h2>
            <p>
              By accessing, browsing, registering an account, linking your <strong>Ayushman Bharat Health Account (ABHA)</strong>, or booking services on AarogyaLocker ("the Platform"), you acknowledge that you have read, understood, and unequivocally agree to be bound by these Terms of Service.
            </p>
            <p>
              To use AarogyaLocker, you must be at least 18 years of age and legally competent to enter into a contract under the Indian Contract Act, 1872. Parents or legal guardians may create accounts and manage records on behalf of minor dependents.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 2 */}
          <section id="abha-locker" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 2</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>ABDM Health Locker</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              2. ABHA & Digital Health Locker Facility
            </h2>
            <p>
              AarogyaLocker functions as a certified <strong>Health Information User (HIU)</strong> and <strong>Health Information Provider (HIP)</strong> within the National Digital Health Ecosystem. 
            </p>
            <ul style={{ paddingLeft: '22px', margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Patient Ownership:</strong> All diagnostic records, prescriptions, discharge summaries, and vaccine certificates remain the exclusive property of the patient.</li>
              <li><strong>Consent Architecture:</strong> No hospital, doctor, insurer, or third party can view your locker records without your explicit, OTP-authorized consent.</li>
              <li><strong>Portability & Revocation:</strong> You may revoke active data-sharing consents at any time through your Patient Dashboard.</li>
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 3 */}
          <section id="telemedicine" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 3</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Clinical Care Standards</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              3. Teleconsultations & Medical Care Terms
            </h2>
            <p>
              All registered medical practitioners on AarogyaLocker are licensed by State Medical Councils or the National Medical Commission (NMC). Teleconsultations conducted through our encrypted video channels are subject to the <strong>Telemedicine Practice Guidelines (2020)</strong> issued by the Ministry of Health and Family Welfare (MoHFW).
            </p>
            <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', borderLeft: '4px solid #3b82f6', margin: '18px 0' }}>
              <strong>Clinical Discretion:</strong> The registered medical practitioner reserves absolute professional discretion to determine whether a virtual consultation is clinically sufficient for your condition. If in-person examination, physical palpation, or urgent hospitalization is required, the doctor will advise immediate referral.
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 4 */}
          <section id="prescriptions" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 4</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Pharmacy & Medication</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              4. E-Prescriptions & Pharmacy Dispatch
            </h2>
            <p>
              Digital prescriptions generated on AarogyaLocker bear the doctor's digital signature and official NMC Registration Number, constituting valid e-prescriptions under the Information Technology Act, 2000.
            </p>
            <p>
              <strong>Medication Restrictions:</strong> In accordance with Indian Law, our doctors will never prescribe Schedule X drugs (narcotics, psychotropics) via telemedicine. Pharmacy orders fulfilled through our platform are sourced exclusively from licensed retail pharmacies with batch verification and GST compliance.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 5 */}
          <section id="diagnostics" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 5</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Laboratory Testing</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              5. Diagnostic Lab Tests & Sample Collection
            </h2>
            <p>
              All pathology and radiology partners affiliated with AarogyaLocker (including Dr. Lal PathLabs, SRL Diagnostics, and hospital laboratories) hold active <strong>NABL (National Accreditation Board for Testing and Calibration Laboratories)</strong> accreditation.
            </p>
            <p>
              Phlebotomists performing home sample collection follow strict cold-chain maintenance protocols. Test reports are encrypted and automatically pushed directly to your AarogyaLocker within 6 to 24 hours of sample processing.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 6 */}
          <section id="billing-refunds" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 6</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Transparent Fees</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              6. Payments, Cancellations & Refund Policy
            </h2>
            <p>
              We pride ourselves on transparent, zero-surprise pricing. Consultation fees, test prices, and medicine costs are clearly displayed before booking.
            </p>

            {/* Refund Rules Table */}
            <div style={{ overflowX: 'auto', margin: '20px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                    <th style={{ padding: '12px 14px', color: '#1e293b' }}>Scenario</th>
                    <th style={{ padding: '12px 14px', color: '#1e293b' }}>Patient Action</th>
                    <th style={{ padding: '12px 14px', color: '#1e293b' }}>Refund Settlement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Doctor No-Show</td>
                    <td style={{ padding: '12px 14px' }}>Automatic detection</td>
                    <td style={{ padding: '12px 14px', color: '#16a34a', fontWeight: 700 }}>100% Refund within 24 hours</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Patient Cancellation &gt; 2h before</td>
                    <td style={{ padding: '12px 14px' }}>Self-cancel via dashboard</td>
                    <td style={{ padding: '12px 14px', color: '#16a34a', fontWeight: 700 }}>100% Instant Wallet Refund</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Patient Cancellation &lt; 2h before</td>
                    <td style={{ padding: '12px 14px' }}>Late cancellation</td>
                    <td style={{ padding: '12px 14px', color: '#ea580c', fontWeight: 600 }}>80% Refund (20% Doctor Slot Fee)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>Damaged Medicine Delivery</td>
                    <td style={{ padding: '12px 14px' }}>Report within 24 hours</td>
                    <td style={{ padding: '12px 14px', color: '#16a34a', fontWeight: 700 }}>Free Replacement or 100% Refund</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 7 */}
          <section id="user-obligations" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 7</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Platform Conduct</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              7. Patient Responsibilities & Acceptable Use
            </h2>
            <p>
              Users agree to provide accurate, truthful personal and clinical information. You agree not to:
            </p>
            <ul style={{ paddingLeft: '22px', margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Impersonate any other individual or forge medical records.</li>
              <li>Record audio or video during doctor consultations without explicit mutual consent.</li>
              <li>Harass, intimidate, or use abusive language toward healthcare workers or support personnel.</li>
              <li>Attempt to decompile, reverse-engineer, or circumvent cryptographic safeguards on the platform.</li>
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 8 */}
          <section id="ip-rights" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 8</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Proprietary Technology</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              8. Intellectual Property & Platform License
            </h2>
            <p>
              The AarogyaLocker name, software interfaces, AI triaging algorithms, logos, and UI designs are protected by copyright, trademark, and intellectual property laws of India. We grant you a revocable, non-exclusive, non-transferable personal license to utilize the platform for personal, non-commercial healthcare management.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 9 */}
          <section id="disclaimers" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 9</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Medical Disclaimers</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              9. Medical Disclaimers & Emergency Protocols
            </h2>
            <p>
              AarogyaLocker is a digital technology platform and does not directly practice medicine. Medical care, diagnoses, and prescriptions are provided independently by registered practitioners exercising independent clinical judgement.
            </p>
            <p>
              AI Health Assistant features provide educational information only and must never be treated as a definitive clinical diagnosis or substitute for an in-person consultation with a physician.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 10 */}
          <section id="limitation-liability" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 10</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Legal Protections</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              10. Limitation of Liability & Indemnity
            </h2>
            <p>
              To the maximum extent permitted by Indian Law, AarogyaLocker and its directors, employees, and affiliates shall not be liable for any indirect, punitive, or consequential damages resulting from user misinformation, third-party network outages, or failure to follow medical advice.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 11 */}
          <section id="dispute-resolution" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 11</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Indian Jurisdiction</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              11. Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any controversy, claim, or dispute arising out of this agreement shall be submitted to binding arbitration in <strong>Chandigarh, India</strong>, under the Arbitration and Conciliation Act, 1996. The competent courts in Chandigarh shall retain exclusive territorial jurisdiction.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 12 */}
          <section id="contact-support">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 12</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Official Channels</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              12. Legal Inquiries & Grievance Officer
            </h2>
            <p>
              In accordance with Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021:
            </p>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '16px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px', marginBottom: '6px' }}>
                Legal Grievance & Compliance Cell
              </div>
              <div style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.7 }}>
                <strong>Designated Officer:</strong> Adv. Sunita Ramanathan<br />
                <strong>Email:</strong> legal@aarogyalocker.in | grievance@aarogyalocker.in<br />
                <strong>Helpline:</strong> 1800-890-4433 (Mon–Sat, 9:00 AM – 6:00 PM IST)<br />
                <strong>Address:</strong> AarogyaLocker Health Technologies Ltd., Level 4, IT Park, Chandigarh 160101, India
              </div>
            </div>
          </section>

          <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '13.5px', fontWeight: 700 }}>
              <CheckCircleIcon size={20} />
              <span>Legally compliant with ABDM standards</span>
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
                🖨️ Print Agreement
              </button>
              <Link
                to="/"
                style={{
                  background: '#1e3a8a',
                  color: 'white',
                  padding: '10px 22px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '13px',
                  boxShadow: '0 2px 8px rgba(30, 58, 138, 0.25)'
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
