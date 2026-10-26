import React from 'react';
import { Hero } from '../sections/Hero';
import { OurApproach } from '../sections/OurApproach';
import { NumbersSection } from '../sections/NumbersSection';
import { VisionMissionSection } from '../sections/VisionMissionSection';
import { HumanCare } from '../sections/HumanCare';
import { FacilitiesSection } from '../sections/FacilitiesSection';
import { HeartOfSabariSection } from '../sections/HeartOfSabariSection';
import { DoctorsSection } from '../sections/DoctorsSection';
import { PatientExperience } from '../sections/PatientExperience';
import { Footer } from '../sections/Footer';
import { SEO } from '../components/layout/SEO';

export function Home() {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-start selection:bg-neutral-200">
      <SEO 
        title="Sabari Hospitals | Multispeciality Hospital in Sai Baba Colony, Coimbatore"
        description="Visit Sabari Hospitals in Sai Baba Colony, Coimbatore. Explore available medical specialties, doctor information, hospital facilities and appointment options."
        canonicalPath="/"
      />
      <Hero />
      <OurApproach />
      <NumbersSection />
      <VisionMissionSection />
      <HumanCare />
      <FacilitiesSection />
      <HeartOfSabariSection />
      <DoctorsSection />
      <PatientExperience />
      <Footer />
    </div>
  );
}
