import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface NewsEvent {
  id: string;
  date: string;
  title: string;
  image_url: string;
  description: string;
  tag: string;
  display_order: number;
}

interface PlacementSlide {
  id: string;
  name: string;
  branch: string;
  company: string;
  image_url: string;
  display_order: number;
  news_label?: string;
}

const NEWS_TAGS = [
  'Achievement', 'Award', 'Certification', 'Research',
  'Hackathon', 'Symposium', 'Sports Day', 'Cultural',
  'Paper Presentation', 'Workshop', 'Placement',
];

const tagColors: Record<string, { bg: string; color: string }> = {
  Placement:            { bg: '#dbeafe', color: '#1d4ed8' },
  Achievement:          { bg: '#dcfce7', color: '#15803d' },
  Award:                { bg: '#fef9c3', color: '#854d0e' },
  Certification:        { bg: '#f3e8ff', color: '#7e22ce' },
  Research:             { bg: '#e0f2fe', color: '#0369a1' },
  Hackathon:            { bg: '#ede9fe', color: '#6d28d9' },
  Symposium:            { bg: '#ccfbf1', color: '#0f766e' },
  'Sports Day':         { bg: '#fee2e2', color: '#b91c1c' },
  Cultural:             { bg: '#fce7f3', color: '#9d174d' },
  'Paper Presentation': { bg: '#ffedd5', color: '#c2410c' },
  Workshop:             { bg: '#e0f2fe', color: '#0369a1' },
};

