import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function PublicationsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

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
    { label: 'Publications', path: '/research/publications' }
  ];

  const years = ['All', '2024', '2023', '2022', '2021'];
  const departments = ['All', 'CSE', 'ECE', 'EEE', 'IT', 'Mechanical', 'S&H'];

  const publications = [
    {
      title: 'Deep Learning Approaches for Medical Image Segmentation in Healthcare Diagnostics',
      authors: 'Dr. Rajesh Kumar, Dr. Priya Sharma, Prof. Arun Menon',
      department: 'CSE',
      journal: 'IEEE Transactions on Medical Imaging',
      year: '2024',
      type: 'Journal',
      impact: '10.6',
      doi: '10.1109/TMI.2024.12345',
      citations: 45,
      color: 'violet'
    },
    {
      title: 'IoT-Based Smart Agriculture Monitoring System Using Machine Learning',
      authors: 'Dr. Suresh Babu, Prof. Lakshmi Devi',
      department: 'ECE',
      journal: 'International Journal of Agricultural Technology',
      year: '2024',
      type: 'Journal',
      impact: '7.2',
      doi: '10.1016/j.agtech.2024.56789',
      citations: 32,
      color: 'sky'
    },
    {
      title: 'Optimization of Solar Panel Efficiency Using Advanced Materials',
      authors: 'Dr. Venkatesh Reddy, Dr. Anitha Kumar',
      department: 'EEE',
      journal: 'Renewable Energy Journal',
      year: '2024',
      type: 'Journal',
      impact: '8.9',
      doi: '10.1016/j.renene.2024.78901',
      citations: 28,
      color: 'emerald'
    },
    {
      title: 'Blockchain Technology for Secure Healthcare Data Management',
      authors: 'Prof. Karthik Rajan, Dr. Divya Krishnan',
      department: 'IT',
      journal: 'Journal of Information Security',
      year: '2024',
      type: 'Journal',
      impact: '6.8',
      doi: '10.1109/JIS.2024.23456',
      citations: 38,
      color: 'amber'
    },
    {
      title: 'Advanced Robotics for Industrial Automation and Manufacturing',
      authors: 'Dr. Mohan Kumar, Prof. Sathya Narayanan',
      department: 'Mechanical',
      journal: 'International Journal of Robotics Research',
      year: '2023',
      type: 'Journal',
      impact: '9.1',
      doi: '10.1177/IJRR.2023.34567',
      citations: 52,
      color: 'rose'
    },
    {
      title: 'Natural Language Processing for Sentiment Analysis in Social Media',
      authors: 'Dr. Ramesh Babu, Prof. Kavitha Menon',
      department: 'CSE',
      journal: 'ACM Transactions on Information Systems',
      year: '2023',
      type: 'Journal',
      impact: '7.5',
      doi: '10.1145/TOIS.2023.45678',
      citations: 41,
      color: 'violet'
    },
    {
      title: '5G Network Optimization Using Artificial Intelligence Techniques',
      authors: 'Dr. Vijay Kumar, Dr. Meena Lakshmi',
      department: 'ECE',
      journal: 'IEEE Communications Magazine',
      year: '2023',
      type: 'Journal',
      impact: '11.2',
      doi: '10.1109/MCOM.2023.56789',
      citations: 67,
      color: 'sky'
    },
    {
      title: 'Smart Grid Technology for Efficient Power Distribution Systems',
      authors: 'Prof. Senthil Kumar, Dr. Radha Krishnan',
      department: 'EEE',
      journal: 'IEEE Transactions on Smart Grid',
      year: '2023',
      type: 'Journal',
      impact: '10.1',
      doi: '10.1109/TSG.2023.67890',
      citations: 55,
      color: 'emerald'
    },
    {
      title: 'Cloud Computing Security Framework for Enterprise Applications',
      authors: 'Dr. Prakash Reddy, Prof. Sangeetha Devi',
      department: 'IT',
      journal: 'Journal of Cloud Computing',
      year: '2023',
      type: 'Journal',
      impact: '6.3',
      doi: '10.1186/JCC.2023.78901',
      citations: 36,
      color: 'amber'
    },
    {
      title: 'Additive Manufacturing Techniques for Aerospace Components',
      authors: 'Dr. Ganesh Kumar, Prof. Lakshmi Narayanan',
      department: 'Mechanical',
      journal: 'Journal of Manufacturing Processes',
      year: '2022',
      type: 'Journal',
      impact: '8.4',
      doi: '10.1016/j.jmapro.2022.89012',
      citations: 48,
      color: 'rose'
    },
    {
      title: 'Mathematical Modeling of Fluid Dynamics in Engineering Applications',
      authors: 'Dr. Subramanian Iyer, Prof. Vasantha Kumar',
      department: 'S&H',
      journal: 'Applied Mathematics and Computation',
      year: '2022',
      type: 'Journal',
      impact: '7.8',
      doi: '10.1016/j.amc.2022.90123',
      citations: 29,
      color: 'cyan'
    },
    {
      title: 'Computer Vision Applications in Autonomous Vehicle Navigation',
      authors: 'Dr. Aravind Kumar, Dr. Preethi Sharma',
      department: 'CSE',
      journal: 'IEEE Transactions on Intelligent Transportation Systems',
      year: '2022',
      type: 'Journal',
      impact: '9.6',
      doi: '10.1109/TITS.2022.01234',
      citations: 61,
      color: 'violet'
    }
  ];

  const filteredPublications = publications.filter(pub => {
    const yearMatch = selectedYear === 'All' || pub.year === selectedYear;
    const deptMatch = selectedDepartment === 'All' || pub.department === selectedDepartment;
    return yearMatch && deptMatch;
  });

  const stats = [
    { label: 'Total Publications', value: '150+', icon: 'ri-file-text-line', color: 'from-violet-500 to-purple-600' },
    { label: 'Journal Papers', value: '95', icon: 'ri-book-open-line', color: 'from-sky-500 to-blue-600' },
    { label: 'Conference Papers', value: '55', icon: 'ri-presentation-line', color: 'from-emerald-500 to-teal-600' },
    { label: 'Citations', value: '1200+', icon: 'ri-quote-text', color: 'from-amber-500 to-orange-600' }
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
                {index > 0 && <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>}
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
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://readdy.ai/api/search-image?query=academic%20research%20publications%20scientific%20journals%20books%20library%20shelves%20modern%20university%20research%20center%20professional%20scholarly%20environment%20knowledge%20documentation&width=1920&height=600&seq=publications-hero&orientation=landscape")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-500/20 rounded-full mb-6">
            <i className="ri-article-line text-5xl text-violet-400"></i>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Research Publications
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Showcasing our faculty's scholarly contributions to engineering and technology through peer-reviewed journals, conferences, and research papers.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${stat.icon} text-white text-3xl`}></i>
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Year Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Filter by Year</label>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                        selectedYear === year
                          ? 'bg-violet-600 text-white shadow-lg'
                          : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Filter by Department</label>
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                        selectedDepartment === dept
                          ? 'bg-violet-600 text-white shadow-lg'
                          : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-slate-600 text-sm">
                  Showing <strong className="text-violet-600">{filteredPublications.length}</strong> publications
                </p>
                <button
                  onClick={() => {
                    setSelectedYear('All');
                    setSelectedDepartment('All');
                  }}
                  className="text-violet-600 hover:text-violet-700 text-sm font-medium cursor-pointer whitespace-nowrap"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredPublications.map((pub, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className={`h-1.5 bg-gradient-to-r from-${pub.color}-500 to-${pub.color}-600`}></div>
                <div className="p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 bg-${pub.color}-100 text-${pub.color}-700 rounded-full text-xs font-semibold`}>
                        {pub.department}
                      </span>
                      <span className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
                        {pub.year}
                      </span>
                      <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                        Impact Factor: {pub.impact}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <i className="ri-quote-text text-lg"></i>
                      <span className="font-medium">{pub.citations} citations</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight hover:text-violet-600 transition-colors cursor-pointer">
                    {pub.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4">
                    <strong>Authors:</strong> {pub.authors}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <i className="ri-book-open-line text-violet-600"></i>
                      <span>{pub.journal}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-file-text-line text-violet-600"></i>
                      <span>{pub.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-slate-500">
                      <strong>DOI:</strong> {pub.doi}
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all text-sm font-medium whitespace-nowrap cursor-pointer">
                      <i className="ri-external-link-line"></i>
                      View Publication
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                <i className="ri-file-search-line text-4xl text-slate-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No Publications Found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => {
                  setSelectedYear('All');
                  setSelectedDepartment('All');
                }}
                className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all font-medium whitespace-nowrap cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-violet-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-500/20 rounded-full mb-6">
            <i className="ri-file-add-line text-4xl text-violet-400"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Submit Your Research
          </h2>
          <p className="text-purple-200 text-base mb-8 max-w-2xl mx-auto">
            Faculty members can submit their latest publications for inclusion in our research repository.
          </p>
          <button className="bg-violet-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-violet-600 transition-all hover:scale-105 whitespace-nowrap cursor-pointer">
            Submit Publication
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
