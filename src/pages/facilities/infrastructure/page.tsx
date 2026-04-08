
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

export default function InfrastructurePage() {
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

  useEffect(() => {
    fetchFacilityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFacilityData = async () => {
    try {
      const { data: facilityData, error: facilityError } = await supabase
        .from('facilities')
        .select('*')
        .eq('slug', 'infrastructure')
        .maybeSingle();

      if (facilityError) throw facilityError;

      if (facilityData) {
        setFacility(facilityData);

        const { data: photosData, error: photosError } = await supabase
          .from('facility_photos')
          .select('*')
          .eq('facility_id', facilityData.id)
          .order('created_at', { ascending: false });

        if (photosError) throw photosError;
        setPhotos(photosData || []);
      }
    } catch (error) {
      console.error('Error fetching facility data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const facilities = [
    'Waiting halls for boys and girls in all departments',
    'Chapel & prayer hall for moments of solace and reflection',
    'Grandeur of the Mother Virgin Auditorium accommodating 1200 students',
    'Nano auditorium, fully air-conditioned for 250 students',
    'Well-equipped laboratories sparking innovation',
    'Three-storey hostel for men',
    'Two-storey hostel for women',
    'Spacious conference and seminar halls',
    'Reprographic Centre ensuring seamless access to materials',
    'Courts and grounds for various games and sports, fostering healthy competition',
    'Gym facility and medical centre promoting holistic well-being',
    'Canteen & snack outlets serving delectable delights'
  ];

  return (
    <>
      <Navbar scrolled={scrolled} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-building-line text-5xl"></i>
              </div>
              <h1 className="text-5xl font-bold mb-4">Exceptional Eco-Friendly Campus Infrastructure</h1>
              <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                Where innovation and comfort go hand in hand
              </p>
            </div>
          </div>
        </div>

        {/* Campus Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-6">
                Welcome to our eco-friendly campus, where innovation and comfort go hand in hand. Spread across an impressive <strong>2,18,400 sq.ft.</strong> of thoughtfully designed space, our campus features distinct academic and hostel buildings. This separation ensures that students not only feel at home but are also inspired to unleash their creativity. Our infrastructure is meticulously crafted to foster a conducive environment for learning and personal growth.
              </p>
            </div>
          </div>

          {/* Campus Images */}
          {photos.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {photos.slice(0, 2).map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={photo.image_url}
                        alt={photo.caption}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {photo.caption && (
                      <div className="p-4">
                        <p className="text-sm text-gray-700 font-medium">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Building Description */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <i className="ri-building-4-line text-2xl text-white"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Main College Building</h2>
                <p className="text-gray-700 leading-relaxed">
                  Behold our magnificent three-story main college building, a towering testament to architectural excellence. Within its walls, you'll discover generously ventilated and expansive classrooms, alongside vibrant drawing halls. This architectural marvel not only houses our esteemed administrative block but also serves as the academic hub for our first-year departments and allied laboratories.
                </p>
              </div>
            </div>
          </div>

          {/* Department Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* ECE & CSE Block */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-cpu-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ECE & CSE Departments</h3>
              <p className="text-gray-700 leading-relaxed">
                Nestled within a dynamic three-story block, our ECE & CSE departments thrive amidst state-of-the-art laboratories, fostering innovation and exploration.
              </p>
            </div>

            {/* Mechanical Block */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-settings-3-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mechanical Department</h3>
              <p className="text-gray-700 leading-relaxed">
                Our Mechanical Department finds its home in a separate, expansive three-story building situated just beyond the main block, providing ample space for hands-on learning and cutting-edge research.
              </p>
            </div>

            {/* Civil Block */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-building-2-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Civil Engineering Block</h3>
              <p className="text-gray-700 leading-relaxed">
                An impeccably designed three-story Civil Block stands independently, serving as the dedicated hub for laboratories and classrooms catering to the Civil Engineering department.
              </p>
            </div>

            {/* EEE Block */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-flashlight-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">EEE Block</h3>
              <p className="text-gray-700 leading-relaxed">
                Our EEE Block, situated in its own spacious three-story structure, is meticulously equipped with cutting-edge laboratories and classrooms, catering to the needs of both the Electrical and Electronic Engineering and Mechanical departments.
              </p>
            </div>
          </div>

          {/* Additional Campus Images */}
          {photos.length > 2 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {photos.slice(2, 4).map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={photo.image_url}
                        alt={photo.caption}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {photo.caption && (
                      <div className="p-4">
                        <p className="text-sm text-gray-700 font-medium">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comprehensive Facilities List */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Campus Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm text-white"></i>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{facility}</p>
                </div>
              ))}
            </div>
          </div>

          {/* All Photos Gallery */}
          {photos.length > 4 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Photo Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.slice(4).map((photo) => (
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
                        <p className="text-sm text-gray-700 font-medium">{photo.caption}</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-medium">Click to view</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          <div className="max-w-5xl w-full">
            <img src={selectedPhoto.image_url} alt={selectedPhoto.caption} className="w-full h-auto rounded-lg" />
            {selectedPhoto.caption && (
              <p className="text-white text-center mt-4 text-lg">{selectedPhoto.caption}</p>
            )}
          </div>
        </div>
      )}

      <Footer enquiryOpen={enquiryOpen} setEnquiryOpen={setEnquiryOpen} />
    </>
  );
}
