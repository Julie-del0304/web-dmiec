import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

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
  'Workshops & Seminars': {
    title: 'Workshops & Seminars',
    icon: 'ri-presentation-line',
    color: 'from-purple-500 to-indigo-500',
    overview: 'Regular sessions on business planning, market research, and startup fundamentals. These interactive sessions bring together industry experts, successful entrepreneurs, and aspiring business owners to share knowledge and experiences.',
    objectives: [
      'Learn business planning and market research methodologies',
      'Understand startup fundamentals and entrepreneurial mindset',
      'Gain insights from successful entrepreneurs and industry experts',
      'Develop practical skills for launching and managing ventures',
      'Network with like-minded aspiring entrepreneurs'
    ],
    highlights: [
      { label: 'Frequency', value: 'Monthly Sessions' },
      { label: 'Duration', value: '1-2 Days per Event' },
      { label: 'Speakers', value: 'Industry Experts & Entrepreneurs' },
      { label: 'Certificate', value: 'EDC Certified' }
    ],
    schedule: 'Workshops and seminars are conducted throughout the academic year. Event schedules are announced through the EDC portal and college notice boards.',
    eligibility: 'Open to all students and faculty members interested in entrepreneurship and innovation.'
  },
  'Mentorship Programs': {
    title: 'Mentorship Programs',
    icon: 'ri-user-voice-line',
    color: 'from-indigo-500 to-purple-500',
    overview: 'Connect with successful entrepreneurs and industry experts for guidance. Our mentorship program pairs aspiring entrepreneurs with experienced mentors who provide personalized advice, feedback, and support throughout their entrepreneurial journey.',
    objectives: [
      'Receive personalized guidance from experienced entrepreneurs',
      'Get feedback on business ideas and startup plans',
      'Build professional networks and connections',
      'Learn from real-world entrepreneurial experiences',
      'Develop strategic thinking and problem-solving skills'
    ],
    highlights: [
      { label: 'Mentors', value: '50+ Industry Experts' },
      { label: 'Duration', value: 'Ongoing Program' },
      { label: 'Format', value: 'One-on-One Sessions' },
      { label: 'Support', value: 'Continuous Guidance' }
    ],
    schedule: 'Mentorship sessions are scheduled based on mentor availability. Students can apply for mentorship throughout the academic year.',
    eligibility: 'Students with innovative business ideas or early-stage startups. Priority given to serious entrepreneurs.'
  },
  'Startup Competitions': {
    title: 'Startup Competitions',
    icon: 'ri-trophy-line',
    color: 'from-orange-500 to-red-500',
    overview: 'Participate in pitch competitions and business plan contests to showcase innovative ideas, win prizes, and gain recognition. These competitions provide a platform to test business concepts and receive valuable feedback from judges.',
    objectives: [
      'Develop and refine business pitch presentations',
      'Receive constructive feedback from expert judges',
      'Win cash prizes and incubation opportunities',
      'Network with investors and industry leaders',
      'Validate business concepts with real-world feedback'
    ],
    highlights: [
      { label: 'Frequency', value: 'Annual & Quarterly' },
      { label: 'Prizes', value: 'Cash Awards & Incubation' },
      { label: 'Categories', value: 'Idea Stage, Early Stage, Growth Stage' },
      { label: 'Judges', value: 'Investors & Industry Experts' }
    ],
    schedule: 'Startup competitions are held annually with quarterly preliminary rounds. Registration opens 2 months prior to the main event.',
    eligibility: 'Open to all students with innovative business ideas. Both individual and team entries are welcome.'
  },
  'Networking Events': {
    title: 'Networking Events',
    icon: 'ri-team-line',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Meet investors, industry leaders, and fellow entrepreneurs through organized networking events, meetups, and industry connect programs designed to build valuable professional relationships.',
    objectives: [
      'Build professional networks with industry leaders',
      'Connect with potential investors and partners',
      'Share ideas with fellow entrepreneurs',
      'Explore collaboration opportunities',
      'Learn from successful startup founders'
    ],
    highlights: [
      { label: 'Frequency', value: 'Quarterly Events' },
      { label: 'Participants', value: '100+ Professionals' },
      { label: 'Format', value: 'Meetups & Conferences' },
      { label: 'Outcome', value: 'Valuable Connections' }
    ],
    schedule: 'Networking events are organized quarterly. Special networking sessions are also held during major entrepreneurship events.',
    eligibility: 'Open to EDC members, student entrepreneurs, faculty, and invited industry professionals.'
  },
  'Funding Support': {
    title: 'Funding Support',
    icon: 'ri-funds-line',
    color: 'from-green-500 to-teal-500',
    overview: 'Assistance in securing seed funding and connecting with investors. EDC helps entrepreneurs prepare investment-ready pitches and facilitates connections with angel investors, venture capitalists, and government funding schemes.',
    objectives: [
      'Prepare investment-ready business plans and pitches',
      'Connect with angel investors and venture capitalists',
      'Access government startup funding schemes',
      'Understand investor expectations and requirements',
      'Develop financial models and projections'
    ],
    highlights: [
      { label: 'Investor Network', value: '20+ Angel Investors' },
      { label: 'Funding Options', value: 'Seed, Angel, Venture Capital' },
      { label: 'Support', value: 'Pitch Deck Preparation' },
      { label: 'Grants', value: 'Government Schemes Available' }
    ],
    schedule: 'Funding support is provided on an ongoing basis. Investment readiness programs are conducted quarterly.',
    eligibility: 'Startups with validated business models and traction. Priority given to registered ventures.'
  },
  'Incubation Support': {
    title: 'Incubation Support',
    icon: 'ri-building-line',
    color: 'from-teal-500 to-cyan-500',
    overview: 'Access to workspace, resources, and infrastructure for startups. Our incubation program provides physical space, technical resources, and business support services to help startups grow and scale.',
    objectives: [
      'Provide physical workspace and infrastructure',
      'Offer technical resources and equipment access',
      'Provide business development support',
      'Facilitate legal and compliance assistance',
      'Create a collaborative startup environment'
    ],
    highlights: [
      { label: 'Space', value: 'Co-working & Private Offices' },
      { label: 'Resources', value: 'Tech Lab, Meeting Rooms' },
      { label: 'Duration', value: '6-18 Months' },
      { label: 'Support', value: 'Legal, Admin, Technical' }
    ],
    schedule: 'Incubation applications are reviewed quarterly. Selected startups receive support for up to 18 months with periodic reviews.',
    eligibility: 'Early-stage startups with scalable business models. Preference given to student-led ventures and innovative technologies.'
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
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200"
          >
            <i className="ri-arrow-left-line text-lg"></i>
            <span>Back to Activities</span>
          </button>
          <i className="ri-arrow-right-s-line text-gray-400 mx-2"></i>
          <span className="text-purple-600 font-semibold">{detail.title}</span>
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
              <div key={i} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">{h.label}</p>
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
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-line text-xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Schedule</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{detail.schedule}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
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
            Contact the EDC coordinator at DMI College or visit the EDC portal to register.
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

// ─── PDF path — update this to your hosted URL once deployed ─────────────────
// Place the PDF in your /public folder as /pdfs/Entrepreneur.pdf
// or use a Supabase storage public URL
const ENTREPRENEUR_PDF_URL = '/pdfs/Entrepreneur.pdf';

// ─── Main EDC Page ────────────────────────────────────────────────────────────

export default function EDCPage() {
  const [activeTab, setActiveTab] = useState<'about' | 'objectives' | 'activities' | 'workshops' | 'success'>('about');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const activities = [
    {
      title: 'Workshops & Seminars',
      description: 'Regular sessions on business planning, market research, and startup fundamentals',
      icon: 'ri-presentation-line',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Mentorship Programs',
      description: 'Connect with successful entrepreneurs and industry experts for guidance',
      icon: 'ri-user-voice-line',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Startup Competitions',
      description: 'Participate in pitch competitions and business plan contests',
      icon: 'ri-trophy-line',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Networking Events',
      description: 'Meet investors, industry leaders, and fellow entrepreneurs',
      icon: 'ri-team-line',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Funding Support',
      description: 'Assistance in securing seed funding and connecting with investors',
      icon: 'ri-funds-line',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Incubation Support',
      description: 'Access to workspace, resources, and infrastructure for startups',
      icon: 'ri-building-line',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const workshopsData = [
    { year: '2022-2023', name: 'Seminar on "Interaction regarding innovation idea, Start UPS" (Entrepreneurship)', participants: 62, date: '19/10/2022' },
    { year: '2022-2023', name: 'Seminar on Business Startup Ideas (Entrepreneurship)', participants: 68, date: '29/8/2022' },
    { year: '2022-2023', name: 'Seminar on "How to tackle top small Business hiring Challenges" (Entrepreneurship)', participants: 24, date: '8/7/2022' },
    { year: '2021-2022', name: 'Seminar on Digital Marketing Strategies for Startups (Entrepreneurship)', participants: 57, date: '4/2/2022' },
    { year: '2021-2022', name: 'Seminar on World Entrepreneurs Ideas (Entrepreneurship)', participants: 62, date: '3/11/2021' },
    { year: '2021-2022', name: 'Webinar on How to become winner in life (Entrepreneurship)', participants: 26, date: '10/9/2021' },
    { year: '2020-2021', name: 'Webinar on "Internship Choices and Career" (Entrepreneurship)', participants: 29, date: '7/10/2020' },
    { year: '2020-2021', name: 'Webinar on Strategies for Winning in Mechanical Engineering (Entrepreneurship)', participants: 42, date: '10/9/2020' },
    { year: '2020-2021', name: 'Webinar on Employability skills for the future (Entrepreneurship)', participants: 49, date: '24/8/2020' },
    { year: '2020-2021', name: 'Webinar on creativity and innovations for Entrepreneurs (Entrepreneurship)', participants: 37, date: '17/7/2020' },
    { year: '2019-2020', name: 'Seminar on "Present Scenario of Entrepreneurship" (Entrepreneurship)', participants: 57, date: '12/2/2020' },
    { year: '2019-2020', name: 'Workshop on Mentoring Early stage Startups (Entrepreneurship)', participants: 58, date: '20/1/2020' },
    { year: '2019-2020', name: 'Workshop on Skill development program (Entrepreneurship)', participants: 48, date: '14/10/2019' },
    { year: '2018-2019', name: 'Seminar on Employability and Interview skills (Entrepreneurship)', participants: 58, date: '21/11/2018' },
    { year: '2018-2019', name: 'Seminar on How to become a successful Entrepreneur (Entrepreneurship)', participants: 87, date: '11/7/2018' }
  ];

  const successStories = [
    {
      startup: 'TechVenture Solutions',
      founder: 'Alumni 2020',
      description: 'AI-powered business analytics platform serving 50+ clients',
      achievement: 'Raised ₹2Cr seed funding'
    },
    {
      startup: 'EcoInnovate',
      founder: 'Alumni 2019',
      description: 'Sustainable packaging solutions for e-commerce',
      achievement: 'Revenue of ₹5Cr in Year 2'
    },
    {
      startup: 'EduTech Pro',
      founder: 'Alumni 2021',
      description: 'Online learning platform for skill development',
      achievement: '10,000+ active users'
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <Link to="/placement/cell" className="text-gray-600 hover:text-purple-600 transition-colors">Placement Cell</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">EDC Cell</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entrepreneurship Development Cell</h1>
          <p className="text-xl text-purple-50 max-w-3xl mx-auto">
            Fostering innovation, nurturing entrepreneurial spirit, and building future business leaders
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'about', label: 'About EDC', icon: 'ri-information-line' },
              { id: 'objectives', label: 'Objectives', icon: 'ri-target-line' },
              { id: 'activities', label: 'Activities', icon: 'ri-calendar-event-line' },
              { id: 'workshops', label: 'Workshops', icon: 'ri-presentation-line' },
              { id: 'success', label: 'Success Stories', icon: 'ri-rocket-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-purple-600'
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About EDC</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                The Entrepreneurship Development Cell (EDC) at DMI Engineering College is dedicated to cultivating an entrepreneurial mindset among students. We provide a platform for aspiring entrepreneurs to transform their innovative ideas into successful ventures.
              </p>
              <p className="mb-4">
                Through workshops, mentorship programs, networking events, and startup competitions, we empower students with the knowledge, skills, and resources needed to launch and grow their own businesses.
              </p>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 border border-purple-100">
              <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-lightbulb-flash-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To create a vibrant entrepreneurial ecosystem that inspires and enables students to become successful innovators and job creators, contributing to economic growth and social development.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-rocket-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide comprehensive support, mentorship, and resources to student entrepreneurs, fostering innovation and helping them transform their ideas into sustainable and impactful businesses.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Objectives Tab */}
      {activeTab === 'objectives' && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Objectives of EDC</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Core objectives guiding the Entrepreneurship Development Cell at DMI College
            </p>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                    <i className="ri-check-line text-2xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Promote Entrepreneurship & Innovation</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Promote the importance of Entrepreneurship and innovation as career opportunity and inculcate skillset required for a young graduate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                    <i className="ri-check-line text-2xl text-white"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Stimulate Entrepreneurial Lifecycle</h3>
                    <p className="text-gray-600 leading-relaxed">
                      To stimulate the overall architecture of the Entrepreneurship life cycle and how student can create innovative product by undertaking relevant methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Key Activities</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Regular activities and programs organized by EDC to foster entrepreneurship
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

      {/* Workshops Tab */}
      {activeTab === 'workshops' && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Workshops & Seminars Conducted</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Number of workshops, seminars, and conferences conducted on Research Methodology and Intellectual Property Rights (IPR) during 2018 to 2023
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Sl.No</th>
                    <th className="px-6 py-4 text-left font-semibold">Year</th>
                    <th className="px-6 py-4 text-left font-semibold">Name of the Workshop/Seminar/Conference</th>
                    <th className="px-6 py-4 text-center font-semibold">Participants</th>
                    <th className="px-6 py-4 text-center font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {workshopsData.map((workshop, index) => (
                    <tr key={index} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{workshop.year}</td>
                      <td className="px-6 py-4 text-gray-600">{workshop.name}</td>
                      <td className="px-6 py-4 text-gray-700 text-center">{workshop.participants}</td>
                      <td className="px-6 py-4 text-gray-600 text-center whitespace-nowrap">{workshop.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>Total Workshops Conducted: {workshopsData.length}</p>
              <p>Total Participants: {workshopsData.reduce((sum, w) => sum + w.participants, 0)}</p>
            </div>

            {/* ── Download Button ── */}
            <div className="mt-8 flex justify-center">
              <a
                href={ENTREPRENEUR_PDF_URL}
                download="Entrepreneur_Workshops_2018-2023.pdf"
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity duration-200 shadow-md"
              >
                <i className="ri-download-2-line text-lg"></i>
                <span>Download PDF</span>
              </a>
            </div>

          </div>
        </section>
      )}

      {/* Success Stories Tab */}
      {activeTab === 'success' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Success Stories</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Inspiring journeys of entrepreneurs who started their ventures at DMI College
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                    <i className="ri-rocket-2-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{story.startup}</h3>
                  <p className="text-purple-600 font-medium mb-3">{story.founder}</p>
                  <p className="text-gray-600 mb-4">{story.description}</p>
                  <div className="pt-4 border-t border-purple-200">
                    <p className="text-sm font-semibold text-gray-900">{story.achievement}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Entrepreneurial Journey?</h2>
              <p className="text-lg text-purple-50 mb-6 max-w-2xl mx-auto">
                Join EDC and turn your innovative ideas into successful ventures with our support and guidance
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors whitespace-nowrap">
                  Join EDC
                </button>
                <button className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors whitespace-nowrap border border-white/20">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}