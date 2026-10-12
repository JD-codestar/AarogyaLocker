/**
 * App.tsx — Main application component for CareConnect.
 *
 * This file wires all the page sections together and manages
 * the application's shared state and routing.
 */
import { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { useApp } from './context/AppContext';

// Data
import { doctors as allDoctors } from './data';
import type { Doctor } from './data';

// Components (each section of the homepage)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Doctors from './components/Doctors';
import HowItWorks from './components/HowItWorks';
import TrustSection from './components/TrustSection';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Modals
import BookingModal from './components/BookingModal';
import ProfileModal from './components/ProfileModal';
import SignInModal from './components/SignInModal';
import AIFloatingWidget from './components/AIFloatingWidget';

// Pages
import PatientDashboard from './pages/PatientDashboard';
import HealthRecords from './pages/HealthRecords';
import AIAssistant from './pages/AIAssistant';
import StaffDashboard from './pages/StaffDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DashboardLayout from './components/DashboardLayout';
import HospitalDirectory from './pages/HospitalDirectory';
import LabTests from './pages/LabTests';
import Pharmacy from './pages/Pharmacy';
import OnlineConsultation from './pages/OnlineConsultation';

function App() {
  const navigate = useNavigate();

  // --- State ---
  const { isLoggedIn } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [_searchLocation, setSearchLocation] = useState('');
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [profileDoctor, setProfileDoctor] = useState<Doctor | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);

  // --- Filter doctors based on search ---
  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) return allDoctors;
    const q = searchQuery.toLowerCase();
    return allDoctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(q) ||
        doc.specialty.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // --- Event Handlers ---
  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    navigate('/doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchLocation('');
  };

  const handleFindDoctor = () => {
    navigate('/doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProfile = (doctor: Doctor) => {
    setProfileDoctor(doctor);
  };

  const handleBook = (doctor: Doctor) => {
    setBookingDoctor(doctor);
  };

  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  return (
    <>
      <div id="top" style={{ position: 'absolute', top: 0 }} />
      {/* Skip-to-content link for keyboard users */}
      <a href="#main-content" className="sr-only" style={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}>
        Skip to main content
      </a>

      <Navbar onSignIn={handleSignIn} isLoggedIn={isLoggedIn} />

      <main id="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Hero onSearch={handleSearch} />
              <Services />
              <HowItWorks />
              <TrustSection />
              <Testimonials />
              <CTASection onFindDoctor={handleFindDoctor} />
            </>
          } />
          
          <Route path="/doctors" element={
            <div style={{ paddingTop: 'var(--space-8)' }}>
              <Doctors
                doctors={filteredDoctors}
                searchQuery={searchQuery}
                onClearSearch={handleClearSearch}
                onViewProfile={handleViewProfile}
                onBook={handleBook}
              />
            </div>
          } />

          <Route path="/dashboard" element={
            <DashboardLayout>
              <PatientDashboard isLoggedIn={isLoggedIn} onSignInClick={handleSignIn} />
            </DashboardLayout>
          } />

          <Route path="/health-records" element={
            <DashboardLayout>
              <HealthRecords isLoggedIn={isLoggedIn} onSignInClick={handleSignIn} />
            </DashboardLayout>
          } />

          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/hospitals" element={<HospitalDirectory />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/consultation" element={
            <DashboardLayout links={[{ name: 'My Consultations', path: '/consultation' }]}>
              <OnlineConsultation />
            </DashboardLayout>
          } />

          <Route path="/staff-dashboard" element={
            <DashboardLayout links={[
              { name: 'Helpdesk Overview', path: '/staff-dashboard' },
              { name: 'Patient Directory', path: '/staff-dashboard' },
              { name: 'Facility Reports', path: '/staff-dashboard' }
            ]}>
              <StaffDashboard isLoggedIn={isLoggedIn} onSignInClick={handleSignIn} />
            </DashboardLayout>
          } />

          <Route path="/doctor-dashboard" element={
            <DashboardLayout links={[
              { name: 'Provider Portal', path: '/doctor-dashboard' },
              { name: 'My Schedule', path: '/doctor-dashboard' },
              { name: 'Patients', path: '/doctor-dashboard' }
            ]}>
              <DoctorDashboard isLoggedIn={isLoggedIn} onSignInClick={handleSignIn} />
            </DashboardLayout>
          } />

          <Route path="/admin" element={
            <DashboardLayout links={[
              { name: 'Platform Overview', path: '/admin' },
              { name: 'User Management', path: '/admin' },
              { name: 'Doctor Verification', path: '/admin' },
              { name: 'Complaints', path: '/admin' }
            ]}>
              <AdminDashboard isLoggedIn={isLoggedIn} onSignInClick={handleSignIn} />
            </DashboardLayout>
          } />
        </Routes>
      </main>

      <Footer />

      {/* --- Modals --- */}
      {bookingDoctor && (
        <BookingModal
          doctor={bookingDoctor}
          onClose={() => setBookingDoctor(null)}
        />
      )}

      {profileDoctor && (
        <ProfileModal
          doctor={profileDoctor}
          onClose={() => setProfileDoctor(null)}
          onBook={(doc) => {
            setProfileDoctor(null);
            // Small delay so the profile closes before booking opens
            setTimeout(() => setBookingDoctor(doc), 200);
          }}
        />
      )}

      {showSignInModal && (
        <SignInModal 
          onClose={() => setShowSignInModal(false)} 
          onLoginSuccess={() => {
            setShowSignInModal(false);
          }}
        />
      )}

      <AIFloatingWidget />
    </>
  );
}

export default App;
