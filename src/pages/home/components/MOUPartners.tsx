import { useEffect, useRef, useState } from 'react';

export default function MOUPartners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="mb-8">
            <h2 className="inline-block px-10 py-4 rounded-3xl text-4xl font-black shadow-2xl bg-teal-600 text-white shadow-teal-200">
              Our MOU Partners
            </h2>
          </div>

          <p className="text-base text-gray-600 max-w-3xl mx-auto mb-10">
            Strategic collaborations with industry leaders to provide exceptional
            opportunities for our students
          </p>

          {/* Banner Image */}
          <div
            className={`w-full mx-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <img
              src="https://image2url.com/r2/default/images/1774289685565-1e98b56a-ced8-4332-b182-ac3f7ecea597.jpg"
              alt="Strategic MOU Partnerships"
              className="w-full h-auto hover:scale-[1.02] transition-transform duration-1000"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
