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

interface Route {
  number: string;
  name: string;
  stops: string[];
}

export default function TransportationPage() {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [photos, setPhotos] = useState<FacilityPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<FacilityPhoto | null>(null);
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);
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

  const routes: Route[] = [
    {
      number: '1',
      name: 'METUKADAI',
      stops: [
        'METUKADAI', 'KURUMPANAI', 'KURUMPANAI EAST', 'VANIYAKUDI', 'KODIMUNAI', 
        'COLACHAL', 'KALIMAR', 'KARUNGAL', 'THIKANAMCODE', 'ELANTHAVILAI', 
        'MONDAY MARKET', 'ERANIEL', 'KANDANVILAI', 'MOTTAVILAI', 'PEYANKUZHY', 
        'PARASERY', 'GOLDEN BAKERY', 'KRISHNANCOIL', 'DMIEC'
      ]
    },
    {
      number: '2',
      name: 'UDAYAPPANKUDIRUPU',
      stops: [
        'UDAYAPPANKUDIRUPU', 'NGO COLONY', 'VALLANKUMARAN VILAI', 'BEACH ROAD', 
        'PARAKAI', 'THENGAMPUDUR', 'PUTHALAM', 'MELAMANAKUDI MAIN ROAD', 
        'SOUTH THAMARAIKULAM', 'MUKILAN KUDIRUPPU', 'KOVALAM', 'KANYAKUMARI', 
        'CHURCH ROAD', 'MATHAVAPURAM', 'AROKIYAPURAM', 'LEEPURAM MAIN ROAD', 'DMIEC'
      ]
    },
    {
      number: '3',
      name: 'UVARI',
      stops: [
        'UVARI', 'PALLIVASAL', 'KADUTHALA', 'IDINTHAKARAI', 'VAIRAVI KINARU', 
        'KUNDANKULAM', 'PERUMANAL', 'CHETTIKULAM', 'KOOTAPULY', 'MAHARAJAPURAM', 
        'KOTTARAM', 'MANTHARAN', 'PUDUR', 'POTHAIYADI', 'VALUKKAMPARAI', 
        'MYLADY', 'PUNNARKULAM', 'AZHAGAPPAPURAM', 'JAMES TOWN', 'ANJUGRAMAM', 
        'LEVENJIPURAM', 'DMIEC'
      ]
    },
    {
      number: '4',
      name: 'PALLAM',
      stops: [
        'PALLAM', 'ELANTHAVILAI', 'SEMPONKARAI BRIDGE', 'KESAVAN PUTHANTHURAI', 
        'ETHAMOZHI', 'RAJAKKAMANGALAM THURAI MAIN ROAD', 'POTTAL VILAKKU', 
        'POOCHI VILAGAM', 'VATTAKARAI', 'KURUSADI', 'ML HOSPITAL', 'CARMEL', 
        'RAMANPUDUR', 'CHETTIKULAM', 'ANNA BUS STAND', 'VADIVEESWARAM', 
        'MEENASHIPURAM', 'KOTTAR FIRE STATION', 'APTA MARKET', 
        'THIRUPATHISARAM VILAKKU', 'THERAIKALPUDUR', 'VELLAMADAM', 'MUTHUNAGAR', 'DMIEC'
      ]
    },
    {
      number: '5',
      name: 'MANJANKULAM',
      stops: [
        'MANJANKULAM', 'JJ NAGAR', 'KALAKADU', 'S N PALLIVASAL', 'SALAIPUTHUR', 
        'SOUTH SALAIPUDUR', 'ERVADI', 'ERVADI BYPASS', 'ANNA NAGAR', 'ESWARI HOSPITAL', 
        'VALLIYUR OLD ASHOKA', 'VALLIYUR OLD BUSTAND', 'VALLIYUR BUS DEPO', 
        'NAMBIYAN VILAI', 'S.VALLIYUR', 'KALANTHAPANAI', 'THALAVAIPURAM', 
        'DARMALINGAPURAM', 'PANAGUDI BUS STAND', 'LEBBAIKUDIRUPU', 
        'PERIYANAYAGIPURAM BUS STOP', 'PERIYANAYAGIPURAM GOVT SCHOOL', 
        'KAVALKINARU PUDUR', 'KAVALKINARU DEVAKOTTAI', 'DMIEC'
      ]
    },
    {
      number: '6',
      name: 'KADIYAPATTINAM',
      stops: [
        'JOSEPH SCHOOL', 'KADIYAPATTINAM', 'MUTTOM LIGHT HOUSE', 'VELLAMODI', 
        'SETHVOUR', 'KURUNTHANCODE', 'SENAPALLI', 'SARAL', 'ASARIPALLAM', 
        'ANANTHANPALAM', 'CHETTIKULAM', 'SUSEEDRAM', 'NALLUR', 'MARUNGUR', 
        'THOPPUR', 'RAJAVOOR', 'MUTHUNAGER', 'MOUNT', 'DMIEC'
      ]
    }
  ];

  useEffect(() => {
    fetchFacilityData();
  }, []);

  const fetchFacilityData = async () => {
    try {
      const { data: facilityData, error: facilityError } = await supabase
        .from('facilities')
        .select('*')
        .eq('slug', 'transportation')
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

  const toggleRoute = (routeNumber: string) => {
    setExpandedRoute(expandedRoute === routeNumber ? null : routeNumber);
  };

  if (loading) {
    return (
      <>
        <Navbar scrolled={scrolled} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <i className="ri-loader-4-line text-4xl text-sky-600 animate-spin"></i>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sky-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-sky-600 to-blue-600 text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-bus-line text-5xl"></i>
              </div>
              <h1 className="text-5xl font-bold mb-4">Transportation</h1>
              <p className="text-xl text-sky-100 max-w-3xl mx-auto">
                Embark on a journey of convenience and comfort with DMI College's exceptional transport services
              </p>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Hi-Tech Bus Fleet</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="mb-4">
                Our fleet of Hi-Tech buses ensures seamless commuting for students and staff alike, 
                from the bustling city to the serene suburbs and back.
              </p>
              <p>
                Experience the luxury of travel with our hi-tech buses, designed to make your journey 
                not only comfortable but also enjoyable. Our commitment to punctuality and safety ensures 
                that classes begin on time, fostering a culture of discipline and excellence. With routes 
                covering all major areas of the city, our transport section ensures efficient service, 
                promising punctuality and safety at every turn. Let us take you on a ride where every 
                mile is marked with comfort and convenience.
              </p>
            </div>
          </div>

          {/* Service Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-time-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Punctuality</h3>
              <p className="text-sky-100 text-sm">
                Timely service ensuring classes begin on schedule
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-shield-check-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-blue-100 text-sm">
                Well-maintained buses with experienced drivers
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-map-pin-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Coverage</h3>
              <p className="text-indigo-100 text-sm">
                Routes covering all major areas of the city
              </p>
            </div>
          </div>

          {/* Route Schedule Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Route Schedule</h2>
            <div className="space-y-4">
              {routes.map((route) => (
                <div
                  key={route.number}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <button
                    onClick={() => toggleRoute(route.number)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {route.number}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-gray-900">
                          Route {route.number} - {route.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {route.stops.length} stops • Click to view details
                        </p>
                      </div>
                    </div>
                    <i
                      className={`ri-arrow-down-s-line text-2xl text-gray-400 transition-transform duration-300 ${
                        expandedRoute === route.number ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </button>

                  {expandedRoute === route.number && (
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {route.stops.map((stop, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-sky-50 transition-colors"
                          >
                            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-semibold text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{stop}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
