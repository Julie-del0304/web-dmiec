import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [yearsCount, setYearsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [placementCount, setPlacementCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and animate when entering viewport
            setYearsCount(0);
            setStudentsCount(0);
            setFacultyCount(0);
            setPlacementCount(0);
            
            // Animate Years
            let years = 0;
            const yearsInterval = setInterval(() => {
              years += 1;
              setYearsCount(years);
              if (years >= 15) clearInterval(yearsInterval);
            }, 80);

            // Animate Students
            let students = 0;
            const studentsInterval = setInterval(() => {
              students += 50;
              setStudentsCount(students);
              if (students >= 2000) {
                setStudentsCount(2000);
                clearInterval(studentsInterval);
              }
            }, 30);

            // Animate Faculty
            let faculty = 0;
            const facultyInterval = setInterval(() => {
              faculty += 2;
              setFacultyCount(faculty);
              if (faculty >= 100) {
                setFacultyCount(100);
                clearInterval(facultyInterval);
              }
            }, 40);

            // Animate Placement
            let placement = 0;
            const placementInterval = setInterval(() => {
              placement += 2;
              setPlacementCount(placement);
              if (placement >= 95) {
                setPlacementCount(95);
                clearInterval(placementInterval);
              }
            }, 30);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-purple-700 font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-purple-950 mt-3">
            About <strong>DMI Engineering College</strong>
          </h2>
          <div className="w-24 h-1 bg-purple-700 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-96 w-full animate-slide-in-left">
            <img
              src="https://static.readdy.ai/image/aed2a83e7960c786dd7bda1b18d3e021/cd7040e137df1a773031d841dfc3fe53.jpeg"
              alt="DMI Engineering College ECE Block"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <h3 className="text-3xl font-bold text-purple-950">Our Foundation</h3>
            <p className="text-purple-800 text-base leading-relaxed">
              <strong>DMI Engineering College</strong> was established by <strong>DMI Foundation</strong>, which is an effort of sisters of DMI (Daughters of Mary Immaculate) and the fathers of MMI (Missionaries of Mary Immaculate) of the Catholic Church, which was founded in the year <strong>1984</strong> by <strong>Rev.Dr.Fr.J.E.Arulraj</strong>.
            </p>
            <p className="text-purple-800 text-base leading-relaxed">
              Located in the serene town of <strong>Aralvaimozhi, Tamil Nadu</strong>, our institution stands as a beacon of quality engineering education in South India, committed to nurturing technically competent and ethically strong engineers.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 bg-purple-700 rounded-lg flex items-center justify-center mb-6">
              <i className="ri-eye-line text-white text-2xl"></i>
            </div>
            <h4 className="text-2xl font-bold text-purple-950 mb-4">Vision</h4>
            <p className="text-purple-800 text-base leading-relaxed">
              To Elevate our institution into a premier technical education hub, empowering rural students with cutting-edge knowledge, while instilling disciplined living.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 bg-purple-700 rounded-lg flex items-center justify-center mb-6">
              <i className="ri-target-line text-white text-2xl"></i>
            </div>
            <h4 className="text-2xl font-bold text-purple-950 mb-4">Mission</h4>
            <ul className="space-y-3 text-purple-800 text-base leading-relaxed">
              <li className="flex items-start">
                <i className="ri-check-line text-purple-700 text-xl mt-0.5 mr-2 flex-shrink-0"></i>
                <span>To equip students with the skills and knowledge needed for thriving careers through comprehensive education.</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-purple-700 text-xl mt-0.5 mr-2 flex-shrink-0"></i>
                <span>To equip rural learners with the latest technical knowledge while cultivating values of self-discipline and integrity.</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line text-purple-700 text-xl mt-0.5 mr-2 flex-shrink-0"></i>
                <span>To train professionals to be entrepreneurs and employment generators.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-14 h-14 bg-amber-500 rounded-lg flex items-center justify-center mb-6">
              <i className="ri-award-line text-white text-2xl"></i>
            </div>
            <h4 className="text-xl font-bold text-purple-950 mb-3">AICTE Approved</h4>
            <p className="text-purple-800 text-sm leading-relaxed">
              Recognized and approved by the All India Council for Technical Education, ensuring quality standards in engineering education.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-14 h-14 bg-purple-700 rounded-lg flex items-center justify-center mb-6">
              <i className="ri-team-line text-white text-2xl"></i>
            </div>
            <h4 className="text-xl font-bold text-purple-950 mb-3">Expert Faculty</h4>
            <p className="text-purple-800 text-sm leading-relaxed">
              Highly qualified and experienced faculty members dedicated to providing quality education and mentorship to students.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="w-14 h-14 bg-purple-700 rounded-lg flex items-center justify-center mb-6">
              <i className="ri-building-line text-white text-2xl"></i>
            </div>
            <h4 className="text-xl font-bold text-purple-950 mb-3">Modern Infrastructure</h4>
            <p className="text-purple-800 text-sm leading-relaxed">
              State-of-the-art laboratories, well-equipped classrooms, and advanced facilities to support comprehensive learning.
            </p>
          </div>
        </div>

        <div ref={statsRef} className="bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.18),transparent)] border border-purple-100 rounded-2xl p-12 text-purple-950">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform transition-all hover:scale-110">
              <div className="text-4xl font-bold text-purple-700 mb-2">{yearsCount}+</div>
              <div className="text-purple-800 text-sm">Years of Excellence</div>
            </div>
            <div className="transform transition-all hover:scale-110">
              <div className="text-4xl font-bold text-purple-700 mb-2">{studentsCount}+</div>
              <div className="text-purple-800 text-sm">Students Enrolled</div>
            </div>
            <div className="transform transition-all hover:scale-110">
              <div className="text-4xl font-bold text-purple-700 mb-2">{facultyCount}+</div>
              <div className="text-purple-800 text-sm">Faculty Members</div>
            </div>
            <div className="transform transition-all hover:scale-110">
              <div className="text-4xl font-bold text-purple-700 mb-2">{placementCount}%</div>
              <div className="text-purple-800 text-sm">Placement Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
