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

export type RecordCategory = 'Laboratory' | 'Imaging' | 'Prescription' | 'Discharge' | 'Vaccination' | 'IdentityCard' | 'Invoice';

export interface MedicineEntry {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface LabResultEntry {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'Normal' | 'High' | 'Low' | 'Attention';
}

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
  isIssued?: boolean; // Issued by government / hospital / lab vs self-uploaded
  hospitalOrLab?: string;
  medicines?: MedicineEntry[];
  labResults?: LabResultEntry[];
  verifiedBy?: string;
  documentNumber?: string;
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

// --- Pharmacy Types ---
export interface PharmacyMedicine {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  type: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Ointment' | 'Drops';
  dosage: string;
  category: 'All' | 'Antibiotics' | 'Pain Relief' | 'Diabetes' | 'Cardiac' | 'Vitamins & Supplements' | 'Respiratory' | 'Gastrointestinal';
  prescriptionRequired: boolean;
  inStock: boolean;
  description: string;
  composition: string;
  packSize: string;
  rating: number;
  reviewsCount: number;
  tata1mgUrl?: string;
}

export interface PharmacyCartItem {
  medicine: PharmacyMedicine;
  quantity: number;
}

export interface PharmacyOrder {
  id: string;
  patientId: string;
  patientName: string;
  items: PharmacyCartItem[];
  totalMrp: number;
  discount: number;
  deliveryFee: number;
  finalPayable: number;
  deliveryAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
  prescriptionRecordId?: string;
  fulfillmentPartner?: 'Tata 1mg' | 'AarogyaLocker Direct';
  tata1mgTrackingUrl?: string;
  status: 'Processing' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
  estimatedDelivery: string;
}

// --- Lab Test Types ---
export interface LabTestPackage {
  id: string;
  name: string;
  category: 'Blood Test' | 'Heart Health' | 'Diabetes' | 'Health Package' | 'Thyroid' | 'Kidney & Liver';
  price: number;
  mrp: number;
  reportTime: string;
  fastingRequired: boolean;
  fastingHours?: number;
  sampleType: string;
  description: string;
  testCount: number;
  parameters: string[];
  popular?: boolean;
}

export interface LabTestBooking {
  id: string;
  patientId: string;
  patientName: string;
  tests: LabTestPackage[];
  collectionDate: string;
  timeSlot: string;
  address: string;
  phone: string;
  totalAmount: number;
  paymentMethod: string;
  status: 'Confirmed' | 'Sample Collected' | 'Report Generated';
  createdAt: string;
  phlebotomistName: string;
  reportRecordId?: string;
}
