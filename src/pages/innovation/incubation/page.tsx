import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

interface IncubationFacility {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface IncubatedStartup {
  id: number;
  name: string;
  sector: string;
  stage: string;
  description: string;
  team: string;
  image: string;
}

const IncubationPage = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'facilities' | 'startups' | 'process'>('overview');
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

  const facilities: IncubationFacility[] = [
    {
      id: 1,
      title: 'Physical Infrastructure',
      description: 'State-of-the-art workspace designed for innovation and collaboration',
      icon: 'ri-building-4-line',
      features: [
        'Private cabins for 15+ startups',
        'Open co-working spaces',
        'High-speed internet connectivity',
        'Meeting and conference rooms',
        '24/7 access with security',
        'Pantry and recreational area'
      ]
    },
    {
      id: 2,
      title: 'Technical Resources',
      description: 'Access to advanced technology and development tools',
      icon: 'ri-computer-line',
      features: [
        'Cloud computing credits (AWS, Azure, GCP)',
        'Software development tools & licenses',
        'Hardware prototyping lab',
        'IoT and embedded systems lab',
        '3D printing and fabrication',
        'Testing and quality assurance tools'
      ]
    },
    {
      id: 3,
      title: 'Business Support',
      description: 'Comprehensive business development and growth assistance',
      icon: 'ri-briefcase-line',
      features: [
        'Business plan development',
        'Financial modeling and projections',
        'Legal and compliance support',
        'Accounting and bookkeeping',
        'HR and recruitment assistance',
        'Marketing and branding support'
      ]
    },
    {
      id: 4,
      title: 'Mentorship Network',
      description: 'Guidance from experienced entrepreneurs and industry experts',
      icon: 'ri-user-star-line',
      features: [
        '50+ industry mentors',
        'One-on-one mentoring sessions',
        'Domain-specific expert guidance',
        'Investor connect programs',
        'Peer learning groups',
        'Advisory board access'
      ]
    }
  ];

  const incubatedStartups: IncubatedStartup[] = [
    {
      id: 1,
      name: 'AgriTech Innovations',
      sector: 'Agriculture Technology',
      stage: 'Growth Stage',
      description: 'Precision farming solutions using AI and IoT to optimize crop yield and reduce resource wastage for sustainable agriculture.',
      team: '8 members',
      image: 'https://readdy.ai/api/search-image?query=modern%20agriculture%20technology%20startup%20team%20working%20with%20drones%20and%20sensors%20in%20bright%20innovation%20lab%20professional%20workspace%20photography&width=600&height=400&seq=incubation1&orientation=landscape'
    },
    {
      id: 2,
      name: 'MedTech Solutions',
      sector: 'Healthcare Technology',
      stage: 'Seed Stage',
      description: 'Affordable medical diagnostic devices with AI-powered analysis for early disease detection in rural healthcare centers.',
      team: '6 members',
      image: 'https://readdy.ai/api/search-image?query=healthcare%20technology%20startup%20team%20developing%20medical%20devices%20in%20modern%20laboratory%20with%20equipment%20bright%20professional%20photography&width=600&height=400&seq=incubation2&orientation=landscape'
    },
    {
      id: 3,
      name: 'EduVerse Platform',
      sector: 'Education Technology',
      stage: 'Early Stage',
      description: 'Immersive VR/AR learning platform making complex STEM concepts accessible through interactive 3D visualizations.',
      team: '5 members',
      image: 'https://readdy.ai/api/search-image?query=education%20technology%20startup%20team%20working%20on%20VR%20headsets%20and%20computers%20in%20modern%20office%20bright%20collaborative%20workspace%20photography&width=600&height=400&seq=incubation3&orientation=landscape'
    },
    {
      id: 4,
      name: 'CleanEnergy Systems',
      sector: 'Renewable Energy',
      stage: 'Growth Stage',
      description: 'Smart grid solutions and energy management systems for efficient renewable energy distribution and consumption.',
      team: '10 members',
      image: 'https://readdy.ai/api/search-image?query=renewable%20energy%20startup%20team%20working%20on%20solar%20panels%20and%20energy%20systems%20in%20bright%20modern%20laboratory%20professional%20photography&width=600&height=400&seq=incubation4&orientation=landscape'
    },
    {
      id: 5,
      name: 'FinTech Innovators',
      sector: 'Financial Technology',
      stage: 'Seed Stage',
      description: 'Digital payment solutions and financial literacy platform for underserved communities with multilingual support.',
      team: '7 members',
      image: 'https://readdy.ai/api/search-image?query=fintech%20startup%20team%20working%20on%20mobile%20payment%20applications%20in%20modern%20office%20with%20multiple%20screens%20bright%20professional%20photography&width=600&height=400&seq=incubation5&orientation=landscape'
    },
    {
      id: 6,
      name: 'SmartCity Solutions',
      sector: 'Urban Technology',
      stage: 'Early Stage',
      description: 'IoT-based smart city infrastructure for traffic management, waste management, and public safety monitoring.',
      team: '9 members',
      image: 'https://readdy.ai/api/search-image?query=smart%20city%20technology%20startup%20team%20working%20on%20IoT%20sensors%20and%20urban%20planning%20in%20modern%20innovation%20lab%20bright%20photography&width=600&height=400&seq=incubation6&orientation=landscape'
    }
  ];

