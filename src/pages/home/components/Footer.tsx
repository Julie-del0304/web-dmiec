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

      <footer className="bg-purple-700 text-white">
        {/* CTA Strip */}
        <div className="bg-purple-800 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <span className="text-white font-semibold text-lg">Admissions Open 2026–27</span>
              <span className="ml-3 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
                Counselling Code: 4946
              </span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); navigate('/application'); }}

                className="bg-yellow-400 text-purple-900 px-5 py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap">
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
                <img src="data:image/jpeg;base64,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"
                  alt="DMI Engineering College Logo" className="h-12 w-12 object-contain" />
                <div>
                  <h3 className="text-base font-bold leading-tight">DMI Engineering College</h3>
                  <p className="text-xs text-slate-400">Aralvaimozhi, Tamil Nadu</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                A premier engineering institution committed to excellence in education, research, and innovation since 2007.
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
                    className="w-8 h-8 flex items-center justify-center bg-purple-800 rounded-full hover:bg-yellow-400 hover:text-purple-900 transition-colors cursor-pointer">
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
                    <Link to={path} className="text-purple-100 hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                      <i className="ri-arrow-right-s-line text-yellow-400 text-xs"></i>{label}
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
                    <Link to={path} className="text-purple-100 hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                      <i className="ri-arrow-right-s-line text-yellow-400 text-xs"></i>{label}
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
                  <i className="ri-map-pin-line text-yellow-400 mt-0.5 flex-shrink-0"></i>
                  <span>Aralvaimozhi, Kanyakumari District,<br />Tamil Nadu – 629 301, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-phone-line text-yellow-400 flex-shrink-0"></i>
                  <a href="tel:+914651234567" className="hover:text-yellow-300 transition-colors">+91 4651 234567</a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-mail-line text-yellow-400 flex-shrink-0"></i>
                  <a href="mailto:info@dmiengg.edu.in" className="hover:text-yellow-300 transition-colors">info@dmiengg.edu.in</a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-global-line text-yellow-400 flex-shrink-0"></i>
                  <a href="https://dmiengg.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">www.dmiengg.edu.in</a>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Counselling Code</p>
                <p className="text-2xl font-bold text-yellow-400">4946</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-purple-500 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-400 text-xs">
              © 2025 DMI Engineering College. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-xs">
              <Link to="/privacy-policy" className="text-slate-300 hover:text-yellow-300 transition-colors">Privacy Policy</Link>
              <a href="https://dmiengg.edu.in" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-yellow-300 transition-colors">
                Powered by DMI Engineering College  CSE STUDENTS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}