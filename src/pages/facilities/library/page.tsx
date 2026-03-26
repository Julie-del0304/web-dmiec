
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

interface FacilityPhoto {
  id: string;
  image_url: string;
  caption: string;
}

interface Facility {
  id: string;
  name: string;
  description: string;
}

/**
 * Library page – displays facility information and a photo gallery.
 * Added robust error handling and minor type‑safety improvements.
 */
export default function LibraryPage() {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [photos, setPhotos] = useState<FacilityPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<FacilityPhoto | null>(null);
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

  /* ----------------------------------------------------------------------
   * Fetch facility data + related photos
   * ---------------------------------------------------------------------- */
  useEffect(() => {
    fetchFacilityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFacilityData = async () => {
    try {
      // 1️⃣ Get the facility record (by slug)
      const { data: facilityData, error: facilityError } = await supabase
        .from('facilities')
        .select('*')
        .eq('slug', 'library')
        .maybeSingle();

      if (facilityError) throw facilityError;

      if (!facilityData) {
        // No facility found – show a friendly message later
        console.warn('No facility found for slug "library".');
        return;
      }

      setFacility(facilityData);

      // 2️⃣ Get the photos for this facility
      const { data: photosData, error: photosError } = await supabase
        .from('facility_photos')
        .select('*')
        .eq('facility_id', facilityData.id)
        .order('created_at', { ascending: false });

      if (photosError) throw photosError;

      // Ensure we always store an array (Supabase may return null)
      setPhotos(Array.isArray(photosData) ? photosData : []);
    } catch (error) {
      // Centralised logging – could be replaced with a toast/notification system
      console.error('Error fetching facility data:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------------------------------------------
   * Render loading state
   * ---------------------------------------------------------------------- */
  if (loading) {
    return (
      <>
        <Navbar scrolled={scrolled} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <i className="ri-loader-4-line text-4xl text-teal-600 animate-spin"></i>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ----------------------------------------------------------------------
   * Main UI
   * ---------------------------------------------------------------------- */
  return (
    <>
      <Navbar scrolled={scrolled} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-book-open-line text-5xl"></i>
              </div>
              <h1 className="text-5xl font-bold mb-4">
                {facility?.name ?? 'Library'}
              </h1>
              <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                A treasure trove of knowledge and learning resources
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <article className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Our Library
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {facility?.description ? (
                <p className="whitespace-pre-wrap">{facility.description}</p>
              ) : (
                <p>
                  The DMI Engineering College Library is a comprehensive learning
                  resource center that houses an extensive collection of books,
                  journals, research papers, and digital resources. With
                  comfortable reading spaces, modern computer facilities, and a
                  quiet study environment, our library supports both academic
                  research and personal development. Students have access to
                  national and international journals, e‑books, and online
                  databases to enhance their learning experience.
                </p>
              )}
            </div>
          </article>

          {/* Photo Gallery */}
          {photos.length > 0 ? (
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.image_url}
                        alt={photo.caption}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {photo.caption && (
                      <div className="p-4">
                        <p className="text-sm text-gray-700 font-medium">
                          {photo.caption}
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-medium">
                        Click to view
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-16">
              <i className="ri-image-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg">No photos available yet</p>
            </div>
          )}
        </section>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close modal"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          <div className="max-w-5xl w-full">
            <img
              src={selectedPhoto.image_url}
              alt={selectedPhoto.caption}
              className="w-full h-auto rounded-lg"
            />
            {selectedPhoto.caption && (
              <p className="text-white text-center mt-4 text-lg">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </>
  );
}
