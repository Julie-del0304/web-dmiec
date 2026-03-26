import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function ResearchPolicyPage() {
  const [scrolled, setScrolled] = useState(false);

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
    { label: 'Research Policy', path: '/research/policy' }
  ];

  const objectives = [
    {
      title: 'Promote Research Culture',
      description: 'Foster an environment that encourages faculty and students to engage in innovative research activities across all engineering disciplines.',
      icon: 'ri-lightbulb-flash-line',
      color: 'violet'
    },
    {
      title: 'Quality Publications',
      description: 'Encourage publication of research findings in high-impact peer-reviewed journals and reputed international conferences.',
      icon: 'ri-article-line',
      color: 'sky'
    },
    {
      title: 'Industry Collaboration',
      description: 'Establish strong partnerships with industries for collaborative research projects and technology transfer initiatives.',
      icon: 'ri-building-line',
      color: 'emerald'
    },
    {
      title: 'Funding Support',
      description: 'Facilitate access to research grants from government agencies, industries, and international funding organizations.',
      icon: 'ri-funds-line',
      color: 'amber'
    },
    {
      title: 'Ethical Standards',
      description: 'Maintain highest standards of research ethics, integrity, and compliance with institutional and national guidelines.',
      icon: 'ri-shield-check-line',
      color: 'rose'
    },
    {
      title: 'Innovation & Patents',
      description: 'Support faculty and students in developing innovative solutions and filing patents for novel inventions and technologies.',
      icon: 'ri-patent-line',
      color: 'cyan'
    }
  ];

  const guidelines = [
    {
      category: 'Research Proposal Submission',
      items: [
        'All research proposals must be submitted through the Research & Development Cell',
        'Proposals should clearly define objectives, methodology, expected outcomes, and budget',
        'Ethical clearance is mandatory for research involving human subjects or sensitive data',
        'Interdisciplinary research proposals are highly encouraged'
      ],
      icon: 'ri-file-list-3-line'
    },
    {
      category: 'Funding and Grants',
      items: [
        'Faculty can apply for internal seed money grants up to ₹2 lakhs per project',
        'Institution provides support for preparing proposals for external funding agencies',
        'Overhead charges as per funding agency norms will be managed by the institution',
        'Regular workshops on grant writing and proposal development are conducted'
      ],
      icon: 'ri-money-rupee-circle-line'
    },
    {
      category: 'Publication Guidelines',
      items: [
        'Publications in UGC-CARE listed journals and Scopus/SCI indexed journals are encouraged',
        'Institution provides financial support for publication fees in reputed journals',
        'All publications must acknowledge institutional affiliation correctly',
        'Plagiarism check is mandatory before submission to any journal or conference'
      ],
      icon: 'ri-book-open-line'
    },
    {
      category: 'Intellectual Property Rights',
      items: [
        'Institution supports patent filing with financial assistance and legal guidance',
        'Revenue sharing policy: 30% to inventor, 70% to institution for commercialized patents',
        'Copyright and trademark registration support available for eligible innovations',
        'Regular IPR awareness programs and workshops conducted for faculty and students'
      ],
      icon: 'ri-copyright-line'
    },
    {
      category: 'Research Ethics',
      items: [
        'All research must comply with institutional ethics committee guidelines',
        'Informed consent mandatory for research involving human participants',
        'Proper care and ethical treatment required for research involving animals',
        'Data privacy and confidentiality must be maintained throughout research'
      ],
      icon: 'ri-shield-star-line'
    },
    {
      category: 'Student Research',
      items: [
        'UG and PG students encouraged to participate in faculty research projects',
        'Best student research projects recognized with awards and certificates',
        'Financial support available for student participation in conferences',
        'Research internships with industries facilitated through institutional partnerships'
      ],
      icon: 'ri-user-star-line'
    }
  ];

  const incentives = [
    {
      type: 'Journal Publications',
      details: [
        { tier: 'SCI/Scopus Indexed (Q1)', amount: '₹15,000', color: 'emerald' },
        { tier: 'SCI/Scopus Indexed (Q2)', amount: '₹10,000', color: 'sky' },
        { tier: 'UGC-CARE Listed', amount: '₹5,000', color: 'violet' }
      ],
      icon: 'ri-medal-line'
    },
    {
      type: 'Conference Publications',
      details: [
        { tier: 'International (IEEE/Springer)', amount: '₹8,000', color: 'amber' },
        { tier: 'National Conference', amount: '₹4,000', color: 'rose' }
      ],
      icon: 'ri-presentation-line'
    },
    {
      type: 'Patents & IPR',
      details: [
        { tier: 'Patent Filed', amount: '₹20,000', color: 'cyan' },
        { tier: 'Patent Granted', amount: '₹50,000', color: 'emerald' }
      ],
      icon: 'ri-award-line'
    },
    {
      type: 'Research Grants',
      details: [
        { tier: 'External Grant Secured', amount: '10% of grant', color: 'violet' },
        { tier: 'Consultancy Projects', amount: '20% of revenue', color: 'sky' }
      ],
      icon: 'ri-trophy-line'
    }
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
            backgroundImage: 'url("https://readdy.ai/api/search-image?query=professional%20research%20policy%20document%20guidelines%20institutional%20framework%20academic%20standards%20modern%20office%20professional%20environment%20clean%20organized&width=1920&height=600&seq=research-policy-hero&orientation=landscape")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-500/20 rounded-full mb-6">
            <i className="ri-file-shield-2-line text-5xl text-violet-400"></i>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Research Policy
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Comprehensive guidelines and framework to promote quality research, innovation, and scholarly excellence at DMI Engineering College.
          </p>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Our Vision</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
              <strong>Policy Objectives</strong>
            </h2>
            <div className="w-24 h-1 bg-violet-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((obj, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br from-${obj.color}-500 to-${obj.color}-600 rounded-xl flex items-center justify-center mb-6`}>
                  <i className={`${obj.icon} text-white text-3xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{obj.title}</h3>
                <p className="text-slate-600 leading-relaxed">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Framework</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
              <strong>Research Guidelines</strong>
            </h2>
            <div className="w-24 h-1 bg-violet-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {guidelines.map((guideline, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <i className={`${guideline.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white">{guideline.category}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {guideline.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <i className="ri-checkbox-circle-fill text-violet-600 text-xl mt-0.5 flex-shrink-0"></i>
                        <span className="text-slate-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incentives Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Rewards</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 mb-6">
              <strong>Research Incentives</strong>
            </h2>
            <div className="w-24 h-1 bg-violet-600 mx-auto mb-8"></div>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Financial incentives and recognition for faculty members contributing to research excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {incentives.map((incentive, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <i className={`${incentive.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{incentive.type}</h3>
                </div>
                <div className="space-y-4">
                  {incentive.details.map((detail, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                      <div>
                        <div className="text-slate-900 font-semibold mb-1">{detail.tier}</div>
                        <div className={`text-${detail.color}-600 text-xs font-medium`}>Incentive Amount</div>
                      </div>
                      <div className={`text-2xl font-bold text-${detail.color}-600`}>{detail.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 bg-gradient-to-br from-violet-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-500/20 rounded-full mb-6">
            <i className="ri-download-cloud-line text-4xl text-violet-400"></i>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Download Complete Policy Document
          </h2>
          <p className="text-purple-200 text-base mb-8 max-w-2xl mx-auto">
            Access the full research policy document with detailed guidelines, procedures, and forms.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-violet-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-violet-600 transition-all hover:scale-105 whitespace-nowrap cursor-pointer flex items-center gap-2">
              <i className="ri-file-pdf-line text-xl"></i>
              Download Policy PDF
            </button>
            <button className="bg-white text-violet-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 whitespace-nowrap cursor-pointer flex items-center gap-2">
              <i className="ri-mail-line text-xl"></i>
              Contact R&D Cell
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
