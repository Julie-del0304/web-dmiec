import { useEffect, useRef, useState } from 'react';

export default function Admissions() {
  const [isVisible, setIsVisible] = useState(false);
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

  const handleDownloadBrochure = () => {
    window.open('https://dmiengg.edu.in/pdf/DMI_Brochure_2024.pdf', '_blank');
  };

  return (
    <section ref={sectionRef} id="admissions" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-navy-600 font-semibold text-sm uppercase tracking-wider">Join Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mt-3">
            <strong>Admissions 2026-27</strong>
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
              <h3 className="text-2xl font-bold mb-4">Important Dates 2025-26</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="font-medium">Application Start</span>
                  <span className="font-bold">May 1, 2025</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="font-medium">Application Deadline</span>
                  <span className="font-bold">July 15, 2025</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-3">
                  <span className="font-medium">Entrance Test</span>
                  <span className="font-bold">July 20-25, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Classes Begin</span>
                  <span className="font-bold">August 15, 2025</span>
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
                      <span>Age limit: 17-25 years as on December 31, 2025</span>
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
            Take the first step towards a successful career in engineering. Admissions 2026-27 and join our community of future innovators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://admissions.dmifoundations.org/dmi-engineering-college-application-form" target="_blank" rel="noopener noreferrer"
              className="bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors whitespace-nowrap cursor-pointer inline-block">
              Admissions 2026-27
            </a>
            <button
              onClick={handleDownloadBrochure}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/30 whitespace-nowrap cursor-pointer"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}