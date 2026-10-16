/**
 * PrivacyPolicy.tsx — Dedicated, comprehensive Privacy Policy and Patient Data Charter
 * for AarogyaLocker in compliance with ABDM (Ayushman Bharat Digital Mission) and
 * the Digital Personal Data Protection (DPDP) Act, 2023.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldIcon, 
  CheckCircleIcon, 
  AlertCircleIcon, 
  ClockIcon 
} from '../Icons';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="privacy-page" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '80px', fontFamily: 'var(--font-family)' }}>
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
              <span style={{ color: 'white', fontWeight: 600 }}>Privacy Policy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#cbd5e1', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '20px' }}>
              <ClockIcon size={14} />
              <span>Last Revised: October 15, 2026</span>
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.12)', padding: '6px 14px', borderRadius: '30px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.4px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ShieldIcon size={16} />
            <span>DPDP ACT (2023) & ABDM CERTIFIED CHARTER</span>
          </div>

          <h1 style={{ fontSize: '38px', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.8px', lineHeight: 1.2 }}>
            AarogyaLocker Privacy Policy & Patient Data Charter
          </h1>

          <p style={{ fontSize: '16px', color: '#bfdbfe', maxWidth: '780px', margin: '0 0 28px', lineHeight: 1.6 }}>
            AarogyaLocker operates on a foundational principle: <strong>you own your health data</strong>. Learn how we safeguard your lifetime medical vault, ABHA credentials, e-prescriptions, and diagnostic records with zero-compromise cryptographic security.
          </p>

          {/* Key Metrics / Highlights Strip */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginTop: '28px'
            }}
          >
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>🔐</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>AES-256 Encryption</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Military-grade encryption for all stored clinical documents and scans.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>🚫</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Zero Data Monetization</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>We never sell, rent, or trade patient health information to third parties.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>👤</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>Consent-First Access</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Doctors and hospitals can only access records upon your active OTP consent.</span>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>🇮🇳</div>
              <strong style={{ fontSize: '14px', display: 'block', color: 'white' }}>100% Indian Data Centers</strong>
              <span style={{ fontSize: '12px', color: '#cbd5e1' }}>MeitY and ISO 27001 accredited domestic cloud infrastructure.</span>
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
        {/* POLICY DOCUMENT CONTENT */}
        <main 
          style={{
            background: 'var(--color-white)',
            borderRadius: '16px',
            padding: '40px 48px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid var(--color-gray-200)',
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'var(--color-dark-text)'
          }}
        >
          {/* Statutory Patient Notice */}
          <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '12px', padding: '14px 18px', marginBottom: '28px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div style={{ color: '#d97706', marginTop: '2px', flexShrink: 0 }}>
              <AlertCircleIcon size={20} />
            </div>
            <div style={{ fontSize: '13px', color: '#78350f', lineHeight: 1.5 }}>
              <strong>Statutory DPDP Notice:</strong> AarogyaLocker is an Ayushman Bharat Digital Mission (ABDM) accredited Health Information User (HIU) and Provider (HIP). Under Section 6 of the Digital Personal Data Protection Act 2023, you retain sovereign rights to view, revoke consent, or permanently delete your health records at any time.
            </div>
          </div>

          {/* Section 1 */}
          <section id="overview" style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 1</span>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Effective Date: October 15, 2026</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px' }}>
              1. Executive Summary & ABDM Scope
            </h2>
            <p>
              Welcome to <strong>AarogyaLocker</strong> ("Platform", "we", "our", or "us"). AarogyaLocker is a digital health repository and healthcare coordination infrastructure designed in strict alignment with the <strong>Ayushman Bharat Digital Mission (ABDM)</strong> administered by the National Health Authority (NHA), Government of India, and the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>.
            </p>
            <p>
              This Privacy Policy explains how AarogyaLocker collects, encrypts, securely processes, and transfers personal and health information when you access our web application, create an ABHA-linked health locker, book consultations with registered clinicians, or order prescribed medications.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 2 */}
          <section id="data-collected" style={{ marginBottom: '40px' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 2</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              2. Clinical & Personal Data We Collect
            </h2>
            <p>
              We collect information that is strictly necessary to maintain your health locker and connect you with certified medical providers:
            </p>

            <div style={{ overflowX: 'auto', margin: '20px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '12px', color: '#0f172a' }}>Data Classification</th>
                    <th style={{ padding: '12px', color: '#0f172a' }}>Specific Data Elements</th>
                    <th style={{ padding: '12px', color: '#0f172a' }}>Legal Basis & Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#1e3a8a' }}>Demographic Identity</td>
                    <td style={{ padding: '12px' }}>Full legal name, date of birth / age, biological gender, mobile number, and email.</td>
                    <td style={{ padding: '12px' }}>Patient profile identification & secure 2-Factor Authentication (OTP).</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#1e3a8a' }}>ABHA Credentials</td>
                    <td style={{ padding: '12px' }}>14-digit ABHA Number (`91-XXXX-XXXX-XXXX`) and ABDM PHR handle.</td>
                    <td style={{ padding: '12px' }}>Federated electronic health discovery across national hospitals.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#1e3a8a' }}>Clinical Health Records</td>
                    <td style={{ padding: '12px' }}>Complete Blood Count (CBC) panels, Lipid tests, digital e-prescriptions, radiology scans, and vaccination cards.</td>
                    <td style={{ padding: '12px' }}>Longitudinal medical history archival and clinical diagnosis review.</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#1e3a8a' }}>Appointment & Telehealth</td>
                    <td style={{ padding: '12px' }}>Consultation timings, doctor specialization, symptom complaints, and tele-visit chat logs.</td>
                    <td style={{ padding: '12px' }}>Fulfilling scheduled OPD queues and video tele-consultations.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#1e3a8a' }}>Pharmacy & Billing</td>
                    <td style={{ padding: '12px' }}>Ordered medications, delivery address, GST invoices, and payment confirmation IDs.</td>
                    <td style={{ padding: '12px' }}>Doorstep medicine delivery & statutory tax compliance under Indian law.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 3 */}
          <section id="data-usage" style={{ marginBottom: '40px' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 3</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              3. Permitted Uses of Your Medical Records
            </h2>
            <p>
              Your health data is used solely for designated, patient-centric purposes:
            </p>
            <ul style={{ paddingLeft: '24px' }}>
              <li><strong>Continuous Health History:</strong> Organizing your laboratory reports, diagnostic imaging, and physician notes in a unified, chronological health locker.</li>
              <li><strong>Clinical Tele-Consultation:</strong> Permitting licensed doctors to review prior medical histories during video calls to make accurate clinical diagnoses.</li>
              <li><strong>Order Fulfillment:</strong> Validating registered medical prescriptions before dispensing Schedule H medications via licensed digital dispensaries.</li>
              <li><strong>Emergency Access:</strong> Making vital records (blood group, chronic ailments, emergency contacts) available upon explicit patient authorization during acute care visits.</li>
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 4 */}
          <section id="consent-architecture" style={{ marginBottom: '40px' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 4</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              4. ABDM Electronic Consent Architecture
            </h2>
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <CheckCircleIcon size={20} />
                <strong style={{ color: '#065f46', fontSize: '15px' }}>Granular Consent Artifacts</strong>
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#047857' }}>
                Under the National Health Authority guidelines, clinical data is shared using digitally signed consent artifacts. Every consent request explicitly specifies: (a) which hospital is requesting data, (b) which specific test reports are being requested, and (c) the exact expiry time of access.
              </p>
            </div>
            <p>
              You maintain 100% control over these permissions. You can view all active consent requests in your dashboard and revoke access with a single click at any time.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 5 */}
          <section id="encryption-security" style={{ marginBottom: '40px' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 5</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              5. Cryptographic Storage & AES-256 Security
            </h2>
            <p>
              We implement defense-in-depth security standards matching international healthcare protocols (HIPAA & ISO 27001):
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', margin: '16px 0' }}>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', fontSize: '14px' }}>🔒 At-Rest Encryption</strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>All database entries, diagnostic images, and PDF summaries are encrypted with AES-256 cryptographic keys.</span>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', fontSize: '14px' }}>🌐 In-Transit TLS 1.3</strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Every connection is encrypted using TLS 1.3 with Perfect Forward Secrecy (PFS) to prevent interception.</span>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', display: 'block', fontSize: '14px' }}>🛡️ Zero-Knowledge Proofs</strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Platform administrators cannot read private patient records without authorized audit logging.</span>
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 6 */}
          <section id="third-parties" style={{ marginBottom: '40px' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 6</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              6. Zero Third-Party Data Monetization
            </h2>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <strong style={{ color: '#991b1b', fontSize: '14px' }}>Strict Non-Commercialization Guarantee:</strong>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#b91c1c' }}>
                AarogyaLocker does NOT sell, rent, monetize, or profile your medical records for targeted advertising, insurance underwriting, or algorithmic profiling.
              </p>
            </div>
            <p>
              Your data is never shared with commercial entities, drug manufacturers, or analytics brokers. Clinical records are shared exclusively with the healthcare providers you directly consult.
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 7 */}
          <section id="telemedicine-privacy" style={{ marginBottom: '40px' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 7</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              7. Telemedicine & Doctor-Patient Privilege
            </h2>
            <p>
              Tele-consultations conducted on AarogyaLocker adhere to the National Medical Commission's Telemedicine Practice Guidelines:
            </p>
            <ul style={{ paddingLeft: '24px' }}>
              <li><strong>Encrypted Video Streams:</strong> Peer-to-peer WebRTC video streams are end-to-end encrypted and are not recorded without mutual consent.</li>
              <li><strong>Privileged Consultation Chat:</strong> Messages and symptom photos exchanged during appointments are accessible solely by the treating doctor and the patient.</li>
              <li><strong>Digital Signatures:</strong> Prescriptions generated post-call are cryptographically signed with the doctor's registration number and timestamped.</li>
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 8 */}
          <section id="pharmacy-lab-data" style={{ marginBottom: '40px' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 8</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              8. Online Pharmacy & Diagnostic Test Privacy
            </h2>
            <p>
              When ordering medications or scheduling home sample phlebotomy:
            </p>
            <ul style={{ paddingLeft: '24px' }}>
              <li><strong>Delivery Verification:</strong> Delivery partners only receive delivery addresses and item package labels — they never see your clinical diagnosis or health records.</li>
              <li><strong>Diagnostic Lab Secrecy:</strong> Certified NABL laboratories upload reports directly to your locker through encrypted channels. Physical paper samples carry barcoded IDs without exposing complete patient identity.</li>
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 9 */}
          <section id="patient-rights" style={{ marginBottom: '40px' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 9</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              9. Your Rights under the DPDP Act 2023
            </h2>
            <p>
              As a Data Principal under India's Digital Personal Data Protection Act, you possess clear statutory rights:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', margin: '18px 0' }}>
              <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', fontSize: '14px', display: 'block' }}>1. Right to Access</strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Right to receive a complete summary of all personal health records stored in your locker.</span>
              </div>
              <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', fontSize: '14px', display: 'block' }}>2. Right to Correction</strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Right to correct inaccurate demographic details, phone numbers, or emergency contacts.</span>
              </div>
              <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', fontSize: '14px', display: 'block' }}>3. Right to Erasure</strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Right to purge self-uploaded health files or permanently delete your account.</span>
              </div>
              <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a', fontSize: '14px', display: 'block' }}>4. Right to Nominate</strong>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>Right to designate a legal guardian or family member to manage your health locker in case of incapacity.</span>
              </div>
            </div>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 10 */}
          <section id="data-retention" style={{ marginBottom: '40px' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 10</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              10. Data Retention, Export & Permanent Erasure
            </h2>
            <p>
              Your clinical documents are retained in your locker indefinitely so that your healthcare providers have access to your historical medical context throughout your life. However, upon account deletion request:
            </p>
            <ul style={{ paddingLeft: '24px' }}>
              <li>All self-uploaded files, consultation chat logs, and private profile information will be purged within 30 business days.</li>
              <li>You may download your entire clinical repository as an encrypted portable ZIP file prior to account closure.</li>
              <li>Hospital-issued tax invoices are retained for the statutory period required under Indian GST law.</li>
            </ul>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

          {/* Section 11 */}
          <section id="grievance-contact">
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800 }}>SECTION 11</span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: '8px 0 16px' }}>
              11. Grievance Officer & Official Inquiries
            </h2>
            <p>
              For privacy grievances, compliance concerns, or requests regarding data access/erasure, please contact our designated Grievance Redressal Officer:
            </p>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px', marginTop: '16px' }}>
              <strong style={{ fontSize: '15px', color: '#0f172a', display: 'block' }}>Dr. Anand Mehra, MD</strong>
              <span style={{ fontSize: '13px', color: '#64748b', display: 'block', marginBottom: '8px' }}>Chief Data Protection & Compliance Officer — AarogyaLocker Health Network</span>
              <p style={{ margin: '4px 0', fontSize: '13.5px' }}>
                <strong>Official Email:</strong> <a href="mailto:privacy@aarogyalocker.in" style={{ color: '#1e3a8a', fontWeight: 700 }}>privacy@aarogyalocker.in</a>
              </p>
              <p style={{ margin: '4px 0', fontSize: '13.5px' }}>
                <strong>Grievance Helpline:</strong> +91 172 274 7585 (Mon – Sat, 9:00 AM – 6:00 PM IST)
              </p>
              <p style={{ margin: '4px 0', fontSize: '13.5px' }}>
                <strong>Postal Address:</strong> Tricity Digital Health Hub, Sector 62, Phase 8, Mohali, Punjab - 160062, India
              </p>
            </div>
          </section>

          {/* Return & Navigation actions */}
          <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link to="/" style={{ color: '#1e3a8a', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
              ← Return to AarogyaLocker Home
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                🖨️ Print Policy
              </button>
              <Link to="/terms" style={{ color: '#64748b', fontSize: '13px', textDecoration: 'none' }}>Terms of Service</Link>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <Link to="/accessibility" style={{ color: '#64748b', fontSize: '13px', textDecoration: 'none' }}>Accessibility</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
