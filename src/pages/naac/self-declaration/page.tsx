import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function SelfDeclarationPage() {
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Self Declaration</h1>
            <p className="text-xl text-white/90">NAAC Compliance & Institutional Declarations</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Self Declaration</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            As part of the NAAC accreditation process, DMI Engineering College submits self-declarations affirming compliance with regulatory requirements, quality standards, and institutional policies. These declarations demonstrate our commitment to transparency, accountability, and continuous improvement in higher education.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            The self-declaration process involves comprehensive documentation of institutional practices, infrastructure, academic programs, faculty qualifications, and student support services in accordance with NAAC guidelines and AICTE norms.
          </p>
        </div>

        {/* Declaration Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Declaration Categories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: 'ri-government-line',
                title: 'Regulatory Compliance',
                description: 'Compliance with AICTE, Anna University, and Government of Tamil Nadu regulations and guidelines.'
              },
              {
                icon: 'ri-building-line',
                title: 'Infrastructure Standards',
                description: 'Declaration of adequate infrastructure, laboratories, library, and facilities as per norms.'
              },
              {
                icon: 'ri-user-star-line',
                title: 'Faculty Qualifications',
                description: 'Confirmation of faculty qualifications, experience, and student-teacher ratio compliance.'
              },
              {
                icon: 'ri-book-open-line',
                title: 'Academic Programs',
                description: 'Declaration of approved programs, curriculum implementation, and examination processes.'
              },
              {
                icon: 'ri-shield-check-line',
                title: 'Quality Assurance',
                description: 'Commitment to quality assurance mechanisms, feedback systems, and continuous improvement.'
              },
              {
                icon: 'ri-file-list-3-line',
                title: 'Financial Transparency',
                description: 'Declaration of fee structure, financial management, and audit compliance.'
              }
            ].map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${category.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Declarations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Institutional Declarations</h2>
          <div className="space-y-4">
            {[
              'The institution is approved by AICTE and affiliated to Anna University, Chennai',
              'All programs offered are duly approved by the regulatory authorities',
              'The institution maintains the prescribed student-teacher ratio and faculty qualifications',
              'Infrastructure and facilities meet the minimum requirements as per AICTE norms',
              'The institution follows a transparent admission process based on merit',
              'Fee structure is approved by the Fee Regulatory Committee and displayed publicly',
              'The institution has established grievance redressal mechanisms for students and staff',
              'Anti-ragging measures are implemented as per UGC regulations',
              'The institution maintains proper financial records and undergoes regular audits',
              'Quality assurance mechanisms including IQAC are functional and effective',
              'The institution provides equal opportunities without discrimination',
              'All mandatory committees (ICC, Anti-Ragging, Grievance) are constituted and active'
            ].map((declaration, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-5 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{declaration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Self Declaration Documents</h2>
          <p className="text-gray-700 mb-6">
            Download official self-declaration documents submitted to NAAC and regulatory authorities:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="#"
              className="flex items-center gap-4 bg-white p-5 rounded-lg border border-indigo-200 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-file-pdf-line text-2xl text-white"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  Self Declaration 2024
                </h3>
                <p className="text-sm text-gray-500">PDF Document</p>
              </div>
              <i className="ri-download-line text-xl text-gray-400 group-hover:text-indigo-600 transition-colors"></i>
            </a>

            <a
              href="#"
              className="flex items-center gap-4 bg-white p-5 rounded-lg border border-indigo-200 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-file-pdf-line text-2xl text-white"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  Compliance Certificate
                </h3>
                <p className="text-sm text-gray-500">PDF Document</p>
              </div>
              <i className="ri-download-line text-xl text-gray-400 group-hover:text-indigo-600 transition-colors"></i>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


