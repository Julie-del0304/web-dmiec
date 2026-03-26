
import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function AlumniMeetPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const meets = [
    {
      year: '2024',
      date: 'December 15, 2024',
      theme: 'Reconnect & Inspire',
      venue: 'DMI Engineering College Main Auditorium',
      attendees: 320,
      highlights: ['Keynote by Mr. Rajesh Kumar (CSE 2010)', 'Panel Discussion on Industry Trends', 'Cultural Evening & Dinner', 'Award Ceremony for Distinguished Alumni'],
      img: 'https://readdy.ai/api/search-image?query=alumni%20meet%20gathering%20college%20auditorium%20former%20students%20reunion%20India%20engineering%20college%20celebration%20formal%20event%20group%20photo&width=700&height=420&seq=alumni-meet-1&orientation=landscape',
    },
    {
      year: '2023',
      date: 'January 20, 2023',
      theme: 'Roots & Wings',
      venue: 'DMI Engineering College Seminar Hall',
      attendees: 280,
      highlights: ['Inauguration by Principal Dr. S. Arumugam', 'Alumni Mentorship Program Launch', 'Sports & Games', 'Networking Dinner'],
      img: 'https://readdy.ai/api/search-image?query=college%20alumni%20reunion%20event%20former%20students%20gathering%20seminar%20hall%20India%20engineering%20college%20networking%20event%20professional&width=700&height=420&seq=alumni-meet-2&orientation=landscape',
    },
    {
      year: '2022',
      date: 'February 5, 2022',
      theme: 'Together We Grow',
      venue: 'DMI Engineering College Campus',
      attendees: 210,
      highlights: ['Campus Tour for Alumni', 'Placement Interaction Session', 'Cultural Performances', 'Tree Plantation Drive'],
      img: 'https://readdy.ai/api/search-image?query=alumni%20meet%20college%20campus%20outdoor%20gathering%20former%20students%20India%20engineering%20college%20group%20activities%20sunny%20day&width=700&height=420&seq=alumni-meet-3&orientation=landscape',
    },
  ];

  const upcoming = {
    date: 'January 18, 2026',
    theme: 'Legacy & Leadership',
    venue: 'DMI Engineering College, Aralvaimozhi',
    registrationDeadline: 'December 31, 2025',
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        {/* Hero */}
        <div className="relative h-64 overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=alumni%20meet%20banner%20college%20reunion%20celebration%20colorful%20decorations%20stage%20India%20engineering%20college%20formal%20gathering%20professional%20event&width=1400&height=400&seq=alumni-hero-1&orientation=landscape"
            alt="Alumni Meet"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/30 flex items-center px-8 lg:px-20">
            <div>
              <nav className="text-sm text-slate-300 mb-2">
                <span>Home</span> <span className="mx-2">/</span>
                <span>Alumni</span> <span className="mx-2">/</span>
                <span className="text-white font-medium">Alumni Meet</span>
              </nav>
              <h1 className="text-4xl font-bold text-white">Alumni Meet</h1>
              <p className="text-slate-200 mt-2">Reuniting hearts, reliving memories, and building futures together</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Upcoming Meet Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-8 mb-14 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Upcoming Event</span>
                <h2 className="text-2xl font-bold mt-3">Alumni Meet 2026 — "{upcoming.theme}"</h2>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-emerald-100">
                  <span className="flex items-center gap-1.5"><i className="ri-calendar-line"></i>{upcoming.date}</span>
                  <span className="flex items-center gap-1.5"><i className="ri-map-pin-line"></i>{upcoming.venue}</span>
                  <span className="flex items-center gap-1.5"><i className="ri-time-line"></i>Register by {upcoming.registrationDeadline}</span>
                </div>
              </div>
              <a href="/alumni/registration"
                className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors cursor-pointer whitespace-nowrap">
                Register Now
              </a>
            </div>
          </div>

          {/* Past Meets */}
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Past Alumni Meets</h2>
          <div className="space-y-10">
            {meets.map((meet) => (
              <div key={meet.year} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  <div className="w-full h-64 lg:h-auto">
                    <img src={meet.img} alt={`Alumni Meet ${meet.year}`} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-8">
                    <span className="bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-full">{meet.year}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-3 mb-1">Alumni Meet {meet.year}</h3>
                    <p className="text-slate-500 text-sm italic mb-4">Theme: "{meet.theme}"</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-5">
                      <span className="flex items-center gap-1.5"><i className="ri-calendar-line text-sky-500"></i>{meet.date}</span>
                      <span className="flex items-center gap-1.5"><i className="ri-map-pin-line text-sky-500"></i>{meet.venue}</span>
                      <span className="flex items-center gap-1.5"><i className="ri-group-line text-sky-500"></i>{meet.attendees} Attendees</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Highlights</h4>
                    <ul className="space-y-1">
                      {meet.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5 flex-shrink-0"></i>{h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
