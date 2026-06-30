"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle,
  Sparkles,
  User,
  Mail,
  Building,
  MapPin,
  Phone
} from "lucide-react";

// CONFIGURATION: Replace these values with your Google Form URL and field entry IDs
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfCHTmcw6_j8ChVphuLapiIZE_AifpRbojai_zMD6yzRzXBPQ/formResponse";
const GOOGLE_FORM_ENTRIES = {
  name: "entry.309791562",        // Full Name
  email: "entry.212945244",       // Email Address
  company: "entry.1460508866",    // Company Name
  location: "entry.2063604588",   // Location
  phone: "entry.1421889979",      // Contact Number
  social: "entry.1652772638",     // Instagram or LinkedIn ID
  date: "entry.639753157",        // Date
  time: "entry.2018951407"        // Time
};

export default function ContactPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    location: "",
    phone: "",
    social: ""
  });

  // Calendar logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (y: number, m: number) => {
    return new Date(y, m, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const d = new Date(year, month, day);
    // Don't select past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (d >= today) {
      setSelectedDate(d);
      setSelectedTime(null); // Reset time when date changes
    }
  };

  // Generate times from 1 PM to 9 PM at half-hour intervals
  const timeSlots = [
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", 
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Standard validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields (Name, Email, Contact Number).");
      return;
    }
    
    setIsSubmitting(true);

    const payload = new FormData();
    payload.append(GOOGLE_FORM_ENTRIES.name, formData.name);
    payload.append(GOOGLE_FORM_ENTRIES.email, formData.email);
    payload.append(GOOGLE_FORM_ENTRIES.company, formData.company);
    payload.append(GOOGLE_FORM_ENTRIES.location, formData.location);
    payload.append(GOOGLE_FORM_ENTRIES.phone, formData.phone);
    payload.append(GOOGLE_FORM_ENTRIES.social, formData.social);

    if (selectedDate) {
      payload.append(`${GOOGLE_FORM_ENTRIES.date}_year`, selectedDate.getFullYear().toString());
      payload.append(`${GOOGLE_FORM_ENTRIES.date}_month`, (selectedDate.getMonth() + 1).toString());
      payload.append(`${GOOGLE_FORM_ENTRIES.date}_day`, selectedDate.getDate().toString());
    }

    if (selectedTime) {
      const [timePart, modifier] = selectedTime.split(' ');
      let [h, m] = timePart.split(':');
      let hour = parseInt(h, 10);
      if (modifier === 'PM' && hour !== 12) hour += 12;
      if (modifier === 'AM' && hour === 12) hour = 0;
      payload.append(`${GOOGLE_FORM_ENTRIES.time}_hour`, hour.toString().padStart(2, '0'));
      payload.append(`${GOOGLE_FORM_ENTRIES.time}_minute`, selectedTime.split(':')[1].split(' ')[0]);
    }

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: payload
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIframeLoad = () => {
    if (isSubmitted) {
      setIframeLoaded(true);
    }
  };

  const formatDateString = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <main 
      className="min-h-screen w-full relative flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      style={{
        backgroundImage: "url('/frosty_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Nature/Snow Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[6px] pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white/45 backdrop-blur-[18px] border border-white/60 rounded-3xl shadow-[0_30px_100px_rgba(255,255,255,0.25),0_15px_50px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500">
        
        {/* Top Header/Bar */}
        <div className="flex items-center justify-between border-b border-white/40 px-6 py-4 bg-white/30">
          <Link 
            href="/"
            className="flex items-center gap-2 text-neutral-800 hover:text-accent font-medium text-sm transition-colors duration-200"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-1.5 text-neutral-950 font-bold tracking-tight">
            SOCRATES <span className="text-accent">STUDIO</span>
          </div>
        </div>

        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/40">
            
            {/* Section 1: Meet Details (Left) */}
            <div className="lg:col-span-4 p-6 md:p-8 flex flex-col justify-between space-y-8 bg-white/20">
              <div className="space-y-6">
                {/* Host Info */}
                <div className="flex items-center gap-4">
                  <div className="relative size-16 rounded-full bg-gradient-to-tr from-accent to-[#E51A71] p-[2px] shadow-lg">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xl text-accent">
                      SR
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 leading-tight">Sumit Rahi</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mt-0.5">Founder, Socrates</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-950 tracking-tight leading-tight">
                    30 Min Discovery Call
                  </h1>
                  <p className="text-sm text-neutral-700/90 leading-relaxed font-sans">
                    Book a quick video strategy session to discuss your brand positioning, campaign assets, or social distribution.
                  </p>
                </div>
              </div>

              {/* Specific Meeting Attributes */}
              <div className="space-y-4 pt-6 border-t border-white/30 text-neutral-800">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="size-5 text-accent shrink-0" />
                  <span className="font-medium">30 Min Call</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Video className="size-5 text-accent shrink-0" />
                  <span className="font-medium">Google Meet Video Call</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="size-5 text-accent shrink-0" />
                  <span className="font-medium">India Standard Time (IST - Kolkata)</span>
                </div>
              </div>
            </div>

            {/* Section 2 & 3: Calendar & Slots */}
            <div className="lg:col-span-8 p-6 md:p-8 flex flex-col bg-white/10">
              
              {!selectedDate || !selectedTime ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Calendar Grid */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-neutral-900 text-lg">
                        {months[month]} {year}
                      </h4>
                      <div className="flex gap-1">
                        <button 
                          onClick={prevMonth}
                          className="p-2 rounded-xl hover:bg-white/50 text-neutral-800 transition-colors"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="size-4" />
                        </button>
                        <button 
                          onClick={nextMonth}
                          className="p-2 rounded-xl hover:bg-white/50 text-neutral-800 transition-colors"
                          aria-label="Next month"
                        >
                          <ChevronRight className="size-4" />
                        </button>
                      </div>
                    </div>

                    {/* Weekdays Header */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-neutral-700/80 tracking-wider">
                      {daysOfWeek.map(day => (
                        <div key={day} className="py-2">{day}</div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty spaces before day 1 */}
                      {Array.from({ length: firstDay }).map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square" />
                      ))}

                      {/* Actual dates */}
                      {Array.from({ length: daysInMonth }).map((_, index) => {
                        const dayNumber = index + 1;
                        const dateObj = new Date(year, month, dayNumber);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isPast = dateObj < today;
                        const isSelected = selectedDate?.getDate() === dayNumber && 
                                           selectedDate?.getMonth() === month && 
                                           selectedDate?.getFullYear() === year;

                        return (
                          <button
                            key={`day-${dayNumber}`}
                            onClick={() => handleDateSelect(dayNumber)}
                            disabled={isPast}
                            className={`
                              aspect-square rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-200
                              ${isPast ? 'text-neutral-400/50 cursor-not-allowed' : 'text-neutral-900 hover:bg-white/50'}
                              ${isSelected ? 'bg-gradient-to-r from-accent to-[#E51A71] text-white shadow-md hover:bg-gradient-to-r hover:from-accent hover:to-[#E51A71]' : ''}
                            `}
                          >
                            {dayNumber}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots column */}
                  <div className="md:col-span-5 space-y-4">
                    <h4 className="font-bold text-neutral-900 text-lg flex items-center gap-2">
                      <Clock className="size-4 text-accent" /> Available Times
                    </h4>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar" data-lenis-prevent>
                        {timeSlots.map(time => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              className={`
                                py-3 px-4 rounded-2xl border font-bold text-sm text-center transition-all duration-200
                                ${isSelected 
                                  ? 'bg-gradient-to-r from-accent to-[#E51A71] text-white border-transparent shadow-md' 
                                  : 'bg-white/30 border-white/50 text-neutral-900 hover:bg-white/70'}
                              `}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="h-48 border border-dashed border-white/40 rounded-2xl flex items-center justify-center p-4 text-center text-sm text-neutral-700">
                        Please pick a date first to view time slots.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Section 3: Booking Form (Appears when Date & Time are chosen) */
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/20 pb-4">
                    <div>
                      <h4 className="font-extrabold text-neutral-950 text-xl tracking-tight">Confirm Your Session</h4>
                      <p className="text-sm text-neutral-800 font-semibold mt-1 flex items-center gap-2">
                        <CalendarIcon className="size-4 text-accent" /> {formatDateString(selectedDate)} at {selectedTime}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedTime(null);
                        setSelectedDate(null);
                      }}
                      className="text-xs font-bold text-accent hover:underline uppercase tracking-wider"
                    >
                      Change Date/Time
                    </button>
                  </div>

                  <form 
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >


                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="size-3.5 text-accent" /> Full Name <span className="text-accent">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Sumit Rahi"
                        className="w-full px-4 py-3 bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-neutral-950 placeholder-neutral-600/50 font-medium text-sm transition-all"
                      />

                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="size-3.5 text-accent" /> Email Address <span className="text-accent">*</span>
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="sumit@socrates.studio"
                        className="w-full px-4 py-3 bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-neutral-950 placeholder-neutral-600/50 font-medium text-sm transition-all"
                      />

                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Building className="size-3.5 text-accent" /> Company Name
                      </label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Socrates Studio"
                        className="w-full px-4 py-3 bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-neutral-950 placeholder-neutral-600/50 font-medium text-sm transition-all"
                      />

                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-accent" /> Location / Country
                      </label>
                      <input 
                        type="text" 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="India"
                        className="w-full px-4 py-3 bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-neutral-950 placeholder-neutral-600/50 font-medium text-sm transition-all"
                      />

                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="size-3.5 text-accent" /> Contact Number <span className="text-accent">*</span>
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-neutral-950 placeholder-neutral-600/50 font-medium text-sm transition-all"
                      />

                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="size-3.5 text-accent" /> Instagram or LinkedIn ID
                      </label>
                      <input 
                        type="text" 
                        name="social"
                        value={formData.social}
                        onChange={handleInputChange}
                        placeholder="@socrates.studio / in/sumitrahi"
                        className="w-full px-4 py-3 bg-white/40 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-neutral-950 placeholder-neutral-600/50 font-medium text-sm transition-all"
                      />

                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="md:col-span-2 mt-4 w-full py-4 bg-gradient-to-r from-accent to-[#E51A71] hover:from-[#E51A71] hover:to-accent text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-[1px] text-base cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Confirming..." : "Confirm Booking"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* SUCCESS SCREEN */
          <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6 bg-white/20 animate-fadeIn min-h-[400px]">
            <div className="size-20 rounded-full bg-gradient-to-r from-accent to-[#E51A71] p-[2px] animate-scaleIn shadow-lg">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-accent">
                <CheckCircle className="size-12" />
              </div>
            </div>
            <div className="space-y-3 max-w-md">
              <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                Booking Request Sent!
              </h2>
              <p className="text-sm md:text-base text-neutral-800 font-medium leading-relaxed font-sans">
                Thank you. We have received your booking details for <span className="font-bold text-accent">{selectedTime}</span> on <span className="font-bold text-accent">{formatDateString(selectedDate)}</span>. An invite will be shared with you shortly.
              </p>
            </div>
            <div className="pt-6 flex gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-bold rounded-full shadow-sm transition-all text-sm"
              >
                Go Back Home
              </Link>
              {/* Optional Social shortcuts */}
              <div className="flex gap-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-full shadow-sm transition-all"
                  aria-label="Instagram"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 rounded-full shadow-sm transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
