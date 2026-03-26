import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';
 
export default function AdministrationPage() {
  // Line 7
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
 
  const leadership = [
    {
      name: 'Dr.A.Albert Raj',
      position: 'Principal',
      qualification: 'Ph.D., M.E., B.E.',
      experience: '25+ Years',
      specialization: 'Computer Science & Engineering',
      email: 'principal@dmiengg.edu.in',
      phone: '+91 4652 290 244',
      image: 'https://media.licdn.com/dms/image/v2/C5103AQHyD1VA9VUp_w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1572521409356?e=2147483647&v=beta&t=Z1X0d4Iw-DtGWhIV0DAHAYooWpK790izO4s3c5UMAyE',
      message: 'Leading DMI Engineering College towards excellence in technical education, research, and innovation. Our commitment is to nurture future-ready engineers with strong ethical values and global competence.'
    },
  ];
 
  const hods = [
    {
      name: 'Dr. I. Edwin Albet',
      department: 'Computer Science & Engineering',
      qualification: 'Ph.D., M.E.',
      email: 'hod.cse@dmiengg.edu.in',
      image: 'https://image2url.com/r2/default/images/1774242223046-93fa61a3-34ca-478e-898b-fc44d96bac35.jpeg'
    },
    {
      name: 'Dr.Baron Sam ',
      department: 'Artificial Intelligence & Data Science',
      qualification: 'Ph.D., M.Tech.,B Aid',
      email: 'hod.it@dmiengg.edu.in',
      image: 'https://image2url.com/r2/default/images/1774242021097-e49ba490-99c5-490d-a974-d6ed92e81c70.jpeg'
    },
    {
      name: 'Dr. Cybi Sinthiya',
      department: 'Information Technology',
      qualification: 'Ph.D., M.E.',
      email: 'hod.ece@dmiengg.edu.in',
      image: 'https://image2url.com/r2/default/images/1774241935909-e4cd9917-ea6d-4773-bd6c-e165781fd4eb.jpeg'
    },
    {
      name: 'Dr. Athony Freeda Rani',
      department: 'Electrical & Electronics Engineering',
      qualification: 'Ph.D., M.E.',
      email: 'hod.eee@dmiengg.edu.in',
      image: 'https://image2url.com/r2/default/images/1774241977979-2f3930ac-ddfe-4e5a-8929-2c250bd5e302.jpeg'
    },
    {
      name: 'Dr.  Pratheeba. ',
      department: 'Electrical & Communication Engineering',
      qualification: 'Ph.D., M.E.',
      email: 'hod.eee@dmiengg.edu.in',
      image: 'https://image2url.com/r2/default/images/1774242245222-961f59ee-ab37-4702-84ea-a9a333fc62f8.jpeg'
    },
    {
      name: 'Dr. Mahil Loo Cristopher',
      department: 'Mechanical Engineering',
      qualification: 'Ph.D., M.E.',
      email: 'hod.mech@dmiengg.edu.in',
      image: 'https://image2url.com/r2/default/images/1774243279785-44ab3144-4c57-442a-837a-07d04ac56aef.jpeg'
    },
  ];
 
  const adminStaff = [

    {
      name: 'Mr.V.Christal Anto',
      position: 'Examination Controller',
      department: 'Examinations',
      email: 'coe@dmiengg.edu.in',
      phone: '+91 4652 290 249'
    },
    {
      name: 'Mr.K.Sanu Kailordson',
      position: 'Training & Placement Officer',
      department: 'Placement',
      email: 'placement@dmiengg.edu.in',
      phone: '+91 4652 290 250'
    },
    {
      name: 'Dr.J.Merin Joshiba',
      position: 'Dean - Research & Development',
      department: 'R&D',
      email: 'dean.rd@dmiengg.edu.in',
      phone: '+91 4652 290 251'
    }
  ];
 
  return (
    <div className="min-h-screen bg-white">
      {/* animation:none stops the navbar slide-down animation causing the gap */}
      <div style={{ animation: 'none' }}>
        <Navbar scrolled={scrolled} />
      </div>

      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white pb-6 pt-[72px] 2xl:pt-[120px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="hover:text-indigo-200 transition-colors whitespace-nowrap">Home</a>
            <i className="ri-arrow-right-s-line text-indigo-300"></i>
            <span className="text-indigo-100 whitespace-nowrap">About</span>
            <i className="ri-arrow-right-s-line text-indigo-300"></i>
            <span className="text-white whitespace-nowrap">Administration</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">Administration</h1>
        </div>
      </div>
 
      {/* Leadership Section */}
      <div className="py-16 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visionary leaders guiding DMI Engineering college towards academic excellence
            </p>
          </div>
 
          <div className="space-y-12">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  <div className="md:col-span-1">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 whitespace-nowrap">
                      {leader.position}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                    <p className="text-lg text-gray-600 mb-4">{leader.qualification}</p>
 
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-700">
                        <i className="ri-briefcase-line text-indigo-600 mr-3 text-xl"></i>
                        <div>
                          <div className="text-sm text-gray-500">Experience</div>
                          <div className="font-semibold whitespace-nowrap">{leader.experience}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <i className="ri-book-line text-indigo-600 mr-3 text-xl"></i>
                        <div>
                          <div className="text-sm text-gray-500">Specialization</div>
                          <div className="font-semibold">{leader.specialization}</div>
                        </div>
                      </div>
                    </div>
 
                    <div className="bg-indigo-50 p-6 rounded-xl mb-6">
                      <p className="text-gray-700 italic leading-relaxed">"{leader.message}"</p>
                    </div>
 
                    <div className="flex flex-wrap gap-4">
                      <a href={`mailto:${leader.email}`} className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
                        <i className="ri-mail-line mr-2"></i>
                        <span className="text-sm">{leader.email}</span>
                      </a>
                      <a href={`tel:${leader.phone}`} className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
                        <i className="ri-phone-line mr-2"></i>
                        <span className="text-sm whitespace-nowrap">{leader.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* Heads of Departments */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Heads of Departments</h2>
            <p className="text-lg text-gray-600">Leading experts driving departmental excellence</p>
          </div>
 
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hods.map((hod, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={hod.image}
                    alt={hod.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{hod.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 whitespace-nowrap">{hod.qualification}</p>
                  <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-4">
                    {hod.department}
                  </div>
                  <a href={`mailto:${hod.email}`} className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
                    <i className="ri-mail-line mr-2"></i>
                    <span className="text-sm">{hod.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* Administrative Staff */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Administrative Staff</h2>
            <p className="text-lg text-gray-600">Dedicated professionals ensuring smooth institutional operations</p>
          </div>
 
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminStaff.map((staff, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-full mr-4 flex-shrink-0">
                    <i className="ri-user-line text-xl text-indigo-600"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{staff.name}</h3>
                    <p className="text-sm text-indigo-600 font-semibold mb-1 whitespace-nowrap">{staff.position}</p>
                    <p className="text-xs text-gray-500 whitespace-nowrap">{staff.department}</p>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <a href={`mailto:${staff.email}`} className="flex items-center text-sm text-gray-700 hover:text-indigo-600 transition-colors">
                    <i className="ri-mail-line mr-2 text-indigo-600"></i>
                    <span>{staff.email}</span>
                  </a>
                  <a href={`tel:${staff.phone}`} className="flex items-center text-sm text-gray-700 hover:text-indigo-600 transition-colors">
                    <i className="ri-phone-line mr-2 text-indigo-600"></i>
                    <span className="whitespace-nowrap">{staff.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* Organizational Structure */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Organizational Structure</h2>
            <p className="text-lg text-gray-600">Hierarchical framework ensuring efficient governance</p>
          </div>
 
          <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl shadow-lg">
                  <div className="font-bold text-lg whitespace-nowrap">Governing Council</div>
                </div>
              </div>
 
              <div className="flex justify-center">
                <div className="w-1 h-12 bg-indigo-300"></div>
              </div>
 
              <div className="text-center">
                <div className="inline-block bg-indigo-500 text-white px-8 py-4 rounded-xl shadow-lg">
                  <div className="font-bold text-lg whitespace-nowrap">Principal</div>
                </div>
              </div>
 
              <div className="flex justify-center">
                <div className="w-1 h-12 bg-indigo-300"></div>
              </div>
 
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  
                </div>
                <div className="text-center">
                  <div className="bg-indigo-400 text-white px-6 py-3 rounded-lg shadow-md">
                    <div className="font-semibold whitespace-nowrap">Dean R&D</div>
                  </div>
                </div>
                <div className="text-center">
                 
                </div>
              </div>
 
              <div className="flex justify-center">
                <div className="w-1 h-12 bg-indigo-300"></div>
              </div>
 
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['HOD - CSE', 'HOD - IT', 'HOD - ECE', 'HOD - EEE', 'HOD - Mech', 'HOD - AI&DS'].map((dept, index) => (
                  <div key={index} className="bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg text-center font-semibold text-sm whitespace-nowrap">
                    {dept}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
 
      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </div>
  );
}

