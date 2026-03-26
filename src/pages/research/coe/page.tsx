import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function COEPage() {
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Centre of Excellence</h1>
            <p className="text-xl text-white/90">Advancing Research & Innovation in Emerging Technologies</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Centre of Excellence</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The Centre of Excellence (CoE) at DMI Engineering College is established to promote cutting-edge research, innovation, and skill development in emerging technologies. Our CoE serves as a hub for collaborative research, industry partnerships, and advanced training programs that bridge the gap between academia and industry.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Through state-of-the-art facilities, expert mentorship, and industry collaborations, the CoE empowers students and faculty to work on real-world problems, develop innovative solutions, and contribute to technological advancement in various domains.
          </p>
        </div>

        {/* Focus Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Focus Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-brain-line',
                title: 'Artificial Intelligence & Machine Learning',
                description: 'Deep learning, neural networks, computer vision, natural language processing, and AI applications.'
              },
              {
                icon: 'ri-cloud-line',
                title: 'Internet of Things',
                description: 'IoT architecture, sensor networks, embedded systems, smart devices, and industrial IoT solutions.'
              },
              {
                icon: 'ri-database-2-line',
                title: 'Data Science & Analytics',
                description: 'Big data processing, predictive analytics, data visualization, and business intelligence.'
              },
              {
                icon: 'ri-shield-keyhole-line',
                title: 'Cybersecurity',
                description: 'Network security, ethical hacking, cryptography, threat analysis, and security protocols.'
              },
              {
                icon: 'ri-robot-line',
                title: 'Robotics & Automation',
                description: 'Industrial automation, autonomous systems, robotic process automation, and mechatronics.'
              },
              {
                icon: 'ri-leaf-line',
                title: 'Renewable Energy',
                description: 'Solar energy systems, wind power, energy storage, smart grids, and sustainable technologies.'
              }
            ].map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${area.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities & Infrastructure */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Facilities & Infrastructure</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Advanced Computing Lab',
                features: ['High-performance workstations', 'GPU-enabled systems for AI/ML', 'Cloud computing access', 'Specialized software licenses']
              },
              {
                title: 'IoT & Embedded Systems Lab',
                features: ['Arduino, Raspberry Pi kits', 'Sensor modules and actuators', 'Wireless communication modules', 'Development boards']
              },
              {
                title: 'Robotics Workshop',
                features: ['Robotic arms and platforms', '3D printers and CNC machines', 'Drone development kits', 'Automation equipment']
              },
              {
                title: 'Research & Collaboration Space',
                features: ['Project workstations', 'Meeting and discussion rooms', 'Video conferencing facilities', 'Library and resource center']
              }
            ].map((facility, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-blue-600 mb-4">{facility.title}</h3>
                <ul className="space-y-2">
                  {facility.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <i className="ri-checkbox-circle-fill text-blue-500 mt-1"></i>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Programs & Activities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Programs & Activities</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Industry Certification Programs',
                description: 'Specialized training and certification courses in collaboration with industry partners like IBM, Microsoft, AWS, and Cisco.'
              },
              {
                title: 'Research Projects',
                description: 'Faculty and student research projects funded by government agencies, industry sponsors, and internal grants.'
              },
              {
                title: 'Workshops & Seminars',
                description: 'Regular workshops, guest lectures, and seminars by industry experts and academic researchers.'
              },
              {
                title: 'Hackathons & Competitions',
                description: 'Organizing and participating in national and international hackathons, coding competitions, and innovation challenges.'
              },
              {
                title: 'Internship & Industry Projects',
                description: 'Facilitating internships and live industry projects for hands-on experience and skill development.'
              },
              {
                title: 'Innovation & Entrepreneurship',
                description: 'Supporting student startups, product development, and entrepreneurial initiatives through mentorship and resources.'
              }
            ].map((program, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-700 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Partners */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Industry Collaborations</h2>
          <p className="text-gray-700 mb-6">
            Our Centre of Excellence partners with leading technology companies and research organizations to provide students with industry exposure, training, and placement opportunities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['IBM', 'Microsoft', 'AWS', 'Cisco', 'Google', 'Intel', 'NVIDIA', 'Siemens'].map((partner, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-blue-200 flex items-center justify-center h-20">
                <span className="text-lg font-bold text-gray-700">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}


