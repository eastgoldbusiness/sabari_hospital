// Sabari Hospitals Contact Experience Data

export const contactData = {
  hero: {
    eyebrow: "SABARI HOSPITALS / CONTACT",
    titleLine1: "WE'RE HERE",
    titleLine2: "WHEN YOU",
    titleLine3: "NEED US.",
    supportingText: "For appointments, patient support, general enquiries and assistance, reach the Sabari Hospitals team.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1400",
    imageAlt: "Sabari Hospitals serene reception atrium with natural daylight and stone concierge desk",
    caption: "CENTRAL RECEPTION & PATIENT CONCIERGE ATRIUM"
  },

  information: {
    sectionTitle: "GET IN TOUCH",
    description: "Our patient relations executives and clinical coordinators are stationed to assist you with transparent consultations, admissions, and family guidance.",
    channels: [
      {
        label: "PHONE",
        primary: "0422-2442200",
        secondary: "Mon – Sat, 8:00 AM – 8:00 PM IST",
        action: "CALL US →",
        href: "tel:+914222442200"
      },
      {
        label: "EMAIL",
        primary: "sabarimultispecialityhospital@gmail.com",
        secondary: "Direct patient & administrative enquiries",
        action: "EMAIL US →",
        href: "mailto:sabarimultispecialityhospital@gmail.com"
      },
      {
        label: "CAMPUS ADDRESS",
        primary: "167/1, NSR Road, Saibaba Colony",
        secondary: "Coimbatore, Tamil Nadu — 641011",
        action: "GET DIRECTIONS →",
        href: "https://www.google.com/maps/search/?api=1&query=Sabari+Hospital+167%2F1+NSR+Road+Saibaba+Colony+Coimbatore+641011"
      },
      {
        label: "24/7 EMERGENCY",
        primary: "0422-2442200",
        secondary: "Dedicated emergency & trauma response desk",
        action: "EMERGENCY HOTLINE →",
        href: "tel:+914222442200",
        isEmergency: true
      }
    ]
  },

  support: {
    title: "PATIENT SUPPORT",
    copy: "Need help before, during or after your visit? Our team is available to guide you.",
    services: [
      {
        id: "patient-support",
        title: "Patient Support Desk",
        description: "Assistance with room reservations, language interpretation, insurance pre-authorization, and personal care guides.",
        actionLabel: "Contact Support Desk →",
        type: "support"
      },
      {
        id: "patient-feedback",
        title: "Patient Feedback & Experience",
        description: "Your voice shapes our clinical standards. Share your observations, compliments, or suggestions directly with hospital administration.",
        actionLabel: "Submit Feedback →",
        type: "feedback"
      },
      {
        id: "appointment-assistance",
        title: "Appointment Assistance",
        description: "Direct liaison to connect you with the appropriate medical specialty, diagnostic timing, and pre-consultation preparations.",
        actionLabel: "Book Appointment →",
        href: "/contact",
        type: "appointment"
      }
    ]
  },

  location: {
    title: "FIND SABARI",
    address: "167/1, NSR Road, Saibaba Colony, Coimbatore, Tamil Nadu — 641011",
    landmark: "Opposite Church Road, Near Indian Overseas Bank, Saibaba Colony",
    timings: [
      { label: "Outpatient Services (OPD)", hours: "08:00 AM – 08:00 PM (Monday – Saturday)" },
      { label: "Emergency & Trauma Bay", hours: "24 Hours / 7 Days a Week" },
      { label: "Diagnostic Imaging & Labs", hours: "24 Hours Service" },
      { label: "Inpatient Visiting Hours", hours: "11:00 AM – 01:00 PM & 05:00 PM – 07:00 PM" }
    ],
    parking: "Patient and attendant parking available on-site with ground-level wheelchair accessibility."
  },

  emergency: {
    title: "NEED IMMEDIATE CARE?",
    supportingText: "For acute medical emergencies, contact our 24/7 helpline immediately or proceed to our emergency triage on NSR Road.",
    phone: "0422-2442200",
    actionText: "EMERGENCY CONTACT →"
  },

  careers: {
    title: "WORK WITH SABARI",
    text: "Explore opportunities to contribute to compassionate, high-quality healthcare.",
    ctaText: "CONTACT US →",
    href: "/contact"
  }
};
