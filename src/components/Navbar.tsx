/**
 * Navbar.tsx — Sticky navigation bar with responsive mobile menu & user role switcher.
 */
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CareConnectLogo, MenuIcon, CloseIcon } from '../Icons';
import { navLinks } from '../data';
import { useApp } from '../context/AppContext';
import type { UserRole } from '../types';

interface NavbarProps {
  onSignIn: () => void;
  isLoggedIn?: boolean;
}

export default function Navbar({ onSignIn }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { currentUser, isLoggedIn, logout, switchRole } = useApp();

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDashboardPath = (role?: UserRole) => {
    switch (role) {
      case 'doctor': return '/doctor-dashboard';
      case 'staff': return '/staff-dashboard';
      case 'admin': return '/admin';
      default: return '/dashboard';
    }
  };

  const getRoleBadgeColor = (role?: UserRole) => {
    switch (role) {
      case 'doctor': return '#10b981';
      case 'staff': return '#f59e0b';
      case 'admin': return '#8b5cf6';
      default: return 'var(--color-cyan)';
    }
  };

  return (
    <nav className="navbar" id="home" role="navigation" aria-label="Main navigation">
      <div className="container navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand" aria-label="CareConnect — Home">
          <CareConnectLogo />
          <span>CareConnect</span>
        </Link>

        {/* Desktop links */}
        <div className="navbar-links" role="menubar">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} role="menuitem">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="navbar-actions" ref={dropdownRef} style={{ position: 'relative' }}>
          {isLoggedIn && currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'var(--color-ice-blue)',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: '30px',
                  padding: '4px 14px 4px 6px',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s',
                  color: 'inherit'
                }}
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
              >
                <div 
                  className="doctor-avatar" 
                  style={{ 
                    width: '34px', 
                    height: '34px', 
                    fontSize: '13px', 
                    background: getRoleBadgeColor(currentUser.role), 
                    color: 'white',
                    fontWeight: 700
                  }} 
                >
                  {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--color-gray-900)' }}>
                    {currentUser.name}
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: getRoleBadgeColor(currentUser.role), 
                    fontWeight: 700, 
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px' 
                  }}>
                    {currentUser.role}
                  </div>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--color-slate)', marginLeft: '2px' }}>▼</span>
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '260px',
                  background: 'white',
                  borderRadius: '14px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                  border: '1px solid var(--color-gray-200)',
                  padding: '12px',
                  zIndex: 1000
                }}>
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--color-gray-200)', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-deep-blue)' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-slate)' }}>{currentUser.email}</div>
                    {currentUser.abhaId && (
                      <div style={{ fontSize: '11px', color: 'var(--color-cyan)', marginTop: '4px', fontWeight: 600 }}>
                        ABHA: {currentUser.abhaId}
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-slate)', padding: '4px 10px', textTransform: 'uppercase' }}>
                    Navigation
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate(getDashboardPath(currentUser.role));
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: 'var(--color-deep-blue)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>📊</span> Go to My Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      navigate('/health-records');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: 'var(--color-deep-blue)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>🔐</span> Digital Health Locker
                  </button>

                  <div style={{ margin: '8px 0', borderTop: '1px solid var(--color-gray-200)' }} />

                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-slate)', padding: '4px 10px', textTransform: 'uppercase' }}>
                    Switch Demo Persona
                  </div>
                  {(['patient', 'doctor', 'staff', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setUserDropdownOpen(false);
                        navigate(getDashboardPath(r));
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '6px 10px',
                        background: currentUser.role === r ? 'var(--color-ice-blue)' : 'none',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        color: currentUser.role === r ? 'var(--color-deep-blue)' : 'var(--color-slate)',
                        fontWeight: currentUser.role === r ? 700 : 500,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ textTransform: 'capitalize' }}>
                        {r === 'patient' && '👤 Patient (Rahul)'}
                        {r === 'doctor' && '🩺 Doctor (Dr. Priya)'}
                        {r === 'staff' && '📋 Staff (Anita)'}
                        {r === 'admin' && '⚙️ Admin (Vikram)'}
                      </span>
                      {currentUser.role === r && <span style={{ color: 'var(--color-cyan)' }}>✓</span>}
                    </button>
                  ))}

                  <div style={{ margin: '8px 0', borderTop: '1px solid var(--color-gray-200)' }} />

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      navigate('/');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#ef4444',
                      fontWeight: 600
                    }}
                  >
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-secondary" type="button" onClick={onSignIn} aria-label="Sign in to your account">
              Sign In
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar-mobile-toggle"
          type="button"
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`} role="menu">
        {navLinks.map((link) => (
          <Link key={link.label} to={link.href} role="menuitem" onClick={closeMobile}>
            {link.label}
          </Link>
        ))}
        <div className="mobile-actions">
          {isLoggedIn && currentUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to={getDashboardPath(currentUser.role)} onClick={closeMobile} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div 
                    className="doctor-avatar" 
                    style={{ width: '32px', height: '32px', fontSize: 'var(--font-size-xs)', background: getRoleBadgeColor(currentUser.role), color: 'white' }}
                  >
                    {currentUser.avatar || currentUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{currentUser.name}</div>
                    <div style={{ fontSize: '11px', color: getRoleBadgeColor(currentUser.role), textTransform: 'uppercase' }}>{currentUser.role}</div>
                  </div>
                </div>
              </Link>
              <button className="btn btn-secondary" onClick={() => { logout(); closeMobile(); }}>
                Sign Out
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" type="button" onClick={() => { closeMobile(); onSignIn(); }}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

