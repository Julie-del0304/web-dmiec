import { useEffect, useRef, useState } from 'react';

export default function Research() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);


    const handleLearnMore = () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  window.REACT_APP_NAVIGATE('/research');
};

  return (
    <section ref={sectionRef} className="py-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.3),transparent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Innovation &amp; Discovery</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            <strong>Excellent Research</strong>
          </h2>
          <div className="w-24 h-1 bg-sky-600 mx-auto mt-6"></div>
          <p className="text-slate-600 text-base mt-6 max-w-3xl mx-auto">
            At DMI Engineering College, we seamlessly integrate teaching and research to benefit our student community. Our institution is committed to fostering innovation and technological progress through our dedicated Research and Development (R&amp;D) unit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className={`bg-white rounded-xl shadow-2xl overflow-hidden group hover:shadow-sky-500/20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
            <div className="h-2 bg-gradient-to-r from-sky-500 to-blue-600"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-book-open-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                Academic Research
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Our faculty and students engage in cutting-edge academic research across various engineering disciplines, contributing to knowledge advancement and innovation in technology.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-slate-600">
                  <i className="ri-check-line text-sky-600 text-xl mt-0.5 mr-3 flex-shrink-0"></i>
                  <span>Faculty-led research projects in emerging technologies</span>
                </li>
                <li className="flex items-start text-slate-600">
                  <i className="ri-check-line text-sky-600 text-xl mt-0.5 mr-3 flex-shrink-0"></i>
                  <span>Student research initiatives and innovation labs</span>
                </li>
                <li className="flex items-start text-slate-600">
                  <i className="ri-check-line text-sky-600 text-xl mt-0.5 mr-3 flex-shrink-0"></i>
                  <span>Publications in reputed journals and conferences</span>
                </li>
                <li className="flex items-start text-slate-600">
                  <i className="ri-check-line text-sky-600 text-xl mt-0.5 mr-3 flex-shrink-0"></i>
                  <span>Collaborative research with academic institutions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={`bg-white rounded-xl shadow-2xl overflow-hidden group hover:shadow-emerald-500/20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
            <div className="p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="ri-funds-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                Sponsored Research
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                We actively pursue sponsored research projects funded by government agencies and industry partners, driving practical solutions to real-world engineering challenges.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start text-slate-600">
                  <i className="ri-check-line text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0"></i>
                  <span>Government-funded research initiatives</span>
                </li>
                <li className="flex items-start text-slate-600">
                  <i className="ri-check-line text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0"></i>
                  <span>Industry-sponsored projects and consultancy</span>
                </li>
                <li className="flex items-start text-slate-600">
                  <i className="ri-check-line text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0"></i>
                  <span>Patent filing and intellectual property development</span>
                </li>
                <li className="flex items-start text-slate-600">
                  <i className="ri-check-line text-emerald-600 text-xl mt-0.5 mr-3 flex-shrink-0"></i>
                  <span>Technology transfer and commercialization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learn More Button */}
        <div className={`mt-12 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '600ms' }}>
          <button 
            onClick={handleLearnMore}
            className="bg-sky-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sky-600 transition-all hover:scale-105 whitespace-nowrap inline-flex items-center"
          >
            Explore Our Research
            <i className="ri-arrow-right-line ml-2 text-xl"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
