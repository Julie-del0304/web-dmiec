/**
 * Club Detail Page
 * Handles displaying details for all student clubs including:
 * - INNOVATION-X CLUB
 * - QUANTUM DOT CLUB-S&H
 * - IOT CLUB
 * - INNOVATORS CLUB
 * - RAMANUJAM CLUB - S&H
 * - NSS CLUB
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../home/components/Navbar';
import Footer from '../../../home/components/Footer';
import { clubService, Club, ClubPhoto, ClubDocument } from '../../../../services/clubService';
import { CLUB_REGISTRY, CLUB_SLUGS } from '../../../../lib/clubRegistry';

const PHOTO_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'technical', label: 'Technical' },
  { id: 'paper_presentation', label: 'Paper Presentations' },
  { id: 'seminar', label: 'Seminars' },
  { id: 'competition', label: 'Competitions' },
];

const CATEGORY_COLORS: Record<string, string> = {
  technical: 'from-blue-800 to-cyan-700',
  cultural: 'from-purple-800 to-pink-700',
  sports: 'from-green-800 to-teal-700',
  social: 'from-rose-800 to-orange-700',
  literary: 'from-indigo-800 to-violet-700',
};

const CATEGORY_TITLE_COLORS: Record<string, string> = {
  technical: 'text-blue-900',
  cultural: 'text-purple-900',
  sports: 'text-green-900',
  social: 'text-rose-900',
  literary: 'text-indigo-900',
};

const CATEGORY_ICON_COLORS: Record<string, string> = {
  technical: '#1e40af',
  cultural: '#6b21a8',
  sports: '#065f46',
  social: '#9f1239',
  literary: '#3730a3',
};

const DEPT_COLORS: Record<string, string> = {
  CSE: 'bg-indigo-500/20 text-indigo-100 border-indigo-400/30',
  IT: 'bg-amber-500/20 text-amber-100 border-amber-400/30',
  ECE: 'bg-rose-500/20 text-rose-100 border-rose-400/30',
  EEE: 'bg-cyan-500/20 text-cyan-100 border-cyan-400/30',
  MECH: 'bg-orange-500/20 text-orange-100 border-orange-400/30',
  'S&H': 'bg-purple-500/20 text-purple-100 border-purple-400/30',
};

const HUMAN_CATEGORY_NAMES: Record<string, string> = {
  technical: 'Innovation & Tech',
  cultural: 'Arts & Culture',
  sports: 'Athletics & Fitness',
  social: 'Community Impact',
  literary: 'Words & Ideas',
};


// Arrow icon for expand/collapse toggle
function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14"
      viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

export default function ClubDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [club, setClub] = useState<Club | null>(null);
  const [photos, setPhotos] = useState<ClubPhoto[]>([]);
  const [documents, setDocuments] = useState<ClubDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePhotoTab, setActivePhotoTab] = useState('all');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Expandable state for sidebar stats
  const [photosOpen, setPhotosOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (slug) fetchAll(slug);
  }, [slug]);

  useEffect(() => {
    if (club?.name) {
      document.title = `${club.name} | DMI Engineering College`;
    } else if (slug && CLUB_SLUGS[slug]) {
      document.title = `${CLUB_SLUGS[slug]} | DMI Engineering College`;
    }
    return () => { document.title = 'DMI Engineering College'; };
  }, [club, slug]);

  const fetchAll = async (clubSlug: string) => {
    try {
      setLoading(true);
      const matched = await clubService.getBySlug(clubSlug);
      if (!matched) { navigate('/co-curricular/clubs'); return; }
      setClub(matched);
      const [pics, docs] = await Promise.all([
        clubService.getPhotos(matched.id),
        clubService.getDocuments(matched.id),
      ]);
      setPhotos(pics);
      setDocuments(docs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos = activePhotoTab === 'all'
    ? photos
    : photos.filter(p => p.category === activePhotoTab);

  const color = club ? (CATEGORY_COLORS[club.category ?? ''] ?? 'from-teal-800 to-cyan-700') : 'from-teal-800 to-cyan-700';
  const bespoke = slug ? (CLUB_REGISTRY[slug.toLowerCase()] || CLUB_REGISTRY[slug.toLowerCase().replace('-club', '')] || CLUB_REGISTRY[slug.toLowerCase() + '-club']) : null;
  const aboutText = bespoke?.about || club?.about || club?.description || '';
  const objectives = bespoke?.objectives || [];
  const titleColor = club ? (CATEGORY_TITLE_COLORS[club.category ?? ''] ?? 'text-teal-900') : 'text-teal-900';
  const iconColor = club ? (CATEGORY_ICON_COLORS[club.category ?? ''] ?? '#0f766e') : '#0f766e';

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-teal-600 border-t-transparent" />
    </div>
  );

  if (!club) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar scrolled={scrolled} />

      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${color} text-white`}
        style={{
          paddingTop: 'calc(2.5rem + var(--navbar-height, 0px))',
          paddingBottom: '3.5rem'
        }}>
        {club.banner_url && (
          <img src={club.banner_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        )}
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative max-w-6xl mx-auto px-6">
          <button onClick={() => navigate('/co-curricular/clubs')}
            className="flex items-center gap-1.5 text-white/60 hover:text-white mb-6 transition-colors text-sm font-medium cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Clubs
          </button>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white text-2xl font-black tracking-tight">
                {club.icon_symbol || club.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/30 uppercase tracking-wider">
                  {HUMAN_CATEGORY_NAMES[club.category ?? ''] || club.category || 'Club'}
                </span>
                {club.department && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-500 ${DEPT_COLORS[club.department.toUpperCase()] || 'bg-white/10 text-white'}`}>
                    {club.department}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight mb-2 tracking-tight">{club.name}</h1>
              {club.tagline && <p className="text-white/80 text-lg font-medium tracking-wide italic">{club.tagline}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-10 text-slate-900">
        <div className="grid lg:grid-cols-3 gap-7">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            {aboutText && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className={`text-xl font-black mb-3 flex items-center gap-2 ${titleColor}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Our Journey
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm font-medium whitespace-pre-line">{aboutText}</p>
              </div>
            )}

            {/* Bespoke Objectives */}
            {objectives.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className={`text-xl font-black mb-4 flex items-center gap-2 ${titleColor}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                  Objectives & Highlights
                </h2>
                <div className="space-y-3">
                  {objectives.map((obj, i) => (
                    <div key={i} className="flex gap-3 items-start p-3.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-white transition-all">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 font-black text-xs text-white"
                        style={{ background: iconColor }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{obj.title}</p>
                        <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{obj.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vision & Mission */}
            {(club.vision || club.mission) && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className={`text-xl font-black mb-4 flex items-center gap-2 ${titleColor}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Goals & Aspirations
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {club.vision && (
                    <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-blue-900 text-base">Vision</h3>
                      </div>
                      <p className="text-blue-800 text-sm leading-relaxed">{club.vision}</p>
                    </div>
                  )}
                  {club.mission && (
                    <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="3 11 22 2 13 21 11 13 3 11" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-teal-900 text-base">Mission</h3>
                      </div>
                      <p className="text-teal-800 text-sm leading-relaxed">{club.mission}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {photos.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className={`text-xl font-black mb-4 flex items-center gap-2 ${titleColor}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                  Photo Gallery
                </h2>
                <div className="flex flex-wrap gap-2 mb-5">
                  {PHOTO_CATEGORIES.filter(cat =>
                    cat.id === 'all' || photos.some(p => p.category === cat.id)
                  ).map(cat => (
                    <button key={cat.id} onClick={() => setActivePhotoTab(cat.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${activePhotoTab === cat.id
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}>
                      {cat.label}
                      <span className="ml-1 opacity-70">
                        ({cat.id === 'all' ? photos.length : photos.filter(p => p.category === cat.id).length})
                      </span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredPhotos.map(photo => (
                    <div key={photo.id}
                      className="aspect-video rounded-xl overflow-hidden bg-gray-100 cursor-pointer hover:scale-[1.03] transition-transform shadow-sm border border-gray-100"
                      onClick={() => setLightboxImg(photo.photo_url)}>
                      <img src={photo.photo_url} alt={photo.caption ?? ''} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {documents.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className={`text-xl font-black mb-4 flex items-center gap-2 ${titleColor}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                  Documents
                </h2>
                <div className="space-y-3">
                  {documents.map(doc => (
                    <a key={doc.id} href={doc.doc_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3.5 hover:bg-red-100 transition-colors group">
                      <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-800 flex-1 text-sm">{doc.title}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {club.achievements && (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-black mb-4 flex items-center gap-2 text-amber-900">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                  Achievements
                </h2>
                <div className="space-y-2.5">
                  {club.achievements.split('\n').filter(Boolean).map((line, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-amber-900 text-sm leading-relaxed">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* Coordinator */}
            {club.coordinator_name && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className={`text-base font-black mb-4 flex items-center gap-2 ${titleColor}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                  Coordinator
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
                    {club.coordinator_name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{club.coordinator_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Club Coordinator</p>
                  </div>
                </div>
                <div className="space-y-2.5 border-t border-gray-100 pt-3">
                  {club.coordinator_email && (
                    <a href={`mailto:${club.coordinator_email}`}
                      className="flex items-center gap-2.5 hover:text-teal-600 transition-colors">
                      <div className="w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-600 truncate">{club.coordinator_email}</span>
                    </a>
                  )}
                  {club.coordinator_phone && (
                    <a href={`tel:${club.coordinator_phone}`}
                      className="flex items-center gap-2.5 hover:text-teal-600 transition-colors">
                      <div className="w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-600">{club.coordinator_phone}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Stats with expandable Photos & Documents */}
            <div className={`bg-gradient-to-br ${color} rounded-2xl p-5 text-white shadow-sm transition-all duration-500`}>
              <h3 className="text-base font-black mb-4 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Club at a Glance
              </h3>
              <div className="space-y-1">

                {/* Photos row */}
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-white/70 text-sm">Photos</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{photos.length}</span>
                    <button
                      onClick={() => setPhotosOpen(prev => !prev)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-all cursor-pointer"
                    >
                      <ChevronDownIcon open={photosOpen} />
                    </button>
                  </div>
                </div>

                {/* Photos expandable */}
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: photosOpen ? '400px' : '0px',
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <div className="pt-2 pb-1 space-y-1.5">
                    {photos.length === 0 ? (
                      <div className="text-center py-3 text-white/40 text-xs">No photos available yet</div>
                    ) : (
                      photos.map(photo => (
                        <div key={photo.id} className="flex items-center gap-2 bg-white/10 rounded-lg px-2.5 py-1.5">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                          </svg>
                          <span className="text-white text-xs flex-1 truncate font-medium">
                            {photo.caption || `Photo ${photo.id}`}
                          </span>
                          <button
                            onClick={() => setLightboxImg(photo.photo_url)}
                            className="text-[10px] font-bold bg-white text-rose-700 px-2 py-0.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0"
                          >
                            View
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Documents row */}
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-white/70 text-sm">Documents</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{documents.length}</span>
                    <button
                      onClick={() => setDocsOpen(prev => !prev)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/35 transition-all cursor-pointer"
                    >
                      <ChevronDownIcon open={docsOpen} />
                    </button>
                  </div>
                </div>

                {/* Documents expandable */}
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: docsOpen ? '400px' : '0px',
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <div className="pt-2 pb-1 space-y-1.5">
                    {documents.length === 0 ? (
                      <div className="text-center py-3 text-white/40 text-xs">No documents available yet</div>
                    ) : (
                      documents.map(doc => (
                        <div key={doc.id} className="flex items-center gap-2 bg-white/10 rounded-lg px-2.5 py-1.5">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                          </svg>
                          <span className="text-white text-xs flex-1 truncate font-medium">{doc.title}</span>
                          <a
                            href={doc.doc_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold bg-white text-rose-700 px-2 py-0.5 rounded-full hover:opacity-90 transition-opacity flex-shrink-0"
                          >
                            View
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Department row */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-white/70 text-sm">Department</span>
                  <span className="font-bold text-sm">{club.department}</span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-black/92 z-[100] flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}>
          <button className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img src={lightboxImg} alt="" className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl" />
        </div>
      )}

      <Footer />
    </div>
  );
}