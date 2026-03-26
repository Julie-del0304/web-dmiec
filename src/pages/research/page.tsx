import { useEffect, useState } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function ResearchPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://readdy.ai/api/search-image?query=modern%20scientific%20research%20laboratory%20with%20advanced%20equipment%20microscopes%20computers%20clean%20white%20background%20professional%20academic%20setting%20bright%20lighting%20technology%20innovation&width=1920&height=600&seq=research-hero-bg&orientation=landscape")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-500/20 rounded-full mb-6">
            <i className="ri-flask-line text-5xl text-sky-400"></i>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Research &amp; Development
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            At DMI Engineering College, we seamlessly integrate teaching and research to benefit our student community. Our institution is committed to fostering innovation and technological progress through our dedicated Research and Development unit.
          </p>
        </div>
      </section>

      {/* Academic Research Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Innovation &amp; Discovery</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
                <strong>Academic Research</strong>
              </h2>
              <div className="w-24 h-1 bg-sky-600 mb-8"></div>
              
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Our faculty and students engage in cutting-edge academic research across various engineering disciplines, contributing to knowledge advancement and innovation in technology. We foster a culture of inquiry and discovery that pushes the boundaries of engineering education.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-microscope-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Faculty-Led Research Projects</h3>
                    <p className="text-slate-600 text-sm">
                      Our experienced faculty members lead groundbreaking research projects in emerging technologies including AI, IoT, renewable energy, and advanced materials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-lightbulb-flash-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Student Research Initiatives</h3>
                    <p className="text-slate-600 text-sm">
                      Students actively participate in research through innovation labs, project-based learning, and collaborative research programs with faculty mentors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-article-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Publications &amp; Conferences</h3>
                    <p className="text-slate-600 text-sm">
                      Our research findings are regularly published in reputed international journals and presented at prestigious conferences worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-team-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Collaborative Research</h3>
                    <p className="text-slate-600 text-sm">
                      We partner with leading academic institutions and research organizations to conduct joint research projects and knowledge exchange programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://readdy.ai/api/search-image?query=engineering%20students%20working%20in%20modern%20research%20laboratory%20with%20computers%20equipment%20teamwork%20collaboration%20bright%20clean%20professional%20academic%20environment%20technology%20innovation&width=800&height=900&seq=academic-research-img&orientation=portrait"
                  alt="Academic Research"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsored Research Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://readdy.ai/api/search-image?query=professional%20research%20team%20presenting%20project%20to%20industry%20partners%20modern%20office%20meeting%20room%20collaboration%20innovation%20technology%20funding%20partnership%20clean%20bright%20setting&width=800&height=900&seq=sponsored-research-img&orientation=portrait"
                  alt="Sponsored Research"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl -z-10"></div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Industry Collaboration</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
                <strong>Sponsored Research</strong>
              </h2>
              <div className="w-24 h-1 bg-emerald-600 mb-8"></div>
              
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                We actively pursue sponsored research projects funded by government agencies and industry partners, driving practical solutions to real-world engineering challenges. Our sponsored research initiatives bridge the gap between academia and industry.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-government-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Government-Funded Initiatives</h3>
                    <p className="text-slate-600 text-sm">
                      We secure funding from prestigious government agencies including DST, AICTE, and DRDO for research projects addressing national priorities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-building-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Industry-Sponsored Projects</h3>
                    <p className="text-slate-600 text-sm">
                      Leading companies partner with us for research and consultancy projects, providing real-world problems for our faculty and students to solve.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-patent-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Patent Filing &amp; IP Development</h3>
                    <p className="text-slate-600 text-sm">
                      Our research leads to innovative solutions that are protected through patents, contributing to intellectual property development and commercialization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-rocket-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Technology Transfer</h3>
                    <p className="text-slate-600 text-sm">
                      We facilitate the commercialization of research outcomes through technology transfer agreements, turning academic research into market-ready solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-wider">Focus Areas</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
              <strong>Key Research Domains</strong>
            </h2>
            <div className="w-24 h-1 bg-sky-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'ri-brain-line', title: 'Artificial Intelligence', color: 'from-violet-500 to-purple-600' },
              { icon: 'ri-robot-line', title: 'Robotics &amp; Automation', color: 'from-sky-500 to-blue-600' },
              { icon: 'ri-leaf-line', title: 'Renewable Energy', color: 'from-emerald-500 to-teal-600' },
              { icon: 'ri-wireless-charging-line', title: 'IoT &amp; Embedded Systems', color: 'from-amber-500 to-orange-600' },
              { icon: 'ri-database-2-line', title: 'Data Science &amp; Analytics', color: 'from-rose-500 to-pink-600' },
              { icon: 'ri-cpu-line', title: 'VLSI &amp; Microelectronics', color: 'from-cyan-500 to-blue-600' }
            ].map((area, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className={`h-2 bg-gradient-to-r ${area.color}`}></div>
                <div className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${area.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${area.icon} text-white text-4xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors" dangerouslySetInnerHTML={{ __html: area.title }}></h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500/20 rounded-full mb-6">
            <i className="ri-mail-line text-4xl text-sky-400"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Interested in Research Collaboration?
          </h2>
          <p className="text-blue-200 text-base mb-8 max-w-2xl mx-auto">
            We welcome research collaborations with academic institutions, industry partners, and government agencies. Get in touch to explore opportunities.
          </p>
          <button className="bg-sky-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-sky-600 transition-all hover:scale-105 whitespace-nowrap">
            Contact Research Team
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
