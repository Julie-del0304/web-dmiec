import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function RecruitmentPolicyPage() {
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

  const facultyPositions = [
    {
      position: 'Professor',
      qualification: 'Ph.D. with First Class at Bachelor\'s or Master\'s level',
      experience: '10 years of teaching/research/industry experience with at least 3 years as Associate Professor',
      publications: 'Minimum 10 publications in refereed journals'
    },
    {
      position: 'Associate Professor',
      qualification: 'Ph.D. with First Class at Bachelor\'s or Master\'s level',
      experience: '6 years of teaching/research/industry experience with at least 3 years as Assistant Professor',
      publications: 'Minimum 5 publications in refereed journals'
    },
    {
      position: 'Assistant Professor',
      qualification: 'M.E./M.Tech. with First Class at Bachelor\'s or Master\'s level',
      experience: 'Minimum 2 years of teaching/research/industry experience',
      publications: 'Publications in refereed journals preferred'
    }
  ];

  const selectionProcess = [
    {
      step: '1',
      title: 'Application Submission',
      description: 'Candidates submit applications through official recruitment portal with required documents',
      icon: 'ri-file-text-line'
    },
    {
      step: '2',
      title: 'Screening',
      description: 'Applications are screened based on eligibility criteria and qualifications',
      icon: 'ri-search-line'
    },
    {
      step: '3',
      title: 'Written Test',
      description: 'Shortlisted candidates appear for subject-specific written examination',
      icon: 'ri-edit-box-line'
    },
    {
      step: '4',
      title: 'Presentation',
      description: 'Candidates deliver technical presentation on assigned topic',
      icon: 'ri-presentation-line'
    },
    {
      step: '5',
      title: 'Interview',
      description: 'Personal interview by selection committee to assess competency',
      icon: 'ri-user-voice-line'
    },
    {
      step: '6',
      title: 'Final Selection',
      description: 'Merit list prepared and offer letters issued to selected candidates',
      icon: 'ri-checkbox-circle-line'
    }
  ];

  const benefits = [
    { icon: 'ri-money-dollar-circle-line', title: 'Competitive Salary', description: 'As per AICTE/UGC norms with regular increments' },
    { icon: 'ri-hospital-line', title: 'Medical Benefits', description: 'Comprehensive health insurance for self and family' },
    { icon: 'ri-home-4-line', title: 'Accommodation', description: 'On-campus housing facility (subject to availability)' },
    { icon: 'ri-graduation-cap-line', title: 'Professional Development', description: 'Support for conferences, workshops, and higher studies' },
    { icon: 'ri-book-open-line', title: 'Research Support', description: 'Funding and facilities for research activities' },
    { icon: 'ri-calendar-line', title: 'Leave Benefits', description: 'Casual, medical, and earned leave as per norms' }
  ];

  const documents = [
    'Completed application form with recent photograph',
    'Copies of all educational certificates and mark sheets',
    'Experience certificates from previous employers',
    'List of publications with proof',
    'Research work summary and patents (if any)',
    'Caste certificate (if applicable)',
    'Aadhar card and PAN card copies',
    'No Objection Certificate (if currently employed)'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
    
<div className="pt-[72px] 2xl:pt-[120px]" />
      
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="hover:text-emerald-200 transition-colors whitespace-nowrap">Home</a>
            <i className="ri-arrow-right-s-line text-emerald-300"></i>
            <span className="text-emerald-100 whitespace-nowrap">About</span>
            <i className="ri-arrow-right-s-line text-emerald-300"></i>
            <span className="text-white whitespace-nowrap">Recruitment Policy</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">Recruitment Policy</h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Our Academic Excellence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              DMI Engineering College follows a transparent and merit-based recruitment process 
              to attract and retain highly qualified faculty and staff members who are committed 
              to excellence in teaching, research, and institutional development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
                <i className="ri-shield-check-line text-3xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 whitespace-nowrap">Transparent Process</h3>
              <p className="text-gray-600">Fair and unbiased selection based on merit</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
                <i className="ri-star-line text-3xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 whitespace-nowrap">Quality Standards</h3>
              <p className="text-gray-600">Adherence to AICTE and UGC norms</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-4">
                <i className="ri-team-line text-3xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 whitespace-nowrap">Equal Opportunity</h3>
              <p className="text-gray-600">No discrimination based on any grounds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Positions */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Faculty Positions & Qualifications</h2>
            <p className="text-lg text-gray-600">Minimum eligibility criteria for teaching positions</p>
          </div>

          <div className="space-y-6">
            {facultyPositions.map((pos, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-emerald-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 whitespace-nowrap">{pos.position}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <i className="ri-graduation-cap-line text-emerald-600 mr-2 text-xl"></i>
                      <h4 className="font-bold text-gray-900 whitespace-nowrap">Qualification</h4>
                    </div>
                    <p className="text-gray-700">{pos.qualification}</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-3">
                      <i className="ri-briefcase-line text-emerald-600 mr-2 text-xl"></i>
                      <h4 className="font-bold text-gray-900 whitespace-nowrap">Experience</h4>
                    </div>
                    <p className="text-gray-700">{pos.experience}</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-3">
                      <i className="ri-file-list-line text-emerald-600 mr-2 text-xl"></i>
                      <h4 className="font-bold text-gray-900 whitespace-nowrap">Publications</h4>
                    </div>
                    <p className="text-gray-700">{pos.publications}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selection Process */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Selection Process</h2>
            <p className="text-lg text-gray-600">Step-by-step recruitment procedure</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectionProcess.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-full font-bold text-xl shadow-lg">
                  {step.step}
                </div>
                <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-xl mb-4 ml-8">
                  <i className={`${step.icon} text-2xl text-emerald-600`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 whitespace-nowrap">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefits & Perquisites</h2>
            <p className="text-lg text-gray-600">Comprehensive benefits package for faculty and staff</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-emerald-100">
                <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-xl mb-4">
                  <i className={`${benefit.icon} text-2xl text-emerald-600`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 whitespace-nowrap">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Required Documents</h2>
            <p className="text-lg text-gray-600">Documents to be submitted with application</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <ul className="space-y-4">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 flex items-center justify-center bg-emerald-100 rounded-full mr-4 flex-shrink-0 mt-1">
                    <i className="ri-checkbox-circle-fill text-emerald-600 text-sm"></i>
                  </div>
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-amber-500">
            <div className="flex items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full mr-4 flex-shrink-0">
                <i className="ri-information-line text-2xl text-amber-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 whitespace-nowrap">Important Notes</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>All qualifications must be from recognized universities/institutions</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>Candidates with Ph.D. will be given preference</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>Relaxation in qualifications as per Government of India norms for reserved categories</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>The institution reserves the right to reject any application without assigning reasons</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>Canvassing in any form will lead to disqualification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">For More Information</h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact our Human Resources Department for recruitment queries
          </p>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center">
                <i className="ri-mail-line text-emerald-600 text-2xl mr-3"></i>
                <div className="text-left">
                  <div className="text-sm text-gray-500">Email</div>
                  <a href="mailto:hr@dmiengg.edu.in" className="text-gray-900 font-semibold hover:text-emerald-600 transition-colors">
                    hr@dmiengg.edu.in
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <i className="ri-phone-line text-emerald-600 text-2xl mr-3"></i>
                <div className="text-left">
                  <div className="text-sm text-gray-500">Phone</div>
                  <a href="tel:+914652290244" className="text-gray-900 font-semibold hover:text-emerald-600 transition-colors whitespace-nowrap">
                    +91 4652 290 244
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}

