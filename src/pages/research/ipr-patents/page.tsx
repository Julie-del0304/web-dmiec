
import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function ResearchIprPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'patents' | 'copyrights' | 'trademarks'>('patents');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const patents = [
    { title: 'Smart Irrigation System Using IoT Sensors', inventors: 'Dr. R. Priya, Mr. K. Arun', appNo: 'IN202341012345', status: 'Published', year: '2023', dept: 'EEE' },
    { title: 'AI-Based Pothole Detection Algorithm for Road Safety', inventors: 'Dr. S. Anand, Ms. P. Deepa', appNo: 'IN202241098765', status: 'Granted', year: '2022', dept: 'AI & DS' },
    { title: 'Blockchain-Enabled Secure Voting System', inventors: 'Dr. K. Murugan, Mr. R. Selvam', appNo: 'IN202341054321', status: 'Filed', year: '2023', dept: 'CSE' },
    { title: 'Low-Cost Water Purification Device Using Nano-Filtration', inventors: 'Dr. A. Rajan, Dr. M. Kavitha', appNo: 'IN202141076543', status: 'Granted', year: '2021', dept: 'Mechanical' },
    { title: 'Energy-Efficient VLSI Architecture for Edge Computing', inventors: 'Dr. P. Selvam, Ms. S. Nithya', appNo: 'IN202441023456', status: 'Filed', year: '2024', dept: 'ECE' },
  ];

  const copyrights = [
    { title: 'E-Learning Platform for Engineering Students', author: 'Dr. K. Murugan', regNo: 'SW-2023-001234', year: '2023', type: 'Software' },
    { title: 'Tamil Language NLP Toolkit', author: 'Dr. M. Kavitha', regNo: 'SW-2022-005678', year: '2022', type: 'Software' },
    { title: 'Digital Library Management System', author: 'IT Department Team', regNo: 'SW-2021-009012', year: '2021', type: 'Software' },
  ];

  const statusColor = (s: string) => {
    if (s === 'Granted') return 'bg-green-100 text-green-700';
    if (s === 'Published') return 'bg-sky-100 text-sky-700';
    return 'bg-amber-100 text-amber-700';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        <div className="bg-gradient-to-r from-rose-700 to-rose-500 py-14 px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-rose-200 mb-2">
              <span>Home</span><span className="mx-2">/</span>
              <span>Research</span><span className="mx-2">/</span>
              <span className="text-white font-medium">IPR / Patents</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">IPR / Patents</h1>
            <p className="text-rose-100 mt-2">Intellectual Property Rights — Patents, Copyrights & Trademarks filed by DMI Engineering College</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-6 mb-12">
            {[
              { value: '18', label: 'Patents Filed', icon: 'ri-lightbulb-line', color: 'bg-rose-100 text-rose-600' },
              { value: '7', label: 'Patents Granted', icon: 'ri-award-line', color: 'bg-green-100 text-green-600' },
              { value: '5', label: 'Copyrights', icon: 'ri-copyright-line', color: 'bg-sky-100 text-sky-600' },
              { value: '3', label: 'Trademarks', icon: 'ri-trademark-line', color: 'bg-amber-100 text-amber-600' },
            ].map(({ value, label, icon, color }) => (
              <div key={label} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm text-center">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-3 ${color}`}>
                  <i className={`${icon} text-2xl`}></i>
                </div>
                <p className="text-3xl font-bold text-slate-800">{value}</p>
                <p className="text-sm text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-slate-200">
            {(['patents', 'copyrights', 'trademarks'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-medium capitalize transition-colors cursor-pointer border-b-2 -mb-px ${activeTab === tab ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'patents' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-rose-600 text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Title</th>
                    <th className="px-4 py-3 text-left">Inventors</th>
                    <th className="px-4 py-3 text-left">App. No.</th>
                    <th className="px-4 py-3 text-left">Dept.</th>
                    <th className="px-4 py-3 text-left">Year</th>
                    <th className="px-4 py-3 text-left rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patents.map((p, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-medium text-slate-800 max-w-xs">{p.title}</td>
                      <td className="px-4 py-3 text-slate-600">{p.inventors}</td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-xs">{p.appNo}</td>
                      <td className="px-4 py-3 text-slate-600">{p.dept}</td>
                      <td className="px-4 py-3 text-slate-500">{p.year}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(p.status)}`}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'copyrights' && (
            <div className="space-y-4">
              {copyrights.map((c, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-sky-100 rounded-lg flex-shrink-0">
                    <i className="ri-copyright-line text-sky-600 text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{c.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{c.author} &nbsp;|&nbsp; Reg. No: {c.regNo} &nbsp;|&nbsp; {c.year}</p>
                  </div>
                  <span className="bg-sky-100 text-sky-700 text-xs font-medium px-3 py-1 rounded-full">{c.type}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trademarks' && (
            <div className="bg-slate-50 rounded-xl p-10 text-center">
              <i className="ri-trademark-line text-5xl text-slate-300 mb-4"></i>
              <p className="text-slate-500">Trademark details will be updated soon.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
