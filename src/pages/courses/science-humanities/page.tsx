import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';
import { useDepartmentFaculty } from '../../../hooks/useDepartmentFaculty';

export default function ScienceHumanitiesPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'labs' | 'outcomes'>('overview');
  const { hod, staff, loading, error } = useDepartmentFaculty('S&H');
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '#' },
    { label: 'Academic Courses', path: '#' },
    { label: 'Science & Humanities', path: '/courses/science-humanities' }
  ];

  const programs = [
    {
      title: 'Engineering Mathematics',
      description: 'Advanced mathematical concepts including calculus, differential equations, linear algebra, and numerical methods essential for engineering applications.',
      icon: 'ri-calculator-line',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Engineering Physics',
      description: 'Fundamental physics principles covering mechanics, thermodynamics, optics, quantum mechanics, and material science for engineering students.',
      icon: 'ri-atom-line',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Engineering Chemistry',
      description: 'Chemical principles and applications including electrochemistry, corrosion, polymers, nanomaterials, and environmental chemistry.',
      icon: 'ri-flask-line',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'English for Engineers',
      description: 'Communication skills, technical writing, presentation skills, and professional English for effective workplace communication.',
      icon: 'ri-book-open-line',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const laboratories = [
    {
      name: 'Physics Laboratory',
      description: 'Well-equipped lab with modern instruments for experiments in mechanics, optics, electricity, and magnetism.',
      equipment: ['Spectrometer', 'Laser Setup', 'CRO', 'Ultrasonic Interferometer', 'Hall Effect Setup'],
      image: 'https://readdy.ai/api/search-image?query=modern%20engineering%20physics%20laboratory%20with%20advanced%20scientific%20equipment%20and%20instruments%20for%20mechanics%20optics%20electricity%20experiments%20bright%20clean%20professional%20academic%20environment%20students%20conducting%20experiments&width=800&height=600&seq=physics-lab-001&orientation=landscape'
    },
    {
      name: 'Chemistry Laboratory',
      description: 'State-of-the-art chemistry lab with facilities for analytical, organic, and inorganic chemistry experiments.',
      equipment: ['pH Meter', 'Conductivity Meter', 'Colorimeter', 'Potentiometer', 'Titration Setup'],
      image: 'https://readdy.ai/api/search-image?query=modern%20engineering%20chemistry%20laboratory%20with%20glassware%20equipment%20chemical%20analysis%20instruments%20clean%20organized%20workspace%20students%20performing%20chemistry%20experiments%20professional%20academic%20setting&width=800&height=600&seq=chem-lab-001&orientation=landscape'
    },
    {
      name: 'Language Laboratory',
      description: 'Modern language lab with audio-visual aids and computer-assisted language learning tools.',
      equipment: ['Audio Systems', 'Computers', 'Headphones', 'Recording Equipment', 'Interactive Software'],
      image: 'https://readdy.ai/api/search-image?query=modern%20language%20laboratory%20with%20computers%20headphones%20audio%20equipment%20students%20learning%20english%20communication%20skills%20clean%20professional%20academic%20environment%20interactive%20learning%20setup&width=800&height=600&seq=lang-lab-001&orientation=landscape'
    }
  ];

  const outcomes = [
    {
      code: 'PO1',
      title: 'Mathematical Foundation',
      description: 'Apply mathematical principles and techniques to solve complex engineering problems.'
    },
    {
      code: 'PO2',
      title: 'Scientific Knowledge',
      description: 'Understand and apply fundamental concepts of physics and chemistry in engineering contexts.'
    },
    {
      code: 'PO3',
      title: 'Communication Skills',
      description: 'Communicate effectively in professional and academic settings through written and oral presentations.'
    },
    {
      code: 'PO4',
      title: 'Analytical Thinking',
      description: 'Develop analytical and problem-solving skills through scientific methodology and experimentation.'
    },
    {
      code: 'PO5',
      title: 'Laboratory Skills',
      description: 'Conduct experiments, analyze data, and interpret results using modern scientific instruments.'
    },
    {
      code: 'PO6',
      title: 'Lifelong Learning',
      description: 'Recognize the need for continuous learning and adapt to emerging scientific and technological developments.'
    }
  ];

  const syllabusContent = {
    mathematics: [
      'Differential Calculus and Integral Calculus',
      'Differential Equations and Applications',
      'Linear Algebra and Matrix Theory',
      'Vector Calculus and Multiple Integrals',
      'Transforms and Partial Differential Equations',
      'Numerical Methods and Optimization',
      'Probability and Statistics',
      'Complex Analysis and Fourier Series'
    ],
    physics: [
      'Mechanics and Properties of Matter',
      'Thermodynamics and Heat Transfer',
      'Waves and Oscillations',
      'Optics and Photonics',
      'Electricity and Magnetism',
      'Quantum Mechanics and Applications',
      'Semiconductor Physics and Devices',
      'Material Science and Nanotechnology'
    ],
    chemistry: [
      'Atomic and Molecular Structure',
      'Chemical Bonding and Thermodynamics',
      'Electrochemistry and Batteries',
      'Corrosion and Prevention Methods',
      'Polymers and Composite Materials',
      'Nanomaterials and Applications',
      'Water Chemistry and Treatment',
      'Environmental Chemistry and Green Technology'
    ],
    english: [
      'Technical Communication Skills',
      'Professional Writing and Documentation',
      'Presentation and Public Speaking',
      'Business Correspondence',
      'Report Writing and Research Papers',
      'Interpersonal Communication',
      'Group Discussion and Interview Skills',
      'Soft Skills and Personality Development'
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>}
                <a
                  href={crumb.path}
                  className={`${
                    index === breadcrumbs.length - 1
                      ? 'text-teal-600 font-semibold'
                      : 'text-gray-600 hover:text-teal-600'
                  } transition-colors duration-200`}
                >
                  {crumb.label}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <i className="ri-flask-line text-5xl"></i>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">
            Department of Science &amp; Humanities
          </h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Building strong foundational knowledge in mathematics, physics, chemistry, and communication skills
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: 'ri-information-line' },
              { id: 'syllabus', label: 'Syllabus', icon: 'ri-book-2-line' },
              { id: 'labs', label: 'Laboratories', icon: 'ri-test-tube-line' },
              { id: 'outcomes', label: 'Learning Outcomes', icon: 'ri-award-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-teal-600'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* About Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">About the Department</h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                  The Department of Science and Humanities serves as the foundation for all engineering disciplines at DMI Engineering College. We provide comprehensive education in fundamental sciences and humanities that are essential for developing well-rounded engineers.
                </p>
                <p>
                  Our department is committed to excellence in teaching and research, offering courses in Engineering Mathematics, Physics, Chemistry, and English Communication. We focus on building strong analytical, scientific, and communication skills that are crucial for success in engineering careers.
                </p>
                <p>
                  With state-of-the-art laboratories and experienced faculty members, we ensure that students gain both theoretical knowledge and practical skills. Our curriculum is designed to meet industry requirements and prepare students for the challenges of modern engineering practice.
                </p>
              </div>
            </div>
          </section>

          {/* Programs Section */}
          <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Core Programs</h2>
              <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
                Comprehensive foundational courses designed to build strong scientific and communication skills
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {programs.map((program, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center mb-6`}>
                      <i className={`${program.icon} text-3xl text-white`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{program.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Faculty Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Faculty</h2>
              <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
                Experienced educators dedicated to building strong foundational knowledge
              </p>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600"></div>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-error-warning-line text-5xl text-red-500"></i>
                  </div>
                  <p className="text-red-500 text-lg">{error}</p>
                </div>
              ) : (
                <>
                  {hod && (
                    <div className="mb-16">
                      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Head of Department</h3>
                      <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                          <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100">
                            {hod.image_url ? (
                              <img
                                src={hod.image_url}
                                alt={hod.name}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <i className="ri-user-line text-8xl text-gray-400"></i>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">{hod.name}</h4>
                            <p className="text-teal-600 font-semibold mb-3">{hod.designation}</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">{hod.qualifications}</p>
                            {hod.bio && (
                              <p className="text-gray-700 text-sm leading-relaxed">{hod.bio}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {staff.length > 0 && (
                    <>
                      <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Faculty Members</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {staff.map((member) => (
                          <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100">
                              {member.image_url ? (
                                <img
                                  src={member.image_url}
                                  alt={member.name}
                                  className="w-full h-full object-cover object-top"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <i className="ri-user-line text-8xl text-gray-400"></i>
                                </div>
                              )}
                            </div>
                            <div className="p-6">
                              <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                              <p className="text-teal-600 font-semibold mb-3">{member.designation}</p>
                              <p className="text-gray-600 text-sm leading-relaxed">{member.qualifications}</p>
                              {member.bio && (
                                <p className="text-gray-700 text-sm leading-relaxed mt-3">{member.bio}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {!hod && staff.length === 0 && (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="ri-user-line text-5xl text-gray-400"></i>
                      </div>
                      <p className="text-gray-500 text-lg">No faculty members found for this department.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </>
      )}

      {/* Syllabus Tab */}
      {activeTab === 'syllabus' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Course Syllabus</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Comprehensive curriculum covering essential topics in science and humanities
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mathematics */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                    <i className="ri-calculator-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Engineering Mathematics</h3>
                </div>
                <ul className="space-y-3">
                  {syllabusContent.mathematics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-blue-600 text-lg mr-3 mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Physics */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <i className="ri-atom-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Engineering Physics</h3>
                </div>
                <ul className="space-y-3">
                  {syllabusContent.physics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-purple-600 text-lg mr-3 mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemistry */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <i className="ri-flask-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Engineering Chemistry</h3>
                </div>
                <ul className="space-y-3">
                  {syllabusContent.chemistry.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-600 text-lg mr-3 mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* English */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-4">
                    <i className="ri-book-open-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">English for Engineers</h3>
                </div>
                <ul className="space-y-3">
                  {syllabusContent.english.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-orange-600 text-lg mr-3 mt-1 flex-shrink-0"></i>
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Laboratories Tab */}
      {activeTab === 'labs' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Laboratories</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              State-of-the-art facilities equipped with modern instruments for hands-on learning
            </p>

            <div className="space-y-12">
              {laboratories.map((lab, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex flex-col lg:flex`}
                >
                  <div className="lg:w-1/2 h-96 lg:h-auto">
                    <img
                      src={lab.image}
                      alt={lab.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">{lab.name}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{lab.description}</p>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Key Equipment:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {lab.equipment.map((item, idx) => (
                          <div key={idx} className="flex items-center">
                            <i className="ri-checkbox-circle-fill text-teal-600 text-lg mr-2"></i>
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Learning Outcomes Tab */}
      {activeTab === 'outcomes' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Learning Outcomes</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Skills and competencies students will develop through our programs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{outcome.code}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{outcome.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}
