import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

interface Document {
  id: string;
  title: string;
  description: string;
  year: string;
  size: string;
  type: string;
  downloadUrl: string;
}

const IIQAPage = () => {
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

  const documents: Document[] = [
    {
      id: '1',
      title: 'IIQA Report 2023-24',
      description: 'Institutional Information for Quality Assessment - Annual Report',
      year: '2023-24',
      size: '4.2 MB',
      type: 'PDF',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'IIQA Report 2022-23',
      description: 'Institutional Information for Quality Assessment - Annual Report',
      year: '2022-23',
      size: '3.8 MB',
      type: 'PDF',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'IIQA Report 2021-22',
      description: 'Institutional Information for Quality Assessment - Annual Report',
      year: '2021-22',
      size: '3.5 MB',
      type: 'PDF',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'IIQA Data Template 2023-24',
      description: 'Comprehensive data template for quality assessment',
      year: '2023-24',
      size: '2.1 MB',
      type: 'XLSX',
      downloadUrl: '#'
    },
    {
      id: '5',
      title: 'IIQA Supporting Documents 2023-24',
      description: 'Supporting documents and evidence for IIQA submission',
      year: '2023-24',
      size: '15.6 MB',
      type: 'ZIP',
      downloadUrl: '#'
    },
    {
      id: '6',
      title: 'IIQA Compliance Report 2023-24',
      description: 'Compliance report with NAAC guidelines and standards',
      year: '2023-24',
      size: '2.8 MB',
      type: 'PDF',
      downloadUrl: '#'
    }
  ];

  const years = ['all', '2023-24', '2022-23', '2021-22'];

  const filteredDocuments = selectedYear === 'all' 
    ? documents 
    : documents.filter(doc => doc.year === selectedYear);

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'PDF': return 'bg-red-100 text-red-700';
      case 'XLSX': return 'bg-green-100 text-green-700';
      case 'ZIP': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'PDF': return 'ri-file-pdf-line';
      case 'XLSX': return 'ri-file-excel-line';
      case 'ZIP': return 'ri-file-zip-line';
      default: return 'ri-file-line';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar scrolled={scrolled} />
      
      <main className="flex-grow pt-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-teal-600 transition-colors">Home</a>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-900 font-medium">NAAC</span>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
              <span className="text-gray-900 font-medium">IIQA</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <i className="ri-file-chart-line text-5xl"></i>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Institutional Information for Quality Assessment
            </h1>
            <p className="text-xl text-center text-teal-100 max-w-3xl mx-auto">
              IIQA - Comprehensive institutional data and quality metrics for NAAC accreditation
            </p>
          </div>
        </div>

        {/* About IIQA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-information-line text-2xl text-teal-600"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">About IIQA</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The Institutional Information for Quality Assessment (IIQA) is a comprehensive data submission system 
                  that captures institutional information across various parameters defined by NAAC. It serves as the 
                  foundation for quality assessment and accreditation process.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  DMI Engineering College submits IIQA annually, providing detailed information about academic programs, 
                  infrastructure, faculty, research activities, student support services, and governance mechanisms. This 
                  transparent documentation demonstrates our commitment to quality education and continuous improvement.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="ri-database-2-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Data</h3>
                <p className="text-sm text-gray-600">
                  Detailed institutional data covering all seven criteria of NAAC assessment framework
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="ri-shield-check-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                <p className="text-sm text-gray-600">
                  Evidence-based documentation ensuring transparency and accountability
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <i className="ri-line-chart-line text-2xl text-white"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Annual Updates</h3>
                <p className="text-sm text-gray-600">
                  Regular submissions tracking institutional growth and quality enhancement
                </p>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">IIQA Documents</h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 font-medium">Filter by Year:</span>
                <div className="flex space-x-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        selectedYear === year
                          ? 'bg-teal-600 text-white shadow-md'
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${getTypeColor(doc.type)} rounded-xl flex items-center justify-center`}>
                      <i className={`${getTypeIcon(doc.type)} text-2xl`}></i>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {doc.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {doc.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <i className="ri-file-line"></i>
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                    <a
                      href={doc.downloadUrl}
                      className="flex items-center space-x-1 text-teal-600 hover:text-teal-700 font-medium text-sm group/btn"
                    >
                      <span>Download</span>
                      <i className="ri-download-2-line group-hover/btn:translate-y-0.5 transition-transform"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Highlights */}
          <div className="mt-16 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">IIQA Key Highlights</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="ri-book-open-line text-3xl"></i>
                </div>
                <div className="text-3xl font-bold mb-1">7</div>
                <div className="text-sm text-teal-100">NAAC Criteria</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="ri-file-list-3-line text-3xl"></i>
                </div>
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm text-teal-100">Data Points</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="ri-calendar-check-line text-3xl"></i>
                </div>
                <div className="text-3xl font-bold mb-1">Annual</div>
                <div className="text-sm text-teal-100">Submission</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="ri-verified-badge-line text-3xl"></i>
                </div>
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm text-teal-100">Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
};

export default IIQAPage;
