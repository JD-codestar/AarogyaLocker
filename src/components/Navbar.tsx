/**
 * Navbar.tsx — Sticky navigation bar with responsive mobile menu.
 *
 * Key decisions:
 * • Uses anchor links (#sections) so clicking a nav link scrolls to
 *   that section on the page instead of loading a new page.
 * • The mobile hamburger menu opens/closes with a simple boolean state.
 * • Keyboard accessible — all interactive elements are focusable.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CareConnectLogo, MenuIcon, CloseIcon } from '../Icons';
import { navLinks } from '../data';

interface NavbarProps {
  onSignIn: () => void;
  isLoggedIn?: boolean;
}

export default function Navbar({ onSignIn, isLoggedIn }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

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
        <div className="navbar-actions">
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Link to="/dashboard" title="Go to Dashboard" style={{ textDecoration: 'none' }}>
                <div 
                  className="doctor-avatar" 
                  style={{ width: '40px', height: '40px', fontSize: 'var(--font-size-sm)', cursor: 'pointer', background: 'var(--color-cyan)', color: 'white' }} 
                >
                  U
                </div>
              </Link>
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
          {isLoggedIn ? (
            <Link to="/dashboard" onClick={closeMobile} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ padding: 'var(--space-2) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div 
                  className="doctor-avatar" 
                  style={{ width: '32px', height: '32px', fontSize: 'var(--font-size-xs)', background: 'var(--color-cyan)', color: 'white' }}
                >
                  U
                </div>
                <span style={{ fontWeight: 600 }}>Demo User</span>
              </div>
            </Link>
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