  const incubationProcess = [
    {
      step: 1,
      title: 'Application',
      description: 'Submit your startup idea with business plan and team details',
      icon: 'ri-file-text-line',
      duration: '1 week'
    },
    {
      step: 2,
      title: 'Screening',
      description: 'Initial evaluation of idea viability and team capability',
      icon: 'ri-search-eye-line',
      duration: '2 weeks'
    },
    {
      step: 3,
      title: 'Pitch Presentation',
      description: 'Present your idea to selection committee and mentors',
      icon: 'ri-presentation-line',
      duration: '1 day'
    },
    {
      step: 4,
      title: 'Selection',
      description: 'Final selection based on innovation, feasibility, and impact',
      icon: 'ri-checkbox-circle-line',
      duration: '1 week'
    },
    {
      step: 5,
      title: 'Onboarding',
      description: 'Agreement signing and workspace allocation',
      icon: 'ri-user-add-line',
      duration: '3 days'
    },
    {
      step: 6,
      title: 'Incubation',
      description: 'Full support for 12-24 months with milestone tracking',
      icon: 'ri-rocket-line',
      duration: '12-24 months'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 flex items-center gap-2">
            <a href="/" className="hover:text-purple-200 transition-colors">Home</a>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <a href="/innovation/incubation" className="hover:text-purple-200 transition-colors">Innovation</a>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <span className="text-purple-200">Incubation</span>
          </nav>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="ri-seedling-line text-4xl"></i>
              </div>
              <h1 className="text-5xl font-bold">Incubation Center</h1>
            </div>
            <p className="text-xl text-purple-100 leading-relaxed">
              Nurturing early-stage startups with comprehensive infrastructure, mentorship, and resources to accelerate growth and achieve market success.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-12 border-b border-purple-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-600 text-sm">Startups Incubated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
              <div className="text-gray-600 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">3000+</div>
              <div className="text-gray-600 text-sm">Sq.ft Space</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">₹5Cr+</div>
              <div className="text-gray-600 text-sm">Funding Facilitated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveSection('overview')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                activeSection === 'overview'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <i className="ri-information-line mr-2"></i>
              Overview
            </button>
            <button
              onClick={() => setActiveSection('facilities')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                activeSection === 'facilities'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <i className="ri-building-line mr-2"></i>
              Facilities
            </button>
            <button
              onClick={() => setActiveSection('startups')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                activeSection === 'startups'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <i className="ri-store-line mr-2"></i>
              Incubated Startups
            </button>
            <button
              onClick={() => setActiveSection('process')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                activeSection === 'process'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <i className="ri-flow-chart mr-2"></i>
              Process
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        {/* Overview Tab */}
        {activeSection === 'overview' && (
          <div>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Incubation Center</h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  The DMI Engineering College Incubation Center is a dedicated facility designed to nurture and support early-stage startups founded by our students, alumni, and faculty members. We provide a comprehensive ecosystem that combines physical infrastructure, technical resources, business support, and mentorship to help innovative ideas transform into successful ventures.
                </p>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-purple-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To create a vibrant entrepreneurial ecosystem that fosters innovation, supports risk-taking, and enables startups to develop scalable solutions addressing real-world problems while contributing to economic growth and job creation.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-time-line text-2xl text-purple-600"></i>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Flexible Duration</h4>
                    <p className="text-gray-600 text-sm">12-24 months incubation period with possibility of extension based on progress and milestones.</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-money-dollar-circle-line text-2xl text-purple-600"></i>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Funding Support</h4>
                    <p className="text-gray-600 text-sm">Connect with angel investors, VCs, and government schemes. Seed funding up to ₹10 lakhs for selected startups.</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-team-line text-2xl text-purple-600"></i>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Expert Mentorship</h4>
                    <p className="text-gray-600 text-sm">Regular guidance from successful entrepreneurs, industry experts, and domain specialists.</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-global-line text-2xl text-purple-600"></i>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Market Access</h4>
                    <p className="text-gray-600 text-sm">Networking opportunities, demo days, and connections with potential customers and partners.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Eligibility Criteria</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-purple-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Current students, alumni (within 5 years), or faculty members of DMI Engineering College</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-purple-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Innovative and scalable business idea with clear market potential</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-purple-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Committed founding team with complementary skills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-purple-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Willingness to work full-time on the startup during incubation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-checkbox-circle-fill text-purple-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Technology-driven or innovation-focused venture</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Facilities Tab */}
        {activeSection === 'facilities' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Incubation Facilities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                World-class infrastructure and resources to support your startup journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {facilities.map((facility) => (
                <div
                  key={facility.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
                    <div className="flex items-center gap-4 text-white">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <i className={`${facility.icon} text-2xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{facility.title}</h3>
                        <p className="text-purple-100 text-sm">{facility.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {facility.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <i className="ri-check-line text-purple-600 text-lg mt-0.5"></i>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Incubated Startups Tab */}
        {activeSection === 'startups' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Currently Incubated Startups</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the innovative startups growing in our incubation center
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {incubatedStartups.map((startup) => (
                <div
                  key={startup.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={startup.image}
                      alt={startup.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-purple-600">
                        {startup.stage}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs font-medium">
                        {startup.sector}
                      </span>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-gray-600 text-xs flex items-center gap-1">
                        <i className="ri-team-line"></i>
                        {startup.team}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{startup.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{startup.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeSection === 'process' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Incubation Process</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Step-by-step journey from application to successful incubation
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {incubationProcess.map((step, index) => (
                  <div key={step.step} className="relative">
                    {index !== incubationProcess.length - 1 && (
                      <div className="absolute left-8 top-20 w-0.5 h-full bg-purple-200"></div>
                    )}
                    <div className="flex gap-6">
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <i className={`${step.icon} text-2xl text-purple-600`}></i>
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                          <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium whitespace-nowrap">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
                <h3 className="text-3xl font-bold mb-4">Ready to Join Our Incubation Program?</h3>
                <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                  Take the first step towards building a successful startup with our comprehensive incubation support.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors whitespace-nowrap">
                    <i className="ri-file-text-line mr-2"></i>
                    Apply for Incubation
                  </button>
                  <button className="px-8 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors whitespace-nowrap border border-purple-500">
                    <i className="ri-calendar-line mr-2"></i>
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
};

export default IncubationPage;
