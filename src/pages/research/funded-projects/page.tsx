import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function FundedProjectsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
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
    { label: 'Funded Projects', path: '/research/funded-projects' }
  ];

  const departments = ['All', 'CSE', 'ECE', 'EEE', 'IT', 'Mechanical'];
  const statuses = ['All', 'Ongoing', 'Completed'];

  const projects = [
    {
      title: 'AI-Powered Healthcare Diagnostic System for Rural Areas',
      pi: 'Dr. Rajesh Kumar',
      coPi: 'Dr. Priya Sharma',
      department: 'CSE',
      fundingAgency: 'Department of Science & Technology (DST)',
      amount: '₹25,00,000',
      duration: '3 Years',
      startDate: 'Jan 2023',
      endDate: 'Dec 2025',
      status: 'Ongoing',
      description: 'Development of machine learning-based diagnostic system for early detection of diseases in rural healthcare centers with limited infrastructure.',
      outcomes: ['2 Journal Publications', '1 Patent Filed', '3 Students Involved'],
      color: 'violet'
    },
    {
      title: 'Smart Agriculture Monitoring Using IoT and Sensor Networks',
      pi: 'Dr. Suresh Babu',
      coPi: 'Prof. Lakshmi Devi',
      department: 'ECE',
      fundingAgency: 'Indian Council of Agricultural Research (ICAR)',
      amount: '₹18,50,000',
      duration: '2 Years',
      startDate: 'Mar 2023',
      endDate: 'Feb 2025',
      status: 'Ongoing',
      description: 'IoT-based precision agriculture system for real-time monitoring of soil conditions, weather parameters, and crop health using wireless sensor networks.',
      outcomes: ['1 Conference Paper', '4 Students Involved', 'Field Trials Completed'],
      color: 'sky'
    },
    {
      title: 'Renewable Energy Integration in Smart Grid Systems',
      pi: 'Dr. Venkatesh Reddy',
      coPi: 'Dr. Anitha Kumar',
      department: 'EEE',
      fundingAgency: 'Ministry of New and Renewable Energy (MNRE)',
      amount: '₹32,00,000',
      duration: '3 Years',
      startDate: 'Jul 2022',
      endDate: 'Jun 2025',
      status: 'Ongoing',
      description: 'Research on efficient integration of solar and wind energy sources into smart grid infrastructure with advanced power management algorithms.',
      outcomes: ['3 Journal Publications', '2 Conference Papers', '1 Patent Granted'],
      color: 'emerald'
    },
    {
      title: 'Blockchain-Based Secure Data Management for Healthcare',
      pi: 'Prof. Karthik Rajan',
      coPi: 'Dr. Divya Krishnan',
      department: 'IT',
      fundingAgency: 'All India Council for Technical Education (AICTE)',
      amount: '₹15,00,000',
      duration: '2 Years',
      startDate: 'Aug 2023',
      endDate: 'Jul 2025',
      status: 'Ongoing',
      description: 'Development of blockchain-based framework for secure storage and sharing of electronic health records with privacy preservation.',
      outcomes: ['1 Journal Paper', '5 Students Involved', 'Prototype Developed'],
      color: 'amber'
    },
    {
      title: 'Advanced Robotics for Industrial Automation',
      pi: 'Dr. Mohan Kumar',
      coPi: 'Prof. Sathya Narayanan',
      department: 'Mechanical',
      fundingAgency: 'Science and Engineering Research Board (SERB)',
      amount: '₹28,00,000',
      duration: '3 Years',
      startDate: 'Jan 2022',
      endDate: 'Dec 2024',
      status: 'Ongoing',
      description: 'Design and development of collaborative robots for manufacturing industries with advanced vision systems and AI-based control algorithms.',
      outcomes: ['4 Journal Publications', '3 Conference Papers', '2 Patents Filed'],
      color: 'rose'
    },
    {
      title: 'Deep Learning for Medical Image Analysis',
      pi: 'Dr. Ramesh Babu',
      coPi: 'Prof. Kavitha Menon',
      department: 'CSE',
      fundingAgency: 'Department of Biotechnology (DBT)',
      amount: '₹22,00,000',
      duration: '2 Years',
      startDate: 'Apr 2021',
      endDate: 'Mar 2023',
      status: 'Completed',
      description: 'Development of deep learning models for automated detection and classification of abnormalities in medical imaging including X-rays, CT scans, and MRI.',
      outcomes: ['5 Journal Publications', '1 Patent Granted', 'Technology Transfer Completed'],
      color: 'violet'
    },
    {
      title: '5G Network Optimization and Performance Enhancement',
      pi: 'Dr. Vijay Kumar',
      coPi: 'Dr. Meena Lakshmi',
      department: 'ECE',
      fundingAgency: 'Telecom Regulatory Authority of India (TRAI)',
      amount: '₹20,00,000',
      duration: '2 Years',
      startDate: 'Jun 2021',
      endDate: 'May 2023',
      status: 'Completed',
      description: 'Research on optimization techniques for 5G networks including beamforming, massive MIMO, and network slicing for improved performance.',
      outcomes: ['3 Journal Publications', '4 Conference Papers', '6 Students Trained'],
      color: 'sky'
    },
    {
      title: 'Energy Efficient Power Distribution Systems',
      pi: 'Prof. Senthil Kumar',
      coPi: 'Dr. Radha Krishnan',
      department: 'EEE',
      fundingAgency: 'Tamil Nadu State Council for Science and Technology',
      amount: '₹12,00,000',
      duration: '18 Months',
      startDate: 'Jan 2022',
      endDate: 'Jun 2023',
      status: 'Completed',
      description: 'Development of intelligent power distribution system with real-time monitoring and fault detection capabilities for improved energy efficiency.',
      outcomes: ['2 Journal Publications', '1 Conference Paper', 'Industry Collaboration'],
      color: 'emerald'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const statusMatch = selectedStatus === 'All' || project.status === selectedStatus;
    const deptMatch = selectedDepartment === 'All' || project.department === selectedDepartment;
    return statusMatch && deptMatch;
  });

  const stats = [
    { label: 'Total Funding', value: '₹1.72 Cr', icon: 'ri-money-rupee-circle-line', color: 'from-violet-500 to-purple-600' },
    { label: 'Active Projects', value: '12', icon: 'ri-flask-line', color: 'from-sky-500 to-blue-600' },
    { label: 'Completed Projects', value: '8', icon: 'ri-checkbox-circle-line', color: 'from-emerald-500 to-teal-600' },
    { label: 'Funding Agencies', value: '15+', icon: 'ri-building-line', color: 'from-amber-500 to-orange-600' }
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
            backgroundImage: 'url("https://readdy.ai/api/search-image?query=research%20funding%20grants%20scientific%20projects%20laboratory%20equipment%20modern%20research%20facility%20professional%20academic%20environment%20innovation%20technology%20development&width=1920&height=600&seq=funded-projects-hero&orientation=landscape")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-500/20 rounded-full mb-6">
            <i className="ri-funds-line text-5xl text-violet-400"></i>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Funded Research Projects
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Showcasing externally funded research projects supported by government agencies, industries, and international organizations.
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
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Filter by Status</label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-6 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                        selectedStatus === status
                          ? 'bg-violet-600 text-white shadow-lg'
                          : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
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
                  Showing <strong className="text-violet-600">{filteredProjects.length}</strong> projects
                </p>
                <button
                  onClick={() => {
                    setSelectedStatus('All');
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

      {/* Projects List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className={`h-1.5 bg-gradient-to-r from-${project.color}-500 to-${project.color}-600`}></div>
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 bg-${project.color}-100 text-${project.color}-700 rounded-full text-xs font-semibold`}>
                        {project.department}
                      </span>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                        project.status === 'Ongoing' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-sm">
                      <i className="ri-user-line text-violet-600 mt-0.5"></i>
                      <div>
                        <strong className="text-slate-900">PI:</strong> <span className="text-slate-600">{project.pi}</span>
                        {project.coPi && (
                          <>
                            <br />
                            <strong className="text-slate-900">Co-PI:</strong> <span className="text-slate-600">{project.coPi}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-building-line text-violet-600"></i>
                      <span className="text-slate-600">{project.fundingAgency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <i className="ri-calendar-line text-violet-600"></i>
                      <span className="text-slate-600">{project.startDate} - {project.endDate} ({project.duration})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-violet-600">{project.amount}</div>
                      <div className="text-xs text-slate-500">Total Funding</div>
                    </div>
                    <button className="px-5 py-2.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-all text-sm font-medium whitespace-nowrap cursor-pointer">
                      View Details
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="text-xs font-semibold text-slate-700 mb-3">Key Outcomes:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.outcomes.map((outcome, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs">
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                <i className="ri-search-line text-4xl text-slate-400"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No Projects Found</h3>
              <p className="text-slate-600 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => {
                  setSelectedStatus('All');
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
            Apply for Research Funding
          </h2>
          <p className="text-purple-200 text-base mb-8 max-w-2xl mx-auto">
            Faculty members interested in applying for research grants can contact the R&D Cell for guidance and support.
          </p>
          <button className="bg-violet-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-violet-600 transition-all hover:scale-105 whitespace-nowrap cursor-pointer">
            Contact R&D Cell
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
