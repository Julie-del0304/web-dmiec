
import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function DistinguishedAlumniPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const alumni = [
    { name: 'Rajesh Kumar', batch: '2010', dept: 'CSE', role: 'Senior Software Engineer', company: 'Google, USA', achievement: 'Led the development of core search infrastructure serving billions of users globally.', img: 'https://readdy.ai/api/search-image?query=professional%20Indian%20male%20software%20engineer%20headshot%20corporate%20attire%20confident%20smile%20clean%20background&width=300&height=300&seq=alumni-1&orientation=squarish' },
    { name: 'Priya Suresh', batch: '2012', dept: 'ECE', role: 'VLSI Design Engineer', company: 'Qualcomm, Bangalore', achievement: 'Holds 3 patents in semiconductor design and received the Young Innovator Award 2022.', img: 'https://readdy.ai/api/search-image?query=professional%20Indian%20female%20engineer%20headshot%20corporate%20attire%20confident%20smile%20clean%20background&width=300&height=300&seq=alumni-2&orientation=squarish' },
    { name: 'Arun Selvam', batch: '2008', dept: 'Mechanical', role: 'Project Manager', company: 'L&T Construction, Chennai', achievement: 'Managed infrastructure projects worth over ₹500 crore across Tamil Nadu.', img: 'https://readdy.ai/api/search-image?query=professional%20Indian%20male%20project%20manager%20headshot%20formal%20attire%20confident%20clean%20background&width=300&height=300&seq=alumni-3&orientation=squarish' },
    { name: 'Deepa Nair', batch: '2014', dept: 'IT', role: 'Data Scientist', company: 'Amazon, Hyderabad', achievement: 'Published 5 research papers in AI/ML and mentors 200+ students through online platforms.', img: 'https://readdy.ai/api/search-image?query=professional%20Indian%20female%20data%20scientist%20headshot%20smart%20casual%20attire%20confident%20clean%20background&width=300&height=300&seq=alumni-4&orientation=squarish' },
    { name: 'Karthik Rajan', batch: '2011', dept: 'EEE', role: 'Electrical Systems Lead', company: 'BHEL, Trichy', achievement: 'Contributed to the design of power distribution systems for 3 major power plants in India.', img: 'https://readdy.ai/api/search-image?query=professional%20Indian%20male%20electrical%20engineer%20headshot%20formal%20attire%20confident%20clean%20background&width=300&height=300&seq=alumni-5&orientation=squarish' },
    { name: 'Meena Chandran', batch: '2016', dept: 'AI & DS', role: 'AI Research Scientist', company: 'Microsoft Research, Bangalore', achievement: 'Developed NLP models used in Microsoft Office suite, impacting millions of users worldwide.', img: 'https://readdy.ai/api/search-image?query=professional%20Indian%20female%20AI%20researcher%20headshot%20smart%20attire%20confident%20clean%20background&width=300&height=300&seq=alumni-6&orientation=squarish' },
  ];

  const departments = ['All', 'CSE', 'IT', 'AI & DS', 'ECE', 'EEE', 'Mechanical'];
  const filtered = activeFilter === 'All' ? alumni : alumni.filter(a => a.dept === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 py-14 px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-amber-200 mb-2">
              <span>Home</span> <span className="mx-2">/</span>
              <span>Alumni</span> <span className="mx-2">/</span>
              <span className="text-white font-medium">Distinguished Alumni</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">Distinguished Alumni</h1>
            <p className="text-amber-100 mt-2">Celebrating the achievements of our proud graduates who are making a difference worldwide</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {departments.map(dept => (
              <button key={dept} onClick={() => setActiveFilter(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeFilter === dept ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-600'}`}>
                {dept}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((person, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                    <img src={person.img} alt={person.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{person.name}</h3>
                  <p className="text-sm text-amber-600 font-medium">{person.role}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{person.company}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="bg-sky-100 text-sky-700 text-xs px-2 py-0.5 rounded-full">{person.dept}</span>
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">Batch {person.batch}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start gap-2">
                    <i className="ri-award-line text-amber-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <p className="text-sm text-slate-600 leading-relaxed">{person.achievement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
