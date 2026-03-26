
import { useState, useEffect } from 'react';
import { laboratoryService } from '../../../services/laboratoryService';
import type { Laboratory, LaboratoryPhoto } from '../../../types/laboratory';
import Navbar from '../../home/components/Navbar';
import Footer from '../../home/components/Footer';

const departments = [
  { id: 'all', name: 'All Departments', icon: 'ri-grid-line', color: 'teal' },
  { id: 'CSE', name: 'Computer Science', icon: 'ri-computer-line', color: 'blue' },
  { id: 'IT', name: 'Information Technology', icon: 'ri-code-line', color: 'indigo' },
  { id: 'ECE', name: 'Electronics & Communication', icon: 'ri-radio-line', color: 'purple' },
  { id: 'EEE', name: 'Electrical & Electronics', icon: 'ri-flashlight-line', color: 'amber' },
  { id: 'Mechanical', name: 'Mechanical Engineering', icon: 'ri-settings-3-line', color: 'slate' },
  { id: 'Civil', name: 'Civil Engineering', icon: 'ri-building-2-line', color: 'cyan' },
  { id: 'AIDS', name: 'AI & Data Science', icon: 'ri-brain-line', color: 'rose' },
  { id: 'Science', name: 'Science & Humanities', icon: 'ri-flask-line', color: 'emerald' }
];

