import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  User, 
  UserRole, 
  HealthRecord, 
  Appointment, 
  PrescriptionItem,
  PharmacyMedicine,
  PharmacyOrder,
  LabTestPackage,
  LabTestBooking,
  LabResultEntry
} from '../types';
import { INITIAL_PHARMACY_MEDICINES, INITIAL_LAB_PACKAGES } from '../data/storeData';

export const DEMO_USERS: User[] = [
  {
    id: 'pat-101',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    role: 'patient',
    abhaId: '91-4521-8932-1104',
    age: 32,
    gender: 'Male',
    phone: '+91 98765 43210',
    avatar: 'RS'
  },
  {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    email: 'dr.priya@aarogyalocker.in',
    role: 'doctor',
    specialty: 'General Physician',
    age: 41,
    gender: 'Female',
    phone: '+91 98111 22334',
    avatar: 'PS'
  },
  {
    id: 'stf-201',
    name: 'Anita Desai',
    email: 'anita.desai@aarogyalocker.in',
    role: 'staff',
    age: 29,
    gender: 'Female',
    phone: '+91 98222 33445',
    avatar: 'AD'
  },
  {
    id: 'adm-001',
    name: 'Vikram Malhotra',
    email: 'admin@aarogyalocker.in',
    role: 'admin',
    age: 45,
    gender: 'Male',
    phone: '+91 98333 44556',
    avatar: 'VM'
  }
];

