import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';
import { useDepartmentFaculty } from '../../../hooks/useDepartmentFaculty';

export default function MechanicalPage() {
  const [scrolled, setScrolled] = useState(false);
  const { hod, staff, loading } = useDepartmentFaculty('MECH');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />
      <div className="pt-[72px] 2xl:pt-[120px]" />

      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=modern%20mechanical%20engineering%20workshop%20laboratory%20machines%20lathe%20cnc%20equipment%20students%20working%20manufacturing%20tools%20professional%20academic%20environment%20steel%20gray%20lighting&width=1920&height=600&seq=mech-hero-1&orientation=landscape" alt="Mechanical Engineering" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-gray-700/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-settings-3-line text-5xl text-white"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4"><strong>Mechanical Engineering</strong></h1>
            <p className="text-xl text-slate-100 max-w-3xl mx-auto">Building the future through design, manufacturing, and innovative mechanical systems</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-white to-slate-50">
        {/* About */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>About the Department</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-slate-600 to-gray-500 mx-auto"></div>
            </div>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-6">The Mechanical Engineering Department at DMI Engineering College, established in 2009, is a premier center for learning and innovation. The department boasts a team of well-qualified and experienced faculty, with 80% holding Ph.D. degrees. They are dedicated to providing a comprehensive education that combines technical training with ethical, moral, and spiritual development.</p>
                <p className="mb-6">The department focuses on cutting-edge areas like robotics, Drone technology, and sustainable energy. It has forged strong industry connections through MOUs with organizations such as TUV Rehinland, Ford India, and Garuda Aerospace.</p>
                <p>Students develop problem-solving skills, critical thinking, and collaboration, making them highly sought after by top companies.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {[
                  { icon: 'ri-graduation-cap-line', value: '80%', label: 'Faculty with Ph.D. Degrees' },
                  { icon: 'ri-building-line', value: '3+', label: 'Industry MOUs' },
                  { icon: 'ri-calendar-line', value: '2009', label: 'Year Established' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-6 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <i className={`${stat.icon} text-3xl text-white`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-700 mb-2">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-slate-600">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-eye-line text-3xl text-white"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Vision</h2>
                <p className="text-gray-600 text-base leading-relaxed">To foster an enriching learning environment that cultivates innovation, entrepreneurship and competence among Mechanical Engineering graduates, while concurrently nurturing meaningful connections with communities.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-gray-600">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-rocket-line text-3xl text-white"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission</h2>
                <div className="space-y-4">
                  {[
                    'To implement a comprehensive educational framework that fosters a culture of innovation and entrepreneurship.',
                    'To deliver a rigorous and industry-relevant curriculum that equips graduates with knowledge and skills for diverse professional environments.',
                    'To facilitate meaningful interactions between students, faculty and local communities to address societal needs.'
                  ].map((m, i) => (
                    <div key={i} className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-slate-600 text-xl mr-3 mt-1 flex-shrink-0"></i>
                      <p className="text-gray-600 text-base leading-relaxed">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Outcomes */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Program Outcomes</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-slate-600 to-gray-500 mx-auto mb-6"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'ri-book-open-line', title: 'Engineering Knowledge', description: 'Apply the knowledge of mathematics, science, and engineering fundamentals to solve complex engineering problems.' },
                { icon: 'ri-search-line', title: 'Problem Analysis', description: 'Identify, formulate, review research literature, and analyze complex engineering problems.' },
                { icon: 'ri-lightbulb-line', title: 'Development of Solutions', description: 'Design solutions for complex engineering problems considering public health, safety, and environmental factors.' },
                { icon: 'ri-flask-line', title: 'Conduct Investigations', description: 'Use research-based knowledge and methods including design of experiments and data analysis.' },
                { icon: 'ri-tools-line', title: 'Modern Tool Usage', description: 'Create, select, and apply appropriate techniques, resources, and modern engineering tools.' },
                { icon: 'ri-community-line', title: 'Engineer and Society', description: 'Apply reasoning to assess societal, health, safety, legal and cultural issues relevant to engineering.' },
                { icon: 'ri-leaf-line', title: 'Environment and Sustainability', description: 'Understand the impact of engineering solutions and the need for sustainable development.' },
                { icon: 'ri-shield-check-line', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics and responsibilities.' },
                { icon: 'ri-team-line', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in diverse teams.' },
                { icon: 'ri-chat-3-line', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community.' },
                { icon: 'ri-briefcase-line', title: 'Project Management', description: 'Apply engineering and management principles to manage projects in multidisciplinary environments.' },
                { icon: 'ri-book-read-line', title: 'Life-long Learning', description: 'Recognize the need for and engage in independent and life-long learning.' }
              ].map((outcome, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center mb-4">
                    <i className={`${outcome.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{outcome.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lab Facilities */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Lab Facilities</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-slate-600 to-gray-500 mx-auto mb-6"></div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-12">
              <img src="https://readdy.ai/api/search-image?query=modern%20mechanical%20engineering%20laboratory%20workshop%20wide%20view%20multiple%20workstations%20cnc%20machines%20lathes%20equipment%20students%20working%20professional%20industrial%20setting%20bright%20lighting&width=1400&height=600&seq=mech-all-labs-1&orientation=landscape" alt="All Academic Labs" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-4xl font-bold text-white mb-2">All Academic Labs</h3>
                <p className="text-slate-200 text-lg">Comprehensive facilities for hands-on learning and innovation</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: 'CAD Lab', desc: 'Equipped with high-performance computers and advanced software for computer-aided design, enabling precise engineering drawings and simulations.' },
                { name: 'Dynamics Lab', desc: 'Featuring modern instrumentation and tools to study the motion and forces on mechanical systems.' },
                { name: 'Machine Lab', desc: 'Outfitted with various machines for hands-on experience in manufacturing processes including milling, drilling, and grinding.' },
                { name: 'Lathe Work Lab', desc: 'Equipped with several types of lathes and accessories for practicing turning operations and machining.' },
                { name: 'Mechatronics Lab', desc: 'Combining mechanical, electronic, computer, and control engineering for developing and testing automated systems and smart technologies.' }
              ].map((lab, i) => (
                <div key={i} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${i === 4 ? 'md:col-span-2' : ''}`}>
                  <div className="p-6 border-l-4 border-slate-500">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{lab.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{lab.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOD */}
        {hod && (
          <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Head of Department</strong></h2>
                <div className="w-24 h-1 bg-gradient-to-r from-slate-600 to-gray-500 mx-auto"></div>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative h-96 md:h-auto">
                      <img src={hod.image_url || ''} alt={hod.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-500 rounded-xl flex items-center justify-center mb-6">
                        <i className="ri-user-star-line text-3xl text-white"></i>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{hod.name}</h3>
                      <p className="text-slate-600 font-semibold text-lg mb-3">{hod.designation}</p>
                      <p className="text-gray-600 mb-6">{hod.qualifications}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <i className="ri-mail-line mr-2"></i><span>hod.mech@dmi.ac.in</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Faculty */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Our Faculty</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-slate-600 to-gray-500 mx-auto mb-6"></div>
            </div>
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{[1,2,3].map(i=><div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"><div className="h-80 bg-gray-200"></div><div className="p-6"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div></div></div>)}</div>
            ) : staff.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map(faculty => (
                  <div key={faculty.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-80">
                      <img src={faculty.image_url || ''} alt={faculty.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">{faculty.name}</h3>
                        <p className="text-slate-200 font-medium">{faculty.designation}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <i className="ri-graduation-cap-line text-slate-600 text-xl mr-3 mt-1"></i>
                        <p className="text-gray-700">{faculty.qualifications}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <div className="text-center py-12"><p className="text-gray-500">Faculty members will be added soon.</p></div>}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}