import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  uploadPhoto,
  deletePhoto,
  fetchPhotosByFolderId,
  batchUpdatePhotoOrders,
  validateImageFile,
} from '../../../services/eventService';
import type { EventFolderWithPhotoCount, EventPhoto, CreateEventFolderInput } from '../../../types/events';

export default function AdminEventsPage() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState<EventFolderWithPhotoCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<EventFolderWithPhotoCount | null>(null);
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeletePhotoConfirm, setShowDeletePhotoConfirm] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<EventPhoto | null>(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form states
  const [folderForm, setFolderForm] = useState<CreateEventFolderInput>({
    name: '',
    description: '',
    event_date: '',
    cover_image_url: '',
  });

  useEffect(() => {
    loadFolders();
  }, []);

  useEffect(() => {
    if (selectedFolder) {
      loadPhotos(selectedFolder.id);
    }
  }, [selectedFolder]);

  const loadFolders = async () => {
    try {
      setLoading(true);
      const data = await fetchAllFolders();
      setFolders(data);
    } catch (error) {
      showToast('Failed to load folders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadPhotos = async (folderId: string) => {
    try {
      const data = await fetchPhotosByFolderId(folderId);
      setPhotos(data);
    } catch (error) {
      showToast('Failed to load photos', 'error');
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderForm.name.trim()) {
      showToast('Folder name is required', 'error');
      return;
    }

    try {
      await createFolder(folderForm);
      showToast('Folder created successfully', 'success');
      setShowCreateModal(false);
      setFolderForm({ name: '', description: '', event_date: '', cover_image_url: '' });
      loadFolders();
    } catch (error) {
      showToast('Failed to create folder', 'error');
    }
  };

  const handleEditFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFolder) return;

    try {
      await updateFolder(selectedFolder.id, folderForm);
      showToast('Folder updated successfully', 'success');
      setShowEditModal(false);
      loadFolders();
    } catch (error) {
      showToast('Failed to update folder', 'error');
    }
  };

  const handleDeleteFolder = async () => {
    if (!selectedFolder) return;

    try {
      await deleteFolder(selectedFolder.id);
      showToast('Folder deleted successfully', 'success');
      setShowDeleteConfirm(false);
      setSelectedFolder(null);
      loadFolders();
    } catch (error) {
      showToast('Failed to delete folder', 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedFolder || !e.target.files) return;

    const files = Array.from(e.target.files);
    setUploadingPhotos(true);

    for (const file of files) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        showToast(validation.error || 'Invalid file', 'error');
        continue;
      }

      try {
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
        
        const photo = await uploadPhoto(file, {
          folder_id: selectedFolder.id,
          caption: '',
          display_order: photos.length,
        });

        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
        setPhotos((prev) => [...prev, photo]);
      } catch (error) {
        showToast(`Failed to upload ${file.name}`, 'error');
      }
    }

    setUploadingPhotos(false);
    setUploadProgress({});
    loadFolders();
  };

  const handleDeletePhoto = async () => {
    if (!photoToDelete) return;
    
    try {
      await deletePhoto(photoToDelete.id);
      setPhotos((prev) => prev.filter((p) => p.id !== photoToDelete.id));
      showToast('Photo deleted successfully', 'success');
      loadFolders();
    } catch (error) {
      showToast('Failed to delete photo', 'error');
    } finally {
      setShowDeletePhotoConfirm(false);
      setPhotoToDelete(null);
    }
  };

  const handleReorderPhotos = async (dragIndex: number, dropIndex: number) => {
    const newPhotos = [...photos];
    const [draggedPhoto] = newPhotos.splice(dragIndex, 1);
    newPhotos.splice(dropIndex, 0, draggedPhoto);

    const updates = newPhotos.map((photo, index) => ({
      id: photo.id,
      display_order: index,
    }));

    setPhotos(newPhotos);

    try {
      await batchUpdatePhotoOrders(updates);
      showToast('Photo order updated', 'success');
    } catch (error) {
      showToast('Failed to update order', 'error');
      loadPhotos(selectedFolder!.id);
    }
  };

  const openEditModal = (folder: EventFolderWithPhotoCount) => {
    setSelectedFolder(folder);
    setFolderForm({
      name: folder.name,
      description: folder.description || '',
      event_date: folder.event_date || '',
      cover_image_url: folder.cover_image_url || '',
    });
    setShowEditModal(true);
  };

  const openDeleteConfirm = (folder: EventFolderWithPhotoCount) => {
    setSelectedFolder(folder);
    setShowDeleteConfirm(true);
  };

  const openDeletePhotoConfirm = (photo: EventPhoto) => {
    setPhotoToDelete(photo);
    setShowDeletePhotoConfirm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://static.readdy.ai/image/aed2a83e7960c786dd7bda1b18d3e021/03378c8fff0e87b1630499bbdd646dab.jpeg"
                alt="DMI Engineering College Logo"
                className="h-16 w-16 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">Event Gallery Admin</h1>
                <p className="text-white/80">Manage event folders and photos</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors whitespace-nowrap"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            <i className={`${toast.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'} text-2xl`}></i>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Folders List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Event Folders</h2>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
                >
                  <i className="ri-add-line mr-2"></i>
                  New Folder
                </button>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      onClick={() => setSelectedFolder(folder)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedFolder?.id === folder.id
                          ? 'border-blue-900 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{folder.name}</h3>
                          <p className="text-sm text-gray-600">{folder.photo_count} photos</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(folder);
                            }}
                            className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap"
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteConfirm(folder);
                            }}
                            className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-900 rounded-lg hover:bg-red-200 transition-colors whitespace-nowrap"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Photo Management */}
          <div className="lg:col-span-2">
            {selectedFolder ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedFolder.name}</h2>
                    <p className="text-gray-600">{photos.length} photos</p>
                  </div>
                  <label className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-upload-2-line mr-2"></i>
                    Upload Photos
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Upload Progress */}
                {uploadingPhotos && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900 mb-3">Uploading photos...</p>
                    {Object.entries(uploadProgress).map(([filename, progress]) => (
                      <div key={filename} className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{filename}</span>
                          <span className="text-blue-900">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-900 h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Photos Grid */}
                {photos.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="ri-image-add-line text-5xl text-gray-400"></i>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Photos Yet</h3>
                    <p className="text-gray-600">Upload photos to get started</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div
                        key={photo.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
                          handleReorderPhotos(dragIndex, index);
                        }}
                        className="group relative aspect-square rounded-lg overflow-hidden cursor-move shadow-md hover:shadow-xl transition-all"
                      >
                        <img
                          src={photo.image_url}
                          alt={photo.caption || `Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => openDeletePhotoConfirm(photo)}
                            className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors whitespace-nowrap"
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </button>
                        </div>

                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900 whitespace-nowrap">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="ri-folder-open-line text-6xl text-gray-400"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a Folder</h3>
                <p className="text-gray-600">Choose a folder from the left to manage its photos</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Folder Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Folder</h3>
            <form onSubmit={handleCreateFolder}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Folder Name *
                  </label>
                  <input
                    type="text"
                    value={folderForm.name}
                    onChange={(e) => setFolderForm({ ...folderForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="e.g., Sports Day 2025"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={folderForm.description}
                    onChange={(e) => setFolderForm({ ...folderForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    rows={3}
                    placeholder="Brief description of the event"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={folderForm.event_date}
                    onChange={(e) => setFolderForm({ ...folderForm, event_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setFolderForm({ name: '', description: '', event_date: '', cover_image_url: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Folder Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Folder</h3>
            <form onSubmit={handleEditFolder}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Folder Name *
                  </label>
                  <input
                    type="text"
                    value={folderForm.name}
                    onChange={(e) => setFolderForm({ ...folderForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={folderForm.description}
                    onChange={(e) => setFolderForm({ ...folderForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={folderForm.event_date}
                    onChange={(e) => setFolderForm({ ...folderForm, event_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <i className="ri-error-warning-line text-3xl text-red-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Delete Folder?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <strong>{selectedFolder.name}</strong>? This will permanently delete all {selectedFolder.photo_count} photos in this folder. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFolder}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Photo Confirmation Modal */}
      {showDeletePhotoConfirm && photoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <i className="ri-image-line text-3xl text-red-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Delete Photo?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this photo? This action cannot be undone.
            </p>
            
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={photoToDelete.image_url}
                alt="Photo to delete"
                className="w-full h-40 object-cover"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeletePhotoConfirm(false);
                  setPhotoToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePhoto}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                Delete Photo
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
