import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const programs = [
  {
    id: 1,
    name: 'Computer Science & Engineering',
    short: 'CSE',
    icon: 'ri-computer-line',
    gradient: 'from-blue-600 via-cyan-500 to-blue-400',
    glow: '#3b82f6',
    accent: '#06b6d4',
    link: '/departments/cse',
    image: 'https://readdy.ai/api/search-image?query=modern%20computer%20science%20engineering%20laboratory%20students%20working%20computers%20programming%20coding%20technology%20clean%20bright%20professional%20academic%20environment%20blue%20lighting&width=800&height=600&seq=cse-card-1&orientation=landscape',
    tags: ['Algorithms', 'AI/ML', 'Cloud'],
  },
  {
    id: 2,
    name: 'Information Technology',
    short: 'IT',
    icon: 'ri-server-line',
    gradient: 'from-emerald-600 via-teal-500 to-green-400',
    glow: '#10b981',
    accent: '#14b8a6',
    link: '/departments/it',
    image: 'https://readdy.ai/api/search-image?query=modern%20information%20technology%20laboratory%20network%20servers%20data%20center%20students%20working%20computers%20networking%20equipment%20professional%20academic%20environment%20green%20blue%20lighting&width=800&height=600&seq=it-card-1&orientation=landscape',
    tags: ['Networking', 'Cybersecurity', 'Cloud'],
  },
  {
    id: 3,
    name: 'Artificial Intelligence & Data Science',
    short: 'AI&DS',
    icon: 'ri-brain-line',
    gradient: 'from-violet-600 via-purple-500 to-indigo-400',
    glow: '#7c3aed',
    accent: '#a855f7',
    link: '/departments/aids',
    image: 'https://readdy.ai/api/search-image?query=modern%20artificial%20intelligence%20laboratory%20neural%20networks%20machine%20learning%20data%20visualization%20screens%20students%20working%20AI%20technology%20futuristic%20professional%20academic%20environment%20purple%20blue%20lighting&width=800&height=600&seq=aids-card-1&orientation=landscape',
    tags: ['Deep Learning', 'Data Science', 'NLP'],
  },
  {
    id: 4,
    name: 'Electrical & Electronics Engineering',
    short: 'EEE',
    icon: 'ri-flashlight-line',
    gradient: 'from-amber-500 via-orange-500 to-yellow-400',
    glow: '#f59e0b',
    accent: '#f97316',
    link: '/departments/eee',
    image: 'https://readdy.ai/api/search-image?query=modern%20electrical%20electronics%20engineering%20laboratory%20power%20systems%20equipment%20transformers%20circuits%20students%20working%20electrical%20panels%20professional%20academic%20environment%20yellow%20orange%20lighting&width=800&height=600&seq=eee-card-1&orientation=landscape',
    tags: ['Power Systems', 'Robotics', 'IoT'],
  },
  {
    id: 5,
    name: 'Electronics & Communication Engineering',
    short: 'ECE',
    icon: 'ri-cpu-line',
    gradient: 'from-rose-600 via-red-500 to-pink-400',
    glow: '#e11d48',
    accent: '#f43f5e',
    link: '/departments/ece',
    image: 'https://readdy.ai/api/search-image?query=modern%20electronics%20communication%20engineering%20laboratory%20circuit%20boards%20oscilloscopes%20microcontrollers%20students%20working%20electronic%20equipment%20professional%20academic%20environment%20red%20orange%20lighting&width=800&height=600&seq=ece-card-1&orientation=landscape',
    tags: ['VLSI', 'Embedded', 'Signal Processing'],
  },
  {
    id: 6,
    name: 'Mechanical Engineering',
    short: 'MECH',
    icon: 'ri-settings-3-line',
    gradient: 'from-slate-600 via-gray-500 to-zinc-400',
    glow: '#475569',
    accent: '#64748b',
    link: '/departments/mechanical',
    image: 'https://readdy.ai/api/search-image?query=modern%20mechanical%20engineering%20workshop%20laboratory%20machines%20lathe%20cnc%20equipment%20students%20working%20manufacturing%20tools%20professional%20academic%20environment%20steel%20gray%20lighting&width=800&height=600&seq=mech-card-1&orientation=landscape',
    tags: ['CAD/CAM', 'Robotics', 'Drones'],
  },
];

