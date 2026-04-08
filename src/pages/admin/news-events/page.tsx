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

interface Achievement {
  id: string;
  date: string;
  title: string;
  image_url: string;
  description: string;
  tag: string;
  display_order: number;
}

const NEWS_TAGS = [
  'Symposium', 'Hackathon', 'Sports Day', 'Cultural',
  'Paper Presentation', 'Workshop', 'Seminar', 'Competition',
];

const ACHIEVEMENT_TAGS = [
  'Placement', 'Achievement', 'Award', 'Certification', 'Research', 'Internship',
];

const tagColors: Record<string, { bg: string; color: string }> = {
  Placement:            { bg: '#dbeafe', color: '#1d4ed8' },
  Achievement:          { bg: '#dcfce7', color: '#15803d' },
  Award:                { bg: '#fef9c3', color: '#854d0e' },
  Certification:        { bg: '#f3e8ff', color: '#7e22ce' },
  Research:             { bg: '#e0f2fe', color: '#0369a1' },
  Internship:           { bg: '#ecfdf5', color: '#065f46' },
  Hackathon:            { bg: '#ede9fe', color: '#6d28d9' },
  Symposium:            { bg: '#ccfbf1', color: '#0f766e' },
  'Sports Day':         { bg: '#fee2e2', color: '#b91c1c' },
  Cultural:             { bg: '#fce7f3', color: '#9d174d' },
  'Paper Presentation': { bg: '#ffedd5', color: '#c2410c' },
  Workshop:             { bg: '#e0f2fe', color: '#0369a1' },
  Seminar:              { bg: '#f0fdf4', color: '#166534' },
  Competition:          { bg: '#fff7ed', color: '#9a3412' },
};

