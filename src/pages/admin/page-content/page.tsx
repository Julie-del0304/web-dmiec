import { useState, useEffect } from 'react';
import { pageContentService, PageContent, CreatePageContentData } from '../../../services/pageContentService';

const PAGE_SLUGS = [
  { value: 'naac-iqac', label: 'NAAC - IQAC' },
  { value: 'naac-ssr', label: 'NAAC - SSR' },
  { value: 'naac-aqar', label: 'NAAC - AQAR' },
  { value: 'naac-rit', label: 'NAAC - RIT' },
  { value: 'naac-self-declaration', label: 'NAAC - Self Declaration' },
  { value: 'naac-criteria-documents', label: 'NAAC - Criteria Documents' },
  { value: 'research-policy', label: 'Research - Policy' },
  { value: 'research-publications', label: 'Research - Publications' },
  { value: 'research-rd-projects', label: 'Research - R&D Projects' },
  { value: 'research-funded-projects', label: 'Research - Funded Projects' },
  { value: 'research-ipr-patents', label: 'Research - IPR/Patents' },
  { value: 'research-coe', label: 'Research - Centre of Excellence' },
  { value: 'research-rd-resonance', label: 'Research - R&D Resonance' },
  { value: 'committee-anti-ragging', label: 'Committee - Anti-Ragging' },
  { value: 'committee-grievance', label: 'Committee - Grievance Redressal' },
  { value: 'committee-icc', label: 'Committee - Internal Complaints' },
  { value: 'committee-iqac', label: 'Committee - IQAC' },
  { value: 'about-overview', label: 'About - Overview' },
  { value: 'about-administration', label: 'About - Administration' },
  { value: 'about-governing-council', label: 'About - Governing Council' },
  { value: 'about-recruitment-policy', label: 'About - Recruitment Policy' },
  { value: 'about-service-rules', label: 'About - Service Rules' },
  { value: 'placement-cell', label: 'Placement - Training Cell' },
  { value: 'placement-edc', label: 'Placement - EDC Cell' },
  { value: 'innovation-startup', label: 'Innovation - Startup' },
  { value: 'innovation-incubation', label: 'Innovation - Incubation' },
  { value: 'innovation-iic', label: 'Innovation - IIC' },
];