export default function NewsEventsManagementPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'news' | 'slides'>('news');

  // ── News ──
  const [newsList, setNewsList]           = useState<NewsEvent[]>([]);
  const [newsLoading, setNewsLoading]     = useState(true);
  const [newsError, setNewsError]         = useState('');
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews]     = useState<NewsEvent | null>(null);
  const [newsForm, setNewsForm]           = useState({ date: '', title: '', image_url: '', description: '', tag: '', display_order: 0 });
  const [newsSaving, setNewsSaving]       = useState(false);
  const [uploadingNewsImg, setUploadingNewsImg] = useState(false);
  const newsImgRef = useRef<HTMLInputElement>(null);

  // ── Slides ──
  const [slides, setSlides]                   = useState<PlacementSlide[]>([]);
  const [slidesLoading, setSlidesLoading]     = useState(true);
  const [slidesError, setSlidesError]         = useState('');
  const [showSlideModal, setShowSlideModal]   = useState(false);
  const [showPhotoModal, setShowPhotoModal]   = useState(false);
  const [editingSlide, setEditingSlide]       = useState<PlacementSlide | null>(null);
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage]   = useState(false);
  const [slideForm, setSlideForm]             = useState({ name: '', branch: '', company: '', image_url: '', display_order: 0, news_label: '' });
  const [slideSaving, setSlideSaving]         = useState(false);
  const fileRef  = useRef<HTMLInputElement>(null);
  const fileRef2 = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchNews(); fetchSlides(); }, []);

  const fetchNews = async () => {
    try {
      setNewsLoading(true); setNewsError('');
      const { data, error } = await supabase.from('news_events').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setNewsList(data ?? []);
    } catch (err: any) { setNewsError(err?.message ?? 'Failed to load'); }
    finally { setNewsLoading(false); }
  };

  const fetchSlides = async () => {
    try {
      setSlidesLoading(true); setSlidesError('');
      const { data, error } = await supabase.from('placement_slides').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setSlides(data ?? []);
    } catch (err: any) { setSlidesError(err?.message ?? 'Failed to load'); }
    finally { setSlidesLoading(false); }
  };

  const handleImageUpload = async (file: File, prefix: string, onSuccess: (url: string) => void) => {
    try {
      const ext  = file.name.split('.').pop();
      const path = `${prefix}_${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('placement-photos').upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('placement-photos').getPublicUrl(path);
      onSuccess(data.publicUrl);
    } catch (err: any) { alert('Upload failed: ' + (err?.message ?? 'Unknown')); }
  };

  // ── NEWS CRUD ──
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setNewsSaving(true);
      if (editingNews) {
        const { error } = await supabase.from('news_events').update(newsForm).eq('id', editingNews.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('news_events').insert([newsForm]);
        if (error) throw error;
      }
      setShowNewsModal(false); resetNewsForm(); fetchNews();
    } catch (err: any) { alert('Error: ' + (err?.message ?? 'Unknown')); }
    finally { setNewsSaving(false); }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Delete this news item?')) return;
    try {
      const { error } = await supabase.from('news_events').delete().eq('id', id);
      if (error) throw error;
      fetchNews();
    } catch (err: any) { alert('Error: ' + err?.message); }
  };

  const openEditNews = (item: NewsEvent) => {
    setEditingNews(item);
    setNewsForm({ date: item.date, title: item.title, image_url: item.image_url || '', description: item.description || '', tag: item.tag || '', display_order: item.display_order });
    setShowNewsModal(true);
  };

  const resetNewsForm = () => {
    setNewsForm({ date: '', title: '', image_url: '', description: '', tag: '', display_order: 0 });
    setEditingNews(null);
    if (newsImgRef.current) newsImgRef.current.value = '';
  };

  // ── SLIDES CRUD ──
  const handleSlideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSlideSaving(true);
      if (editingSlide) {
        const { error } = await supabase.from('placement_slides').update(slideForm).eq('id', editingSlide.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('placement_slides').insert([slideForm]);
        if (error) throw error;
      }
      setShowSlideModal(false); resetSlideForm(); fetchSlides();
    } catch (err: any) { alert('Error: ' + (err?.message ?? 'Unknown')); }
    finally { setSlideSaving(false); }
  };

  const handleDeleteSlide = async (id: string) => {
    if (!confirm('Delete this slide?')) return;
    try {
      const { error } = await supabase.from('placement_slides').delete().eq('id', id);
      if (error) throw error;
      fetchSlides();
    } catch (err: any) { alert('Error: ' + err?.message); }
  };

  const openEditSlide = (slide: PlacementSlide) => {
    setEditingSlide(slide);
    setSlideForm({ name: slide.name, branch: slide.branch, company: slide.company, image_url: slide.image_url, display_order: slide.display_order, news_label: slide.news_label || '' });
    setShowSlideModal(true);
  };

  const resetSlideForm = () => {
    setSlideForm({ name: '', branch: '', company: '', image_url: '', display_order: 0, news_label: '' });
    setEditingSlide(null);
    if (fileRef.current) fileRef.current.value = '';
    if (fileRef2.current) fileRef2.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/admin')} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer">
                <i className="ri-arrow-left-line text-xl text-gray-600"></i>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">News &amp; Events</h1>
                <p className="text-gray-600 mt-1">Manage news items and placement slides</p>
              </div>
            </div>

            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button onClick={() => setTab('news')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${tab === 'news' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <i className="ri-newspaper-line mr-1"></i>News &amp; Events
              </button>
              <button onClick={() => setTab('slides')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${tab === 'slides' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <i className="ri-user-star-line mr-1"></i>Placement Slides
              </button>
            </div>

            <button
              onClick={() => { if (tab === 'news') { resetNewsForm(); setShowNewsModal(true); } else { resetSlideForm(); setShowSlideModal(true); } }}
              className="flex items-center space-x-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
              <i className="ri-add-line text-xl"></i>
              <span>{tab === 'news' ? 'Add News' : 'Add Slide'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* NEWS TAB */}
        {tab === 'news' && (
          <>
            {newsError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <i className="ri-error-warning-line text-red-500 text-xl flex-shrink-0 mt-0.5"></i>
                <div>
                  <p className="text-sm font-semibold text-red-700">Error loading news</p>
                  <p className="text-sm text-red-600 mt-1">{newsError}</p>
                  <button onClick={fetchNews} className="mt-2 text-sm font-semibold text-red-700 underline cursor-pointer">Try again</button>
                </div>
              </div>
            )}
            {newsLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600"></div>
              </div>
            ) : newsList.length === 0 && !newsError ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <i className="ri-newspaper-line text-6xl text-gray-400 mb-4 block"></i>
                <p className="text-xl text-gray-600 mb-6">No news items yet</p>
                <button onClick={() => { resetNewsForm(); setShowNewsModal(true); }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg cursor-pointer">
                  <i className="ri-add-line"></i> Add First News Item
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsList.map((item) => {
                  const tc = tagColors[item.tag] || { bg: '#f1f5f9', color: '#475569' };
                  return (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      {item.image_url && (
                        <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">{item.date}</span>
                          {item.tag && (
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={{ background: tc.bg, color: tc.color }}>{item.tag}</span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-gray-900 leading-snug mb-1">{item.title}</h3>
                        {item.description && <p className="text-sm text-gray-500 line-clamp-2 mb-2">{item.description}</p>}
                        <p className="text-xs text-gray-400 mb-3">Order: {item.display_order}</p>
                        <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                          <button onClick={() => openEditNews(item)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                            <i className="ri-edit-line"></i><span className="text-sm font-semibold">Edit</span>
                          </button>
                          <button onClick={() => handleDeleteNews(item.id)}
                            className="w-10 h-10 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors cursor-pointer">
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* SLIDES TAB */}
        {tab === 'slides' && (
          <>
            {slidesError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-700">{slidesError}</p>
                <button onClick={fetchSlides} className="mt-2 text-sm font-semibold text-red-700 underline cursor-pointer">Try again</button>
              </div>
            )}
            {slidesLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600"></div>
              </div>
            ) : slides.length === 0 && !slidesError ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <i className="ri-user-star-line text-6xl text-gray-400 mb-4 block"></i>
                <p className="text-xl text-gray-600 mb-6">No placement slides yet</p>
                <button onClick={() => { resetSlideForm(); setShowSlideModal(true); }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg cursor-pointer">
                  <i className="ri-add-line"></i> Add First Slide
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((slide) => (
                  <div key={slide.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {/* news_label இருந்தால் அதை காட்டு, இல்லாவிட்டால் "Placement" */}
                          <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full mb-2">
                            {slide.news_label || 'Placement'}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{slide.name}</h3>
                          <p className="text-sm font-semibold text-sky-600 mb-1">{slide.branch}</p>
                          <p className="text-gray-600 text-sm">{slide.company}</p>
                          <p className="text-xs text-gray-400 mt-1">Order: {slide.display_order}</p>
                        </div>
                        <div className="w-14 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0 ml-3">
                          {slide.image_url
                            ? <img src={slide.image_url} alt={slide.name} className="w-full h-full object-cover" />
                            : <i className="ri-user-3-line text-xl text-gray-400"></i>
                          }
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                        <button onClick={() => openEditSlide(slide)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                          <i className="ri-edit-line"></i><span className="text-sm font-semibold">Edit</span>
                        </button>
                        <button onClick={() => { setSelectedSlideId(slide.id); setShowPhotoModal(true); }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                          <i className="ri-image-line"></i><span className="text-sm font-semibold">Photo</span>
                        </button>
                        <button onClick={() => handleDeleteSlide(slide.id)}
                          className="w-10 h-10 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors cursor-pointer">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* NEWS MODAL */}
      {showNewsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{editingNews ? 'Edit News Item' : 'Add News Item'}</h2>
              <button onClick={() => { setShowNewsModal(false); resetNewsForm(); }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>
            <form onSubmit={handleNewsSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                <input type="text" required value={newsForm.date} onChange={e => setNewsForm({ ...newsForm, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  placeholder="e.g. March 15, 2025" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input type="text" required value={newsForm.title} onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  placeholder="e.g. TechVista 2025 Symposium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tag / Category</label>
                <select value={newsForm.tag} onChange={e => setNewsForm({ ...newsForm, tag: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none bg-white">
                  <option value="">-- Select tag --</option>
                  {NEWS_TAGS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea value={newsForm.description} onChange={e => setNewsForm({ ...newsForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none resize-none"
                  placeholder="Brief description shown below the image..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image / Poster</label>
                <div className="flex items-start gap-4">
                  {newsForm.image_url && (
                    <div className="w-24 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img src={newsForm.image_url} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <label className={`flex items-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${uploadingNewsImg ? 'border-sky-300 bg-sky-50' : 'border-gray-300 hover:border-sky-400 hover:bg-sky-50'}`}>
                      {uploadingNewsImg
                        ? <><i className="ri-loader-4-line animate-spin text-sky-600"></i><span className="text-sm font-medium text-sky-600">Uploading…</span></>
                        : <><i className="ri-upload-2-line text-gray-500"></i><span className="text-sm font-medium text-gray-600">Upload Image</span></>
                      }
                      <input ref={newsImgRef} type="file" accept="image/*" className="hidden"
                        onChange={async e => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingNewsImg(true);
                          await handleImageUpload(file, 'news', url => setNewsForm(p => ({ ...p, image_url: url })));
                          setUploadingNewsImg(false);
                        }} />
                    </label>
                    {newsForm.image_url && (
                      <button type="button" onClick={() => { setNewsForm(p => ({ ...p, image_url: '' })); if (newsImgRef.current) newsImgRef.current.value = ''; }}
                        className="text-xs text-red-500 mt-2 flex items-center gap-1 cursor-pointer hover:text-red-600">
                        <i className="ri-close-circle-line"></i> Remove image
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                <input type="number" value={newsForm.display_order} onChange={e => setNewsForm({ ...newsForm, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none" />
              </div>
              <div className="flex space-x-4 pt-2">
                <button type="button" onClick={() => { setShowNewsModal(false); resetNewsForm(); }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 whitespace-nowrap cursor-pointer">Cancel</button>
                <button type="submit" disabled={newsSaving || uploadingNewsImg}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg whitespace-nowrap cursor-pointer disabled:opacity-70">
                  {newsSaving ? 'Saving…' : editingNews ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SLIDE MODAL */}
      {showSlideModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{editingSlide ? 'Edit Placement Slide' : 'Add Placement Slide'}</h2>
              <button onClick={() => { setShowSlideModal(false); resetSlideForm(); }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>
            <form onSubmit={handleSlideSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name *</label>
                <input type="text" required value={slideForm.name} onChange={e => setSlideForm({ ...slideForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  placeholder="Enter student name" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Branch *</label>
                  <input type="text" required value={slideForm.branch} onChange={e => setSlideForm({ ...slideForm, branch: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    placeholder="e.g. IV CSE" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                  <input type="number" value={slideForm.display_order} onChange={e => setSlideForm({ ...slideForm, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
                <input type="text" required value={slideForm.company} onChange={e => setSlideForm({ ...slideForm, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  placeholder="e.g. TCS, Infosys" />
              </div>

              {/* ── NEW: News Label text input ── */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  News / Event Name
                  <span className="ml-2 text-xs font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={slideForm.news_label}
                  onChange={e => setSlideForm({ ...slideForm, news_label: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  placeholder='e.g. TechVista 2025  (blank-ஆக விட்டால் "Placement" காட்டும்)'
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Student Photo</label>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-gray-300">
                    {slideForm.image_url
                      ? <img src={slideForm.image_url} alt="preview" className="w-full h-full object-cover" />
                      : <i className="ri-user-3-line text-3xl text-gray-400"></i>
                    }
                  </div>
                  <div className="flex-1">
                    <label className={`flex items-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${uploadingImage ? 'border-sky-300 bg-sky-50' : 'border-gray-300 hover:border-sky-400 hover:bg-sky-50'}`}>
                      {uploadingImage
                        ? <><i className="ri-loader-4-line animate-spin text-sky-600"></i><span className="text-sm font-medium text-sky-600">Uploading…</span></>
                        : <><i className="ri-upload-2-line text-gray-500"></i><span className="text-sm font-medium text-gray-600">Upload Photo</span></>
                      }
                      <input ref={fileRef} type="file" accept="image/*" className="hidden"
                        onChange={async e => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingImage(true);
                          await handleImageUpload(file, 'placement', url => setSlideForm(p => ({ ...p, image_url: url })));
                          setUploadingImage(false);
                        }} />
                    </label>
                    {slideForm.image_url && (
                      <button type="button" onClick={() => { setSlideForm(p => ({ ...p, image_url: '' })); if (fileRef.current) fileRef.current.value = ''; }}
                        className="text-xs text-red-500 mt-2 flex items-center gap-1 cursor-pointer">
                        <i className="ri-close-circle-line"></i> Remove photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 pt-2">
                <button type="button" onClick={() => { setShowSlideModal(false); resetSlideForm(); }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 whitespace-nowrap cursor-pointer">Cancel</button>
                <button type="submit" disabled={slideSaving || uploadingImage}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg whitespace-nowrap cursor-pointer disabled:opacity-70">
                  {slideSaving ? 'Saving…' : editingSlide ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PHOTO MODAL */}
      {showPhotoModal && selectedSlideId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Update Student Photo</h2>
              <button onClick={() => { setShowPhotoModal(false); setSelectedSlideId(null); }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>
            <div className="p-6">
              {(() => {
                const slide = slides.find(s => s.id === selectedSlideId);
                return (
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-36 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                      {slide?.image_url
                        ? <img src={slide.image_url} alt={slide.name} className="w-full h-full object-cover" />
                        : <i className="ri-user-3-line text-4xl text-gray-400"></i>
                      }
                    </div>
                  </div>
                );
              })()}
              <label className={`flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${uploadingImage ? 'border-sky-300 bg-sky-50' : 'border-gray-300 hover:border-sky-400 hover:bg-sky-50'}`}>
                {uploadingImage
                  ? <><i className="ri-loader-4-line animate-spin text-sky-600 text-xl"></i><span className="text-sm font-medium text-sky-600">Uploading…</span></>
                  : <><i className="ri-upload-2-line text-gray-500 text-xl"></i><span className="text-sm font-medium text-gray-600">Choose Photo</span></>
                }
                <input ref={fileRef2} type="file" accept="image/*" className="hidden"
                  onChange={async e => {
                    const file = e.target.files?.[0];
                    if (!file || !selectedSlideId) return;
                    setUploadingImage(true);
                    await handleImageUpload(file, 'placement', async (url) => {
                      const { error } = await supabase.from('placement_slides').update({ image_url: url }).eq('id', selectedSlideId);
                      if (error) { alert('Error: ' + error.message); return; }
                      fetchSlides(); setShowPhotoModal(false); setSelectedSlideId(null);
                    });
                    setUploadingImage(false);
                  }} />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}