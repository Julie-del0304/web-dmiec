import { useEffect, useRef, useState } from 'react';
import { newsEventService, placementSlideService } from '../../../services/newsEventsService';
 
interface NewsEvent {
  id: string;
  title: string;
  date: string;
  image_url?: string;
  description?: string;
  tag?: string;
  display_order: number;
}
 
interface PlacementSlide {
  id: string;
  name: string;
  branch: string;
  company: string;
  image_url: string;
  display_order: number;
}
 
const YOUTUBE_CHANNEL = 'https://youtube.com/@dmieckk?si=tE035utgahjeYZno';
 
// ── Static fallback data (from file 2) ────────────────────────────────────
const STATIC_EVENTS: NewsEvent[] = [
  { id: 's1', title: 'Anna University sponsored FDP',                               date: 'Feb 10 to Feb 15 2025',                    display_order: 1 },
  { id: 's2', title: 'First national grand research competition - Award 1.75 lakhs', date: 'Last date for submission 31st December 24', display_order: 2 },
  { id: 's3', title: 'ATAL online FDP',                                              date: '27 Jan to 01 Feb 2025',                    display_order: 3 },
  { id: 's4', title: 'Garuda India Hackathon',                                       date: '',                                         display_order: 4 },
];
 
// ── Tag helpers (shared) ──────────────────────────────────────────────────
function detectTag(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('place') || t.includes('recruit') || t.includes('hired')) return 'Placement';
  if (t.includes('award') || t.includes('win') || t.includes('prize'))     return 'Award';
  if (t.includes('certif'))                                                  return 'Certification';
  if (t.includes('research') || t.includes('paper') || t.includes('publish')) return 'Research';
  if (t.includes('hackathon'))                                               return 'Hackathon';
  if (t.includes('symposium') || t.includes('technova'))                    return 'Symposium';
  if (t.includes('sport') || t.includes('game'))                            return 'Sports Day';
  if (t.includes('cultural') || t.includes('pongal') || t.includes('celebration')) return 'Cultural';
  if (t.includes('workshop') || t.includes('fdp') || t.includes('seminar')) return 'Workshop';
  return 'Achievement';
}
 
const tagColors: Record<string, { bg: string; color: string }> = {
  Placement:            { bg: '#dbeafe', color: '#1d4ed8' },
  Achievement:          { bg: '#dcfce7', color: '#15803d' },
  Award:                { bg: '#fef9c3', color: '#854d0e' },
  Certification:        { bg: '#f3e8ff', color: '#7e22ce' },
  Research:             { bg: '#e0f2fe', color: '#0369a1' },
  Hackathon:            { bg: '#ede9fe', color: '#6d28d9' },
  Symposium:            { bg: '#ccfbf1', color: '#0f766e' },
  'Sports Day':         { bg: '#fee2e2', color: '#b91c1c' },
  Cultural:             { bg: '#fce7f3', color: '#9d174d' },
  'Paper Presentation': { bg: '#ffedd5', color: '#c2410c' },
  Workshop:             { bg: '#e0f2fe', color: '#0369a1' },
};
 
// ── Left panel: placement image slider (from file 2) ─────────────────────
interface PlacementPanelProps {
  items: PlacementSlide[];
  loading: boolean;
}
 
function PlacementPanel({ items, loading }: PlacementPanelProps) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade]       = useState(true);
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);
 
  useEffect(() => {
    if (items.length === 0) return;
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % items.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [items.length]);
 
  const goTo = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFade(false);
    setTimeout(() => { setCurrent(i); setFade(true); }, 300);
  };
 
  const item = items[current];
 
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: 20,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Column header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: 8,
        flexShrink: 0,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2563eb', flexShrink: 0 }} />
        <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>News &amp; Achievements</span>
      </div>
 
      {loading ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 36, border: '3px solid #ccc', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : items.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 14 }}>
          No placements added yet
        </div>
      ) : (
        <>
          {/* Image area */}
          <div style={{ position: 'relative', width: '100%', paddingTop: '65%', background: '#e8e8e8', flexShrink: 0 }}>
            <div style={{
              position: 'absolute', inset: 0,
              opacity: fade ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}>
              {item?.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#d1d5db', color: '#6b7280', fontSize: 14 }}>
                  No image
                </div>
              )}
            </div>
 
            {/* Prev / Next */}
            {items.length > 1 && (
              <>
                <button onClick={() => goTo((current - 1 + items.length) % items.length)} style={{
                  position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                  fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#374151', boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}>‹</button>
                <button onClick={() => goTo((current + 1) % items.length)} style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
                  fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#374151', boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}>›</button>
              </>
            )}
 
            {/* Dots */}
            {items.length > 1 && (
              <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                {items.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} style={{
                    width: i === current ? 22 : 8, height: 8, borderRadius: 4,
                    border: 'none', cursor: 'pointer', padding: 0,
                    background: i === current ? '#2563eb' : 'rgba(255,255,255,0.7)',
                    transition: 'all 0.3s ease',
                  }} />
                ))}
              </div>
            )}
          </div>
 
          {/* Info area */}
          <div style={{
            padding: '16px 18px 20px',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.4s ease',
            flex: 1,
          }}>
            <div style={{
              display: 'inline-block',
              background: tagColors['Placement'].bg,
              color: tagColors['Placement'].color,
              fontSize: 11, fontWeight: 700,
              padding: '3px 10px', borderRadius: 20,
              marginBottom: 10,
              letterSpacing: '0.05em',
            }}>Placement</div>
 
            <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 6px', lineHeight: 1.4 }}>
              {item?.name}
            </p>
            <p style={{ fontSize: 13, color: '#2563eb', fontWeight: 600, margin: '0 0 4px' }}>{item?.branch}</p>
            <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>
              Placed at <strong style={{ color: '#1d4ed8' }}>{item?.company}</strong>
            </p>
 
            <p style={{ fontSize: 12, color: '#cbd5e1', margin: '10px 0 0', textAlign: 'right' }}>
              {current + 1} / {items.length}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
 
