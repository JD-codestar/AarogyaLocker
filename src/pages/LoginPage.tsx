/**
 * LoginPage.tsx — Professional login / registration page.
 *
 * Split layout:
 *   Left  — Brand panel with gradient, trust indicators, feature highlights
 *   Right — Clean sign-in / sign-up form with role selection
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CareConnectLogo, AlertCircleIcon } from '../Icons';
import { useApp } from '../context/AppContext';
import type { UserRole, User } from '../types';

type AuthMode = 'signin' | 'signup';

const ROLES: { value: UserRole; label: string; icon: string }[] = [
  { value: 'patient', label: 'Patient', icon: '🧑' },
  { value: 'doctor', label: 'Doctor', icon: '🩺' },
  { value: 'staff', label: 'Staff', icon: '🏥' },
  { value: 'admin', label: 'Admin', icon: '⚙️' },
];

function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'doctor': return '/doctor-dashboard';
    case 'staff': return '/staff-dashboard';
    case 'admin': return '/admin';
    default: return '/dashboard';
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginAs, users, isLoggedIn, currentUser } = useApp();

  const [mode, setMode] = useState<AuthMode>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [abhaId, setAbhaId] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [staffId, setStaffId] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      navigate(getDashboardPath(currentUser.role), { replace: true });
    }
  }, [isLoggedIn, currentUser, navigate]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setAbhaId('');
    setSpecialty('');
    setStaffId('');
    setErrors([]);
  };

  const validate = (): boolean => {
    const errs: string[] = [];
    if (mode === 'signup') {
      if (!fullName.trim()) errs.push('Full name is required.');
      if (selectedRole === 'doctor' && !specialty.trim()) errs.push('Medical specialty is required.');
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.push('Enter a valid email address.');
    }
    if (!password || password.length < 6) errs.push('Password must be at least 6 characters.');
    setErrors(errs);
    return errs.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate a brief auth delay for realism
    setTimeout(() => {
      if (mode === 'signup') {
        const newUser: User = {
          id: `usr-${Date.now().toString().slice(-6)}`,
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          role: selectedRole,
          phone: phone.trim() || undefined,
          abhaId: abhaId.trim() || undefined,
          specialty: selectedRole === 'doctor' ? specialty : undefined,
          avatar: fullName.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        };
        loginAs(newUser);
        navigate(getDashboardPath(selectedRole));
      } else {
        // Sign in — match by email or create
        const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
        if (existing) {
          loginAs(existing);
          navigate(getDashboardPath(existing.role));
        } else {
          // Create an account on the fly for demo convenience
          const user: User = {
            id: `usr-${Date.now().toString().slice(-6)}`,
            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            email: email.trim().toLowerCase(),
            role: selectedRole,
            avatar: email.slice(0, 2).toUpperCase(),
          };
          loginAs(user);
          navigate(getDashboardPath(selectedRole));
        }
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="lp-wrapper">
      <style>{`
        /* ===== LOGIN PAGE STYLES ===== */
        .lp-wrapper {
          display: flex;
          min-height: 100vh;
          font-family: var(--font-family);
          background: #f8fafc;
        }

        /* --- LEFT BRAND PANEL --- */
        .lp-brand {
          flex: 0 0 44%;
          background: linear-gradient(160deg, #0f1b3d 0%, #1a2766 40%, #28328C 75%, #2d6fa5 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 56px;
          position: relative;
          overflow: hidden;
          color: white;
        }
        .lp-brand::before {
          content: '';
          position: absolute;
          top: -80px; right: -120px;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(36,182,210,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .lp-brand::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -80px;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .lp-brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }
        .lp-brand-logo svg {
          width: 36px;
          height: 36px;
        }
        .lp-brand-logo span {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.3px;
        }
        .lp-brand h1 {
          font-size: 36px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }
        .lp-brand h1 span {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #24B6D2, #7dd3fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lp-brand-sub {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,0.6);
          margin-bottom: 48px;
          max-width: 400px;
          position: relative;
          z-index: 1;
        }
        .lp-features {
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
          z-index: 1;
        }
        .lp-feature {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .lp-feature-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .lp-feature-text {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
        }
        .lp-trust {
          margin-top: 56px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          gap: 32px;
          position: relative;
          z-index: 1;
        }
        .lp-trust-item {
          text-align: center;
        }
        .lp-trust-num {
          font-size: 22px;
          font-weight: 800;
          color: #24B6D2;
        }
        .lp-trust-label {
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-top: 2px;
        }

        /* --- RIGHT FORM PANEL --- */
        .lp-form-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
        }
        .lp-form-container {
          width: 100%;
          max-width: 420px;
        }
        .lp-form-title {
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.4px;
          margin-bottom: 4px;
        }
        .lp-form-subtitle {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 28px;
        }

        /* Role pills */
        .lp-roles {
          display: flex;
          background: #f1f5f9;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 24px;
          gap: 0;
        }
        .lp-role-pill {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 10px 4px;
          border: none;
          border-radius: 10px;
          background: transparent;
          cursor: pointer;
          font-family: var(--font-family);
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          transition: all 0.25s cubic-bezier(.4,0,.2,1);
          white-space: nowrap;
        }
        .lp-role-pill:hover {
          color: #334155;
          background: rgba(255,255,255,0.5);
        }
        .lp-role-pill.active {
          background: white;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
        }
        .lp-role-emoji {
          font-size: 15px;
        }

        /* Form fields */
        .lp-field {
          margin-bottom: 16px;
        }
        .lp-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 6px;
        }
        .lp-label-opt {
          font-weight: 400;
          color: #94a3b8;
          font-size: 12px;
        }
        .lp-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          font-family: var(--font-family);
          background: white;
          color: #0f172a;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          box-sizing: border-box;
        }
        .lp-input:focus {
          border-color: #28328C;
          box-shadow: 0 0 0 3px rgba(40,50,140,0.08);
        }
        .lp-input::placeholder {
          color: #94a3b8;
        }
        .lp-input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* Submit */
        .lp-submit {
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          font-family: var(--font-family);
          cursor: pointer;
          transition: all 0.2s;
          color: white;
          background: #28328C;
          margin-top: 4px;
          letter-spacing: 0.2px;
          position: relative;
          overflow: hidden;
        }
        .lp-submit:hover:not(:disabled) {
          background: #1e2670;
          box-shadow: 0 4px 14px rgba(40,50,140,0.25);
          transform: translateY(-1px);
        }
        .lp-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .lp-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Errors */
        .lp-errors {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          padding: 12px 14px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          margin-bottom: 16px;
        }
        .lp-errors svg {
          flex-shrink: 0;
          margin-top: 1px;
          color: #dc2626;
        }
        .lp-errors p {
          font-size: 13px;
          color: #991b1b;
          margin: 1px 0;
        }

        /* Toggle */
        .lp-toggle {
          text-align: center;
          font-size: 13px;
          color: #64748b;
          margin-top: 20px;
        }
        .lp-toggle-link {
          color: #28328C;
          font-weight: 700;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-family);
          font-size: 13px;
          transition: color 0.15s;
        }
        .lp-toggle-link:hover {
          color: #24B6D2;
          text-decoration: underline;
        }

        /* Divider */
        .lp-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .lp-divider-line {
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }
        .lp-divider-text {
          font-size: 12px;
          color: #94a3b8;
          white-space: nowrap;
        }

        /* Home link */
        .lp-home-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #94a3b8;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-family);
          margin-top: 24px;
          transition: color 0.15s;
        }
        .lp-home-link:hover {
          color: #64748b;
        }

        /* Spinner */
        @keyframes lp-spin {
          to { transform: rotate(360deg); }
        }
        .lp-spinner {
          display: inline-block;
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: lp-spin 0.6s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .lp-brand {
            display: none;
          }
          .lp-form-panel {
            padding: 40px 24px;
          }
        }
        @media (max-width: 480px) {
          .lp-roles {
            flex-wrap: wrap;
          }
          .lp-role-pill {
            flex: 1 1 45%;
          }
          .lp-input-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ====== LEFT BRAND PANEL ====== */}
      <div className="lp-brand">
        <div className="lp-brand-logo">
          <CareConnectLogo />
          <span>AarogyaLocker</span>
        </div>

        <h1>
          Your Health,<br />
          <span>Secured Digitally.</span>
        </h1>

        <p className="lp-brand-sub">
          India's unified digital health platform — store records, consult doctors,
          manage prescriptions, and access AI-powered health insights. Built on the
          ABHA ecosystem.
        </p>

        <div className="lp-features">
          <div className="lp-feature">
            <div className="lp-feature-icon">🔐</div>
            <span className="lp-feature-text">End-to-end encrypted health records</span>
          </div>
          <div className="lp-feature">
            <div className="lp-feature-icon">📱</div>
            <span className="lp-feature-text">ABHA-linked digital health locker</span>
          </div>
          <div className="lp-feature">
            <div className="lp-feature-icon">🤖</div>
            <span className="lp-feature-text">AI-powered symptom triage & insights</span>
          </div>
          <div className="lp-feature">
            <div className="lp-feature-icon">🏥</div>
            <span className="lp-feature-text">Multi-role access for complete care teams</span>
          </div>
        </div>

        <div className="lp-trust">
          <div className="lp-trust-item">
            <div className="lp-trust-num">50K+</div>
            <div className="lp-trust-label">Users</div>
          </div>
          <div className="lp-trust-item">
            <div className="lp-trust-num">200+</div>
            <div className="lp-trust-label">Hospitals</div>
          </div>
          <div className="lp-trust-item">
            <div className="lp-trust-num">1M+</div>
            <div className="lp-trust-label">Records Stored</div>
          </div>
          <div className="lp-trust-item">
            <div className="lp-trust-num">99.9%</div>
            <div className="lp-trust-label">Uptime</div>
          </div>
        </div>
      </div>

      {/* ====== RIGHT FORM PANEL ====== */}
      <div className="lp-form-panel">
        <div className="lp-form-container">
          <h2 className="lp-form-title">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="lp-form-subtitle">
            {mode === 'signin'
              ? 'Sign in to access your health dashboard.'
              : 'Join AarogyaLocker — it takes less than a minute.'}
          </p>

          {/* Role selector */}
          <div className="lp-roles" role="radiogroup" aria-label="Select your role">
            {ROLES.map(r => (
              <button
                key={r.value}
                type="button"
                className={`lp-role-pill${selectedRole === r.value ? ' active' : ''}`}
                onClick={() => setSelectedRole(r.value)}
                role="radio"
                aria-checked={selectedRole === r.value}
              >
                <span className="lp-role-emoji">{r.icon}</span>
                {r.label}
              </button>
            ))}
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="lp-errors" role="alert">
              <AlertCircleIcon size={18} />
              <div>
                {errors.map((err, i) => <p key={i}>{err}</p>)}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Sign-up only fields */}
            {mode === 'signup' && (
              <>
                <div className="lp-field">
                  <label className="lp-label" htmlFor="lp-name">Full Name</label>
                  <input
                    id="lp-name"
                    className="lp-input"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    autoComplete="name"
                  />
                </div>

                <div className="lp-field">
                  <label className="lp-label" htmlFor="lp-phone">
                    Phone Number <span className="lp-label-opt">(Optional)</span>
                  </label>
                  <input
                    id="lp-phone"
                    className="lp-input"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>

                {selectedRole === 'patient' && (
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="lp-abha">
                      ABHA Health ID <span className="lp-label-opt">(Optional)</span>
                    </label>
                    <input
                      id="lp-abha"
                      className="lp-input"
                      type="text"
                      placeholder="e.g. 91-4521-8932-1104"
                      value={abhaId}
                      onChange={e => setAbhaId(e.target.value)}
                    />
                  </div>
                )}

                {selectedRole === 'doctor' && (
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="lp-specialty">Medical Specialty</label>
                    <select
                      id="lp-specialty"
                      className="lp-input"
                      value={specialty}
                      onChange={e => setSpecialty(e.target.value)}
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="">Select your specialty…</option>
                      <option value="General Physician">General Physician</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Orthopedic">Orthopedic Surgeon</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Psychiatrist">Psychiatrist</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Ophthalmologist">Ophthalmologist</option>
                      <option value="ENT Specialist">ENT Specialist</option>
                      <option value="Pulmonologist">Pulmonologist</option>
                      <option value="Oncologist">Oncologist</option>
                    </select>
                  </div>
                )}

                {selectedRole === 'staff' && (
                  <div className="lp-field">
                    <label className="lp-label" htmlFor="lp-staffid">
                      Staff / Employee ID <span className="lp-label-opt">(Optional)</span>
                    </label>
                    <input
                      id="lp-staffid"
                      className="lp-input"
                      type="text"
                      placeholder="e.g. STF-20261012"
                      value={staffId}
                      onChange={e => setStaffId(e.target.value)}
                    />
                  </div>
                )}

                <div className="lp-divider">
                  <div className="lp-divider-line" />
                  <span className="lp-divider-text">Login credentials</span>
                  <div className="lp-divider-line" />
                </div>
              </>
            )}

            <div className="lp-field">
              <label className="lp-label" htmlFor="lp-email">Email Address</label>
              <input
                id="lp-email"
                className="lp-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="lp-field">
              <label className="lp-label" htmlFor="lp-password">Password</label>
              <input
                id="lp-password"
                className="lp-input"
                type="password"
                placeholder={mode === 'signup' ? 'Create a password (min. 6 chars)' : 'Enter your password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
            </div>

            {mode === 'signin' && (
              <div style={{ textAlign: 'right', marginBottom: '4px', marginTop: '-8px' }}>
                <button
                  type="button"
                  className="lp-toggle-link"
                  style={{ fontSize: '12px' }}
                  onClick={() => {/* placeholder */}}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="lp-submit"
              disabled={loading}
            >
              {loading && <span className="lp-spinner" />}
              {loading
                ? 'Please wait…'
                : mode === 'signin'
                  ? 'Sign In'
                  : 'Create Account'
              }
            </button>
          </form>

          <div className="lp-toggle">
            {mode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="lp-toggle-link"
                  onClick={() => { setMode('signup'); resetForm(); }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="lp-toggle-link"
                  onClick={() => { setMode('signin'); resetForm(); }}
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="lp-home-link" onClick={() => navigate('/')}>
              ← Back to homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
