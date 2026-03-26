import { useState, useEffect } from 'react';
import { sportsService, SportsContent, CreateSportsContentData } from '../../../services/sportsService';

export default function AdminSportsPage() {
  const [contents, setContents] = useState<SportsContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<SportsContent | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<CreateSportsContentData>({
    title: '',
    description: '',
    image_url: '',
    achievement_title: '',
    achievement_description: '',
    display_order: 0
  });

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      setLoading(true);
      const data = await sportsService.getAllContent();
      setContents(data);
    } catch (error) {
      console.error('Error loading sports content:', error);
      showToast('Failed to load sports content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = sportsService.validateImageFile(file);
    if (validationError) {
      showToast(validationError, 'error');
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await sportsService.uploadImage(file);
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
      if (editingContent) {
        await sportsService.updateContent(editingContent.id, formData);
        showToast('Sports content updated successfully', 'success');
      } else {
        await sportsService.createContent(formData);
        showToast('Sports content created successfully', 'success');
      }

      resetForm();
      loadContents();
    } catch (error) {
      console.error('Error saving sports content:', error);
      showToast('Failed to save sports content', 'error');
    }
  };

  const handleEdit = (content: SportsContent) => {
    setEditingContent(content);
    setFormData({
      title: content.title || '',
      description: content.description || '',
      image_url: content.image_url || '',
      achievement_title: content.achievement_title || '',
      achievement_description: content.achievement_description || '',
      display_order: content.display_order || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      await sportsService.deleteContent(id);
      showToast('Sports content deleted successfully', 'success');
      loadContents();
    } catch (error) {
      console.error('Error deleting sports content:', error);
      showToast('Failed to delete sports content', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      achievement_title: '',
      achievement_description: '',
      display_order: 0
    });
    setEditingContent(null);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sports content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sports Facility Management</h1>
            <p className="text-gray-600 mt-1">Manage sports facility content and achievements</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <i className={`ri-${showForm ? 'close' : 'add'}-line`}></i>
            {showForm ? 'Cancel' : 'Add New Content'}
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
              {editingContent ? 'Edit Sports Content' : 'Add New Sports Content'}
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
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter description"
                />
              </div>

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
                    <img src={formData.image_url} alt="Preview" className="w-64 h-48 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Achievement Title <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.achievement_title}
                      onChange={(e) => setFormData({ ...formData, achievement_title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter achievement title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Achievement Description <span className="text-gray-400">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.achievement_description}
                      onChange={(e) => setFormData({ ...formData, achievement_description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter achievement description"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {editingContent ? 'Update Content' : 'Create Content'}
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sports Content ({contents.length})</h2>

          {contents.length === 0 ? (
            <div className="text-center py-12">
              <i className="ri-football-line text-6xl text-gray-300"></i>
              <p className="text-gray-500 mt-4">No sports content found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {contents.map((content) => (
                <div key={content.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-6">
                    {content.image_url && (
                      <img src={content.image_url} alt={content.title} className="w-48 h-36 object-cover rounded-lg flex-shrink-0" />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{content.title || 'Untitled'}</h3>
                          <span className="text-sm text-gray-500">Order: {content.display_order}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(content)}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap text-sm"
                          >
                            <i className="ri-edit-line mr-1"></i>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(content.id)}
                            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap text-sm"
                          >
                            <i className="ri-delete-bin-line mr-1"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      {content.description && (
                        <p className="text-gray-600 mb-4">{content.description}</p>
                      )}
                      
                      {content.achievement_title && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                          <h4 className="font-semibold text-emerald-900 mb-1">
                            <i className="ri-trophy-line mr-2"></i>
                            {content.achievement_title}
                          </h4>
                          {content.achievement_description && (
                            <p className="text-sm text-emerald-700">{content.achievement_description}</p>
                          )}
                        </div>
                      )}
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
