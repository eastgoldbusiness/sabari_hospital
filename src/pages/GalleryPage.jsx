import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Footer } from '../sections/Footer';
import InfiniteSpiral from '../components/ui/InfiniteSpiral';
import { SEO } from '../components/layout/SEO';

// Only authentic Sabari Hospital photographs (all AI generated images removed)
const ALL_WEBSITE_IMAGES = [
  // Hospital Campus & External Architecture
  { src: '/hero_image.png', alt: 'Sabari Multispeciality Hospital Main Campus', title: 'Sabari Multispeciality Hospital Main Campus' },
  { src: '/gallery/image-5.png', alt: 'Hospital Main Entrance & 24/7 Facade', title: 'Hospital Main Entrance & 24/7 Facade' },
  { src: '/hero/image-10.png', alt: 'Hospital Main Entrance', title: 'Hospital Main Entrance' },

  // Hospital Ceremonies, Doctors & Healthcare Team
  { src: '/hero/image-13.png', alt: 'Hospital Opening Ceremony', title: 'Hospital Opening Ceremony' },
  { src: '/hero/image-28.png', alt: 'Lamp Lighting Ceremony', title: 'Lamp Lighting Ceremony' },
  { src: '/gallery/image-28.png', alt: 'Dr. Saravana Kumar, Dr. Rashmi & Nursing Care Team', title: 'Dr. Saravana Kumar, Dr. Rashmi & Nursing Care Team' },
  { src: '/gallery/image-29.png', alt: 'Dr. Mangaleswari & Dr. Saravana Kumar with Family & Patients', title: 'Dr. Mangaleswari & Dr. Saravana Kumar with Family & Patients' },
  { src: '/gallery/image-30.png', alt: 'Medical Specialists & Family in Consultation Suite', title: 'Medical Specialists & Family in Consultation Suite' },
  { src: '/gallery/image-31.png', alt: 'Dr. Deepika Mohankumar PT & Family at Hospital Inauguration', title: 'Dr. Deepika Mohankumar PT & Family at Hospital Inauguration' },
  { src: '/gallery/image-32.png', alt: 'Dr. Rashmi in Outpatient Consultation Chamber', title: 'Dr. Rashmi in Outpatient Consultation Chamber' },
  { src: '/hero/image-17.png', alt: 'Dedicated Nursing & Patient Care Team', title: 'Dedicated Nursing & Patient Care Team' },

  // Clinical Facilities, Operation Theatre & Consultation Rooms
  { src: '/hero/image-16.png', alt: 'Critical Care & Patient Recovery Infrastructure', title: 'Critical Care & Patient Recovery Infrastructure' },
  { src: '/gallery/image-18.png', alt: 'Consultation Room 4 - Dr. R. Rashmi', title: 'Consultation Room 4 - Dr. R. Rashmi' },
  { src: '/gallery/image-19.png', alt: 'Consultant Gynecologist & Urologist Chambers', title: 'Consultant Gynecologist & Urologist Chambers' },
  { src: '/gallery/image-20.png', alt: 'Specialist Consultation Suites', title: 'Specialist Consultation Suites' },
  { src: '/gallery/image-21.png', alt: 'Outpatient Consultation Room', title: 'Outpatient Consultation Room' },
  { src: '/gallery/image-22.png', alt: 'Doctor Consultation Chamber', title: 'Doctor Consultation Chamber' },
  { src: '/gallery/image-23.png', alt: 'In-House Pharmacy Counter', title: 'In-House Pharmacy Counter' },
  { src: '/gallery/image-24.png', alt: 'Main Hospital Reception Desk', title: 'Main Hospital Reception Desk' },
  { src: '/gallery/image-25.png', alt: 'Outpatient Waiting Lounge', title: 'Outpatient Waiting Lounge' },
  { src: '/gallery/image-26.png', alt: 'Hospital Consultants Directory Board', title: 'Hospital Consultants Directory Board' },
  { src: '/gallery/image-27.png', alt: 'Inpatient Ward Corridor & Consultation Chambers', title: 'Inpatient Ward Corridor & Consultation Chambers' },

  // Hospital Leadership & Medical Specialists
  { src: '/dr-mangaleswari.png', alt: 'Dr. Mangaleswari - Founder & Consultant Gynecologist', title: 'Dr. Mangaleswari - Founder & Consultant Gynecologist' },
  { src: '/dr-saravana-kumar.png', alt: 'Dr. Saravana Kumar S - Managing Director & Surgeon', title: 'Dr. Saravana Kumar S - Managing Director & Surgeon' },
  { src: '/rashmi.png', alt: 'Dr. Rashmi Saravanakumar - General Physician & Diabetologist', title: 'Dr. Rashmi Saravanakumar - General Physician & Diabetologist' },
  { src: '/doctors/doctor-4.png', alt: 'Dr. Deepika Mohankumar PT - Physiotherapy Specialist', title: 'Dr. Deepika Mohankumar PT - Physiotherapy Specialist' },
  { src: '/doctors/doctor-5.png', alt: 'Dr. Uthara Vijai Kumar - Pulmonologist', title: 'Dr. Uthara Vijai Kumar - Pulmonologist' },
  { src: '/doctors/dr-deepika.png', alt: 'Dr. Deepika - Obstetrician & Gynaecologist', title: 'Dr. Deepika - Obstetrician & Gynaecologist' },
  { src: '/doctors/dr-rishikesh-gowtham.png', alt: 'Dr. G. Rishikesh Gowtham - General, Laparoscopic & Robotic Surgeon', title: 'Dr. G. Rishikesh Gowtham - General, Laparoscopic & Robotic Surgeon' }
];

