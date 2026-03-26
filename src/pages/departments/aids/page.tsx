import { useState, useEffect } from 'react';
import { useDepartmentFaculty } from '../../../hooks/useDepartmentFaculty';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function AIDSPage() {
  const { hod, staff, loading, error } = useDepartmentFaculty('AIDS');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-[72px] 2xl:pt-[120px]" />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <i className="ri-brain-line text-5xl"></i>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">
            Artificial Intelligence & Data Science
          </h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Empowering the next generation of AI innovators and data scientists
          </p>
        </div>
      </div>

      {/* About the Department */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About the Department</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              The Department of Artificial Intelligence and Data Science (AI&DS) offers a B.Tech. Program in Artificial Intelligence and Data Science, launching a new intake of 90 students starting from the academic year 2022-2023 with the vision of producing graduates with advanced global competencies in AI and Data Science, fostering successful careers, lifelong learning, and dedication to driving ethical social development initiatives.
            </p>
            <p>
              The curriculum is designed as an Outcome-Based Education model and includes industrial internships to align students with current industry trends. The department is developing state-of-the-art infrastructure and aims to foster both technical skills and a robust research culture, featuring a Centre of Excellence in AI.
            </p>
            <p>
              AI&DS department collaborates with four IT companies. In association with ICT ACADEMY we have the center of excellence in Oracle. It also hosts a chapter of the Computer Society of India (CSI), enhancing its professional networking and promoting collaboration in computer science and technology and it has established a campus agreement with Microsoft. We have professional Membership in ISTE. We have Tie up with 16 Companies.
            </p>
            <p className="font-semibold text-gray-900">
              Career opportunities include Big Data Engineer, Data Scientist, AI Engineer, Full Stack Developer, Software Architect, Robotics Engineer, etc.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                  <i className="ri-eye-line text-3xl text-white"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To produce graduates with global competency, career success, and lifelong learning who are passionate about social development and ethical values.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                  <i className="ri-rocket-line text-3xl text-white"></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Mission</h3>
              </div>
              <ul className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-indigo-600 text-xl mr-3 mt-1 flex-shrink-0"></i>
                  <span>To provide high-quality experimental learning to get expertise in modern Artificial Intelligence tools and to meet the current needs of the industry.</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-indigo-600 text-xl mr-3 mt-1 flex-shrink-0"></i>
                  <span>To create a learning atmosphere that fosters inventiveness, problem-solving abilities, and a sense of ethical and social Obligations.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Program Outcomes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Program Outcomes (POs)</h2>
          <p className="text-gray-600 text-center mb-12 text-lg">Comprehensive learning outcomes designed to shape future AI & Data Science professionals</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-book-open-line', title: 'Engineering Knowledge', description: 'Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.' },
              { icon: 'ri-search-line', title: 'Problem Analysis', description: 'Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.' },
              { icon: 'ri-lightbulb-line', title: 'Development of Solutions', description: 'Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.' },
              { icon: 'ri-flask-line', title: 'Conduct Investigations', description: 'Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.' },
              { icon: 'ri-tools-line', title: 'Modern Tool Usage', description: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.' },
              { icon: 'ri-community-line', title: 'Engineer and Society', description: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.' },
              { icon: 'ri-leaf-line', title: 'Environment and Sustainability', description: 'Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.' },
              { icon: 'ri-shield-check-line', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.' },
              { icon: 'ri-team-line', title: 'Individual and Team Work', description: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.' },
              { icon: 'ri-chat-3-line', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large.' },
              { icon: 'ri-briefcase-line', title: 'Project Management', description: 'Demonstrate knowledge and understanding of the engineering and management principles and apply these to one\'s own work, as a member and leader in a team.' },
              { icon: 'ri-graduation-cap-line', title: 'Life-long Learning', description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' }
            ].map((outcome, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${outcome.icon} text-2xl text-white`}></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{outcome.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Lab Facilities */}
        <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3"><strong>Lab Facilities</strong></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-500 mx-auto mb-6"></div>
              <p className="text-gray-600 text-base max-w-4xl mx-auto leading-relaxed">Our Artificial  Intelligence and Data Science Lab is a dynamic and innovative space, equipped with the latest technology and resources to provide students with a rich and immersive learning experience.</p>
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
                  <h3 className="text-3xl font-bold mb-2">AI&DS Lab</h3>
                  <p className="text-emerald-100 text-base">State-of-the-art facilities for hands-on learning and innovation</p>
                </div>
              </div>
            </div>
          </div>
        </section>


      {/* Our Faculty */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Faculty</h2>
          <p className="text-gray-700 text-center mb-12 text-lg max-w-4xl mx-auto leading-relaxed">
            Our Artificial Intelligence (AI) and Data Science (DS) faculty members are dedicated to providing students with a comprehensive and current education in these rapidly evolving fields.
          </p>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
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
                      <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100">
                        {hod.image_url ? (
                          <img src={hod.image_url} alt={hod.name} className="w-full h-full object-cover object-top" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="ri-user-line text-8xl text-gray-400"></i>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">{hod.name}</h4>
                        <p className="text-indigo-600 font-semibold mb-3">{hod.designation}</p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{hod.qualifications}</p>
                        {hod.bio && <p className="text-gray-700 text-sm leading-relaxed">{hod.bio}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {staff.length > 0 ? (
                <>
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Faculty Members</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {staff.map((member) => (
                      <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100">
                          {member.image_url ? (
                            <img src={member.image_url} alt={member.name} className="w-full h-full object-cover object-top" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <i className="ri-user-line text-8xl text-gray-400"></i>
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                          <p className="text-indigo-600 font-semibold mb-3">{member.designation}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{member.qualifications}</p>
                          {member.bio && <p className="text-gray-700 text-sm leading-relaxed mt-3">{member.bio}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : !hod && (
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

      <Footer />
    </div>
  );
}