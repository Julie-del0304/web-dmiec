import { useState, useEffect } from 'react';
import { alumniService, Alumni, AlumniEvent, CreateAlumniData, CreateAlumniEventData } from '../../../services/alumniService';

type TabType = 'profiles' | 'events';

export default function AdminAlumniPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profiles');
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [events, setEvents] = useState<AlumniEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<Alumni | null>(null);
  const [editingEvent, setEditingEvent] = useState<AlumniEvent | null>(null);
  const [uploading, setUploading] = useState(false);

  const [alumniFormData, setAlumniFormData] = useState<CreateAlumniData>({
    name: '',
    batch: '',
    designation: '',
    company: '',
    photo_url: '',
    achievement: '',
    linkedin_url: '',
    email: '',
    phone: '',
    type: 'profile'
  });

  const [eventFormData, setEventFormData] = useState<CreateAlumniEventData>({
    title: '',
    description: '',
    event_date: '',
    location: '',
    image_url: '',
    attendees_count: 0
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'profiles') {
        const data = await alumniService.getAllAlumni();
        setAlumni(data);
      } else {
        const data = await alumniService.getAllEvents();
        setEvents(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = alumniService.validatePhotoFile(file);
    if (validationError) {
      showToast(validationError, 'error');
      return;
    }

    try {
      setUploading(true);
      const photoUrl = await alumniService.uploadPhoto(file);
      
      if (activeTab === 'profiles') {
        setAlumniFormData({ ...alumniFormData, photo_url: photoUrl });
      } else {
        setEventFormData({ ...eventFormData, image_url: photoUrl });
      }
      
      showToast('Photo uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading photo:', error);
      showToast('Failed to upload photo', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleAlumniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingAlumni) {
        await alumniService.updateAlumni(editingAlumni.id, alumniFormData);
        showToast('Alumni profile updated successfully', 'success');
      } else {
        await alumniService.createAlumni(alumniFormData);
        showToast('Alumni profile created successfully', 'success');
      }

      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving alumni:', error);
      showToast('Failed to save alumni profile', 'error');
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingEvent) {
        await alumniService.updateEvent(editingEvent.id, eventFormData);
        showToast('Event updated successfully', 'success');
      } else {
        await alumniService.createEvent(eventFormData);
        showToast('Event created successfully', 'success');
      }

      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving event:', error);
      showToast('Failed to save event', 'error');
    }
  };

  const handleEditAlumni = (item: Alumni) => {
    setEditingAlumni(item);
    setAlumniFormData({
      name: item.name || '',
      batch: item.batch || '',
      designation: item.designation || '',
      company: item.company || '',
      photo_url: item.photo_url || '',
      achievement: item.achievement || '',
      linkedin_url: item.linkedin_url || '',
      email: item.email || '',
      phone: item.phone || '',
      type: item.type || 'profile'
    });
    setShowForm(true);
  };

  const handleEditEvent = (item: AlumniEvent) => {
    setEditingEvent(item);
    setEventFormData({
      title: item.title || '',
      description: item.description || '',
      event_date: item.event_date || '',
      location: item.location || '',
      image_url: item.image_url || '',
      attendees_count: item.attendees_count || 0
    });
    setShowForm(true);
  };

  const handleDeleteAlumni = async (id: string) => {
    if (!confirm('Are you sure you want to delete this alumni profile?')) return;

    try {
      await alumniService.deleteAlumni(id);
      showToast('Alumni profile deleted successfully', 'success');
      loadData();
    } catch (error) {
      console.error('Error deleting alumni:', error);
      showToast('Failed to delete alumni profile', 'error');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      await alumniService.deleteEvent(id);
      showToast('Event deleted successfully', 'success');
      loadData();
    } catch (error) {
      console.error('Error deleting event:', error);
      showToast('Failed to delete event', 'error');
    }
  };

  const resetForm = () => {
    setAlumniFormData({
      name: '',
      batch: '',
      designation: '',
      company: '',
      photo_url: '',
      achievement: '',
      linkedin_url: '',
      email: '',
      phone: '',
      type: 'profile'
    });
    setEventFormData({
      title: '',
      description: '',
      event_date: '',
      location: '',
      image_url: '',
      attendees_count: 0
    });
    setEditingAlumni(null);
    setEditingEvent(null);
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
          <p className="mt-4 text-gray-600">Loading alumni data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alumni Management</h1>
            <p className="text-gray-600 mt-1">Manage alumni profiles and events</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <i className={`ri-${showForm ? 'close' : 'add'}-line`}></i>
            {showForm ? 'Cancel' : `Add New ${activeTab === 'profiles' ? 'Profile' : 'Event'}`}
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <i className="ri-information-line mr-2"></i>
            All fields are optional. Fill in only the information you have available.
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setActiveTab('profiles'); setShowForm(false); }}
            className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'profiles' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <i className="ri-user-line mr-2"></i>
            Alumni Profiles
          </button>
          <button
            onClick={() => { setActiveTab('events'); setShowForm(false); }}
            className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'events' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <i className="ri-calendar-event-line mr-2"></i>
            Alumni Events
          </button>
        </div>

        {showForm && activeTab === 'profiles' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingAlumni ? 'Edit Alumni Profile' : 'Add New Alumni Profile'}
            </h2>

            <form onSubmit={handleAlumniSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={alumniFormData.name}
                    onChange={(e) => setAlumniFormData({ ...alumniFormData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={alumniFormData.batch}
                    onChange={(e) => setAlumniFormData({ ...alumniFormData, batch: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., 2020-2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={alumniFormData.designation}
                    onChange={(e) => setAlumniFormData({ ...alumniFormData, designation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter designation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={alumniFormData.company}
                    onChange={(e) => setAlumniFormData({ ...alumniFormData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={alumniFormData.email}
                    onChange={(e) => setAlumniFormData({ ...alumniFormData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={alumniFormData.phone}
                    onChange={(e) => setAlumniFormData({ ...alumniFormData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={alumniFormData.linkedin_url}
                    onChange={(e) => setAlumniFormData({ ...alumniFormData, linkedin_url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-gray-400">(Optional)</span>
                  </label>
                  <select
                    value={alumniFormData.type}
                    onChange={(e) => setAlumniFormData({ ...alumniFormData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="profile">Regular Profile</option>
                    <option value="distinguished">Distinguished Alumni</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  value={alumniFormData.achievement}
                  onChange={(e) => setAlumniFormData({ ...alumniFormData, achievement: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter achievements"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo Upload <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={uploading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {uploading && <p className="text-sm text-gray-500 mt-2">Uploading photo...</p>}
                {alumniFormData.photo_url && (
                  <div className="mt-4">
                    <img src={alumniFormData.photo_url} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {editingAlumni ? 'Update Profile' : 'Create Profile'}
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

        {showForm && activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingEvent ? 'Edit Alumni Event' : 'Add New Alumni Event'}
            </h2>

            <form onSubmit={handleEventSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={eventFormData.title}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    value={eventFormData.event_date}
                    onChange={(e) => setEventFormData({ ...eventFormData, event_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={eventFormData.location}
                    onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attendees Count <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    value={eventFormData.attendees_count}
                    onChange={(e) => setEventFormData({ ...eventFormData, attendees_count: parseInt(e.target.value) || 0 })}
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
                  value={eventFormData.description}
                  onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter event description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Image <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={uploading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {uploading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
                {eventFormData.image_url && (
                  <div className="mt-4">
                    <img src={eventFormData.image_url} alt="Preview" className="w-48 h-48 object-cover rounded-lg" />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {activeTab === 'profiles' ? `Alumni Profiles (${alumni.length})` : `Alumni Events (${events.length})`}
          </h2>

          {activeTab === 'profiles' && alumni.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-user-line text-6xl text-gray-300"></i>
              <p className="text-gray-500 mt-4">No alumni profiles found</p>
            </div>
          )}

          {activeTab === 'profiles' && alumni.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    {item.photo_url ? (
                      <img src={item.photo_url} alt={item.name} className="w-20 h-20 rounded-full object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <i className="ri-user-line text-3xl text-gray-400"></i>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name || 'Unnamed'}</h3>
                      <p className="text-sm text-gray-600">{item.batch}</p>
                      {item.type === 'distinguished' && (
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded mt-1 whitespace-nowrap">
                          Distinguished
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {item.designation && <p className="text-sm text-gray-700 mb-1"><strong>Role:</strong> {item.designation}</p>}
                  {item.company && <p className="text-sm text-gray-700 mb-1"><strong>Company:</strong> {item.company}</p>}
                  {item.achievement && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.achievement}</p>}
                  
                  <div className="flex items-center gap-2 mb-3">
                    {item.email && (
                      <a href={`mailto:${item.email}`} className="text-emerald-600 hover:text-emerald-700">
                        <i className="ri-mail-line"></i>
                      </a>
                    )}
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="text-emerald-600 hover:text-emerald-700">
                        <i className="ri-phone-line"></i>
                      </a>
                    )}
                    {item.linkedin_url && (
                      <a href={item.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">
                        <i className="ri-linkedin-box-line"></i>
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditAlumni(item)}
                      className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap text-sm"
                    >
                      <i className="ri-edit-line mr-1"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAlumni(item.id)}
                      className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap text-sm"
                    >
                      <i className="ri-delete-bin-line mr-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'events' && events.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-calendar-event-line text-6xl text-gray-300"></i>
              <p className="text-gray-500 mt-4">No alumni events found</p>
            </div>
          )}

          {activeTab === 'events' && events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                  )}
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title || 'Untitled Event'}</h3>
                    
                    <div className="space-y-1 mb-3">
                      {item.event_date && (
                        <p className="text-sm text-gray-600">
                          <i className="ri-calendar-line mr-2"></i>
                          {new Date(item.event_date).toLocaleDateString()}
                        </p>
                      )}
                      {item.location && (
                        <p className="text-sm text-gray-600">
                          <i className="ri-map-pin-line mr-2"></i>
                          {item.location}
                        </p>
                      )}
                      {item.attendees_count !== undefined && item.attendees_count > 0 && (
                        <p className="text-sm text-gray-600">
                          <i className="ri-group-line mr-2"></i>
                          {item.attendees_count} attendees
                        </p>
                      )}
                    </div>
                    
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditEvent(item)}
                        className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap text-sm"
                      >
                        <i className="ri-edit-line mr-1"></i>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(item.id)}
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
