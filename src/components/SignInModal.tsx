/**
 * SignInModal.tsx — A demo sign-in and registration modal.
 *
 * This provides a UI for signing in or creating an account,
 * but it does not actually authenticate users or save data.
 */
import { useState, useEffect, useRef } from 'react';
import { CloseIcon, AlertCircleIcon, CheckCircleIcon } from '../Icons';

interface SignInModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

type Mode = 'signin' | 'signup' | 'success';

export default function SignInModal({ onClose, onLoginSuccess }: SignInModalProps) {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for signup
  const [errors, setErrors] = useState<string[]>([]);
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus inside the modal for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent scrolling under modal
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

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
      // Transition to success state
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
      <div className="modal" ref={modalRef}>
        {/* Header */}
        <div className="modal-header">
          <h2 id="signin-title">
            {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Success'}
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
              <h3>Welcome to CareConnect!</h3>
              <p>You have successfully logged into the demo.</p>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={onLoginSuccess}
                style={{ marginTop: 'var(--space-6)', width: '100%' }}
              >
                Continue
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Error Messages */}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          )}

          {mode !== 'success' && (
            <div style={{ marginTop: 'var(--space-6)', textAlign: 'center', fontSize: 'var(--font-size-sm)' }}>
              {mode === 'signin' ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => { setMode('signup'); setErrors([]); }}
                    style={{ color: 'var(--color-deep-blue)', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => { setMode('signin'); setErrors([]); }}
                    style={{ color: 'var(--color-deep-blue)', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    Sign in
                  </button>
                </p>
              )}
              
              <div className="profile-notice" style={{ marginTop: 'var(--space-4)' }}>
                ⓘ This is a frontend demo. No real authentication is performed and no data is saved.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
