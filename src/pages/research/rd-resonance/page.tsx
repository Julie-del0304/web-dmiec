
import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function RDResonancePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Research', path: '/research' },
    { label: 'R&D Resonance', path: '/research/rd-resonance' },
  ];

  const initiatives = [
    {
      title: 'Innovation Labs',
      description:
        'State-of-the-art research laboratories equipped with cutting-edge technology for advanced engineering research and development.',
      icon: 'ri-lightbulb-flash-line',
      color: 'from-violet-500 to-purple-600',
      stats: { value: '12+', label: 'Active Labs' },
    },
    {
      title: 'Research Projects',
      description:
        'Ongoing research projects spanning multiple engineering domains with focus on real-world problem solving and innovation.',
      icon: 'ri-flask-line',
      color: 'from-sky-500 to-blue-600',
      stats: { value: '45+', label: 'Projects' },
    },
    {
      title: 'Faculty Research',
      description:
        'Dedicated faculty members actively engaged in cutting-edge research contributing to academic excellence and industry advancement.',
      icon: 'ri-team-line',
      color: 'from-emerald-500 to-teal-600',
      stats: { value: '60+', label: 'Researchers' },
    },
    {
      title: 'Student Participation',
      description:
        'Undergraduate and postgraduate students actively involved in research activities, publications, and innovation projects.',
      icon: 'ri-user-star-line',
      color: 'from-amber-500 to-orange-600',
      stats: { value: '200+', label: 'Students' },
    },
  ];

  const focusAreas = [
    {
      area: 'Artificial Intelligence & Machine Learning',
      projects: [
        'Deep Learning Applications',
        'Natural Language Processing',
        'Computer Vision Systems',
        'Predictive Analytics',
      ],
      icon: 'ri-brain-line',
      color: 'violet',
    },
    {
      area: 'Internet of Things & Embedded Systems',
      projects: [
        'Smart City Solutions',
        'Industrial IoT',
        'Wearable Technology',
        'Sensor Networks',
      ],
      icon: 'ri-wireless-charging-line',
      color: 'sky',
    },
    {
      area: 'Renewable Energy & Power Systems',
      projects: [
        'Solar Energy Optimization',
        'Wind Power Systems',
        'Energy Storage Solutions',
        'Smart Grid Technology',
      ],
      icon: 'ri-leaf-line',
      color: 'emerald',
    },
    {
      area: 'Robotics & Automation',
      projects: [
        'Industrial Automation',
        'Autonomous Systems',
        'Human-Robot Interaction',
        'Drone Technology',
      ],
      icon: 'ri-robot-line',
      color: 'amber',
    },
    {
      area: 'Data Science & Big Data Analytics',
      projects: [
        'Business Intelligence',
        'Healthcare Analytics',
        'Social Media Analysis',
        'Financial Modeling',
      ],
      icon: 'ri-database-2-line',
      color: 'rose',
    },
    {
      area: 'Advanced Materials & Nanotechnology',
      projects: [
        'Nanomaterials Research',
        'Composite Materials',
        'Smart Materials',
        'Material Characterization',
      ],
      icon: 'ri-microscope-line',
      color: 'cyan',
    },
  ];

  const achievements = [
    {
      year: '2024',
      title: 'Best Research Paper Award',
      description:
        'Faculty research paper on AI-driven healthcare diagnostics won Best Paper Award at International Conference on Engineering Innovation.',
      icon: 'ri-award-line',
    },
    {
      year: '2024',
      title: 'Patent Filed',
      description:
        'Successfully filed patent for innovative IoT-based smart agriculture monitoring system developed by faculty-student team.',
      icon: 'ri-patent-line',
    },
    {
      year: '2023',
      title: 'Research Grant Secured',
      description:
        'Received ₹25 lakhs research grant from DST for renewable energy project on solar panel efficiency optimization.',
      icon: 'ri-funds-line',
    },
    {
      year: '2023',
      title: 'Industry Collaboration',
      description:
        'Established research partnership with leading tech companies for joint R&D projects in AI and machine learning.',
      icon: 'ri-building-line',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
                )}
                <a
                  href={crumb.path}
                  className={`${
                    index === breadcrumbs.length - 1
                      ? 'text-violet-600 font-semibold'
                      : 'text-gray-600 hover:text-violet-600'
                  } transition-colors duration-200 cursor-pointer`}
                >
                  {crumb.label}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("https://readdy.ai/api/search-image?query=modern%20research%20and%20development%20laboratory%20with%20scientists%20working%20on%20innovative%20technology%20projects%20advanced%20equipment%20computers%20collaboration%20bright%20professional%20academic%20environment%20innovation&width=1920&height=600&seq=rd-resonance-hero&orientation=landscape")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-500/20 rounded-full mb-6">
            <i className="ri-rocket-line text-5xl text-violet-400"></i>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            R&amp;D Resonance
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Driving innovation through cutting‑edge research and development
            initiatives that bridge academia and industry, fostering a culture of
            discovery and technological advancement.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">
              Our Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
              <strong>Advancing Knowledge Through Research</strong>
            </h2>
            <div className="w-24 h-1 bg-violet-600 mx-auto mb-8"></div>
            <p className="text-slate-600 text-lg max-w-4xl mx-auto leading-relaxed">
              R&amp;D Resonance at DMI Engineering College represents our
              commitment to fostering a vibrant research ecosystem. We encourage
              faculty and students to engage in innovative research projects that
              address contemporary challenges in engineering and technology.
              Our research initiatives are designed to create meaningful impact
              through collaboration, innovation, and excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${initiative.color}`}></div>
                <div className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${initiative.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <i className={`${initiative.icon} text-white text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {initiative.description}
                  </p>
                  <div className="pt-6 border-t border-gray-100">
                    <div className="text-3xl font-bold text-violet-600">
                      {initiative.stats.value}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {initiative.stats.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">
              Research Domains
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
              <strong>Key Focus Areas</strong>
            </h2>
            <div className="w-24 h-1 bg-violet-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br from-${area.color}-500 to-${area.color}-600 rounded-xl flex items-center justify-center mb-6`}
                >
                  <i className={`${area.icon} text-white text-3xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {area.area}
                </h3>
                <ul className="space-y-3">
                  {area.projects.map((project, idx) => (
                    <li key={idx} className="flex items-start">
                      <i
                        className={`ri-arrow-right-s-line text-${area.color}-600 text-lg mr-2 mt-0.5 flex-shrink-0`}
                      ></i>
                      <span className="text-slate-600 text-sm">{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">
              Milestones
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
              <strong>Recent Achievements</strong>
            </h2>
            <div className="w-24 h-1 bg-violet-600 mx-auto mt-6"></div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-violet-200 via-purple-200 to-violet-200 hidden lg:block"></div>

            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="lg:w-1/2 flex justify-end">
                    <div
                      className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                        index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i
                            className={`${achievement.icon} text-white text-2xl`}
                          ></i>
                        </div>
                        <div>
                          <div className="text-violet-600 font-bold text-sm mb-2">
                            {achievement.year}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3">
                            {achievement.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block w-8 h-8 bg-violet-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-violet-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-500/20 rounded-full mb-6">
            <i className="ri-mail-line text-4xl text-violet-400"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Research Community
          </h2>
          <p className="text-purple-200 text-base mb-8 max-w-2xl mx-auto">
            Interested in collaborating on research projects or learning more
            about our R&amp;D initiatives? Get in touch with our research team.
          </p>
          <button className="bg-violet-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-violet-600 transition-all hover:scale-105 whitespace-nowrap cursor-pointer">
            Contact Research Team
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
