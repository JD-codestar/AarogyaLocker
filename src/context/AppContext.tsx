import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  User, 
  UserRole, 
  HealthRecord, 
  Appointment, 
  PrescriptionItem 
} from '../types';

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
    email: 'dr.priya@careconnect.health',
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
    email: 'anita.desai@careconnect.health',
    role: 'staff',
    age: 29,
    gender: 'Female',
    phone: '+91 98222 33445',
    avatar: 'AD'
  },
  {
    id: 'adm-001',
    name: 'Vikram Malhotra',
    email: 'admin@careconnect.health',
    role: 'admin',
    age: 45,
    gender: 'Male',
    phone: '+91 98333 44556',
    avatar: 'VM'
  }
];

const INITIAL_RECORDS: HealthRecord[] = [
  {
    id: 'REC-101',
    patientId: 'pat-101',
    name: 'Complete Blood Count (CBC)',
    date: 'Oct 01, 2026',
    type: 'Laboratory',
    doctor: 'Dr. Priya Sharma',
    fileSize: '1.2 MB',
    fileType: 'application/pdf',
    notes: 'Hemoglobin: 14.2 g/dL, Platelets: 250k. All indicators normal.',
    tags: ['Routine Checkup', 'Blood Work'],
    abhaLinked: true
  },
  {
    id: 'REC-102',
    patientId: 'pat-101',
    name: 'Chest X-Ray (AP View)',
    date: 'Sep 15, 2026',
    type: 'Imaging',
    doctor: 'Dr. Rahul Mehta',
    fileSize: '3.8 MB',
    fileType: 'image/jpeg',
    notes: 'Clear lung fields, cardiac silhouette normal.',
    tags: ['Radiology', 'Lungs'],
    abhaLinked: true
  },
  {
    id: 'REC-103',
    patientId: 'pat-101',
    name: 'E-Prescription - Seasonal Flu',
    date: 'Aug 20, 2026',
    type: 'Prescription',
    doctor: 'Dr. Arjun Patel',
    fileSize: '450 KB',
    fileType: 'application/pdf',
    notes: 'Paracetamol 650mg TDS, Levocetirizine 5mg OD x 5 days.',
    tags: ['Flu', 'Fever', 'Medication'],
    abhaLinked: true
  },
  {
    id: 'REC-104',
    patientId: 'pat-101',
    name: 'Hospital Discharge Summary',
    date: 'Jan 10, 2026',
    type: 'Discharge',
    doctor: 'Apollo Specialty Hospital',
    fileSize: '2.4 MB',
    fileType: 'application/pdf',
    notes: 'Admitted for acute gastroenteritis. Discharged stable.',
    tags: ['In-Patient', 'Discharge'],
    abhaLinked: true
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
  
  // Gemini AI Key
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // 1. User Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('aarogya_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEMO_USERS[0]; // Default logged-in as Rahul Sharma (Patient)
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

  // 5. Gemini API Key
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => {
    return localStorage.getItem('aarogya_gemini_key') || '';
  });

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

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem('aarogya_gemini_key', key);
  };

  // Auth actions
  const loginAs = (userOrRole: User | UserRole) => {
    if (typeof userOrRole === 'string') {
      const match = DEMO_USERS.find(u => u.role === userOrRole);
      if (match) setCurrentUser(match);
    } else {
      setCurrentUser(userOrRole);
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
      geminiApiKey,
      setGeminiApiKey
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
