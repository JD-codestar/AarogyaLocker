import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LocationIcon, SearchIcon, CloseIcon } from '../Icons';

export interface HospitalDoctor {
  id: string;
  name: string;
  designation: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  fee: number;
  opdDays: string;
  availability: string;
}

export interface Hospital {
  id: number;
  name: string;
  city: 'Chandigarh' | 'Mohali';
  location: string;
  sector: string;
  beds: number;
  icuBeds: number;
  specialties: string[];
  rating: number;
  reviews: number;
  emergency24x7: boolean;
  traumaLevel: string;
  phone: string;
  nabhAccredited: boolean;
  abdmEnabled: boolean;
  opdTimings: string;
  topDoctors: HospitalDoctor[];
}

export default function HospitalDirectory() {
  const navigate = useNavigate();
  const { currentUser, bookAppointment, addRecord } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<'All' | 'Chandigarh' | 'Mohali'>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [expandedDoctorsHospitalId, setExpandedDoctorsHospitalId] = useState<number | null>(null);

  // Booking Modal State
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('general');
  const [selectedDepartment, setSelectedDepartment] = useState('Cardiology');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 11:00 AM');
  const [opdSuccessMsg, setOpdSuccessMsg] = useState<string | null>(null);

  const hospitals: Hospital[] = [
    // ==================== CHANDIGARH HOSPITALS ====================
    {
      id: 1,
      name: 'Postgraduate Institute of Medical Education and Research (PGIMER)',
      city: 'Chandigarh',
      location: 'Sector 12, Chandigarh - 160012',
      sector: 'Sector 12',
      beds: 2200,
      icuBeds: 350,
      specialties: ['Cardiology', 'Neurology', 'Oncology', 'Nephrology', 'Organ Transplant', 'Pediatrics', 'Critical Care'],
      rating: 4.9,
      reviews: 3840,
      emergency24x7: true,
      traumaLevel: 'Apex Level-1 Trauma Centre',
      phone: '+91 172 274 7585',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '8:00 AM - 2:00 PM (Mon-Sat)',
      topDoctors: [
        {
          id: 'doc-chd-1',
          name: 'Dr. Manmohanjit Singh',
          designation: 'Professor & Head — Interventional Cardiology',
          specialty: 'Cardiology',
          experience: '22 years experience',
          rating: 4.9,
          reviews: 680,
          fee: 900,
          opdDays: 'Mon, Wed, Fri',
          availability: 'Available Today'
        },
        {
          id: 'doc-chd-5',
          name: 'Dr. Ananya Sood',
          designation: 'Senior Consultant — Endocrinology & Metabolism',
          specialty: 'Endocrinology',
          experience: '14 years experience',
          rating: 4.8,
          reviews: 460,
          fee: 850,
          opdDays: 'Tue, Thu, Sat',
          availability: 'Available Tomorrow'
        },
        {
          id: 'doc-chd-7',
          name: 'Dr. Rajiv Singla',
          designation: 'Director — Nephrology & Renal Transplant',
          specialty: 'Nephrology',
          experience: '20 years experience',
          rating: 4.9,
          reviews: 510,
          fee: 1000,
          opdDays: 'Mon to Fri',
          availability: 'Available Today'
        }
      ]
    },
    {
      id: 2,
      name: 'Government Medical College & Hospital (GMCH-32)',
      city: 'Chandigarh',
      location: 'Chandi Path, Sector 32, Chandigarh - 160030',
      sector: 'Sector 32',
      beds: 960,
      icuBeds: 120,
      specialties: ['Obstetrics & Gynecology', 'General Surgery', 'Orthopedics', 'Pediatrics', 'ENT', 'Cardiology'],
      rating: 4.7,
      reviews: 2190,
      emergency24x7: true,
      traumaLevel: '24x7 Emergency & Trauma Unit',
      phone: '+91 172 260 1023',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '8:30 AM - 1:30 PM (Mon-Sat)',
      topDoctors: [
        {
          id: 'doc-chd-2',
          name: 'Dr. Simranjeet Kaur',
          designation: 'Senior Professor — Obstetrics & Gynecology',
          specialty: 'Obstetrics & Gynecology',
          experience: '16 years experience',
          rating: 4.8,
          reviews: 540,
          fee: 700,
          opdDays: 'Mon, Wed, Thu',
          availability: 'Available Today'
        },
        {
          id: 'doc-chd-8',
          name: 'Dr. Vineet Mahajan',
          designation: 'Chief Surgeon — Minimal Access Surgery',
          specialty: 'General Surgery',
          experience: '18 years experience',
          rating: 4.8,
          reviews: 420,
          fee: 750,
          opdDays: 'Tue, Fri, Sat',
          availability: 'Available Tomorrow'
        }
      ]
    },
    {
      id: 3,
      name: 'Healing Hospital & Institute of Paramedical Sciences',
      city: 'Chandigarh',
      location: 'SCO 16-19, Sector 34A, Chandigarh - 160022',
      sector: 'Sector 34A',
      beds: 150,
      icuBeds: 35,
      specialties: ['Neurology', 'Orthopedics', 'Cardiology', 'Laparoscopic Surgery', 'Urology'],
      rating: 4.8,
      reviews: 1420,
      emergency24x7: true,
      traumaLevel: '24x7 Critical Emergency Response',
      phone: '+91 172 508 8883',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '9:00 AM - 5:00 PM (Daily)',
      topDoctors: [
        {
          id: 'doc-chd-3',
          name: 'Dr. Ravinder Pal Singh',
          designation: 'Director of Neurosciences & Neuro-Physician',
          specialty: 'Neurology',
          experience: '19 years experience',
          rating: 4.9,
          reviews: 430,
          fee: 1000,
          opdDays: 'Mon to Sat',
          availability: 'Available Today'
        },
        {
          id: 'doc-chd-9',
          name: 'Dr. Tarun Gupta',
          designation: 'Senior Consultant — Joint Replacement & Spine',
          specialty: 'Orthopedics',
          experience: '15 years experience',
          rating: 4.8,
          reviews: 380,
          fee: 850,
          opdDays: 'Mon, Wed, Fri',
          availability: 'Available Today'
        }
      ]
    },
    {
      id: 4,
      name: 'Mukat Hospital & Heart Institute',
      city: 'Chandigarh',
      location: 'Sector 34A, Chandigarh - 160022',
      sector: 'Sector 34A',
      beds: 120,
      icuBeds: 30,
      specialties: ['Cardiology', 'Dermatology', 'Pulmonology', 'Critical Care', 'Internal Medicine'],
      rating: 4.7,
      reviews: 980,
      emergency24x7: true,
      traumaLevel: '24x7 Cardiac Resuscitation Emergency',
      phone: '+91 172 434 4444',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '9:30 AM - 6:00 PM (Mon-Sat)',
      topDoctors: [
        {
          id: 'doc-chd-4',
          name: 'Dr. Neha Grewal',
          designation: 'Consultant Dermatologist & Cosmetologist',
          specialty: 'Dermatology',
          experience: '11 years experience',
          rating: 4.8,
          reviews: 390,
          fee: 650,
          opdDays: 'Mon to Sat',
          availability: 'Available Today'
        },
        {
          id: 'doc-chd-10',
          name: 'Dr. Bhupinder Singh',
          designation: 'Chief Interventional Cardiologist',
          specialty: 'Cardiology',
          experience: '21 years experience',
          rating: 4.9,
          reviews: 490,
          fee: 900,
          opdDays: 'Mon, Wed, Fri',
          availability: 'Available Tomorrow'
        }
      ]
    },
    {
      id: 5,
      name: 'Eden Critical Care Hospital',
      city: 'Chandigarh',
      location: 'Plot No. 115, Industrial Area Phase 1, Chandigarh - 160002',
      sector: 'Industrial Area Phase 1',
      beds: 100,
      icuBeds: 40,
      specialties: ['Critical Care', 'General Medicine', 'Emergency Trauma', 'Gastroenterology'],
      rating: 4.6,
      reviews: 720,
      emergency24x7: true,
      traumaLevel: '24x7 Advanced Trauma & ICU',
      phone: '+91 172 507 8888',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '10:00 AM - 5:00 PM (Daily)',
      topDoctors: [
        {
          id: 'doc-chd-6',
          name: 'Dr. Tanya Verma',
          designation: 'Senior Consultant — Internal Medicine & ICU',
          specialty: 'General Medicine',
          experience: '13 years experience',
          rating: 4.7,
          reviews: 310,
          fee: 550,
          opdDays: 'Daily',
          availability: 'Available Today'
        }
      ]
    },
    {
      id: 6,
      name: 'Landmark Hospital',
      city: 'Chandigarh',
      location: 'Site No. 1-2, Sector 33C, Chandigarh - 160020',
      sector: 'Sector 33C',
      beds: 80,
      icuBeds: 20,
      specialties: ['Orthopedics', 'Robotic Joint Replacement', 'Sports Medicine', 'Spine Care'],
      rating: 4.8,
      reviews: 860,
      emergency24x7: true,
      traumaLevel: '24x7 Orthopedic & Fracture Care',
      phone: '+91 172 502 7777',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '9:00 AM - 4:00 PM (Mon-Sat)',
      topDoctors: [
        {
          id: 'doc-chd-11',
          name: 'Dr. T. S. Mahant',
          designation: 'Chief Joint Replacement & Arthroscopy Surgeon',
          specialty: 'Orthopedics',
          experience: '24 years experience',
          rating: 4.9,
          reviews: 580,
          fee: 950,
          opdDays: 'Mon, Tue, Thu, Sat',
          availability: 'Available Today'
        }
      ]
    },

    // ==================== MOHALI HOSPITALS ====================
    {
      id: 7,
      name: 'Fortis Hospital Mohali',
      city: 'Mohali',
      location: 'Sector 62, Phase VIII, SAS Nagar, Mohali - 160062',
      sector: 'Sector 62 (Phase 8)',
      beds: 355,
      icuBeds: 95,
      specialties: ['Cardiology', 'Cardiac Surgery', 'Robotic Surgery', 'Oncology', 'Pulmonology', 'Neurosciences'],
      rating: 4.9,
      reviews: 3260,
      emergency24x7: true,
      traumaLevel: 'JCI Accredited 24x7 Level-1 Trauma Centre',
      phone: '+91 172 502 1222',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '9:00 AM - 6:00 PM (Mon-Sat)',
      topDoctors: [
        {
          id: 'doc-moh-7',
          name: 'Dr. R. K. Jaswal',
          designation: 'Director — Interventional Cardiology (30k+ Angioplasties)',
          specialty: 'Cardiology',
          experience: '28 years experience',
          rating: 5.0,
          reviews: 1120,
          fee: 1300,
          opdDays: 'Mon to Sat',
          availability: 'Available Today'
        },
        {
          id: 'doc-moh-1',
          name: 'Dr. Gurpreet Singh',
          designation: 'Chief Cardio-Thoracic Vascular Surgeon (CTVS)',
          specialty: 'Cardiac Surgery',
          experience: '24 years experience',
          rating: 4.9,
          reviews: 820,
          fee: 1200,
          opdDays: 'Mon, Wed, Fri',
          availability: 'Available Tomorrow'
        },
        {
          id: 'doc-moh-5',
          name: 'Dr. Jaspreet Singh Batra',
          designation: 'Director — Pulmonology, Sleep & Critical Care',
          specialty: 'Pulmonology',
          experience: '15 years experience',
          rating: 4.8,
          reviews: 380,
          fee: 850,
          opdDays: 'Tue, Thu, Sat',
          availability: 'Available Today'
        }
      ]
    },
    {
      id: 8,
      name: 'Max Super Speciality Hospital Mohali',
      city: 'Mohali',
      location: 'Near Civil Hospital, Phase VI, SAS Nagar, Mohali - 160055',
      sector: 'Phase 6',
      beds: 230,
      icuBeds: 65,
      specialties: ['Oncology', 'ENT', 'Cardiology', 'Neurosciences', 'Orthopedics', 'Robotic Surgery'],
      rating: 4.8,
      reviews: 2540,
      emergency24x7: true,
      traumaLevel: '24x7 Comprehensive Emergency & Stroke Unit',
      phone: '+91 172 521 2000',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '9:00 AM - 5:30 PM (Mon-Sat)',
      topDoctors: [
        {
          id: 'doc-moh-8',
          name: 'Dr. Sachin Gupta',
          designation: 'Director — Medical Oncology & Cancer Care',
          specialty: 'Oncology',
          experience: '16 years experience',
          rating: 4.9,
          reviews: 590,
          fee: 1100,
          opdDays: 'Mon to Fri',
          availability: 'Available Tomorrow'
        },
        {
          id: 'doc-moh-2',
          name: 'Dr. Raman Abrol',
          designation: 'Principal Director — ENT & Head-Neck Surgery',
          specialty: 'ENT',
          experience: '17 years experience',
          rating: 4.8,
          reviews: 510,
          fee: 800,
          opdDays: 'Mon, Wed, Thu, Sat',
          availability: 'Available Today'
        }
      ]
    },
    {
      id: 9,
      name: 'Ivy Hospital Mohali',
      city: 'Mohali',
      location: 'Sector 71, SAS Nagar, Mohali - 160071',
      sector: 'Sector 71',
      beds: 220,
      icuBeds: 55,
      specialties: ['Orthopedics', 'Nephrology', 'Renal Transplants', 'Urology', 'Cardiology'],
      rating: 4.7,
      reviews: 1890,
      emergency24x7: true,
      traumaLevel: '24x7 Multi-Specialty Trauma Care',
      phone: '+91 172 717 0000',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '9:30 AM - 5:00 PM (Daily)',
      topDoctors: [
        {
          id: 'doc-moh-3',
          name: 'Dr. Harshdeep Singh Sandhu',
          designation: 'Chief Orthopedic & Robotic Joint Surgeon',
          specialty: 'Orthopedics',
          experience: '18 years experience',
          rating: 4.9,
          reviews: 640,
          fee: 900,
          opdDays: 'Mon, Tue, Thu, Fri',
          availability: 'Available Today'
        },
        {
          id: 'doc-moh-9',
          name: 'Dr. Raka Kaushal',
          designation: 'Director — Nephrology & Kidney Care',
          specialty: 'Nephrology',
          experience: '23 years experience',
          rating: 4.9,
          reviews: 680,
          fee: 1050,
          opdDays: 'Mon to Sat',
          availability: 'Available Today'
        }
      ]
    },
    {
      id: 10,
      name: 'Sri Guru Harkrishan Sahib (Sohana) Super Speciality Hospital',
      city: 'Mohali',
      location: 'Sector 77, Sohana, SAS Nagar, Mohali - 160071',
      sector: 'Sector 77 (Sohana)',
      beds: 300,
      icuBeds: 50,
      specialties: ['Ophthalmology', 'Pediatrics', 'Cardiology', 'Nephrology', 'Dialysis'],
      rating: 4.9,
      reviews: 2950,
      emergency24x7: true,
      traumaLevel: '24x7 Eye & General Medical Emergency',
      phone: '+91 172 504 5000',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '8:30 AM - 5:30 PM (Daily)',
      topDoctors: [
        {
          id: 'doc-moh-4',
          name: 'Dr. Amandeep Kaur Brar',
          designation: 'Lead Pediatrician & Neonatologist',
          specialty: 'Pediatrics',
          experience: '12 years experience',
          rating: 4.9,
          reviews: 470,
          fee: 600,
          opdDays: 'Mon to Sat',
          availability: 'Available Today'
        },
        {
          id: 'doc-moh-10',
          name: 'Dr. Gagandeep Singh',
          designation: 'Chief Vitreo-Retinal & Advanced Eye Surgeon',
          specialty: 'Ophthalmology',
          experience: '17 years experience',
          rating: 4.8,
          reviews: 530,
          fee: 850,
          opdDays: 'Mon to Sat',
          availability: 'Available Today'
        }
      ]
    },
    {
      id: 11,
      name: 'Grecian Super Speciality Hospital (Park Group)',
      city: 'Mohali',
      location: 'Sector 69, SAS Nagar, Mohali - 160069',
      sector: 'Sector 69',
      beds: 180,
      icuBeds: 45,
      specialties: ['Gastroenterology', 'Laparoscopic Surgery', 'Cardiology', 'Medical Oncology'],
      rating: 4.7,
      reviews: 1340,
      emergency24x7: true,
      traumaLevel: '24x7 Critical Care & Emergency',
      phone: '+91 172 469 6600',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '9:00 AM - 5:00 PM (Mon-Sat)',
      topDoctors: [
        {
          id: 'doc-moh-6',
          name: 'Dr. Bikramjit Singh',
          designation: 'Chief Laparoscopic & Gastrointestinal Surgeon',
          specialty: 'Laparoscopic Surgery',
          experience: '16 years experience',
          rating: 4.7,
          reviews: 330,
          fee: 800,
          opdDays: 'Mon, Wed, Fri',
          availability: 'Available Today'
        }
      ]
    },
    {
      id: 12,
      name: 'Indus Super Speciality Hospital',
      city: 'Mohali',
      location: 'Opposite DC Office, Phase 1, Sector 55, Mohali - 160055',
      sector: 'Phase 1 (Sector 55)',
      beds: 110,
      icuBeds: 30,
      specialties: ['General Surgery', 'Orthopedics', 'Gynecology', 'Critical Care'],
      rating: 4.6,
      reviews: 810,
      emergency24x7: true,
      traumaLevel: '24x7 Emergency Services',
      phone: '+91 172 500 5000',
      nabhAccredited: true,
      abdmEnabled: true,
      opdTimings: '9:00 AM - 4:30 PM (Mon-Sat)',
      topDoctors: [
        {
          id: 'doc-moh-12',
          name: 'Dr. B. S. Aulakh',
          designation: 'Senior Consultant — Minimal Access Surgery',
          specialty: 'General Surgery',
          experience: '20 years experience',
          rating: 4.7,
          reviews: 390,
          fee: 750,
          opdDays: 'Tue, Thu, Sat',
          availability: 'Available Today'
        }
      ]
    }
  ];

  const filtered = hospitals.filter(h => {
    const matchesCity = selectedCity === 'All' || h.city === selectedCity;
    const matchesSpecialty = selectedSpecialty === 'All' || h.specialties.includes(selectedSpecialty);
    const searchLow = search.trim().toLowerCase();
    const matchesSearch = !searchLow ||
      h.name.toLowerCase().includes(searchLow) ||
      h.location.toLowerCase().includes(searchLow) ||
      h.sector.toLowerCase().includes(searchLow) ||
      h.specialties.some(s => s.toLowerCase().includes(searchLow)) ||
      h.topDoctors.some(d => d.name.toLowerCase().includes(searchLow) || d.specialty.toLowerCase().includes(searchLow));
    return matchesCity && matchesSpecialty && matchesSearch;
  });

  const openOpdModal = (hospital: Hospital, preselectedDoctorId?: string) => {
    setSelectedHospital(hospital);
    setOpdSuccessMsg(null);
    if (preselectedDoctorId) {
      setSelectedDoctorId(preselectedDoctorId);
      const doc = hospital.topDoctors.find(d => d.id === preselectedDoctorId);
      if (doc) {
        setSelectedDepartment(doc.specialty);
      }
    } else {
      setSelectedDoctorId('general');
      setSelectedDepartment(hospital.specialties[0] || 'Cardiology');
    }
  };

  const handleBookOpd = () => {
    if (!selectedHospital) return;

    const patientId = currentUser?.id || 'pat-101';
    const patientName = currentUser?.name || 'Rahul Sharma';
    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const chosenDoc = selectedHospital.topDoctors.find(d => d.id === selectedDoctorId);
    const assignedDoctorName = chosenDoc ? chosenDoc.name : `${selectedHospital.name} (Chief Consultant)`;
    const assignedSpecialty = chosenDoc ? chosenDoc.specialty : selectedDepartment;
    const consultationFee = chosenDoc ? chosenDoc.fee : 800;

    // 1. Add appointment to global context
    const apt = bookAppointment({
      doctorId: chosenDoc ? chosenDoc.id : `HOSP-OPD-${selectedHospital.id}`,
      doctorName: assignedDoctorName,
      doctorSpecialty: assignedSpecialty,
      patientId,
      patientName,
      date: selectedDate,
      time: selectedSlot,
      consultationType: 'In-person',
      fee: consultationFee,
      status: 'Scheduled',
      notes: `Hospital OPD Pass booked at ${selectedHospital.name}. Department: ${assignedSpecialty}. Doctor: ${assignedDoctorName}. ABDM Priority Token generated.`
    });

    // 2. Automatically generate verified Hospital OPD Registration Slip in AarogyaLocker
    addRecord({
      patientId,
      name: `Hospital OPD Pass — ${selectedHospital.name}`,
      date: nowStr,
      type: 'Discharge',
      doctor: assignedDoctorName,
      hospitalOrLab: selectedHospital.name,
      fileSize: '410 KB',
      fileType: 'application/pdf',
      notes: `Official Outpatient OPD Pass (ABDM Verified). Appointment ID: ${apt.id}. Slot: ${selectedDate} at ${selectedSlot}. Specialist: ${assignedDoctorName} (${assignedSpecialty}). Venue: ${selectedHospital.location}. Please show this token at the priority ABDM Fast-Track counter.`,
      tags: ['Hospital OPD', 'ABDM Fast-Track', assignedSpecialty, selectedHospital.city, selectedHospital.sector],
      abhaLinked: true,
      isIssued: true,
      verifiedBy: `${selectedHospital.name} Hospital Administration`,
      documentNumber: `HOSP-PASS-${apt.id}`
    });

    setOpdSuccessMsg(`OPD Appointment #${apt.id} booked with ${assignedDoctorName}! Official OPD Pass generated and saved to your AarogyaLocker.`);
  };

  return (
    <section className="hospitals-page" style={{ padding: '36px 16px', background: 'var(--color-bg-light)', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', color: '#047857', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, marginBottom: '12px', border: '1px solid #a7f3d0' }}>
            <span>📍 Tricity Healthcare Network • Mohali & Chandigarh Exclusively</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-dark)', margin: '0 0 10px', letterSpacing: '-0.5px' }}>
            Top Hospitals & Leading Specialists in Mohali & Chandigarh
          </h1>
          <p style={{ color: 'var(--color-slate)', maxWidth: '720px', margin: '0 auto 24px', fontSize: '15px', lineHeight: 1.6 }}>
            Browse verified multi-speciality hospitals across Chandigarh and Mohali (SAS Nagar). Connect with premier department directors, view OPD days, check bed availability, and book verified digital OPD passes synced instantly to your AarogyaLocker.
          </p>
          
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            maxWidth: '680px',
            margin: '0 auto',
            background: 'white',
            border: '1px solid var(--color-gray-200)',
            borderRadius: '14px',
            padding: '10px 18px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ color: '#1e40af', display: 'flex', alignItems: 'center' }}>
              <SearchIcon size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search hospital, doctor, sector or specialty (e.g. Fortis, PGIMER, Dr. Jaswal, Cardiology)..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px' }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px', background: 'white', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          {/* Region Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginRight: '4px' }}>Region:</span>
            {(['All', 'Chandigarh', 'Mohali'] as const).map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: selectedCity === city ? '#1e40af' : '#cbd5e1',
                  background: selectedCity === city ? '#1e40af' : '#f8fafc',
                  color: selectedCity === city ? 'white' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                📍 {city === 'All' ? 'All Tricity' : city}
              </button>
            ))}
          </div>

          {/* Specialty Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginRight: '4px' }}>Specialty:</span>
            {['All', 'Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics', 'Nephrology'].map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: selectedSpecialty === spec ? '#047857' : '#e2e8f0',
                  background: selectedSpecialty === spec ? '#047857' : '#ffffff',
                  color: selectedSpecialty === spec ? 'white' : '#64748b',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Hospital Directory Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '28px' }}>
          {filtered.map(hospital => {
            const areDoctorsExpanded = expandedDoctorsHospitalId === hospital.id;

            return (
              <div
                key={hospital.id}
                className="card"
                style={{
                  padding: '24px',
                  background: 'white',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                {/* Hospital Header */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                    <h2 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--color-deep-blue)', margin: 0, lineHeight: 1.3 }}>
                      {hospital.name}
                    </h2>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      whiteSpace: 'nowrap',
                      background: hospital.city === 'Chandigarh' ? '#eff6ff' : '#f0fdf4',
                      color: hospital.city === 'Chandigarh' ? '#1e40af' : '#15803d',
                      border: `1px solid ${hospital.city === 'Chandigarh' ? '#bfdbfe' : '#bbf7d0'}`
                    }}>
                      📍 {hospital.city}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-slate)', fontSize: '13px', marginBottom: '8px' }}>
                    <LocationIcon size={14} /> <span>{hospital.location}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: '#fee2e2', color: '#b91c1c', padding: '3px 8px', borderRadius: '6px' }}>
                      🚨 {hospital.traumaLevel}
                    </span>
                    {hospital.nabhAccredited && (
                      <span style={{ fontSize: '11px', fontWeight: 700, background: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '6px' }}>
                        ✓ NABH Accredited
                      </span>
                    )}
                    {hospital.abdmEnabled && (
                      <span style={{ fontSize: '11px', fontWeight: 700, background: '#e0e7ff', color: '#4338ca', padding: '3px 8px', borderRadius: '6px' }}>
                        ⚡ ABDM Fast-Track
                      </span>
                    )}
                  </div>
                </div>

                {/* Specialties list */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {hospital.specialties.map(spec => (
                    <span
                      key={spec}
                      style={{
                        padding: '3px 8px',
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

                {/* Beds, Ratings, & OPD Timings */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  background: '#f8fafc',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  fontSize: '13px'
                }}>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '11px', display: 'block', fontWeight: 600, textTransform: 'uppercase' }}>Bed Capacity:</span>
                    <strong>🛏️ {hospital.beds} ({hospital.icuBeds} ICU)</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '11px', display: 'block', fontWeight: 600, textTransform: 'uppercase' }}>Verified Rating:</span>
                    <strong style={{ color: '#d97706' }}>⭐ {hospital.rating} ({hospital.reviews} reviews)</strong>
                  </div>
                  <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '2px' }}>
                    <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>OPD Timings:</span>
                    <span style={{ color: '#0f172a', fontWeight: 600, fontSize: '12px' }}>⏱️ {hospital.opdTimings}</span>
                  </div>
                </div>

                {/* TOP DOCTORS SECTION */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>👨‍⚕️ Top Doctors & Specialists</span>
                      <span style={{ background: '#dbeafe', color: '#1e40af', fontSize: '11px', padding: '2px 7px', borderRadius: '10px', fontWeight: 700 }}>
                        {hospital.topDoctors.length}
                      </span>
                    </h3>
                    {hospital.topDoctors.length > 2 && (
                      <button
                        onClick={() => setExpandedDoctorsHospitalId(areDoctorsExpanded ? null : hospital.id)}
                        style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        {areDoctorsExpanded ? 'Show Less' : `View All (${hospital.topDoctors.length})`}
                      </button>
                    )}
                  </div>

                  {/* Doctor Mini Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {hospital.topDoctors
                      .slice(0, areDoctorsExpanded ? hospital.topDoctors.length : 2)
                      .map(doc => (
                        <div
                          key={doc.id}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '12px 14px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'border-color 0.15s',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                              <strong style={{ fontSize: '14px', color: '#0f172a' }}>{doc.name}</strong>
                              <span style={{ fontSize: '11px', color: '#d97706', fontWeight: 700 }}>⭐ {doc.rating}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, marginTop: '2px' }}>
                              {doc.specialty} • {doc.experience}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                              OPD: <strong>{doc.opdDays}</strong> • ₹{doc.fee}
                            </div>
                          </div>

                          <button
                            onClick={() => openOpdModal(hospital, doc.id)}
                            style={{
                              background: '#eff6ff',
                              color: '#1e40af',
                              border: '1px solid #bfdbfe',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            Book Doctor →
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                  <a
                    href={`tel:${hospital.phone}`}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '10px', textAlign: 'center', fontSize: '13px', textDecoration: 'none', borderRadius: '10px' }}
                  >
                    📞 Helpdesk
                  </a>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1.4, padding: '10px', fontSize: '13px', fontWeight: 700, borderRadius: '10px' }}
                    onClick={() => openOpdModal(hospital)}
                  >
                    Book OPD Pass →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-slate)', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#334155' }}>No hospitals or doctors found</h3>
            <p style={{ fontSize: '14px', maxWidth: '400px', margin: '8px auto 16px' }}>
              We could not find any healthcare facilities matching "{search}" in {selectedCity === 'All' ? 'Mohali or Chandigarh' : selectedCity}.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCity('All');
                setSelectedSpecialty('All');
              }}
              className="btn btn-primary"
              style={{ fontSize: '13px' }}
            >
              Reset Filters
            </button>
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
            maxWidth: '560px',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e40af', background: '#eff6ff', padding: '3px 8px', borderRadius: '4px' }}>
                    ABDM Fast-Track OPD Slot
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#047857', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
                    📍 {selectedHospital.city}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '4px 0 2px' }}>
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
                <p style={{ fontSize: '13px', color: '#166534', background: '#f0fdf4', padding: '14px', borderRadius: '12px', marginBottom: '20px', lineHeight: 1.5, border: '1px solid #bbf7d0' }}>
                  {opdSuccessMsg}
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setSelectedHospital(null);
                      setOpdSuccessMsg(null);
                    }}
                    style={{ flex: 1, padding: '12px', background: '#f1f5f9', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Done
                  </button>
                  <button
                    onClick={() => {
                      setSelectedHospital(null);
                      setOpdSuccessMsg(null);
                      navigate('/health-records');
                    }}
                    style={{ flex: 1.4, padding: '12px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    View Pass in Locker →
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Select Specific Doctor or General OPD */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Select Doctor or OPD Unit:
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={e => {
                      const val = e.target.value;
                      setSelectedDoctorId(val);
                      if (val !== 'general') {
                        const doc = selectedHospital.topDoctors.find(d => d.id === val);
                        if (doc) setSelectedDepartment(doc.specialty);
                      }
                    }}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
                  >
                    <option value="general">🏢 General Department OPD (Hospital Duty Consultant)</option>
                    {selectedHospital.topDoctors.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        👨‍⚕️ {doc.name} — {doc.specialty} ({doc.experience}, ₹{doc.fee})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department dropdown */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Clinical Department / Specialty:
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={e => setSelectedDepartment(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
                  >
                    {selectedHospital.specialties.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Date & Time Slot */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Date:
                    </label>
                    <select
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
                    >
                      <option value="Today">Today (Fast-Track Walk-in)</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="In 2 Days">In 2 Days</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Time Window:
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={e => setSelectedSlot(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', background: 'white' }}
                    >
                      <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                      <option value="02:30 PM - 03:30 PM">02:30 PM - 03:30 PM</option>
                      <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Patient & ABDM Details Summary */}
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div><strong>Patient:</strong> {currentUser?.name || 'Rahul Sharma'} ({currentUser?.abhaId || 'ABHA: 91-4829-1092-4821'})</div>
                  <div>
                    <strong>Doctor / Unit:</strong> {selectedDoctorId !== 'general' ? selectedHospital.topDoctors.find(d => d.id === selectedDoctorId)?.name : `${selectedDepartment} OPD Unit`}
                  </div>
                  <div>
                    <strong>Consultation Fee:</strong> ₹{selectedDoctorId !== 'general' ? selectedHospital.topDoctors.find(d => d.id === selectedDoctorId)?.fee : 800} (Cashless under PM-JAY / ABHA Insurance if eligible)
                  </div>
                  <div style={{ color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                    ⚡ Generates verified ABDM digital QR token for direct entry at hospital reception.
                  </div>
                </div>

                <button
                  onClick={handleBookOpd}
                  style={{
                    padding: '14px',
                    background: '#1e40af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '14px',
                    boxShadow: '0 4px 14px rgba(30,64,175,0.3)',
                    marginTop: '4px'
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