export default function NewsEventsManagementPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'news' | 'achievements'>('news');

  // ── News/Events ──
  const [newsList, setNewsList]           = useState<NewsEvent[]>([]);
  const [newsLoading, setNewsLoading]     = useState(true);
  const [newsError, setNewsError]         = useState('');
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews]     = useState<NewsEvent | null>(null);
  const [newsForm, setNewsForm]           = useState({ date: '', title: '', image_url: '', description: '', tag: '', display_order: 0 });
  const [newsSaving, setNewsSaving]       = useState(false);
  const [uploadingNewsImg, setUploadingNewsImg] = useState(false);
  const newsImgRef = useRef<HTMLInputElement>(null);

  // ── Achievements & Placements ──
  const [achievements, setAchievements]           = useState<Achievement[]>([]);
  const [achieveLoading, setAchieveLoading]       = useState(true);
  const [achieveError, setAchieveError]           = useState('');
  const [showAchieveModal, setShowAchieveModal]   = useState(false);
  const [editingAchieve, setEditingAchieve]       = useState<Achievement | null>(null);
  const [achieveForm, setAchieveForm]             = useState({ date: '', title: '', image_url: '', description: '', tag: '', display_order: 0 });
  const [achieveSaving, setAchieveSaving]         = useState(false);
  const [uploadingAchieveImg, setUploadingAchieveImg] = useState(false);
  const achieveImgRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchNews(); fetchAchievements(); }, []);

  const fetchNews = async () => {
    try {
      setNewsLoading(true); setNewsError('');
      const { data, error } = await supabase.from('news_events').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setNewsList(data ?? []);
    } catch (err: any) { setNewsError(err?.message ?? 'Failed to load'); }
    finally { setNewsLoading(false); }
  };

  const fetchAchievements = async () => {
    try {
      setAchieveLoading(true); setAchieveError('');
      const { data, error } = await supabase.from('placement_slides').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setAchievements(data ?? []);
    } catch (err: any) { setAchieveError(err?.message ?? 'Failed to load'); }
    finally { setAchieveLoading(false); }
  };

  const handleImageUpload = async (
    file: File,
    prefix: string,
    setUploading: (v: boolean) => void,
    onSuccess: (url: string) => void
  ) => {
    setUploading(true);
    try {
      const ext  = file.name.split('.').pop();
      const path = `${prefix}_${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from('placement-photos').upload(path, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('placement-photos').getPublicUrl(path);
      onSuccess(data.publicUrl);
    } catch (err: any) { alert('Upload failed: ' + (err?.message ?? 'Unknown')); }
    finally { setUploading(false); }
  };

  // ── News CRUD ──
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
    if (!confirm('Delete this item?')) return;
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

  // ── Achievements CRUD ──
  const handleAchieveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAchieveSaving(true);
      if (editingAchieve) {
        const { error } = await supabase.from('placement_slides').update(achieveForm).eq('id', editingAchieve.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('placement_slides').insert([achieveForm]);
        if (error) throw error;
      }
      setShowAchieveModal(false); resetAchieveForm(); fetchAchievements();
    } catch (err: any) { alert('Error: ' + (err?.message ?? 'Unknown')); }
    finally { setAchieveSaving(false); }
  };

  const handleDeleteAchieve = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      const { error } = await supabase.from('placement_slides').delete().eq('id', id);
      if (error) throw error;
      fetchAchievements();
    } catch (err: any) { alert('Error: ' + err?.message); }
  };

  const openEditAchieve = (item: Achievement) => {
    setEditingAchieve(item);
    setAchieveForm({ date: item.date || '', title: item.title || '', image_url: item.image_url || '', description: item.description || '', tag: item.tag || '', display_order: item.display_order });
    setShowAchieveModal(true);
  };

  const resetAchieveForm = () => {
    setAchieveForm({ date: '', title: '', image_url: '', description: '', tag: '', display_order: 0 });
    setEditingAchieve(null);
    if (achieveImgRef.current) achieveImgRef.current.value = '';
  };

  // ── Reusable modal form ──
  const renderForm = (
    type: 'news' | 'achieve',
    form: typeof newsForm,
    setForm: (f: typeof newsForm) => void,
    tags: string[],
    uploadingImg: boolean,
    imgRef: React.RefObject<HTMLInputElement>,
    onUpload: (file: File) => void,
    saving: boolean,
    onSubmit: (e: React.FormEvent) => void,
    onClose: () => void,
    isEditing: boolean
  ) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditing ? 'Edit Item' : type === 'news' ? 'Add Event' : 'Add Achievement / Placement'}
          </h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
            <i className="ri-close-line text-2xl text-gray-600"></i>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-5">

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
            <input type="text" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder="e.g. March 15, 2025" />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
            <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
              placeholder={type === 'news' ? 'e.g. TechVista 2025 Symposium' : 'e.g. Priya placed at TCS'} />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <select required value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-white">
              <option value="">-- Select category --</option>
              {tags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none resize-none"
              placeholder="Brief description shown on home page..." />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image / Poster</label>
            <div className="flex items-start gap-4">
              {form.image_url && (
                <div className="w-24 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                  <img src={form.image_url} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <label className={`flex items-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${uploadingImg ? 'border-sky-300 bg-sky-50' : 'border-gray-300 hover:border-sky-400 hover:bg-sky-50'}`}>
                  {uploadingImg
                    ? <><i className="ri-loader-4-line animate-spin text-sky-600"></i><span className="text-sm font-medium text-sky-600">Uploading…</span></>
                    : <><i className="ri-upload-2-line text-gray-500"></i><span className="text-sm font-medium text-gray-600">Upload Image</span></>
                  }
                  <input ref={imgRef} type="file" accept="image/*" className="hidden"
                    onChange={e => { const file = e.target.files?.[0]; if (file) onUpload(file); }} />
                </label>
                {form.image_url && (
                  <button type="button" onClick={() => { setForm({ ...form, image_url: '' }); if (imgRef.current) imgRef.current.value = ''; }}
                    className="text-xs text-red-500 mt-2 flex items-center gap-1 cursor-pointer hover:text-red-600">
                    <i className="ri-close-circle-line"></i> Remove image
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
            <input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none" />
          </div>

          <div className="flex space-x-4 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 whitespace-nowrap cursor-pointer">Cancel</button>
            <button type="submit" disabled={saving || uploadingImg}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg whitespace-nowrap cursor-pointer disabled:opacity-70">
              {saving ? 'Saving…' : isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // ── Card renderer ──
  const renderCard = (
    item: NewsEvent | Achievement,
    onEdit: () => void,
    onDelete: () => void
  ) => {
    const tc = tagColors[item.tag] || { bg: '#f1f5f9', color: '#475569' };
    return (
      <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {item.image_url && (
          <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {item.date && <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">{item.date}</span>}
            {item.tag && <span className="px-3 py-1 text-xs font-semibold rounded-full" style={{ background: tc.bg, color: tc.color }}>{item.tag}</span>}
          </div>
          <h3 className="text-base font-bold text-gray-900 leading-snug mb-1">{item.title}</h3>
          {item.description && <p className="text-sm text-gray-500 line-clamp-2 mb-2">{item.description}</p>}
          <p className="text-xs text-gray-400 mb-3">Order: {item.display_order}</p>
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <button onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-edit-line"></i><span className="text-sm font-semibold">Edit</span>
            </button>
            <button onClick={onDelete}
              className="w-10 h-10 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors cursor-pointer">
              <i className="ri-delete-bin-line"></i>
            </button>
          </div>
        </div>
      </div>
    );
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
                <p className="text-gray-600 mt-1">Manage events and achievements</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1">
              <button onClick={() => setTab('news')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${tab === 'news' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <i className="ri-calendar-event-line mr-1"></i>Events &amp; Programs
              </button>
              <button onClick={() => setTab('achievements')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${tab === 'achievements' ? 'bg-white text-sky-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <i className="ri-trophy-line mr-1"></i>Achievements &amp; Placements
              </button>
            </div>

            <button
              onClick={() => { if (tab === 'news') { resetNewsForm(); setShowNewsModal(true); } else { resetAchieveForm(); setShowAchieveModal(true); } }}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
              <i className="ri-add-line text-xl"></i>
              <span>{tab === 'news' ? 'Add Event' : 'Add Achievement'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* EVENTS TAB */}
        {tab === 'news' && (
          <>
            {newsError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-700">{newsError}</p>
                <button onClick={fetchNews} className="mt-2 text-sm font-semibold text-red-700 underline cursor-pointer">Try again</button>
              </div>
            )}
            {newsLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600"></div>
              </div>
            ) : newsList.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <i className="ri-calendar-event-line text-6xl text-gray-400 mb-4 block"></i>
                <p className="text-xl text-gray-600 mb-6">No events yet</p>
                <button onClick={() => { resetNewsForm(); setShowNewsModal(true); }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer">
                  <i className="ri-add-line"></i> Add First Event
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsList.map(item => renderCard(item, () => openEditNews(item), () => handleDeleteNews(item.id)))}
              </div>
            )}
          </>
        )}

        {/* ACHIEVEMENTS TAB */}
        {tab === 'achievements' && (
          <>
            {achieveError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-700">{achieveError}</p>
                <button onClick={fetchAchievements} className="mt-2 text-sm font-semibold text-red-700 underline cursor-pointer">Try again</button>
              </div>
            )}
            {achieveLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-600"></div>
              </div>
            ) : achievements.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <i className="ri-trophy-line text-6xl text-gray-400 mb-4 block"></i>
                <p className="text-xl text-gray-600 mb-6">No achievements yet</p>
                <button onClick={() => { resetAchieveForm(); setShowAchieveModal(true); }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer">
                  <i className="ri-add-line"></i> Add First Achievement
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map(item => renderCard(item, () => openEditAchieve(item), () => handleDeleteAchieve(item.id)))}
              </div>
            )}
          </>
        )}
      </div>

      {/* EVENTS MODAL */}
      {showNewsModal && renderForm(
        'news', newsForm, setNewsForm, NEWS_TAGS,
        uploadingNewsImg, newsImgRef,
        (file) => handleImageUpload(file, 'news', setUploadingNewsImg, url => setNewsForm(p => ({ ...p, image_url: url }))),
        newsSaving, handleNewsSubmit,
        () => { setShowNewsModal(false); resetNewsForm(); },
        !!editingNews
      )}

      {/* ACHIEVEMENTS MODAL */}
      {showAchieveModal && renderForm(
        'achieve', achieveForm, setAchieveForm, ACHIEVEMENT_TAGS,
        uploadingAchieveImg, achieveImgRef,
        (file) => handleImageUpload(file, 'achieve', setUploadingAchieveImg, url => setAchieveForm(p => ({ ...p, image_url: url }))),
        achieveSaving, handleAchieveSubmit,
        () => { setShowAchieveModal(false); resetAchieveForm(); },
        !!editingAchieve
      )}
    </div>
  );
}