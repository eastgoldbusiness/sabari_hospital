import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Footer } from '../sections/Footer';
import { SEO } from '../components/layout/SEO';
import { departmentOptions } from '../data/appointmentData';
import { useAppointment } from '../context/AppointmentContext';

const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

export function BookAppointmentPage() {
  const { openAppointmentModal } = useAppointment();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [values, setValues] = useState({
    fullName: '',
    gender: '',
    age: '',
    phone: '',
    email: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const selectedDeptObj = departmentOptions.find((d) => d.name === values.department);
  const doctorList = selectedDeptObj ? selectedDeptObj.doctors : [];

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ('fullName' in fieldValues) {
      if (!fieldValues.fullName.trim()) {
        temp.fullName = 'Full name is required';
      } else if (fieldValues.fullName.trim().length < 2) {
        temp.fullName = 'Name must be at least 2 characters';
      } else {
        delete temp.fullName;
      }
    }

    if ('phone' in fieldValues) {
      const raw = (fieldValues.phone || '').trim().replace(/\D/g, '');
      if (!raw) {
        temp.phone = 'Mobile number is required';
      } else if (raw.length !== 10) {
        temp.phone = 'Mobile number must be exactly 10 digits';
      } else if (!/^[6-9]\d{9}$/.test(raw)) {
        temp.phone = 'Mobile number must start with 6, 7, 8, or 9';
      } else {
        delete temp.phone;
      }
    }

    if ('department' in fieldValues) {
      if (!fieldValues.department) {
        temp.department = 'Please select a department';
      } else {
        delete temp.department;
      }
    }

    if ('date' in fieldValues) {
      if (!fieldValues.date) {
        temp.date = 'Please pick a preferred date';
      } else {
        delete temp.date;
      }
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextVal = value;
    if (name === 'phone') {
      nextVal = value.replace(/\D/g, '').slice(0, 10);
    }
    setValues((prev) => {
      const updated = { ...prev, [name]: nextVal };
      if (name === 'department') {
        updated.doctor = '';
      }
      return updated;
    });
    if (touched[name]) {
      validate({ [name]: nextVal });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate({ [name]: values[name] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      department: true,
      date: true,
    });

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Unable to submit your appointment request.');
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try calling 0422-2442200 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-nav-theme="light" className="w-full min-h-screen bg-white text-black selection:bg-neutral-200">
      <SEO 
        title="Book an Appointment | Sabari Hospitals Coimbatore"
        description="Book a doctor consultation or appointment at Sabari Hospitals Coimbatore. Schedule visits across gynaecology, surgery, diabetes, pulmonology, and critical care."
        canonicalPath="/book-appointment"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://sabarihospital.in/book-appointment#webpage",
          "name": "Book an Appointment - Sabari Hospitals",
          "description": "Online appointment request and doctor consultation scheduling for Sabari Hospitals in Coimbatore.",
          "url": "https://sabarihospital.in/book-appointment",
          "mainEntity": {
            "@type": "Hospital",
            "name": "Sabari Hospitals",
            "telephone": "+91-422-2442200",
            "url": "https://sabarihospital.in/"
          }
        }}
      />

      {/* Hero Header */}
      <section className="w-full pt-28 pb-12 sm:pt-36 sm:pb-16 px-6 lg:px-16 border-b border-neutral-200 bg-white">
        <div className="max-w-[1600px] w-full mx-auto">
          <div className="flex flex-col max-w-5xl">
            <span className="text-[12px] font-mono font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-4 sm:mb-6 block">
              PATIENT SERVICES
            </span>
            <h1 className="text-[34px] sm:text-[54px] md:text-[68px] lg:text-[80px] font-medium leading-[1.05] tracking-[-0.03em] break-words text-black mb-6">
              BOOK AN APPOINTMENT.
            </h1>
            <p className="text-[16px] sm:text-[18px] lg:text-[21px] text-neutral-600 leading-relaxed max-w-3xl font-light">
              Schedule a consultation with our experienced clinical specialists across obstetrics, general & laparoscopic surgery, diabetes, pulmonology, and rehabilitation at Sabari Hospitals in Coimbatore.
            </p>
          </div>
        </div>
      </section>

      {/* Main Appointment Section */}
      <section className="w-full py-16 lg:py-24 px-6 lg:px-16">
        <div className="max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Direct Helpline & Emergency notice */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="p-8 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col gap-6">
              <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 block">
                IMMEDIATE ASSISTANCE
              </span>
              
              <div>
                <p className="text-[12px] font-mono tracking-wider uppercase text-neutral-500 mb-1">Direct Hospital Helpline</p>
                <a href="tel:+914222442200" className="text-2xl sm:text-3xl font-medium text-black hover:text-[#0B4A8B] transition-colors inline-block font-mono">
                  0422-2442200
                </a>
              </div>

              <div>
                <p className="text-[12px] font-mono tracking-wider uppercase text-neutral-500 mb-1">WhatsApp Coordination</p>
                <a 
                  href="https://wa.me/919443335152" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-black hover:text-[#25D366] transition-colors inline-flex items-center gap-2 font-mono"
                >
                  <span>+91 94433 35152</span>
                  <span>&rarr;</span>
                </a>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <p className="text-[12px] font-mono tracking-wider uppercase text-neutral-500 mb-1">Location</p>
                <p className="text-neutral-700 font-light text-base leading-relaxed">
                  Sabari Multispeciality Hospital<br />
                  Coimbatore, Tamil Nadu, India
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
                <strong>Emergency Notice:</strong> If you are experiencing acute trauma, chest pain, or emergency symptoms, please call our 24/7 Helpline immediately or visit the Sabari Hospital Emergency Department directly.
              </div>

              <button
                type="button"
                onClick={() => openAppointmentModal()}
                className="w-full py-4 bg-black text-white text-[12px] font-semibold tracking-widest uppercase rounded-xl hover:bg-neutral-800 transition-all text-center cursor-pointer shadow-sm"
              >
                Launch Pop-up Booking Form
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                EXPLORE MEDICAL SPECIALISTS
              </span>
              <Link 
                to="/doctors" 
                className="inline-flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl hover:border-black transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-black">Meet Our Doctors & Surgeons</p>
                  <p className="text-xs text-neutral-500 font-light">View qualifications, bios, and consulting hours</p>
                </div>
                <ArrowRight size={18} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-black transition-all" />
              </Link>
            </div>
          </div>

          {/* Right Column: In-Page Consultation Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 bg-white rounded-2xl border border-neutral-200 shadow-sm">
              <h2 className="text-2xl font-medium text-black mb-2 tracking-tight">
                Request a Consultation
              </h2>
              <p className="text-neutral-500 font-light text-sm mb-8">
                Fill in your details below and our hospital patient coordination desk will confirm your appointment schedule.
              </p>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-medium text-black mb-2">Request Received</h3>
                  <p className="text-neutral-600 font-light max-w-md mb-6 leading-relaxed">
                    Thank you, <strong className="text-black">{values.fullName}</strong>. Your consultation request has been received. Our reception team will contact you shortly to confirm your visit.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setValues({
                        fullName: '',
                        gender: '',
                        age: '',
                        phone: '',
                        email: '',
                        department: '',
                        doctor: '',
                        date: '',
                        time: '',
                        reason: '',
                      });
                    }}
                    className="px-6 py-3 bg-black text-white text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-neutral-800 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                      {submitError}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block text-[12px] font-mono tracking-wider uppercase text-neutral-600 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Anand Kumar"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors"
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[12px] font-mono tracking-wider uppercase text-neutral-600 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors"
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-mono tracking-wider uppercase text-neutral-600 mb-2">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* Department & Doctor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[12px] font-mono tracking-wider uppercase text-neutral-600 mb-2">
                        Department / Speciality *
                      </label>
                      <select
                        name="department"
                        value={values.department}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
                      >
                        <option value="">Select Department</option>
                        {departmentOptions.map((dept) => (
                          <option key={dept.name} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      {touched.department && errors.department && (
                        <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-mono tracking-wider uppercase text-neutral-600 mb-2">
                        Preferred Consulting Doctor
                      </label>
                      <select
                        name="doctor"
                        value={values.doctor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!doctorList.length}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors bg-white disabled:bg-neutral-100 disabled:text-neutral-400"
                      >
                        <option value="">
                          {doctorList.length ? 'Any available specialist' : 'Select a department first'}
                        </option>
                        {doctorList.map((doc) => (
                          <option key={doc} value={doc}>
                            {doc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[12px] font-mono tracking-wider uppercase text-neutral-600 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        min={todayISO()}
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
                      />
                      {touched.date && errors.date && (
                        <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-mono tracking-wider uppercase text-neutral-600 mb-2">
                        Preferred Time of Day
                      </label>
                      <select
                        name="time"
                        value={values.time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors bg-white"
                      >
                        <option value="">Any time</option>
                        <option value="Morning (09:00 AM – 01:00 PM)">Morning (09:00 AM – 01:00 PM)</option>
                        <option value="Afternoon (01:00 PM – 05:00 PM)">Afternoon (01:00 PM – 05:00 PM)</option>
                        <option value="Evening (05:00 PM – 08:30 PM)">Evening (05:00 PM – 08:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Reason for Visit */}
                  <div>
                    <label className="block text-[12px] font-mono tracking-wider uppercase text-neutral-600 mb-2">
                      Reason for Consultation / Symptoms Summary
                    </label>
                    <textarea
                      name="reason"
                      rows={3}
                      value={values.reason}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Brief description of symptoms or consultation requirements..."
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-black text-white text-[13px] font-semibold tracking-wider uppercase rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting Request...' : 'Confirm Consultation Request'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
