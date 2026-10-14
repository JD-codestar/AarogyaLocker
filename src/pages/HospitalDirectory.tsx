import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LocationIcon, SearchIcon, CloseIcon } from '../Icons';

interface Hospital {
  id: number;
  name: string;
  city: string;
  location: string;
  beds: number;
  icuBeds: number;
  specialties: string[];
  rating: number;
  reviews: number;
  emergency24x7: boolean;
  phone: string;
  nabhAccredited: boolean;
}

export default function HospitalDirectory() {
  const navigate = useNavigate();
  const { currentUser, bookAppointment, addRecord } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  // Booking Modal
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState('General Medicine');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 11:00 AM');
  const [opdSuccessMsg, setOpdSuccessMsg] = useState<string | null>(null);

  const hospitals: Hospital[] = [
    {
      id: 1,
      name: 'Apollo Indraprastha Hospitals',
      city: 'New Delhi',
      location: 'Sarita Vihar, Mathura Road, New Delhi',
      beds: 710,
      icuBeds: 140,
      specialties: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'Transplants'],
      rating: 4.8,
      reviews: 1820,
      emergency24x7: true,
      phone: '+91 11 2692 5858',
      nabhAccredited: true
    },
    {
      id: 2,
      name: 'Fortis Escorts Heart Institute',
      city: 'New Delhi',
      location: 'Okhla Road, New Delhi',
      beds: 310,
      icuBeds: 90,
      specialties: ['Cardiology', 'Cardiac Surgery', 'Vascular Care'],
      rating: 4.7,
      reviews: 1420,
      emergency24x7: true,
      phone: '+91 11 4713 5000',
      nabhAccredited: true
    },
    {
      id: 3,
      name: 'Max Super Speciality Hospital',
      city: 'New Delhi',
      location: 'Saket, New Delhi',
      beds: 530,
      icuBeds: 110,
      specialties: ['Oncology', 'Neurosciences', 'Pediatrics', 'Orthopedics'],
      rating: 4.9,
      reviews: 2150,
      emergency24x7: true,
      phone: '+91 11 2651 5050',
      nabhAccredited: true
    },
    {
      id: 4,
      name: 'Manipal Hospital Old Airport Road',
      city: 'Bengaluru',
      location: 'HAL Old Airport Rd, Kodihalli, Bengaluru',
      beds: 650,
      icuBeds: 125,
      specialties: ['Cardiology', 'Nephrology', 'Neurology', 'Gastroenterology'],
      rating: 4.8,
      reviews: 1690,
      emergency24x7: true,
      phone: '+91 80 2502 4444',
      nabhAccredited: true
    },
    {
      id: 5,
      name: 'Narayana Health City',
      city: 'Bengaluru',
      location: 'Bommasandra Industrial Area, Bengaluru',
      beds: 1200,
      icuBeds: 280,
      specialties: ['Cardiology', 'Cardiac Surgery', 'Oncology', 'Bone Marrow Transplant'],
      rating: 4.9,
      reviews: 3100,
      emergency24x7: true,
      phone: '+91 80 7122 2222',
      nabhAccredited: true
    },
    {
      id: 6,
      name: 'Kokilaben Dhirubhai Ambani Hospital',
      city: 'Mumbai',
      location: 'Four Bungalows, Andheri West, Mumbai',
      beds: 750,
      icuBeds: 180,
      specialties: ['Robotic Surgery', 'Oncology', 'Critical Care', 'Pediatrics'],
      rating: 4.8,
      reviews: 2450,
      emergency24x7: true,
      phone: '+91 22 4269 6969',
      nabhAccredited: true
    }
  ];

  const filtered = hospitals.filter(h => {
    const matchesCity = selectedCity === 'All' || h.city === selectedCity;
    const matchesSpecialty = selectedSpecialty === 'All' || h.specialties.includes(selectedSpecialty);
    const matchesSearch = !search.trim() ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase()) ||
      h.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesCity && matchesSpecialty && matchesSearch;
  });

  const handleBookOpd = () => {
    if (!selectedHospital) return;

    const patientId = currentUser?.id || 'pat-101';
    const patientName = currentUser?.name || 'Rahul Sharma';
    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    // 1. Add appointment to global context
    const apt = bookAppointment({
      doctorId: `HOSP-OPD-${selectedHospital.id}`,
      doctorName: `${selectedHospital.name} (OPD Consultant)`,
      doctorSpecialty: selectedDepartment,
      patientId,
      patientName,
      date: selectedDate,
      time: selectedSlot,
      consultationType: 'In-person',
      fee: 800,
      status: 'Scheduled',
      notes: `Hospital OPD Admission booked at ${selectedHospital.name}. Department: ${selectedDepartment}.`
    });

    // 2. Automatically generate verified Hospital OPD Registration Slip in AarogyaLocker
    addRecord({
      patientId,
      name: `Hospital OPD Pass — ${selectedHospital.name}`,
      date: nowStr,
      type: 'Discharge',
      doctor: `${selectedDepartment} Dept. Head`,
      hospitalOrLab: selectedHospital.name,
      fileSize: '390 KB',
      fileType: 'application/pdf',
      notes: `Official In-person Outpatient (OPD) Pass. Appointment ID: ${apt.id}. Slot: ${selectedDate} at ${selectedSlot}. Venue: ${selectedHospital.location}. Please present this digital token at the priority ABDM Fast-Track counter.`,
      tags: ['Hospital OPD', 'ABDM Fast-Track', selectedDepartment, selectedHospital.city],
      abhaLinked: true,
      isIssued: true,
      verifiedBy: `${selectedHospital.name} Hospital Administration`,
      documentNumber: `HOSP-PASS-${apt.id}`
    });

    setOpdSuccessMsg(`OPD Appointment #${apt.id} booked! Hospital OPD Pass generated and stored in your AarogyaLocker.`);
  };

  return (
    <section className="hospitals-page" style={{ padding: '36px 16px', background: 'var(--color-bg-light)', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eff6ff', color: '#1e40af', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, marginBottom: '10px' }}>
            <span>🏥 100% NABH & JCI Accredited Hospital Network</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 8px' }}>
            Find Top Multi-Speciality Hospitals
          </h1>
          <p style={{ color: 'var(--color-slate)', maxWidth: '640px', margin: '0 auto 20px', fontSize: '15px' }}>
            Book verified hospital OPD appointments, check real-time bed availability, and receive instant digital hospital admission tokens synced to your AarogyaLocker.
          </p>
          
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            maxWidth: '640px',
            margin: '0 auto',
            background: 'white',
            border: '1px solid var(--color-gray-200)',
            borderRadius: '12px',
            padding: '8px 16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            alignItems: 'center'
          }}>
            <div style={{ paddingRight: '12px', color: '#1e40af' }}>
              <SearchIcon size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search by hospital name, city, or specialty (e.g. Cardiology, Apollo)..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px' }}
            />
          </div>
        </div>

        {/* Filter Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          {/* City Filter */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['All', 'New Delhi', 'Bengaluru', 'Mumbai'].map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: selectedCity === city ? '#1e40af' : '#cbd5e1',
                  background: selectedCity === city ? '#1e40af' : 'white',
                  color: selectedCity === city ? 'white' : '#475569',
                  cursor: 'pointer'
                }}
              >
                📍 {city}
              </button>
            ))}
          </div>

          {/* Specialty Filter */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['All', 'Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'Pediatrics'].map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: selectedSpecialty === spec ? '#047857' : '#cbd5e1',
                  background: selectedSpecialty === spec ? '#047857' : 'white',
                  color: selectedSpecialty === spec ? 'white' : '#475569',
                  cursor: 'pointer'
                }}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Hospital Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {filtered.map(hospital => (
            <div
              key={hospital.id}
              className="card"
              style={{
                padding: '24px',
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-deep-blue)', margin: 0 }}>
                    {hospital.name}
                  </h2>
                  {hospital.emergency24x7 && (
                    <span style={{ fontSize: '11px', fontWeight: 700, background: '#fee2e2', color: '#b91c1c', padding: '3px 8px', borderRadius: '6px' }}>
                      24x7 Trauma
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-slate)', fontSize: '13px' }}>
                  <LocationIcon size={14} /> {hospital.location}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {hospital.specialties.map(spec => (
                  <span
                    key={spec}
                    style={{
                      padding: '4px 8px',
                      background: 'var(--color-ice-blue)',
                      color: 'var(--color-deep-blue)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Bed & Rating stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                background: '#f8fafc',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '13px'
              }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Total Beds:</span>
                  <strong>🛏️ {hospital.beds} ({hospital.icuBeds} ICU)</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '12px', display: 'block' }}>Rating:</span>
                  <strong style={{ color: '#d97706' }}>⭐ {hospital.rating} ({hospital.reviews} reviews)</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <a
                  href={`tel:${hospital.phone}`}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '13px', textDecoration: 'none' }}
                >
                  📞 Helpdesk
                </a>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1.4, padding: '10px', fontSize: '13px', fontWeight: 700 }}
                  onClick={() => {
                    setSelectedHospital(hospital);
                    setSelectedDepartment(hospital.specialties[0] || 'General Medicine');
                  }}
                >
                  Book OPD Token →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-slate)' }}>
            <p>No hospitals found matching "{search}".</p>
          </div>
        )}

      </div>

      {/* OPD Booking Modal */}
      {selectedHospital && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: 'white',
            width: '100%',
            maxWidth: '540px',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e40af', background: '#eff6ff', padding: '3px 8px', borderRadius: '4px' }}>
                  ABDM Fast-Track OPD Slot
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '6px 0 2px' }}>
                  {selectedHospital.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  {selectedHospital.location}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedHospital(null);
                  setOpdSuccessMsg(null);
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {opdSuccessMsg ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '48px', color: '#16a34a', marginBottom: '12px' }}>✓</div>
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
                  Hospital OPD Pass Issued!
                </h4>
                <p style={{ fontSize: '13px', color: '#166534', background: '#f0fdf4', padding: '12px', borderRadius: '10px', marginBottom: '20px' }}>
                  {opdSuccessMsg}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setSelectedHospital(null);
                      setOpdSuccessMsg(null);
                    }}
                    style={{ flex: 1, padding: '10px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setSelectedHospital(null);
                      setOpdSuccessMsg(null);
                      navigate('/health-records');
                    }}
                    style={{ flex: 1.4, padding: '10px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    View Pass in Locker →
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Select Clinical Specialty / Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={e => setSelectedDepartment(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  >
                    {selectedHospital.specialties.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    >
                      <option value="Today">Today (Fast-Track Walk-in)</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="In 2 Days">In 2 Days</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Time Window
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={e => setSelectedSlot(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    >
                      <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                      <option value="02:30 PM - 03:30 PM">02:30 PM - 03:30 PM</option>
                      <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569' }}>
                  <div><strong>Patient:</strong> {currentUser?.name || 'Rahul Sharma'} ({currentUser?.abhaId || 'ABHA Linked'})</div>
                  <div><strong>OPD Consultation Fee:</strong> ₹800 (Cashless under PM-JAY / ABHA Insurance if eligible)</div>
                </div>

                <button
                  onClick={handleBookOpd}
                  style={{
                    padding: '12px',
                    background: '#1e40af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(30,64,175,0.3)'
                  }}
                >
                  Confirm OPD Appointment & Issue Locker Pass →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
