import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { toSlug } from '../../../services/clubService';
import clgname from '../../../public/images/clg-home.png';

interface NavbarProps {
  scrolled: boolean;
}

interface NavItem {
  name: string;
  path: string;
}

interface DropdownMenuProps {
  items: NavItem[];
  onNavigate: (path: string) => void;
  width?: string;
}

function DropdownMenu({ items, onNavigate, width = 'w-56' }: DropdownMenuProps) {
  return (
    <div className="absolute top-full left-0 pt-1 z-[999]">
      <div className={`${width} bg-white rounded-lg shadow-xl border border-slate-100 py-1`}>
        {items.map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [openMobileSubDropdown, setOpenMobileSubDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [clubsItems, setClubsItems] = useState<NavItem[]>([]);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase
      .from('clubs')
      .select('name, display_order')
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (data) {
          setClubsItems(data.map(club => ({
            name: club.name,
            path: `/co-curricular/clubs/${toSlug(club.name)}`,
          })));
        }
      });
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty('--navbar-height', `${headerRef.current.offsetHeight}px`);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    if (headerRef.current) observer.observe(headerRef.current);
    window.addEventListener('resize', updateHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'counseling-badge-anim';
    style.textContent = `
      @keyframes shimmer {
        0%   { background-position: -200% 0; }
        60%  { background-position: 200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    if (!document.getElementById('counseling-badge-anim')) {
      document.head.appendChild(style);
    }
    return () => { document.getElementById('counseling-badge-anim')?.remove(); };
  }, []);

  const handleNav = (path: string) => {
    navigate(path);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
    setMobileMenuOpen(false);
    setOpenMobileDropdown(null);
    setOpenMobileSubDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnter = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    }, 400);
  };

  const handleSubMouseEnter = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (subCloseTimer.current) clearTimeout(subCloseTimer.current);
    setOpenSubDropdown(key);
  };

  const handleSubMouseLeave = () => {
    subCloseTimer.current = setTimeout(() => setOpenSubDropdown(null), 300);
  };

  const toggleMobile = (key: string) => {
    setOpenMobileDropdown(openMobileDropdown === key ? null : key);
    setOpenMobileSubDropdown(null);
  };

  const toggleMobileSub = (key: string) => {
    setOpenMobileSubDropdown(openMobileSubDropdown === key ? null : key);
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setMobileMenuOpen(false);
  };

  const aboutItems: NavItem[] = [
    { name: 'DMI – An Overview', path: '/about/overview' },
    { name: 'Administration', path: '/about/administration' },
    { name: 'Governing Council', path: '/about/governing-council' },
    { name: 'Recruitment Policy', path: '/about/recruitment-policy' },
    { name: 'Service Rules', path: '/about/service-rules' },
  ];

  const coursesItems: NavItem[] = [
    { name: 'CSE', path: '/departments/cse' },
    { name: 'IT', path: '/departments/it' },
    { name: 'AI & DS', path: '/departments/aids' },
    { name: 'ECE', path: '/departments/ece' },
    { name: 'EEE', path: '/departments/eee' },
    { name: 'Mechanical', path: '/departments/mechanical' },
    { name: 'Science & Humanities', path: '/courses/science-humanities' },
  ];

  const facilitiesItems: NavItem[] = [
    { name: 'Infrastructure', path: '/facilities/infrastructure' },
    { name: 'Laboratory', path: '/facilities/laboratories' },
    { name: 'Library', path: '/facilities/library' },
    { name: 'Hostel', path: '/facilities/hostel' },
    { name: 'Transport', path: '/facilities/transportation' },
    { name: 'Canteen', path: '/facilities/canteen' },
    { name: 'Sports', path: '/facilities/sports' },
    { name: 'GYM', path: '/facilities/gym' },
  ];

  const membershipItems: NavItem[] = [
    { name: 'ICT Academy', path: '/co-curricular/membership/ict' },
    { name: 'ISTE', path: '/co-curricular/membership/iste' },
    { name: 'CSI', path: '/co-curricular/membership/csi' },
  ];

  const placementItems: NavItem[] = [
    { name: 'Placement Training', path: '/placement/cell' },
    { name: 'Placement Team', path: '/placement/teams' },
    { name: 'Placement Records', path: '/placement/records' },
    { name: 'Recruiters', path: '/placement/recruiters' },
    { name: 'EDC Cell', path: '/placement/edc' },
  ];

  const committeesItems: NavItem[] = [
    { name: 'Anti-Ragging Committee', path: '/committees/anti-ragging' },
    { name: 'Grievance Redressal Committee', path: '/committees/grievance' },
    { name: 'Internal Complaints Committee', path: '/committees/icc' },
    { name: 'IQAC', path: '/committees/iqac' },
  ];

  const researchItems: NavItem[] = [
    { name: 'Research Policy', path: '/research/policy' },
    { name: 'Publications', path: '/research/publications' },
    { name: 'R&D Projects', path: '/research/rd-projects' },
    { name: 'Funded Projects', path: '/research/funded-projects' },
    { name: 'COE', path: '/research/coe' },
  ];

  const galleryItems: NavItem[] = [
    { name: 'Images', path: '/gallery/images' },
    { name: 'Videos', path: '/gallery/videos' },
  ];

  const naacItems: NavItem[] = [
    { name: 'IIQA', path: '/naac/iiqa' },
    { name: 'SSR', path: '/naac/ssr' },
    { name: 'RTI', path: '/naac/rit' },
    { name: 'Self Declaration', path: '/naac/self-declaration' },
  ];

  const alumniItems: NavItem[] = [
    { name: 'Alumni Registration', path: '/alumni/registration' },
    { name: 'Alumni Meet', path: '/alumni/meet' },
    { name: 'Distinguished Alumni', path: '/alumni/distinguished' },
  ];

  const innovationItems: NavItem[] = [
    { name: 'Startup', path: '/innovation/startup' },
    { name: 'Incubation', path: '/innovation/incubation' },
    { name: 'IIC', path: '/innovation/iic' },
  ];

  const DesktopDropdown = ({
    label, menuKey, items, width, children,
  }: {
    label: string; menuKey: string; items?: NavItem[]; width?: string; children?: React.ReactNode;
  }) => (
    <div className="relative" onMouseEnter={() => handleMouseEnter(menuKey)} onMouseLeave={handleMouseLeave}>
      <button className="text-sm xl:text-base font-semibold transition-colors whitespace-nowrap cursor-pointer flex items-center text-slate-700 hover:text-sky-600 gap-0.5 py-1">
        {label}
        <i className={`ri-arrow-down-s-line text-base transition-transform ${openDropdown === menuKey ? 'rotate-180' : ''}`}></i>
      </button>
      {openDropdown === menuKey && (
        children ? children : items ? <DropdownMenu items={items} onNavigate={handleNav} width={width} /> : null
      )}
    </div>
  );

  const MobileSection = ({ label, menuKey, children }: { label: string; menuKey: string; children: React.ReactNode }) => (
    <div className="border-b border-slate-100">
      <button onClick={() => toggleMobile(menuKey)}
        className="flex items-center justify-between w-full text-left text-slate-700 hover:text-sky-600 font-medium cursor-pointer py-3 text-sm">
        {label}
        <i className={`ri-arrow-down-s-line text-lg transition-transform ${openMobileDropdown === menuKey ? 'rotate-180' : ''}`}></i>
      </button>
      {openMobileDropdown === menuKey && (
        <div className="ml-3 mb-2 space-y-0.5 border-l-2 border-sky-100 pl-3">{children}</div>
      )}
    </div>
  );

  const MobileLinkList = ({ items }: { items: NavItem[] }) => (
    <>
      {items.map(item => (
        <button key={item.path} onClick={() => handleNav(item.path)}
          className="block w-full text-left text-sm text-slate-600 hover:text-sky-600 cursor-pointer py-2">
          {item.name}
        </button>
      ))}
    </>
  );

  return (
    <header
      ref={headerRef}
      className={`fixed z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      style={{ left: 0, right: 0, top: 'var(--ticker-height, 0px)', overflow: 'visible' }}
    >
      {/* Top strip */}
      <div className="flex items-center justify-between px-3 sm:px-5 lg:px-8 py-1.5 border-b border-slate-100 w-full">
        <button onClick={handleHomeClick}
          className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 text-left p-0 bg-transparent border-0"
          style={{ background: 'none' }}>
          <img
            src={clgname}
            alt="DMI Engineering College"
            className="object-contain flex-shrink-0"
            style={{ height: 'clamp(55px, 8vw, 95px)', width: 'auto', maxWidth: '380px' }}
          />
        </button>

        {/* Badges — desktop */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0 ml-3">
          <div className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 cursor-default overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #114bca, #2563eb)', boxShadow: '0 0 12px 3px rgba(16,12,222,0.4)' }}>
            <span className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
              backgroundSize: '200% 100%', animation: 'shimmer 2s ease-in-out infinite',
            }} />
            <i className="ri-award-fill text-white text-sm relative z-10"></i>
            <span className="text-sm font-bold text-white whitespace-nowrap relative z-10">
              <span className="hidden md:inline">Counseling </span>Code:{' '}
              <strong className="text-yellow-300">4946</strong>
            </span>
          </div>

          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); navigate('/application'); }}
            className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 cursor-pointer overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #ca8a04, #eab308)', border: 'none', boxShadow: '0 0 12px 3px rgba(202,138,4,0.4)' }}>
            <span className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
              backgroundSize: '200% 100%', animation: 'shimmer 2.5s ease-in-out infinite',
            }} />
            <i className="ri-graduation-cap-fill text-black text-sm relative z-10"></i>
            <span className="text-sm font-bold text-black whitespace-nowrap relative z-10">
              Admissions
            </span>
          </button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden w-10 h-10 flex items-center justify-center flex-shrink-0 ml-2" aria-label="Toggle navigation">
          <i className={`text-2xl text-slate-800 ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
        </button>
      </div>

      {/* Desktop nav */}
      <nav className="hidden xl:block w-full px-4 bg-white border-t border-slate-100" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-center h-10 gap-3 2xl:gap-5 flex-wrap" style={{ overflow: 'visible' }}>
          <button onClick={handleHomeClick}
            className="text-sm xl:text-base font-semibold text-slate-700 hover:text-sky-600 whitespace-nowrap cursor-pointer py-1">
            Home
          </button>

          <DesktopDropdown label="About" menuKey="about" items={aboutItems} width="w-56" />
          <DesktopDropdown label="Courses" menuKey="courses" items={coursesItems} width="w-52" />
          <DesktopDropdown label="Facilities" menuKey="facilities" items={facilitiesItems} width="w-48" />

          <DesktopDropdown label="Co-Curricular" menuKey="cocurricular">
            <div className="absolute top-full left-0 pt-1 z-[999]">
              <div className="w-44 bg-white rounded-lg shadow-xl border border-slate-100 py-1">
                <div className="relative"
                  onMouseEnter={() => handleSubMouseEnter('membership')}
                  onMouseLeave={handleSubMouseLeave}>
                  <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer">
                    <span>Membership</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                  {openSubDropdown === 'membership' && (
                    <div className="absolute left-full top-0 ml-1 z-[999]"
                      onMouseEnter={() => { if (subCloseTimer.current) clearTimeout(subCloseTimer.current); }}
                      onMouseLeave={handleSubMouseLeave}>
                      <div className="w-44 bg-white rounded-lg shadow-xl border border-slate-100 py-1">
                        {membershipItems.map(item => (
                          <button key={item.path} onClick={() => handleNav(item.path)}
                            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer">
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative"
                  onMouseEnter={() => handleSubMouseEnter('clubs')}
                  onMouseLeave={handleSubMouseLeave}>
                  <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer">
                    <span>Clubs</span>
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                  {openSubDropdown === 'clubs' && (
                    <div className="absolute left-full top-0 ml-1 z-[999]"
                      onMouseEnter={() => { if (subCloseTimer.current) clearTimeout(subCloseTimer.current); }}
                      onMouseLeave={handleSubMouseLeave}>
                      <div className="w-72 bg-white rounded-lg shadow-xl border border-slate-100 py-1 max-h-80 overflow-y-auto">
                        {clubsItems.length === 0 ? (
                          <p className="px-4 py-2 text-sm text-slate-400">No clubs yet</p>
                        ) : clubsItems.map(item => (
                          <button key={item.path} onClick={() => handleNav(item.path)}
                            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-600 cursor-pointer">
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DesktopDropdown>

          <DesktopDropdown label="Placement" menuKey="placement" items={placementItems} width="w-52" />
          <DesktopDropdown label="Committees" menuKey="committees" items={committeesItems} width="w-72" />
          <DesktopDropdown label="Research" menuKey="research" items={researchItems} width="w-52" />
          <DesktopDropdown label="Gallery" menuKey="gallery" items={galleryItems} width="w-40" />
          <DesktopDropdown label="NAAC" menuKey="naac" items={naacItems} width="w-56" />
          <DesktopDropdown label="Alumni" menuKey="alumni" items={alumniItems} width="w-56" />
          <DesktopDropdown label="Innovation" menuKey="innovation" items={innovationItems} width="w-44" />

          <button onClick={() => handleNav('/contact')}
            className="text-sm xl:text-base font-semibold text-slate-700 hover:text-sky-600 whitespace-nowrap cursor-pointer py-1">
            Contact
          </button>
          <button onClick={() => navigate('/admin')}
            className="flex items-center gap-1 text-sm xl:text-base font-semibold text-slate-700 hover:text-sky-600 whitespace-nowrap cursor-pointer py-1">
            <i className="ri-admin-line text-base"></i> Admin
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 w-full" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {/* Mobile badges — same colors as desktop */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100 flex-wrap">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              height: '32px', padding: '0 12px', borderRadius: '999px',
              background: 'linear-gradient(135deg, #114bca, #2563eb)',
              boxShadow: '0 0 10px 2px rgba(16,12,222,0.35)',
              fontSize: '12px', fontWeight: 700, color: 'white', whiteSpace: 'nowrap',
            }}>
              <i className="ri-award-fill" style={{ fontSize: 13 }}></i>
              Counseling Code: <strong style={{ color: '#fde047' }}>4946</strong>
            </div>
            <div
              onClick={() => { navigate('/application'); setMobileMenuOpen(false); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                height: '32px', padding: '0 12px', borderRadius: '999px',
                background: 'linear-gradient(135deg, #ca8a04, #eab308)',
                boxShadow: '0 0 10px 2px rgba(202,138,4,0.35)',
                fontSize: '12px', fontWeight: 700, color: 'black', whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}>
              <i className="ri-graduation-cap-fill" style={{ fontSize: 13 }}></i>
              Admissions
            </div>
          </div>

          <div className="px-4 py-1">
            <button onClick={handleHomeClick}
              className="block w-full text-left text-slate-700 hover:text-sky-600 font-medium cursor-pointer py-3 text-base border-b border-slate-100">
              Home
            </button>

            <MobileSection label="About" menuKey="about"><MobileLinkList items={aboutItems} /></MobileSection>
            <MobileSection label="Courses" menuKey="courses"><MobileLinkList items={coursesItems} /></MobileSection>
            <MobileSection label="Facilities" menuKey="facilities"><MobileLinkList items={facilitiesItems} /></MobileSection>

            <MobileSection label="Co-Curricular" menuKey="cocurricular">
              <div>
                <button onClick={() => toggleMobileSub('membership')}
                  className="flex items-center justify-between w-full text-left text-sm text-slate-600 hover:text-sky-600 cursor-pointer py-2 font-medium">
                  Membership
                  <i className={`ri-arrow-down-s-line text-base transition-transform ${openMobileSubDropdown === 'membership' ? 'rotate-180' : ''}`}></i>
                </button>
                {openMobileSubDropdown === 'membership' && (
                  <div className="ml-3 border-l-2 border-sky-50 pl-3 mb-1">
                    <MobileLinkList items={membershipItems} />
                  </div>
                )}
              </div>
              <div>
                <button onClick={() => toggleMobileSub('clubs')}
                  className="flex items-center justify-between w-full text-left text-sm text-slate-600 hover:text-sky-600 cursor-pointer py-2 font-medium">
                  Clubs
                  <i className={`ri-arrow-down-s-line text-base transition-transform ${openMobileSubDropdown === 'clubs' ? 'rotate-180' : ''}`}></i>
                </button>
                {openMobileSubDropdown === 'clubs' && (
                  <div className="ml-3 border-l-2 border-sky-50 pl-3 mb-1">
                    <MobileLinkList items={clubsItems} />
                  </div>
                )}
              </div>
            </MobileSection>

            <MobileSection label="Placement" menuKey="placement"><MobileLinkList items={placementItems} /></MobileSection>
            <MobileSection label="Committees" menuKey="committees"><MobileLinkList items={committeesItems} /></MobileSection>
            <MobileSection label="Research" menuKey="research"><MobileLinkList items={researchItems} /></MobileSection>
            <MobileSection label="Gallery" menuKey="gallery"><MobileLinkList items={galleryItems} /></MobileSection>
            <MobileSection label="NAAC" menuKey="naac"><MobileLinkList items={naacItems} /></MobileSection>
            <MobileSection label="Alumni" menuKey="alumni"><MobileLinkList items={alumniItems} /></MobileSection>
            <MobileSection label="Innovation" menuKey="innovation"><MobileLinkList items={innovationItems} /></MobileSection>

            <button onClick={() => handleNav('/contact')}
              className="block w-full text-left text-slate-700 hover:text-sky-600 font-medium cursor-pointer py-3 text-sm border-b border-slate-100">
              Contact
            </button>
            <button onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 w-full text-left text-slate-700 hover:text-sky-600 font-medium cursor-pointer py-3 text-sm border-b border-slate-100">
              <i className="ri-admin-line"></i> Admin
            </button>

          </div>
        </div>
      )}
    </header>
  );
}