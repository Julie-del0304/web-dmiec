import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { placementService } from '../../../services/placementService';
import type { Recruiter } from '../../../types/placement';

export default function AdminRecruitersPage() {
  const { user } = useAuth();
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRecruiter, setEditingRecruiter] = useState<Recruiter | null>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    logo_url: '',
    website_url: '',
    category: '',
    display_order: 0
  });

  useEffect(() => {
    loadRecruiters();
  }, []);

  const loadRecruiters = async () => {
    try {
      const data = await placementService.getRecruiters();
      setRecruiters(data);
    } catch (error) {
      console.error('Error loading recruiters:', error);
      alert('Failed to load recruiters');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRecruiter) {
        await placementService.updateRecruiter(editingRecruiter.id, formData);
      } else {
        await placementService.createRecruiter(formData);
      }
      await loadRecruiters();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving recruiter:', error);
      alert('Failed to save recruiter');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recruiter?')) return;
    try {
      await placementService.deleteRecruiter(id);
      await loadRecruiters();
    } catch (error) {
      console.error('Error deleting recruiter:', error);
      alert('Failed to delete recruiter');
    }
  };

  const handleEdit = (recruiter: Recruiter) => {
    setEditingRecruiter(recruiter);
    setFormData({
      company_name: recruiter.company_name,
      logo_url: recruiter.logo_url,
      website_url: recruiter.website_url || '',
      category: recruiter.category || '',
      display_order: recruiter.display_order
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRecruiter(null);
    setFormData({
      company_name: '',
      logo_url: '',
      website_url: '',
      category: '',
      display_order: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recruiters Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Add Recruiter
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recruiters.map((recruiter) => (
              <div key={recruiter.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img 
                    src={recruiter.logo_url} 
                    alt={recruiter.company_name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 text-center line-clamp-2 min-h-[2.5rem] mb-2">
                    {recruiter.company_name}
                  </h3>
                  {recruiter.category && (
                    <p className="text-xs text-teal-600 text-center mb-3">{recruiter.category}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(recruiter)}
                      className="flex-1 bg-teal-600 text-white py-1.5 rounded text-xs hover:bg-teal-700 transition-colors whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(recruiter.id)}
                      className="flex-1 bg-red-600 text-white py-1.5 rounded text-xs hover:bg-red-700 transition-colors whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingRecruiter ? 'Edit Recruiter' : 'Add Recruiter'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="https://example.com/logo.png"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="e.g., IT Services, Manufacturing, Consulting"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                >
                  {editingRecruiter ? 'Update Recruiter' : 'Add Recruiter'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
