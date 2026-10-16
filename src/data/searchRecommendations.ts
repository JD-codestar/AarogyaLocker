export interface SearchRecommendation {
  id: string;
  title: string;
  subtitle: string;
  category: 'specialist' | 'hospital' | 'symptom' | 'lab_test' | 'medicine';
  icon: string;
  query: string;
  badge: string;
  targetUrl?: string;
}

export const TRENDING_SEARCHES: SearchRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Cardiologist in Chandigarh & Mohali',
    subtitle: 'Heart specialists, ECG, Angioplasty & Cardiac consultations',
    category: 'specialist',
    icon: '❤️',
    query: 'Cardiologist',
    badge: 'Popular Specialist',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-2',
    title: 'PGIMER Chandigarh (Sector 12)',
    subtitle: 'Apex Level-1 Trauma Centre, 2200 beds, Cardiology & Oncology',
    category: 'hospital',
    icon: '🏥',
    query: 'PGIMER',
    badge: 'Apex Hospital',
    targetUrl: '/hospitals'
  },
  {
    id: 'rec-3',
    title: 'Fortis Hospital Mohali (Sector 62)',
    subtitle: 'JCI Accredited Cardiac Sciences, Neuro & Joint Replacements',
    category: 'hospital',
    icon: '🏥',
    query: 'Fortis Hospital Mohali',
    badge: 'Top Hospital',
    targetUrl: '/hospitals'
  },
  {
    id: 'rec-4',
    title: 'Chest Pain or Shortness of Breath',
    subtitle: 'Urgent symptom triage, cardiologist review & cardiac tests',
    category: 'symptom',
    icon: '⚠️',
    query: 'Chest pain',
    badge: 'Symptom Triage',
    targetUrl: '/ai-assistant'
  },
  {
    id: 'rec-5',
    title: 'Complete Blood Count (CBC) with ESR',
    subtitle: '28 vital hematological parameters, free home sample pickup',
    category: 'lab_test',
    icon: '🧪',
    query: 'Complete Blood Count',
    badge: 'Lab Test',
    targetUrl: '/lab-tests'
  },
  {
    id: 'rec-6',
    title: 'Gynecologist & Pregnancy Care',
    subtitle: 'Maternal health, ultrasound & prenatal reviews at GMCH-32',
    category: 'specialist',
    icon: '🤰',
    query: 'Obstetrician & Gynecologist',
    badge: 'Specialist',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-7',
    title: 'Max Super Speciality Hospital Mohali',
    subtitle: 'Comprehensive cancer institute, robotic surgery, Phase 6',
    category: 'hospital',
    icon: '🏥',
    query: 'Max Super Speciality Hospital',
    badge: 'Top Hospital',
    targetUrl: '/hospitals'
  },
  {
    id: 'rec-8',
    title: 'Orthopedic & Joint Replacement Surgeon',
    subtitle: 'Robotic knee/hip replacements & sports ligament injury clinic',
    category: 'specialist',
    icon: '🦴',
    query: 'Orthopedic Surgeon',
    badge: 'Specialist',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-9',
    title: 'HbA1c & Fasting Diabetes Test',
    subtitle: '90-day average blood glucose & glycemic appraisal',
    category: 'lab_test',
    icon: '🩸',
    query: 'HbA1c',
    badge: 'Lab Test',
    targetUrl: '/lab-tests'
  },
  {
    id: 'rec-10',
    title: 'Dolo 650mg & Fever Medicines',
    subtitle: 'Genuine paracetamol, antipyretics & rapid doorstep delivery',
    category: 'medicine',
    icon: '💊',
    query: 'Dolo 650mg',
    badge: 'Pharmacy',
    targetUrl: '/pharmacy'
  }
];

