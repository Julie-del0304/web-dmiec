import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { toSlug } from '../../../services/clubService';

interface Club {
  id: string;
  name: string;
  department: string;
  tagline: string;
  about: string;
  icon_symbol: string;
  category: string;
  coordinator_name: string;
  coordinator_email: string;
  coordinator_phone: string;
  meeting_schedule: string;
  achievements: string;
  vision: string;
  mission: string;
  banner_url: string;
  display_order: number;
}

interface ClubPhoto {
  id: string;
  club_id: string;
  photo_url: string;
  caption: string;
  category: string;
}

const DEPARTMENTS = [
  { id: 'SH', name: 'S&H', full: 'Science and Humanities' },
  { id: 'CSE', name: 'CSE', full: 'Computer Science and Engineering' },
  { id: 'AIDS', name: 'AI&DS', full: 'Artificial Intelligence and Data Science' },
  { id: 'IT', name: 'IT', full: 'Information Technology' },
  { id: 'ECE', name: 'ECE', full: 'Electronics and Communication Engineering' },
  { id: 'EEE', name: 'EEE', full: 'Electrical and Electronics Engineering' },
  { id: 'MECH', name: 'MECH', full: 'Mechanical Engineering' },
];

const CATEGORIES = [
  { value: 'technical', label: 'Technical' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'sports', label: 'Sports' },
  { value: 'social', label: 'Social Service' },
  { value: 'literary', label: 'Literary' },
];

const PHOTO_CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'technical', label: 'Technical' },
  { value: 'paper_presentation', label: 'Paper Presentations' },
  { value: 'seminar', label: 'Seminars' },
  { value: 'competition', label: 'Competitions' },
];

const emptyForm = {
  name: '', department: 'CSE', tagline: '', about: '',
  icon_symbol: '', category: 'technical',
  coordinator_name: '', coordinator_email: '', coordinator_phone: '',
  meeting_schedule: '', achievements: '', vision: '', mission: '',
  banner_url: '', display_order: 0,
};

