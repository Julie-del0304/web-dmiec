import { useState, useEffect } from 'react';
import { newsService, NewsItem } from '../../../services/newsService';

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsService.getAllNews();
      setNews(data);
    } catch (error: any) {
      console.error('Error loading news:', error);
      const errorMessage = error?.message || 'Failed to load news items. Please check your connection and try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.date) {
      alert('Please select a date');
      return;
    }

    if (!editingNews && !imageFile) {
      alert('Please select an image');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      let imageUrl = formData.image_url;

      // Upload new image if selected
      if (imageFile) {
        try {
          imageUrl = await newsService.uploadNewsImage(imageFile);
        } catch (uploadError: any) {
          console.error('Image upload error:', uploadError);
          alert(`Failed to upload image: ${uploadError.message || 'Unknown error'}`);
          return;
        }
      }

      const newsData = {
        title: formData.title.trim(),
        image_url: imageUrl,
        date: formData.date,
      };

      if (editingNews) {
        await newsService.updateNews(editingNews.id, newsData);
      } else {
        await newsService.createNews(newsData);
      }

      // Reset form
      setFormData({ title: '', image_url: '', date: '' });
      setImageFile(null);
      setImagePreview('');
      setEditingNews(null);
      
      // Reload news
      await loadNews();
    } catch (error: any) {
      console.error('Error saving news:', error);
      const errorMessage = error?.message || 'Failed to save news item. Please try again.';
      alert(errorMessage);
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      image_url: newsItem.image_url,
      date: newsItem.date
    });
    setImagePreview(newsItem.image_url);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) {
      return;
    }

    try {
      setError(null);
      await newsService.deleteNews(id);
      await loadNews();
    } catch (error: any) {
      console.error('Error deleting news:', error);
      const errorMessage = error?.message || 'Failed to delete news item';
      alert(errorMessage);
      setError(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNews(null);
    setFormData({
      title: '',
      image_url: '',
      date: new Date().toISOString().split('T')[0]
    });
    setImageFile(null);
    setImagePreview('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-error-warning-line text-3xl text-red-600"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadNews}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Campus News Management</h1>
              <p className="text-slate-600">Manage campus news and updates</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap flex items-center gap-2"
            >
              <i className="ri-add-line text-xl"></i>
              Add News
            </button>
          </div>
        </div>

        {/* News List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : news.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <i className="ri-newspaper-line text-6xl text-slate-300 mb-4"></i>
            <p className="text-slate-500 text-lg">No news items yet. Add your first news!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-medium">
                      <i className="ri-calendar-line mr-1"></i>
                      {new Date(item.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2"
                    >
                      <i className="ri-edit-line"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-rose-600 transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-2"
                    >
                      <i className="ri-delete-bin-line"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {editingNews ? 'Edit News' : 'Add New News'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    News Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                    placeholder="Enter news title"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    News Image {!editingNews && '*'}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  />
                  {imagePreview && (
                    <div className="mt-4 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all duration-300 whitespace-nowrap"
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="ri-loader-4-line animate-spin"></i>
                        {editingNews ? 'Updating...' : 'Creating...'}
                      </span>
                    ) : (
                      editingNews ? 'Update News' : 'Create News'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