export const ALL_SEARCH_ITEMS: SearchRecommendation[] = [
  ...TRENDING_SEARCHES,
  {
    id: 'rec-11',
    title: 'Dr. Manmohanjit Singh (PGIMER)',
    subtitle: 'Head of Interventional Cardiology, Sector 12 Chandigarh',
    category: 'specialist',
    icon: '👨‍⚕️',
    query: 'Dr. Manmohanjit Singh',
    badge: 'Doctor',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-12',
    title: 'Dr. Gurpreet Singh (Fortis Mohali)',
    subtitle: 'Chief Cardiac Surgeon (CTVS), Sector 62 Mohali',
    category: 'specialist',
    icon: '👨‍⚕️',
    query: 'Dr. Gurpreet Singh',
    badge: 'Doctor',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-13',
    title: 'Dr. Simranjeet Kaur (GMCH-32)',
    subtitle: 'Senior Consultant Obstetrician & Gynecologist, Chandigarh',
    category: 'specialist',
    icon: '👩‍⚕️',
    query: 'Dr. Simranjeet Kaur',
    badge: 'Doctor',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-14',
    title: 'Dr. Raman Abrol (Max Mohali)',
    subtitle: 'Senior Consultant ENT & Head-Neck Surgeon, Phase 6 Mohali',
    category: 'specialist',
    icon: '👨‍⚕️',
    query: 'Dr. Raman Abrol',
    badge: 'Doctor',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-15',
    title: 'Dr. Harshdeep Singh Sandhu (Ivy Hospital)',
    subtitle: 'Robotic Joint Replacement & Spine Specialist, Sector 71 Mohali',
    category: 'specialist',
    icon: '👨‍⚕️',
    query: 'Dr. Harshdeep Singh Sandhu',
    badge: 'Doctor',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-16',
    title: 'Dr. Neha Grewal (Mukat Hospital)',
    subtitle: 'Dermatologist & Cosmetologist, Sector 34A Chandigarh',
    category: 'specialist',
    icon: '👩‍⚕️',
    query: 'Dr. Neha Grewal',
    badge: 'Doctor',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-17',
    title: 'Dr. Ravinder Pal Singh (Healing Hospital)',
    subtitle: 'Senior Neurologist & Stroke Specialist, Sector 34A Chandigarh',
    category: 'specialist',
    icon: '👨‍⚕️',
    query: 'Dr. Ravinder Pal Singh',
    badge: 'Doctor',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-18',
    title: 'Dr. Amandeep Kaur Brar (Sohana Hospital)',
    subtitle: 'Pediatrician & Neonatologist, Sector 77 Mohali',
    category: 'specialist',
    icon: '👩‍⚕️',
    query: 'Dr. Amandeep Kaur Brar',
    badge: 'Doctor',
    targetUrl: '/doctors'
  },
  {
    id: 'rec-19',
    title: 'GMCH-32 (Government Medical College & Hospital)',
    subtitle: 'Sector 32B Chandigarh — 960 beds, 24x7 Emergency & Trauma',
    category: 'hospital',
    icon: '🏥',
    query: 'GMCH',
    badge: 'Hospital',
    targetUrl: '/hospitals'
  },
  {
    id: 'rec-20',
    title: 'Mukat Hospital & Heart Institute',
    subtitle: 'Sector 34A Chandigarh — Interventional cardiology & critical care',
    category: 'hospital',
    icon: '🏥',
    query: 'Mukat Hospital',
    badge: 'Hospital',
    targetUrl: '/hospitals'
  },
  {
    id: 'rec-21',
    title: 'Healing Hospital Sector 34 Chandigarh',
    subtitle: 'Tertiary care, neurosciences, orthopedics & laparoscopic surgery',
    category: 'hospital',
    icon: '🏥',
    query: 'Healing Hospital',
    badge: 'Hospital',
    targetUrl: '/hospitals'
  },
  {
    id: 'rec-22',
    title: 'Ivy Hospital Sector 71 Mohali',
    subtitle: 'Cancer institute, cardiology, kidney transplant & dialysis',
    category: 'hospital',
    icon: '🏥',
    query: 'Ivy Hospital',
    badge: 'Hospital',
    targetUrl: '/hospitals'
  },
  {
    id: 'rec-23',
    title: 'Sohana Super Speciality Hospital Mohali',
    subtitle: 'Sector 77 Mohali — Eye care, cancer center & joint replacements',
    category: 'hospital',
    icon: '🏥',
    query: 'Sohana Hospital',
    badge: 'Hospital',
    targetUrl: '/hospitals'
  },
  {
    id: 'rec-24',
    title: 'Eden Critical Care Hospital Chandigarh',
    subtitle: 'Industrial Area Phase 1 — Intensive care, trauma & emergency',
    category: 'hospital',
    icon: '🏥',
    query: 'Eden Critical Care',
    badge: 'Hospital',
    targetUrl: '/hospitals'
  },
  {
    id: 'rec-25',
    title: 'Lipid Heart Risk Profile Test',
    subtitle: 'Cholesterol, HDL, LDL, Triglycerides evaluation in 12 hours',
    category: 'lab_test',
    icon: '🔬',
    query: 'Lipid Profile',
    badge: 'Lab Test',
    targetUrl: '/lab-tests'
  },
  {
    id: 'rec-26',
    title: 'Comprehensive Full Body Checkup (64 Parameters)',
    subtitle: 'CBC, Liver, Kidney, Lipid, Sugar & Urine complete screening',
    category: 'lab_test',
    icon: '🔬',
    query: 'Full Body Checkup',
    badge: 'Health Package',
    targetUrl: '/lab-tests'
  },
  {
    id: 'rec-27',
    title: 'Thyroid Profile Total (T3, T4, TSH)',
    subtitle: 'Hormonal thyroid dysfunction screening with fast report',
    category: 'lab_test',
    icon: '🔬',
    query: 'Thyroid Profile',
    badge: 'Lab Test',
    targetUrl: '/lab-tests'
  },
  {
    id: 'rec-28',
    title: 'Augmentin 625 Duo Tablet',
    subtitle: 'Broad-spectrum antibiotic for bacterial & chest infections',
    category: 'medicine',
    icon: '💊',
    query: 'Augmentin 625',
    badge: 'Pharmacy',
    targetUrl: '/pharmacy'
  },
  {
    id: 'rec-29',
    title: 'Fever, Shivering & Body Aches',
    subtitle: 'Symptom checker, viral flu guidance & physician booking',
    category: 'symptom',
    icon: '🌡️',
    query: 'Fever and body ache',
    badge: 'Symptom Triage',
    targetUrl: '/ai-assistant'
  },
  {
    id: 'rec-30',
    title: 'Severe Migraine or One-Sided Headache',
    subtitle: 'Neurological symptom evaluation, triggers & pain relief',
    category: 'symptom',
    icon: '🤕',
    query: 'Migraine headache',
    badge: 'Symptom Triage',
    targetUrl: '/ai-assistant'
  }
];