export default function ClubsManagementPage() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [photos, setPhotos] = useState<ClubPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'gallery'>('basic');
  const [form, setForm] = useState({ ...emptyForm });
  const [pendingPhotos, setPendingPhotos] = useState<{ url: string; category: string }[]>([]);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [{ data: c }, { data: p }] = await Promise.all([
        supabase.from('clubs').select('*').order('display_order', { ascending: true }),
        supabase.from('club_photos').select('*').order('display_order', { ascending: true }),
      ]);
      setClubs(c ?? []);
      setPhotos(p ?? []);
    } finally {
      setLoading(false);
    }
  };

  const getDeptClubs = (id: string) =>
    clubs.filter(c => (c.department ?? '').toUpperCase() === id.toUpperCase());

  const getClubPhotos = (clubId: string) =>
    photos.filter(p => p.club_id === clubId);

  const openNew = (dept: string) => {
    setEditingClub(null);
    setPendingPhotos([]);
    setActiveTab('basic');
    setForm({ ...emptyForm, department: dept });
    setShowModal(true);
  };

  const openEdit = (club: Club) => {
    setEditingClub(club);
    setPendingPhotos(getClubPhotos(club.id).map(p => ({ url: p.photo_url, category: p.category ?? 'general' })));
    setActiveTab('basic');
    setForm({
      name: club.name ?? '', department: club.department ?? 'CSE',
      tagline: club.tagline ?? '', about: club.about ?? '',
      icon_symbol: club.icon_symbol ?? '', category: club.category ?? 'technical',
      coordinator_name: club.coordinator_name ?? '',
      coordinator_email: club.coordinator_email ?? '',
      coordinator_phone: club.coordinator_phone ?? '',
      meeting_schedule: club.meeting_schedule ?? '',
      achievements: club.achievements ?? '',
      vision: club.vision ?? '', mission: club.mission ?? '',
      banner_url: club.banner_url ?? '', display_order: club.display_order ?? 0,
    });
    setShowModal(true);
  };

  const handleImageUpload = async (files: FileList, category = 'general') => {
    setUploading(true);
    try {
      const uploaded: { url: string; category: string }[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop();
        const path = `club_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from('placement-photos').upload(path, file, { upsert: true });
        if (error) throw error;
        const { data } = supabase.storage.from('placement-photos').getPublicUrl(path);
        uploaded.push({ url: data.publicUrl, category });
      }
      setPendingPhotos(prev => [...prev, ...uploaded]);
    } catch (err: any) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) { alert('Club name required'); return; }
    setSaving(true);
    try {
      let clubId = editingClub?.id;
      if (editingClub) {
        const { error } = await supabase.from('clubs').update(form).eq('id', editingClub.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('clubs').insert([form]).select().single();
        if (error) throw error;
        clubId = data.id;
      }
      if (clubId) {
        await supabase.from('club_photos').delete().eq('club_id', clubId);
        if (pendingPhotos.length > 0) {
          await supabase.from('club_photos').insert(
            pendingPhotos.map((p, i) => ({
              club_id: clubId, photo_url: p.url,
              caption: '', category: p.category, display_order: i,
            }))
          );
        }
      }
      setShowModal(false);
      fetchAll();
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingClub || !confirm('Delete this club?')) return;
    try {
      await supabase.from('club_photos').delete().eq('club_id', editingClub.id);
      await supabase.from('clubs').delete().eq('id', editingClub.id);
      setShowModal(false);
      fetchAll();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <button onClick={() => selectedDept ? setSelectedDept(null) : navigate('/admin')}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium cursor-pointer transition-colors">
          <i className="ri-arrow-left-line" />
          {selectedDept ? 'Departments' : 'Home'}
        </button>
        <h1 className="text-lg font-bold text-slate-800">
          {selectedDept
            ? `${DEPARTMENTS.find(d => d.id === selectedDept)?.name} — Clubs`
            : 'Club Management'}
        </h1>
        {selectedDept ? (
          <button onClick={() => openNew(selectedDept)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
            <i className="ri-add-line" /> Add New Club
          </button>
        ) : <div className="w-24" />}
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Department Cards */}
        {!selectedDept ? (
          <>
            <h2 className="text-xl font-bold text-slate-700 mb-5">Departments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DEPARTMENTS.map(dept => {
                const count = getDeptClubs(dept.id).length;
                return (
                  <div key={dept.id} onClick={() => setSelectedDept(dept.id)}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer overflow-hidden group">
                    <div className="p-5 pb-3">
                      <p className="text-blue-600 text-2xl font-black mb-1 group-hover:text-blue-700">{dept.name}</p>
                      <p className="text-slate-500 text-sm">{dept.full}</p>
                    </div>
                    <div className="border-t border-slate-100 px-5 py-3 flex items-center justify-between bg-slate-50/50">
                      <span className="text-slate-500 text-sm">{count} club{count !== 1 ? 's' : ''}</span>
                      <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">Manage ›</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Club Cards */
          getDeptClubs(selectedDept).length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center shadow-sm">
              <i className="ri-team-line text-5xl text-slate-300 mb-4 block" />
              <p className="text-slate-500 mb-4">No clubs yet for this department</p>
              <button onClick={() => openNew(selectedDept)}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer">
                Add First Club
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {getDeptClubs(selectedDept).map(club => {
                const clubPics = getClubPhotos(club.id);
                return (
                  <div key={club.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-sm">
                        {club.icon_symbol || club.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
                            {club.department}
                          </span>
                          <h3 className="font-bold text-slate-800">{club.name}</h3>
                        </div>
                        <p className="text-slate-500 text-sm truncate">{club.tagline || club.about?.slice(0, 80)}</p>
                      </div>
                    </div>

                    {/* Photo previews */}
                    {clubPics.length > 0 && (
                      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                        {clubPics.slice(0, 5).map(photo => (
                          <div key={photo.id} className="relative flex-shrink-0">
                            <img src={photo.photo_url} alt=""
                              className="w-16 h-12 object-cover rounded-lg border border-slate-200" />
                            {photo.category && photo.category !== 'general' && (
                              <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] text-center rounded-b-lg px-0.5 truncate">
                                {photo.category}
                              </span>
                            )}
                          </div>
                        ))}
                        {clubPics.length > 5 && (
                          <div className="w-16 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-500 flex-shrink-0 border border-slate-200">
                            +{clubPics.length - 5}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 border-t border-slate-100 pt-3">
                      <button onClick={() => openEdit(club)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                        <i className="ri-edit-line" /> Edit
                      </button>
                      <button
                        onClick={() => window.open(`/co-curricular/clubs/${toSlug(club.name)}`, '_blank')}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                        <i className="ri-eye-line" /> View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">

            {/* Modal Header */}
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm">
                  {form.icon_symbol || form.name.slice(0, 2).toUpperCase() || '??'}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    {editingClub ? editingClub.name : 'New Club'}
                  </h2>
                  <p className="text-xs text-slate-500">{DEPARTMENTS.find(d => d.id === form.department)?.full}</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer">
                <i className="ri-close-line text-xl text-slate-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 flex-shrink-0">
              {(['basic', 'details', 'gallery'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}>
                  {tab === 'basic' ? '📋 Basic Info' : tab === 'details' ? '📝 Details' : '🖼️ Gallery'}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {activeTab === 'basic' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Club Name *</label>
                      <input type="text" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g. Design And Scripting Club" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Icon / Symbol</label>
                      <input type="text" value={form.icon_symbol}
                        onChange={e => setForm({ ...form, icon_symbol: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g. DS" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Department</label>
                      <select value={form.department}
                        onChange={e => setForm({ ...form, department: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                        {DEPARTMENTS.map(d => (
                          <option key={d.id} value={d.id}>{d.name} - {d.full}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Category</label>
                      <select value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                        {CATEGORIES.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Tagline</label>
                    <input type="text" value={form.tagline}
                      onChange={e => setForm({ ...form, tagline: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Short tagline..." />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">About</label>
                    <textarea value={form.about} rows={4}
                      onChange={e => setForm({ ...form, about: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      placeholder="Describe the club..." />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Vision</label>
                      <textarea value={form.vision} rows={3}
                        onChange={e => setForm({ ...form, vision: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        placeholder="Club vision..." />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Mission</label>
                      <textarea value={form.mission} rows={3}
                        onChange={e => setForm({ ...form, mission: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        placeholder="Club mission..." />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'details' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Coordinator Name</label>
                    <input type="text" value={form.coordinator_name}
                      onChange={e => setForm({ ...form, coordinator_name: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email</label>
                      <input type="email" value={form.coordinator_email}
                        onChange={e => setForm({ ...form, coordinator_email: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="email@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Phone</label>
                      <input type="tel" value={form.coordinator_phone}
                        onChange={e => setForm({ ...form, coordinator_phone: e.target.value })}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Meeting Schedule</label>
                    <input type="text" value={form.meeting_schedule}
                      onChange={e => setForm({ ...form, meeting_schedule: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="e.g. Every Friday 4:00 PM" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Achievements</label>
                    <textarea value={form.achievements} rows={4}
                      onChange={e => setForm({ ...form, achievements: e.target.value })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      placeholder="One achievement per line..." />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Display Order</label>
                    <input type="number" value={form.display_order}
                      onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                  </div>
                </>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  {PHOTO_CATEGORIES.map(cat => (
                    <div key={cat.value} className="border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold text-slate-700">{cat.label}</p>
                        <label className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-colors">
                          {uploading ? 'Uploading...' : '+ Add Photos'}
                          <input type="file" accept="image/*" multiple className="hidden"
                            onChange={e => e.target.files && handleImageUpload(e.target.files, cat.value)} />
                        </label>
                      </div>
                      {pendingPhotos.filter(p => p.category === cat.value).length === 0 ? (
                        <p className="text-slate-400 text-xs text-center py-3">No {cat.label.toLowerCase()} photos yet</p>
                      ) : (
                        <div className="grid grid-cols-4 gap-2">
                          {pendingPhotos.filter(p => p.category === cat.value).map((p, i) => (
                            <div key={i} className="relative group">
                              <img src={p.url} alt=""
                                className="w-full h-16 object-cover rounded-lg border border-slate-200" />
                              <button
                                onClick={() => setPendingPhotos(prev => prev.filter((_, idx) => !(prev[idx].url === p.url && prev[idx].category === p.category) || idx !== pendingPhotos.indexOf(p)))}
                                className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 px-6 py-4 flex gap-3 flex-shrink-0">
              {editingClub && (
                <button onClick={handleDelete}
                  className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                  Delete
                </button>
              )}
              <button onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving || uploading}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60">
                {saving ? 'Saving...' : editingClub ? 'Save Changes' : 'Create Club'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}