export const INITIAL_RECORDS: HealthRecord[] = [
  {
    id: 'REC-100',
    patientId: 'pat-101',
    name: 'ABHA Universal Health Identity Card',
    date: 'Oct 01, 2026',
    type: 'IdentityCard',
    doctor: 'National Health Authority (NHA)',
    hospitalOrLab: 'Ayushman Bharat Digital Mission (ABDM)',
    fileSize: '420 KB',
    fileType: 'application/pdf',
    notes: 'Official Digital Health ID linked to Ayushman Bharat Digital Mission. Authenticated with Aadhaar e-KYC.',
    tags: ['ABHA Card', 'National Health ID', 'Govt Verified'],
    abhaLinked: true,
    isIssued: true,
    verifiedBy: 'Govt. of India — ABDM Gateway',
    documentNumber: 'ABDM-NHA-91-4521-8932'
  },
  {
    id: 'REC-101',
    patientId: 'pat-101',
    name: 'Complete Blood Count (CBC) & Lipid Profile',
    date: 'Oct 01, 2026',
    type: 'Laboratory',
    doctor: 'Dr. Priya Sharma',
    hospitalOrLab: 'AarogyaLocker Central Pathology Lab',
    fileSize: '1.2 MB',
    fileType: 'application/pdf',
    notes: 'Comprehensive venous blood analysis. Hemoglobin: 14.2 g/dL, Platelets: 250k. All primary metabolic indicators within optimal clinical limits.',
    tags: ['Routine Checkup', 'Blood Work', 'Pathology'],
    abhaLinked: true,
    isIssued: true,
    verifiedBy: 'Dr. Priya Sharma (Reg #KMC-48291)',
    documentNumber: 'LAB-2026-88129',
    labResults: [
      { parameter: 'Hemoglobin (Hb)', value: '14.2', unit: 'g/dL', referenceRange: '13.0 - 17.0', status: 'Normal' },
      { parameter: 'Total Leucocyte Count (WBC)', value: '6,800', unit: '/mcL', referenceRange: '4,500 - 11,000', status: 'Normal' },
      { parameter: 'Platelet Count', value: '250,000', unit: '/mcL', referenceRange: '150,000 - 450,000', status: 'Normal' },
      { parameter: 'Fasting Blood Sugar', value: '94', unit: 'mg/dL', referenceRange: '70 - 99', status: 'Normal' },
      { parameter: 'Total Cholesterol', value: '182', unit: 'mg/dL', referenceRange: '< 200', status: 'Normal' },
      { parameter: 'Serum Creatinine', value: '0.9', unit: 'mg/dL', referenceRange: '0.7 - 1.3', status: 'Normal' }
    ]
  },
  {
    id: 'REC-102',
    patientId: 'pat-101',
    name: 'Chest X-Ray Digital Radiograph (PA View)',
    date: 'Sep 15, 2026',
    type: 'Imaging',
    doctor: 'Dr. Rahul Mehta',
    hospitalOrLab: 'Apex Advanced Diagnostic Imaging Center',
    fileSize: '3.8 MB',
    fileType: 'image/jpeg',
    notes: 'Clear bilateral lung fields, normal cardiothoracic ratio, intact bony rib cage, no evidence of acute focal infiltrates.',
    tags: ['Radiology', 'Lungs', 'Chest X-Ray'],
    abhaLinked: true,
    isIssued: true,
    verifiedBy: 'Dr. Rahul Mehta (Consultant Radiologist)',
    documentNumber: 'RAD-IMG-40912'
  },
  {
    id: 'REC-103',
    patientId: 'pat-101',
    name: 'Digital E-Prescription — Seasonal Viral Care',
    date: 'Aug 20, 2026',
    type: 'Prescription',
    doctor: 'Dr. Arjun Patel',
    hospitalOrLab: 'AarogyaLocker Telehealth Clinic',
    fileSize: '450 KB',
    fileType: 'application/pdf',
    notes: 'Patient presented with mild rhinitis, low-grade pyrexia, and sore throat. Advised adequate hydration, rest, and symptomatic therapy.',
    tags: ['Flu', 'Fever', 'Medication', 'E-Prescription'],
    abhaLinked: true,
    isIssued: true,
    verifiedBy: 'Dr. Arjun Patel (Reg #MCI-77341)',
    documentNumber: 'RX-EHR-99201',
    medicines: [
      { name: 'Paracetamol', dosage: '650 mg', frequency: 'Three times daily (TDS)', duration: '5 days', instructions: 'Take after meals for fever or body ache.' },
      { name: 'Levocetirizine', dosage: '5 mg', frequency: 'Once daily at bedtime (OD)', duration: '5 days', instructions: 'Take with warm water before sleep.' },
      { name: 'Vitamin C + Zinc Chewable', dosage: '500 mg', frequency: 'Once daily (OD)', duration: '10 days', instructions: 'Immunity booster after breakfast.' }
    ]
  },
  {
    id: 'REC-104',
    patientId: 'pat-101',
    name: 'Hospital Discharge Summary & Inpatient Record',
    date: 'Jan 10, 2026',
    type: 'Discharge',
    doctor: 'Apollo Specialty Hospital',
    hospitalOrLab: 'Apollo Hospitals Multispecialty Care',
    fileSize: '2.4 MB',
    fileType: 'application/pdf',
    notes: 'Admitted for acute foodborne gastroenteritis with dehydration. Successfully stabilized with IV fluid resuscitation. Discharged in stable condition.',
    tags: ['In-Patient', 'Discharge Summary', 'Apollo'],
    abhaLinked: true,
    isIssued: true,
    verifiedBy: 'Medical Superintendent — Apollo Hospitals',
    documentNumber: 'DIS-APOLLO-10943'
  },
  {
    id: 'REC-105',
    patientId: 'pat-101',
    name: 'Universal COVID-19 & Adult Vaccination Certificate',
    date: 'Dec 05, 2025',
    type: 'Vaccination',
    doctor: 'Ministry of Health & Family Welfare',
    hospitalOrLab: 'National Immunization Program (ABDM-COWIN)',
    fileSize: '680 KB',
    fileType: 'application/pdf',
    notes: 'Fully immunized (Precaution Dose / Booster). Verified with digital cryptographic public key.',
    tags: ['Vaccination', 'COVID-19', 'Govt Certificate'],
    abhaLinked: true,
    isIssued: true,
    verifiedBy: 'NHA & CoWIN Digital Gateway',
    documentNumber: 'VAC-IND-9940129'
  }
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1001',
    doctorId: 'doc-1',
    doctorName: 'Dr. Priya Sharma',
    doctorSpecialty: 'General Physician',
    patientId: 'pat-101',
    patientName: 'Rahul Sharma',
    date: 'Tomorrow',
    time: '10:00 AM',
    consultationType: 'Video Consultation',
    fee: 500,
    status: 'Waiting',
    notes: 'Follow-up consultation regarding persistent morning headaches.',
    createdAt: '2026-10-10'
  },
  {
    id: 'APT-1002',
    doctorId: 'doc-1',
    doctorName: 'Dr. Priya Sharma',
    doctorSpecialty: 'General Physician',
    patientId: 'pat-102',
    patientName: 'Amit Singh',
    date: 'Tomorrow',
    time: '10:30 AM',
    consultationType: 'In-person',
    fee: 500,
    status: 'Scheduled',
    notes: 'Routine hypertension review.',
    createdAt: '2026-10-10'
  },
  {
    id: 'APT-1003',
    doctorId: 'doc-1',
    doctorName: 'Dr. Priya Sharma',
    doctorSpecialty: 'General Physician',
    patientId: 'pat-103',
    patientName: 'Neha Sharma',
    date: 'Tomorrow',
    time: '11:15 AM',
    consultationType: 'In-person',
    fee: 500,
    status: 'Scheduled',
    notes: 'Seasonal allergy assessment.',
    createdAt: '2026-10-10'
  }
];

