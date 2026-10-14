/**
 * TrustSection.tsx — Highlights convenience and transparency.
 *
 * Key decisions:
 * • Does NOT make medical outcome or verification claims.
 * • Focuses on convenience, appointment management, and information transparency.
 */
import { ShieldIcon, CalendarIcon, HeartPulseIcon } from '../Icons';

export default function TrustSection() {
  const items = [
    {
      icon: <CalendarIcon />,
      title: 'Easy Appointment Management',
      description:
        'Book, reschedule, or review your appointments from anywhere. Our simple interface keeps your schedule organized.',
    },
    {
      icon: <ShieldIcon />,
      title: 'Transparent Information',
      description:
        'View doctor profiles with experience details, consultation fees, and patient reviews — all in one place before you book.',
    },
    {
      icon: <HeartPulseIcon />,
      title: 'Convenient Healthcare Access',
      description:
        'Choose between in-person visits and video consultations to find the option that best fits your schedule and comfort.',
    },
  ];

  return (
    <section className="trust-section" aria-labelledby="trust-heading">
      <div className="container">
        <h2 className="section-title" id="trust-heading">
          Why Choose AarogyaLocker
        </h2>
        <p className="section-subtitle">
          We make finding and booking healthcare appointments straightforward and hassle-free.
        </p>

        <div className="trust-grid">
          {items.map((item) => (
            <div className="trust-item" key={item.title}>
              <div className="trust-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
