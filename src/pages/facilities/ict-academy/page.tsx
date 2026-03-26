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

export default function ICTAcademyPage() {
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
  }, []);

  const fetchFacilityData = async () => {
    try {
      const { data: facilityData, error: facilityError } = await supabase
        .from('facilities')
        .select('*')
        .eq('slug', 'ict-academy')
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
            <i className="ri-loader-4-line text-4xl text-indigo-600 animate-spin"></i>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar scrolled={scrolled} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-graduation-cap-line text-5xl"></i>
              </div>
              <h1 className="text-5xl font-bold mb-4">ICT Academy</h1>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
                Empowering Future Innovators
              </p>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About ICT Academy</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {facility?.description ? (
                <p className="whitespace-pre-wrap">{facility.description}</p>
              ) : (
                <p>
                  The ICT Academy is an exciting initiative designed to help students and professionals 
                  become skilled in the latest technology. Its main goal is to connect education with 
                  industry needs, ensuring that learners are prepared for the fast-changing tech landscape.
                </p>
              )}
            </div>
          </div>

          {/* Key Programs Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Programs and Activities</h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                The Academy offers various programs like workshops and seminars that focus on important 
                technology topics such as the Internet of Things (IoT), Blockchain, Data Analytics, and 
                Robotic Process Automation. For example, recent events such as the "Power Seminar on IoT 
                in Automobile" and "Power Seminar on Blockchain" gave students a chance to learn about 
                how these technologies are being used in real life.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Additionally, programs like the "FDP on Microsoft Power BI Data Analyst" help teachers 
                learn how to use data analysis tools. This allows them to teach their students more 
                effectively. The Academy also collaborates with companies, such as Infosys, to provide 
                hands-on training and real-world experience, further enriching the learning opportunities 
                for students.
              </p>
            </div>

            {/* Technology Focus Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-wifi-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Internet of Things</h3>
                <p className="text-indigo-100 text-sm">Connected devices and smart systems</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-links-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Blockchain</h3>
                <p className="text-purple-100 text-sm">Distributed ledger technology</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-bar-chart-box-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Data Analytics</h3>
                <p className="text-blue-100 text-sm">Insights from data analysis</p>
              </div>

              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-robot-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">RPA</h3>
                <p className="text-violet-100 text-sm">Robotic Process Automation</p>
              </div>
            </div>
          </div>

          {/* Event Highlights */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                  <i className="ri-car-line text-7xl text-white"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Power Seminar on IoT in Automobile</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Exploring the integration of Internet of Things technology in modern automotive 
                    systems and smart vehicles.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <i className="ri-links-line text-7xl text-white"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Virtual Power Seminar on Blockchain</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Understanding blockchain technology, its applications, and impact on various 
                    industries and digital transformation.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <i className="ri-bar-chart-box-line text-7xl text-white"></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">FDP on Microsoft Power BI Data Analyst</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Faculty Development Program focused on data visualization and analytics using 
                    Microsoft Power BI tools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits for Students */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-star-line text-4xl"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Benefits for Students</h2>
                  <p className="text-indigo-100 leading-relaxed mb-4">
                    The ICT Academy has a positive impact on students by helping them gain practical 
                    skills and knowledge that employers are looking for. By participating in these 
                    programs, students learn how to tackle challenges, think critically, and build 
                    confidence in their abilities.
                  </p>
                  <p className="text-indigo-100 leading-relaxed">
                    This hands-on approach prepares them for future careers in technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Commitment to Excellence */}
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="ri-award-line text-4xl text-white"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Commitment to Excellence</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The Academy is dedicated to providing high-quality technology education. It creates 
                    a supportive environment where students can share ideas and work together.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By doing so, students are not only equipped with valuable skills but also encouraged 
                    to become innovative thinkers who can contribute to technological advancements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          {photos.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Photo Gallery</h2>
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

          {photos.length === 0 && (
            <div className="text-center py-16">
              <i className="ri-image-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500 text-lg">No photos available yet</p>
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
            <img
              src={selectedPhoto.image_url}
              alt={selectedPhoto.caption}
              className="w-full h-auto rounded-lg"
            />
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
