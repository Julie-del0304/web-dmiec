import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FooterProps {
  enquiryOpen?: boolean;
  setEnquiryOpen?: (open: boolean) => void;
}

export default function Footer({ enquiryOpen: externalEnquiryOpen, setEnquiryOpen: externalSetEnquiryOpen }: FooterProps) {
  const navigate = useNavigate();
  const [internalEnquiryOpen, setInternalEnquiryOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', program: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const enquiryOpen = externalEnquiryOpen !== undefined ? externalEnquiryOpen : internalEnquiryOpen;
  const setEnquiryOpen = externalSetEnquiryOpen || setInternalEnquiryOpen;

  const handleEnquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <>
      {/* Enquiry Modal */}
      {enquiryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button onClick={() => { setEnquiryOpen(false); setSubmitted(false); setFormData({ name: '', email: '', phone: '', program: '', message: '' }); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer">
              <i className="ri-close-line text-xl"></i>
            </button>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                  <i className="ri-check-line text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Enquiry Submitted!</h3>
                <p className="text-slate-500 text-sm">We'll get back to you within 24 hours.</p>
                <button onClick={() => { setEnquiryOpen(false); setSubmitted(false); }}
                  className="mt-6 bg-sky-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-sky-700 cursor-pointer whitespace-nowrap">
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-slate-800 mb-1">Enquire Now</h3>
                <p className="text-slate-500 text-sm mb-5">Fill in your details and we'll contact you shortly.</p>
                <form data-readdy-form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <input name="name" placeholder="Full Name" value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
                  <input name="email" type="email" placeholder="Email Address" value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
                  <input name="phone" placeholder="Phone Number" value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300" />
                  <select name="program" value={formData.program}
                    onChange={e => setFormData(p => ({ ...p, program: e.target.value }))}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 text-slate-600">
                    <option value="">Select Program of Interest</option>
                    <option>CSE</option><option>IT</option><option>AI &amp; DS</option>
                    <option>ECE</option><option>EEE</option><option>Mechanical</option>
                    <option>Science &amp; Humanities</option>
                  </select>
                  <textarea name="message" placeholder="Your Message (optional)" rows={3}
                    maxLength={500} value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none" />
                  <button type="submit" disabled={submitting}
                    className="w-full bg-sky-600 text-white py-2.5 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap">
                    {submitting ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="bg-slate-800 text-white">
        {/* CTA Strip */}
        <div className="bg-sky-700 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <span className="text-white font-semibold text-lg">Admissions Open 2025–26</span>
              <span className="ml-3 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                Counselling Code: 4946
              </span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); navigate('/application'); }}

                className="bg-white text-sky-700 px-5 py-2 rounded-md text-sm font-semibold hover:bg-sky-50 transition-colors cursor-pointer whitespace-nowrap">
                Apply Now
              </button>
              <button onClick={() => setEnquiryOpen(true)}
                className="border border-white text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap">
                Enquire Now
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="https://static.readdy.ai/image/aed2a83e7960c786dd7bda1b18d3e021/03378c8fff0e87b1630499bbdd646dab.jpeg"
                  alt="DMI Engineering College Logo" className="h-12 w-12 object-contain" />
                <div>
                  <h3 className="text-base font-bold leading-tight">DMI Engineering College</h3>
                  <p className="text-xs text-slate-400">Aralvaimozhi, Tamil Nadu</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                A premier engineering institution committed to excellence in education, research, and innovation since 1994.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: 'ri-facebook-fill', href: 'https://facebook.com' },
                  { icon: 'ri-twitter-fill', href: 'https://twitter.com' },
                  { icon: 'ri-linkedin-fill', href: 'https://linkedin.com' },
                  { icon: 'ri-instagram-fill', href: 'https://instagram.com' },
                  { icon: 'ri-youtube-fill', href: 'https://youtube.com' },
                ].map(({ icon, href }) => (
                  <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-full hover:bg-sky-600 transition-colors cursor-pointer">
                    <i className={`${icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'About DMI', path: '/about/overview' },
                  { label: 'Privacy Policy', path: '/privacy-policy' },
                  { label: 'Innovation Cell', path: '/innovation/iic' },
                  { label: 'Placement Cell', path: '/placement/cell' },
                  { label: 'Research & Publications', path: '/research/publications' },
                  { label: 'NAAC Documents', path: '/naac/ssr' },
                  { label: 'Alumni', path: '/alumni/registration' },
                  { label: 'Gallery', path: '/gallery/images' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5">
                      <i className="ri-arrow-right-s-line text-sky-500 text-xs"></i>{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Departments */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Departments</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'Computer Science & Engg.', path: '/departments/cse' },
                  { label: 'Information Technology', path: '/departments/it' },
                  { label: 'AI & Data Science', path: '/departments/aids' },
                  { label: 'Electronics & Comm.', path: '/departments/ece' },
                  { label: 'Electrical & Electronics', path: '/departments/eee' },
                  { label: 'Mechanical Engineering', path: '/departments/mechanical' },
                  { label: 'Science & Humanities', path: '/courses/science-humanities' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5">
                      <i className="ri-arrow-right-s-line text-sky-500 text-xs"></i>{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <i className="ri-map-pin-line text-sky-400 mt-0.5 flex-shrink-0"></i>
                  <span>Aralvaimozhi, Kanyakumari District,<br />Tamil Nadu – 629 301, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-phone-line text-sky-400 flex-shrink-0"></i>
                  <a href="tel:+914651234567" className="hover:text-sky-400 transition-colors">+91 4651 234567</a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-mail-line text-sky-400 flex-shrink-0"></i>
                  <a href="mailto:info@dmiengg.edu.in" className="hover:text-sky-400 transition-colors">info@dmiengg.edu.in</a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-global-line text-sky-400 flex-shrink-0"></i>
                  <a href="https://dmiengg.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">www.dmiengg.edu.in</a>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Counselling Code</p>
                <p className="text-2xl font-bold text-yellow-400">4946</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-400 text-xs">
              © 2025 DMI Engineering College. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-xs">
              <Link to="/privacy-policy" className="text-slate-400 hover:text-sky-400 transition-colors">Privacy Policy</Link>
              <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
