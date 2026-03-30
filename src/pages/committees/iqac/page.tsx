import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function IQACPage() {
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
    { label: 'Committees', path: '#' },
    { label: 'IQAC', path: '/committees/iqac' }
  ];

  const committeeMembers = [
    {
      name: 'Dr. S. Rajendran',
      designation: 'Principal',
      role: 'Chairperson',
      email: 'principal@dmiengg.edu.in',
      phone: '+91 4652 230123',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20college%20principal%20formal%20business%20attire%20office%20setting%20confident%20leadership%20academic%20administrator%20clean%20simple%20background%20portrait&width=400&height=400&seq=principal-003&orientation=squarish'
    },
    {
      name: 'Dr. T. Ramesh',
      designation: 'Dean Academics',
      role: 'Coordinator',
      email: 'ramesh.dean@dmiengg.edu.in',
      phone: '+91 4652 230134',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20dean%20formal%20attire%20office%20setting%20confident%20academic%20leader%20clean%20simple%20background%20portrait&width=400&height=400&seq=dean-ramesh-002&orientation=squarish'
    },
    {
      name: 'Dr. M. Kavitha',
      designation: 'Professor, CSE',
      role: 'Member',
      email: 'kavitha.cse@dmiengg.edu.in',
      phone: '+91 4652 230145',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-kavitha-003&orientation=squarish'
    },
    {
      name: 'Dr. V. Kumar',
      designation: 'Professor, ECE',
      role: 'Member',
      email: 'kumar.ece@dmiengg.edu.in',
      phone: '+91 4652 230156',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-kumar-002&orientation=squarish'
    },
    {
      name: 'Dr. P. Meena',
      designation: 'Professor, EEE',
      role: 'Member',
      email: 'meena.eee@dmiengg.edu.in',
      phone: '+91 4652 230167',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-meena-002&orientation=squarish'
    },
    {
      name: 'Dr. A. Selvam',
      designation: 'Professor, Mechanical',
      role: 'Member',
      email: 'selvam.mech@dmiengg.edu.in',
      phone: '+91 4652 230178',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-selvam-002&orientation=squarish'
    },
    {
      name: 'Dr. R. Suresh',
      designation: 'Industry Expert',
      role: 'External Member',
      email: 'suresh.industry@example.com',
      phone: '+91 9876543213',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20industry%20expert%20formal%20business%20attire%20office%20setting%20confident%20corporate%20leader%20clean%20simple%20background%20portrait&width=400&height=400&seq=industry-suresh-001&orientation=squarish'
    },
    {
      name: 'Dr. L. Priya',
      designation: 'Academic Expert',
      role: 'External Member',
      email: 'priya.academic@example.edu',
      phone: '+91 9876543214',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20academic%20expert%20formal%20attire%20office%20setting%20confident%20education%20specialist%20clean%20simple%20background%20portrait&width=400&height=400&seq=academic-priya-001&orientation=squarish'
    }
  ];

  const objectives = [
    {
      icon: 'ri-line-chart-line',
      title: 'Quality Enhancement',
      description: 'Continuously improve the quality of teaching, learning, and research through systematic planning and implementation.'
    },
    {
      icon: 'ri-file-chart-line',
      title: 'Documentation',
      description: 'Maintain comprehensive documentation of quality initiatives, best practices, and institutional performance.'
    },
    {
      icon: 'ri-feedback-line',
      title: 'Feedback Analysis',
      description: 'Collect and analyze feedback from all stakeholders to identify areas for improvement and implement corrective measures.'
    },
    {
      icon: 'ri-award-line',
      title: 'Accreditation Support',
      description: 'Prepare and support the institution for NAAC accreditation and other quality assessment processes.'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Innovation Promotion',
      description: 'Encourage and facilitate innovative teaching-learning practices and research activities across departments.'
    },
    {
      icon: 'ri-team-line',
      title: 'Stakeholder Engagement',
      description: 'Foster collaboration among faculty, students, alumni, and industry partners for holistic quality improvement.'
    }
  ];

  const activities = [
    {
      title: 'Academic Audit',
      description: 'Regular assessment of academic programs, curriculum, and teaching methodologies',
      icon: 'ri-file-list-3-line'
    },
    {
      title: 'Faculty Development',
      description: 'Organizing workshops, seminars, and training programs for faculty enhancement',
      icon: 'ri-graduation-cap-line'
    },
    {
      title: 'Student Feedback',
      description: 'Systematic collection and analysis of student feedback on teaching and facilities',
      icon: 'ri-chat-poll-line'
    },
    {
      title: 'Best Practices',
      description: 'Identification, documentation, and dissemination of institutional best practices',
      icon: 'ri-star-line'
    },
    {
      title: 'Research Promotion',
      description: 'Encouraging research activities, publications, and collaborative projects',
      icon: 'ri-flask-line'
    },
    {
      title: 'Infrastructure Development',
      description: 'Planning and monitoring upgradation of academic and physical infrastructure',
      icon: 'ri-building-4-line'
    }
  ];

  const achievements = [
    {
      year: '2023-24',
      title: 'NAAC B++ NAAC GradeGrade Accreditation',
      description: 'Successfully achieved NAAC B++ NAAC Gradegrade with CGPA 3.45',
      icon: 'ri-medal-line'
    },
    {
      year: '2023',
      title: 'NBA Accreditation',
      description: 'All eligible programs accredited by NBA for 3 years',
      icon: 'ri-award-line'
    },
    {
      year: '2022-23',
      title: 'Best Practices Award',
      description: 'Recognized for innovative teaching-learning practices',
      icon: 'ri-trophy-line'
    },
    {
      year: '2022',
      title: 'Quality Enhancement',
      description: 'Implemented comprehensive quality assurance framework',
      icon: 'ri-checkbox-circle-line'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

      {/* Breadcrumb */}
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
      <div className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <i className="ri-award-line text-6xl"></i>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">
            Internal Quality Assurance Cell
          </h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Driving excellence in education through systematic quality enhancement and continuous improvement
          </p>
        </div>
      </div>

      {/* Contact Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-mail-line text-3xl text-white"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Contact IQAC</h3>
                <p className="text-gray-600">For quality-related queries and suggestions</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:iqac@dmiengg.edu.in" className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors whitespace-nowrap">
                <i className="ri-mail-fill"></i>
                iqac@dmiengg.edu.in
              </a>
              <a href="tel:+914652230134" className="flex items-center gap-2 bg-white text-amber-600 border-2 border-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors whitespace-nowrap">
                <i className="ri-phone-fill"></i>
                +91 4652 230134
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">About IQAC</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              The Internal Quality Assurance Cell (IQAC) at DMI Engineering College was established as per NAAC guidelines to develop a system for conscious, consistent, and catalytic improvement in the overall performance of the institution. IQAC acts as a nodal agency for coordinating quality-related activities including adoption and dissemination of best practices.
            </p>
            <p>
              The primary aim of IQAC is to develop a quality system for conscious, consistent, and catalytic programmed action to improve the academic and administrative performance of the institution. It promotes measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices.
            </p>
            <p>
              IQAC works towards achieving excellence in all spheres of institutional activities through systematic documentation, periodic assessment, and continuous quality improvement initiatives. The cell ensures that quality becomes the defining element of institutional functioning.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Objectives</h2>
          <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
            Strategic goals for ensuring institutional excellence and quality assurance
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${objective.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{objective.title}</h3>
                <p className="text-gray-600 leading-relaxed">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Key Activities</h2>
          <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
            Regular initiatives undertaken by IQAC for quality enhancement
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`${activity.icon} text-2xl text-white`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Recent Achievements</h2>
          <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
            Milestones in our journey towards academic excellence
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${achievement.icon} text-3xl text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3">
                      {achievement.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Committee Members</h2>
          <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
            Experienced professionals driving quality initiatives across the institution
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {committeeMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-3">
                    {member.role}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-gray-600 text-sm font-semibold mb-4">{member.designation}</p>
                  <div className="space-y-2">
                    <a href={`mailto:${member.email}`} className="flex items-center text-xs text-gray-700 hover:text-amber-600 transition-colors">
                      <i className="ri-mail-line mr-2 text-amber-600 w-4 h-4 flex items-center justify-center"></i>
                      <span className="truncate">{member.email}</span>
                    </a>
                    <a href={`tel:${member.phone}`} className="flex items-center text-xs text-gray-700 hover:text-amber-600 transition-colors">
                      <i className="ri-phone-line mr-2 text-amber-600 w-4 h-4 flex items-center justify-center"></i>
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}
