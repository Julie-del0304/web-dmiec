import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';
import { useDepartmentFaculty } from '../../../hooks/useDepartmentFaculty';

export default function ECEPage() {
  const [scrolled, setScrolled] = useState(false);
  const { hod, staff, loading } = useDepartmentFaculty('ECE');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />
      <div className="pt-[72px] 2xl:pt-[120px]" />

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20electronics%20communication%20engineering%20laboratory%20circuit%20boards%20oscilloscopes%20microcontrollers%20students%20working%20electronic%20equipment%20professional%20academic%20environment%20red%20orange%20lighting&width=1920&height=600&seq=ece-hero-1&orientation=landscape"
          alt="Electronics & Communication Engineering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 to-red-700/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-cpu-line text-5xl text-white"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <strong>Electronics &amp; Communication Engineering</strong>
            </h1>
            <p className="text-xl text-rose-100 max-w-3xl mx-auto">
              Advancing communication technologies through VLSI design, embedded systems, and signal processing
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-white to-slate-50">
        {/* About */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>About the Department</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-600 to-red-500 mx-auto"></div>
            </div>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                Welcome to the Department of Electronics and Communication Engineering (ECE) at DMIEC, established in 2009, dedicated to providing quality education and fostering innovative research with a strong emphasis on both theoretical and practical knowledge. Annually, the department admits 60 undergraduates.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                The department has 10 faculty members with 3 PhD holders and 3 faculties currently pursuing their PhD degree. The department has signed strategic MOUs with 5 industry leaders and research institutions, fostering collaborative projects and enhancing students' exposure to real-world applications of their studies.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-gradient-to-br from-rose-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-rose-600">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-eye-line text-3xl text-white"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Vision</h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  To be a beacon of academic excellence in Electronics and Communication Engineering, and to produce engineers who are at the forefront of technological advancements and positive ethical contributors to the community.
                  </p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-red-600">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-rocket-line text-3xl text-white"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission</h2>
                <div className="space-y-4">
                  {[
                   ' To implement a dynamic curriculum that promotes critical thinking, creativity, and problem-solving skills among students in Electronics and Communication Engineering.',
                   ' To instill a strong sense of ethical responsibility and integrity in our students, emphasizing the importance of ethical behavior in all aspects of engineering practice.',
                   ' To inculcate students in industrial projects and motivate them to address the real-world challenges faced by local and global communities.'
                  ].map((m, i) => (
                    <div key={i} className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-rose-600 text-xl mr-3 mt-1 flex-shrink-0"></i>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Program Outcomes(POs)</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-600 to-red-500 mx-auto mb-6"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'ri-book-open-line', title: 'Engineering Knowledge', description: 'Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.' },
                { icon: 'ri-search-line', title: 'Problem Analysis', description: 'Identify, formulate, review research literature, and analyze complex engineering problems.' },
                { icon: 'ri-lightbulb-line', title: 'Development of Solutions', description: 'Design solutions for complex engineering problems considering public health and safety.' },
                { icon: 'ri-flask-line', title: 'Conduct Investigations', description: 'Use research-based knowledge and research methods including design of experiments and data analysis.' },
                { icon: 'ri-tools-line', title: 'Modern Tool Usage', description: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools.' },
                { icon: 'ri-group-line', title: 'The Engineer and Society', description: 'Apply reasoning to assess societal, health, safety, legal and cultural issues relevant to engineering practice.' },
                { icon: 'ri-leaf-line', title: 'Environment and Sustainability', description: 'Understand the impact of engineering solutions and the need for sustainable development.' },
                { icon: 'ri-shield-check-line', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics and responsibilities.' },
                { icon: 'ri-team-line', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in diverse teams.' },
                { icon: 'ri-chat-3-line', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community.' },
                { icon: 'ri-briefcase-line', title: 'Project Management', description: 'Apply engineering and management principles to manage projects in multidisciplinary environments.' },
                { icon: 'ri-graduation-cap-line', title: 'Life-long Learning', description: 'Recognize the need for and engage in independent and life-long learning.' }
              ].map((outcome, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
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
        <section className="py-20 bg-gradient-to-br from-rose-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>ECE Lab Facilities</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-600 to-red-500 mx-auto mb-6"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: 'ri-settings-3-line', title: 'State-of-the-Art Equipment', desc: 'Each lab is equipped with the latest tools and technology to ensure students work with industry-standard equipment.' },
                { icon: 'ri-book-open-line', title: 'Comprehensive Learning', desc: 'Our facilities support a wide range of experiments and projects, promoting a deep understanding of electronics concepts.' },
                { icon: 'ri-team-line', title: 'Collaborative Spaces', desc: 'Our labs are designed to accommodate multiple students simultaneously, fostering teamwork.' }
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                    <i className={`${f.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: 'Microprocessor Lab', desc: 'Equipped with advanced microprocessor kits and development tools, providing hands-on experience in programming and interfacing microprocessors.' },
                { name: 'VLSI Lab', desc: 'Featuring cutting-edge software and hardware for Very-Large-Scale Integration (VLSI) design, simulation, and implementation.' },
                { name: 'Networking Lab', desc: 'Outfitted with modern networking equipment and simulation tools for designing and troubleshooting computer networks.' },
                { name: 'Optical Lab', desc: 'Equipped with the latest optical communication tools for studying fiber optics, laser technology, and optical networks.' },
                { name: 'Electronics Lab', desc: 'Features various electronic components and testing equipment for designing and analyzing electronic circuits.' },
                { name: 'Microwave Lab', desc: 'Featuring state-of-the-art microwave testing equipment for practical experience in high-frequency communication systems.' }
              ].map((lab, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6 border-l-4 border-rose-500">
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
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Head of Department</strong></h2>
                <div className="w-24 h-1 bg-gradient-to-r from-rose-600 to-red-500 mx-auto"></div>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative h-96 md:h-auto">
                      <img src={hod.image_url || 'https://readdy.ai/api/search-image?query=professional%20professor%20formal%20attire&width=400&height=400&seq=default-hod&orientation=squarish'} alt={hod.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-red-500 rounded-xl flex items-center justify-center mb-6">
                        <i className="ri-user-star-line text-3xl text-white"></i>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{hod.name}</h3>
                      <p className="text-rose-600 font-semibold text-lg mb-3">{hod.designation}</p>
                      <p className="text-gray-600 mb-6">{hod.qualifications}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <i className="ri-mail-line mr-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Faculty */}
        <section className="py-20 bg-gradient-to-br from-rose-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Our Faculty</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-600 to-red-500 mx-auto mb-6"></div>
            </div>
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"><div className="h-80 bg-gray-200"></div><div className="p-6"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div></div></div>)}
              </div>
            ) : staff.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map(faculty => (
                  <div key={faculty.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-80">
                      <img src={faculty.image_url || 'https://readdy.ai/api/search-image?query=professional%20professor&width=400&height=400&seq=default-faculty&orientation=squarish'} alt={faculty.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">{faculty.name}</h3>
                        <p className="text-rose-200 font-medium">{faculty.designation}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <i className="ri-graduation-cap-line text-rose-600 text-xl mr-3 mt-1"></i>
                        <p className="text-gray-700">{faculty.qualifications}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12"><p className="text-gray-500">Faculty members will be added soon.</p></div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}