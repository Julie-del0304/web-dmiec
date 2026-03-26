import { useEffect, useRef, useState } from 'react';

export default function VirtualTour() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  return (
    <section ref={sectionRef} id="virtual-tour" className="py-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.4),transparent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-navy-600 font-semibold text-sm uppercase tracking-wider">Explore Our Campus</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            <strong>Virtual Tour</strong>
          </h2>
          <p className="text-slate-600 text-base mt-4 max-w-2xl mx-auto">
            Experience DMI Engineering College from anywhere in the world with our immersive virtual campus tour
          </p>
          <div className="w-24 h-1 bg-navy-600 mx-auto mt-6"></div>
        </div>

        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video w-full bg-slate-200 flex items-center justify-center relative">
              <iframe
                scrolling="no"
                title="Virtual Reality, Virtual Tour"
                className="w-full h-full"
                src="https://renderstuff.com/tools/360-panorama-web-viewer-sharing/?image=https://res.cloudinary.com/drg3vddov/image/upload/v1773822909/create_a_360_202603181159_uswije.jpg"
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center">
                  <i className="ri-360-line text-navy-600 text-5xl mb-3"></i>
                  <p className="text-navy-900 font-semibold">Interactive 360° Campus Tour</p>
                  <p className="text-slate-600 text-sm mt-2">Click to explore our facilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: 'ri-building-line', title: 'Academic Blocks', desc: 'Modern classrooms and lecture halls equipped with latest technology', color: 'navy' },
            { icon: 'ri-flask-line', title: 'Laboratories', desc: 'State-of-the-art labs for all engineering disciplines', color: 'emerald' },
            { icon: 'ri-book-2-line', title: 'Library', desc: 'Extensive collection of books, journals, and digital resources', color: 'amber' },
            { icon: 'ri-home-smile-line', title: 'Hostels', desc: 'Comfortable accommodation with modern amenities', color: 'purple' }
          ].map((facility, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-${facility.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`${facility.icon} text-white text-2xl`}></i>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{facility.title}</h4>
              <p className="text-slate-600 text-sm">{facility.desc}</p>
            </div>
          ))}
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Campus Facilities</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <i className="ri-check-line text-navy-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-semibold text-slate-900">Central Library</h4>
                  <p className="text-slate-600 text-sm">Over 5,000 books, e-journals, and digital resources </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-check-line text-navy-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-semibold text-slate-900">Computer Centers</h4>
                  <p className="text-slate-600 text-sm">High-speed internet connectivity and latest software for student use</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-check-line text-navy-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-semibold text-slate-900">Sports Complex</h4>
                  <p className="text-slate-600 text-sm">Indoor and outdoor sports facilities including cricket, football, and basketball</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-check-line text-navy-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-semibold text-slate-900">Cafeteria</h4>
                  <p className="text-slate-600 text-sm">Hygienic food court serving nutritious meals and snacks</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-check-line text-navy-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-semibold text-slate-900">Auditorium</h4>
                  <p className="text-slate-600 text-sm">Modern auditorium with seating capacity of 1200+ for events and seminars</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <i className="ri-check-line text-navy-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-semibold text-slate-900">Medical Facilities</h4>
                  <p className="text-slate-600 text-sm">On-campus health center with qualified medical staff</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-96 w-full">
            <img
              src="https://image2url.com/r2/default/images/1774291170039-f8a3d4d8-bee6-4afe-bb72-48806735d38f.jpg"
              alt="DMI Engineering College Campus Aerial View"
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}