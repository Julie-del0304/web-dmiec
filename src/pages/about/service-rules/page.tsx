import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function ServiceRulesPage() {
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

  const categories = [
    {
      title: 'Appointment & Probation',
      icon: 'ri-user-add-line',
      rules: [
        'All appointments shall be made by the Management based on recommendations of the Selection Committee',
        'New faculty members will be on probation for a period of one year',
        'Confirmation of appointment will be subject to satisfactory performance during probation',
        'Extension of probation period may be granted if performance is not satisfactory',
        'Appointment orders will clearly specify designation, pay scale, and terms of employment'
      ]
    },
    {
      title: 'Working Hours & Attendance',
      icon: 'ri-time-line',
      rules: [
        'Faculty members are required to work 40 hours per week as per institutional schedule',
        'Teaching staff must maintain minimum 16-18 hours of teaching per week',
        'Punctuality and regular attendance are mandatory for all employees',
        'Biometric attendance system must be used for marking attendance',
        'Prior permission required for leaving campus during working hours'
      ]
    },
    {
      title: 'Leave Entitlements',
      icon: 'ri-calendar-check-line',
      rules: [
        'Casual Leave: 12 days per year (non-accumulative)',
        'Medical Leave: 15 days per year (with medical certificate)',
        'Earned Leave: 30 days per year (accumulative up to 240 days)',
        'Maternity Leave: 180 days as per Government norms',
        'Paternity Leave: 15 days for male employees',
        'Study Leave: As per AICTE/UGC norms for pursuing higher studies',
        'Leave applications must be submitted in advance through proper channel'
      ]
    },
    {
      title: 'Code of Conduct',
      icon: 'ri-shield-check-line',
      rules: [
        'Maintain high standards of professional ethics and integrity',
        'Treat students, colleagues, and staff with respect and dignity',
        'Avoid any form of discrimination, harassment, or misconduct',
        'Maintain confidentiality of institutional information',
        'Dress code must be formal and professional',
        'Use of mobile phones during class hours is prohibited',
        'Participation in anti-institutional activities is strictly prohibited'
      ]
    },
    {
      title: 'Performance Appraisal',
      icon: 'ri-line-chart-line',
      rules: [
        'Annual performance appraisal will be conducted for all employees',
        'Appraisal based on teaching effectiveness, research output, and institutional contribution',
        'Self-appraisal report must be submitted by employees',
        'Student feedback will be considered in faculty evaluation',
        'Performance-linked incentives may be provided to outstanding performers',
        'Poor performance may lead to counseling or disciplinary action'
      ]
    },
    {
      title: 'Promotion & Career Advancement',
      icon: 'ri-arrow-up-circle-line',
      rules: [
        'Promotions will be based on merit, experience, and performance',
        'Minimum service period required: Assistant to Associate Professor (6 years)',
        'Career Advancement Scheme (CAS) as per UGC/AICTE guidelines',
        'API scores and research publications will be considered for promotion',
        'Completion of required training programs mandatory for promotion',
        'Promotion committee will review applications and recommend deserving candidates'
      ]
    },
    {
      title: 'Salary & Benefits',
      icon: 'ri-money-dollar-circle-line',
      rules: [
        'Salary as per AICTE pay scales with annual increments',
        'Provident Fund (PF) and Employees State Insurance (ESI) as per statutory norms',
        'Group health insurance coverage for employees and dependents',
        'Professional development allowance for attending conferences/workshops',
        'Transport allowance for eligible employees',
        'Performance-based incentives and rewards',
        'Salary will be credited on the last working day of each month'
      ]
    },
    {
      title: 'Disciplinary Actions',
      icon: 'ri-alert-line',
      rules: [
        'Misconduct, negligence, or violation of rules may lead to disciplinary action',
        'Minor offenses: Warning, reprimand, or withholding of increment',
        'Major offenses: Suspension, demotion, or termination of service',
        'Inquiry committee will be constituted for serious misconduct cases',
        'Employee will be given opportunity to present explanation before action',
        'Appeal against disciplinary action can be made to higher authority'
      ]
    },
    {
      title: 'Resignation & Retirement',
      icon: 'ri-logout-circle-line',
      rules: [
        'Resignation must be submitted with 90 days notice period',
        'Notice period may be waived by Management in exceptional cases',
        'Retirement age: 60 years for teaching staff, 58 years for non-teaching staff',
        'Retirement benefits as per applicable rules and regulations',
        'No Dues Certificate must be obtained before relieving',
        'Gratuity will be paid as per Payment of Gratuity Act'
      ]
    }
  ];

  const grievanceProcess = [
    {
      step: 'Submit Grievance',
      description: 'Employee submits written grievance to immediate supervisor or HR department',
      icon: 'ri-file-text-line'
    },
    {
      step: 'Acknowledgment',
      description: 'Grievance is acknowledged within 3 working days',
      icon: 'ri-checkbox-line'
    },
    {
      step: 'Investigation',
      description: 'Grievance committee investigates the matter thoroughly',
      icon: 'ri-search-eye-line'
    },
    {
      step: 'Resolution',
      description: 'Decision communicated within 15 working days',
      icon: 'ri-check-double-line'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
<div className="pt-[72px] 2xl:pt-[120px]" />
      
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="hover:text-blue-200 transition-colors whitespace-nowrap">Home</a>
            <i className="ri-arrow-right-s-line text-blue-300"></i>
            <span className="text-blue-100 whitespace-nowrap">About</span>
            <i className="ri-arrow-right-s-line text-blue-300"></i>
            <span className="text-white whitespace-nowrap">Service Rules</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">Service Rules & Regulations</h1>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Institutional Service Framework</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              DMI Engineering College has established comprehensive service rules and regulations 
              to ensure smooth functioning, maintain discipline, and protect the rights and interests 
              of all employees while fostering a conducive work environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                <i className="ri-book-open-line text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 whitespace-nowrap">Clear Guidelines</h3>
              <p className="text-gray-600">Well-defined rules for all aspects of employment</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                <i className="ri-scales-line text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 whitespace-nowrap">Fair Treatment</h3>
              <p className="text-gray-600">Equal rights and opportunities for all employees</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                <i className="ri-shield-user-line text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 whitespace-nowrap">Employee Welfare</h3>
              <p className="text-gray-600">Comprehensive benefits and support system</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Rules Categories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Rules & Regulations</h2>
            <p className="text-lg text-gray-600">Comprehensive guidelines for institutional employment</p>
          </div>

          <div className="space-y-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-600">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-xl mr-4">
                    <i className={`${category.icon} text-2xl text-blue-600`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 whitespace-nowrap">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start">
                      <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full mr-3 flex-shrink-0 mt-1">
                        <i className="ri-checkbox-circle-fill text-blue-600 text-sm"></i>
                      </div>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grievance Redressal */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Grievance Redressal Mechanism</h2>
            <p className="text-lg text-gray-600">Fair and transparent process for addressing employee concerns</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {grievanceProcess.map((process, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center relative">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                  <i className={`${process.icon} text-2xl text-blue-600`}></i>
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 whitespace-nowrap">{process.step}</h3>
                <p className="text-sm text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-amber-500">
            <div className="flex items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full mr-4 flex-shrink-0">
                <i className="ri-error-warning-line text-2xl text-amber-600"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 whitespace-nowrap">Important Notice</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>All employees are required to familiarize themselves with these service rules</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>Ignorance of rules will not be accepted as an excuse for non-compliance</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>Management reserves the right to amend these rules with prior notice</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>In case of disputes, the decision of the Management shall be final</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-arrow-right-s-fill text-amber-600 mt-1 mr-2 flex-shrink-0"></i>
                    <span>For clarifications, contact the Human Resources Department</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Download Service Rules Document</h2>
          <p className="text-lg text-gray-600 mb-8">
            Complete service rules and regulations handbook available for download
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center whitespace-nowrap">
            <i className="ri-download-line mr-2 text-xl"></i>
            Download Service Rules PDF
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Clarification?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact Human Resources Department for any queries regarding service rules
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center">
                <i className="ri-mail-line text-blue-600 text-2xl mr-3"></i>
                <div className="text-left">
                  <div className="text-sm text-gray-500">Email</div>
                  <a href="mailto:hr@dmiengg.edu.in" className="text-gray-900 font-semibold hover:text-blue-600 transition-colors">
                    hr@dmiengg.edu.in
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <i className="ri-phone-line text-blue-600 text-2xl mr-3"></i>
                <div className="text-left">
                  <div className="text-sm text-gray-500">Phone</div>
                  <a href="tel:+914652290244" className="text-gray-900 font-semibold hover:text-blue-600 transition-colors whitespace-nowrap">
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

