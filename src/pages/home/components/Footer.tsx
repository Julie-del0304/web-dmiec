import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <>
      <footer className="bg-purple-700 text-white">
        {/* CTA Strip */}
        <div className="bg-purple-800 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <span className="text-white font-semibold text-lg">Admissions Open 2025–26</span>
              <span className="ml-3 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
                Counselling Code: 4946
              </span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => window.open('https://admissions.dmifoundations.org/dmi-engineering-college-application-form', '_blank')}
                className="bg-yellow-400 text-purple-900 px-5 py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition-colors cursor-pointer whitespace-nowrap">
                Admissions 2026-27
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="https://static.readdy.ai/image/aed2a83e7960c786dd7bda1b18d3e021/03378c8fff0e87b1630499bbdd646dab.jpeg"
                  alt="DMI Engineering College Logo" className="h-12 w-12 object-contain" />
                <div>
                  <h3 className="text-base font-bold leading-tight">DMI Engineering College</h3>
                  <p className="text-xs text-slate-400">Aralvaimozhi, Tamil Nadu</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                A premier engineering institution committed to excellence in education, research, and innovation since 1994.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: 'ri-facebook-fill', href: 'https://facebook.com' },
                  { icon: 'ri-twitter-fill', href: 'https://twitter.com' },
                  { icon: 'ri-linkedin-fill', href: 'https://linkedin.com' },
                  { icon: 'ri-instagram-fill', href: 'https://instagram.com' },
                  { icon: 'ri-youtube-fill', href: 'https://youtube.com' },
                ].map(({ icon, href }) => (
                  <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center bg-purple-800 rounded-full hover:bg-yellow-400 hover:text-purple-900 transition-colors cursor-pointer">
                    <i className={`${icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'About DMI', path: '/about/overview' },
                  { label: 'Privacy Policy', path: '/privacy-policy' },
                  { label: 'Innovation Cell', path: '/innovation/iic' },
                  { label: 'Placement Cell', path: '/placement/cell' },
                  { label: 'Research & Publications', path: '/research/publications' },
                  { label: 'NAAC Documents', path: '/naac/ssr' },
                  { label: 'Alumni', path: '/alumni/registration' },
                  { label: 'Gallery', path: '/gallery/images' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="text-purple-100 hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                      <i className="ri-arrow-right-s-line text-yellow-400 text-xs"></i>{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Departments */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Departments</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'Computer Science & Engg.', path: '/departments/cse' },
                  { label: 'Information Technology', path: '/departments/it' },
                  { label: 'AI & Data Science', path: '/departments/aids' },
                  { label: 'Electronics & Comm.', path: '/departments/ece' },
                  { label: 'Electrical & Electronics', path: '/departments/eee' },
                  { label: 'Mechanical Engineering', path: '/departments/mechanical' },
                  { label: 'Science & Humanities', path: '/courses/science-humanities' },
                ].map(({ label, path }) => (
                  <li key={path}>
                    <Link to={path} className="text-purple-100 hover:text-yellow-300 transition-colors flex items-center gap-1.5">
                      <i className="ri-arrow-right-s-line text-yellow-400 text-xs"></i>{label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <i className="ri-map-pin-line text-yellow-400 mt-0.5 flex-shrink-0"></i>
                  <span>Aralvaimozhi, Kanyakumari District,<br />Tamil Nadu – 629 301, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-phone-line text-yellow-400 flex-shrink-0"></i>
                  <a href="tel:+914651234567" className="hover:text-yellow-300 transition-colors">+91 4651 234567</a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-mail-line text-yellow-400 flex-shrink-0"></i>
                  <a href="mailto:info@dmiengg.edu.in" className="hover:text-yellow-300 transition-colors">info@dmiengg.edu.in</a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-global-line text-yellow-400 flex-shrink-0"></i>
                  <a href="https://dmiengg.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">www.dmiengg.edu.in</a>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Counselling Code</p>
                <p className="text-2xl font-bold text-yellow-400">4946</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-purple-500 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-400 text-xs">
              © 2025 DMI Engineering College. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-xs">
              <Link to="/privacy-policy" className="text-slate-300 hover:text-yellow-300 transition-colors">Privacy Policy</Link>
              <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-yellow-300 transition-colors">
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}