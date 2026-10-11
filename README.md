# AarogyaLocker & CareConnect 🏥🔐
### *A Unified Digital Health Locker & Next-Gen Healthcare Ecosystem*

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.18-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Code Quality](https://img.shields.io/badge/Linter-Oxlint-brightgreen)](https://oxc.rs/)

---

## 📌 Executive Summary

Healthcare data today is fragmented across physical prescription slips, laboratory diagnostic reports, hospital discharge summaries, and separate consultation portals. **AarogyaLocker (CareConnect)** bridges this gap by unifying personal medical records management with comprehensive healthcare services in a single, modern, and accessible web application.

Built for the **CU Hackathon**, the platform combines an **ABHA-ready Digital Health Locker**, multi-role management dashboards (Patient, Doctor, Staff, Administrator), intelligent **AI Health Triage**, doctor discovery and scheduling, teleconsultations, hospital directories, lab test bookings, and online pharmacy fulfillment.

---

## 🚀 Key Modules & System Architecture

### 1. 🔐 Digital Health Locker (`/health-records`)
A centralized, secure digital repository for storing and managing lifetime healthcare records:
- **Categorized Document Management**: Filter documents by *Laboratory*, *Scans & Imaging*, *Prescriptions*, and *Discharge Summaries*.
- **Upload Simulator**: Interactive document upload flow with category tags, doctor attribution, and metadata indexing.
- **ABHA / Universal Patient ID Ready**: Built with interoperability principles inspired by national digital health frameworks.
- **Privacy & Access Control**: Client-side authentication gate ensuring medical records are only accessible to authorized users.

### 2. 👥 Multi-Role Portals & Management Dashboards
A unified `DashboardLayout` provides dedicated portals for every healthcare stakeholder:
- **Patient Dashboard (`/dashboard`)**:
  - Comprehensive health overview displaying patient demographics, vital statistics, and emergency contacts.
  - Active prescriptions, upcoming appointments, and past visit summaries.
- **Doctor / Provider Portal (`/doctor-dashboard`)**:
  - Today's appointment schedule with status indicators (Waiting, Scheduled, Completed).
  - Patient queue management, electronic consultation notes, and schedule adjustment triggers.
- **Hospital Staff Helpdesk (`/staff-dashboard`)**:
  - Reception and triage workflow.
  - Patient Document Lookup simulation by Patient ID (retrieve ECGs, blood panels, and past charts).
- **Platform Administration (`/admin`)**:
  - System-wide analytics: active consultations, doctor verifications, patient satisfaction, and bed availability.
  - Doctor credential verification pipeline.
  - Patient complaints and grievance ticketing system.

### 3. 🩺 Doctor Discovery & Booking Flow (`/doctors`)
- **Real-Time Live Search**: Instant filtering by doctor name, specialty, and clinical focus.
- **Transparent Profiles**: Upfront pricing, years of experience, patient satisfaction ratings, education, and spoken languages.
- **Interactive Booking Modal (`BookingModal.tsx`)**: Slot-based appointment booking across 5 upcoming days with morning and afternoon slots.
- **Doctor Profile Modal (`ProfileModal.tsx`)**: Detailed bio, verified credentials, and instant booking handoff.

### 4. 📹 Teleconsultation & Virtual Care Room (`/consultation`)
- **Virtual Waiting Room**: Queue position indicator ("You are 1st in the queue") for scheduled video consultations.
- **Interactive Call Controls**: Simulated HD video interface with microphone, camera, and in-call text chat controls.
- **Consultation History**: Tabular view of upcoming and past digital consultations with prescription download links.

### 5. 🤖 AI Health Specialist & Global Widget (`/ai-assistant`)
- **AI Family Doctor (v5.0)**: Conversational assistant providing initial symptom triage, precautionary advice, and specialist recommendations.
- **Conversation History Sidebar**: Categorized chat timelines (Today, May, April) for continuous health tracking.
- **Persistent Floating Widget (`AIFloatingWidget.tsx`)**: Accessible from the bottom right of any screen for instant AI guidance without leaving the current workflow.

### 6. 🏥 Hospital & Clinic Directory (`/hospitals`)
- Searchable catalog of accredited hospitals and clinics (e.g., Apollo, Fortis, Max).
- Real-time details on bed capacities, specialty departments, customer ratings, and emergency services.

### 7. 🧪 Diagnostic Lab Tests (`/lab-tests`)
- Comprehensive test catalog: *Complete Blood Count (CBC)*, *Lipid Profile*, *HbA1c Diabetes Screen*, and *Full Body Health Checkups*.
- Home sample collection booking with turnaround time indicators and active cart badge counter.

### 8. 💊 Online Pharmacy & Medicine Ordering (`/pharmacy`)
- Catalog of prescription and OTC medications with dosage details and brand information.
- Interactive cart counter and **Prescription Upload** banner for pharmacy verification.

---

## 🗺️ Application Sitemap & Routes

| Path | Page / Module | Description |
| :--- | :--- | :--- |
| `/` | **Home Page** | Hero search, service categories, How It Works, Trust metrics, and Testimonials. |
| `/doctors` | **Find Doctors** | Filterable doctor directory with Practo-style cards, profile modals, and booking slots. |
| `/dashboard` | **Patient Dashboard** | Personal health hub, vitals, appointments, and medical history. |
| `/health-records` | **Digital Health Locker** | Secure digital storage for lab reports, prescriptions, scans, and discharge notes. |
| `/ai-assistant` | **AI Health Specialist** | Conversational triage, symptom analysis, and healthcare recommendations. |
| `/consultation` | **Online Consultation** | Telehealth video waiting room with call controls and appointment logs. |
| `/hospitals` | **Hospital Directory** | Searchable multi-specialty hospital and clinic directory with bed capacities. |
| `/lab-tests` | **Lab Tests & Diagnostics** | Diagnostic tests catalog with home sample collection booking and shopping cart. |
| `/pharmacy` | **Online Pharmacy** | Medicine catalog, prescription verification upload, and cart management. |
| `/doctor-dashboard`| **Doctor Provider Portal** | Appointment queue, patient roster, and schedule management for clinicians. |
| `/staff-dashboard` | **Staff Helpdesk** | Hospital reception desk, patient record lookup by ID, and facility management. |
| `/admin` | **Platform Admin** | Platform analytics, doctor verification pipeline, and grievance resolution. |

---

## 🎨 UI/UX & Design Philosophy

- **Curated Color System**: Tailored HSL palette consisting of Deep Blue (`#0F3E6D`), Ice Blue (`#EDF4F9`), Vibrant Cyan (`#14B8A6`), Mint Green (`#10B981`), and Crimson (`#EF4444`).
- **Glassmorphism & Micro-Interactions**: Translucent sticky navbars, elevation shadows, smooth scale transitions, and abstract mesh gradient backdrops.
- **Zero Heavy External Icon Libraries**: Fully hand-crafted, lightweight inline SVG icons (`CareConnectLogo`, `SearchIcon`, `LocationIcon`, `StarIcon`, `ShieldIcon`, `CalendarIcon`, `ClockIcon`, etc.) to keep bundle size ultra-compact and lightning fast.
- **Accessibility (a11y)**:
  - Skip-to-main-content link for keyboard and screen-reader accessibility.
  - Proper ARIA attributes (`aria-expanded`, `aria-label`, `role="navigation"`, `role="menubar"`).
  - Focus trapping and `Escape` key handling on all modal overlays.
  - High contrast typography adhering to WCAG standards.

---

## 💻 Tech Stack & Dependencies

- **Frontend Core**: React 19 (`react`, `react-dom`)
- **Language**: TypeScript (`tsc` with strict typing)
- **Routing**: React Router v7 (`react-router-dom`)
- **Build Tool**: Vite 8 with `@vitejs/plugin-react`
- **Linting & Code Quality**: Oxlint (`oxlint`)
- **Styling**: Vanilla CSS with comprehensive CSS custom properties (variables) for maximum flexibility and performance.

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JD-codestar/AarogyaLocker.git
   cd AarogyaLocker
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173) to explore the application.

