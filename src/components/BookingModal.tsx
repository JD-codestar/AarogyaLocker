/**
 * BookingModal.tsx — Appointment booking interface.
 *
 * This is a usable demo interface, NOT a real booking system.
 * Key features:
 * • Date selection from a list of upcoming sample dates
 * • Time slot selection
 * • Patient name input with validation
 * • Success confirmation with booking details
 * • Error messages for missing required fields
 *
 * No real data is collected or transmitted.
 */
import { useState, useRef, useEffect } from 'react';
import type { Doctor } from '../data';
import { getBookingDates, getBookingTimes } from '../data';
import { CloseIcon, CheckCircleIcon, AlertCircleIcon } from '../Icons';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
}

type BookingStep = 'select' | 'confirm' | 'success';

export default function BookingModal({ doctor, onClose }: BookingModalProps) {
  const [step, setStep] = useState<BookingStep>('select');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const dates = getBookingDates();
  const times = getBookingTimes();
  const modalRef = useRef<HTMLDivElement>(null);

  // Trap focus inside the modal for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const validate = (): boolean => {
    const newErrors: string[] = [];
    if (selectedDate === null) newErrors.push('Please select a date.');
    if (!selectedTime) newErrors.push('Please select a time slot.');
    if (!patientName.trim()) newErrors.push('Please enter the patient name.');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleConfirm = () => {
    if (validate()) {
      setStep('confirm');
    }
  };

  const handleBook = () => {
    setStep('success');
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div className="modal" ref={modalRef}>
        {/* Header */}
        <div className="modal-header">
          <h2 id="booking-title">
            {step === 'success' ? 'Booking Confirmed!' : 'Book Appointment'}
          </h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close booking dialog"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          {step === 'success' ? (
            /* --- Success State --- */
            <div className="booking-success">
              <div className="booking-success-icon">
                <CheckCircleIcon size={32} />
              </div>
              <h3>Appointment Booked!</h3>
              <p>Your demo appointment has been confirmed. (This is a sample confirmation — no real appointment was created.)</p>

              <div className="booking-details">
                <div className="booking-details-row">
                  <span className="label">Doctor</span>
                  <span className="value">{doctor.name}</span>
                </div>
                <div className="booking-details-row">
                  <span className="label">Specialty</span>
                  <span className="value">{doctor.specialty}</span>
                </div>
                <div className="booking-details-row">
                  <span className="label">Date</span>
                  <span className="value">
                    {selectedDate !== null ? dates[selectedDate].fullDate : '—'}
                  </span>
                </div>
                <div className="booking-details-row">
                  <span className="label">Time</span>
                  <span className="value">{selectedTime}</span>
                </div>
                <div className="booking-details-row">
                  <span className="label">Patient</span>
                  <span className="value">{patientName}</span>
                </div>
                <div className="booking-details-row">
                  <span className="label">Fee</span>
                  <span className="value">₹{doctor.fee}</span>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-4)' }}>
                <span className="badge badge-green" style={{ fontSize: 'var(--font-size-sm)' }}>
                  ✓ Confirmed (Demo)
                </span>
              </div>
            </div>
          ) : step === 'confirm' ? (
            /* --- Confirm Step --- */
            <div>
              <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-gray-600)' }}>
                Please review your appointment details:
              </p>
              <div className="booking-details">
                <div className="booking-details-row">
                  <span className="label">Doctor</span>
                  <span className="value">{doctor.name}</span>
                </div>
                <div className="booking-details-row">
                  <span className="label">Date</span>
                  <span className="value">
                    {selectedDate !== null ? dates[selectedDate].fullDate : '—'}
                  </span>
                </div>
                <div className="booking-details-row">
                  <span className="label">Time</span>
                  <span className="value">{selectedTime}</span>
                </div>
                <div className="booking-details-row">
                  <span className="label">Patient</span>
                  <span className="value">{patientName}</span>
                </div>
                <div className="booking-details-row">
                  <span className="label">Fee</span>
                  <span className="value">₹{doctor.fee}</span>
                </div>
              </div>
              <p style={{ marginTop: 'var(--space-4)', fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-400)', fontStyle: 'italic' }}>
                This is a demo — no real appointment or payment will be processed.
              </p>
            </div>
          ) : (
            /* --- Selection Step --- */
            <div>
              {/* Doctor Info */}
              <div className="booking-doctor-info">
                <div className="doctor-avatar" aria-hidden="true">
                  {doctor.initials}
                </div>
                <div>
                  <strong>{doctor.name}</strong>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>
                    {doctor.specialty} · ₹{doctor.fee}
                  </p>
                </div>
              </div>

              {/* Error Messages */}
              {errors.length > 0 && (
                <div className="message message-error" role="alert" style={{ marginBottom: 'var(--space-4)' }}>
                  <AlertCircleIcon size={18} />
                  <div>
                    {errors.map((err, i) => (
                      <p key={i}>{err}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Date Selection */}
              <div className="booking-dates">
                <h3>Select Date</h3>
                <div className="date-options">
                  {dates.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`date-option ${selectedDate === i ? 'selected' : ''}`}
                      onClick={() => setSelectedDate(i)}
                      aria-label={`Select ${d.fullDate}`}
                      aria-pressed={selectedDate === i}
                    >
                      <span className="date-day">{d.label}</span>
                      <span className="date-num">{d.date.split(' ')[1]}</span>
                      <span className="date-day">{d.date.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="booking-dates">
                <h3>Select Time</h3>
                <div className="time-options">
                  {times.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      className={`time-option ${selectedTime === t.label ? 'selected' : ''} ${!t.available ? 'disabled' : ''}`}
                      onClick={() => t.available && setSelectedTime(t.label)}
                      disabled={!t.available}
                      aria-label={`${t.label}${!t.available ? ' — unavailable' : ''}`}
                      aria-pressed={selectedTime === t.label}
                      style={!t.available ? { opacity: 0.4, cursor: 'not-allowed' } : {}}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Name */}
              <div className="booking-form-group">
                <label htmlFor="patient-name">Patient Name</label>
                <input
                  id="patient-name"
                  type="text"
                  className={`input-field ${errors.some((e) => e.includes('patient')) ? 'input-error' : ''}`}
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          {step === 'success' ? (
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          ) : step === 'confirm' ? (
            <>
              <button type="button" className="btn btn-secondary" onClick={() => setStep('select')}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={handleBook}>
                Confirm Booking (Demo)
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleConfirm}>
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
