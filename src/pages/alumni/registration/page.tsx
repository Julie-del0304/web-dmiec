
import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function AlumniRegistrationPage() {
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        <div className="bg-gradient-to-r from-emerald-700 to-teal-500 py-14 px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-emerald-200 mb-2">
              <span>Home</span> <span className="mx-2">/</span> <span>Alumni</span> <span className="mx-2">/</span>
              <span className="text-white font-medium">Registration</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">Alumni Registration</h1>
            <p className="text-emerald-100 mt-2">Stay connected with your alma mater — register and join the DMI alumni network</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6">
                <i className="ri-check-double-line text-4xl text-green-600"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Registration Successful!</h2>
              <p className="text-slate-500 max-w-md mx-auto">Thank you for registering. You are now part of the DMI Alumni Network. We will be in touch soon.</p>
              <button onClick={() => setSubmitted(false)}
                className="mt-8 bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 cursor-pointer">
                Register Another
              </button>
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Alumni Registration Form</h2>
              <p className="text-slate-500 text-sm mb-8">All fields are optional. Fill in as much as you can.</p>
              <form data-readdy-form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input name="name" placeholder="Your full name" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                    <input name="email" type="email" placeholder="your@email.com" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input name="phone" placeholder="+91 XXXXX XXXXX" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Batch / Year of Passing</label>
                    <input name="batch" placeholder="e.g. 2018" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <select name="department" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 text-slate-600">
                      <option value="">Select Department</option>
                      <option>CSE</option><option>IT</option><option>AI &amp; DS</option>
                      <option>ECE</option><option>EEE</option><option>Mechanical</option>
                      <option>Science &amp; Humanities</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Designation</label>
                    <input name="designation" placeholder="e.g. Software Engineer" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Company / Organization</label>
                    <input name="company" placeholder="e.g. TCS, Infosys" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn Profile</label>
                    <input name="linkedin" placeholder="https://linkedin.com/in/..." className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City / Location</label>
                  <input name="location" placeholder="e.g. Chennai, Tamil Nadu" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message / Achievement (optional)</label>
                  <textarea name="message" rows={4} maxLength={500} placeholder="Share your achievements or a message for current students..." className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-60">
                  {submitting ? 'Submitting...' : 'Register as Alumni'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
