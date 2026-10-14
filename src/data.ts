/**
 * data.ts — Demo data for AarogyaLocker
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
  location?: string;
  hospitalAffiliation?: string;
  city?: 'Chandigarh' | 'Mohali';
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

// --- Verified Doctors ---

export const doctors: Doctor[] = [
  // --- Chandigarh Doctors ---
  {
    id: 'doc-chd-1',
    name: 'Dr. Manmohanjit Singh',
    specialty: 'Senior Cardiologist & Interventionalist',
    experience: '22 years experience',
    rating: 4.9,
    reviewCount: 680,
    fee: 900,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Lead interventional cardiologist with extensive expertise in coronary angioplasty, pacemaker implantations, and complex cardiac diagnostics at PGIMER.',
    education: 'MBBS, MD (Medicine), DM (Cardiology) — PGIMER Chandigarh',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'MS',
    location: 'Sector 12, Chandigarh',
    hospitalAffiliation: 'PGIMER Chandigarh',
    city: 'Chandigarh'
  },
  {
    id: 'doc-chd-2',
    name: 'Dr. Simranjeet Kaur',
    specialty: 'Obstetrician & Gynecologist',
    experience: '16 years experience',
    rating: 4.8,
    reviewCount: 540,
    fee: 700,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Specialist in high-risk pregnancies, maternal-fetal wellness, laparoscopic gynecological surgery, and women reproductive health.',
    education: 'MBBS, MS (Obstetrics & Gynecology) — GMCH-32 Chandigarh',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'SK',
    location: 'Sector 32, Chandigarh',
    hospitalAffiliation: 'GMCH-32 Chandigarh',
    city: 'Chandigarh'
  },
  {
    id: 'doc-chd-3',
    name: 'Dr. Ravinder Pal Singh',
    specialty: 'Neurologist & Neuro-Physician',
    experience: '19 years experience',
    rating: 4.9,
    reviewCount: 430,
    fee: 1000,
    availability: 'Available Tomorrow',
    consultationType: 'In-person & Video',
    bio: 'Expert clinical neurologist diagnosing epilepsy, stroke prevention, migraine disorders, Parkinsonism, and neuromuscular ailments.',
    education: 'MBBS, MD (Medicine), DM (Neurology) — AIIMS & PGIMER',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'RS',
    location: 'Sector 34A, Chandigarh',
    hospitalAffiliation: 'Healing Hospital Chandigarh',
    city: 'Chandigarh'
  },
  {
    id: 'doc-chd-4',
    name: 'Dr. Neha Grewal',
    specialty: 'Dermatologist & Cosmetologist',
    experience: '11 years experience',
    rating: 4.8,
    reviewCount: 390,
    fee: 650,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Specialized in clinical dermatology, acne therapies, laser treatments, eczema management, and advanced aesthetic skin care.',
    education: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    languages: ['English', 'Hindi', 'Punjabi'],
    initials: 'NG',
    location: 'Sector 34A, Chandigarh',
    hospitalAffiliation: 'Mukat Hospital Chandigarh',
    city: 'Chandigarh'
  },
  {
    id: 'doc-chd-5',
    name: 'Dr. Ananya Sood',
    specialty: 'Endocrinologist & Diabetologist',
    experience: '14 years experience',
    rating: 4.8,
    reviewCount: 460,
    fee: 850,
    availability: 'Available Tomorrow',
    consultationType: 'Video Only',
    bio: 'Leading specialist in hormonal imbalance management, thyroid nodules, Gestational Diabetes, and comprehensive metabolic syndrome.',
    education: 'MBBS, MD, DM (Endocrinology) — PGIMER Chandigarh',
    languages: ['English', 'Hindi', 'Punjabi'],
    initials: 'AS',
    location: 'Sector 12, Chandigarh',
    hospitalAffiliation: 'PGIMER Chandigarh',
    city: 'Chandigarh'
  },
  {
    id: 'doc-chd-6',
    name: 'Dr. Tanya Verma',
    specialty: 'General Physician & Critical Care',
    experience: '13 years experience',
    rating: 4.7,
    reviewCount: 310,
    fee: 550,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Dedicated primary care physician with expertise in fever evaluation, hypertension management, infectious diseases, and post-operative recovery.',
    education: 'MBBS, DNB (Internal Medicine)',
    languages: ['English', 'Hindi', 'Punjabi'],
    initials: 'TV',
    location: 'Industrial Area Phase 1, Chandigarh',
    hospitalAffiliation: 'Eden Critical Care Hospital',
    city: 'Chandigarh'
  },

  // --- Mohali Doctors ---
  {
    id: 'doc-moh-1',
    name: 'Dr. Gurpreet Singh',
    specialty: 'Chief Cardiac Surgeon (CTVS)',
    experience: '24 years experience',
    rating: 4.9,
    reviewCount: 820,
    fee: 1200,
    availability: 'Available Tomorrow',
    consultationType: 'In-person & Video',
    bio: 'Pioneering cardiac surgeon renowned for minimally invasive valve repairs, adult CABG bypass procedures, and aortic aneurysm management.',
    education: 'MBBS, MS (General Surgery), MCh (Cardio-Thoracic Surgery)',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'GS',
    location: 'Sector 62, Phase 8, Mohali',
    hospitalAffiliation: 'Fortis Hospital Mohali',
    city: 'Mohali'
  },
  {
    id: 'doc-moh-2',
    name: 'Dr. Raman Abrol',
    specialty: 'ENT & Head-Neck Surgeon',
    experience: '17 years experience',
    rating: 4.8,
    reviewCount: 510,
    fee: 800,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Comprehensive otorhinolaryngology specialist performing endoscopic sinus surgeries, cochlear implant evaluations, and sleep apnea procedures.',
    education: 'MBBS, MS (Otorhinolaryngology - ENT)',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'RA',
    location: 'Phase VI, Mohali',
    hospitalAffiliation: 'Max Super Speciality Hospital Mohali',
    city: 'Mohali'
  },
  {
    id: 'doc-moh-3',
    name: 'Dr. Harshdeep Singh Sandhu',
    specialty: 'Orthopedic & Joint Replacement Surgeon',
    experience: '18 years experience',
    rating: 4.9,
    reviewCount: 640,
    fee: 900,
    availability: 'Available Today',
    consultationType: 'In-person Only',
    bio: 'Expert in robotic total knee and hip replacements, arthroscopic ligament reconstructions, complex fracture fixation, and spine health.',
    education: 'MBBS, MS (Orthopedics), Fellowship in Joint Replacement (Germany)',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'HS',
    location: 'Sector 71, Mohali',
    hospitalAffiliation: 'Ivy Hospital Mohali',
    city: 'Mohali'
  },
  {
    id: 'doc-moh-4',
    name: 'Dr. Amandeep Kaur Brar',
    specialty: 'Pediatrician & Neonatologist',
    experience: '12 years experience',
    rating: 4.9,
    reviewCount: 470,
    fee: 600,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Compassionate child health specialist handling infant development assessments, pediatric infectious diseases, asthma, and childhood immunizations.',
    education: 'MBBS, MD (Pediatrics), Fellowship in Neonatology',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'AB',
    location: 'Sector 77, Sohana, Mohali',
    hospitalAffiliation: 'Sohana Super Speciality Hospital',
    city: 'Mohali'
  },
  {
    id: 'doc-moh-5',
    name: 'Dr. Jaspreet Singh Batra',
    specialty: 'Pulmonologist & Sleep Medicine',
    experience: '15 years experience',
    rating: 4.8,
    reviewCount: 380,
    fee: 850,
    availability: 'Available Tomorrow',
    consultationType: 'In-person & Video',
    bio: 'Specializing in chronic bronchitis, asthma, post-COVID lung fibrosis, allergic rhinitis, bronchoscopy, and polysomnography sleep analysis.',
    education: 'MBBS, MD (Pulmonary Medicine), FCCP',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'JB',
    location: 'Sector 62, Phase 8, Mohali',
    hospitalAffiliation: 'Fortis Hospital Mohali',
    city: 'Mohali'
  },
  {
    id: 'doc-moh-6',
    name: 'Dr. Bikramjit Singh',
    specialty: 'Laparoscopic & Gastro Surgeon',
    experience: '16 years experience',
    rating: 4.7,
    reviewCount: 330,
    fee: 800,
    availability: 'Next Available: Mon',
    consultationType: 'In-person Only',
    bio: 'Specialist in minimally invasive gall bladder surgery, hernia repair, colorectal surgery, and advanced diagnostic endoscopy.',
    education: 'MBBS, MS (Surgery), FIAGES',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'BS',
    location: 'Sector 69, Mohali',
    hospitalAffiliation: 'Grecian Super Speciality Hospital',
    city: 'Mohali'
  },

  // --- Additional Top Specialists from Chandigarh & Mohali Hospitals ---
  {
    id: 'doc-chd-7',
    name: 'Dr. Rajiv Singla',
    specialty: 'Senior Nephrologist & Renal Transplant Specialist',
    experience: '20 years experience',
    rating: 4.9,
    reviewCount: 510,
    fee: 1000,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Renowned clinical nephrologist handling complex kidney failure, dialysis care, and kidney transplant programs at PGIMER.',
    education: 'MBBS, MD (Medicine), DM (Nephrology) — PGIMER Chandigarh',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'RS',
    location: 'Sector 12, Chandigarh',
    hospitalAffiliation: 'PGIMER Chandigarh',
    city: 'Chandigarh'
  },
  {
    id: 'doc-chd-8',
    name: 'Dr. Vineet Mahajan',
    specialty: 'Chief General & Laparoscopic Surgeon',
    experience: '18 years experience',
    rating: 4.8,
    reviewCount: 420,
    fee: 750,
    availability: 'Available Tomorrow',
    consultationType: 'In-person Only',
    bio: 'Expert in advanced minimal access hernia repairs, gall bladder stones removal, and gastrointestinal surgical interventions.',
    education: 'MBBS, MS (General Surgery) — GMCH Chandigarh',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'VM',
    location: 'Sector 32, Chandigarh',
    hospitalAffiliation: 'GMCH-32 Chandigarh',
    city: 'Chandigarh'
  },
  {
    id: 'doc-moh-7',
    name: 'Dr. R. K. Jaswal',
    specialty: 'Director — Interventional Cardiology',
    experience: '28 years experience',
    rating: 5.0,
    reviewCount: 1120,
    fee: 1300,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Pioneer in transradial interventional cardiology with over 30,000 successful coronary angiographies and angioplasties at Fortis Mohali.',
    education: 'MBBS, MD, DM (Cardiology), FACC, FSCAI',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'RJ',
    location: 'Sector 62, Phase 8, Mohali',
    hospitalAffiliation: 'Fortis Hospital Mohali',
    city: 'Mohali'
  },
  {
    id: 'doc-moh-8',
    name: 'Dr. Sachin Gupta',
    specialty: 'Director — Medical Oncology & Cancer Care',
    experience: '16 years experience',
    rating: 4.9,
    reviewCount: 590,
    fee: 1100,
    availability: 'Available Tomorrow',
    consultationType: 'In-person & Video',
    bio: 'Senior oncologist specializing in targeted immunotherapies, precision chemotherapy, and comprehensive cancer care protocols.',
    education: 'MBBS, MD, DM (Medical Oncology) — Max Mohali',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'SG',
    location: 'Phase VI, Mohali',
    hospitalAffiliation: 'Max Super Speciality Hospital Mohali',
    city: 'Mohali'
  },
  {
    id: 'doc-moh-9',
    name: 'Dr. Raka Kaushal',
    specialty: 'Director — Nephrology & Kidney Care',
    experience: '23 years experience',
    rating: 4.9,
    reviewCount: 680,
    fee: 1050,
    availability: 'Available Today',
    consultationType: 'In-person & Video',
    bio: 'Foremost authority on acute renal management, chronic kidney disease stages, and successful kidney transplant follow-ups.',
    education: 'MBBS, MD, DM (Nephrology) — Ivy Hospital',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'RK',
    location: 'Sector 71, Mohali',
    hospitalAffiliation: 'Ivy Hospital Mohali',
    city: 'Mohali'
  },
  {
    id: 'doc-moh-10',
    name: 'Dr. Gagandeep Singh',
    specialty: 'Chief Vitreo-Retinal & Eye Surgeon',
    experience: '17 years experience',
    rating: 4.8,
    reviewCount: 530,
    fee: 850,
    availability: 'Available Today',
    consultationType: 'In-person Only',
    bio: 'Specialist in diabetic retinopathy, retinal detachment surgery, advanced cataract surgery, and laser eye treatments.',
    education: 'MBBS, MS (Ophthalmology), FVR (Vitreo-Retina)',
    languages: ['English', 'Punjabi', 'Hindi'],
    initials: 'GS',
    location: 'Sector 77, Sohana, Mohali',
    hospitalAffiliation: 'Sohana Super Speciality Hospital',
    city: 'Mohali'
  }
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
  { label: 'Consultation', href: '/consultation' },
  { label: 'Hospitals', href: '/hospitals' },
  { label: 'Lab Tests', href: '/lab-tests' },
  { label: 'Pharmacy', href: '/pharmacy' },
];

