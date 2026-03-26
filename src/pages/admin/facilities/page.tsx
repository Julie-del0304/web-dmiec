import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { facilityService, Facility, FacilityPhoto } from '../../../services/facilityService';
import { supabase } from '../../../lib/supabase';

export default function AdminFacilitiesPage() {
  const navigate = useNavigate();
  const { logout, username } = useAuth();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [photos, setPhotos] = useState<FacilityPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [showEditDescModal, setShowEditDescModal] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');

  useEffect(() => {
    loadFacilities();
  }, []);

  useEffect(() => {
    if (selectedFacility) {
      loadPhotos(selectedFacility.id);
    }
  }, [selectedFacility]);

  const loadFacilities = async () => {
    try {
      const data = await facilityService.getAllFacilities();
      setFacilities(data);
      if (data.length > 0 && !selectedFacility) {
        setSelectedFacility(data[0]);
      }
    } catch (error) {
      console.error('Error loading facilities:', error);
      alert('Failed to load facilities');
    } finally {
      setLoading(false);
    }
  };

  const loadPhotos = async (facilityId: string) => {
    try {
      const data = await facilityService.getFacilityPhotos(facilityId);
      setPhotos(data);
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `facility-photos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('facility-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('facility-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleAddPhoto = async () => {
    if (!selectedFacility) {
      alert('Please select a facility');
      return;
    }

    if (uploadMethod === 'file' && !selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    if (uploadMethod === 'url' && !newPhotoUrl.trim()) {
      alert('Please enter a photo URL');
      return;
    }

    setUploading(true);
    try {
      let imageUrl = newPhotoUrl;

      if (uploadMethod === 'file' && selectedFile) {
        imageUrl = await uploadImageToSupabase(selectedFile);
      }

      await facilityService.addPhoto(selectedFacility.id, imageUrl, newPhotoCaption);
      await loadPhotos(selectedFacility.id);
      
      // Reset form
      setShowAddPhotoModal(false);
      setNewPhotoUrl('');
      setNewPhotoCaption('');
      setSelectedFile(null);
      setPreviewUrl('');
      setUploadMethod('file');
      
      alert('Photo added successfully!');
    } catch (error) {
      console.error('Error adding photo:', error);
      alert('Failed to add photo');
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      await facilityService.deletePhoto(photoId);
      await loadPhotos(selectedFacility!.id);
      alert('Photo deleted successfully!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo');
    }
  };

  const handleUpdateDescription = async () => {
    if (!selectedFacility) return;

    try {
      await facilityService.updateFacility(selectedFacility.id, editDescription);
      await loadFacilities();
      setShowEditDescModal(false);
      alert('Description updated successfully!');
    } catch (error) {
      console.error('Error updating description:', error);
      alert('Failed to update description');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-5xl text-teal-600 animate-spin"></i>
          <p className="mt-4 text-gray-600">Loading facilities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-800 text-white shadow-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://static.readdy.ai/image/aed2a83e7960c786dd7bda1b18d3e021/03378c8fff0e87b1630499bbdd646dab.jpeg"
                alt="DMI Engineering College Logo"
                className="h-16 w-16 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h1 className="text-4xl font-bold">Facilities Management</h1>
                <p className="text-white/80 text-sm">Welcome back, {username}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/admin')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-arrow-left-line"></i>
                Back to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500/90 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-logout-box-line"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Facilities Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Facilities</h2>
              <div className="space-y-2">
                {facilities.map((facility) => (
                  <button
                    key={facility.id}
                    onClick={() => setSelectedFacility(facility)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                      selectedFacility?.id === facility.id
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <i className="ri-building-line mr-2"></i>
                    {facility.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {selectedFacility && (
              <>
                {/* Facility Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedFacility.name}</h2>
                      <p className="text-gray-600">{selectedFacility.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditDescription(selectedFacility.description || '');
                        setShowEditDescModal(true);
                      }}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-edit-line"></i>
                      Edit Description
                    </button>
                  </div>
                </div>

                {/* Photos Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Photo Gallery</h3>
                    <button
                      onClick={() => setShowAddPhotoModal(true)}
                      className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-add-line"></i>
                      Add Photo
                    </button>
                  </div>

                  {photos.length === 0 ? (
                    <div className="text-center py-12">
                      <i className="ri-image-line text-6xl text-gray-300 mb-4"></i>
                      <p className="text-gray-500 text-lg">No photos yet. Add your first photo!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {photos.map((photo) => (
                        <div key={photo.id} className="group relative bg-gray-50 rounded-lg overflow-hidden">
                          <div className="w-full h-48">
                            <img
                              src={photo.image_url}
                              alt={photo.caption || selectedFacility.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-600">{photo.caption || 'No caption'}</p>
                          </div>
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Photo Modal */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Photo</h3>
            
            {/* Upload Method Toggle */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => {
                  setUploadMethod('file');
                  setNewPhotoUrl('');
                }}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  uploadMethod === 'file'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className="ri-upload-2-line mr-2"></i>
                Upload File
              </button>
              <button
                onClick={() => {
                  setUploadMethod('url');
                  setSelectedFile(null);
                  setPreviewUrl('');
                }}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  uploadMethod === 'url'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className="ri-link mr-2"></i>
                Use URL
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {uploadMethod === 'file' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Photo *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <i className="ri-image-add-line text-4xl text-gray-400 mb-2"></i>
                      <span className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : 'Click to select a photo'}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        Max size: 5MB
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo URL *
                  </label>
                  <input
                    type="url"
                    value={newPhotoUrl}
                    onChange={(e) => {
                      setNewPhotoUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  placeholder="Enter photo caption"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddPhotoModal(false);
                  setNewPhotoUrl('');
                  setNewPhotoCaption('');
                  setSelectedFile(null);
                  setPreviewUrl('');
                  setUploadMethod('file');
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddPhoto}
                disabled={uploading || (uploadMethod === 'file' ? !selectedFile : !newPhotoUrl.trim())}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {uploading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Uploading...
                  </>
                ) : (
                  'Add Photo'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Description Modal */}
      {showEditDescModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Description</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter facility description"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowEditDescModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateDescription}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Update Description
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