export default function LaboratoriesPage() {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [filteredLabs, setFilteredLabs] = useState<Laboratory[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedLab, setSelectedLab] = useState<Laboratory | null>(null);
  const [labPhotos, setLabPhotos] = useState<Record<string, LaboratoryPhoto[]>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<LaboratoryPhoto | null>(null);
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

  // -------------------------------------------------------------------------
  // Fetch laboratories & their photos
  // -------------------------------------------------------------------------
  useEffect(() => {
    fetchLaboratories();
  }, []);

  // Filter labs whenever the department selector or the lab list changes
  useEffect(() => {
    if (selectedDepartment === 'all') {
      setFilteredLabs(laboratories);
    } else {
      setFilteredLabs(laboratories.filter(lab => lab.department === selectedDepartment));
    }
  }, [selectedDepartment, laboratories]);

  const fetchLaboratories = async () => {
    try {
      const data = await laboratoryService.getAllLaboratories();
      setLaboratories(data);
      setFilteredLabs(data);

      // Fetch photos for all labs in parallel to speed up loading
      const photosMap: Record<string, LaboratoryPhoto[]> = {};
      await Promise.all(
        data.map(async (lab) => {
          try {
            const photos = await laboratoryService.getLaboratoryPhotos(lab.id);
            photosMap[lab.id] = photos;
          } catch (photoErr) {
            console.error(`Failed to fetch photos for lab ${lab.id}:`, photoErr);
            photosMap[lab.id] = [];
          }
        })
      );
      setLabPhotos(photosMap);
    } catch (error) {
      console.error('Error fetching laboratories:', error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------------------
  // Helpers for department styling
  // -------------------------------------------------------------------------
  const getDepartmentColor = (dept: string) => {
    const department = departments.find(d => d.id === dept);
    return department?.color || 'teal';
  };

  const getDepartmentIcon = (dept: string) => {
    const department = departments.find(d => d.id === dept);
    return department?.icon || 'ri-flask-line';
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  if (loading) {
    return (
      <>
        <Navbar scrolled={scrolled} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <i className="ri-loader-4-line text-4xl text-teal-600 animate-spin"></i>
            <p className="mt-4 text-gray-600">Loading laboratories...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar scrolled={scrolled} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-flask-line text-5xl"></i>
              </div>
              <h1 className="text-5xl font-bold mb-4">State-of-the-Art Laboratories</h1>
              <p className="text-xl text-teal-100 max-w-3xl mx-auto">
                Equipped with cutting-edge technology and modern equipment to foster innovation and hands-on learning
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="/" className="hover:text-teal-600 transition-colors">Home</a>
              <i className="ri-arrow-right-s-line"></i>
              <a href="/facilities/laboratories" className="hover:text-teal-600 transition-colors">Facilities</a>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-teal-600 font-medium">Laboratories</span>
            </div>
          </div>
        </div>

        {/* Department Filter */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {departments.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                    ${selectedDepartment === dept.id
                      ? `bg-${dept.color}-600 text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <i className={`${dept.icon} text-lg`}></i>
                  <span>{dept.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Laboratories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredLabs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-flask-line text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Laboratories Found</h3>
              <p className="text-gray-600">No laboratories available for this department yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLabs.map(lab => {
                const photos = labPhotos[lab.id] || [];
                const color = getDepartmentColor(lab.department);
                const icon = getDepartmentIcon(lab.department);

                return (
                  <div
                    key={lab.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedLab(lab)}
                  >
                    {/* Lab Image */}
                    {photos.length > 0 ? (
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={photos[0].image_url}
                          alt={lab.name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ) : (
                      <div className={`aspect-[16/10] bg-gradient-to-br from-${color}-500 to-${color}-600 flex items-center justify-center`}>
                        <i className={`${icon} text-6xl text-white/30`}></i>
                      </div>
                    )}

                    {/* Lab Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                            {lab.name}
                          </h3>
                          <span className={`inline-block px-3 py-1 bg-${color}-100 text-${color}-700 text-xs font-medium rounded-full`}>
                            {lab.department}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lab.description}</p>

                      <div className="space-y-2 mb-4">
                        {lab.capacity && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-group-line text-teal-600"></i>
                            <span>Capacity: {lab.capacity} students</span>
                          </div>
                        )}
                        {lab.equipment && lab.equipment.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-tools-line text-teal-600"></i>
                            <span>{lab.equipment.length} Equipment Types</span>
                          </div>
                        )}
                        {photos.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <i className="ri-image-line text-teal-600"></i>
                            <span>{photos.length} Photos</span>
                          </div>
                        )}
                      </div>

                      <button className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all whitespace-nowrap">
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Laboratory Detail Modal */}
      {selectedLab && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-${getDepartmentColor(selectedLab.department)}-100 rounded-lg flex items-center justify-center`}>
                  <i className={`${getDepartmentIcon(selectedLab.department)} text-2xl text-${getDepartmentColor(selectedLab.department)}-600`}></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedLab.name}</h2>
                  <span className={`inline-block px-3 py-1 bg-${getDepartmentColor(selectedLab.department)}-100 text-${getDepartmentColor(selectedLab.department)}-700 text-xs font-medium rounded-full mt-1`}>
                    {selectedLab.department}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLab(null)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Photo Gallery */}
              {labPhotos[selectedLab.id] && labPhotos[selectedLab.id].length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {labPhotos[selectedLab.id].map(photo => (
                      <div
                        key={photo.id}
                        className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group relative"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <img
                          src={photo.image_url}
                          alt={photo.caption || selectedLab.name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <i className="ri-zoom-in-line text-3xl text-white"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-information-line text-teal-600"></i>
                  About This Laboratory
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedLab.description}</p>
              </div>

              {/* Capacity */}
              {selectedLab.capacity && (
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                      <i className="ri-group-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Student Capacity</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedLab.capacity} Students</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Equipment List */}
              {selectedLab.equipment && selectedLab.equipment.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-tools-line text-teal-600"></i>
                    Equipment &amp; Facilities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedLab.equipment.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-check-line text-sm text-white"></i>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lab Incharge */}
              {selectedLab.incharge_name && (
                <div className="bg-gradient-to-r from-gray-50 to-teal-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-user-star-line text-teal-600"></i>
                    Laboratory In-Charge
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-2xl text-white"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedLab.incharge_name}</p>
                      {selectedLab.incharge_email && (
                        <a href={`mailto:${selectedLab.incharge_email}`} className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1">
                          <i className="ri-mail-line"></i>
                          {selectedLab.incharge_email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          <div className="max-w-5xl w-full">
            <img src={selectedPhoto.image_url} alt={selectedPhoto.caption || 'Laboratory'} className="w-full h-auto rounded-lg" />
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
