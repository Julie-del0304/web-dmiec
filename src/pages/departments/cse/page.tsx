import { useState, useEffect, useRef } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';
import { useDepartmentFaculty } from '../../../hooks/useDepartmentFaculty';

export default function CSEPage() {
  const [scrolled, setScrolled] = useState(false);
  const { hod, staff, loading } = useDepartmentFaculty('CSE');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=modern%20computer%20science%20engineering%20laboratory%20students%20working%20computers%20programming%20coding%20technology%20clean%20bright%20professional%20academic%20environment%20blue%20lighting&width=1920&height=600&seq=cse-hero-1&orientation=landscape"
          alt="Computer Science Engineering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-emerald-700/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-computer-line text-5xl text-white"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <strong>Computer Science &amp; Engineering</strong>
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Pioneering innovation in software development, artificial intelligence, and cutting-edge computing technologies
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-white to-slate-50">
        {/* About the Department Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>About the Department</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-500 mx-auto"></div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  The Department of Computer Science and Engineering was established in <strong>2009</strong> with the vision of cultivating proficient, ethical computing professionals. The department offers a four-year <strong>B.E. program in Computer Science and Engineering</strong> with an annual intake of <strong>120 students</strong>, leading in innovative and technical education.
                </p>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  The department has advanced computer labs and dedicated faculties, fostering student development in <strong>Programming, Data Structures and Algorithms, Machine Learning, Artificial Intelligence, Cloud Computing, Mobile Applications, and Research</strong> with a balanced blend of theoretical and practical skills.
                </p>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  In addition to university curriculum training, the department emphasizes value addition through emerging industry areas and supports high-quality education to encourage independent thinking and initiatives.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 text-center">
                    <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-team-line text-2xl text-white"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">CSI Membership</h3>
                    <p className="text-sm text-gray-600">Computer Society of India</p>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 text-center">
                    <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-award-line text-2xl text-white"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Oracle CoE</h3>
                    <p className="text-sm text-gray-600">Center of Excellence with ICT Academy</p>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 text-center">
                    <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-building-line text-2xl text-white"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Industry Partners</h3>
                    <p className="text-sm text-gray-600">5 IT Industries + Microsoft Campus Agreement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-teal-600">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-eye-line text-3xl text-white"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Vision</h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  To cultivate and enable students to thrive as proficient, and skilled problem solvers, equipped with the essential competencies to emerge as adept computing professionals, and imbued with the ethical values requisite for achieving success.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-emerald-600">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="ri-rocket-line text-3xl text-white"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mr-3 mt-1 flex-shrink-0"></i>
                    <p className="text-gray-700 text-base leading-relaxed">To provide students with a degree that combines theoretical knowledge with practical application, enabling them to become intelligent problem solvers and computer experts.</p>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-checkbox-circle-fill text-emerald-600 text-xl mr-3 mt-1 flex-shrink-0"></i>
                    <p className="text-gray-700 text-base leading-relaxed">To develop a culture of honesty, responsibility and fair vision to ensure that our graduates are not only successful in their jobs, but also have good ethical practices that support society through their participation.</p>
                  </li>
                </ul>
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
              <p className="text-gray-600 text-base max-w-4xl mx-auto leading-relaxed">Our Computer science and Engineering Lab is a dynamic and innovative space, equipped with the latest technology and resources to provide students with a rich and immersive learning experience.</p>
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
                  <h3 className="text-3xl font-bold mb-2">CSE Lab</h3>
                  <p className="text-emerald-100 text-base">State-of-the-art facilities for hands-on learning and innovation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Outcomes Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Program Outcomes(POs)</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-base max-w-3xl mx-auto">Our B.E. program in Computer Science and Engineering is designed to develop well-rounded professionals with comprehensive skills</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'ri-book-open-line', title: 'Engineering Knowledge', desc: ' Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.' },
                { icon: 'ri-search-line', title: 'Problem analysis', desc: 'Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.' },
                { icon: 'ri-lightbulb-line', title: 'Development of Solutions', desc: 'Design/ Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.' },
                { icon: 'ri-flask-line', title: 'Conduct Investigations of complex problems', desc: ' Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.' },
                { icon: 'ri-tools-line', title: 'Modern Tool Usage', desc: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.' },
                { icon: 'ri-community-line', title: 'The Engineer and Society', desc: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.' },
                { icon: 'ri-leaf-line', title: 'Environment & Sustainability', desc: 'Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.' },
                { icon: 'ri-shield-check-line', title: 'Ethics', desc: 'Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.' },
                { icon: 'ri-group-line', title: 'Individual & Team Work', desc: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.' },
                { icon: 'ri-chat-3-line', title: 'Communication', desc: ' Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.' },
                { icon: 'ri-briefcase-line', title: 'Project Management and finance', desc: ' Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.' },
                { icon: 'ri-graduation-cap-line', title: 'Life-long Learning', desc: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' }
              ].map((outcome, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${outcome.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{outcome.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{outcome.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOD Section */}
        {loading ? (
          <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
              </div>
            </div>
          </section>
        ) : hod ? (
          <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Head of Department</strong></h2>
                <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-500 mx-auto"></div>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="relative h-96 md:h-full">
                        <img src={hod.image_url || 'https://readdy.ai/api/search-image?query=professional%20professor%20formal%20attire%20confident%20smile%20academic%20setting&width=400&height=400&seq=default-hod&orientation=squarish'} alt={hod.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent"></div>
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                        <i className="ri-user-star-line text-3xl text-white"></i>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{hod.name}</h3>
                      <p className="text-teal-600 font-semibold text-lg mb-3">{hod.designation}</p>
                      <p className="text-gray-600 mb-6">{hod.qualifications}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <i className="ri-mail-line mr-2"></i>
                        <span>edwinalbert@dmiengg.edu.in</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Faculty Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Our Faculty</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-emerald-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-base max-w-2xl mx-auto">Our Computer Science Engineering faculty members provide students with a comprehensive and up-to-date education in computer science.Their expertise spans across various domains including artificial intelligence, machine learning, cybersecurity, software engineering, and data science.</p>
            </div>
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                    <div className="h-80 bg-gray-200"></div>
                    <div className="p-6"><div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div><div className="h-4 bg-gray-200 rounded w-1/2"></div></div>
                  </div>
                ))}
              </div>
            ) : staff.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map((faculty) => (
                  <div key={faculty.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative h-80">
                      <img src={faculty.image_url || 'https://readdy.ai/api/search-image?query=professional%20professor%20formal%20attire%20confident%20smile%20academic%20setting&width=400&height=400&seq=default-faculty&orientation=squarish'} alt={faculty.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-teal-900/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">{faculty.name}</h3>
                        <p className="text-teal-200 font-medium">{faculty.designation}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <i className="ri-graduation-cap-line text-teal-600 text-xl mr-3 mt-1"></i>
                        <p className="text-gray-700">{faculty.qualifications}</p>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <i className="ri-mail-line mr-2"></i>
                        <span>{faculty.name.toLowerCase().replace(/\s+/g, '.')}@dmiengg.edu.in</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-user-line text-3xl text-gray-400"></i>
                </div>
                <p className="text-gray-500">Faculty members will be added soon.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}