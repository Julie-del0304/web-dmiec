import { useState, useEffect } from 'react';
import { galleryService, GalleryItem, CreateGalleryItemData } from '../../../services/galleryService';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const [formData, setFormData] = useState<CreateGalleryItemData>({
    title: '',
    description: '',
    type: 'image',
    category: 'images',
    image_url: '',
    video_url: '',
    display_order: 0
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAllItems();
      setItems(data);
    } catch (error) {
      console.error('Error loading gallery items:', error);
      showToast('Failed to load gallery items', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = galleryService.validateImageFile(file);
    if (validationError) {
      showToast(validationError, 'error');
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await galleryService.uploadImage(file);
      setFormData({ ...formData, image_url: imageUrl });
      showToast('Image uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      showToast('Failed to upload image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        await galleryService.updateItem(editingItem.id, formData);
        showToast('Gallery item updated successfully', 'success');
      } else {
        await galleryService.createItem(formData);
        showToast('Gallery item created successfully', 'success');
      }

      resetForm();
      loadItems();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      showToast('Failed to save gallery item', 'error');
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      type: item.type || 'image',
      category: item.category || 'images',
      image_url: item.image_url || '',
      video_url: item.video_url || '',
      display_order: item.display_order || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await galleryService.deleteItem(id);
      showToast('Gallery item deleted successfully', 'success');
      loadItems();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      showToast('Failed to delete gallery item', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'image',
      category: 'images',
      image_url: '',
      video_url: '',
      display_order: 0
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const filteredItems = filterCategory === 'all' 
    ? items 
    : items.filter(item => item.category === filterCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gallery items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
            <p className="text-gray-600 mt-1">Manage images and videos for the gallery</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <i className={`ri-${showForm ? 'close' : 'add'}-line`}></i>
            {showForm ? 'Cancel' : 'Add New Item'}
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <i className="ri-information-line mr-2"></i>
            All fields are optional. Fill in only the information you have available.
          </p>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-gray-400">(Optional)</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-gray-400">(Optional)</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="images">Images</option>
                    <option value="videos">Videos</option>
                    <option value="events">Events</option>
                    <option value="campus">Campus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter description"
                />
              </div>

              {formData.type === 'image' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Upload <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  {uploading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
                  {formData.image_url && (
                    <div className="mt-4">
                      <img src={formData.image_url} alt="Preview" className="w-48 h-48 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
              )}

              {formData.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://youtube.com/embed/..."
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {editingItem ? 'Update Item' : 'Create Item'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Gallery Items ({filteredItems.length})</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  filterCategory === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterCategory('images')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  filterCategory === 'images' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setFilterCategory('videos')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  filterCategory === 'videos' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Videos
              </button>
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <i className="ri-gallery-line text-6xl text-gray-300"></i>
              <p className="text-gray-500 mt-4">No gallery items found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {item.type === 'image' && item.image_url && (
                    <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                  )}
                  {item.type === 'video' && item.video_url && (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <i className="ri-video-line text-4xl text-gray-400"></i>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{item.title || 'Untitled'}</h3>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded whitespace-nowrap">
                        {item.category}
                      </span>
                    </div>
                    
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap text-sm"
                      >
                        <i className="ri-edit-line mr-1"></i>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap text-sm"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
