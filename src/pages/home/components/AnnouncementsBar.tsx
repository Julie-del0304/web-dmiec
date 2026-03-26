import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface Announcement {
  id: string;
  title?: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  is_active: boolean;
  display_order?: number;
}

export default function AnnouncementsBar() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (!loading && announcements.length > 0) {
      const ticker = document.getElementById('announcements-ticker');
      if (ticker) {
        document.documentElement.style.setProperty('--ticker-height', `${ticker.offsetHeight}px`);
      }
    } else {
      document.documentElement.style.setProperty('--ticker-height', '0px');
    }
  }, [loading, announcements]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      if (!msg.includes('Failed to fetch') && !msg.includes('NetworkError')) {
        console.error('Error fetching announcements:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading || announcements.length === 0) return null;

  const duplicated = [...announcements, ...announcements, ...announcements];

  return (
    <div
      id="announcements-ticker"
      className="text-white py-2 overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 70,
        background: 'linear-gradient(to right, #0066ff, #003d99)',
      }}
    >
      <style>{`
        @keyframes scroll-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-track {
          animation: scroll-ticker 30s linear infinite;
          display: flex;
          white-space: nowrap;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="ticker-track">
        {duplicated.map((a, index) => (
          <div key={`${a.id}-${index}`} className="inline-flex items-center mx-8 flex-shrink-0">
            <i className="ri-megaphone-fill text-lg mr-2"></i>
            {a.title && <span className="font-bold mr-2">{a.title}:</span>}
            <span className="font-medium">{a.message}</span>
            <span className="mx-4 text-white/50">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}