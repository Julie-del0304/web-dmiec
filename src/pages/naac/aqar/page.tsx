
import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function NaacAqarPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aqarReports = [
    { year: '2023–24', status: 'Submitted', date: 'June 30, 2024', size: '4.2 MB', url: '#' },
    { year: '2022–23', status: 'Submitted', date: 'June 30, 2023', size: '3.8 MB', url: '#' },
    { year: '2021–22', status: 'Submitted', date: 'June 30, 2022', size: '3.5 MB', url: '#' },
    { year: '2020–21', status: 'Submitted', date: 'June 30, 2021', size: '3.1 MB', url: '#' },
    { year: '2019–20', status: 'Submitted', date: 'June 30, 2020', size: '2.9 MB', url: '#' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 py-14 px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-indigo-200 mb-2">
              <span>Home</span> <span className="mx-2">/</span>
              <span>NAAC</span> <span className="mx-2">/</span>
              <span className="text-white font-medium">AQAR</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">AQAR</h1>
            <p className="text-indigo-100 mt-2">Annual Quality Assurance Report — Submitted to NAAC every year</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-lg flex-shrink-0">
                <i className="ri-information-line text-indigo-600 text-2xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">About AQAR</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The Annual Quality Assurance Report (AQAR) is a mandatory document submitted by NAAC-accredited institutions to the National Assessment and Accreditation Council every year. It reflects the quality initiatives undertaken by the institution during the academic year and tracks progress on various quality parameters.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-6">AQAR Reports</h2>
          <div className="space-y-4">
            {aqarReports.map((report) => (
              <div key={report.year} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-50 rounded-lg flex-shrink-0">
                    <i className="ri-file-pdf-line text-red-500 text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">AQAR {report.year}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Submitted: {report.date} &nbsp;|&nbsp; Size: {report.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">{report.status}</span>
                  <a href={report.url}
                    className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-download-line"></i> Download
                  </a>
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
