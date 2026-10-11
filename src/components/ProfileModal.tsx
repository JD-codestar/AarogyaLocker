/**
 * ProfileModal.tsx — Doctor profile detail view.
 *
 * Shows extended information about a demo doctor:
 * • Name, specialty, education, bio
 * • Stats (experience, ratings, reviews)
 * • Languages spoken
 * • "Book Appointment" action that opens the booking modal
 *
 * Clearly labelled as a fictional demo profile.
 */
import { useEffect } from 'react';
import type { Doctor } from '../data';
import { CloseIcon, StarIcon } from '../Icons';

interface ProfileModalProps {
  doctor: Doctor;
  onClose: () => void;
  onBook: (doctor: Doctor) => void;
}

export default function ProfileModal({ doctor, onClose, onBook }: ProfileModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-title"
    >
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <h2 id="profile-title">Doctor Profile</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close profile dialog"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar" aria-hidden="true">
              {doctor.initials}
            </div>
            <div>
              <h3 className="profile-name">{doctor.name}</h3>
              <p className="profile-specialty">{doctor.specialty}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginTop: 'var(--space-2)' }}>
                <StarIcon size={16} className="star-icon" />
                <strong>{doctor.rating}</strong>
                <span style={{ color: 'var(--color-gray-400)', fontSize: 'var(--font-size-sm)' }}>
                  ({doctor.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stat-grid" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="profile-stat">
              <div className="stat-value">{doctor.experience.split(' ')[0]}</div>
              <div className="stat-label">Years Exp.</div>
            </div>
            <div className="profile-stat">
              <div className="stat-value">{doctor.rating}</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="profile-stat">
              <div className="stat-value">{doctor.reviewCount}</div>
              <div className="stat-label">Reviews</div>
            </div>
          </div>

          {/* About */}
          <div className="profile-section">
            <h3>About</h3>
            <p>{doctor.bio}</p>
          </div>

          {/* Education */}
          <div className="profile-section">
            <h3>Education</h3>
            <p>{doctor.education}</p>
          </div>

          {/* Consultation Info */}
          <div className="profile-section">
            <h3>Consultation</h3>
            <p>
              <strong>Type:</strong> {doctor.consultationType}<br />
              <strong>Fee:</strong> ₹{doctor.fee}<br />
              <strong>Languages:</strong> {doctor.languages.join(', ')}
            </p>
          </div>

          {/* Availability */}
          <div className="profile-section">
            <h3>Availability</h3>
            <span className={`badge ${doctor.availability === 'Available Today' ? 'badge-green' : 'badge-blue'}`}>
              ● {doctor.availability}
            </span>
          </div>

          {/* Demo Notice */}
          <div className="profile-notice">
            ⓘ This is a fictional doctor profile created for demonstration purposes. 
            It does not represent a verified real practitioner.
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onBook(doctor);
            }}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
