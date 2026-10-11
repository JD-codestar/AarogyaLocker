/**
 * Footer.tsx — Site footer with navigation, contact, legal links, and disclaimer.
 *
 * Includes:
 * • Brand with description
 * • Quick links (mirroring the navigation)
 * • Services links
 * • Contact placeholders
 * • Legal links (Privacy, Terms, Accessibility)
 * • Demo disclaimer
 */
import { CareConnectLogo } from '../Icons';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div className="footer-brand">
              <CareConnectLogo size={32} />
              <span>CareConnect</span>
            </div>
            <p className="footer-description">
              Your trusted platform for finding healthcare professionals
              and booking appointments with ease. Making healthcare
              accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#doctors">Find Doctors</a>
            <a href="#services">Online Consultation</a>
            <a href="#services">Lab Tests</a>
            <a href="#footer">About Us</a>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4>Services</h4>
            <a href="#services">Find a Doctor</a>
            <a href="#services">Video Consultation</a>
            <a href="#services">Diagnostic Tests</a>
            <a href="#services">Health Checkups</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>Contact</h4>
            <a href="mailto:hello@careconnect.demo">hello@careconnect.demo</a>
            <a href="tel:+911234567890">+91 123 456 7890</a>
            <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
              Demo Address Placeholder<br />
              City, State 000000
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} CareConnect. All rights reserved.</p>

          <div className="footer-bottom-links">
            <a href="#footer">Privacy Policy</a>
            <a href="#footer">Terms of Service</a>
            <a href="#footer">Accessibility</a>
          </div>

          {/* Demo Disclaimer */}
          <div className="footer-disclaimer">
            <strong>Demo Disclaimer:</strong> CareConnect is a demonstration project built for
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
