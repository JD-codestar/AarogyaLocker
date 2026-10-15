/**
 * Footer.tsx — Site footer with interactive navigation, legal links, and disclaimer.
 */
import { Link } from 'react-router-dom';
import { AarogyaLockerLogo } from '../Icons';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <Link to="/" onClick={scrollToTop} className="footer-brand" style={{ textDecoration: 'none', color: 'inherit' }}>
              <AarogyaLockerLogo size={32} />
              <span>AarogyaLocker</span>
            </Link>
            <p className="footer-description">
              Your trusted platform for secure health record storage, ABHA integration,
              verified Tricity doctors, and hospital OPD passes. Making healthcare
              seamless and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <Link to="/" onClick={scrollToTop}>Home</Link>
            <Link to="/doctors" onClick={scrollToTop}>Find Doctors</Link>
            <Link to="/consultation" onClick={scrollToTop}>Online Consultation</Link>
            <Link to="/lab-tests" onClick={scrollToTop}>Lab Tests</Link>
            <Link to="/about" onClick={scrollToTop}>About Us</Link>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4>Services</h4>
            <Link to="/doctors" onClick={scrollToTop}>Find a Doctor</Link>
            <Link to="/consultation" onClick={scrollToTop}>Video Consultation</Link>
            <Link to="/lab-tests" onClick={scrollToTop}>Diagnostic Tests</Link>
            <Link to="/lab-tests" onClick={scrollToTop}>Health Checkups</Link>
            <Link to="/#how-it-works">How It Works</Link>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>Contact</h4>
            <a href="mailto:support@aarogyalocker.in">support@aarogyalocker.in</a>
            <a href="tel:+911722747585">+91 172 274 7585</a>
            <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
              Tricity Digital Health Hub<br />
              Chandigarh & Mohali, India
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} AarogyaLocker. All rights reserved.</p>

          <div className="footer-bottom-links">
            <Link to="/privacy" onClick={scrollToTop}>Privacy Policy</Link>
            <Link to="/terms" onClick={scrollToTop}>Terms of Service</Link>
            <Link to="/accessibility" onClick={scrollToTop}>Accessibility</Link>
          </div>

          {/* Demo Disclaimer */}
          <div className="footer-disclaimer">
            <strong>Demo Disclaimer:</strong> AarogyaLocker is a demonstration project built for
            educational and portfolio purposes. All doctor profiles, patient testimonials,
            ratings, and appointment slots shown are fictional. No real medical services,
            appointments, payments, or patient data are involved. This application does not
            provide medical advice, diagnosis, or treatment. Do not use this demo to make
            real healthcare decisions.
          </div>
        </div>
      </div>
    </footer>
  );
}
