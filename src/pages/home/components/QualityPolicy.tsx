import { useEffect, useRef, useState } from 'react';

export default function QualityPolicy() {
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

  const policies = [
    {
      icon: 'ri-message-3-line',
      title: 'Communication Skills',
      description: 'Imparting proper communication skills and other life coping skills.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Trustworthy Citizens',
      description: 'Evolving them into trustworthy citizens to promote industrial progress, growth and social transformation.'
    },
    {
      icon: 'ri-lightbulb-flash-line',
      title: 'Innovation & Creativity',
      description: 'Promoting continuous dissemination of knowledge to have innovation and creativity in all spheres of learning.'
    },
    {
      icon: 'ri-user-star-line',
      title: 'Faculty Empowerment',
      description: 'Enhancing the capabilities of faculty through periodical faculty empowerment programs, research and consultancy.'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Our Commitment</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            <strong>Quality Policy</strong>
          </h2>
          <div className="w-24 h-1 bg-sky-600 mx-auto mt-6"></div>
        </div>

        <div className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '200ms' }}>
          <div className="flex items-start mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-sky-600 to-blue-700 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
              <i className="ri-file-text-line text-white text-2xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Quality Commitment</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                We, at the <strong>DMI Engineering College</strong> are committed to imparting quality and value-based education to develop our students as professionals of technical excellence coupled with ethics and human propriety. They will be trained comprehensively to meet the ever-growing demands of the times and to be at the service of the society forever by:
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {policies.map((policy, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-600 to-blue-700 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className={`${policy.icon} text-white text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">{policy.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{policy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid lg:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '700ms' }}>
          <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-xl p-8 text-white text-center hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-award-line text-3xl"></i>
            </div>
            <h4 className="text-xl font-bold mb-2">Technical Excellence</h4>
            <p className="text-blue-100 text-sm">Developing professionals with cutting-edge technical skills</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-8 text-white text-center hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-heart-line text-3xl"></i>
            </div>
            <h4 className="text-xl font-bold mb-2">Ethics & Values</h4>
            <p className="text-emerald-100 text-sm">Instilling strong moral values and human propriety</p>
          </div>

          <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl p-8 text-white text-center hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-global-line text-3xl"></i>
            </div>
            <h4 className="text-xl font-bold mb-2">Social Service</h4>
            <p className="text-amber-100 text-sm">Training students to serve society and drive progress</p>
          </div>
        </div>
      </div>
    </section>
  );
}
