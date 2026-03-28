import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem('contact-reloaded');
    if (!hasReloaded) {
      sessionStorage.setItem('contact-reloaded', 'true');
      window.location.reload();
    }
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
          <div className="max-w-7xl mx-auto text-white">
            <nav className="text-sm text-sky-200 mb-2">
              <span>Home</span> <span className="mx-2">/</span>
              <span className="text-white font-medium">Contact Us</span>
            </nav>
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-sky-100 mt-2">We'd love to hear from you — reach out for admissions, enquiries, or general information</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {contactInfo.map((info) => (
              <div key={info.label} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
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
                <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center animate-in zoom-in duration-300">
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
                      <input name="name" placeholder="Your name" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input name="email" type="email" placeholder="your@email.com" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <input name="phone" placeholder="+91 XXXXX XXXXX" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                      <select name="subject" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 text-slate-600" required>
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
                    <textarea name="message" rows={5} maxLength={500} placeholder="Write your message here..." className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none" required />
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
                <div key={d.dept} className="bg-slate-50 rounded-lg p-4 flex items-start gap-3 hover:bg-slate-100 transition-colors cursor-default">
                  <div className="w-8 h-8 flex items-center justify-center bg-sky-100 rounded-lg flex-shrink-0 text-sky-600">
                    <i className="ri-building-line text-sm"></i>
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

          {/* Leadership Row */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-slate-800 mb-8 text-center uppercase tracking-tight">Project Leadership</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Team Head */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col sm:flex-row hover:shadow-xl transition-shadow duration-300">
                <div className="sm:w-2/5 h-48 sm:h-auto bg-slate-50 overflow-hidden relative group">
                  <img
                    src="https://image2url.com/r2/default/images/1774624099082-2b22bf05-8191-44cf-94f1-57390ee036eb.jpg"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center relative">
                  <div className="absolute top-4 right-6 w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                    <i className="ri-medal-line text-white text-lg"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Arockia juliya A.R</h3>
                  <p className="text-sky-600 font-bold text-xs uppercase tracking-wider mb-3">Team Head</p>
                  <p className="text-slate-500 text-sm font-medium mb-4">III year CSE</p>
                  <div className="flex items-center gap-2 text-slate-400">
                    <i className="ri-mail-line"></i>
                    <span className="text-xs">arockia.juliya@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Assistant Lead */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col sm:flex-row hover:shadow-xl transition-shadow duration-300">
                <div className="sm:w-2/5 h-48 sm:h-auto bg-slate-50 overflow-hidden relative group">
                  <img
                    src="https://image2url.com/r2/default/images/1774623101656-dd74dcd5-cb46-46c9-a286-01a8c28eded6.png"
                    alt="Siva Marimuthu"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center relative">
                  <div className="absolute top-4 right-6 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <i className="ri-user-star-line text-white text-lg"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">Siva Marimuthu</h3>
                  <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider mb-3">Assistant Lead</p>
                  <p className="text-slate-500 text-sm font-medium mb-4">III year CSE</p>
                  <div className="flex items-center gap-2 text-slate-400">
                    <i className="ri-mail-line"></i>
                    <span className="text-xs">siva.marimuthu@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3 uppercase tracking-tight">Development Members</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-sky-600 to-emerald-500 mx-auto mb-6 rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">
              {[
                { name: "Asha", role: "Full Stack Developer", color: "text-emerald-600", bg: "bg-emerald-50", year: "III year CSE", email: "asha@gmail.com", image: "https://image2url.com/r2/default/images/1774623253224-da9b2b8e-ecc9-4738-a0dd-356d80c0c0ec.png" },
                { name: "Abinsam", role: "Full Stack Developer", color: "text-emerald-600", bg: "bg-emerald-50", year: "III year CSE", email: "abinsam@gmail.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=500&auto=format&fit=crop" },
                { name: "Tony Blair Ubahara Wencislas", role: "Full Stack Developer", color: "text-emerald-600", bg: "bg-emerald-50", year: "II year CSE", email: "tonyblair09022006@gmail.com", image: "https://image2url.com/r2/default/images/1774623805145-6e1c73de-3314-4802-aa2a-b24c8cb40df1.png" },
                { name: "k.Prathab", role: "UIUX", color: "text-emerald-600", bg: "bg-emerald-50", year: "II year CSE", email: "prathabk2006@gmail.com", image: "https://image2url.com/r2/default/images/1774620075843-c5710f8d-5742-41d3-b53b-a49a3a2adba2.png" },
                { name: "Vinshy.L", role: "Database Team", color: "text-amber-600", bg: "bg-amber-50", year: "III year CSE", email: "vinshy2105@gmail.com", image: "https://image2url.com/r2/default/images/1774671315959-cbc7543e-8b19-4d54-a181-a4aafe4a1df9.jpeg" },
                { name: "Santhana Abisha", role: "Database Team", color: "text-amber-600", bg: "bg-amber-50", year: "II year CSE", email: "santhanaabisha@gmail.com", image: "https://image2url.com/r2/default/images/1774622405535-99df3fb5-0feb-4587-aac0-236305f4bac9.png" },
                { name: "Veni", role: "Database Team", color: "text-amber-600", bg: "bg-amber-50", year: "II year CSE", email: "veni@gmail.com", image: "https://image2url.com/r2/default/images/1774623407980-037fede9-9798-4914-a5ee-d1ccf65db183.png" },
                { name: "Nivi Darshini", role: "Database Team", color: "text-amber-600", bg: "bg-amber-50", year: "II year CSE", email: "nividashini@gmail.com", image: "https://image2url.com/r2/default/images/1774624215552-ae4e8ad1-ceb2-464d-ab76-602c9316d297.png" },
                { name: "Priya", role: "Software Testing", color: "text-rose-600", bg: "bg-rose-50", year: "III year CSE", email: "priya@gmail.com", image: "https://image2url.com/r2/default/images/1774622884119-e4e0bfd0-0564-4386-afd9-1c07303a0904.png" },
                { name: "Varsha", role: "Software Testing", color: "text-rose-600", bg: "bg-rose-50", year: "III year CSE", email: "varsha@gmail.com", image: "https://image2url.com/r2/default/images/1774623939853-5cc88293-48fe-4d5b-bab6-43f1560c2451.png" }
              ].map((member, idx) => (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col sm:flex-row hover:shadow-md transition-shadow duration-300">
                  <div className="sm:w-1/3 h-40 sm:h-auto bg-slate-50 flex items-center justify-center overflow-hidden">
                    {(member as any).image && (
                      <img src={(member as any).image} alt={member.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-5 sm:w-2/3 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight">{member.name}</h3>
                    <p className={`${member.color} font-bold text-[10px] uppercase tracking-wider mb-2`}>{member.role}</p>
                    <p className="text-slate-500 text-xs font-medium mb-3">{member.year}</p>
                    <div className="flex items-center gap-2 text-slate-400">
                      <i className="ri-mail-line text-xs"></i>
                      <span className="text-[10px] truncate">{member.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}