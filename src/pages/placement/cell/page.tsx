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
  'Strategic Industry Placements': {
    title: 'Strategic Industry Placements',
    icon: 'ri-briefcase-line',
    color: 'from-teal-500 to-emerald-500',
    overview: 'We facilitate campus, pooled campus, and off-campus recruitments, connecting students with leading industries. Our placement drives bring top companies to campus, providing students with direct opportunities to launch their careers.',
    objectives: [
      'Connect students with leading companies across various sectors',
      'Organize campus and pooled campus recruitment drives',
      'Facilitate off-campus placement opportunities',
      'Build strong relationships with industry partners',
      'Ensure high placement success rates for students'
    ],
    highlights: [
      { label: 'Companies', value: '100+ Recruiters' },
      { label: 'Mode', value: 'Campus & Off-Campus' },
      { label: 'Sectors', value: 'IT, Core, Banking, Consulting' },
      { label: 'Success Rate', value: '90%+ Placement' }
    ],
    schedule: 'Placement drives are conducted throughout the academic year, with peak season from August to March.',
    eligibility: 'Final-year students across all engineering branches. Eligible candidates based on academic criteria specified by recruiters.'
  },
  'Immersive Inplant Training': {
    title: 'Immersive Inplant Training',
    icon: 'ri-tools-line',
    color: 'from-blue-500 to-cyan-500',
    overview: 'Our summer and winter inplant training programs provide students with invaluable hands-on industry experience. These immersive programs allow students to work on real projects under the guidance of industry professionals.',
    objectives: [
      'Provide hands-on industry experience during summer and winter breaks',
      'Expose students to real-world work environments',
      'Develop practical skills through guided training',
      'Build industry connections and networks',
      'Enhance employability through practical exposure'
    ],
    highlights: [
      { label: 'Duration', value: '2-6 Weeks' },
      { label: 'Seasons', value: 'Summer & Winter' },
      { label: 'Sectors', value: 'IT, Manufacturing, R&D' },
      { label: 'Certificate', value: 'Industry Certified' }
    ],
    schedule: 'Summer training: April-June | Winter training: November-December. Registrations open 2 months prior.',
    eligibility: 'Second and third-year students. Priority given to students with good academic standing.'
  },
  'Real-World Projects': {
    title: 'Real-World Projects',
    icon: 'ri-code-box-line',
    color: 'from-purple-500 to-pink-500',
    overview: 'We assist final-year students in securing project work placements within industries, bridging the gap between theory and practice. Students work on industry-defined problems and gain exposure to professional development practices.',
    objectives: [
      'Secure industry project placements for final-year students',
      'Bridge academic knowledge with industry requirements',
      'Develop practical problem-solving skills',
      'Build portfolios with real-world projects',
      'Facilitate mentorship from industry experts'
    ],
    highlights: [
      { label: 'Duration', value: '6-12 Months' },
      { label: 'Mode', value: 'In-Industry & In-College' },
      { label: 'Projects', value: 'Industry-Defined Problems' },
      { label: 'Outcome', value: 'Final Year Project' }
    ],
    schedule: 'Project placements are facilitated at the beginning of the final academic year. Industry partnerships established throughout the year.',
    eligibility: 'Final-year students across all departments. Selection based on academic performance and skill assessment.'
  },
  'Continuous Industry Interaction': {
    title: 'Continuous Industry Interaction',
    icon: 'ri-handshake-line',
    color: 'from-orange-500 to-red-500',
    overview: 'We maintain dynamic interactions with industries to stay attuned to evolving trends and requirements. Regular interactions include guest lectures, industry visits, and collaborative events that keep students updated on industry developments.',
    objectives: [
      'Maintain strong industry partnerships and relationships',
      'Stay updated on evolving industry trends and requirements',
      'Organize regular industry interaction events',
      'Bring industry expertise to campus through guest lectures',
      'Align curriculum with industry needs'
    ],
    highlights: [
      { label: 'Events', value: 'Guest Lectures, Seminars, Webinars' },
      { label: 'Frequency', value: 'Monthly Sessions' },
      { label: 'Speakers', value: 'Industry Leaders & HR Professionals' },
      { label: 'Outcome', value: 'Industry-Aligned Skills' }
    ],
    schedule: 'Industry interaction events are conducted monthly throughout the academic year.',
    eligibility: 'All students across all years are encouraged to participate.'
  },
  'Active Alumni Network': {
    title: 'Active Alumni Network',
    icon: 'ri-user-star-line',
    color: 'from-green-500 to-teal-500',
    overview: 'Our alumni activities foster a supportive network, guiding and inspiring current students. Alumni mentors share their professional experiences, provide career guidance, and help students navigate their career paths.',
    objectives: [
      'Build a strong and engaged alumni community',
      'Facilitate alumni mentorship for current students',
      'Organize alumni interaction sessions and events',
      'Leverage alumni networks for placement opportunities',
      'Celebrate alumni achievements and success stories'
    ],
    highlights: [
      { label: 'Members', value: '5000+ Alumni' },
      { label: 'Events', value: 'Alumni Meets, Mentorship Programs' },
      { label: 'Impact', value: 'Referrals & Placement Support' },
      { label: 'Network', value: 'Global Alumni Community' }
    ],
    schedule: 'Annual alumni meet and quarterly mentorship sessions. Alumni engagement activities throughout the year.',
    eligibility: 'All students benefit from alumni connections. Students can register for mentorship programs.'
  },
  'Industrial Engagements': {
    title: 'Industrial Engagements',
    icon: 'ri-building-2-line',
    color: 'from-indigo-500 to-purple-500',
    overview: 'By participating in exhibitions, fairs, and seminars, we promote meaningful industry interactions. These engagements provide students with exposure to industry practices and opportunities to showcase their talents.',
    objectives: [
      'Participate in industry exhibitions and fairs',
      'Promote student talent to potential employers',
      'Build institutional visibility in industry circles',
      'Create networking opportunities for students',
      'Showcase innovative student projects'
    ],
    highlights: [
      { label: 'Events', value: 'Exhibitions, Fairs, Conferences' },
      { label: 'Participation', value: 'Student & Faculty' },
      { label: 'Outcome', value: 'Industry Recognition' },
      { label: 'Networks', value: 'Corporate Connections' }
    ],
    schedule: 'Participation in industry events is planned throughout the year based on opportunities.',
    eligibility: 'Selected students with innovative projects and strong academic records.'
  },
  'Comprehensive Career Counseling': {
    title: 'Comprehensive Career Counseling',
    icon: 'ri-chat-smile-line',
    color: 'from-rose-500 to-pink-500',
    overview: 'We offer personalized counseling on job opportunities and career pathways. Career counselors work one-on-one with students to understand their aspirations and guide them toward suitable career options.',
    objectives: [
      'Provide personalized career guidance and counseling',
      'Help students identify suitable career paths',
      'Assess student strengths and areas for development',
      'Guide students on skill enhancement strategies',
      'Support students in making informed career decisions'
    ],
    highlights: [
      { label: 'Counselors', value: 'Experienced Career Experts' },
      { label: 'Sessions', value: 'One-on-One & Group' },
      { label: 'Coverage', value: 'Career Options, Industry Insights' },
      { label: 'Outcome', value: 'Career Clarity & Direction' }
    ],
    schedule: 'Counseling sessions are available throughout the academic year by appointment.',
    eligibility: 'All students from first to final year can avail counseling services.'
  },
  'Guidance for Higher Studies': {
    title: 'Guidance for Higher Studies',
    icon: 'ri-graduation-cap-line',
    color: 'from-cyan-500 to-blue-500',
    overview: 'We provide expert guidance for exams like GATE, IES, GRE, and beyond. Students receive coaching, study materials, and mentorship to prepare for competitive examinations and pursue higher education opportunities.',
    objectives: [
      'Prepare students for competitive examinations (GATE, IES, GRE, etc.)',
      'Provide expert coaching and study materials',
      'Guide students on higher education options',
      'Facilitate university admissions support',
      'Connect students with scholarship opportunities'
    ],
    highlights: [
      { label: 'Exams', value: 'GATE, IES, GRE, GMAT, CAT' },
      { label: 'Support', value: 'Coaching, Materials, Mentorship' },
      { label: 'Universities', value: 'IITs, NITs, Global Universities' },
      { label: 'Outcome', value: 'Higher Education Success' }
    ],
    schedule: 'Coaching sessions and guidance programs run throughout the academic year.',
    eligibility: 'Students aspiring for higher education. Priority for third and final-year students.'
  },
  'Insightful Industry Visits': {
    title: 'Insightful Industry Visits',
    icon: 'ri-building-line',
    color: 'from-yellow-500 to-orange-500',
    overview: 'We organize industry visits to give students practical insights and exposure. These visits allow students to observe real work environments, interact with professionals, and understand industry operations firsthand.',
    objectives: [
      'Provide real-world exposure through industry visits',
      'Observe professional work environments and practices',
      'Interact with industry professionals and engineers',
      'Understand industry operations and workflows',
      'Connect academic learning with practical applications'
    ],
    highlights: [
      { label: 'Destinations', value: 'IT Parks, Manufacturing Units, R&D Centers' },
      { label: 'Frequency', value: '2-3 Visits per Year' },
      { label: 'Duration', value: 'Full Day Visits' },
      { label: 'Outcome', value: 'Practical Exposure & Learning' }
    ],
    schedule: 'Industry visits are planned at least twice per academic year. Specific dates shared with students in advance.',
    eligibility: 'Students from second year onwards. Preference given to students with good academic standing.'
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
              <div key={i} className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100">
                <p className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-2">{h.label}</p>
                <p className="text-gray-800 font-semibold text-sm leading-relaxed">{h.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Program Objectives</h2>
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
            Contact the Placement Cell at DMI College or visit the Training & Placement Office for more information.
          </p>
          <button
            onClick={onBack}
            className="bg-white text-gray-800 font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            ← Back to Activities
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Main Placement Cell Page ─────────────────────────────────────────────────

export default function PlacementCellPage() {
  const [activeTab, setActiveTab] = useState<'about' | 'training' | 'activities' | 'yearplan'>('about');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const empoweringActivities = [
    {
      title: 'Strategic Industry Placements',
      description: 'We facilitate campus, pooled campus, and off-campus recruitments, connecting students with leading industries',
      icon: 'ri-briefcase-line',
      color: 'from-teal-500 to-emerald-500'
    },
    {
      title: 'Immersive Inplant Training',
      description: 'Our summer and winter inplant training programs provide students with invaluable hands-on industry experience',
      icon: 'ri-tools-line',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Real-World Projects',
      description: 'We assist final-year students in securing project work placements within industries, bridging the gap between theory and practice',
      icon: 'ri-code-box-line',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Continuous Industry Interaction',
      description: 'We maintain dynamic interactions with industries to stay attuned to evolving trends and requirements',
      icon: 'ri-handshake-line',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Active Alumni Network',
      description: 'Our alumni activities foster a supportive network, guiding and inspiring current students',
      icon: 'ri-user-star-line',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Industrial Engagements',
      description: 'By participating in exhibitions, fairs, and seminars, we promote meaningful industry interactions',
      icon: 'ri-building-2-line',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Comprehensive Career Counseling',
      description: 'We offer personalized counseling on job opportunities and career pathways',
      icon: 'ri-chat-smile-line',
      color: 'from-rose-500 to-pink-500'
    },
    {
      title: 'Guidance for Higher Studies',
      description: 'We provide expert guidance for exams like GATE, IES, GRE, and beyond',
      icon: 'ri-graduation-cap-line',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Insightful Industry Visits',
      description: 'We organize industry visits to give students practical insights and exposure',
      icon: 'ri-building-line',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const trainingPrograms = [
    {
      title: 'Life Planning',
      items: ['Goal Setting', 'Career Path Identification', 'Personal Development Planning', 'Work-Life Balance', 'Professional Growth Strategies']
    },
    {
      title: 'Soft Skills',
      items: ['Communication Skills', 'Presentation Skills', 'Team Building', 'Leadership Development', 'Professional Etiquette', 'Emotional Intelligence']
    },
    {
      title: 'Aptitude Training',
      items: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Analytical Skills', 'Problem Solving', 'Data Interpretation']
    },
    {
      title: 'Technical Skills',
      items: ['Programming Languages', 'Data Structures & Algorithms', 'Database Management', 'Web Technologies', 'Cloud Computing', 'AI & Machine Learning']
    },
    {
      title: 'Resume & Interview',
      items: ['Resume Writing', 'Mock Interviews', 'Group Discussions', 'HR Interview Preparation', 'Technical Interview Tips', 'Corporate Communication']
    }
  ];

  const yearPlanSteps = [
    { year: 'First Year', title: 'Personalized Life Planning', description: 'Personalized life planning sessions to help students define and pursue their career goals' },
    { year: 'First Year', title: 'Holistic Skill Development', description: 'Comprehensive training in soft skills, aptitude, resume writing, and more, enhancing employability' },
    { year: 'Second Year', title: 'Progressive Evaluation', description: 'Regular assessments track student progress and provide tailored support' },
    { year: 'Second Year', title: 'Company-specific Training', description: 'Tailored training programs align with specific industry needs, prepare students for targeted opportunities' },
    { year: 'Third Year', title: 'Expert Industry Sessions', description: 'Guest lectures from HR professionals and corporate leaders, providing valuable industry insights' },
    { year: 'Third Year', title: 'Placement Awareness Programs', description: 'Motivate and inform students about job opportunities and industry expectations' },
    { year: 'Third Year', title: 'Exploration of Higher Education', description: 'Seminars explore diverse educational pathways, broadening students\' horizons' },
    { year: 'Final Year', title: 'Dynamic Campus Drives', description: 'Invite companies to conduct on-campus placement drives, bringing opportunities directly to students' },
    { year: 'Final Year', title: 'Robust Job Assistance', description: 'Organize placement drives and support off-campus opportunities, ensuring broad access to job prospects' },
    { year: 'Throughout', title: 'Practical Learning Exposure', description: 'Internships, inplant training, and industrial visits offer hands-on learning experiences' },
    { year: 'Throughout', title: 'Professional Development', description: 'Training & Placement Officer (TPO) actively participates in industry seminars and workshops, staying connected with industry trends' }
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
            <Link to="/" className="text-gray-600 hover:text-teal-600 transition-colors">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">Placement Training Cell</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Placement Training Cell</h1>
          <p className="text-xl text-teal-50 max-w-3xl mx-auto">
            Empowering students with industry-ready skills and connecting them with leading organizations
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'about', label: 'About', icon: 'ri-information-line' },
              { id: 'training', label: 'Training Programs', icon: 'ri-graduation-cap-line' },
              { id: 'activities', label: 'Empowering Activities', icon: 'ri-calendar-event-line' },
              { id: 'yearplan', label: 'Year Plan', icon: 'ri-calendar-line' }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Genesis Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Genesis of Our Placement Cell</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                In the landscape of modern education, the relevance of job placement has become paramount. At DMIEC, the genesis of our Placement Cell was rooted in the recognition of this crucial need. Today, as we witness the evolving dynamics of employment, the importance of securing a job has never been more pronounced.
              </p>
              <p className="mb-4">
                The birth of our Placement Cell stemmed from a deep understanding of the challenges faced by students in the pursuit of meaningful employment. Recognizing the aspirations of our students and the competitive nature of the job market, we embarked on a mission to bridge the gap between academia and industry.
              </p>
            </div>
          </div>

          {/* TPO Vision */}
          <div className="mb-12 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">TPO's Vision</h2>
            <p className="text-gray-700 leading-relaxed">
             TPO's message :We are pleased to extend an invitation to your esteemed organization to join us in our pursuit of excellence at DMI Engineering College, Aralvaimozhi. Our institution is renowned for its proactive approach to learning and carefully curated academic programs that equip students for success in their professional journeys. We empower our students with opportunities for independent learning, participation in conferences, seminars, industrial visits, and in-plant training experiences.

             We are confident that our students will be warmly welcomed by the industry, armed with knowledge and skills that transcend the academic sphere. We wholeheartedly wish this batch great success in their endeavors and believe that they will make significant contributions to the professional world, leaving a lasting impact.

             Thank you for considering our talented graduates. We eagerly anticipate a collaborative partnership that will be mutually beneficial for both your organization and our students.
            </p>
          </div>

          {/* Comprehensive Training Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Comprehensive Training and Support</h2>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Training and Placement Cell offers comprehensive training in life planning, soft skills, and aptitude. We organize guest lectures and seminars by HR professionals, fostering employability skills. Through industry tie-ups, we host on-campus placement drives and provide off-campus opportunities for students. Practical experience is gained through internships and industrial visits.
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-8 border border-teal-100">
              <div className="w-14 h-14 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-eye-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
              To empower individuals with the skills and opportunities to thrive in their chosen careers, driving sustainable growth and prosperity for both individuals and organization.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-target-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
               •	To provide holistic training, career counseling, and placement services.
               	To tailor these services to individual needs.
               	To forge strategic partnerships with industries. 
               	To create a thriving ecosystem of skilled professionals.

              </p>
            </div>
          </div>
        </div>
      )}

      {/* Training Programs Tab */}
      {activeTab === 'training' && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Training Programs</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Comprehensive training to enhance employability and prepare students for successful careers
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingPrograms.map((program, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                    <i className="ri-graduation-cap-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
                  <ul className="space-y-2">
                    {program.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <i className="ri-checkbox-circle-line text-teal-600 mt-0.5 flex-shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empowering Activities Tab */}
      {activeTab === 'activities' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Empowering Activities</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Our Placement Department engages in the following core activities to prepare students for their future careers
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {empoweringActivities.map((activity, index) => (
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

      {/* Year Plan Tab */}
      {activeTab === 'yearplan' && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Visionary Year Plan</h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Our year plan is meticulously crafted to empower our students and ensure their professional success
            </p>

            <div className="space-y-6">
              {yearPlanSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-teal-600 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="bg-gradient-to-br from-teal-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold whitespace-nowrap">
                      {step.year}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-12 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
              <i className="ri-double-quotes-L text-4xl mb-4 opacity-50"></i>
              <p className="text-xl leading-relaxed">
                This comprehensive plan reflects our unwavering commitment to preparing students for success in their professional journeys. 
                At DMI Engineering College, we are not just shaping careers; we are shaping futures. Join us on this inspiring journey toward achieving your dreams.
              </p>
              <i className="ri-double-quotes-R text-4xl mt-4 opacity-50"></i>
            </div>

            {/* Quick Links */}
            <div className="mt-12 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 text-center">Explore More</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <Link to="/placement/teams" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center transition-all duration-300 hover:scale-105">
                  <i className="ri-team-line text-3xl mb-3"></i>
                  <h3 className="font-semibold">Our Team</h3>
                </Link>
                <Link to="/placement/records" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center transition-all duration-300 hover:scale-105">
                  <i className="ri-bar-chart-box-line text-3xl mb-3"></i>
                  <h3 className="font-semibold">Placement Records</h3>
                </Link>
                <Link to="/placement/edc" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center transition-all duration-300 hover:scale-105">
                  <i className="ri-lightbulb-line text-3xl mb-3"></i>
                  <h3 className="font-semibold">EDC Cell</h3>
                </Link>
                <Link to="/placement/recruiters" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center transition-all duration-300 hover:scale-105">
                  <i className="ri-building-2-line text-3xl mb-3"></i>
                  <h3 className="font-semibold">Our Recruiters</h3>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}