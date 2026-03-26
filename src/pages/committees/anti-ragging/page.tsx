
import { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function AntiRaggingPage() {
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
    year: '',
    incidentDate: '',
    incidentDetails: '',
    anonymous: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Committees', path: '#' },
    { label: 'Anti Ragging Committee', path: '/committees/anti-ragging' },
  ];

  const committeeMembers = [
    {
      name: 'Dr. S. Rajendran',
      designation: 'Principal',
      role: 'Chairperson',
      email: 'principal@dmiengg.edu.in',
      phone: '+91 4652 230123',
      image:'https://th.bing.com/th/id/OIP.oD-KFRo8rwZX6XpIAv6_wQHaHV?w=172&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    },
    {
      name: 'Dr. M. Kavitha',
      designation: 'Professor, CSE',
      role: 'Convener',
      email: 'kavitha.cse@dmiengg.edu.in',
      phone: '+91 4652 230145',
      image:
        'https://readdy.ai/api/search-image?query=professional%20indian%20female%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-kavitha-001&orientation=squarish',
    },
    {
      name: 'Mr. R. Kumar',
      designation: 'Associate Professor, ECE',
      role: 'Member',
      email: 'kumar.ece@dmiengg.edu.in',
      phone: '+91 4652 230156',
      image:
        'https://readdy.ai/api/search-image?query=professional%20indian%20male%20associate%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-kumar-001&orientation=squarish',
    },
    {
      name: 'Ms. P. Priya',
      designation: 'Assistant Professor, EEE',
      role: 'Member',
      email: 'priya.eee@dmiengg.edu.in',
      phone: '+91 4652 230167',
      image:
        'https://readdy.ai/api/search-image?query=professional%20indian%20female%20assistant%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-priya-001&orientation=squarish',
    },
    {
      name: 'Dr. A. Selvam',
      designation: 'Professor, Mechanical',
      role: 'Member',
      email: 'selvam.mech@dmiengg.edu.in',
      phone: '+91 4652 230178',
      image:
        'https://readdy.ai/api/search-image?query=professional%20indian%20male%20professor%20formal%20attire%20office%20setting%20confident%20academic%20educator%20clean%20simple%20background%20portrait&width=400&height=400&seq=prof-selvam-001&orientation=squarish',
    },
    {
      name: 'Ms. L. Lakshmi',
      designation: 'Student Representative',
      role: 'Student Member',
      email: 'lakshmi.student@dmiengg.edu.in',
      phone: '+91 9876543210',
      image:
        'https://readdy.ai/api/search-image?query=professional%20indian%20female%20college%20student%20formal%20attire%20campus%20setting%20confident%20young%20leader%20clean%20simple%20background%20portrait&width=400&height=400&seq=student-lakshmi-001&orientation=squarish',
    },
  ];

  const objectives = [
    {
      icon: 'ri-shield-check-line',
      title: 'Zero Tolerance Policy',
      description:
        'Maintain a strict zero-tolerance policy against ragging in all its forms within the campus premises.',
    },
    {
      icon: 'ri-eye-line',
      title: 'Vigilance & Monitoring',
      description:
        'Conduct regular monitoring and surprise inspections of hostels, common areas, and campus facilities.',
    },
    {
      icon: 'ri-user-voice-line',
      title: 'Awareness Programs',
      description:
        'Organize orientation programs and awareness sessions for students, parents, and staff about anti-ragging measures.',
    },
    {
      icon: 'ri-phone-line',
      title: '24/7 Helpline',
      description:
        'Provide round-the-clock helpline and complaint mechanism for reporting ragging incidents confidentially.',
    },
    {
      icon: 'ri-scales-3-line',
      title: 'Swift Action',
      description:
        'Ensure prompt investigation and appropriate disciplinary action against perpetrators of ragging.',
    },
    {
      icon: 'ri-heart-pulse-line',
      title: 'Counseling Support',
      description:
        'Provide psychological counseling and support services to victims of ragging incidents.',
    },
  ];

  /* ------------------------------------------------------------------ */
  /*  Input handling – robust with type‑guards and error handling       */
  /* ------------------------------------------------------------------ */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client‑side validation – ensure required fields are present
    if (!formData.anonymous) {
      const requiredFields = ['name', 'email', 'phone', 'studentId', 'department', 'year'];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          alert(`Please fill the ${field} field.`);
          return;
        }
      }
    }

    setSubmitting(true);
    try {
      // Simulate form submission – replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowModal(true);
      // Reset the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        studentId: '',
        department: '',
        year: '',
        incidentDate: '',
        incidentDetails: '',
        anonymous: false,
      });
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong while submitting the complaint. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  /* ------------------------------------------------------------------ */

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
      <div className="relative bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <i className="ri-shield-check-line text-6xl"></i>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">Anti Ragging Committee</h1>
          <p className="text-xl text-center text-white/90 max-w-3xl mx-auto">
            Committed to maintaining a safe, respectful, and ragging‑free campus environment for all
            students
          </p>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 border-y border-red-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-phone-line text-3xl text-white"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">24/7 Anti‑Ragging Helpline</h3>
                <p className="text-gray-600">Report incidents confidentially anytime</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+914652230123"
                className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-phone-fill"></i>+91 4652 230123
              </a>
              <a
                href="tel:1800180522"
                className="flex items-center gap-2 bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors whitespace-nowrap"
              >
                <i className="ri-phone-fill"></i>UGC Helpline: 1800-180-5522
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
              The Anti‑Ragging Committee at DMI Engineering College is constituted in compliance
              with UGC regulations and Supreme Court directives to prevent and eliminate ragging in
              all its forms. The committee is dedicated to creating a safe, secure, and conducive
              learning environment for all students.
            </p>
            <p>
              Ragging is a criminal offense and is strictly prohibited within the campus premises,
              hostels, and during any college‑related activities. The committee works proactively to
              prevent ragging through awareness programs, vigilance measures, and swift action
              against offenders.
            </p>
            <p>
              We encourage all students, parents, and staff to report any incidents of ragging
              immediately through our 24/7 helpline or online complaint portal. All complaints are
              treated with utmost confidentiality and investigated promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Our Objectives</h2>
          <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
            Key focus areas to ensure a ragging‑free campus environment
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center mb-6">
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
            Dedicated team working to ensure student safety and well‑being
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {committeeMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-red-100 to-rose-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full mb-3">
                    {member.role}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                  <p className="text-gray-600 font-semibold mb-4">{member.designation}</p>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center text-sm text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <i className="ri-mail-line mr-2 text-red-600 w-5 h-5 flex items-center justify-center"></i>
                      {member.email}
                    </a>
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center text-sm text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <i className="ri-phone-line mr-2 text-red-600 w-5 h-5 flex items-center justify-center"></i>
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
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-text-line text-4xl text-white"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Report an Incident</h2>
              <p className="text-gray-600 text-lg">
                Your complaint will be handled with strict confidentiality
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Student ID */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="Enter student ID"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
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

                {/* Year */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                  </select>
                </div>
              </div>

              {/* Incident Date */}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Incident Details */}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  placeholder="Please provide detailed information about the incident..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">
                  {formData.incidentDetails.length}/500 characters
                </p>
              </div>

              {/* Anonymous checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label className="ml-3 text-sm text-gray-700">Submit this complaint anonymously</label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>Submitting...
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
              Your complaint has been received and will be investigated promptly. You will be
              contacted soon.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap"
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
