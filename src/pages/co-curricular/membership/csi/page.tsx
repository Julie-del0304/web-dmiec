import { useState } from 'react';
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
  'Coding Competitions': {
    title: 'Coding Competitions',
    icon: 'ri-code-s-slash-line',
    color: 'from-green-500 to-teal-500',
    overview: 'Regular coding contests, hackathons, and programming challenges designed to sharpen problem-solving skills, algorithmic thinking, and coding proficiency. These competitions provide students with a platform to showcase their technical abilities and compete with peers nationwide.',
    objectives: [
      'Develop strong problem-solving and algorithmic thinking skills',
      'Enhance coding proficiency in multiple programming languages',
      'Prepare for technical interviews and coding assessments',
      'Participate in national and international coding competitions',
      'Build confidence in competitive programming environments'
    ],
    highlights: [
      { label: 'Frequency', value: 'Monthly Contests' },
      { label: 'Duration', value: '4-6 Hours per Contest' },
      { label: 'Platforms', value: 'CodeChef, HackerRank, LeetCode' },
      { label: 'Awards', value: 'Certificates & Prizes' }
    ],
    schedule: 'Coding competitions are conducted monthly. National-level competition registrations are announced through the CSI student chapter.',
    eligibility: 'Open to all students with programming knowledge. Separate categories for beginners and advanced participants.'
  },
  'Technical Workshops': {
    title: 'Technical Workshops',
    icon: 'ri-tools-line',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Hands-on workshops on web development, mobile apps, AI/ML, cloud computing, and other emerging technologies. These workshops provide practical exposure and help students build real-world projects under expert guidance.',
    objectives: [
      'Learn latest technologies through hands-on practice',
      'Build industry-relevant projects and portfolios',
      'Understand real-world applications of theoretical concepts',
      'Develop skills in demand by IT companies',
      'Receive practical training from industry experts'
    ],
    highlights: [
      { label: 'Topics', value: 'Web Dev, AI/ML, Cloud, Mobile Apps' },
      { label: 'Duration', value: '1-2 Days per Workshop' },
      { label: 'Mode', value: 'Hands-on with Projects' },
      { label: 'Certificate', value: 'CSI Workshop Certified' }
    ],
    schedule: 'Workshops are scheduled throughout the academic year. Topics are chosen based on current industry trends and student demand.',
    eligibility: 'All students from CSE, IT, and related branches. Prior basic knowledge recommended for advanced workshops.'
  },
  'Guest Lectures': {
    title: 'Guest Lectures',
    icon: 'ri-presentation-line',
    color: 'from-purple-500 to-pink-500',
    overview: 'Industry experts and researchers share insights on latest technologies, career opportunities, and emerging trends in the IT industry. These lectures provide valuable exposure to real-world industry practices and future career pathways.',
    objectives: [
      'Gain insights from experienced industry professionals',
      'Learn about emerging technologies and trends',
      'Understand industry expectations and career opportunities',
      'Network with professionals and researchers',
      'Get guidance on career planning and skill development'
    ],
    highlights: [
      { label: 'Speakers', value: 'Industry Experts & Researchers' },
      { label: 'Frequency', value: 'Bi-monthly Sessions' },
      { label: 'Topics', value: 'Emerging Technologies & Trends' },
      { label: 'Mode', value: 'Online & Offline' }
    ],
    schedule: 'Guest lectures are organized every 2-3 months. Dates are announced through the CSI student chapter and department notice boards.',
    eligibility: 'Open to all students and faculty members interested in technology and career development.'
  },
  'Project Exhibitions': {
    title: 'Project Exhibitions',
    icon: 'ri-lightbulb-line',
    color: 'from-orange-500 to-red-500',
    overview: 'Showcase innovative student projects and research work. These exhibitions provide a platform for students to present their creative solutions, get feedback from experts, and connect with potential collaborators and industry partners.',
    objectives: [
      'Showcase innovative projects and research work',
      'Receive feedback from faculty and industry experts',
      'Develop presentation and communication skills',
      'Identify potential research opportunities',
      'Build collaboration networks with peers and professionals'
    ],
    highlights: [
      { label: 'Frequency', value: 'Annual Exhibition' },
      { label: 'Categories', value: 'Hardware, Software, Research' },
      { label: 'Awards', value: 'Best Project Recognition' },
      { label: 'Judges', value: 'Industry Experts & Faculty' }
    ],
    schedule: 'Annual project exhibition is conducted at the end of each academic year. Project submissions open 2 months prior to the event.',
    eligibility: 'All students with completed projects. Individual and team projects are encouraged.'
  },
  'Study Circles': {
    title: 'Study Circles',
    icon: 'ri-group-line',
    color: 'from-indigo-500 to-purple-500',
    overview: 'Regular study groups on programming languages, algorithms, data structures, and other computer science topics. These peer-learning sessions foster collaborative learning, knowledge sharing, and mentorship among students.',
    objectives: [
      'Foster collaborative learning and peer mentoring',
      'Master core computer science concepts',
      'Practice coding problems and algorithmic challenges',
      'Prepare for technical interviews and examinations',
      'Build strong fundamentals in key technology areas'
    ],
    highlights: [
      { label: 'Topics', value: 'DSA, Python, Java, Web Dev, Databases' },
      { label: 'Frequency', value: 'Weekly Sessions' },
      { label: 'Format', value: 'Peer-led Discussions' },
      { label: 'Resources', value: 'Study Materials & Practice Problems' }
    ],
    schedule: 'Weekly study circle sessions are held every Saturday. Specific timings are shared with registered members.',
    eligibility: 'All students interested in improving their technical skills. Open to all branches and year levels.'
  },
  'Industry Visits': {
    title: 'Industry Visits',
    icon: 'ri-building-line',
    color: 'from-teal-500 to-cyan-500',
    overview: 'Visits to IT companies, tech parks, and development centers for real-world exposure. These visits help students understand corporate culture, working environments, and the practical application of their academic knowledge.',
    objectives: [
      'Experience real IT industry environments',
      'Understand corporate culture and work practices',
      'Interact with IT professionals and engineers',
      'Observe live projects and development processes',
      'Connect classroom learning with industry applications'
    ],
    highlights: [
      { label: 'Destinations', value: 'IT Parks, MNCs, Startups, Tech Hubs' },
      { label: 'Frequency', value: '2-3 Visits per Year' },
      { label: 'Duration', value: 'Full Day Visits' },
      { label: 'Outcome', value: 'Visit Report & Certificate' }
    ],
    schedule: 'Industry visits are planned twice per academic year. Prior registration is required due to limited slots.',
    eligibility: 'Students from second year onwards. Preference given to CSI student members.'
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
            className="flex items-center space-x-2 text-green-600 hover:text-green-800 font-semibold transition-colors duration-200"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            <span>Back to Activities</span>
          </button>
          <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
          <span className="text-green-600 font-semibold">{detail.title}</span>
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
              <div key={i} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100">
                <p className="text-xs font-bold uppercase tracking-widest text-green-500 mb-2">{h.label}</p>
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
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-line text-xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Schedule</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{detail.schedule}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
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
            Contact the CSI coordinator at DMI College or visit the CSI student chapter to register.
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

// ─── Main CSI Page ────────────────────────────────────────────────────────────

export default function CSIPage() {
  const [activeTab, setActiveTab] = useState<'about' | 'benefits' | 'activities' | 'team'>('about');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Co-Curricular', path: '#' },
    { label: 'Membership', path: '#' },
    { label: 'CSI', path: '/co-curricular/membership/csi' }
  ];

  const benefits = [
    {
      icon: 'ri-code-box-line',
      title: 'Technical Expertise',
      description: 'Access to latest developments in computer science and information technology.'
    },
    {
      icon: 'ri-team-line',
      title: 'Networking Opportunities',
      description: 'Connect with IT professionals, researchers, and industry experts nationwide.'
    },
    {
      icon: 'ri-book-open-line',
      title: 'Knowledge Resources',
      description: 'Access to CSI journals, magazines, and technical publications.'
    },
    {
      icon: 'ri-trophy-line',
      title: 'Competitions & Events',
      description: 'Participate in national-level coding competitions and technical events.'
    },
    {
      icon: 'ri-award-line',
      title: 'Certifications',
      description: 'Industry-recognized certifications in various IT domains.'
    },
    {
      icon: 'ri-presentation-line',
      title: 'Conferences & Seminars',
      description: 'Attend national and regional conferences on emerging technologies.'
    }
  ];

  const activities = [
    {
      title: 'Coding Competitions',
      description: 'Regular coding contests, hackathons, and programming challenges for students.',
      icon: 'ri-code-s-slash-line',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Technical Workshops',
      description: 'Hands-on workshops on web development, mobile apps, AI/ML, and cloud computing.',
      icon: 'ri-tools-line',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Guest Lectures',
      description: 'Industry experts and researchers sharing insights on latest technologies.',
      icon: 'ri-presentation-line',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Project Exhibitions',
      description: 'Showcase innovative student projects and research work.',
      icon: 'ri-lightbulb-line',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Study Circles',
      description: 'Regular study groups on programming languages, algorithms, and data structures.',
      icon: 'ri-group-line',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Industry Visits',
      description: 'Visits to IT companies and tech parks for real-world exposure.',
      icon: 'ri-building-line',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const team = [
    {
      name: 'Dr. CSI Coordinator',
      designation: 'CSI Chapter Coordinator',
      department: 'Computer Science & Engineering',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20professor%20in%20formal%20attire%20standing%20confidently%20in%20modern%20computer%20lab%20clean%20background%20portrait%20style%20technology%20department&width=400&height=500&seq=csi-coord-001&orientation=portrait'
    },
    {
      name: 'Prof. Student Chapter Advisor',
      designation: 'CSI Student Chapter Advisor',
      department: 'Information Technology',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20in%20formal%20attire%20standing%20confidently%20in%20modern%20computer%20lab%20clean%20background%20portrait%20style%20technology%20department&width=400&height=500&seq=csi-coord-002&orientation=portrait'
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
                      ? 'text-green-600 font-semibold'
                      : 'text-gray-600 hover:text-green-600'
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
      <div className="relative bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <i className="ri-code-box-line text-6xl"></i>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">
            CSI Membership
          </h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Computer Society of India - Empowering IT Professionals and Students
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'about', label: 'About CSI', icon: 'ri-information-line' },
              { id: 'benefits', label: 'Benefits', icon: 'ri-star-line' },
              { id: 'activities', label: 'Activities', icon: 'ri-calendar-event-line' },
              { id: 'team', label: 'Coordinators', icon: 'ri-team-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-green-600'
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
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About CSI</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                The Computer Society of India (CSI) is the first and largest professional body of computer 
                professionals in India, established in 1965. CSI has been instrumental in guiding the Indian 
                IT industry over the past five decades and has significantly contributed to the growth of 
                IT education and research in the country.
              </p>
              <p>
                DMI Engineering College hosts an active CSI student chapter that provides a platform for 
                students to enhance their technical skills, participate in national-level competitions, and 
                network with IT professionals. Our CSI chapter regularly organizes coding competitions, 
                technical workshops, and guest lectures by industry experts.
              </p>
              <p>
                Through CSI membership, students gain access to a wealth of resources including technical 
                journals, online courses, certification programs, and networking opportunities with over 
                100,000 CSI members across India. The chapter also facilitates participation in CSI's 
                national-level events and competitions.
              </p>
            </div>

            {/* Major Objectives of CSI Section */}
            <div className="mt-12 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Major Objectives of CSI</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <i className="ri-check-line text-lg text-white"></i>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Providing quality training programmes to teachers and administrators of technical institutions 
                    to update their knowledge and skills in their fields of activity.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <i className="ri-check-line text-lg text-white"></i>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    To assist and contribute in the production and development of top-quality professional engineers 
                    and technicians needed by the industry and other organisations.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <i className="ri-check-line text-lg text-white"></i>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Providing guidance and training to students to develop better learning skills and personality.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">CSI Chapter Highlights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Active Student Chapter</h4>
                    <p className="text-white/90 text-sm">300+ student members actively participating</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Regular Events</h4>
                    <p className="text-white/90 text-sm">Monthly technical events and workshops</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">National Participation</h4>
                    <p className="text-white/90 text-sm">Students participate in CSI national events</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Industry Connect</h4>
                    <p className="text-white/90 text-sm">Regular interaction with IT industry professionals</p>
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
              Advantages of CSI membership for students and faculty
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">CSI Chapter Activities</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Regular activities and programs organized by CSI student chapter
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">CSI Chapter Coordinators</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Faculty members coordinating CSI activities at DMI College
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-green-100 to-teal-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-green-600 font-semibold mb-2">{member.designation}</p>
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