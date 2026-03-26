import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import { fetchAllFolders } from '../../services/eventService';
import type { EventFolderWithPhotoCount } from '../../types/events';

const EventsPage = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState<EventFolderWithPhotoCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const pageKey = 'reloaded-' + window.location.pathname.replace(/\//g, '-');
    if (!sessionStorage.getItem(pageKey)) {
      sessionStorage.setItem(pageKey, 'true');
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadFolders();
    setIsAnimated(true);
  }, []);

  const loadFolders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllFolders();
      setFolders(data);
    } catch (err) {
      console.error('Error loading folders:', err);
      setError('Failed to load event galleries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  const openFolder = (folderId: string) => {
    navigate(`/events/${folderId}`);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0A2647] via-[#144272] to-[#205295]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Campus Events
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explore the vibrant moments from our college events, celebrations, and activities
            </p>
          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="py-12 bg-red-50">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <i className="ri-error-warning-line text-5xl text-red-500 mb-4"></i>
              <p className="text-lg text-red-600">{error}</p>
              <button
                onClick={loadFolders}
                className="mt-6 px-6 py-3 bg-[#0A2647] text-white rounded-lg hover:bg-[#144272] transition-colors duration-300 whitespace-nowrap"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 w-96 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-80 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Folders Grid */}
      {!loading && !error && folders.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 scroll-animate opacity-0 transition-all duration-700">
              <h2 className="text-4xl font-bold text-[#0A2647] mb-4">Event Galleries</h2>
              <p className="text-lg text-gray-600">Browse through our collection of memorable events</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {folders.map((folder, index) => (
                <div
                  key={folder.id}
                  className="scroll-animate opacity-0 transition-all duration-700"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    onClick={() => openFolder(folder.id)}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                  >
                    <div className="relative h-80 overflow-hidden bg-gray-200">
                      {folder.cover_image_url ? (
                        <img
                          src={folder.cover_image_url}
                          alt={folder.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0A2647] to-[#205295]">
                          <i className="ri-image-line text-6xl text-white/50"></i>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{folder.name}</h3>
                        {folder.description && (
                          <p className="text-white/80 text-sm mb-3 line-clamp-2">{folder.description}</p>
                        )}
                        <div className="flex items-center justify-between text-white/90">
                          <div className="flex items-center">
                            <i className="ri-image-line mr-2"></i>
                            <span>{folder.photo_count} {folder.photo_count === 1 ? 'Photo' : 'Photos'}</span>
                          </div>
                          {folder.event_date && (
                            <div className="flex items-center text-sm">
                              <i className="ri-calendar-line mr-1"></i>
                              <span>{formatDate(folder.event_date)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <i className="ri-arrow-right-line text-white text-xl"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loading && !error && folders.length === 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-folder-open-line text-6xl text-gray-400"></i>
              </div>
              <h2 className="text-3xl font-bold text-[#0A2647] mb-4">No Events Yet</h2>
              <p className="text-lg text-gray-600 mb-8">
                Event galleries will appear here once they are created. Check back soon for exciting campus moments!
              </p>
            </div>
          </div>
        </section>
      )}

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />

      <style>{`
        .scroll-animate {
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        
        .scroll-animate.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .scroll-animate:not(.animate-in) {
          opacity: 0;
          transform: translateY(30px);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EventsPage;
