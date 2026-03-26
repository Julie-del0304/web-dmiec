
import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function ResearchRdProjectsPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    { title: 'AI-Based Crop Disease Detection System', dept: 'AI & DS', pi: 'Dr. S. Anand', status: 'Ongoing', year: '2023–25', funding: '₹8.5 Lakhs', agency: 'DST-SERB' },
    { title: 'IoT-Enabled Smart Grid Monitoring', dept: 'EEE', pi: 'Dr. R. Priya', status: 'Ongoing', year: '2023–24', funding: '₹6.2 Lakhs', agency: 'TNSCST' },
    { title: 'Blockchain for Secure Academic Records', dept: 'CSE', pi: 'Dr. K. Murugan', status: 'Completed', year: '2021–23', funding: '₹5.0 Lakhs', agency: 'AICTE' },
    { title: 'Renewable Energy Harvesting from Ocean Waves', dept: 'EEE', pi: 'Dr. P. Selvam', status: 'Ongoing', year: '2024–26', funding: '₹12.0 Lakhs', agency: 'MNRE' },
    { title: 'NLP-Based Tamil Language Processing', dept: 'IT', pi: 'Dr. M. Kavitha', status: 'Completed', year: '2020–22', funding: '₹4.5 Lakhs', agency: 'DST' },
    { title: 'Lightweight Composite Materials for Aerospace', dept: 'Mechanical', pi: 'Dr. A. Rajan', status: 'Ongoing', year: '2023–25', funding: '₹9.8 Lakhs', agency: 'DRDO' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        <div className="bg-gradient-to-r from-violet-700 to-violet-500 py-14 px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-violet-200 mb-2">
              <span>Home</span><span className="mx-2">/</span>
              <span>Research</span><span className="mx-2">/</span>
              <span className="text-white font-medium">R&amp;D Projects</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">R&amp;D Projects</h1>
            <p className="text-violet-100 mt-2">Ongoing and completed research &amp; development projects at DMI Engineering College</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { value: '24+', label: 'Total Projects', icon: 'ri-flask-line', color: 'bg-violet-100 text-violet-600' },
              { value: '₹85L+', label: 'Total Funding', icon: 'ri-money-rupee-circle-line', color: 'bg-emerald-100 text-emerald-600' },
              { value: '12', label: 'Ongoing Projects', icon: 'ri-loader-line', color: 'bg-sky-100 text-sky-600' },
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

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-violet-600 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-lg">Project Title</th>
                  <th className="px-4 py-3 text-left">Dept.</th>
                  <th className="px-4 py-3 text-left">Principal Investigator</th>
                  <th className="px-4 py-3 text-left">Agency</th>
                  <th className="px-4 py-3 text-left">Funding</th>
                  <th className="px-4 py-3 text-left">Year</th>
                  <th className="px-4 py-3 text-left rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-medium text-slate-800">{p.title}</td>
                    <td className="px-4 py-3 text-slate-600">{p.dept}</td>
                    <td className="px-4 py-3 text-slate-600">{p.pi}</td>
                    <td className="px-4 py-3 text-slate-600">{p.agency}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">{p.funding}</td>
                    <td className="px-4 py-3 text-slate-500">{p.year}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === 'Ongoing' ? 'bg-sky-100 text-sky-700' : 'bg-green-100 text-green-700'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
