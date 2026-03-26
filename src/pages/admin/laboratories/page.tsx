
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { laboratoryService } from '../../../services/laboratoryService';
import type { Laboratory, LaboratoryPhoto } from '../../../types/laboratory';
import { useAuth } from '../../../hooks/useAuth';

const departments = [
  'CSE',
  'IT',
  'ECE',
  'EEE',
  'Mechanical',
  'Civil',
  'AIDS',
  'Science',
];

export default function AdminLaboratoriesPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Fixed generic type syntax (removed HTML entities)
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLab, setEditingLab] = useState<Laboratory | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedLabForPhotos, setSelectedLabForPhotos] = useState<Laboratory | null>(null);
  const [labPhotos, setLabPhotos] = useState<LaboratoryPhoto[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    department: 'CSE',
    description: '',
    equipment: '',
    capacity: '',
    incharge_name: '',
    incharge_email: '',
    display_order: '0',
  });

  const [photoFormData, setPhotoFormData] = useState({
    image_url: '',
    caption: '',
    display_order: '0',
  });

  // -------------------------------------------------------------------------
  // Authentication & data fetching
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchLaboratories();
    }
  }, [user]);

  const fetchLaboratories = async () => {
    try {
      const data = await laboratoryService.getAllLaboratories();
      setLaboratories(data);
    } catch (error) {
      console.error('Error fetching laboratories:', error);
      alert('Failed to fetch laboratories');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------------------
  // Laboratory CRUD
  // -------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const equipmentArray = formData.equipment
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const labData = {
        name: formData.name,
        department: formData.department,
        description: formData.description,
        equipment: equipmentArray,
        capacity: parseInt(formData.capacity) || 0,
        incharge_name: formData.incharge_name,
        incharge_email: formData.incharge_email,
        display_order: parseInt(formData.display_order) || 0,
      };

      if (editingLab) {
        await laboratoryService.updateLaboratory(editingLab.id, labData);
        alert('Laboratory updated successfully!');
      } else {
        await laboratoryService.createLaboratory(labData);
        alert('Laboratory created successfully!');
      }

      setShowModal(false);
      resetForm();
      fetchLaboratories();
    } catch (error) {
      console.error('Error saving laboratory:', error);
      alert('Failed to save laboratory');
    }
  };

  const handleEdit = (lab: Laboratory) => {
    setEditingLab(lab);
    setFormData({
      name: lab.name,
      department: lab.department,
      description: lab.description,
      equipment: lab.equipment.join('\n'),
      capacity: lab.capacity.toString(),
      incharge_name: lab.incharge_name,
      incharge_email: lab.incharge_email,
      display_order: lab.display_order.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this laboratory?')) return;

    try {
      await laboratoryService.deleteLaboratory(id);
      alert('Laboratory deleted successfully!');
      fetchLaboratories();
    } catch (error) {
      console.error('Error deleting laboratory:', error);
      alert('Failed to delete laboratory');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      department: 'CSE',
      description: '',
      equipment: '',
      capacity: '',
      incharge_name: '',
      incharge_email: '',
      display_order: '0',
    });
    setEditingLab(null);
  };

  // -------------------------------------------------------------------------
  // Photo management
  // -------------------------------------------------------------------------
  const handleManagePhotos = async (lab: Laboratory) => {
    setSelectedLabForPhotos(lab);
    try {
      const photos = await laboratoryService.getLaboratoryPhotos(lab.id);
      setLabPhotos(photos);
      setShowPhotoModal(true);
    } catch (error) {
      console.error('Error fetching photos:', error);
      alert('Failed to fetch photos');
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLabForPhotos) return;

    try {
      await laboratoryService.addPhoto({
        laboratory_id: selectedLabForPhotos.id,
        image_url: photoFormData.image_url,
        caption: photoFormData.caption,
        display_order: parseInt(photoFormData.display_order) || 0,
      });

      alert('Photo added successfully!');
      setPhotoFormData({ image_url: '', caption: '', display_order: '0' });

      const photos = await laboratoryService.getLaboratoryPhotos(selectedLabForPhotos.id);
      setLabPhotos(photos);
    } catch (error) {
      console.error('Error adding photo:', error);
      alert('Failed to add photo');
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    if (!selectedLabForPhotos) return;

    try {
      await laboratoryService.deletePhoto(photoId);
      alert('Photo deleted successfully!');

      const photos = await laboratoryService.getLaboratoryPhotos(selectedLabForPhotos.id);
      setLabPhotos(photos);
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo');
    }
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-teal-600 animate-spin" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <i className="ri-arrow-left-line text-xl text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Laboratory Management</h1>
                <p className="text-sm text-gray-600 mt-1">Manage laboratories and equipment</p>
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-add-line text-xl" />
              Add Laboratory
            </button>
          </div>
        </div>
      </div>

      {/* Laboratories List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {laboratories.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <i className="ri-flask-line text-6xl text-gray-300" />
            <p className="mt-4 text-gray-600">No laboratories yet. Add your first laboratory!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laboratories.map((lab) => (
              <div key={lab.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{lab.name}</h3>
                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                        {lab.department}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{lab.description}</p>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <i className="ri-group-line text-teal-600" />
                      <span>Capacity: {lab.capacity} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-tools-line text-teal-600" />
                      <span>{lab.equipment.length} equipment types</span>
                    </div>
                    {lab.incharge_name && (
                      <div className="flex items-center gap-2">
                        <i className="ri-user-star-line text-teal-600" />
                        <span>{lab.incharge_name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleManagePhotos(lab)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                    >
                      <i className="ri-image-line mr-1" />
                      Photos
                    </button>
                    <button
                      onClick={() => handleEdit(lab)}
                      className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm whitespace-nowrap"
                    >
                      <i className="ri-edit-line mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lab.id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
                    >
                      <i className="ri-delete-bin-line mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Laboratory Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-8">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingLab ? 'Edit Laboratory' : 'Add New Laboratory'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <i className="ri-close-line text-xl text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Laboratory Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Equipment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment (one per line)
                </label>
                <textarea
                  value={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  rows={6}
                  placeholder="High-performance computers&#10;Network switches&#10;Projector system"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Capacity & Display Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity (students)
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              {/* In‑charge name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lab In‑Charge Name
                </label>
                <input
                  type="text"
                  value={formData.incharge_name}
                  onChange={(e) => setFormData({ ...formData, incharge_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* In‑charge email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lab In‑Charge Email
                </label>
                <input
                  type="email"
                  value={formData.incharge_email}
                  onChange={(e) => setFormData({ ...formData, incharge_email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                >
                  {editingLab ? 'Update Laboratory' : 'Create Laboratory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Management Modal */}
      {showPhotoModal && selectedLabForPhotos && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">
                Manage Photos - {selectedLabForPhotos.name}
              </h2>
              <button
                onClick={() => {
                  setShowPhotoModal(false);
                  setSelectedLabForPhotos(null);
                  setLabPhotos([]);
                }}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <i className="ri-close-line text-xl text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Add Photo Form */}
              <form onSubmit={handleAddPhoto} className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Add New Photo</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={photoFormData.image_url}
                      onChange={(e) => setPhotoFormData({ ...photoFormData, image_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                    <input
                      type="text"
                      value={photoFormData.caption}
                      onChange={(e) => setPhotoFormData({ ...photoFormData, caption: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      placeholder="Photo description"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                  >
                    Add Photo
                  </button>
                </div>
              </form>

              {/* Photos Grid */}
              {labPhotos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <i className="ri-image-line text-4xl mb-2" />
                  <p>No photos yet. Add your first photo!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {labPhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden">
                        <img
                          src={photo.image_url}
                          alt={photo.caption || 'Lab photo'}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      {photo.caption && (
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{photo.caption}</p>
                      )}
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-700"
                      >
                        <i className="ri-delete-bin-line" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
