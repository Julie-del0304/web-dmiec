
import { useEffect, useState } from 'react';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

export default function GalleryVideosPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Events', 'Campus Tour', 'Sports', 'Cultural', 'Achievements'];

 const videos = [
    { thumb: 'https://youtu.be/cRzOTLGZk0o?si=9k1tlfy9H4RTE_gR', title: 'Annual Day 2024 Highlights', category: 'Events', duration: '0:46', url: '#' },
    { thumb: 'https://youtu.be/h8Quf2yC2Z8?si=c1qXwOD08zGK7ghA', title: 'Campus Virtual Tour', category: 'Campus Tour', duration: '3:23', url: '#' },
    { thumb: 'https://youtu.be/5OT7AGt9ORc?si=AgG9RhhoHCUN9oBU', title: 'Sports Day 2024', category: 'Sports', duration: '0:28', url: '#' },
    { thumb: 'https://youtube.com/shorts/8YnQlZXnSzA?si=DXfV3B_j8AIE8Q3A', title: 'Placement Success Stories 2024', category: 'Achievements', duration: '0:47', url: '#' },
    { thumb: 'https://youtube.com/shorts/AK7o_xgny-U?si=v9NfN0SdDF-bLKWw', title: 'Technical Symposium – Technovate', category: 'Events', duration: '0:31', url: '#' },
    { thumb: 'https://youtu.be/TQ8-sT6RgE8?si=s9eWLtKgzayaFRzK', title: 'Convocation Ceremony 2024', category: 'Achievements', duration: '1:16', url: '#' }
  ];

  const filtered = activeCategory === 'All' ? videos : videos.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <div className="pt-24">
        <div className="bg-gradient-to-r from-slate-800 to-slate-600 py-14 px-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-slate-300 mb-2">
              <span>Home</span> <span className="mx-2">/</span> <span>Gallery</span> <span className="mx-2">/</span>
              <span className="text-white font-medium">Videos</span>
            </nav>
            <h1 className="text-4xl font-bold text-white">Video Gallery</h1>
            <p className="text-slate-300 mt-2">Watch highlights, tours, and memorable moments from DMI Engineering College</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeCategory === cat ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((video, i) => (
              <a key={i} href={video.url}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer block">
                <div className="relative w-full h-44">
                  <img src={video.thumb} alt={video.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/90 rounded-full group-hover:bg-white transition-colors">
                      <i className="ri-play-fill text-slate-800 text-xl ml-0.5"></i>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">{video.duration}</span>
                  <span className="absolute top-2 left-2 bg-sky-600 text-white text-xs px-2 py-0.5 rounded-full">{video.category}</span>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors leading-snug">{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
