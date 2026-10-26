import React, { useState } from 'react';
import { Preloader } from './components/ui/Preloader';
import { Navbar } from './components/navbar/Navbar';
import { AppointmentProvider } from './context/AppointmentContext';
import { AppointmentModal } from './components/appointment/AppointmentModal';

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { DoctorProfile } from './pages/DoctorProfile';
import { DoctorsDirectory } from './pages/DoctorsDirectory';
import { OurStory } from './pages/about/OurStory';
import { Leadership } from './pages/about/Leadership';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <AppointmentProvider>
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      <Navbar />

      <AppointmentModal />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorsDirectory />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        
        {/* About Us Destination Pages & Aliases */}
        <Route path="/about" element={<Navigate to="/about/our-story" replace />} />
        <Route path="/about-us" element={<Navigate to="/about/our-story" replace />} />
        <Route path="/about/our-story" element={<OurStory />} />
        <Route path="/about/leadership" element={<Leadership />} />
        <Route path="/about/why-sabari" element={<Navigate to="/about/our-story" replace />} />
        <Route path="/about/accreditations" element={<Navigate to="/about/our-story" replace />} />
        <Route path="/about/patient-experience" element={<Navigate to="/about/our-story" replace />} />
        <Route path="/about/careers" element={<Navigate to="/about/our-story" replace />} />

        {/* Removed COE redirects */}
        <Route path="/centre-of-excellence" element={<Navigate to="/doctors" replace />} />
        <Route path="/centre-of-excellence/*" element={<Navigate to="/doctors" replace />} />
        <Route path="/centres-of-excellence" element={<Navigate to="/doctors" replace />} />

        {/* Gallery & Facilities */}
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/facilities" element={<Navigate to="/gallery" replace />} />
        <Route path="/facilities/*" element={<Navigate to="/gallery" replace />} />

        {/* Contact Us Experience */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact-us" element={<Navigate to="/contact" replace />} />

        {/* Book Appointment Experience */}
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/appointment" element={<Navigate to="/book-appointment" replace />} />
        <Route path="/appointments" element={<Navigate to="/book-appointment" replace />} />

        {/* Legal & Compliance Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
      </Routes>
      </AppointmentProvider>
    </Router>
  );
}

export default App;
