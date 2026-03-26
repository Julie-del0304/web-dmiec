import { useState, useEffect } from 'react';
import Navbar from '../../../home/components/Navbar';
import Footer from '../../../home/components/Footer';

// ─── Activity Detail Pages ───────────────────────────────────────────────────

const activityDetails: Record<string, {
  title: string;
  icon: string;
  color: string;
  overview: string;
  objectives: string[];
  highlights: { label: string; value: string }[];
  schedule: string;
  eligibility: string;
}> = {
  'Power Seminar on IoT in Automobile': {
    title: 'Power Seminar on IoT in Automobile',
    icon: 'ri-car-line',
    color: 'from-blue-500 to-cyan-500',
    overview: 'A comprehensive seminar exploring how Internet of Things (IoT) technology is revolutionizing the automobile industry with connected vehicles, smart sensors, and autonomous driving systems. This power seminar brings together industry experts, automotive engineers, and technology enthusiasts to discuss the future of transportation.',
    objectives: [
      'Understand IoT architecture and its application in modern automobiles',
      'Explore connected vehicle technologies and V2X communication',
      'Learn about sensor integration, data collection, and real-time analytics',
      'Gain insights into autonomous driving systems and safety protocols',
      'Discover career opportunities in the automotive IoT sector'
    ],
    highlights: [
      { label: 'Duration', value: 'Full Day Seminar' },
      { label: 'Mode', value: 'On-campus with Live Demos' },
      { label: 'Speakers', value: 'Industry Experts & Automotive Engineers' },
      { label: 'Certificate', value: 'ICT Academy Certified' }
    ],
    schedule: 'Scheduled once per academic year. Register through ICT Academy portal or college notice board for upcoming dates.',
    eligibility: 'Open to all engineering students, especially from ECE, EEE, CSE, and Mechanical departments.'
  },
  'Virtual Power Seminar on Blockchain': {
    title: 'Virtual Power Seminar on Blockchain',
    icon: 'ri-link',
    color: 'from-purple-500 to-pink-500',
    overview: 'An in-depth virtual seminar covering blockchain technology fundamentals, cryptocurrency applications, smart contracts, and decentralized systems for the future of digital transactions. This seminar provides comprehensive insights into how blockchain is transforming industries beyond cryptocurrency.',
    objectives: [
      'Understand blockchain architecture, consensus mechanisms, and cryptography',
      'Explore smart contract development and decentralized applications (dApps)',
      'Learn about cryptocurrency, NFTs, and digital asset management',
      'Discover real-world applications in finance, supply chain, and healthcare',
      'Gain hands-on experience with blockchain platforms and tools'
    ],
    highlights: [
      { label: 'Duration', value: '2 Days Virtual Seminar' },
      { label: 'Mode', value: 'Online with Interactive Sessions' },
      { label: 'Platform', value: 'Microsoft Teams / Zoom' },
      { label: 'Certificate', value: 'ICT Academy Blockchain Certified' }
    ],
    schedule: 'Conducted twice per academic year. Virtual registration opens one month prior to the event.',
    eligibility: 'Open to all students interested in emerging technologies. Basic programming knowledge recommended.'
  },
  'FDP on Microsoft Power BI Data Analyst': {
    title: 'FDP on Microsoft Power BI Data Analyst',
    icon: 'ri-bar-chart-line',
    color: 'from-green-500 to-teal-500',
    overview: 'A comprehensive Faculty Development Program focusing on Microsoft Power BI data analytics, teaching educators how to effectively use data visualization tools, create interactive dashboards, and enhance teaching methodologies through data-driven insights.',
    objectives: [
      'Master Power BI desktop, service, and mobile applications',
      'Learn data modeling, DAX formulas, and visualization techniques',
      'Create interactive dashboards and reports for academic analytics',
      'Integrate Power BI with educational data sources',
      'Enhance teaching methodologies using data-driven insights'
    ],
    highlights: [
      { label: 'Duration', value: '5 Days Intensive Training' },
      { label: 'Mode', value: 'Residential Workshop' },
      { label: 'Certification', value: 'Microsoft Certified Power BI Associate' },
      { label: 'Materials', value: 'Courseware & Practice Datasets Provided' }
    ],
    schedule: 'Conducted during semester breaks and vacation periods to minimize class disruptions.',
    eligibility: 'All teaching faculty members. Priority for faculty handling data analytics, computer science, and management subjects.'
  },
  'Technical Workshops': {
    title: 'Technical Workshops',
    icon: 'ri-tools-line',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Our Technical Workshops are intensive, hands-on sessions designed to immerse students in the latest emerging technologies. Conducted by industry experts, each workshop bridges the gap between classroom theory and real-world application, giving students a competitive edge in the job market.',
    objectives: [
      'Gain practical exposure to technologies like AI, ML, Cloud Computing, IoT, and Blockchain.',
      'Work on mini-projects and live demos guided by industry practitioners.',
      'Understand real-world use cases and current industry challenges.',
      'Receive participation certificates recognised by ICT Academy.',
    ],
    highlights: [
      { label: 'Frequency', value: 'Monthly / Bi-monthly' },
      { label: 'Duration', value: '1–3 Days per Workshop' },
      { label: 'Mode', value: 'On-campus & Online' },
      { label: 'Certificate', value: 'ICT Academy Certified' },
    ],
    schedule: 'Workshops are announced at the start of each semester. Watch the college notice board and ICT Academy portal for upcoming dates.',
    eligibility: 'Open to all engineering students of DMI College. Priority registration for final-year students.',
  },
  'Industry Certification Programs': {
    title: 'Industry Certification Programs',
    icon: 'ri-award-line',
    color: 'from-purple-500 to-pink-500',
    overview: 'Industry Certification Programs equip students with industry-recognised credentials in high-demand technology domains. Through collaboration with Infosys and other leading companies, these structured courses combine self-paced learning modules with instructor-led sessions, culminating in a certification exam that adds proven value to your resume.',
    objectives: [
      'Earn globally recognised certifications in Python, Java, Data Science, Cyber Security, and more.',
      'Follow a curriculum designed in collaboration with leading IT companies.',
      'Access ICT Academy and Infosys Learning Management System (LMS) for study materials.',
      'Boost employability with verified digital badges and certificates.',
    ],
    highlights: [
      { label: 'Domains', value: 'Python · Java · Data Science · Cyber Security · Cloud' },
      { label: 'Duration', value: '4–8 Weeks per Program' },
      { label: 'Assessment', value: 'Online Proctored Exam' },
      { label: 'Certificate', value: 'Industry-Recognised' },
    ],
    schedule: 'Certification batches are offered every semester. Register through the ICT Academy Student Portal before the batch closes.',
    eligibility: 'All students enrolled at DMI College. Prior programming knowledge recommended for advanced tracks.',
  },
  'Hackathons & Competitions': {
    title: 'Hackathons & Competitions',
    icon: 'ri-trophy-line',
    color: 'from-indigo-500 to-purple-500',
    overview: 'Hackathons and Competitions are the proving grounds where ideas meet execution. ICT Academy facilitates participation in prestigious national and international coding contests, smart-India hackathons, and problem-solving challenges that push students to innovate under pressure.',
    objectives: [
      'Apply academic knowledge to solve real-world problems within tight deadlines.',
      'Build team-working, communication, and rapid-prototyping skills.',
      'Win cash prizes, trophies, internship offers, and pre-placement opportunities.',
      'Strengthen portfolios with tangible project outcomes.',
    ],
    highlights: [
      { label: 'Types', value: 'Hackathons · Code Sprints · Case Studies · Quizzes' },
      { label: 'Level', value: 'Intra-college, State, National & International' },
      { label: 'Team Size', value: '1–4 Members' },
      { label: 'Rewards', value: 'Prizes, Certificates & PPOs' },
    ],
    schedule: 'Competitions run throughout the year. An internal selection round is held for major national events.',
    eligibility: 'All students. Cross-department teams are encouraged for interdisciplinary hackathons.',
  }
};

