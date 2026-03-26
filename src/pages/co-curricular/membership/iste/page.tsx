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
  'National Conventions': {
    title: 'National Conventions',
    icon: 'ri-presentation-line',
    color: 'from-orange-500 to-red-500',
    overview: 'Annual national conventions bringing together educators, researchers, and industry experts from across the country. These conventions serve as a platform for knowledge exchange, networking, and discussing the future of technical education in India.',
    objectives: [
      'Bring together technical education professionals from across India',
      'Facilitate knowledge sharing and best practices in technical education',
      'Discuss emerging trends and challenges in engineering education',
      'Create networking opportunities for faculty and researchers',
      'Showcase innovative teaching methodologies and research outcomes'
    ],
    highlights: [
      { label: 'Frequency', value: 'Annual Convention' },
      { label: 'Duration', value: '2-3 Days' },
      { label: 'Participants', value: '500+ Delegates Nationwide' },
      { label: 'Certificate', value: 'ISTE Certified' }
    ],
    schedule: 'National conventions are held annually during December-January. DMI College faculty and students are encouraged to participate and present research papers.',
    eligibility: 'Open to ISTE members, faculty members, researchers, and students from DMI College. Priority given to those with research contributions.'
  },
  'Faculty Development Programs': {
    title: 'Faculty Development Programs',
    icon: 'ri-user-star-line',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Regular Faculty Development Programs (FDPs) on emerging technologies, pedagogy, and research methodologies. These programs ensure that faculty members stay updated with the latest developments in their fields and adopt innovative teaching practices.',
    objectives: [
      'Update faculty knowledge on emerging technologies and industry practices',
      'Develop effective teaching methodologies for technical subjects',
      'Enable faculty to design industry-aligned course content',
      'Foster a culture of continuous learning and research within the department',
      'Enhance research capabilities and publication skills'
    ],
    highlights: [
      { label: 'Format', value: 'Residential & Online FDPs' },
      { label: 'Duration', value: '3-5 Days per Program' },
      { label: 'Topics', value: 'AI, IoT, Data Science, Pedagogy, Research' },
      { label: 'Certification', value: 'ISTE FDP Certificate' }
    ],
    schedule: 'FDPs are scheduled during semester breaks and vacation periods to minimize class disruptions. Multiple programs conducted throughout the academic year.',
    eligibility: 'All teaching faculty of DMI College. Encouraged for faculty handling core engineering subjects.'
  },
  'Technical Workshops': {
    title: 'Technical Workshops',
    icon: 'ri-tools-line',
    color: 'from-purple-500 to-pink-500',
    overview: 'Hands-on workshops on latest tools, technologies, and industry practices. These workshops bridge the gap between theoretical knowledge and practical application, equipping students with industry-relevant skills.',
    objectives: [
      'Provide hands-on experience with latest tools and technologies',
      'Bridge the gap between academic knowledge and industry requirements',
      'Develop practical problem-solving skills',
      'Enhance employability through skill development',
      'Encourage innovation and project-based learning'
    ],
    highlights: [
      { label: 'Frequency', value: 'Monthly Workshops' },
      { label: 'Duration', value: '1-2 Days per Workshop' },
      { label: 'Mode', value: 'On-campus & Hands-on' },
      { label: 'Certificate', value: 'ISTE Workshop Certificate' }
    ],
    schedule: 'Workshops are announced at the start of each semester. Watch the college notice board and ISTE portal for upcoming dates.',
    eligibility: 'Open to all engineering students of DMI College. Priority registration for final-year students.'
  },
  'Student Chapters': {
    title: 'Student Chapters',
    icon: 'ri-group-line',
    color: 'from-green-500 to-teal-500',
    overview: 'Active student chapters organizing technical events, seminars, and competitions. These chapters provide students with leadership opportunities and a platform to showcase their technical skills.',
    objectives: [
      'Develop leadership and organizational skills among students',
      'Organize technical events and competitions',
      'Foster teamwork and collaboration',
      'Create a platform for student innovation',
      'Bridge the gap between students and industry professionals'
    ],
    highlights: [
      { label: 'Members', value: '200+ Active Student Members' },
      { label: 'Events', value: '10+ Events per Year' },
      { label: 'Leadership', value: 'Student Executive Committee' },
      { label: 'Activities', value: 'Technical, Cultural, Social' }
    ],
    schedule: 'Student chapter activities are conducted throughout the academic year. Monthly meetings and events are planned by the student executive committee.',
    eligibility: 'All students enrolled at DMI College can become ISTE student members. Active participation encouraged.'
  },
  'Research Publications': {
    title: 'Research Publications',
    icon: 'ri-file-text-line',
    color: 'from-indigo-500 to-purple-500',
    overview: 'Support for publishing research papers in ISTE journals and conferences. ISTE provides a platform for researchers to publish their work in reputed journals and present at national and international conferences.',
    objectives: [
      'Encourage research culture among faculty and students',
      'Provide guidance for quality research publications',
      'Facilitate conference participation and presentations',
      'Enhance research visibility and impact',
      'Build research collaborations with other institutions'
    ],
    highlights: [
      { label: 'Journals', value: 'ISTE International Journal' },
      { label: 'Conferences', value: 'National & International' },
      { label: 'Support', value: 'Publication Guidance' },
      { label: 'Recognition', value: 'Best Paper Awards' }
    ],
    schedule: 'Call for papers is announced throughout the year. Faculty and students are encouraged to submit research work to ISTE journals and conferences.',
    eligibility: 'Open to faculty members and research scholars. Students with quality research work are also encouraged to participate.'
  },
  'Industry Visits': {
    title: 'Industry Visits',
    icon: 'ri-building-line',
    color: 'from-teal-500 to-cyan-500',
    overview: 'Organized industrial visits and internships for students and faculty. These visits provide real-world exposure to industrial environments, processes, and practices, enhancing understanding of industry requirements.',
    objectives: [
      'Provide exposure to real industrial environments',
      'Understand industry processes and best practices',
      'Interact with industry professionals and experts',
      'Identify industry-relevant research problems',
      'Enhance industry-academia collaboration'
    ],
    highlights: [
      { label: 'Destinations', value: 'Manufacturing Units, IT Parks, R&D Centers' },
      { label: 'Frequency', value: '2-3 Visits per Year' },
      { label: 'Duration', value: 'Full Day Visits' },
      { label: 'Documentation', value: 'Visit Report & Certificate' }
    ],
    schedule: 'Industry visits are planned at least twice per academic year. Specific dates are shared with students and faculty well in advance.',
    eligibility: 'Students from second year onwards. Faculty members are encouraged to accompany and facilitate visits.'
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
            className="flex items-center space-x-2 text-orange-600 hover:text-orange-800 font-semibold transition-colors duration-200"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            <span>Back to Activities</span>
          </button>
          <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
          <span className="text-orange-600 font-semibold">{detail.title}</span>
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
              <div key={i} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">{h.label}</p>
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
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-line text-xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Schedule</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{detail.schedule}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
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
            Contact the ISTE coordinator at DMI College or visit the ISTE portal to register.
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

// ─── Main ISTE Page ────────────────────────────────────────────────────────────

export default function ISTEPage() {
  const [activeTab, setActiveTab] = useState<'about' | 'objectives' | 'activities' | 'team'>('about');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Co-Curricular', path: '#' },
    { label: 'Membership', path: '#' },
    { label: 'ISTE', path: '/co-curricular/membership/iste' }
  ];

  const objectives = [
    {
      icon: 'ri-lightbulb-line',
      title: 'Promote Technical Education',
      description: 'Advance the cause of technical education and promote excellence in teaching and research.'
    },
    {
      icon: 'ri-team-line',
      title: 'Professional Development',
      description: 'Provide opportunities for professional development of teachers and researchers.'
    },
    {
      icon: 'ri-book-open-line',
      title: 'Knowledge Sharing',
      description: 'Facilitate exchange of ideas and experiences among technical education community.'
    },
    {
      icon: 'ri-global-line',
      title: 'Industry Collaboration',
      description: 'Foster collaboration between academia and industry for mutual benefit.'
    },
    {
      icon: 'ri-award-line',
      title: 'Recognition & Awards',
      description: 'Recognize and reward excellence in technical education and research.'
    },
    {
      icon: 'ri-graduation-cap-line',
      title: 'Student Development',
      description: 'Encourage student participation in technical activities and competitions.'
    }
  ];

  const activities = [
    {
      title: 'National Conventions',
      description: 'Annual national conventions bringing together educators, researchers, and industry experts.',
      icon: 'ri-presentation-line',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Faculty Development Programs',
      description: 'Regular FDPs on emerging technologies, pedagogy, and research methodologies.',
      icon: 'ri-user-star-line',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Technical Workshops',
      description: 'Hands-on workshops on latest tools, technologies, and industry practices.',
      icon: 'ri-tools-line',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Student Chapters',
      description: 'Active student chapters organizing technical events, seminars, and competitions.',
      icon: 'ri-group-line',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Research Publications',
      description: 'Support for publishing research papers in ISTE journals and conferences.',
      icon: 'ri-file-text-line',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Industry Visits',
      description: 'Organized industrial visits and internships for students and faculty.',
      icon: 'ri-building-line',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const team = [
    {
      name: 'Dr. ISTE Coordinator',
      designation: 'ISTE Chapter Coordinator',
      department: 'Mechanical Engineering',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20professor%20in%20formal%20attire%20standing%20confidently%20in%20modern%20academic%20office%20clean%20background%20portrait%20style%20engineering%20department&width=400&height=500&seq=iste-coord-001&orientation=portrait'
    },
    {
      name: 'Prof. Student Chapter Advisor',
      designation: 'ISTE Student Chapter Advisor',
      department: 'Electronics & Communication',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20in%20formal%20attire%20standing%20confidently%20in%20modern%20academic%20office%20clean%20background%20portrait%20style%20engineering%20department&width=400&height=500&seq=iste-coord-002&orientation=portrait'
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
                      ? 'text-orange-600 font-semibold'
                      : 'text-gray-600 hover:text-orange-600'
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
      <div className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <i className="ri-graduation-cap-line text-6xl"></i>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">
            ISTE Membership
          </h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Indian Society for Technical Education - Advancing Technical Education Excellence
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'about', label: 'About ISTE', icon: 'ri-information-line' },
              { id: 'objectives', label: 'Objectives', icon: 'ri-target-line' },
              { id: 'activities', label: 'Activities', icon: 'ri-calendar-event-line' },
              { id: 'team', label: 'Coordinators', icon: 'ri-team-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-orange-600'
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
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About ISTE</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                The Indian Society for Technical Education (ISTE) is a leading national professional society 
                devoted to the cause of education in Engineering, Technology, Architecture, Town Planning, and 
                Management. Established in 1941, ISTE has been working towards improving technical education 
                in India for over eight decades.
              </p>
              <p>
                DMI Engineering College is an institutional member of ISTE, providing our faculty and students 
                access to a vast network of technical education professionals, research opportunities, and 
                professional development programs. Our ISTE chapter actively organizes seminars, workshops, 
                and technical events throughout the academic year.
              </p>
              <p>
                Through ISTE membership, our faculty members gain access to quality journals, conferences, 
                and faculty development programs. Students benefit from participation in national-level 
                competitions, technical events, and networking opportunities with peers from across the country.
              </p>
            </div>

            {/* Major Objectives Section */}
            <div className="mt-12 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Major Objectives of ISTE</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <i className="ri-check-line text-lg text-white"></i>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Providing quality training programmes to teachers and administrators of technical institutions 
                    to update their knowledge and skills in their fields of activity.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <i className="ri-check-line text-lg text-white"></i>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    To assist and contribute in the production and development of top-quality professional engineers 
                    and technicians needed by the industry and other organisations.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <i className="ri-check-line text-lg text-white"></i>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Providing guidance and training to students to develop better learning skills and personality.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">ISTE at DMI</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Institutional Membership</h4>
                    <p className="text-white/90 text-sm">Active ISTE chapter since college establishment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Faculty Members</h4>
                    <p className="text-white/90 text-sm">50+ faculty members with individual ISTE membership</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Student Chapter</h4>
                    <p className="text-white/90 text-sm">Active student chapter with 200+ members</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-check-line text-xl text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Annual Events</h4>
                    <p className="text-white/90 text-sm">Regular technical events, workshops, and seminars</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Objectives Tab */}
      {activeTab === 'objectives' && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">ISTE Objectives</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Core objectives of ISTE membership and activities at DMI College
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {objectives.map((objective, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                    <i className={`${objective.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{objective.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{objective.description}</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">ISTE Activities</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Regular activities and programs conducted by ISTE chapter at DMI College
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">ISTE Coordinators</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Faculty members coordinating ISTE activities at DMI College
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-orange-600 font-semibold mb-2">{member.designation}</p>
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