const INITIAL_PRESCRIPTIONS: PrescriptionItem[] = [
  {
    id: 'RX-101',
    patientId: 'pat-101',
    doctorName: 'Dr. Priya Sharma',
    date: 'Oct 01, 2026',
    medication: 'Amoxicillin 500mg',
    dosage: '1 capsule three times daily',
    duration: '5 days',
    instructions: 'Take after meals with water. Complete full course.'
  },
  {
    id: 'RX-102',
    patientId: 'pat-101',
    doctorName: 'Dr. Arjun Patel',
    date: 'Sep 20, 2026',
    medication: 'Atorvastatin 10mg',
    dosage: '1 tablet once daily at bedtime',
    duration: '30 days',
    instructions: 'Monitor lipid profile after 4 weeks.'
  }
];

interface AppContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  loginAs: (userOrRole: User | UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  users: User[];
  
  // Health Records
  records: HealthRecord[];
  addRecord: (record: Omit<HealthRecord, 'id'>) => HealthRecord;
  deleteRecord: (id: string) => void;
  
  // Appointments
  appointments: Appointment[];
  bookAppointment: (apt: Omit<Appointment, 'id' | 'createdAt'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  addDoctorNotesAndPrescription: (
    appointmentId: string, 
    notes: string, 
    medicines?: { name: string; dosage: string; duration: string; instructions: string }[]
  ) => void;
  cancelAppointment: (id: string) => void;
  
  // Prescriptions
  prescriptions: PrescriptionItem[];
  addPrescription: (rx: Omit<PrescriptionItem, 'id'>) => void;

  // Pharmacy Store
  pharmacyMedicines: PharmacyMedicine[];
  pharmacyOrders: PharmacyOrder[];
  createPharmacyOrder: (orderData: Omit<PharmacyOrder, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>) => PharmacyOrder;

  // Diagnostics & Lab Tests
  labPackages: LabTestPackage[];
  labBookings: LabTestBooking[];
  createLabBooking: (bookingData: Omit<LabTestBooking, 'id' | 'createdAt' | 'status' | 'phlebotomistName' | 'reportRecordId'>) => LabTestBooking;
  
  // Gemini AI Key
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;

  // Theme (Dark / Light Mode)
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // 1. User Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aarogya_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null; // Start logged out — users must sign in via /login
  });

  // 2. Health Records State
  const [records, setRecords] = useState<HealthRecord[]>(() => {
    const saved = localStorage.getItem('aarogya_records');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_RECORDS;
  });

  // 3. Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('aarogya_appointments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_APPOINTMENTS;
  });

  // 4. Prescriptions State
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>(() => {
    const saved = localStorage.getItem('aarogya_prescriptions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRESCRIPTIONS;
  });

  // 5. Pharmacy Orders State
  const [pharmacyOrders, setPharmacyOrders] = useState<PharmacyOrder[]>(() => {
    const saved = localStorage.getItem('aarogya_pharmacy_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // 6. Lab Test Bookings State
  const [labBookings, setLabBookings] = useState<LabTestBooking[]>(() => {
    const saved = localStorage.getItem('aarogya_lab_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // 7. Gemini API Key
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => {
    return localStorage.getItem('aarogya_gemini_key') || '';
  });

  // 8. Theme State (Dark / Light Mode)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('aarogya_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('aarogya_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('aarogya_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('aarogya_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('aarogya_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('aarogya_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('aarogya_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('aarogya_pharmacy_orders', JSON.stringify(pharmacyOrders));
  }, [pharmacyOrders]);

  useEffect(() => {
    localStorage.setItem('aarogya_lab_bookings', JSON.stringify(labBookings));
  }, [labBookings]);

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem('aarogya_gemini_key', key);
  };

  // Auth actions
  const loginAs = (userOrRole: User | UserRole) => {
    let targetUser: User | null = null;
    if (typeof userOrRole === 'string') {
      const match = DEMO_USERS.find(u => u.role === userOrRole);
      if (match) targetUser = match;
    } else {
      targetUser = userOrRole;
    }

    if (targetUser) {
      setCurrentUser(targetUser);

      // Auto-provision personalized AarogyaLocker records if new patient has none
      if (targetUser.role === 'patient') {
        const patientId = targetUser.id;
        const patientName = targetUser.name;
        const patientAbha = targetUser.abhaId || '91-4521-8932-1104';

        setRecords(prev => {
          const userHasRecords = prev.some(r => r.patientId === patientId);
          if (userHasRecords) return prev;

          const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
          const personalizedRecords: HealthRecord[] = [
            {
              id: `REC-${Date.now().toString().slice(-4)}-ID`,
              patientId,
              name: 'ABHA Universal Health Identity Card',
              date: nowStr,
              type: 'IdentityCard',
              doctor: 'National Health Authority (NHA)',
              hospitalOrLab: 'Ayushman Bharat Digital Mission (ABDM)',
              fileSize: '420 KB',
              fileType: 'application/pdf',
              notes: `Official Digital Health ID linked to Ayushman Bharat Digital Mission for ${patientName}. Authenticated via e-KYC.`,
              tags: ['ABHA Card', 'National Health ID', 'Govt Verified'],
              abhaLinked: true,
              isIssued: true,
              verifiedBy: 'Govt. of India — ABDM Gateway',
              documentNumber: `ABDM-${patientAbha}`
            },
            {
              id: `REC-${Date.now().toString().slice(-4)}-REG`,
              patientId,
              name: 'Patient Registration & Vitals Profile Certificate',
              date: nowStr,
              type: 'IdentityCard',
              doctor: 'AarogyaLocker Hospital Network',
              hospitalOrLab: 'Central Health Registry',
              fileSize: '310 KB',
              fileType: 'application/pdf',
              notes: `Registered health profile for ${patientName}. Phone: ${targetUser.phone || 'Verified'}. Email: ${targetUser.email}. Digital consent agreement verified.`,
              tags: ['Registration Profile', 'ABHA Linked', 'Verified'],
              abhaLinked: true,
              isIssued: true,
              verifiedBy: 'AarogyaLocker Health Authority',
              documentNumber: `REG-PID-${patientId}`
            },
            {
              id: `REC-${Date.now().toString().slice(-4)}-LAB`,
              patientId,
              name: 'Complete Blood Count (CBC) & Metabolic Profile',
              date: nowStr,
              type: 'Laboratory',
              doctor: 'Dr. Priya Sharma',
              hospitalOrLab: 'AarogyaLocker Central Pathology Lab',
              fileSize: '1.4 MB',
              fileType: 'application/pdf',
              notes: `Comprehensive baseline laboratory screening for ${patientName}. All vital hematological parameters within optimal reference thresholds.`,
              tags: ['Blood Work', 'Routine Screening', 'Pathology'],
              abhaLinked: true,
              isIssued: true,
              verifiedBy: 'Dr. Priya Sharma (Reg #KMC-48291)',
              documentNumber: `LAB-${Date.now().toString().slice(-5)}`,
              labResults: [
                { parameter: 'Hemoglobin (Hb)', value: '14.0', unit: 'g/dL', referenceRange: '13.0 - 17.0', status: 'Normal' },
                { parameter: 'Total Leucocyte Count (WBC)', value: '6,600', unit: '/mcL', referenceRange: '4,500 - 11,000', status: 'Normal' },
                { parameter: 'Platelet Count', value: '245,000', unit: '/mcL', referenceRange: '150,000 - 450,000', status: 'Normal' },
                { parameter: 'Fasting Blood Sugar', value: '92', unit: 'mg/dL', referenceRange: '70 - 99', status: 'Normal' },
                { parameter: 'Total Cholesterol', value: '178', unit: 'mg/dL', referenceRange: '< 200', status: 'Normal' },
                { parameter: 'Serum Creatinine', value: '0.88', unit: 'mg/dL', referenceRange: '0.7 - 1.3', status: 'Normal' }
              ]
            },
            {
              id: `REC-${Date.now().toString().slice(-4)}-RX`,
              patientId,
              name: 'Digital E-Prescription — Outpatient Consultation',
              date: nowStr,
              type: 'Prescription',
              doctor: 'Dr. Priya Sharma',
              hospitalOrLab: 'AarogyaLocker Outpatient Care',
              fileSize: '450 KB',
              fileType: 'application/pdf',
              notes: `Clinical Assessment for ${patientName}: Preventive health evaluation and nutritional optimization.`,
              tags: ['Prescription', 'General Medicine', 'Vitamins'],
              abhaLinked: true,
              isIssued: true,
              verifiedBy: 'Dr. Priya Sharma (Reg #KMC-48291)',
              documentNumber: `RX-EHR-${Date.now().toString().slice(-5)}`,
              medicines: [
                { name: 'Multivitamin & Minerals Supplement', dosage: '1 tablet', frequency: 'Once daily after breakfast', duration: '30 days', instructions: 'Take with full glass of water.' },
                { name: 'Vitamin D3 60,000 IU', dosage: '1 capsule', frequency: 'Once weekly', duration: '8 weeks', instructions: 'Take after a milk or food-based meal.' }
              ]
            },
            {
              id: `REC-${Date.now().toString().slice(-4)}-VAC`,
              patientId,
              name: 'Universal COVID-19 & Immunization Certificate',
              date: 'Dec 05, 2025',
              type: 'Vaccination',
              doctor: 'Ministry of Health & Family Welfare',
              hospitalOrLab: 'National Immunization Program (ABDM-COWIN)',
              fileSize: '680 KB',
              fileType: 'application/pdf',
              notes: `Immunization credentials for ${patientName} authenticated through national digital registry.`,
              tags: ['Vaccination', 'COVID-19', 'Govt Certificate'],
              abhaLinked: true,
              isIssued: true,
              verifiedBy: 'NHA & CoWIN Digital Gateway',
              documentNumber: `VAC-IND-${Date.now().toString().slice(-6)}`
            }
          ];

          return [...personalizedRecords, ...prev];
        });
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    const target = DEMO_USERS.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
    }
  };

  // Record actions
  const addRecord = (newRec: Omit<HealthRecord, 'id'>): HealthRecord => {
    const created: HealthRecord = {
      ...newRec,
      id: `REC-${Date.now().toString().slice(-4)}`
    };
    setRecords(prev => [created, ...prev]);
    return created;
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  // Appointment actions
  const bookAppointment = (aptData: Omit<Appointment, 'id' | 'createdAt'>): Appointment => {
    const newApt: Appointment = {
      ...aptData,
      id: `APT-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAppointments(prev => [newApt, ...prev]);
    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const cancelAppointment = (id: string) => {
    updateAppointmentStatus(id, 'Cancelled');
  };

  const addPrescription = (rxData: Omit<PrescriptionItem, 'id'>) => {
    const newRx: PrescriptionItem = {
      ...rxData,
      id: `RX-${Date.now().toString().slice(-4)}`
    };
    setPrescriptions(prev => [newRx, ...prev]);
  };

  const addDoctorNotesAndPrescription = (
    appointmentId: string, 
    notes: string, 
    medicines?: { name: string; dosage: string; duration: string; instructions: string }[]
  ) => {
    const targetApt = appointments.find(a => a.id === appointmentId);
    if (!targetApt) return;

    const medNames = medicines?.map(m => m.name) || [];

    // 1. Update appointment
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return {
          ...a,
          status: 'Completed',
          notes,
          prescriptions: medNames
        };
      }
      return a;
    }));

    // 2. Add to active prescriptions for the patient
    if (medicines && medicines.length > 0) {
      medicines.forEach(m => {
        addPrescription({
          patientId: targetApt.patientId,
          doctorName: targetApt.doctorName,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          medication: m.name,
          dosage: m.dosage,
          duration: m.duration,
          instructions: m.instructions
        });
      });

      // 3. Automatically add to patient's Health Locker as an official digital e-prescription
      addRecord({
        patientId: targetApt.patientId,
        name: `E-Prescription — ${targetApt.doctorName}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        type: 'Prescription',
        doctor: targetApt.doctorName,
        fileSize: '320 KB',
        fileType: 'application/pdf',
        notes: `Clinical Assessment: ${notes}. Prescribed: ${medNames.join(', ')}`,
        tags: ['E-Prescription', targetApt.doctorSpecialty, 'Consultation'],
        abhaLinked: true
      });
    }
  };

  // Pharmacy order creation + Auto-save invoice to AarogyaLocker
  const createPharmacyOrder = (
    orderData: Omit<PharmacyOrder, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>
  ): PharmacyOrder => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const is1mg = orderData.fulfillmentPartner === 'Tata 1mg';
    const estDelivery = is1mg 
      ? 'Today, in 2-3 hours (Tata 1mg Express Hub Mohali)' 
      : 'Today, by 6:00 PM (AarogyaLocker Express Chemist)';
    const trackingUrl = is1mg 
      ? `https://www.1mg.com/order-tracking?orderId=1MG-TRICITY-${orderId}` 
      : undefined;

    const newOrder: PharmacyOrder = {
      ...orderData,
      id: orderId,
      status: 'Processing',
      createdAt: nowStr,
      estimatedDelivery: estDelivery,
      fulfillmentPartner: orderData.fulfillmentPartner || 'AarogyaLocker Direct',
      tata1mgTrackingUrl: trackingUrl
    };

    setPharmacyOrders(prev => [newOrder, ...prev]);

    // Automatically deposit Official Tax Invoice into patient's AarogyaLocker
    const medicinesListSummary = orderData.items
      .map(i => `${i.medicine.name} (Qty: ${i.quantity}, ₹${i.medicine.price * i.quantity})`)
      .join(', ');

    const issuer = is1mg 
      ? 'Tata 1mg Healthcare Solutions (Hub: Sector 82, Mohali)' 
      : 'AarogyaLocker Licensed Digital Pharmacy (DL #DL-2026-9912)';
    const verifier = is1mg 
      ? 'Tata 1mg Verified Pharmacist & ABDM Gateway' 
      : 'AarogyaLocker Pharmacy Authority & ABDM Gateway';

    addRecord({
      patientId: orderData.patientId,
      name: is1mg ? `Tata 1mg Pharmacy Invoice — #${orderId}` : `Pharmacy Tax Invoice — #${orderId}`,
      date: nowStr,
      type: 'Invoice',
      doctor: is1mg ? 'Tata 1mg Chief Dispensing Pharmacist' : 'R. K. Verma (Registered Chief Pharmacist)',
      hospitalOrLab: issuer,
      fileSize: '380 KB',
      fileType: 'application/pdf',
      notes: `Official Itemized GST Medical Invoice. Fulfilled by: ${is1mg ? 'Tata 1mg Express Delivery Hub (Mohali & Chandigarh)' : 'AarogyaLocker Local Partner Network'}. Items: ${medicinesListSummary}. Delivery to: ${orderData.deliveryAddress.fullName}, ${orderData.deliveryAddress.street}, ${orderData.deliveryAddress.city} - ${orderData.deliveryAddress.pincode}. Payment Method: ${orderData.paymentMethod}. Total Paid: ₹${orderData.finalPayable}. ${is1mg ? `Tata 1mg Tracking: 1MG-TRICITY-${orderId}` : ''}`,
      tags: is1mg ? ['Tata 1mg Order', 'Pharmacy Invoice', 'Medication Order', 'GST Verified', orderData.paymentMethod] : ['Pharmacy Invoice', 'Medication Order', 'GST Verified', orderData.paymentMethod],
      abhaLinked: true,
      isIssued: true,
      verifiedBy: verifier,
      documentNumber: is1mg ? `1MG-INV-${orderId}` : `INV-PHARM-${orderId}`
    });

    return newOrder;
  };

  // Lab booking creation + Auto-generate booking receipt & clinical results in AarogyaLocker
  const createLabBooking = (
    bookingData: Omit<LabTestBooking, 'id' | 'createdAt' | 'status' | 'phlebotomistName' | 'reportRecordId'>
  ): LabTestBooking => {
    const bookingId = `LAB-BK-${Date.now().toString().slice(-6)}`;
    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const phlebotomistNames = ['Suresh Verma (ABDM Phlebotomist)', 'Kavita Nair (Senior Pathologist)', 'Rajesh Kumar (Certified Phlebotomist)'];
    const chosenPhleb = phlebotomistNames[Math.floor(Math.random() * phlebotomistNames.length)];

    const testNames = bookingData.tests.map(t => t.name).join(' & ');

    // Compile realistic lab results based on chosen tests
    const defaultLabResults: LabResultEntry[] = [
      { parameter: 'Hemoglobin (Hb)', value: '14.2', unit: 'g/dL', referenceRange: '13.0 - 17.0', status: 'Normal' },
      { parameter: 'Total Leucocyte Count (WBC)', value: '7,100', unit: '/mcL', referenceRange: '4,500 - 11,000', status: 'Normal' },
      { parameter: 'Absolute Platelet Count', value: '260,000', unit: '/mcL', referenceRange: '150,000 - 450,000', status: 'Normal' },
      { parameter: 'Fasting Blood Glucose', value: '94', unit: 'mg/dL', referenceRange: '70 - 99', status: 'Normal' },
      { parameter: 'Total Serum Cholesterol', value: '180', unit: 'mg/dL', referenceRange: '< 200', status: 'Normal' },
      { parameter: 'Serum Creatinine', value: '0.92', unit: 'mg/dL', referenceRange: '0.7 - 1.3', status: 'Normal' },
      { parameter: 'SGPT / Alanine Aminotransferase', value: '31', unit: 'U/L', referenceRange: '< 45', status: 'Normal' },
      { parameter: 'Thyroid Stimulating Hormone (TSH)', value: '2.40', unit: 'uIU/mL', referenceRange: '0.45 - 4.50', status: 'Normal' }
    ];

    // Automatically deposit Official Diagnostic Laboratory Report into patient's AarogyaLocker
    const createdRecord = addRecord({
      patientId: bookingData.patientId,
      name: `Diagnostic Report — ${testNames.slice(0, 48)}${testNames.length > 48 ? '...' : ''}`,
      date: nowStr,
      type: 'Laboratory',
      doctor: 'Dr. Ramesh Gupta, MD (Pathology)',
      hospitalOrLab: 'AarogyaLocker Central NABL & CAP Accredited Pathology Labs',
      fileSize: '1.6 MB',
      fileType: 'application/pdf',
      notes: `Sample collected at home by ${chosenPhleb} on ${bookingData.collectionDate} (${bookingData.timeSlot}). Tests conducted: ${testNames}. High precision automated analysis calibrated to international ISO 15189 standards.`,
      tags: ['Diagnostic Report', 'NABL Accredited', 'Home Sample', bookingData.paymentMethod],
      abhaLinked: true,
      isIssued: true,
      verifiedBy: 'Dr. Ramesh Gupta, MD (Pathology) — Reg #DMC-39104',
      documentNumber: `LAB-REP-${bookingId}`,
      labResults: defaultLabResults
    });

    const newBooking: LabTestBooking = {
      ...bookingData,
      id: bookingId,
      status: 'Confirmed',
      createdAt: nowStr,
      phlebotomistName: chosenPhleb,
      reportRecordId: createdRecord.id
    };

    setLabBookings(prev => [newBooking, ...prev]);

    return newBooking;
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      isLoggedIn: !!currentUser,
      loginAs,
      logout,
      switchRole,
      users: DEMO_USERS,
      records,
      addRecord,
      deleteRecord,
      appointments,
      bookAppointment,
      updateAppointmentStatus,
      addDoctorNotesAndPrescription,
      cancelAppointment,
      prescriptions,
      addPrescription,
      pharmacyMedicines: INITIAL_PHARMACY_MEDICINES,
      pharmacyOrders,
      createPharmacyOrder,
      labPackages: INITIAL_LAB_PACKAGES,
      labBookings,
      createLabBooking,
      geminiApiKey,
      setGeminiApiKey,
      theme,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