function ActivityDetailPage({ activityTitle, onBack }: { activityTitle: string; onBack: () => void }) {
  const detail = activityDetails[activityTitle];
  if (!detail) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-2">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-teal-600 hover:text-teal-800 font-semibold transition-colors duration-200"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            <span>Back to Activities</span>
          </button>
          <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
          <span className="text-teal-600 font-semibold">{detail.title}</span>
        </div>
      </div>

      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${detail.color} text-white py-20`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
            <i className={`${detail.icon} text-5xl text-white`}></i>
          </div>
          <h1 className="text-4xl font-bold mb-4">{detail.title}</h1>
          <p className="text-white/90 text-lg max-w-2xl">{detail.overview}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-14">

        {/* Highlights */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">At a Glance</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detail.highlights.map((h, i) => (
              <div key={i} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
                <p className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-2">{h.label}</p>
                <p className="text-gray-800 font-semibold text-sm leading-relaxed">{h.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Learning Objectives</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {detail.objectives.map((obj, i) => (
              <div key={i} className="flex items-start space-x-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-check-line text-xl text-white"></i>
                </div>
                <p className="text-gray-700 leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule & Eligibility */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-line text-xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Schedule</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{detail.schedule}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Eligibility</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{detail.eligibility}</p>
          </div>
        </div>

        {/* CTA */}
        <div className={`bg-gradient-to-br ${detail.color} rounded-2xl p-10 text-white text-center`}>
          <h3 className="text-2xl font-bold mb-3">Interested in {detail.title}?</h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Contact the ICT Academy coordinator at DMI College or visit the ICT Academy portal to register.
          </p>
          <button
            onClick={onBack}
            className="bg-white text-gray-800 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            ← Back to All Activities
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Main ICT Page ────────────────────────────────────────────────────────────

export default function ICTPage() {
  const [activeTab, setActiveTab] = useState<'about' | 'benefits' | 'activities' | 'team'>('about');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Co-Curricular', path: '#' },
    { label: 'Membership', path: '#' },
    { label: 'ICT Academy', path: '/co-curricular/membership/ict' }
  ];

  const benefits = [
    {
      icon: 'ri-book-open-line',
      title: 'Industry-Aligned Curriculum',
      description: 'Access to updated curriculum aligned with current industry requirements and emerging technologies.'
    },
    {
      icon: 'ri-team-line',
      title: 'Expert Faculty Training',
      description: 'Regular faculty development programs conducted by industry experts and technology leaders.'
    },
    {
      icon: 'ri-certificate-line',
      title: 'Industry Certifications',
      description: 'Students can earn industry-recognized certifications in various technology domains.'
    },
    {
      icon: 'ri-briefcase-line',
      title: 'Placement Support',
      description: 'Enhanced placement opportunities through ICT Academy\'s industry network and partnerships.'
    },
    {
      icon: 'ri-code-box-line',
      title: 'Hands-on Training',
      description: 'Practical training sessions on latest tools, technologies, and industry best practices.'
    },
    {
      icon: 'ri-global-line',
      title: 'Industry Connect',
      description: 'Direct interaction with industry professionals through workshops, seminars, and guest lectures.'
    }
  ];

  const activities = [
    {
      title: 'Power Seminar on IoT in Automobile',
      description: 'A comprehensive seminar exploring how Internet of Things (IoT) technology is revolutionizing the automobile industry with connected vehicles, smart sensors, and autonomous driving systems.',
      icon: 'ri-car-line',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Virtual Power Seminar on Blockchain',
      description: 'In-depth virtual seminar covering blockchain technology fundamentals, cryptocurrency applications, smart contracts, and decentralized systems for the future of digital transactions.',
      icon: 'ri-link',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'FDP on Microsoft Power BI Data Analyst',
      description: 'Faculty Development Program focusing on Microsoft Power BI data analytics, teaching educators how to effectively use data visualization tools to enhance teaching methodologies.',
      icon: 'ri-bar-chart-line',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Technical Workshops',
      description: 'Regular workshops on emerging technologies like AI, ML, Cloud Computing, IoT, and Blockchain with hands-on training and practical exposure.',
      icon: 'ri-tools-line',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Industry Certification Programs',
      description: 'Industry certification courses in Python, Java, Data Science, Cyber Security, and more through collaboration with Infosys and other leading companies.',
      icon: 'ri-award-line',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Hackathons & Competitions',
      description: 'Participation in coding competitions, hackathons, and technical challenges that help students tackle real-world problems and build critical thinking skills.',
      icon: 'ri-trophy-line',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const team = [
    {
      name: 'Dr. Faculty Coordinator',
      designation: 'ICT Academy Coordinator',
      department: 'Computer Science',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20professor%20in%20formal%20attire%20standing%20confidently%20in%20modern%20office%20environment%20clean%20background%20academic%20setting%20portrait%20style&width=400&height=500&seq=ict-coord-001&orientation=portrait'
    },
    {
      name: 'Prof. Co-Coordinator',
      designation: 'ICT Academy Co-Coordinator',
      department: 'Information Technology',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20in%20formal%20attire%20standing%20confidently%20in%20modern%20office%20environment%20clean%20background%20academic%20setting%20portrait%20style&width=400&height=500&seq=ict-coord-002&orientation=portrait'
    }
  ];

  // ── If an activity detail page is active, render it ──
  if (selectedActivity) {
    return (
      <>
        <Navbar scrolled={true} />
        <ActivityDetailPage
          activityTitle={selectedActivity}
          onBack={() => setSelectedActivity(null)}
        />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={true} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>}
                <a
                  href={crumb.path}
                  className={`${
                    index === breadcrumbs.length - 1
                      ? 'text-teal-600 font-semibold'
                      : 'text-gray-600 hover:text-teal-600'
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
      <div className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <i className="ri-computer-line text-6xl"></i>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">
            ICT Academy Membership
          </h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Empowering Future Innovators Through Technology Excellence
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'about', label: 'About ICT', icon: 'ri-information-line' },
              { id: 'benefits', label: 'Benefits', icon: 'ri-star-line' },
              { id: 'activities', label: 'Activities', icon: 'ri-calendar-event-line' },
              { id: 'team', label: 'Coordinators', icon: 'ri-team-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-teal-600'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* About Tab */}
      {activeTab === 'about' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">ICT Academy: Empowering Future Innovators</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                The ICT Academy is an exciting initiative designed to help students and professionals become skilled in the latest technology. 
                Its main goal is to connect education with industry needs, ensuring that learners are prepared for the fast-changing tech landscape.
              </p>
              <p>
                The ICT Academy of Tamil Nadu is a not-for-profit society setup by the Government of Tamil Nadu 
                in partnership with leading IT industry associations NASSCOM, MHRD, and other stakeholders. 
                The Academy aims to enhance the employability of engineering graduates through industry-aligned 
                training and certification programs.
              </p>
              <p>
                DMI Engineering College is proud to be a member institution of ICT Academy, providing our 
                students and faculty with access to world-class training resources, industry connections, and 
                certification opportunities. This partnership ensures that our curriculum stays relevant to 
                current industry needs and our graduates are job-ready.
              </p>
            </div>

            {/* Key Programs Section */}
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Key Programs and Activities</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-car-line text-2xl text-white"></i>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Power Seminar on IoT in Automobile</h4>
                  </div>
                  <p className="text-gray-700">A comprehensive seminar exploring how Internet of Things (IoT) technology is revolutionizing the automobile industry with connected vehicles, smart sensors, and autonomous driving systems.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-link text-2xl text-white"></i>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Virtual Power Seminar on Blockchain</h4>
                  </div>
                  <p className="text-gray-700">In-depth virtual seminar covering blockchain technology fundamentals, cryptocurrency applications, smart contracts, and decentralized systems for the future of digital transactions.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-bar-chart-line text-2xl text-white"></i>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">FDP on Microsoft Power BI Data Analyst</h4>
                  </div>
                  <p className="text-gray-700">Faculty Development Program focusing on Microsoft Power BI data analytics, teaching educators how to effectively use data visualization tools to enhance teaching methodologies.</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-handshake-line text-2xl text-white"></i>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Industry Collaboration</h4>
                  </div>
                  <p className="text-gray-700">Collaboration with companies like Infosys to provide hands-on training and real-world experience, further enriching the learning opportunities for students.</p>
                </div>
              </div>
            </div>

            {/* Benefits for Students Section */}
            <div className="mt-12 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits for Students</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Practical Skills Development</h4>
                    <p className="text-gray-700 text-sm">Learn how to tackle challenges, think critically, and build confidence in abilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Career Preparation</h4>
                    <p className="text-gray-700 text-sm">Acquire skills that employers are looking for in the technology industry</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Hands-on Experience</h4>
                    <p className="text-gray-700 text-sm">Real-world experience through industry visits and collaborative training programs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Innovative Thinking</h4>
                    <p className="text-gray-700 text-sm">Encouraged to become innovative thinkers who can contribute to technological advancements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Commitment to Excellence */}
            <div className="mt-12">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Commitment to Excellence</h3>
                <p className="text-gray-700 leading-relaxed">
                  The Academy is dedicated to providing high-quality technology education. It creates a supportive environment where 
                  students can share ideas and work together. By doing so, students are not only equipped with valuable skills but 
                  also encouraged to become innovative thinkers who can contribute to technological advancements.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Key Highlights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Industry Partnership</h4>
                    <p className="text-white/90 text-sm">Collaboration with leading IT companies including Infosys</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Certified Training</h4>
                    <p className="text-white/90 text-sm">Industry-recognized certification programs</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Expert Faculty</h4>
                    <p className="text-white/90 text-sm">Training by industry professionals and experts</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Placement Support</h4>
                    <p className="text-white/90 text-sm">Enhanced job opportunities through industry network</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Tab */}
      {activeTab === 'benefits' && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Membership Benefits</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Comprehensive advantages for students and faculty through ICT Academy partnership
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                    <i className={`${benefit.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Activities & Programs</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Regular training programs and activities conducted through ICT Academy
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center mb-6`}>
                    <i className={`${activity.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1">{activity.description}</p>

                  <button
                    onClick={() => setSelectedActivity(activity.title)}
                    className={`mt-6 w-full flex items-center justify-center space-x-2 bg-gradient-to-r ${activity.color} text-white font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity duration-200`}
                  >
                    <i className="ri-eye-line text-lg"></i>
                    <span>View Details</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">ICT Academy Coordinators</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Faculty members coordinating ICT Academy activities at DMI College
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-teal-600 font-semibold mb-2">{member.designation}</p>
                    <p className="text-gray-600">{member.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}