export default function PageContentManagement() {
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingDocs, setUploadingDocs] = useState(false);

  const [formData, setFormData] = useState<CreatePageContentData>({
    page_slug: '',
    section_title: '',
    body_text: '',
    image_urls: [],
    pdf_urls: [],
    doc_urls: [],
    video_url: '',
    display_order: 0,
  });

  useEffect(() => {
    if (selectedSlug) {
      loadContents();
    }
  }, [selectedSlug]);

  const loadContents = async () => {
    if (!selectedSlug) return;
    setLoading(true);
    try {
      const data = await pageContentService.getByPageSlug(selectedSlug);
      setContents(data);
    } catch (error) {
      console.error('Error loading contents:', error);
      alert('Failed to load page contents');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      const uploadPromises = Array.from(files).map(file => 
        pageContentService.uploadImage(file)
      );
      const urls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        image_urls: [...(prev.image_urls || []), ...urls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'doc') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingDocs(true);
    try {
      const uploadPromises = Array.from(files).map(file => 
        pageContentService.uploadDocument(file)
      );
      const urls = await Promise.all(uploadPromises);
      
      if (type === 'pdf') {
        setFormData(prev => ({
          ...prev,
          pdf_urls: [...(prev.pdf_urls || []), ...urls]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          doc_urls: [...(prev.doc_urls || []), ...urls]
        }));
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
      alert('Failed to upload documents');
    } finally {
      setUploadingDocs(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls?.filter((_, i) => i !== index)
    }));
  };

  const removeDocument = (index: number, type: 'pdf' | 'doc') => {
    if (type === 'pdf') {
      setFormData(prev => ({
        ...prev,
        pdf_urls: prev.pdf_urls?.filter((_, i) => i !== index)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        doc_urls: prev.doc_urls?.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlug) {
      alert('Please select a page first');
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        page_slug: selectedSlug,
      };

      if (editingId) {
        await pageContentService.update(editingId, dataToSubmit);
        alert('Content updated successfully!');
      } else {
        await pageContentService.create(dataToSubmit);
        alert('Content added successfully!');
      }

      resetForm();
      loadContents();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content');
    }
  };

  const handleEdit = (content: PageContent) => {
    setFormData({
      page_slug: content.page_slug,
      section_title: content.section_title || '',
      body_text: content.body_text || '',
      image_urls: content.image_urls || [],
      pdf_urls: content.pdf_urls || [],
      doc_urls: content.doc_urls || [],
      video_url: content.video_url || '',
      display_order: content.display_order,
    });
    setEditingId(content.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content block?')) return;

    try {
      await pageContentService.delete(id);
      alert('Content deleted successfully!');
      loadContents();
    } catch (error) {
      console.error('Error deleting content:', error);
      alert('Failed to delete content');
    }
  };

  const resetForm = () => {
    setFormData({
      page_slug: '',
      section_title: '',
      body_text: '',
      image_urls: [],
      pdf_urls: [],
      doc_urls: [],
      video_url: '',
      display_order: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <i className="ri-file-list-3-line text-emerald-600"></i>
            Page Content Management
          </h1>
          <p className="text-gray-600">Manage dynamic content for all pages</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 flex items-center gap-2">
            <i className="ri-information-line"></i>
            All fields are optional. Upload images, PDFs, DOCs, and videos as needed.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Page
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">-- Choose a page --</option>
            {PAGE_SLUGS.map(page => (
              <option key={page.value} value={page.value}>
                {page.label}
              </option>
            ))}
          </select>
        </div>

        {selectedSlug && (
          <>
            <div className="mb-6">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className={showForm ? "ri-close-line" : "ri-add-line"}></i>
                {showForm ? 'Cancel' : 'Add New Content Block'}
              </button>
            </div>

            {showForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {editingId ? 'Edit Content Block' : 'Add New Content Block'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.section_title}
                      onChange={(e) => setFormData({ ...formData, section_title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter section title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Body Text (Optional)
                    </label>
                    <textarea
                      value={formData.body_text}
                      onChange={(e) => setFormData({ ...formData, body_text: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter detailed content text"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploadingImages}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    {uploadingImages && <p className="text-sm text-gray-600 mt-2">Uploading images...</p>}
                    {formData.image_urls && formData.image_urls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {formData.image_urls.map((url, index) => (
                          <div key={index} className="relative">
                            <img src={url} alt={`Upload ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full hover:bg-red-700 flex items-center justify-center"
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PDF Documents (Optional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => handleDocumentUpload(e, 'pdf')}
                      disabled={uploadingDocs}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    {formData.pdf_urls && formData.pdf_urls.length > 0 && (
                      <div className="space-y-2 mt-4">
                        {formData.pdf_urls.map((url, index) => (
                          <div key={index} className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                            <span className="text-sm text-gray-700">PDF Document {index + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeDocument(index, 'pdf')}
                              className="text-red-600 hover:text-red-800"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Word Documents (Optional)
                    </label>
                    <input
                      type="file"
                      accept=".doc,.docx"
                      multiple
                      onChange={(e) => handleDocumentUpload(e, 'doc')}
                      disabled={uploadingDocs}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    {formData.doc_urls && formData.doc_urls.length > 0 && (
                      <div className="space-y-2 mt-4">
                        {formData.doc_urls.map((url, index) => (
                          <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                            <span className="text-sm text-gray-700">Word Document {index + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeDocument(index, 'doc')}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="YouTube URL or direct video URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                    >
                      {editingId ? 'Update Content' : 'Add Content'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors whitespace-nowrap"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Content Blocks for {PAGE_SLUGS.find(p => p.value === selectedSlug)?.label}
              </h2>

              {loading ? (
                <p className="text-gray-600">Loading...</p>
              ) : contents.length === 0 ? (
                <p className="text-gray-600">No content blocks yet. Add your first one above!</p>
              ) : (
                <div className="space-y-6">
                  {contents.map((content) => (
                    <div key={content.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {content.section_title || 'Untitled Section'}
                          </h3>
                          <p className="text-sm text-gray-500">Order: {content.display_order}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(content)}
                            className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded"
                          >
                            <i className="ri-edit-line"></i> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(content.id)}
                            className="text-red-600 hover:text-red-800 px-3 py-1 rounded"
                          >
                            <i className="ri-delete-bin-line"></i> Delete
                          </button>
                        </div>
                      </div>

                      {content.body_text && (
                        <p className="text-gray-700 mb-4 line-clamp-3">{content.body_text}</p>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {content.image_urls && content.image_urls.length > 0 && (
                          <span className="flex items-center gap-1">
                            <i className="ri-image-line"></i> {content.image_urls.length} images
                          </span>
                        )}
                        {content.pdf_urls && content.pdf_urls.length > 0 && (
                          <span className="flex items-center gap-1">
                            <i className="ri-file-pdf-line"></i> {content.pdf_urls.length} PDFs
                          </span>
                        )}
                        {content.doc_urls && content.doc_urls.length > 0 && (
                          <span className="flex items-center gap-1">
                            <i className="ri-file-word-line"></i> {content.doc_urls.length} DOCs
                          </span>
                        )}
                        {content.video_url && (
                          <span className="flex items-center gap-1">
                            <i className="ri-video-line"></i> 1 video
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
