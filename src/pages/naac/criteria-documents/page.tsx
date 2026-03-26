
import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function NaacCriteriaPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const criteria = [
    { num: 'I', title: 'Curricular Aspects', desc: 'Curriculum design, development, and delivery processes.', docs: ['Curriculum Framework 2024', 'BOS Meeting Minutes', 'Academic Calendar'] },
    { num: 'II', title: 'Teaching-Learning & Evaluation', desc: 'Student enrolment, teaching quality, and examination processes.', docs: ['Teaching Plan Templates', 'Examination Results Summary', 'Student Feedback Analysis'] },
    { num: 'III', title: 'Research, Innovations & Extension', desc: 'Research output, innovation, and community engagement.', docs: ['Research Publications List', 'Funded Projects Summary', 'Extension Activity Reports'] },
    { num: 'IV', title: 'Infrastructure & Learning Resources', desc: 'Physical and digital infrastructure for learning.', docs: ['Infrastructure Audit Report', 'Library Holdings', 'IT Infrastructure Details'] },
    { num: 'V', title: 'Student Support & Progression', desc: 'Student welfare, placement, and alumni engagement.', docs: ['Placement Statistics', 'Scholarship Details', 'Alumni Engagement Report'] },
    { num: 'VI', title: 'Governance, Leadership & Management', desc: 'Institutional governance and financial management.', docs: ['Governance Structure', 'Budget Utilization', 'Strategic Plan 2024–29'] },
    { num: 'VII', title: 'Institutional Values & Best Practices', desc: 'Environmental sustainability and institutional best practices.', docs: ['Best Practices Document', 'Green Campus Initiatives', 'Gender Sensitization Report'] },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        <div className="bg-gradient-to-r from-teal-700 to-teal-500 py-14 px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-teal-200 mb-2">
              <span>Home</span> <span className="mx-2">/</span>
              <span>NAAC</span> <span className="mx-2">/</span>
              <span className="text-white font-medium">Criteria Documents</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">Criteria Documents</h1>
            <p className="text-teal-100 mt-2">NAAC Assessment Criteria — Supporting documents for all 7 criteria</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="space-y-6">
            {criteria.map((c) => (
              <div key={c.num} className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center gap-4 p-5 border-b border-slate-50">
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-600 rounded-lg flex-shrink-0">
                    <span className="text-white font-bold text-lg">{c.num}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Criterion {c.num}: {c.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{c.desc}</p>
                  </div>
                </div>
                <div className="p-5 flex flex-wrap gap-3">
                  {c.docs.map((doc) => (
                    <a key={doc} href="#"
                      className="flex items-center gap-2 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 text-slate-700 hover:text-teal-700 px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer">
                      <i className="ri-file-pdf-line text-red-500"></i>
                      {doc}
                      <i className="ri-download-line text-xs"></i>
                    </a>
                  ))}
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
