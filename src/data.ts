/**
 * data.ts — Demo data for CareConnect
 *
 * This file holds all the sample data used on the homepage.
 * Everything here is fictional and clearly labelled.
 * No real patient or doctor information is used.
 */

// --- Types ---

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviewCount: number;
  fee: number;
  availability: 'Available Today' | 'Available Tomorrow' | 'Next Available: Mon';
  consultationType: 'In-person & Video' | 'Video Only' | 'In-person Only';
  bio: string;
  education: string;
  languages: string[];
  initials: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
  href: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

// --- Demo Doctors ---

export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    specialty: 'General Physician',
    experience: '12 years experience (sample)',
    rating: 4.8,
    reviewCount: 340,
    fee: 500,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Experienced in general medicine, preventive care, and chronic disease management. This is a fictional profile for demonstration purposes.',
    education: 'MBBS, MD (Internal Medicine) — Sample Credentials',
    languages: ['English', 'Hindi'],
    initials: 'PS',
  },
  {
    id: 'doc-2',
    name: 'Dr. Arjun Patel',
    specialty: 'Cardiologist',
    experience: '18 years experience (sample)',
    rating: 4.9,
    reviewCount: 520,
    fee: 1200,
    availability: 'Available Tomorrow',
    consultationType: 'In-person & Video',
    bio: 'Specializes in cardiovascular health, heart disease prevention, and cardiac rehabilitation. This is a fictional profile for demonstration purposes.',
    education: 'MBBS, DM (Cardiology) — Sample Credentials',
    languages: ['English', 'Hindi', 'Gujarati'],
    initials: 'AP',
  },
  {
    id: 'doc-3',
    name: 'Dr. Kavitha Nair',
    specialty: 'Dermatologist',
    experience: '9 years experience (sample)',
    rating: 4.7,
    reviewCount: 280,
    fee: 800,
    availability: 'Available Today',
    consultationType: 'Video Only',
    bio: 'Focused on skin health, cosmetic dermatology, and treatment of skin conditions. This is a fictional profile for demonstration purposes.',
    education: 'MBBS, MD (Dermatology) — Sample Credentials',
    languages: ['English', 'Malayalam'],
    initials: 'KN',
  },
  {
    id: 'doc-4',
    name: 'Dr. Rahul Mehta',
    specialty: 'Orthopedic Surgeon',
    experience: '15 years experience (sample)',
    rating: 4.6,
    reviewCount: 190,
    fee: 1000,
    availability: 'Next Available: Mon',
    consultationType: 'In-person Only',
    bio: 'Expert in joint replacement, sports injuries, and musculoskeletal disorders. This is a fictional profile for demonstration purposes.',
    education: 'MBBS, MS (Orthopedics) — Sample Credentials',
    languages: ['English', 'Hindi'],
    initials: 'RM',
  },
];

// --- Services ---

export const services: Service[] = [
  {
    id: 'svc-1',
    title: 'Instant Video Consultation',
    description: 'Connect within 60 secs',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    bgColor: '#A0C4E2', // Light blue
    href: '#services',
  },
  {
    id: 'svc-2',
    title: 'Find Doctors Near You',
    description: 'Confirmed appointments',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    bgColor: '#89C2C5', // Teal
    href: '#doctors',
  },
  {
    id: 'svc-3',
    title: 'Lab Tests',
    description: 'Safe and trusted lab tests',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80',
    bgColor: '#C5C1F0', // Light purple
    href: '#how-it-works',
  },
  {
    id: 'svc-4',
    title: 'Surgeries',
    description: 'Safe and trusted surgery centers',
    image: 'https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&w=400&q=80',
    bgColor: '#C5C9D4', // Grey
    href: '#how-it-works',
  },
];

// --- How It Works Steps ---

export const steps: Step[] = [
  {
    number: 1,
    title: 'Search for a Doctor',
    description: 'Browse our directory of healthcare professionals by specialty, name, or location.',
  },
  {
    number: 2,
    title: 'Choose an Appointment',
    description: 'Pick a date and time that works for you from available consultation slots.',
  },
  {
    number: 3,
    title: 'Booking Confirmed',
    description: 'Receive instant confirmation with all your appointment details ready to go.',
  },
];

// --- Testimonials ---

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'The booking process was incredibly smooth. I found a specialist within minutes and had my appointment confirmed right away. Very convenient!',
    name: 'Ananya R.',
    role: 'Sample testimonial — not a real patient endorsement',
    initials: 'AR',
  },
  {
    id: 'test-2',
    quote: 'I appreciate how transparent the doctor profiles are. Being able to see experience, ratings, and fees upfront helped me make an informed decision.',
    name: 'Vikram S.',
    role: 'Sample testimonial — not a real patient endorsement',
    initials: 'VS',
  },
  {
    id: 'test-3',
    quote: 'The video consultation feature is a lifesaver for quick follow-ups. No need to travel to the clinic for every visit. Highly recommend trying it.',
    name: 'Meera K.',
    role: 'Sample testimonial — not a real patient endorsement',
    initials: 'MK',
  },
];

// --- Booking Slots (Sample) ---

export interface BookingDate {
  label: string;     // e.g. "Today"
  day: string;       // e.g. "Mon"
  date: string;      // e.g. "Oct 10"
  fullDate: string;  // e.g. "Monday, October 10, 2026"
}

export interface BookingTime {
  label: string;     // e.g. "10:00 AM"
  available: boolean;
}

export function getBookingDates(): BookingDate[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const result: BookingDate[] = [];
  const now = new Date();

  for (let i = 0; i < 5; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    result.push({
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[d.getDay()],
      day: days[d.getDay()],
      date: `${months[d.getMonth()]} ${d.getDate()}`,
      fullDate: `${fullDays[d.getDay()]}, ${fullMonths[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
    });
  }

  return result;
}

export function getBookingTimes(): BookingTime[] {
  return [
    { label: '9:00 AM', available: true },
    { label: '9:30 AM', available: true },
    { label: '10:00 AM', available: true },
    { label: '10:30 AM', available: false },
    { label: '11:00 AM', available: true },
    { label: '11:30 AM', available: true },
    { label: '2:00 PM', available: true },
    { label: '2:30 PM', available: true },
    { label: '3:00 PM', available: false },
    { label: '3:30 PM', available: true },
    { label: '4:00 PM', available: true },
    { label: '4:30 PM', available: true },
  ];
}

// --- Navigation Links ---

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Find Doctors', href: '/doctors' },
  { label: 'Health Locker', href: '/health-records' },
  { label: 'Hospitals', href: '/hospitals' },
  { label: 'Lab Tests', href: '/lab-tests' },
  { label: 'Pharmacy', href: '/pharmacy' },
];

