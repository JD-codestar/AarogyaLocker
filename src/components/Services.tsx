/**
 * Services.tsx — Healthcare service cards grid.
 *
 * Matches the layout with large image cards.
 */
import { services } from '../data';

export default function Services() {
  return (
    <section className="services" id="services" aria-label="Services grid" style={{ padding: 'var(--space-8) 0', background: 'var(--color-white)' }}>
      <div className="container">
        <div className="services-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: 'var(--space-6)',
          justifyContent: 'center'
        }}>
          {services.map((service) => (
            <a
              key={service.id}
              href={service.href}
              className="card service-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '16px',
                textDecoration: 'none',
                color: 'var(--color-dark)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                background: 'var(--color-white)',
                padding: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
              }}
            >
              <div 
                className="service-image-container"
                style={{
                  height: '160px',
                  backgroundColor: service.bgColor,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end'
                }}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div className="service-content" style={{ padding: 'var(--space-5)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: 'var(--space-2)' }}>{service.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--color-slate)' }}>{service.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
