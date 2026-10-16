/**
 * SignInModal.tsx — Sign-in and registration modal with quick persona selection.
 */
import { useState, useEffect, useRef } from 'react';
import { CloseIcon, AlertCircleIcon, CheckCircleIcon } from '../Icons';
import { useApp, DEMO_USERS } from '../context/AppContext';
import type { UserRole, User } from '../types';

interface SignInModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

type Mode = 'signin' | 'signup' | 'success';

export default function SignInModal({ onClose, onLoginSuccess }: SignInModalProps) {
  const { loginAs, users, theme } = useApp();
  const isDark = theme === 'dark';
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [abhaId, setAbhaId] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleQuickLogin = (demoUser: User) => {
    loginAs(demoUser);
    onLoginSuccess();
  };

  const validate = (): boolean => {
    const newErrors: string[] = [];
    if (mode === 'signup' && !name.trim()) newErrors.push('Please enter your full name.');
    if (!email.trim() || !email.includes('@')) newErrors.push('Please enter a valid email address.');
    if (!password.trim() || password.length < 6) newErrors.push('Password must be at least 6 characters.');
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (mode === 'signup') {
        const newUser: User = {
          id: `usr-${Date.now().toString().slice(-4)}`,
          name,
          email,
          role,
          abhaId: abhaId.trim() || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
          avatar: name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        };
        loginAs(newUser);
      } else {
        const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
          loginAs(existing);
        } else {
          loginAs({
            id: `usr-${Date.now().toString().slice(-4)}`,
            name: email.split('@')[0],
            email,
            role: 'patient',
            abhaId: `91-4521-8932-${Math.floor(1000 + Math.random() * 9000)}`,
            avatar: email.slice(0, 2).toUpperCase()
          });
        }
      }
      setMode('success');
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-title"
    >
      <div className="modal" ref={modalRef} style={{ maxWidth: '540px' }}>
        {/* Header */}
        <div className="modal-header">
          <h2 id="signin-title">
            {mode === 'signin' ? 'Sign In to AarogyaLocker' : mode === 'signup' ? 'Create Your Account' : 'Welcome!'}
          </h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {mode === 'success' ? (
            <div className="booking-success" style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
              <div className="booking-success-icon" style={{ margin: '0 auto var(--space-4)' }}>
                <CheckCircleIcon size={32} />
              </div>
              <h3>Authentication Successful!</h3>
              <p>Your session is active. All health records, appointments, and prescriptions are now loaded.</p>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={onLoginSuccess}
                style={{ marginTop: 'var(--space-6)', width: '100%' }}
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              {/* Quick Persona Selector */}
              <div style={{ marginBottom: 'var(--space-5)', padding: '12px', background: 'var(--color-ice-blue)', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-deep-blue)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ⚡ Quick Demo Login (One-Click)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {DEMO_USERS.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickLogin(u)}
                      style={{
                        padding: '8px 10px',
                        background: isDark ? '#1e293b' : 'white',
                        border: isDark ? '1px solid #334155' : '1px solid var(--color-gray-200)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'transform 0.1s, border-color 0.1s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-cyan)'}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = isDark ? '#334155' : 'var(--color-gray-200)'}
                    >
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: u.role === 'doctor' ? '#10b981' : u.role === 'staff' ? '#f59e0b' : u.role === 'admin' ? '#8b5cf6' : 'var(--color-cyan)',
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', fontWeight: 'bold'
                      }}>
                        {u.avatar}
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: isDark ? '#93c5fd' : 'var(--color-deep-blue)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {u.name}
                        </div>
                        <div style={{ fontSize: '10px', color: isDark ? '#94a3b8' : 'var(--color-slate)', textTransform: 'capitalize' }}>
                          {u.role}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '16px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-gray-200)' }} />
                <span style={{ fontSize: '12px', color: 'var(--color-slate)' }}>or sign in with credentials</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-gray-200)' }} />
              </div>

              <form onSubmit={handleSubmit}>
                {errors.length > 0 && (
                  <div className="message message-error" role="alert" style={{ marginBottom: 'var(--space-4)' }}>
                    <AlertCircleIcon size={18} />
                    <div>
                      {errors.map((err, i) => (
                        <p key={i}>{err}</p>
                      ))}
                    </div>
                  </div>
                )}

                {mode === 'signup' && (
                  <>
                    <div className="booking-form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        className="input-field"
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="booking-form-group">
                      <label htmlFor="role">Role</label>
                      <select
                        id="role"
                        className="input-field"
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                      >
                        <option value="patient">Patient (Personal Health Locker)</option>
                        <option value="doctor">Doctor (Provider Portal)</option>
                        <option value="staff">Hospital Staff (Helpdesk)</option>
                        <option value="admin">System Administrator</option>
                      </select>
                    </div>

                    <div className="booking-form-group">
                      <label htmlFor="abha">ABHA Health ID (Optional)</label>
                      <input
                        id="abha"
                        type="text"
                        className="input-field"
                        placeholder="e.g. 91-4521-8932-1104"
                        value={abhaId}
                        onChange={(e) => setAbhaId(e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="booking-form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className="input-field"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="booking-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="input-field"
                    placeholder="Enter your password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
                  {mode === 'signin' ? 'Sign In' : 'Create Account & Access Locker'}
                </button>
              </form>

              <div style={{ marginTop: 'var(--space-4)', textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
                {mode === 'signin' ? (
                  <p>
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => { setMode('signup'); setErrors([]); }}
                      style={{ color: 'var(--color-deep-blue)', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Sign up with ABHA
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => { setMode('signin'); setErrors([]); }}
                      style={{ color: 'var(--color-deep-blue)', fontWeight: 600, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

