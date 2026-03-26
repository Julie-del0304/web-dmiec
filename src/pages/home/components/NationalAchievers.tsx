import { useEffect, useRef, useState } from 'react';

export default function NationalAchievers() {
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

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Student Excellence</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            <strong>DMI: Shaping National Achievers</strong>
          </h2>
          <div className="w-24 h-1 bg-sky-600 mx-auto mt-6"></div>
        </div>

        <div className={`bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '200ms' }}>
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-96 lg:h-auto w-full">
              <img
                src="https://readdy.ai/api/search-image?query=diverse%20group%20of%20engineering%20college%20students%20celebrating%20success%20with%20trophies%20and%20medals%20at%20national%20competition%2C%20modern%20campus%20background%2C%20bright%20daylight%2C%20professional%20photography%2C%20vibrant%20colors%2C%20students%20wearing%20formal%20attire%20holding%20certificates%20and%20awards%2C%20proud%20expressions%2C%20teamwork%20and%20achievement%20theme&width=800&height=600&seq=national-achievers-dmi-001&orientation=landscape"
                alt="DMI Students Achieving National Recognition"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-transparent"></div>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-600 to-blue-700 rounded-lg flex items-center justify-center mb-6">
                <i className="ri-trophy-line text-white text-3xl"></i>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Empowering Students to Excel Nationally
              </h3>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                At <strong>DMI Engineering College</strong>, our students actively participate in a diverse range of competitions and challenges at <strong>state, national, and international levels</strong>. The institution provides <strong>financial assistance</strong> to support their participation, fostering an environment where such engagements have become a regular and integral part of student activities each month.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-lg mb-3">
                    <i className="ri-medal-line text-sky-600 text-2xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">50+</div>
                  <div className="text-slate-600 text-sm">Competitions Annually</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-3">
                    <i className="ri-award-line text-emerald-600 text-2xl"></i>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">100+</div>
                  <div className="text-slate-600 text-sm">Awards Won</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">
                  State Level
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  National Level
                </span>
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                  International Level
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