// ── Right panel: events scrollable list (from file 2) ────────────────────
interface EventsListProps {
  items: NewsEvent[];
  loading: boolean;
}
 
function EventsList({ items, loading }: EventsListProps) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: 20,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Column header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: 8,
        flexShrink: 0,
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
        <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Events &amp; Programs</span>
      </div>
 
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {loading ? (
          <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#f59e0b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : items.length === 0 ? (
          <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 14 }}>
            No events added yet
          </div>
        ) : (
          items.map((item, idx) => {
            const tag = item.tag || detectTag(item.title);
            const tagStyle = tagColors[tag] || { bg: '#f1f5f9', color: '#475569' };
            return (
              <div key={item.id} style={{
                padding: '18px 20px',
                borderBottom: idx < items.length - 1 ? '1px solid #e2e8f0' : 'none',
              }}>
                {item.date && (
                  <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 6px', fontWeight: 500 }}>{item.date}</p>
                )}
                <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 6px', lineHeight: 1.4 }}>
                  {item.title}
                </p>
                {item.description && (
                  <p style={{ fontSize: 13, color: '#475569', margin: '0 0 8px', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                )}
                <div style={{
                  display: 'inline-block',
                  background: tagStyle.bg,
                  color: tagStyle.color,
                  fontSize: 11, fontWeight: 700,
                  padding: '3px 10px', borderRadius: 20,
                  letterSpacing: '0.05em',
                }}>{tag}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
 
// ── Main component ────────────────────────────────────────────────────────
export default function NewsEvents() {
  const [events, setEvents]                       = useState<NewsEvent[]>([]);
  const [eventsLoading, setEventsLoading]         = useState(true);
  const [placements, setPlacements]               = useState<PlacementSlide[]>([]);
  const [placementsLoading, setPlacementsLoading] = useState(true);
 
  useEffect(() => {
    // Fetch events with static fallback (from file 2)
    (async () => {
      setEventsLoading(true);
      try {
        const fetched = await newsEventService.getAll();
        setEvents(fetched.length > 0 ? fetched : STATIC_EVENTS);
      } catch (e) {
        console.error(e);
        setEvents(STATIC_EVENTS);
      } finally {
        setEventsLoading(false);
      }
    })();
 
    // Fetch placements
    (async () => {
      setPlacementsLoading(true);
      try { setPlacements(await placementSlideService.getAll()); }
      catch (e) { console.error(e); }
      finally { setPlacementsLoading(false); }
    })();
  }, []);
 
  return (
    <section id="news-events" style={{ background: '#f8fafc', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .ne-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
 
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 20px' }}>
 
        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ color: '#2563eb', fontWeight: 700, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Stay Updated</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.1 }}>News &amp; Events</h2>
          <div style={{ width: 48, height: 4, background: '#2563eb', borderRadius: 2, margin: '10px auto 0' }} />
        </div>
 
        {/* Two-column grid layout (from file 1), with dedicated panels (from file 2) */}
        <div className="ne-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
          <PlacementPanel items={placements} loading={placementsLoading} />
          <EventsList items={events} loading={eventsLoading} />
        </div>
 
        {/* Subscribe Banner */}
        <div style={{ marginTop: 32, background: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 40%, #2563eb 100%)', borderRadius: 16, padding: '24px 24px', textAlign: 'center', boxShadow: '0 8px 24px rgba(37,99,235,.30)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>
          <h3 style={{ color: '#fff', fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 800, margin: '0 0 8px' }}>Stay Updated with Our Daily News</h3>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, margin: '0 auto 18px', maxWidth: 420, lineHeight: 1.5 }}>
            Don't miss out on important announcements, events, and opportunities. Subscribe to our YouTube channel for regular updates.
          </p>
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', background: '#fff', color: '#2563eb', textDecoration: 'none', padding: '10px 28px', borderRadius: 8, fontWeight: 700, fontSize: 13, boxShadow: '0 2px 12px rgba(0,0,0,.12)' }}>
            Subscribe Now
          </a>
        </div>
      </div>
    </section>
  );
}
 