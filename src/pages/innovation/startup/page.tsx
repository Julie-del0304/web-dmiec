import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

interface StartupProgram {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface SuccessStory {
  id: number;
  name: string;
  founder: string;
  year: string;
  description: string;
  achievement: string;
  image: string;
}

const StartupPage = () => {
  const [activeTab, setActiveTab] = useState<'programs' | 'success' | 'support'>('programs');
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

  const programs: StartupProgram[] = [
    {
      id: 1,
      title: 'Ideation Workshops',
      description: 'Regular brainstorming sessions to help students identify problems and develop innovative solutions with guidance from industry mentors.',
      icon: 'ri-lightbulb-line',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Prototype Development',
      description: 'Access to state-of-the-art labs and equipment to build working prototypes of your innovative ideas with technical support.',
      icon: 'ri-tools-line',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Business Model Canvas',
      description: 'Learn to create sustainable business models through structured workshops covering market analysis, revenue streams, and value propositions.',
      icon: 'ri-file-chart-line',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Pitch Training',
      description: 'Develop compelling pitch presentations and communication skills to effectively present your startup ideas to investors and stakeholders.',
      icon: 'ri-presentation-line',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      title: 'Funding Assistance',
      description: 'Connect with angel investors, venture capitalists, and government funding schemes to secure financial support for your startup.',
      icon: 'ri-money-dollar-circle-line',
      color: 'bg-teal-500'
    },
    {
      id: 6,
      title: 'Legal & IPR Support',
      description: 'Guidance on company registration, intellectual property rights, patents, trademarks, and legal compliance for startups.',
      icon: 'ri-shield-check-line',
      color: 'bg-red-500'
    }
  ];

  const successStories: SuccessStory[] = [
    {
      id: 1,
      name: 'TechVision Solutions',
      founder: 'Rajesh Kumar & Team',
      year: '2022',
      description: 'AI-powered agricultural monitoring system helping farmers optimize crop yield through real-time data analytics and predictive insights.',
      achievement: 'Secured ₹25 Lakhs seed funding, serving 500+ farmers across Tamil Nadu',
      image: 'https://readdy.ai/api/search-image?query=modern%20agricultural%20technology%20startup%20team%20working%20on%20AI%20powered%20farming%20solutions%20with%20laptops%20and%20drone%20equipment%20in%20bright%20office%20environment%20professional%20photography&width=800&height=600&seq=startup1&orientation=landscape'
    },
    {
      id: 2,
      name: 'EduConnect Platform',
      founder: 'Priya Sharma',
      year: '2021',
      description: 'Online learning platform connecting rural students with quality education resources and live mentorship from industry experts.',
      achievement: 'Reached 10,000+ students, partnered with 5 educational institutions',
      image: 'https://readdy.ai/api/search-image?query=young%20female%20entrepreneur%20presenting%20educational%20technology%20platform%20on%20laptop%20screen%20in%20modern%20startup%20office%20with%20colorful%20decor%20bright%20lighting%20professional%20photography&width=800&height=600&seq=startup2&orientation=landscape'
    },
    {
      id: 3,
      name: 'GreenEnergy Innovations',
      founder: 'Arun Prakash & Divya',
      year: '2023',
      description: 'Developing affordable solar-powered IoT devices for smart homes and sustainable energy management in residential areas.',
      achievement: 'Won National Innovation Award, 200+ installations completed',
      image: 'https://readdy.ai/api/search-image?query=startup%20team%20working%20on%20solar%20panel%20and%20IoT%20devices%20in%20modern%20laboratory%20with%20green%20energy%20equipment%20bright%20professional%20workspace%20photography&width=800&height=600&seq=startup3&orientation=landscape'
    },
    {
      id: 4,
      name: 'HealthCare Plus',
      founder: 'Dr. Meena & Tech Team',
      year: '2022',
      description: 'Telemedicine platform providing remote healthcare consultations and AI-assisted preliminary diagnosis for rural communities.',
      achievement: 'Facilitated 5,000+ consultations, expanded to 3 districts',
      image: 'https://readdy.ai/api/search-image?query=healthcare%20technology%20startup%20team%20with%20medical%20professionals%20and%20developers%20working%20on%20telemedicine%20platform%20in%20modern%20office%20bright%20professional%20photography&width=800&height=600&seq=startup4&orientation=landscape'
    }
  ];

  const supportServices = [
    {
      title: 'Mentorship Program',
      description: 'One-on-one guidance from successful entrepreneurs, industry experts, and faculty members throughout your startup journey.',
      icon: 'ri-user-star-line'
    },
    {
      title: 'Co-working Space',
      description: 'Dedicated workspace with high-speed internet, meeting rooms, and collaborative environment for startup teams.',
      icon: 'ri-building-line'
    },
    {
      title: 'Technical Resources',
      description: 'Access to advanced laboratories, software licenses, cloud credits, and technical infrastructure for product development.',
      icon: 'ri-computer-line'
    },
    {
      title: 'Networking Events',
      description: 'Regular meetups, demo days, and networking sessions with investors, industry leaders, and fellow entrepreneurs.',
      icon: 'ri-team-line'
    },
    {
      title: 'Market Research',
      description: 'Support in conducting market analysis, customer surveys, and competitive research to validate your business idea.',
      icon: 'ri-line-chart-line'
    },
    {
      title: 'Marketing Support',
      description: 'Assistance in branding, digital marketing, social media strategy, and customer acquisition for your startup.',
      icon: 'ri-megaphone-line'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 flex items-center gap-2">
            <a href="/" className="hover:text-blue-200 transition-colors">Home</a>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <a href="/innovation/startup" className="hover:text-blue-200 transition-colors">Innovation</a>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <span className="text-blue-200">Startup</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="ri-rocket-line text-4xl"></i>
              </div>
              <h1 className="text-5xl font-bold">Startup Ecosystem</h1>
            </div>
            <p className="text-xl text-blue-100 leading-relaxed">
              Empowering student entrepreneurs to transform innovative ideas into successful ventures through comprehensive support, mentorship, and resources.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 text-sm">Startups Launched</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">₹2Cr+</div>
              <div className="text-gray-600 text-sm">Funding Raised</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-gray-600 text-sm">Industry Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600 text-sm">Student Entrepreneurs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'programs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              <i className="ri-apps-line mr-2"></i>
              Programs
            </button>
            <button
              onClick={() => setActiveTab('success')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'success'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              <i className="ri-trophy-line mr-2"></i>
              Success Stories
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === 'support'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              <i className="ri-hand-heart-line mr-2"></i>
              Support Services
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Startup Programs & Initiatives</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive programs designed to guide you from ideation to successful startup launch
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${program.color} rounded-xl flex items-center justify-center mb-6`}>
                    <i className={`${program.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Stories Tab */}
        {activeTab === 'success' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Inspiring journeys of our student entrepreneurs who turned their dreams into reality
              </p>
            </div>

            <div className="space-y-8">
              {successStories.map((story, index) => (
                <div
                  key={story.id}
                  className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-50 to-indigo-50' : 'from-purple-50 to-pink-50'
                    } rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300`}
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className={`${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`p-8 flex flex-col justify-center ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                      <div className="inline-block px-3 py-1 bg-white rounded-full text-sm font-medium text-blue-600 mb-4 w-fit">
                        Founded in {story.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.name}</h3>
                      <p className="text-blue-600 font-medium mb-4">by {story.founder}</p>
                      <p className="text-gray-700 mb-4 leading-relaxed">{story.description}</p>
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start gap-3">
                          <i className="ri-trophy-line text-2xl text-yellow-500 mt-1"></i>
                          <div>
                            <div className="text-sm font-medium text-gray-500 mb-1">Achievement</div>
                            <div className="text-gray-900 font-medium">{story.achievement}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Services Tab */}
        {activeTab === 'support' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive support ecosystem to help your startup succeed at every stage
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${service.icon} text-xl text-white`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Entrepreneurial Journey?</h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join our startup ecosystem and get access to mentorship, funding, and resources to turn your innovative ideas into successful ventures.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={() => window.open('https://admissions.dmifoundations.org/dmi-engineering-college-application-form', '_blank')} className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap">
                  <i className="ri-file-text-line mr-2"></i>
                  Admissions 2026-27
                </button>
                <button className="px-8 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors whitespace-nowrap border border-blue-500">
                  <i className="ri-phone-line mr-2"></i>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
};

export default StartupPage;