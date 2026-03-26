import { useState, useEffect } from 'react';
import { contactService, ContactInfo, UpdateContactInfoData } from '../../../services/contactService';

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  const [formData, setFormData] = useState<UpdateContactInfoData>({
    address: '',
    phone_primary: '',
    phone_secondary: '',
    email_primary: '',
    email_secondary: '',
    map_embed_url: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    instagram_url: '',
    youtube_url: ''
  });

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      const data = await contactService.getContactInfo();
      if (data) {
        setContactInfo(data);
        setFormData({
          address: data.address || '',
          phone_primary: data.phone_primary || '',
          phone_secondary: data.phone_secondary || '',
          email_primary: data.email_primary || '',
          email_secondary: data.email_secondary || '',
          map_embed_url: data.map_embed_url || '',
          facebook_url: data.facebook_url || '',
          twitter_url: data.twitter_url || '',
          linkedin_url: data.linkedin_url || '',
          instagram_url: data.instagram_url || '',
          youtube_url: data.youtube_url || ''
        });
      }
    } catch (error) {
      console.error('Error loading contact info:', error);
      showToast('Failed to load contact information', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      await contactService.updateContactInfo(formData);
      showToast('Contact information updated successfully', 'success');
      loadContactInfo();
    } catch (error) {
      console.error('Error updating contact info:', error);
      showToast('Failed to update contact information', 'error');
    } finally {
      setSaving(false);
    }
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
          <p className="mt-4 text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Information Management</h1>
          <p className="text-gray-600 mt-1">Update college contact details and social media links</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <i className="ri-information-line mr-2"></i>
            All fields are optional. Fill in only the information you have available.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-map-pin-line text-emerald-600"></i>
                Address Information
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College Address <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter full college address"
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-phone-line text-emerald-600"></i>
                Phone Numbers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Phone <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone_primary}
                    onChange={(e) => setFormData({ ...formData, phone_primary: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+91-1234-567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Phone <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone_secondary}
                    onChange={(e) => setFormData({ ...formData, phone_secondary: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="+91-1234-567891"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-mail-line text-emerald-600"></i>
                Email Addresses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Email <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email_primary}
                    onChange={(e) => setFormData({ ...formData, email_primary: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="principal@college.edu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Email <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email_secondary}
                    onChange={(e) => setFormData({ ...formData, email_secondary: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="info@college.edu"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-map-2-line text-emerald-600"></i>
                Google Maps
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Map Embed URL <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.map_embed_url}
                  onChange={(e) => setFormData({ ...formData, map_embed_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get embed URL from Google Maps &gt; Share &gt; Embed a map
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-share-line text-emerald-600"></i>
                Social Media Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-facebook-box-line text-blue-600 mr-1"></i>
                    Facebook <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-twitter-x-line text-gray-900 mr-1"></i>
                    Twitter <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://twitter.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-linkedin-box-line text-blue-700 mr-1"></i>
                    LinkedIn <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-instagram-line text-pink-600 mr-1"></i>
                    Instagram <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-youtube-line text-red-600 mr-1"></i>
                    YouTube <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.youtube_url}
                    onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://youtube.com/@..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line"></i>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