export function getSearchRecommendations(query: string): SearchRecommendation[] {
  if (!query || !query.trim()) {
    return TRENDING_SEARCHES.slice(0, 8);
  }

  const q = query.toLowerCase().trim();
  const matched = ALL_SEARCH_ITEMS.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.query.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  if (matched.length > 0) {
    return matched.slice(0, 8);
  }

  // Fallback: provide smart dynamic query suggestions based on query
  return [
    {
      id: `dyn-spec-${q}`,
      title: `Search Specialists for "${query}"`,
      subtitle: `Find verified doctors matching "${query}" in Chandigarh & Mohali`,
      category: 'specialist',
      icon: '👨‍⚕️',
      query: query,
      badge: 'Find Doctors',
      targetUrl: '/doctors'
    },
    {
      id: `dyn-hosp-${q}`,
      title: `Search Hospitals for "${query}"`,
      subtitle: `Explore top hospitals & OPD facilities with bed telemetry`,
      category: 'hospital',
      icon: '🏥',
      query: query,
      badge: 'Hospitals',
      targetUrl: '/hospitals'
    },
    {
      id: `dyn-ai-${q}`,
      title: `Ask AI Doctor about "${query}"`,
      subtitle: `Get instant clinical triage & differential diagnoses from Family Doctor AI`,
      category: 'symptom',
      icon: '✨',
      query: query,
      badge: 'AI Triage',
      targetUrl: '/ai-assistant'
    },
    {
      id: `dyn-lab-${q}`,
      title: `Find Lab Tests for "${query}"`,
      subtitle: `Book home sample collection for diagnostic evaluations`,
      category: 'lab_test',
      icon: '🧪',
      query: query,
      badge: 'Lab Test',
      targetUrl: '/lab-tests'
    }
  ];
}