const stats = [
  { value: '6', label: 'Engineering Departments', icon: 'ri-building-2-line' },
  { value: '70+', label: 'Expert Professors', icon: 'ri-user-star-line' },
  { value: '3000+', label: 'Graduates', icon: 'ri-graduation-cap-line' },
  { value: 'B++', label: 'NAAC Grade', icon: 'ri-award-line' },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Programs() {
  const { ref: headerRef, inView: headerIn } = useInView(0.2);
  const { ref: gridRef, inView: gridIn } = useInView(0.1);
  const { ref: statsRef, inView: statsIn } = useInView(0.2);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nunito:wght@400;500;600;700;800&display=swap');

        .programs-section {
          font-family: 'Nunito', sans-serif;
          background: #f8faff;
          position: relative;
          overflow: hidden;
          padding: 100px 0 80px;
        }

        .programs-section::before {
          content: '';
          position: absolute;
          top: -200px; left: 50%;
          transform: translateX(-50%);
          width: 900px; height: 600px;
          background: radial-gradient(ellipse, rgba(0,51,102,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .section-heading {
          font-family: 'Abril Fatface', serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 400;
          color: #5a168f;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        /* ── Header fade-up ── */
        .header-wrap {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .header-wrap.visible { opacity: 1; transform: none; }

        /* ── Card ── */
        .prog-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          cursor: pointer;
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          transition:
            opacity 0.55s ease,
            transform 0.55s ease,
            box-shadow 0.3s ease;
          text-decoration: none;
          display: block;
        }
        .prog-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .prog-card:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          transform: translateY(-8px) scale(1.02) !important;
        }

        /* Glow ring on hover */
        .prog-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 22px;
          background: var(--card-glow);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .prog-card:hover::before { opacity: 1; }

        .prog-card-inner {
          position: relative;
          z-index: 1;
          background: #fff;
          border-radius: 19px;
          overflow: hidden;
        }

        /* Image area */
        .prog-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .prog-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .prog-card:hover .prog-img-wrap img {
          transform: scale(1.1);
        }
        .prog-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.82;
          transition: opacity 0.3s ease;
        }
        .prog-card:hover .prog-overlay { opacity: 0.72; }

        /* Short badge */
        .prog-short {
          position: absolute;
          top: 14px; right: 14px;
          font-family: 'Orbitron', monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #fff;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.3);
        }

        /* Icon circle */
        .prog-icon-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .prog-icon-circle {
          width: 72px; height: 72px;
          border-radius: 18px;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255,255,255,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .prog-card:hover .prog-icon-circle {
          transform: scale(1.15) rotate(-5deg);
        }
        .prog-icon-circle i { font-size: 2.2rem; color: #fff; }

        /* Body */
        .prog-body { padding: 20px 22px 22px; }
        .prog-name {
          font-family: 'Nunito', sans-serif;
          font-size: 1.05rem;
          font-weight: 800;
          color: #0a1628;
          margin-bottom: 12px;
          line-height: 1.3;
          letter-spacing: 0em;
          transition: color 0.2s;
        }
        .prog-card:hover .prog-name { color: #4b0082; }

        /* Tags */
        .prog-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .prog-tag {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 99px;
          background: var(--tag-bg);
          color: var(--tag-color);
          letter-spacing: 0.02em;
          transition: transform 0.2s ease;
        }
        .prog-card:hover .prog-tag { transform: translateY(-1px); }

        /* Animated bottom bar */
        .prog-bar {
          height: 3px;
          background: var(--bar-gradient);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .prog-card:hover .prog-bar { transform: scaleX(1); }

        /* ── Stats ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          margin-top: 70px;
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .stat-cell {
          background: #fff;
          padding: 32px 20px;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s;
        }
        .stat-cell.visible { opacity: 1; transform: none; }
        .stat-cell:hover { background: #f0f7ff; }

        .stat-value {
          font-family: 'Abril Fatface', serif;
          font-size: 2.4rem;
          font-weight: 400;
          color: #5a168f;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-family: 'Nunito', sans-serif;
          font-size: 0.78rem;
          color: #6b5a86;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .stat-icon {
          font-size: 1.5rem;
          color: #5a168f;
          opacity: 0.3;
          margin-bottom: 8px;
        }

        /* Floating particles */
        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
          animation: float linear infinite;
          pointer-events: none;
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-120vh) rotate(720deg); }
        }

        /* Pill label above heading */
        .section-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(90,22,143,0.08);
          color: #5a168f;
          font-family: 'Nunito', sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 99px;
          margin-bottom: 16px;
          border: 1px solid rgba(90,22,143,0.2);
        }

        /* Divider */
        .section-divider {
          width: 60px;
          height: 4px;
          border-radius: 99px;
          background: linear-gradient(90deg, #5a168f, #7a33b0);
          margin: 12px auto 18px;
        }
      `}</style>

      {/* Floating particles */}
      <div className="programs-section" style={{ position: 'relative' }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            width: `${20 + i * 15}px`,
            height: `${20 + i * 15}px`,
            background: ['#3b82f6','#10b981','#7c3aed','#f59e0b','#e11d48','#475569','#06b6d4','#a855f7'][i],
            left: `${5 + i * 12}%`,
            bottom: `-${30 + i * 10}px`,
            animationDuration: `${12 + i * 3}s`,
            animationDelay: `${i * 1.5}s`,
          }} />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div ref={headerRef} className={`header-wrap text-center ${headerIn ? 'visible' : ''}`}>
            <div className="section-pill">
              <i className="ri-book-2-line"></i>
              Academic Programs
            </div>
            <h2 className="section-heading">
              Choose Your <span style={{ color: '#5a168f' }}>Future</span>
            </h2>
            <div className="section-divider"></div>
            <p style={{ color: '#6b5a86', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Six world-class engineering departments designed to launch careers and ignite innovation
            </p>
          </div>

          {/* Cards Grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-7" style={{ marginTop: '56px' }}>
            {programs.map((prog, i) => {
              // derive tag colors from gradient
              const tagBg = `${prog.glow}18`;
              const tagColor = prog.glow;
              return (
                <Link
                  key={prog.id}
                  to={prog.link}
                  className={`prog-card ${gridIn ? 'visible' : ''}`}
                  style={{
                    transitionDelay: gridIn ? `${i * 90}ms` : '0ms',
                    '--card-glow': `linear-gradient(135deg, ${prog.glow}40, ${prog.accent}40)`,
                    '--tag-bg': tagBg,
                    '--tag-color': tagColor,
                    '--bar-gradient': `linear-gradient(90deg, ${prog.glow}, ${prog.accent})`,
                  } as React.CSSProperties}
                  onMouseEnter={() => setHovered(prog.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="prog-card-inner">
                    {/* Image */}
                    <div className="prog-img-wrap">
                      <img src={prog.image} alt={prog.name} loading="lazy" />
                      <div className={`prog-overlay bg-gradient-to-br ${prog.gradient}`} />
                      <span className="prog-short">{prog.short}</span>
                      <div className="prog-icon-wrap">
                        <div className="prog-icon-circle">
                          <i className={prog.icon}></i>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="prog-body">
                      <div className="prog-name">{prog.name}</div>
                      <div className="prog-tags">
                        {prog.tags.map(tag => (
                          <span key={tag} className="prog-tag">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Animated bottom bar */}
                    <div className="prog-bar" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Stats */}
          <div ref={statsRef}>
            <div className="stats-grid">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`stat-cell ${statsIn ? 'visible' : ''}`}
                  style={{ transitionDelay: statsIn ? `${i * 100}ms` : '0ms' }}
                >
                  <div className="stat-icon"><i className={s.icon}></i></div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
