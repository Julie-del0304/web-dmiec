import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

interface RITDocument {
  id: string;
  title: string;
  description: string;
  year: string;
  quarter: string;
  size: string;
  downloadUrl: string;
}

const RITPage = () => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
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

  const documents: RITDocument[] = [
    {
      id: '1',
      title: 'RIT Report Q4 2023-24',
      description: 'Regular Information Tracking - Fourth Quarter Report',
      year: '2023-24',
      quarter: 'Q4',
      size: '2.8 MB',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'RIT Report Q3 2023-24',
      description: 'Regular Information Tracking - Third Quarter Report',
      year: '2023-24',
      quarter: 'Q3',
      size: '2.6 MB',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'RIT Report Q2 2023-24',
      description: 'Regular Information Tracking - Second Quarter Report',
      year: '2023-24',
      quarter: 'Q2',
      size: '2.5 MB',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'RIT Report Q1 2023-24',
      description: 'Regular Information Tracking - First Quarter Report',
      year: '2023-24',
      quarter: 'Q1',
      size: '2.4 MB',
      downloadUrl: '#'
    },
    {
      id: '5',
      title: 'RIT Annual Report 2022-23',
      description: 'Consolidated annual report with all quarterly submissions',
      year: '2022-23',
      quarter: 'Annual',
      size: '8.5 MB',
      downloadUrl: '#'
    },
    {
      id: '6',
      title: 'RIT Annual Report 2021-22',
      description: 'Consolidated annual report with all quarterly submissions',
      year: '2021-22',
      quarter: 'Annual',
      size: '7.8 MB',
      downloadUrl: '#'
    }
  ];

  const trackingAreas = [
    {
      id: 1,
      title: 'Academic Performance',
      description: 'Student enrollment, pass percentage, and academic achievements',
      icon: 'ri-graduation-cap-line',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'Faculty Development',
      description: 'Faculty qualifications, training programs, and research activities',
      icon: 'ri-user-star-line',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      title: 'Infrastructure Updates',
      description: 'New facilities, equipment procurement, and maintenance',
      icon: 'ri-building-4-line',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      title: 'Research & Innovation',
      description: 'Publications, patents, funded projects, and consultancy',
      icon: 'ri-lightbulb-flash-line',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 5,
      title: 'Student Support',
      description: 'Scholarships, placements, counseling, and welfare activities',
      icon: 'ri-hand-heart-line',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 6,
      title: 'Quality Initiatives',
      description: 'Quality enhancement measures and best practices implementation',
      icon: 'ri-award-line',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  const years = ['all', '2023-24', '2022-23', '2021-22'];

  const filteredDocuments = selectedYear === 'all' 
    ? documents 
    : documents.filter(doc => doc.year === selectedYear);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar scrolled={scrolled} />
      
      <main className="flex-grow pt-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-emerald-600 transition-colors">Home</a>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-900 font-medium">NAAC</span>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-900 font-medium">RIT</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="ri-line-chart-line text-5xl"></i>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Regular Information Tracking (RIT)
            </h1>
            <p className="text-xl text-center text-emerald-100 max-w-3xl mx-auto">
              Continuous monitoring and reporting of institutional performance metrics
            </p>
          </div>
        </div>

        {/* About RIT Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-information-line text-2xl text-emerald-600"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">About Regular Information Tracking</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Regular Information Tracking (RIT) is a continuous quality monitoring mechanism introduced by NAAC 
                  to track institutional performance on a regular basis. It enables institutions to maintain updated 
                  information about their academic, administrative, and infrastructural developments.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  DMI Engineering College submits RIT reports quarterly, documenting progress across various parameters 
                  including student enrollment, faculty development, research activities, infrastructure enhancement, and 
                  quality initiatives. This systematic tracking helps in maintaining transparency and continuous improvement.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="ri-refresh-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quarterly Updates</h3>
                <p className="text-sm text-gray-600">
                  Regular quarterly submissions ensuring continuous monitoring and timely reporting
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="ri-bar-chart-box-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Metrics</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive tracking of key performance indicators across all domains
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="ri-eye-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transparency</h3>
                <p className="text-sm text-gray-600">
                  Open documentation of institutional progress and quality enhancement measures
                </p>
              </div>
            </div>
          </div>

          {/* Tracking Areas */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Tracking Areas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trackingAreas.map((area) => (
                <div
                  key={area.id}
                  className={`${area.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300`}
                >
                  <div className={`w-14 h-14 ${area.color} bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                    <i className={`${area.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{area.title}</h3>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">RIT Reports</h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 font-medium">Filter by Year:</span>
                <div className="flex space-x-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        selectedYear === year
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {year === 'all' ? 'All Years' : year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-6 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i className="ri-file-chart-line text-2xl text-emerald-600"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                          {doc.quarter}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {doc.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <i className="ri-file-line"></i>
                          <span>PDF</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <i className="ri-hard-drive-line"></i>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={doc.downloadUrl}
                  className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all w-full group/btn"
                >
                  <span>Download Report</span>
                  <i className="ri-download-2-line group-hover/btn:translate-y-0.5 transition-transform"></i>
                </a>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">RIT Submission Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="ri-calendar-check-line text-3xl"></i>
                </div>
                <div className="text-3xl font-bold mb-1">4</div>
                <div className="text-sm text-emerald-100">Quarterly Reports</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="ri-file-list-3-line text-3xl"></i>
                </div>
                <div className="text-3xl font-bold mb-1">200+</div>
                <div className="text-sm text-emerald-100">Data Points</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="ri-time-line text-3xl"></i>
                </div>
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm text-emerald-100">On-Time Submission</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="ri-shield-check-line text-3xl"></i>
                </div>
                <div className="text-3xl font-bold mb-1">3+</div>
                <div className="text-sm text-emerald-100">Years Tracking</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
};

export default RITPage;
