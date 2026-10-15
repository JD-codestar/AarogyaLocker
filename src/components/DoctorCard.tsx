/**
 * DoctorCard.tsx — A horizontal doctor card for the search results page.
 */
import type { Doctor } from '../data';
import { StarIcon, BriefcaseIcon, VideoIcon } from '../Icons';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
  onBook: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onViewProfile, onBook }: DoctorCardProps) {
  const badgeClass =
    doctor.availability === 'Available Today'
      ? 'badge-green'
      : doctor.availability === 'Available Tomorrow'
        ? 'badge-blue'
        : 'badge-blue';

  return (
    <div 
      className="card doctor-card-horizontal" 
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--space-6)',
        padding: 'var(--space-5)',
        alignItems: 'flex-start',
        borderRadius: '12px'
      }}
    >
      {/* Avatar Left */}
      <div style={{ flex: '0 0 auto' }}>
        <div 
          className="doctor-avatar" 
          aria-hidden="true"
          style={{ width: '80px', height: '80px', fontSize: '32px' }}
        >
          {doctor.initials}
        </div>
      </div>

      {/* Info Middle */}
      <div style={{ flex: '1', minWidth: 0 }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-deep-blue)', marginBottom: '4px' }}>
          {doctor.name}
        </h3>
        <p className="specialty" style={{ fontSize: '15px', color: 'var(--color-dark)', fontWeight: 500, marginBottom: 'var(--space-3)' }}>
          {doctor.specialty}
        </p>

        <div className="doctor-meta" style={{ display: 'grid', gap: '8px', marginBottom: 'var(--space-3)' }}>
          <div className="doctor-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-slate)', fontSize: '14px' }}>
            <BriefcaseIcon size={16} />
            <span>{doctor.experience}</span>
          </div>
          <div className="doctor-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
            <StarIcon size={16} className="star-icon" color="#F59E0B" />
            <strong>{doctor.rating}</strong>
            <span style={{ color: 'var(--color-slate)' }}>({doctor.reviewCount} reviews)</span>
          </div>
          <div className="doctor-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-slate)', fontSize: '14px' }}>
            <VideoIcon size={16} />
            <span>{doctor.consultationType}</span>
          </div>
        </div>
      </div>

      {/* Actions Right */}
      <div 
        className="doctor-card-right"
        style={{ 
          flex: '0 0 200px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '100%',
          borderLeft: '1px dashed var(--color-gray-200)',
          paddingLeft: 'var(--space-5)'
        }}
      >
        <div style={{ textAlign: 'right', marginBottom: 'var(--space-4)' }}>
          <span className={`badge ${badgeClass}`} style={{ display: 'inline-block', marginBottom: 'var(--space-2)' }}>
            ● {doctor.availability}
          </span>
          <div className="doctor-fee-title" style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Consultation Fee</div>
          <div className="doctor-fee-value" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-dark)' }}>₹{doctor.fee}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onBook(doctor)}
            aria-label={`Book appointment with ${doctor.name}`}
            style={{ width: '100%' }}
          >
            Book Now
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onViewProfile(doctor)}
            aria-label={`View profile for ${doctor.name}`}
            style={{ width: '100%' }}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
