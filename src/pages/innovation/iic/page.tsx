import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

interface Activity {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  participants: number;
  image: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const IICPage = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'activities' | 'team' | 'achievements'>('about');
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

  const activities: Activity[] = [
    {
      id: 1,
      title: 'Innovation Bootcamp 2024',
      date: 'March 15-17, 2024',
      category: 'Workshop',
      description: 'Three-day intensive bootcamp on design thinking, rapid prototyping, and lean startup methodology with hands-on projects.',
      participants: 120,
      image: 'https://readdy.ai/api/search-image?query=innovation%20workshop%20with%20students%20working%20on%20prototypes%20and%20design%20thinking%20activities%20in%20modern%20classroom%20bright%20collaborative%20environment%20professional%20photography&width=600&height=400&seq=iic1&orientation=landscape'
    },
    {
      id: 2,
      title: 'Startup Pitch Competition',
      date: 'February 28, 2024',
      category: 'Competition',
      description: 'Annual pitch competition where student teams presented innovative business ideas to a panel of investors and entrepreneurs.',
      participants: 85,
      image: 'https://readdy.ai/api/search-image?query=students%20presenting%20startup%20pitch%20on%20stage%20with%20presentation%20screen%20and%20judges%20panel%20in%20auditorium%20bright%20professional%20event%20photography&width=600&height=400&seq=iic2&orientation=landscape'
    },
    {
      id: 3,
      title: 'Industry Expert Talk Series',
      date: 'January 20, 2024',
      category: 'Seminar',
      description: 'Guest lecture by successful entrepreneur sharing insights on building scalable startups and navigating challenges.',
      participants: 200,
      image: 'https://readdy.ai/api/search-image?query=business%20expert%20giving%20presentation%20to%20large%20audience%20in%20modern%20auditorium%20with%20professional%20lighting%20and%20engaged%20students%20professional%20photography&width=600&height=400&seq=iic3&orientation=landscape'
    },
    {
      id: 4,
      title: 'Hackathon 2024',
      date: 'December 10-11, 2023',
      category: 'Competition',
      description: '24-hour coding marathon focused on developing innovative solutions for social and environmental challenges.',
      participants: 150,
      image: 'https://readdy.ai/api/search-image?query=hackathon%20event%20with%20students%20coding%20on%20laptops%20in%20teams%20colorful%20modern%20venue%20with%20energy%20drinks%20and%20pizza%20bright%20photography&width=600&height=400&seq=iic4&orientation=landscape'
    },
    {
      id: 5,
      title: 'IPR Awareness Workshop',
      date: 'November 15, 2023',
      category: 'Workshop',
      description: 'Comprehensive workshop on intellectual property rights, patents, trademarks, and protecting innovations.',
      participants: 95,
      image: 'https://readdy.ai/api/search-image?query=intellectual%20property%20workshop%20with%20legal%20expert%20and%20students%20in%20modern%20classroom%20with%20presentation%20slides%20bright%20professional%20photography&width=600&height=400&seq=iic5&orientation=landscape'
    },
    {
      id: 6,
      title: 'Innovation Exhibition',
      date: 'October 5, 2023',
      category: 'Exhibition',
      description: 'Showcase of student innovations and prototypes with live demonstrations and interaction with industry visitors.',
      participants: 300,
      image: 'https://readdy.ai/api/search-image?query=innovation%20exhibition%20with%20student%20projects%20and%20prototypes%20on%20display%20tables%20visitors%20examining%20exhibits%20bright%20modern%20venue%20professional%20photography&width=600&height=400&seq=iic6&orientation=landscape'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: '4-Star Rating',
      description: 'Achieved 4-Star rating from Ministry of Education Innovation Cell for outstanding innovation activities',
      icon: 'ri-star-fill',
      color: 'bg-yellow-500'
    },
    {
      id: 2,
      title: '50+ Events',
      description: 'Successfully organized over 50 innovation-focused events, workshops, and competitions in the past year',
      icon: 'ri-calendar-event-line',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: '1000+ Participants',
      description: 'Engaged more than 1000 students in various innovation and entrepreneurship activities',
      icon: 'ri-team-line',
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: '15 Startups',
      description: 'Facilitated the creation of 15 student startups through mentorship and incubation support',
      icon: 'ri-rocket-line',
      color: 'bg-purple-500'
    },
    {
      id: 5,
      title: '20+ Patents',
      description: 'Guided students in filing over 20 patent applications for their innovative solutions',
      icon: 'ri-file-shield-line',
      color: 'bg-red-500'
    },
    {
      id: 6,
      title: 'National Recognition',
      description: 'Received recognition at national level innovation competitions and showcases',
      icon: 'ri-trophy-line',
      color: 'bg-orange-500'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'President, IIC',
      department: 'Principal',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20college%20principal%20in%20formal%20attire%20standing%20confidently%20in%20modern%20office%20bright%20professional%20portrait%20photography&width=400&height=500&seq=iicteam1&orientation=portrait',
      email: 'principal@dmiengg.edu.in'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Convener, IIC',
      department: 'Professor, CSE',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20in%20formal%20attire%20smiling%20in%20modern%20office%20environment%20bright%20professional%20portrait%20photography&width=400&height=500&seq=iicteam2&orientation=portrait',
      email: 'priya.sharma@dmiengg.edu.in'
    },
    {
      name: 'Prof. Arun Prakash',
      role: 'Innovation Coordinator',
      department: 'Associate Professor, ECE',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20associate%20professor%20in%20business%20casual%20attire%20in%20modern%20academic%20setting%20bright%20professional%20portrait%20photography&width=400&height=500&seq=iicteam3&orientation=portrait',
      email: 'arun.prakash@dmiengg.edu.in'
    },
    {
      name: 'Dr. Meena Krishnan',
      role: 'Startup Mentor',
      department: 'Professor, IT',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20in%20formal%20attire%20with%20friendly%20expression%20in%20modern%20office%20bright%20professional%20portrait%20photography&width=400&height=500&seq=iicteam4&orientation=portrait',
      email: 'meena.krishnan@dmiengg.edu.in'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 flex items-center gap-2">
            <a href="/" className="hover:text-teal-200 transition-colors">Home</a>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <a href="/innovation/iic" className="hover:text-teal-200 transition-colors">Innovation</a>
            <i className="ri-arrow-right-s-line text-xs"></i>
            <span className="text-teal-200">IIC</span>
          </nav>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="ri-lightbulb-flash-line text-4xl"></i>
              </div>
              <h1 className="text-5xl font-bold">Institution's Innovation Council</h1>
            </div>
            <p className="text-xl text-teal-100 leading-relaxed mb-6">
              Fostering a culture of innovation and entrepreneurship among students through systematic activities, mentorship, and ecosystem development.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <i className="ri-award-line text-2xl text-yellow-300"></i>
              <span className="font-medium">Ministry of Education Initiative</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 py-12 border-b border-teal-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">4★</div>
              <div className="text-gray-600 text-sm">IIC Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">50+</div>
              <div className="text-gray-600 text-sm">Events Organized</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">1000+</div>
              <div className="text-gray-600 text-sm">Students Engaged</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">15</div>
              <div className="text-gray-600 text-sm">Startups Created</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                activeTab === 'about'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <i className="ri-information-line mr-2"></i>
              About IIC
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                activeTab === 'activities'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <i className="ri-calendar-line mr-2"></i>
              Activities
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                activeTab === 'achievements'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <i className="ri-trophy-line mr-2"></i>
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                activeTab === 'team'
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <i className="ri-team-line mr-2"></i>
              Team
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Institution's Innovation Council</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                The Institution's Innovation Council (IIC) at DMI Engineering College is established under the Ministry of Education's Innovation Cell (MIC) initiative. Our mission is to systematically foster the culture of innovation and entrepreneurship among students and faculty members.
              </p>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 mb-8 border border-teal-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  To create a vibrant innovation ecosystem that nurtures creative thinking, problem-solving abilities, and entrepreneurial mindset among students, enabling them to become job creators rather than job seekers.
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Conduct innovation and entrepreneurship-related activities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Identify and reward innovative ideas and projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Organize workshops, seminars, and competitions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Facilitate mentorship and networking opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="ri-check-line text-teal-600 text-xl mt-1"></i>
                    <span className="text-gray-700">Support IPR filing and startup creation</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Focus Areas</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="ri-lightbulb-line text-2xl text-teal-600"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Innovation Culture</h4>
                  <p className="text-gray-600 text-sm">Building a systematic culture of innovation through regular activities and recognition programs.</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="ri-rocket-line text-2xl text-teal-600"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Startup Support</h4>
                  <p className="text-gray-600 text-sm">Providing comprehensive support for students to transform ideas into viable startups.</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="ri-shield-check-line text-2xl text-teal-600"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">IPR Awareness</h4>
                  <p className="text-gray-600 text-sm">Educating students about intellectual property rights and facilitating patent filing.</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="ri-team-line text-2xl text-teal-600"></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Industry Connect</h4>
                  <p className="text-gray-600 text-sm">Creating strong linkages with industry experts, entrepreneurs, and investors.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Activities & Events</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our diverse range of innovation and entrepreneurship activities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-teal-600">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <i className="ri-calendar-line"></i>
                      <span>{activity.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{activity.description}</p>
                    <div className="flex items-center gap-2 text-sm text-teal-600 font-medium">
                      <i className="ri-user-line"></i>
                      <span>{activity.participants} Participants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Recognitions and milestones achieved through our innovation initiatives
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 ${achievement.color} rounded-xl flex items-center justify-center mb-6`}>
                    <i className={`${achievement.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">IIC Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated team driving innovation and entrepreneurship at DMI
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-teal-600 font-medium text-sm mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.department}</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      <i className="ri-mail-line"></i>
                      <span>Contact</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-12 text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Get Involved with IIC</h3>
              <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
                Join us in fostering innovation and entrepreneurship. Participate in our activities, share your ideas, and be part of the innovation ecosystem.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors whitespace-nowrap">
                  <i className="ri-user-add-line mr-2"></i>
                  Join IIC
                </button>
                <button className="px-8 py-3 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 transition-colors whitespace-nowrap border border-teal-500">
                  <i className="ri-mail-line mr-2"></i>
                  Contact Team
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

export default IICPage;
