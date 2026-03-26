import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function ICCPage() {
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
    employeeId: '',
    department: '',
    complaintType: '',
    incidentDate: '',
    incidentDetails: '',
    witnessDetails: '',
    anonymous: false
  });
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Committees', path: '#' },
    { label: 'Internal Complaints Committee', path: '/committees/icc' }
  ];

  const committeeMembers = [
    {
      name: 'Dr. M. Kavitha',
      designation: 'Professor, CSE',
      role: 'Presiding Officer',
      email: 'kavitha.cse@dmiengg.edu.in',
      phone: '+91 4652 230145',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20formal%20business%20attire%20office%20setting%20confident%20senior%20academic%20leader%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-kavitha-002&orientation=squarish'
    },
    {
      name: 'Dr. P. Lakshmi',
      designation: 'Associate Professor, ECE',
      role: 'Member',
      email: 'lakshmi.ece@dmiengg.edu.in',
      phone: '+91 4652 230156',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20associate%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-lakshmi-002&orientation=squarish'
    },
    {
      name: 'Ms. S. Priya',
      designation: 'Assistant Professor, IT',
      role: 'Member',
      email: 'priya.it@dmiengg.edu.in',
      phone: '+91 4652 230167',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20assistant%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-priya-002&orientation=squarish'
    },
    {
      name: 'Ms. R. Deepa',
      designation: 'NGO Representative',
      role: 'External Member',
      email: 'deepa.ngo@example.org',
      phone: '+91 9876543212',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20ngo%20representative%20formal%20attire%20office%20setting%20confident%20social%20worker%20activist%20clean%20simple%20background%20portrait&width=400&height=400&seq=ngo-deepa-001&orientation=squarish'
    },
    {
      name: 'Mr. K. Rajesh',
      designation: 'Associate Professor, Mechanical',
      role: 'Member',
      email: 'rajesh.mech@dmiengg.edu.in',
      phone: '+91 4652 230178',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20male%20associate%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-rajesh-002&orientation=squarish'
    }
  ];

  const objectives = [
    {
      icon: 'ri-shield-user-line',
      title: 'Prevention of Harassment',
      description: 'Create and maintain a workplace free from sexual harassment through awareness and preventive measures.'
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'Complaint Redressal',
      description: 'Provide a fair, impartial, and time-bound mechanism for addressing complaints of sexual harassment.'
    },
    {
      icon: 'ri-user-voice-line',
      title: 'Awareness Programs',
      description: 'Conduct regular workshops and training sessions on prevention of sexual harassment at workplace.'
    },
    {
      icon: 'ri-lock-password-line',
      title: 'Confidentiality',
      description: 'Ensure complete confidentiality of complainants, witnesses, and all proceedings of the committee.'
    },
    {
      icon: 'ri-scales-3-line',
      title: 'Fair Investigation',
      description: 'Conduct thorough and unbiased investigations following principles of natural justice.'
    },
    {
      icon: 'ri-heart-pulse-line',
      title: 'Support Services',
      description: 'Provide counseling and support services to complainants throughout the process.'
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
      employeeId: '',
      department: '',
      complaintType: '',
      incidentDate: '',
      incidentDetails: '',
      witnessDetails: '',
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
      <div className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <i className="ri-shield-user-line text-6xl"></i>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">
            Internal Complaints Committee
          </h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Committed to preventing and addressing sexual harassment at workplace as per POSH Act 2013
          </p>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-phone-line text-3xl text-white"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Confidential Helpline</h3>
                <p className="text-gray-600">Report incidents with complete confidentiality</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+914652230145" className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap">
                <i className="ri-phone-fill"></i>
                +91 4652 230145
              </a>
              <a href="mailto:icc@dmiengg.edu.in" className="flex items-center gap-2 bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors whitespace-nowrap">
                <i className="ri-mail-fill"></i>
                icc@dmiengg.edu.in
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
              The Internal Complaints Committee (ICC) at DMI Engineering College is constituted as per the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. The committee is dedicated to providing a safe, secure, and dignified work environment for all women employees and students.
            </p>
            <p>
              The ICC is empowered to receive complaints of sexual harassment, conduct inquiries, and recommend appropriate action. The committee comprises senior faculty members including at least one external member from an NGO or association committed to women's causes.
            </p>
            <p>
              We ensure complete confidentiality of complainants and witnesses, conduct fair and time-bound investigations, and provide necessary support services including counseling. All proceedings are conducted following principles of natural justice.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Objectives</h2>
          <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
            Key focus areas to ensure a safe and respectful workplace environment
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${objective.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{objective.title}</h3>
                <p className="text-gray-600 leading-relaxed">{objective.description}</p>
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
            Experienced professionals committed to ensuring workplace safety and dignity
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {committeeMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-purple-100 to-violet-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-3">
                    {member.role}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-gray-600 font-semibold mb-4">{member.designation}</p>
                  <div className="space-y-2">
                    <a href={`mailto:${member.email}`} className="flex items-center text-sm text-gray-700 hover:text-purple-600 transition-colors">
                      <i className="ri-mail-line mr-2 text-purple-600 w-5 h-5 flex items-center justify-center"></i>
                      {member.email}
                    </a>
                    <a href={`tel:${member.phone}`} className="flex items-center text-sm text-gray-700 hover:text-purple-600 transition-colors">
                      <i className="ri-phone-line mr-2 text-purple-600 w-5 h-5 flex items-center justify-center"></i>
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complaint Form */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-shield-2-line text-4xl text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">File a Complaint</h2>
              <p className="text-gray-600 text-lg">
                Your complaint will be handled with utmost confidentiality and sensitivity
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-100"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-100"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Employee/Student ID {!formData.anonymous && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    required={!formData.anonymous}
                    disabled={formData.anonymous}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="Enter ID"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="ECE">Electronics &amp; Communication</option>
                    <option value="EEE">Electrical &amp; Electronics</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="AIDS">AI &amp; Data Science</option>
                    <option value="Administration">Administration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Complaint Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Type</option>
                    <option value="verbal">Verbal Harassment</option>
                    <option value="physical">Physical Harassment</option>
                    <option value="visual">Visual Harassment</option>
                    <option value="written">Written Harassment</option>
                    <option value="cyber">Cyber Harassment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Incident Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleInputChange}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Incident Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="incidentDetails"
                  value={formData.incidentDetails}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Please provide detailed information about the incident..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">{formData.incidentDetails.length}/500 characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Witness Details (if any)
                </label>
                <textarea
                  name="witnessDetails"
                  value={formData.witnessDetails}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Names and contact details of witnesses..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">{formData.witnessDetails.length}/500 characters</p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Submit this complaint anonymously
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Submitting...
                  </span>
                ) : (
                  'Submit Complaint'
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Complaint Submitted</h3>
            <p className="text-gray-600 mb-6">
              Your complaint has been received and will be investigated with utmost confidentiality. You will be contacted within 48 hours.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap"
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
