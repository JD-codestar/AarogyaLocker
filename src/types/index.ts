export type UserRole = 'patient' | 'doctor' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  abhaId?: string;
  age?: number;
  gender?: string;
  phone?: string;
  avatar?: string;
  specialty?: string;
}

export type RecordCategory = 'Laboratory' | 'Imaging' | 'Prescription' | 'Discharge' | 'Vaccination';

export interface HealthRecord {
  id: string;
  patientId: string;
  name: string;
  date: string;
  type: RecordCategory;
  doctor: string;
  fileSize: string;
  fileType: string;
  fileData?: string; // base64 or mock preview
  notes?: string;
  tags?: string[];
  abhaLinked: boolean;
}

export type AppointmentStatus = 'Waiting' | 'Scheduled' | 'In Consultation' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  consultationType: 'In-person' | 'Video Consultation';
  fee: number;
  status: AppointmentStatus;
  notes?: string;
  prescriptions?: string[];
  createdAt: string;
}

export interface PrescriptionItem {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  medication: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  triageData?: {
    urgency: 'Low / Self-care' | 'Moderate' | 'Urgent';
    possibleCauses: string[];
    precautions: string[];
    recommendedSpecialist: string;
  };
}
