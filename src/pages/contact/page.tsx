import { useEffect, useState } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new URLSearchParams();
    new FormData(form).forEach((v, k) => data.append(k, v.toString()));
    try {
      await fetch('https://readdy.ai/api/form/d6g09lgr225iqdhs0hcg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: 'ri-map-pin-2-line', label: 'Address', value: 'Aralvaimozhi, Kanyakumari District,\nTamil Nadu – 629 301, India', color: 'bg-sky-100 text-sky-600' },
    { icon: 'ri-phone-line', label: 'Phone', value: '+91 9445970141\n+91 9150076732', color: 'bg-emerald-100 text-emerald-600' },
    { icon: 'ri-mail-line', label: 'Email', value: 'dmieckk@gmail.com', color: 'bg-amber-100 text-amber-600' },
    { icon: 'ri-time-line', label: 'Office Hours', value: 'Mon – Sat: 9:00 AM – 4:00 PM\nSunday: Closed', color: 'bg-rose-100 text-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        {/* Hero */}
        <div className="bg-gradient-to-r from-sky-700 to-sky-500 py-14 px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-sky-200 mb-2">
              <span>Home</span> <span className="mx-2">/</span>
              <span className="text-white font-medium">Contact Us</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">Contact Us</h1>
            <p className="text-sky-100 mt-2">We'd love to hear from you — reach out for admissions, enquiries, or general information</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {contactInfo.map((info) => (
              <div key={info.label} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm text-center">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 ${info.color}`}>
                  <i className={`${info.icon} text-xl`}></i>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{info.label}</h3>
                <p className="text-sm text-slate-500 whitespace-pre-line leading-relaxed">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Map + Form */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Google Map */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Find Us on the Map</h2>
              <div className="rounded-xl overflow-hidden shadow-md border border-slate-100 h-96">
                <iframe
                  title="DMI Engineering College Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.0!2d77.5!3d8.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDMI%20Engineering%20College%2C%20Aralvaimozhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-4 p-4 bg-sky-50 rounded-lg flex items-start gap-3">
                <i className="ri-navigation-line text-sky-600 text-lg flex-shrink-0 mt-0.5"></i>
                <div>
                  <p className="text-sm font-medium text-slate-700">Getting Here</p>
                  <p className="text-xs text-slate-500 mt-1">Nearest railway station: Nagercoil Junction (25 km). Nearest airport: Trivandrum International Airport (45 km). Regular bus services available from Kanyakumari and Nagercoil.</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Send Us a Message</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                    <i className="ri-check-line text-3xl text-green-600"></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 text-sm">Thank you for contacting us. We'll respond within 1–2 business days.</p>
                  <button onClick={() => setSubmitted(false)}
                    className="mt-6 bg-sky-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 cursor-pointer">
                    Send Another
                  </button>
                </div>
              ) : (
                <form data-readdy-form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-xl shadow-sm p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input name="name" placeholder="Your name" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input name="email" type="email" placeholder="your@email.com" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <input name="phone" placeholder="+91 XXXXX XXXXX" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                      <select name="subject" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 text-slate-600">
                        <option value="">Select Subject</option>
                        <option>Admissions Enquiry</option>
                        <option>Academic Information</option>
                        <option>Placement</option>
                        <option>Research Collaboration</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea name="message" rows={5} maxLength={500} placeholder="Write your message here..." className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors cursor-pointer disabled:opacity-60">
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Department Contacts */}
          <div className="mt-14">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Department Contact Numbers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { dept: 'CSE Department', phone: '+91 9445970141', email: 'dmieckk@gmail.com' },
                { dept: 'IT Department', phone: '+91 9445970141', email: 'dmieckk@gmail.com' },
                { dept: 'AI & DS Department', phone: '+91 9445970141', email: 'dmieckk@gmail.com' },
                { dept: 'ECE Department', phone: '+91 9445970141', email: 'dmieckk@gmail.com' },
                { dept: 'EEE Department', phone: '+91 9445970141', email: 'dmieckk@gmail.com' },
                { dept: 'Mechanical Department', phone: '+91 9445970141', email: 'dmieckk@gmail.com' },
                { dept: 'Placement Cell', phone: '+91 9445970141', email: 'dmieckk@gmail.com' },
                { dept: 'Admissions Office', phone: '+91 9445970141', email: 'dmieckk@gmail.com' },
                { dept: 'Principal Office', phone: '+91 9445970141', email: 'dmieckk@gmail.com' },
              ].map((d) => (
                <div key={d.dept} className="bg-slate-50 rounded-lg p-4 flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-sky-100 rounded-lg flex-shrink-0">
                    <i className="ri-building-line text-sky-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{d.dept}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{d.phone}</p>
                    <p className="text-xs text-sky-600 mt-0.5">{d.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}