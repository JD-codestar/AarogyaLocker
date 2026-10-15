/**
 * Navbar.tsx — Sticky navigation bar with responsive mobile menu & user role switcher.
 */
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AarogyaLockerLogo, MenuIcon, CloseIcon, SunIcon, MoonIcon } from '../Icons';
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
  const location = useLocation();

  const { currentUser, isLoggedIn, logout, switchRole, theme, toggleTheme } = useApp();

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
        <Link to="/" className="navbar-brand" aria-label="AarogyaLocker — Home">
          <AarogyaLockerLogo />
          <span>AarogyaLocker</span>
        </Link>

        {/* Desktop links */}
        <div className="navbar-links" role="menubar">
          {navLinks.map((link) => {
            const isActive = link.href === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(link.href);

            return (
              <Link 
                key={link.label} 
                to={link.href} 
                role="menuitem"
                style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive 
                    ? (theme === 'dark' ? '#60a5fa' : '#1e3a8a') 
                    : (theme === 'dark' ? '#cbd5e1' : 'var(--color-dark-text)'),
                  background: isActive 
                    ? (theme === 'dark' ? 'rgba(96, 165, 250, 0.15)' : 'rgba(30, 58, 138, 0.08)') 
                    : 'transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="navbar-actions" ref={dropdownRef} style={{ position: 'relative' }}>
          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <SunIcon size={19} color="#fbbf24" />
            ) : (
              <MoonIcon size={19} color="#1e3a8a" />
            )}
          </button>

          {isLoggedIn && currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: theme === 'dark' ? '#1e293b' : 'var(--color-ice-blue)',
                  border: `1px solid ${theme === 'dark' ? '#334155' : 'var(--color-gray-200)'}`,
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
                  <div style={{ fontWeight: 600, fontSize: '13px', color: theme === 'dark' ? '#f1f5f9' : 'var(--color-dark-text)' }}>
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
                <span style={{ fontSize: '10px', color: theme === 'dark' ? '#94a3b8' : 'var(--color-slate)', marginLeft: '2px' }}>▼</span>
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '260px',
                  background: theme === 'dark' ? '#1e293b' : 'white',
                  borderRadius: '14px',
                  boxShadow: theme === 'dark' ? '0 12px 30px rgba(0,0,0,0.5)' : '0 12px 30px rgba(0,0,0,0.12)',
                  border: `1px solid ${theme === 'dark' ? '#334155' : 'var(--color-gray-200)'}`,
                  padding: '12px',
                  zIndex: 1000
                }}>
                  <div style={{ padding: '8px 10px', borderBottom: `1px solid ${theme === 'dark' ? '#334155' : 'var(--color-gray-200)'}`, marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: theme === 'dark' ? '#60a5fa' : 'var(--color-deep-blue)' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '12px', color: theme === 'dark' ? '#94a3b8' : 'var(--color-slate)' }}>{currentUser.email}</div>
                    {currentUser.abhaId && (
                      <div style={{ fontSize: '11px', color: 'var(--color-cyan)', marginTop: '4px', fontWeight: 600 }}>
                        ABHA: {currentUser.abhaId}
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: '11px', fontWeight: 700, color: theme === 'dark' ? '#94a3b8' : 'var(--color-slate)', padding: '4px 10px', textTransform: 'uppercase' }}>
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
                      color: theme === 'dark' ? '#f1f5f9' : 'var(--color-deep-blue)',
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
                      color: theme === 'dark' ? '#f1f5f9' : 'var(--color-deep-blue)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🔐</span> Digital Health Locker
                    </span>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      background: '#10b981',
                      color: '#ffffff',
                      padding: '2px 6px',
                      borderRadius: '10px'
                    }}>
                      ABDM
                    </span>
                  </button>

                  <div style={{ margin: '8px 0', borderTop: `1px solid ${theme === 'dark' ? '#334155' : 'var(--color-gray-200)'}` }} />

                  <div style={{ fontSize: '11px', fontWeight: 700, color: theme === 'dark' ? '#94a3b8' : 'var(--color-slate)', padding: '4px 10px', textTransform: 'uppercase' }}>
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
                        background: currentUser.role === r 
                          ? (theme === 'dark' ? '#334155' : 'var(--color-ice-blue)') 
                          : 'none',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        color: currentUser.role === r 
                          ? (theme === 'dark' ? '#f8fafc' : 'var(--color-deep-blue)') 
                          : (theme === 'dark' ? '#cbd5e1' : 'var(--color-slate)'),
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

                  <div style={{ margin: '8px 0', borderTop: `1px solid ${theme === 'dark' ? '#334155' : 'var(--color-gray-200)'}` }} />

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

        {/* Mobile controls: theme toggle + hamburger */}
        <div className="navbar-mobile-controls">
          <button
            type="button"
            className="theme-toggle-btn mobile-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <SunIcon size={18} color="#fbbf24" />
            ) : (
              <MoonIcon size={18} color="#1e3a8a" />
            )}
          </button>

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
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`} role="menu">
        {/* Mobile theme switch pill */}
        <div className="mobile-theme-row">
          <span style={{ fontSize: '13px', fontWeight: 600, color: theme === 'dark' ? '#f1f5f9' : 'var(--color-dark-text)' }}>
            Appearance
          </span>
          <button
            type="button"
            className="mobile-theme-pill"
            onClick={toggleTheme}
            aria-label={`Current mode is ${theme}. Click to switch theme.`}
          >
            {theme === 'dark' ? (
              <>
                <SunIcon size={16} color="#fbbf24" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <MoonIcon size={16} color="#1e3a8a" />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>

        {navLinks.map((link) => {
          const isActive = link.href === '/' 
            ? location.pathname === '/' 
            : location.pathname.startsWith(link.href);

          return (
            <Link 
              key={link.label} 
              to={link.href} 
              role="menuitem" 
              onClick={closeMobile}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: isActive ? 700 : 500,
                color: isActive 
                  ? (theme === 'dark' ? '#60a5fa' : '#1e3a8a') 
                  : (theme === 'dark' ? '#cbd5e1' : 'inherit'),
                background: isActive 
                  ? (theme === 'dark' ? 'rgba(96, 165, 250, 0.15)' : 'rgba(30, 58, 138, 0.08)') 
                  : 'transparent',
                padding: '10px 14px',
                borderRadius: '8px',
                borderLeft: isActive 
                  ? `3px solid ${theme === 'dark' ? '#60a5fa' : '#1e3a8a'}` 
                  : '3px solid transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{link.label}</span>
            </Link>
          );
        })}
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