export function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [spiralConfig, setSpiralConfig] = useState({
    radius: 220,
    cardWidth: 175,
    cardHeight: 155,
    verticalSpacing: 75,
    perspective: 1050,
    cardsPerTurn: 7,
    edgeBlur: 4
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const updateConfig = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile phones: ultra-lightweight, 60fps zero-blur
        setSpiralConfig({
          radius: 120,
          cardWidth: 110,
          cardHeight: 95,
          verticalSpacing: 50,
          perspective: 800,
          cardsPerTurn: 6,
          edgeBlur: 0
        });
      } else if (width < 1024) {
        // Tablet / Small Laptop
        setSpiralConfig({
          radius: 170,
          cardWidth: 135,
          cardHeight: 120,
          verticalSpacing: 60,
          perspective: 950,
          cardsPerTurn: 7,
          edgeBlur: 0
        });
      } else {
        // Standard & Large Desktop
        setSpiralConfig({
          radius: 220,
          cardWidth: 175,
          cardHeight: 155,
          verticalSpacing: 75,
          perspective: 1050,
          cardsPerTurn: 7,
          edgeBlur: 4
        });
      }
    };

    updateConfig();
    window.addEventListener('resize', updateConfig);
    return () => window.removeEventListener('resize', updateConfig);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#111827] text-white flex flex-col justify-between selection:bg-neutral-800">
      <SEO 
        title="Hospital Gallery | Sabari Hospitals Coimbatore"
        description="View the hospital photo gallery of Sabari Hospitals in Coimbatore. Tour our modern operation theatres, consultation chambers, patient wards, and campus facilities."
        canonicalPath="/gallery"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' }
        ]}
      />
      
      {/* 
        Full Page InfiniteSpiral Section
        Takes full height below navbar (88px desktop / 72px mobile)
      */}
      <section className="relative w-full h-[calc(100dvh-72px)] sm:h-[calc(100vh-88px)] min-h-[600px] mt-[72px] sm:mt-[88px] overflow-hidden bg-[#111827]">
        {/* Visible Primary Page Heading & Context Overlay */}
        <div className="absolute top-6 sm:top-10 left-6 sm:left-12 lg:left-16 z-10 pointer-events-none max-w-xl">
          <span className="text-[11px] sm:text-[12px] font-mono tracking-[0.24em] uppercase text-[#00A99D] font-semibold mb-2 block">
            SABARI HOSPITALS COIMBATORE
          </span>
          <h1 className="text-[28px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.08] tracking-[-0.02em] text-white">
            HOSPITAL GALLERY
          </h1>
          <p className="text-[13px] sm:text-[15px] text-white/70 font-light mt-1.5 hidden sm:block">
            Tour the clinical infrastructure, patient rooms, and facilities at Sabari Hospitals in Coimbatore.
          </p>
        </div>
        
        {/* Ambient Top Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00A99D]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* InfiniteSpiral 3D Stage */}
        <div className="w-full h-full relative overflow-hidden">
          <InfiniteSpiral
            items={ALL_WEBSITE_IMAGES}
            animationMode="auto"
            speed={0.55}
            radius={spiralConfig.radius}
            cardWidth={spiralConfig.cardWidth}
            cardHeight={spiralConfig.cardHeight}
            verticalSpacing={spiralConfig.verticalSpacing}
            perspective={spiralConfig.perspective}
            cardRadius={12}
            centerScale={1.22}
            edgeBlur={spiralConfig.edgeBlur}
            cardsPerTurn={spiralConfig.cardsPerTurn}
            pauseOnHover={false}
            direction="up"
            rotation={0}
            cardTilt={0}
            edgeFade={0.35}
            imageFit="cover"
            grayscale={0}
            onItemClick={(item) => setSelectedImage(item)}
          />
        </div>
      </section>

      {/* Image Lightbox Inspection Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#0e0e18] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-black/95 text-white/90 hover:text-white border border-white/20 transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image */}
              <div className="w-full max-h-[80vh] flex flex-col items-center justify-center p-2">
                <img
                  src={selectedImage.src || selectedImage.image}
                  alt={selectedImage.title || selectedImage.alt || 'Hospital Gallery'}
                  className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
                />
                {(selectedImage.title || selectedImage.alt) && (
                  <p className="mt-3 text-[14px] text-white/80 font-medium text-center">
                    {selectedImage.title || selectedImage.alt}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial Content & Facilities Architecture Guide */}
      <section className="w-full bg-[#0c101c] py-16 sm:py-24 px-6 lg:px-16 border-t border-white/10">
        <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div className="max-w-2xl">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#00A99D] mb-3 block">
                CAMPUS OVERVIEW
              </span>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-medium text-white tracking-tight leading-tight">
                Modern Medical Infrastructure in Sai Baba Colony.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-white/70 font-light leading-relaxed mt-3">
                Located on NSR Road, Sabari Hospitals combines over 50 years of clinical experience with purpose-built medical infrastructure designed for safety, precision, and patient comfort.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Link 
                to="/doctors"
                className="px-5 py-3 border border-white/20 hover:border-white text-white text-[12px] font-semibold tracking-wider uppercase transition-colors"
              >
                Explore Doctors &rarr;
              </Link>
              <Link 
                to="/book-appointment"
                className="px-6 py-3 bg-[#00A99D] hover:bg-[#009287] text-white text-[12px] font-semibold tracking-wider uppercase transition-colors"
              >
                Book Appointment &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[14px]">
            <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#00A99D] tracking-wider uppercase block mb-2">01 // SURGICAL SUITES</span>
                <h3 className="text-lg font-semibold text-white mb-2">Operating Theatres</h3>
                <p className="text-white/60 font-light leading-relaxed">
                  Advanced operating suites equipped with laminar airflow, surgical monitoring, and anaesthesia safety protocols.
                </p>
              </div>
              <Link to="/about/our-story" className="mt-4 text-[12px] text-[#00A99D] hover:underline uppercase tracking-wider font-semibold">
                About Our Care &rarr;
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#00A99D] tracking-wider uppercase block mb-2">02 // CRITICAL CARE</span>
                <h3 className="text-lg font-semibold text-white mb-2">24/7 Emergency &amp; ICU</h3>
                <p className="text-white/60 font-light leading-relaxed">
                  Intensive care units and round-the-clock emergency care with continuous vital monitoring and ambulance response.
                </p>
              </div>
              <Link to="/contact" className="mt-4 text-[12px] text-[#00A99D] hover:underline uppercase tracking-wider font-semibold">
                Emergency &amp; Location &rarr;
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#00A99D] tracking-wider uppercase block mb-2">03 // CONSULTATIONS</span>
                <h3 className="text-lg font-semibold text-white mb-2">Specialist Chambers</h3>
                <p className="text-white/60 font-light leading-relaxed">
                  Dedicated outpatient consulting rooms for obstetrics, gynaecology, surgery, diabetes, pulmonology, and physiotherapy.
                </p>
              </div>
              <Link to="/doctors" className="mt-4 text-[12px] text-[#00A99D] hover:underline uppercase tracking-wider font-semibold">
                Meet Specialists &rarr;
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#00A99D] tracking-wider uppercase block mb-2">04 // PATIENT CARE</span>
                <h3 className="text-lg font-semibold text-white mb-2">Pharmacy &amp; Diagnostics</h3>
                <p className="text-white/60 font-light leading-relaxed">
                  Fully stocked in-house pharmacy, clinical diagnostic laboratories, and patient-first reception coordination.
                </p>
              </div>
              <Link to="/book-appointment" className="mt-4 text-[12px] text-[#00A99D] hover:underline uppercase tracking-wider font-semibold">
                Schedule Visit &rarr;
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Hospital Footer */}
      <Footer />
    </div>
  );
}
export default GalleryPage;
