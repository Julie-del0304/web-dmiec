import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';
import { useDepartmentFaculty } from '../../../hooks/useDepartmentFaculty';

export default function ITPage() {
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { hod, staff, loading } = useDepartmentFaculty('IT');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const pageKey = 'reloaded-' + window.location.pathname.replace(/\//g, '-');
    if (!sessionStorage.getItem(pageKey)) {
      sessionStorage.setItem(pageKey, 'true');
      window.location.reload();
    }
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />
      <div className="pt-[72px] 2xl:pt-[120px]" />

      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=modern%20information%20technology%20laboratory%20network%20servers%20data%20center%20students%20working%20computers%20networking%20equipment%20professional%20academic%20environment%20green%20blue%20lighting&width=1920&height=600&seq=it-hero-1&orientation=landscape" alt="Information Technology" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-teal-700/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-server-line text-5xl text-white"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4"><strong>Information Technology</strong></h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">Empowering the digital future through network systems, cloud computing, and cybersecurity excellence</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-white to-slate-50">
        {/* Vision & Mission */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-emerald-600">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-eye-line text-3xl text-white"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Vision</h2>
                <p className="text-gray-600 text-base leading-relaxed">The vision of the Information Technology Department at our college is to be a leader in educational technology, transforming the college experience by integrating advanced, sustainable, and accessible technology solutions.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-teal-600">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-rocket-line text-3xl text-white"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission</h2>
                <p className="text-gray-600 text-base leading-relaxed">The mission of the Information Technology Department is to provide innovative, reliable, and secure technological services and support that enhance the educational, research, and administrative endeavors of our college community.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Lab Facilities */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Lab Facilities</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-base max-w-4xl mx-auto leading-relaxed">Our Information Technology Lab is a dynamic and innovative space, equipped with the latest technology and resources to provide students with a rich and immersive learning experience.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: 'ri-computer-line', color: 'from-emerald-500 to-emerald-600', title: 'Advanced Technology Infrastructure', desc: 'High-performance computers, state-of-the-art servers, and cutting-edge networking equipment.' },
                { icon: 'ri-cloud-line', color: 'from-teal-500 to-teal-600', title: 'Virtualization and Cloud Access', desc: 'Extensive virtualization capabilities and cloud service integration for complex IT environments.' },
                { icon: 'ri-shield-check-line', color: 'from-emerald-500 to-emerald-600', title: 'Cybersecurity Focus', desc: 'Dedicated cybersecurity resources for network security, ethical hacking, and threat assessment.' },
                { icon: 'ri-code-box-line', color: 'from-teal-500 to-teal-600', title: 'Software Development Lifecycle', desc: 'Equipped with IDEs, version control systems, and debugging tools for complete software development.' }
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-lg flex items-center justify-center mb-4`}>
                    <i className={`${f.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-96">
                <img src="https://readdy.ai/api/search-image?query=modern%20information%20technology%20computer%20laboratory%20students%20working%20rows%20of%20desktop%20computers%20clean%20organized%20professional%20IT%20lab&width=1400&height=600&seq=it-lab-facility-1&orientation=landscape" alt="IT Lab" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">IT Lab</h3>
                  <p className="text-emerald-100 text-base">State-of-the-art facilities for hands-on learning and innovation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOD */}
        {hod && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Head of Department</strong></h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-500 mx-auto"></div>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative h-96 md:h-auto">
                      <img src={hod.image_url || ''} alt={hod.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                        <i className="ri-user-star-line text-3xl text-white"></i>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{hod.name}</h3>
                      <p className="text-emerald-600 font-semibold text-lg mb-3">{hod.designation}</p>
                      <p className="text-gray-600 mb-6">{hod.qualifications}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <i className="ri-mail-line mr-2"></i><span>{hod.email|| 'hod.it@dmi.ac.in'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Faculty */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Our Faculty</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-500 mx-auto mb-6"></div>
            </div>
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{[1,2,3].map(i=><div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"><div className="h-80 bg-gray-200"></div><div className="p-6"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div></div></div>)}</div>
            ) : staff.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map(faculty => (
                  <div key={faculty.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-80">
                      <img src={faculty.image_url || ''} alt={faculty.name} className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">{faculty.name}</h3>
                        <p className="text-emerald-200 font-medium">{faculty.designation}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <i className="ri-graduation-cap-line text-emerald-600 text-xl mr-3 mt-1"></i>
                        <p className="text-gray-700 text-sm">{faculty.qualifications}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="text-center py-12"><p className="text-gray-500">Faculty members will be added soon.</p></div>}
          </div>
        </section>
      </div>
      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </>
  );
}