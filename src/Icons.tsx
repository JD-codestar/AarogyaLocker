/**
 * Icons.tsx — Inline SVG icons used throughout AarogyaLocker.
 *
 * Why inline SVGs instead of an icon library?
 * • Zero extra dependencies to install
 * • Tiny bundle size
 * • Icons inherit color from CSS (currentColor)
 * • Easy for beginners to see exactly what each icon looks like
 */
import React from 'react';

// A small helper so every icon has consistent sizing props.
export interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

export const SearchIcon: React.FC<IconProps> = ({ size = 20, className, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color, ...style }} aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const LocationIcon: React.FC<IconProps> = ({ size = 20, className, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ color, ...style }} aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 16, className, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color || "currentColor"} className={className} style={{ color, ...style }} aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const VideoIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const AlertCircleIcon: React.FC<IconProps> = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const HeartPulseIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M19.5 12.572l-7.5 7.428l-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.566z" />
    <path d="M3 12h4l2-4 4 8 2-4h6" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// --- Service-specific Icons ---

export const DoctorIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <line x1="12" y1="11" x2="12" y2="17" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);

export const LabIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M9 3h6v6l4 8H5l4-8V3z" />
    <line x1="9" y1="3" x2="15" y2="3" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
    <circle cx="10" cy="14" r="0.5" fill="currentColor" />
  </svg>
);

export const CheckupIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

// --- Brand Logo ---

export const AarogyaLockerLogo: React.FC<IconProps> = ({ size = 38, className, style }) => (
  <img
    src="/aarogya-icon-transparent.png"
    alt="AarogyaLocker Logo"
    width={size}
    height={size}
    className={className}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 2px 6px rgba(15, 44, 89, 0.15))',
      ...style
    }}
  />
);

export const AarogyaLockerFullLogo: React.FC<{ height?: number; className?: string; style?: React.CSSProperties }> = ({ height = 48, className, style }) => (
  <img
    src="/aarogya-logo.jpg"
    alt="AarogyaLocker - Your Medical Records, Securely in One Place"
    height={height}
    className={className}
    style={{
      height: `${height}px`,
      width: 'auto',
      objectFit: 'contain',
      display: 'inline-block',
      borderRadius: '8px',
      ...style
    }}
  />
);

export const CareConnectLogo = AarogyaLockerLogo;

// --- Hero Illustration (inline SVG so no external dependencies) ---

export const HeroIllustration: React.FC = () => (
  <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-illustration" role="img" aria-label="Healthcare illustration showing a doctor with a stethoscope, clipboard, and health symbols">
    {/* Background circle */}
    <circle cx="250" cy="200" r="170" fill="#EAF5FF" />
    <circle cx="250" cy="200" r="140" fill="#FFFFFF" fillOpacity="0.6" />

    {/* Doctor body */}
    <rect x="210" y="160" width="80" height="120" rx="20" fill="#28328C" />

    {/* Doctor head */}
    <circle cx="250" cy="135" r="35" fill="#F5D0B0" />

    {/* Hair */}
    <path d="M220 125 Q220 100 250 100 Q280 100 280 125 Q280 115 260 112 Q240 115 220 125Z" fill="#3B3B3B" />

    {/* Smile */}
    <path d="M240 145 Q250 152 260 145" stroke="#C4956A" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Eyes */}
    <circle cx="238" cy="132" r="3" fill="#3B3B3B" />
    <circle cx="262" cy="132" r="3" fill="#3B3B3B" />

    {/* Coat collar */}
    <path d="M225 165 L250 180 L275 165" stroke="#FFFFFF" strokeWidth="3" fill="none" />

    {/* Stethoscope */}
    <path d="M230 170 Q215 200 225 230" stroke="#24B6D2" strokeWidth="3" fill="none" strokeLinecap="round" />
    <circle cx="225" cy="233" r="6" fill="#24B6D2" />
    <circle cx="225" cy="233" r="3" fill="#1D9DB6" />

    {/* Arms */}
    <rect x="190" y="175" width="25" height="60" rx="12" fill="#28328C" />
    <rect x="285" y="175" width="25" height="60" rx="12" fill="#28328C" />

    {/* Hands */}
    <circle cx="202" cy="238" r="10" fill="#F5D0B0" />
    <circle cx="298" cy="238" r="10" fill="#F5D0B0" />

    {/* Clipboard in right hand */}
    <rect x="285" y="205" width="30" height="40" rx="3" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="290" y="210" width="8" height="2" rx="1" fill="#28328C" />
    <line x1="290" y1="218" x2="310" y2="218" stroke="#E5E7EB" strokeWidth="1.5" />
    <line x1="290" y1="224" x2="308" y2="224" stroke="#E5E7EB" strokeWidth="1.5" />
    <line x1="290" y1="230" x2="305" y2="230" stroke="#E5E7EB" strokeWidth="1.5" />
    <path d="M290 236 l3 3 6-6" stroke="#16A34A" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Legs */}
    <rect x="220" y="275" width="25" height="50" rx="10" fill="#374151" />
    <rect x="255" y="275" width="25" height="50" rx="10" fill="#374151" />

    {/* Shoes */}
    <rect x="215" y="318" width="35" height="12" rx="6" fill="#202938" />
    <rect x="250" y="318" width="35" height="12" rx="6" fill="#202938" />

    {/* Health cross */}
    <g transform="translate(370, 120)">
      <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#28328C" strokeWidth="2" />
      <rect x="-4" y="-12" width="8" height="24" rx="2" fill="#DC2626" />
      <rect x="-12" y="-4" width="24" height="8" rx="2" fill="#DC2626" />
    </g>

    {/* Heart icon */}
    <g transform="translate(110, 130)">
      <circle cx="0" cy="0" r="20" fill="#FFFFFF" stroke="#24B6D2" strokeWidth="2" />
      <path d="M0 8s-8-5-8-10a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c0 5-8 10-8 10z" fill="#DC2626" fillOpacity="0.8" />
    </g>

    {/* Pulse line */}
    <polyline points="80,280 130,280 150,260 165,300 180,250 195,290 210,280 420,280" stroke="#24B6D2" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />

    {/* Small decorative dots */}
    <circle cx="380" cy="280" r="4" fill="#28328C" fillOpacity="0.15" />
    <circle cx="120" cy="250" r="3" fill="#24B6D2" fillOpacity="0.2" />
    <circle cx="350" cy="100" r="5" fill="#16A34A" fillOpacity="0.15" />
    <circle cx="140" cy="310" r="4" fill="#28328C" fillOpacity="0.1" />
  </svg>
);