### Available Scripts

- `npm run dev` — Launches Vite local dev server with Hot Module Replacement (HMR).
- `npm run build` — Typechecks using `tsc -b` and compiles the production bundle.
- `npm run lint` — Runs Oxlint for fast static code analysis.
- `npm run preview` — Locally previews the compiled production build.

---

## 📂 Project Directory Structure

```text
AarogyaLocker/
├── public/                 # Static assets & SVG icons
├── src/
│   ├── assets/             # Images & visual media
│   ├── components/         # Reusable UI components & modals
│   │   ├── AIFloatingWidget.tsx  # Global floating AI assistant
│   │   ├── BookingModal.tsx      # Multi-slot appointment booking dialog
│   │   ├── CTASection.tsx        # Call-to-action banner
│   │   ├── DashboardLayout.tsx   # Sidebar layout for portals
│   │   ├── DoctorCard.tsx        # Practo-style provider card
│   │   ├── Doctors.tsx           # Doctor directory container
│   │   ├── Footer.tsx            # Global footer with link columns
│   │   ├── Hero.tsx              # Homepage hero with dual-field search
│   │   ├── HowItWorks.tsx        # Step-by-step user journey
│   │   ├── Navbar.tsx            # Sticky navbar with auth avatar & mobile menu
│   │   ├── ProfileModal.tsx      # Comprehensive clinician profile modal
│   │   ├── Services.tsx          # Key services showcase cards
│   │   ├── SignInModal.tsx       # Simulated authentication modal
│   │   ├── Testimonials.tsx      # User trust reviews carousel
│   │   └── TrustSection.tsx      # Security & compliance highlights
│   ├── pages/              # Primary application views
│   │   ├── AIAssistant.tsx        # Full-screen conversational AI specialist
│   │   ├── AdminDashboard.tsx     # System administrator control center
│   │   ├── DoctorDashboard.tsx    # Clinician appointment & patient queue
│   │   ├── HealthRecords.tsx      # AarogyaLocker digital health locker
│   │   ├── HospitalDirectory.tsx  # Hospital directory with bed availability
│   │   ├── LabTests.tsx           # Diagnostics catalog & home sample booking
│   │   ├── OnlineConsultation.tsx # Telehealth video room & appointments
│   │   ├── PatientDashboard.tsx   # Patient personal medical overview
│   │   ├── Pharmacy.tsx           # Online pharmacy & prescription upload
│   │   └── StaffDashboard.tsx     # Reception triage & patient lookup
│   ├── App.css             # Main styling, responsive grids, utilities
│   ├── App.tsx             # Route orchestration & global state
│   ├── data.ts             # Demo datasets, doctor profiles & slot generator
│   ├── Icons.tsx           # Self-contained SVG icon library
│   ├── index.css           # Global design system variables & reset
│   └── main.tsx            # App bootstrapping with BrowserRouter
├── .gitignore
├── .oxlintrc.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔒 Security, Compliance & Disclaimer

- **Privacy & Security**: Built with the vision of end-to-end encrypted storage for electronic health records (EHR) and alignment with national digital health architectures (ABDM / ABHA).
- **Medical Disclaimer**: *All doctor profiles, hospital listings, medical records, and AI responses depicted within this prototype are fictional and created solely for demonstration purposes during the CU Hackathon. The AI assistant is an informational triage aid and does not replace professional clinical diagnosis.*

---

## 🏆 CU Hackathon Submission
Developed with passion by **JD-codestar** for the **CU Hackathon**.
