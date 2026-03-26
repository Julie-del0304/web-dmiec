
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface Announcement {
  id: string;
  title?: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string;
  is_active: boolean;
  display_order?: number;
  created_at: string;
}

interface FormState {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string;
  is_active: boolean;
  display_order: number;
}

const defaultForm: FormState = {
  title: '',
  message: '',
  type: 'info',
  date: new Date().toISOString().split('T')[0],
  is_active: true,
  display_order: 0,
};

export default function AdminAnnouncementsPage() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ ...defaultForm });
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (err) {
      console.error('Load error:', err);
      setToast({ msg: 'Failed to load announcements', type: 'err' });
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setEditingId(null);
    setForm({ ...defaultForm });
    setShowForm(true);
  };

  const openEdit = (a: Announcement) => {
    setEditingId(a.id);
    setForm({
      title: a.title || '',
      message: a.message,
      type: a.type,
      date: a.date ? new Date(a.date).toISOString().split('T')[0] : defaultForm.date,
      is_active: a.is_active,
      display_order: a.display_order || 0,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...defaultForm });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) {
      setToast({ msg: 'Please enter a message', type: 'err' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim() || null,
        message: form.message.trim(),
        type: form.type,
        date: form.date,
        is_active: form.is_active,
        display_order: form.display_order,
      };

      if (editingId) {
        const { error } = await supabase
          .from('announcements')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
        setToast({ msg: 'Announcement updated', type: 'ok' });
      } else {
        const { error } = await supabase.from('announcements').insert([payload]);
        if (error) throw error;
        setToast({ msg: 'Announcement created', type: 'ok' });
      }

      closeForm();
      await loadData();
    } catch (err: any) {
      console.error('Save error:', err);
      setToast({ msg: err?.message || 'Failed to save', type: 'err' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    try {
      const { error } = await supabase.from('announcements').delete().eq('id', id);
      if (error) throw error;
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      setToast({ msg: 'Deleted', type: 'ok' });
    } catch (err: any) {
      setToast({ msg: err?.message || 'Failed to delete', type: 'err' });
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ is_active: !current })
        .eq('id', id);
      if (error) throw error;
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === id ? { ...a, is_active: !current } : a)),
      );
    } catch (err: any) {
      setToast({ msg: err?.message || 'Failed to toggle', type: 'err' });
    }
  };

  const typeBadge = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-100 text-amber-700';
      case 'success':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-sky-100 text-sky-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-lg shadow-lg text-sm font-medium transition-all ${
            toast.type === 'ok'
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <i className={`ri-${toast.type === 'ok' ? 'check' : 'error-warning'}-line`}></i>
            {toast.msg}
          </span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <i className="ri-arrow-left-line text-xl text-slate-700"></i>
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Announcements</h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage campus announcements</p>
            </div>
          </div>
          <button
            onClick={openNew}
            className="px-5 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 text-sm font-semibold whitespace-nowrap cursor-pointer shadow-sm"
          >
            <i className="ri-add-line text-lg"></i>
            Add Announcement
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  {editingId ? 'Edit Announcement' : 'New Announcement'}
                </h2>
                <button
                  onClick={closeForm}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-slate-500"></i>
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    placeholder="Announcement title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    rows={4}
                    maxLength={500}
                    placeholder="Enter announcement message"
                    required
                  />
                  <p className="text-xs text-slate-400 mt-1">{form.message.length}/500</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm({ ...form, type: e.target.value as FormState['type'] })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    >
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="success">Success</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.display_order}
                    onChange={(e) =>
                      setForm({ ...form, display_order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_active: !form.is_active })}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                      form.is_active ? 'bg-teal-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        form.is_active ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-sm text-slate-700">
                    Active (visible on website)
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-semibold whitespace-nowrap cursor-pointer disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-slate-100 rounded-full mx-auto mb-4">
              <i className="ri-megaphone-line text-3xl text-slate-400"></i>
            </div>
            <p className="text-slate-500 text-sm">No announcements yet</p>
            <button
              onClick={openNew}
              className="mt-4 px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
            >
              Create your first announcement
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.map((a) => (
              <div
                key={a.id}
                className={`bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition-colors ${
                  !a.is_active ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      {a.title && (
                        <h3 className="text-base font-semibold text-slate-900">
                          {a.title}
                        </h3>
                      )}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${typeBadge(
                          a.type,
                        )}`}
                      >
                        {a.type}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          a.is_active
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {a.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2 break-words">{a.message}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <i className="ri-calendar-line"></i>
                        {new Date(a.date).toLocaleDateString()}
                      </span>
                      {a.display_order !== undefined && a.display_order !== 0 && (
                        <span className="flex items-center gap-1">
                          <i className="ri-sort-asc"></i>
                          Order: {a.display_order}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleToggle(a.id, a.is_active)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                        a.is_active
                          ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                      title={a.is_active ? 'Deactivate' : 'Activate'}
                    >
                      <i className={`ri-${a.is_active ? 'eye-off' : 'eye'}-line text-lg`}></i>
                    </button>
                    <button
                      onClick={() => openEdit(a)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <i className="ri-edit-line text-lg"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
