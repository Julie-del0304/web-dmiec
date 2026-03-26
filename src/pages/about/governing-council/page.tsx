import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function GoverningCouncilPage() {
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

  const chairman = {
    name: 'Rev.Fr.Dr.J.E.Arul Raj',
    position: 'Chairman',
    organization: 'DMI Group of Institutions',
    image: 'https://dmifoundations.org/assets/img/dmi/founder-new.jpg',
    message: 'Our vision is to create world-class engineers who are not only technically competent but also socially responsible. DMI Engineering College stands as a testament to our commitment to quality education and holistic development.',
    achievements: [
      'Established DMI Group with 10+ educational institutions',
      'Pioneered technical education in Kanyakumari District',
      'Recipient of numerous educational excellence awards',
      'Advocate for rural education development'
    ]
  };

  const members = [
    {
      name: 'Dr. K. Ramasamy',
      position: 'Member - Academic Expert',
      qualification: 'Ph.D., Former Vice Chancellor',
      organization: 'Anna University',
      expertise: 'Academic Administration & Quality Assurance',
      image: 'https://readdy.ai/api/search-image?query=senior%20indian%20academic%20expert%20professor%20in%20formal%20attire%2C%20professional%20portrait%2C%20university%20setting%2C%20distinguished%20appearance%2C%20professional%20photography&width=300&height=350&seq=council-member-001&orientation=portrait'
    },
    {
      name: 'Mr. S. Krishnan',
      position: 'Member - Industry Expert',
      qualification: 'B.E., MBA',
      organization: 'Tech Solutions India Pvt Ltd',
      expertise: 'Industry-Academia Collaboration',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20business%20executive%20in%20formal%20suit%2C%20corporate%20portrait%2C%20office%20background%2C%20confident%20demeanor%2C%20professional%20photography&width=300&height=350&seq=council-member-002&orientation=portrait'
    },
    {
      name: 'Dr. P. Lakshmi',
      position: 'Member - Research Expert',
      qualification: 'Ph.D., M.Tech.',
      organization: 'CSIR Research Institute',
      expertise: 'Research & Innovation',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20scientist%20in%20formal%20attire%2C%20research%20expert%20portrait%2C%20laboratory%20background%2C%20confident%20expression%2C%20professional%20photography&width=300&height=350&seq=council-member-003&orientation=portrait'
    },
    {
      name: 'Shri. R. Venkatesh',
      position: 'Member - Management',
      qualification: 'M.Com., FCA',
      organization: 'DMI Group',
      expertise: 'Financial Management & Governance',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20chartered%20accountant%20in%20formal%20attire%2C%20management%20expert%20portrait%2C%20office%20setting%2C%20professional%20demeanor%2C%20quality%20photography&width=300&height=350&seq=council-member-004&orientation=portrait'
    },
    {
      name: 'Dr. A. Rajendran',
      position: 'Member Secretary - Principal',
      qualification: 'Ph.D., M.E.',
      organization: 'DMI Engineering College',
      expertise: 'Institutional Leadership',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20college%20principal%20in%20formal%20attire%2C%20academic%20leader%20portrait%2C%20institutional%20setting%2C%20confident%20leadership%2C%20professional%20photography&width=300&height=350&seq=council-member-005&orientation=portrait'
    },
    {
      name: 'Prof. M. Selvam',
      position: 'Member - Faculty Representative',
      qualification: 'M.E., Ph.D. (Pursuing)',
      organization: 'DMI Engineering College',
      expertise: 'Academic Excellence & Curriculum',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20professor%20in%20formal%20shirt%2C%20faculty%20representative%20portrait%2C%20academic%20background%2C%20professional%20appearance%2C%20quality%20photography&width=300&height=350&seq=council-member-006&orientation=portrait'
    }
  ];

  const responsibilities = [
    {
      icon: 'ri-file-list-3-line',
      title: 'Policy Formulation',
      description: 'Develop and approve institutional policies, academic regulations, and strategic plans'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Financial Oversight',
      description: 'Review and approve annual budgets, financial statements, and major expenditures'
    },
    {
      icon: 'ri-graduation-cap-line',
      title: 'Academic Standards',
      description: 'Ensure maintenance of high academic standards and quality education delivery'
    },
    {
      icon: 'ri-building-line',
      title: 'Infrastructure Development',
      description: 'Approve infrastructure projects and facility enhancement initiatives'
    },
    {
      icon: 'ri-team-line',
      title: 'Faculty Appointments',
      description: 'Review and approve faculty appointments, promotions, and key administrative positions'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Performance Monitoring',
      description: 'Monitor institutional performance, accreditation status, and quality metrics'
    }
  ];

  const meetings = [
    { date: 'March 15, 2024', agenda: 'Annual Budget Approval & Infrastructure Projects', status: 'Completed' },
    { date: 'January 30, 2025', agenda: 'NAAC Accreditation Review & Quality Enhancement', status: 'Completed' },
    { date: 'September 10, 2023', agenda: 'New Program Approvals & Faculty Appointments', status: 'Completed' },
    { date: 'June 5, 2023', agenda: 'Academic Performance Review & Strategic Planning', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
    
<div className="pt-[72px] 2xl:pt-[120px]" />
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="hover:text-purple-200 transition-colors whitespace-nowrap">Home</a>
            <i className="ri-arrow-right-s-line text-purple-300"></i>
            <span className="text-purple-100 whitespace-nowrap">About</span>
            <i className="ri-arrow-right-s-line text-purple-300"></i>
            <span className="text-white whitespace-nowrap">Governing Council</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">Governing Council</h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Apex Governing Body</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Governing Council is the supreme decision-making body of DMIf Engineering College, 
              comprising distinguished academicians, industry experts, and management representatives 
              who guide the institution towards excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Chairman Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5 gap-8 p-8">
              <div className="md:col-span-2 flex items-center justify-center">
                <div className="w-full max-w-sm mx-auto">
                  <img 
                    src={chairman.image}
                    alt={chairman.name}
                    className="w-full h-auto object-contain rounded-xl shadow-lg bg-white"
                    style={{ aspectRatio: '3/4' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x500?text=Photo+Not+Available';
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 whitespace-nowrap">
                  {chairman.position}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{chairman.name}</h3>
                <p className="text-lg text-gray-600 mb-6">{chairman.organization}</p>
                
                <div className="bg-purple-50 p-6 rounded-xl mb-6">
                  <p className="text-gray-700 italic leading-relaxed">"{chairman.message}"</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {chairman.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <i className="ri-medal-line text-purple-600 mt-1 mr-3 flex-shrink-0"></i>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Council Members */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Council Members</h2>
            <p className="text-lg text-gray-600">Distinguished experts guiding institutional governance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3 whitespace-nowrap">
                    {member.position}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 whitespace-nowrap">{member.qualification}</p>
                  <p className="text-sm text-gray-500 mb-3">{member.organization}</p>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700">
                      <strong className="text-purple-600">Expertise:</strong> {member.expertise}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsibilities */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
            <p className="text-lg text-gray-600">Core functions of the Governing Council</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map((resp, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-purple-100">
                <div className="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-xl mb-4">
                  <i className={`${resp.icon} text-2xl text-purple-600`}></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 whitespace-nowrap">{resp.title}</h4>
                <p className="text-gray-600 leading-relaxed">{resp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meeting Schedule */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meeting Schedule</h2>
            <p className="text-lg text-gray-600">Recent Governing Council meetings and decisions</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {meetings.map((meeting, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-600">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <i className="ri-calendar-line text-purple-600 mr-2"></i>
                      <span className="font-bold text-gray-900 whitespace-nowrap">{meeting.date}</span>
                    </div>
                    <p className="text-gray-700">{meeting.agenda}</p>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                    {meeting.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}
