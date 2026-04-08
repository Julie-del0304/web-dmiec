import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Admissions() {
  const [isVisible, setIsVisible] = useState(false);
  const [showEnquireModal, setShowEnquireModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleEnquireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formBody = new URLSearchParams();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('phone', formData.phone);
      formBody.append('program', formData.program);
      formBody.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/submit/dmi-enquiry-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', program: '', message: '' });
        setTimeout(() => {
          setShowEnquireModal(false);
          setSubmitSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadBrochure = () => {
    window.open('https://dmiengg.edu.in/pdf/DMI_Brochure_2024.pdf', '_blank');
  };

  return (
    <section ref={sectionRef} id="admissions" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-navy-600 font-semibold text-sm uppercase tracking-wider">Join Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mt-3">
            <strong>Admissions 2025-26</strong>
          </h2>
          <p className="text-slate-600 text-base mt-4 max-w-2xl mx-auto">
            Begin your journey towards becoming a successful engineer at DMI Engineering College
          </p>
          <div className="w-24 h-1 bg-navy-600 mx-auto mt-6"></div>
          
          {/* Counseling Code Highlight */}
          <div className="mt-8 inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <i className="ri-bookmark-line text-2xl"></i>
              <div className="text-left">
                <p className="text-xs font-medium opacity-90">TNEA Counseling Code</p>
                <p className="text-3xl font-bold">4946</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Admission Process</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-1">Application Submission</h4>
                    <p className="text-slate-600 text-sm">Complete the online application form with required documents and academic credentials.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-1">Entrance Examination</h4>
                    <p className="text-slate-600 text-sm">Appear for TNEA counseling or management quota entrance test based on eligibility.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-1">Document Verification</h4>
                    <p className="text-slate-600 text-sm">Submit original documents for verification including mark sheets and certificates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-1">Fee Payment & Enrollment</h4>
                    <p className="text-slate-600 text-sm">Complete fee payment and enrollment formalities to confirm your admission.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-navy-700 to-navy-900 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Important Dates 2026-27</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="font-medium">Application Start</span>
                  <span className="font-bold">April 1, 2026</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="font-medium">Application Deadline</span>
                  <span className="font-bold">June 15, 2026</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="font-medium">Entrance Test</span>
                  <span className="font-bold">June 20-26, 2026</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Classes Begin</span>
                  <span className="font-bold">July 15, 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Eligibility Criteria</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-navy-900 mb-3 flex items-center">
                    <i className="ri-graduation-cap-line text-navy-600 mr-2"></i>
                    For B.E./B.Tech Programs
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-navy-600 mr-2 mt-0.5"></i>
                      <span>Passed 10+2 or equivalent with Physics, Chemistry, and Mathematics</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-navy-600 mr-2 mt-0.5"></i>
                      <span>Minimum 50% aggregate marks in qualifying examination</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-navy-600 mr-2 mt-0.5"></i>
                      <span>Valid TNEA rank or entrance test score</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-navy-600 mr-2 mt-0.5"></i>
                      <span>Age limit: 17-25 years as on December 31, 2026</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-navy-900 mb-3 flex items-center">
                    <i className="ri-book-open-line text-navy-600 mr-2"></i>
                    For M.E./M.Tech Programs
                  </h4>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-navy-600 mr-2 mt-0.5"></i>
                      <span>Bachelor's degree in relevant engineering discipline</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-navy-600 mr-2 mt-0.5"></i>
                      <span>Minimum 55% aggregate marks in undergraduate program</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-navy-600 mr-2 mt-0.5"></i>
                      <span>Valid GATE score (preferred but not mandatory)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-lg p-8 border border-emerald-200">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Scholarships Available</h3>
              <p className="text-slate-600 text-sm mb-6">
                We offer various scholarship programs to support meritorious and deserving students:
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="ri-medal-line text-emerald-600 text-xl mr-3"></i>
                  <span className="text-slate-700 text-sm"><strong>Merit Scholarships</strong> - Up to 100% tuition fee waiver</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-hand-heart-line text-emerald-600 text-xl mr-3"></i>
                  <span className="text-slate-700 text-sm"><strong>Need-based Aid</strong> - Financial assistance for deserving students</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-trophy-line text-emerald-600 text-xl mr-3"></i>
                  <span className="text-slate-700 text-sm"><strong>Sports Quota</strong> - Special scholarships for athletes</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-government-line text-emerald-600 text-xl mr-3"></i>
                  <span className="text-slate-700 text-sm"><strong>Government Schemes</strong> - SC/ST/OBC scholarships</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`bg-navy-900 rounded-2xl p-8 md:p-12 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Your Engineering Journey?</h3>
          <p className="text-white/80 text-base mb-8 max-w-2xl mx-auto">
            Take the first step towards a successful career in engineering. Apply now and join our community of future innovators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/application" onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); }}
              className="bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors whitespace-nowrap cursor-pointer inline-block">
              Apply Online
            </Link>
            <button 
              onClick={() => setShowEnquireModal(true)}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Enquire Now
            </button>
            <button 
              onClick={handleDownloadBrochure}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30 whitespace-nowrap cursor-pointer"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Enquire Now Modal */}
      {showEnquireModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-navy-700 to-navy-900 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Enquire Now</h3>
                <button
                  onClick={() => setShowEnquireModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <p className="text-white/80 text-sm mt-2">Fill in your details and we'll get back to you soon</p>
            </div>

            <form id="dmi-enquiry-form" data-readdy-form onSubmit={handleEnquireSubmit} className="p-6 space-y-4">
              {submitSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start">
                  <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mr-3 flex-shrink-0"></i>
                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-1">Success!</h4>
                    <p className="text-emerald-700 text-sm">Your enquiry has been submitted. We'll contact you soon.</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Program of Interest *</label>
                <select
                  name="program"
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm"
                >
                  <option value="">Select a program</option>
                  <option value="B.E. Computer Science">B.E. Computer Science</option>
                  <option value="B.E. Information Technology">B.E. Information Technology</option>
                  <option value="B.E. Electronics & Communication">B.E. Electronics & Communication</option>
                  <option value="B.E. Electrical & Electronics">B.E. Electrical & Electronics</option>
                  <option value="B.E. Mechanical">B.E. Mechanical</option>
                  <option value="B.E. AI & Data Science">B.E. AI & Data Science</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-600 focus:border-transparent text-sm resize-none"
                  placeholder="Any specific questions or requirements..."
                ></textarea>
                <p className="text-xs text-slate-500 mt-1">{formData.message.length}/500 characters</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-navy-700 text-white py-3 rounded-lg font-semibold hover:bg-navy-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
