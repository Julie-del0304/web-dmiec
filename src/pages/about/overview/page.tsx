import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function OverviewPage() {
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

  const milestones = [
    { year: '2009', title: 'Foundation', description: 'DMI Engineering College established with a vision to provide quality technical education' },
    { year: '2009', title: 'AICTE Approval', description: 'Received permanent approval from All India Council for Technical Education' },
    { year: '2009-2019', title: 'Anna University Affiliation', description: 'Affiliated to Anna University, Chennai for all UG and PG programs' },
    { year: '2025', title: 'NBA Accreditation', description: 'Multiple departments received NBA accreditation for quality assurance' },
    { year: '2025', title: 'NAAC Accreditation', description: 'Achieved NAAC accreditation with A Grade for institutional excellence' },
    { year: '2025', title: 'Excellence Milestone', description: 'Recognized as one of the leading engineering institutions in Tamil Nadu' }
  ];

  const highlights = [
    { icon: 'ri-building-line', title: '15+ Years', subtitle: 'of Excellence' },
    { icon: 'ri-graduation-cap-line', title: '3000+', subtitle: 'Alumni Network' },
    { icon: 'ri-team-line', title: '70+', subtitle: 'Expert Faculty' },
    { icon: 'ri-trophy-line', title: '50+', subtitle: 'Awards & Recognition' },
    { icon: 'ri-global-line', title: '50+', subtitle: 'Industry Partners' },
    { icon: 'ri-book-open-line', title: '6', subtitle: 'UG Programs' }
  ];

  const values = [
    {
      icon: 'ri-lightbulb-line',
      title: 'Innovation',
      description: 'Fostering creativity and innovative thinking in every aspect of education and research'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Integrity',
      description: 'Upholding highest standards of academic and professional ethics in all endeavors'
    },
    {
      icon: 'ri-star-line',
      title: 'Excellence',
      description: 'Committed to achieving excellence in teaching, learning, and institutional practices'
    },
    {
      icon: 'ri-group-line',
      title: 'Inclusivity',
      description: 'Creating an inclusive environment that respects diversity and promotes equal opportunities'
    },
    {
      icon: 'ri-hand-heart-line',
      title: 'Social Responsibility',
      description: 'Contributing to society through community engagement and sustainable development'
    },
    {
      icon: 'ri-rocket-line',
      title: 'Leadership',
      description: 'Developing future leaders with strong character, competence, and commitment'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
    
<div className="pt-[72px] 2xl:pt-[120px]" />
      
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="hover:text-teal-200 transition-colors whitespace-nowrap">Home</a>
            <i className="ri-arrow-right-s-line text-teal-300"></i>
            <span className="text-teal-100 whitespace-nowrap">About</span>
            <i className="ri-arrow-right-s-line text-teal-300"></i>
            <span className="text-white whitespace-nowrap">DMI - An Overview</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">DMI Engineering College - An Overview</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 whitespace-nowrap">
                Established 2009
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Building Tomorrow's Engineers Today
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                DMI Engineering College stands as a beacon of technical education excellence in Tamil Nadu. 
                With over two decades of commitment to quality education, we have nurtured thousands of engineers 
                who are making significant contributions across the globe.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Located in the picturesque district of Kanyakumari, our institution combines state-of-the-art 
                infrastructure with experienced faculty to provide a holistic learning environment that prepares 
                students for the challenges of the modern technological landscape.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=modern%20engineering%20college%20campus%20building%20with%20students%20walking%20in%20courtyard%2C%20bright%20sunny%20day%2C%20professional%20architecture%20photography%2C%20wide%20angle%20view%2C%20vibrant%20green%20lawns%20and%20trees%2C%20contemporary%20educational%20facility&width=600&height=400&seq=dmi-campus-overview-001&orientation=landscape"
                alt="DMI College Campus"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold text-teal-600">B+</div>
                <div className="text-sm text-gray-600 whitespace-nowrap">NAAC Accredited</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-teal-50 to-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <i className={`${item.icon} text-4xl text-teal-600`}></i>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1 whitespace-nowrap">{item.title}</div>
                <div className="text-sm text-gray-600 whitespace-nowrap">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-teal-600">
              <div className="w-16 h-16 flex items-center justify-center bg-teal-100 rounded-xl mb-6">
                <i className="ri-eye-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a globally recognized institution of higher learning, fostering innovation, research, 
                and entrepreneurship while producing competent engineers and technologists who contribute 
                significantly to society and industry through ethical practices and sustainable development.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-teal-600">
              <div className="w-16 h-16 flex items-center justify-center bg-teal-100 rounded-xl mb-6">
                <i className="ri-target-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1 mr-3 flex-shrink-0"></i>
                  <span>Provide quality technical education with industry-relevant curriculum</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1 mr-3 flex-shrink-0"></i>
                  <span>Foster research, innovation, and entrepreneurial mindset among students</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1 mr-3 flex-shrink-0"></i>
                  <span>Develop ethical, socially responsible engineers with global competence</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-1 mr-3 flex-shrink-0"></i>
                  <span>Maintain strong industry-academia collaboration for holistic development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide our institution and shape the character of our students
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200">
                <div className="w-14 h-14 flex items-center justify-center bg-teal-100 rounded-xl mb-4">
                  <i className={`${value.icon} text-2xl text-teal-600`}></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 whitespace-nowrap">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Milestones that define our legacy of excellence</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-200 hidden lg:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="flex-1 lg:text-right lg:pr-12">
                    {index % 2 === 0 && (
                      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-3xl font-bold text-teal-600 mb-2">{milestone.year}</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-teal-600 rounded-full border-4 border-white shadow-lg flex-shrink-0">
                    <i className="ri-checkbox-circle-fill text-white text-xl"></i>
                  </div>
                  <div className="flex-1 lg:pl-12">
                    {index % 2 !== 0 && (
                      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-3xl font-bold text-teal-600 mb-2">{milestone.year}</div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accreditations */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Accreditations & Approvals</h2>
            <p className="text-lg text-gray-600">Recognized by leading educational bodies</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'AICTE', full: 'All India Council for Technical Education', status: 'Permanently Approved' },
              { name: 'Anna University', full: 'Anna University, Chennai', status: 'Affiliated' },
              { name: 'NAAC', full: 'National Assessment and Accreditation Council', status: 'B+ Grade' },
              { name: 'NBA', full: 'National Board of Accreditation', status: 'Accredited Programs' }
            ].map((accr, index) => (
              <div key={index} className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 border border-teal-100">
                <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full mx-auto mb-4 shadow-md">
                  <i className="ri-medal-line text-4xl text-teal-600"></i>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 whitespace-nowrap">{accr.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{accr.full}</p>
                <div className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                  {accr.status}
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
