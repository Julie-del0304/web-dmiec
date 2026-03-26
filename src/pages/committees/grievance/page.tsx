import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function GrievancePage() {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    grievanceType: '',
    subject: '',
    description: '',
    anonymous: false
  });
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Committees', path: '#' },
    { label: 'Grievance Redressal Committee', path: '/committees/grievance' }
  ];

  const committeeMembers = [
    {
      name: 'Dr. S. Rajendran',
      designation: 'Principal',
      role: 'Chairperson',
      email: 'principal@dmiengg.edu.in',
      phone: '+91 4652 230123',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20college%20principal%20formal%20business%20attire%20office%20setting%20confident%20leadership%20academic%20administrator%20clean%20simple%20background%20portrait&width=400&height=400&seq=principal-002&orientation=squarish'
    },
    {
      name: 'Dr. T. Ramesh',
      designation: 'Dean Academics',
      role: 'Convener',
      email: 'ramesh.dean@dmiengg.edu.in',
      phone: '+91 4652 230134',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20dean%20formal%20attire%20office%20setting%20confident%20academic%20leader%20clean%20simple%20background%20portrait&width=400&height=400&seq=dean-ramesh-001&orientation=squarish'
    },
    {
      name: 'Dr. V. Meena',
      designation: 'Professor, IT',
      role: 'Member',
      email: 'meena.it@dmiengg.edu.in',
      phone: '+91 4652 230145',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-meena-001&orientation=squarish'
    },
    {
      name: 'Mr. K. Suresh',
      designation: 'Associate Professor, Mechanical',
      role: 'Member',
      email: 'suresh.mech@dmiengg.edu.in',
      phone: '+91 4652 230156',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20associate%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-suresh-001&orientation=squarish'
    },
    {
      name: 'Ms. R. Divya',
      designation: 'Assistant Professor, CSE',
      role: 'Member',
      email: 'divya.cse@dmiengg.edu.in',
      phone: '+91 4652 230167',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20assistant%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-divya-001&orientation=squarish'
    },
    {
      name: 'Mr. N. Arun',
      designation: 'Student Representative',
      role: 'Student Member',
      email: 'arun.student@dmiengg.edu.in',
      phone: '+91 9876543211',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20college%20student%20formal%20attire%20campus%20setting%20confident%20young%20leader%20clean%20simple%20background%20portrait&width=400&height=400&seq=student-arun-001&orientation=squarish'
    }
  ];

  const grievanceTypes = [
    {
      icon: 'ri-book-open-line',
      title: 'Academic Issues',
      description: 'Concerns related to curriculum, teaching methods, examinations, and academic performance'
    },
    {
      icon: 'ri-building-line',
      title: 'Infrastructure',
      description: 'Issues regarding classrooms, laboratories, library, hostel, and other campus facilities'
    },
    {
      icon: 'ri-user-line',
      title: 'Administrative',
      description: 'Matters related to admissions, fees, certificates, and administrative procedures'
    },
    {
      icon: 'ri-team-line',
      title: 'Discrimination',
      description: 'Cases of unfair treatment based on gender, caste, religion, or any other grounds'
    },
    {
      icon: 'ri-shield-user-line',
      title: 'Harassment',
      description: 'Any form of harassment including verbal, physical, or psychological abuse'
    },
    {
      icon: 'ri-more-line',
      title: 'Other Issues',
      description: 'Any other concerns affecting student welfare and campus life'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitting(false);
    setShowModal(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      studentId: '',
      department: '',
      grievanceType: '',
      subject: '',
      description: '',
      anonymous: false
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

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
      <div className="relative bg-gradient-to-br from-teal-600 via-emerald-600 to-green-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <i className="ri-customer-service-2-line text-6xl"></i>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">
            Grievance Redressal Committee
          </h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Dedicated to addressing student concerns and ensuring a fair, transparent resolution process
          </p>
        </div>
      </div>

      {/* Contact Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-y border-teal-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-mail-line text-3xl text-white"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Submit Your Grievance</h3>
                <p className="text-gray-600">We are here to help resolve your concerns</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:grievance@dmiengg.edu.in" className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap">
                <i className="ri-mail-fill"></i>
                grievance@dmiengg.edu.in
              </a>
              <a href="tel:+914652230134" className="flex items-center gap-2 bg-white text-teal-600 border-2 border-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors whitespace-nowrap">
                <i className="ri-phone-fill"></i>
                +91 4652 230134
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">About the Committee</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              The Grievance Redressal Committee at DMI Engineering College is established to provide a platform for students to voice their concerns and seek resolution in a fair, transparent, and timely manner. The committee ensures that every grievance is heard, investigated, and addressed with utmost care and confidentiality.
            </p>
            <p>
              We are committed to maintaining a harmonious campus environment where students feel safe, respected, and supported. The committee handles various types of grievances including academic issues, administrative matters, infrastructure concerns, and any form of discrimination or harassment.
            </p>
            <p>
              Students can submit their grievances through multiple channels including online portal, email, phone, or in-person meetings. All complaints are treated with strict confidentiality and resolved within a stipulated timeframe.
            </p>
          </div>
        </div>
      </section>

      {/* Grievance Types */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Types of Grievances We Handle</h2>
          <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
            We address a wide range of student concerns to ensure a positive campus experience
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grievanceTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${type.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Committee Members</h2>
          <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
            Experienced faculty members committed to resolving student grievances
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {committeeMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-teal-100 to-emerald-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full mb-3">
                    {member.role}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-gray-600 font-semibold mb-4">{member.designation}</p>
                  <div className="space-y-2">
                    <a href={`mailto:${member.email}`} className="flex items-center text-sm text-gray-700 hover:text-teal-600 transition-colors">
                      <i className="ri-mail-line mr-2 text-teal-600 w-5 h-5 flex items-center justify-center"></i>
                      {member.email}
                    </a>
                    <a href={`tel:${member.phone}`} className="flex items-center text-sm text-gray-700 hover:text-teal-600 transition-colors">
                      <i className="ri-phone-line mr-2 text-teal-600 w-5 h-5 flex items-center justify-center"></i>
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grievance Form */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-list-3-line text-4xl text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Submit Your Grievance</h2>
              <p className="text-gray-600 text-lg">
                Your concern will be addressed promptly and confidentially
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name {!formData.anonymous && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!formData.anonymous}
                    disabled={formData.anonymous}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email {!formData.anonymous && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required={!formData.anonymous}
                    disabled={formData.anonymous}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number {!formData.anonymous && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={!formData.anonymous}
                    disabled={formData.anonymous}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Student ID {!formData.anonymous && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    required={!formData.anonymous}
                    disabled={formData.anonymous}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="Enter student ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="ECE">Electronics &amp; Communication</option>
                    <option value="EEE">Electrical &amp; Electronics</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="AIDS">AI &amp; Data Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Grievance Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="grievanceType"
                    value={formData.grievanceType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Type</option>
                    <option value="academic">Academic Issues</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="administrative">Administrative</option>
                    <option value="discrimination">Discrimination</option>
                    <option value="harassment">Harassment</option>
                    <option value="other">Other Issues</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Brief subject of your grievance"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                  placeholder="Please provide detailed information about your grievance..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">{formData.description.length}/500 characters</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Submit this grievance anonymously
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Submitting...
                  </span>
                ) : (
                  'Submit Grievance'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-checkbox-circle-line text-5xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Grievance Submitted</h3>
            <p className="text-gray-600 mb-6">
              Your grievance has been received and will be addressed within 7 working days. You will be contacted soon.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}
