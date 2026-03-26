import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface NewsItem {
  id: string;
  title: string;
  image_url: string;
  date: string;
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'f1',
    title: 'DMI Engineering College Achieves 95% Placement Record for 2024–25 Batch',
    image_url: 'https://readdy.ai/api/search-image?query=engineering%20college%20students%20graduation%20ceremony%20celebration%20campus%20outdoor%20professional%20photography%20warm%20sunlight&width=1200&height=600&seq=news-fallback-1&orientation=landscape',
    date: new Date().toISOString(),
  },
  {
    id: 'f2',
    title: 'National Level Technical Symposium "TECHFEST 2025" Held at DMI Campus',
    image_url: 'https://readdy.ai/api/search-image?query=technical%20symposium%20engineering%20college%20students%20presenting%20projects%20auditorium%20stage%20event%20professional%20photography&width=1200&height=600&seq=news-fallback-2&orientation=landscape',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'f3',
    title: 'DMI Students Win First Prize at Inter-College Robotics Competition',
    image_url: 'https://readdy.ai/api/search-image?query=robotics%20competition%20engineering%20students%20robot%20building%20workshop%20laboratory%20technology%20innovation%20award&width=1200&height=600&seq=news-fallback-3&orientation=landscape',
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'f4',
    title: 'New State-of-the-Art AI & Machine Learning Lab Inaugurated',
    image_url: 'https://readdy.ai/api/search-image?query=modern%20computer%20laboratory%20AI%20machine%20learning%20engineering%20college%20inauguration%20high%20tech%20equipment%20professional&width=1200&height=600&seq=news-fallback-4&orientation=landscape',
    date: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
  {
    id: 'f5',
    title: 'MOU Signed with Leading IT Companies for Industry–Academia Collaboration',
    image_url: 'https://readdy.ai/api/search-image?query=MOU%20signing%20ceremony%20college%20principal%20industry%20leaders%20conference%20room%20professional%20formal%20meeting&width=1200&height=600&seq=news-fallback-5&orientation=landscape',
    date: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
];

export default function News() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch news from Supabase
  useEffect(() => {
    let cancelled = false;

    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news_items')
          .select('id, title, image_url, date')
          .order('date', { ascending: false });

        if (cancelled) return;

        if (error) {
          console.error('News fetch error:', error);
          setNewsItems(FALLBACK_NEWS);
          setLoaded(true);
          return;
        }

        if (data && data.length > 0) {
          setNewsItems(data);
        } else {
          setNewsItems(FALLBACK_NEWS);
        }
      } catch (err) {
        console.error('News fetch exception:', err);
        if (!cancelled) setNewsItems(FALLBACK_NEWS);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };

    fetchNews();

    return () => {
      cancelled = true;
    };
  }, []);

  // Auto‑slide timer
  useEffect(() => {
    if (newsItems.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [newsItems.length]);

  // Jump to a specific slide and reset timer
  const goTo = (index: number) => {
    setCurrentSlide(index);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 5000);
  };

  const next = () => goTo((currentSlide + 1) % newsItems.length);
  const prev = () => goTo((currentSlide - 1 + newsItems.length) % newsItems.length);

  // Loading state
  if (!loaded) {
    return (
      <section className="py-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.3),transparent)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider">
              Latest Updates
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
              <strong>Campus News</strong>
            </h2>
            <div className="w-24 h-1 bg-teal-400 mx-auto mt-6"></div>
          </div>
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  // No news case
  if (newsItems.length === 0) {
    return null;
  }

  const current = newsItems[currentSlide];

  return (
    <section ref={sectionRef} className="py-20 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.3),transparent)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            Latest Updates
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            <strong>Campus News</strong>
          </h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
          <p className="text-slate-600 text-base mt-6 max-w-2xl mx-auto">
            Stay updated with the latest happenings, events, and achievements at DMI Engineering College
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-100">
          <div className="relative w-full h-96 md:h-[500px]">
            <img
              key={current.id}
              src={current.image_url}
              alt={current.title}
              className="w-full h-full object-cover"
             style={{ objectPosition: '50% 20%' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://readdy.ai/api/search-image?query=engineering%20college%20campus%20modern%20building%20education%20technology%20students%20academic%20institution%20professional%20photography&width=1200&height=600&seq=news-fallback&orientation=landscape';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 px-4 py-8 flex flex-col items-center justify-center text-center w-full">
  <div className="inline-flex items-center justify-center text-teal-300 text-sm mb-4 gap-2 bg-black/40 px-5 py-2 rounded-full backdrop-blur-sm">
    <i className="ri-calendar-line text-base"></i>
    <span>
      {new Date(current.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </span>
  </div>
  <h3 className="text-2xl md:text-4xl font-bold text-white text-center leading-snug max-w-4xl mx-auto drop-shadow-xl px-4">
    {current.title}
  </h3>
</div>
          </div>

          {newsItems.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/5 hover:bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous slide"
              >
                <i className="ri-arrow-left-s-line text-2xl"></i>
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/5 hover:bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 transition-all hover:scale-110 cursor-pointer"
                aria-label="Next slide"
              >
                <i className="ri-arrow-right-s-line text-2xl"></i>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {newsItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className={`h-3 rounded-full transition-all cursor-pointer ${
                      index === currentSlide ? 'bg-teal-400 w-8' : 'bg-white/50 hover:bg-white/70 w-3'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {newsItems.length > 1 && (
          <div className="mt-6 grid grid-cols-5 gap-3">
            {newsItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goTo(index)}
                className={`relative rounded-lg overflow-hidden transition-all cursor-pointer ${
                  index === currentSlide ? 'ring-3 ring-teal-400 scale-105' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <div className="w-full h-20">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" style={{ objectPosition: '50% 20%' }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
