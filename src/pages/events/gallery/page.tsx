import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '../../../services/eventService';
import type { EventFolder, EventPhoto } from '../../../types/events';

export default function EventGalleryPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();
  
  const [folder, setFolder] = useState<EventFolder | null>(null);
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    if (folderId) {
      fetchGalleryData();
    }
  }, [folderId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentPhotoIndex]);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!folderId) return;
      
      const [folderData, photosData] = await Promise.all([
        eventService.fetchFolderById(folderId),
        eventService.fetchPhotosByFolderId(folderId)
      ]);
      
      setFolder(folderData);
      setPhotos(photosData);
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to load gallery. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const goToPrevious = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleBackClick = () => {
    navigate('/events');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
            <div className="h-12 w-96 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
            <div className="h-6 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !folder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <i className="ri-error-warning-line text-4xl text-red-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {error || 'Event not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't load this event gallery. Please try again.
          </p>
          <button
            onClick={handleBackClick}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-white/80 hover:text-white transition-colors mb-6 whitespace-nowrap"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Events
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {folder.name}
          </h1>
          
          {folder.description && (
            <p className="text-xl text-white/90 mb-4 max-w-3xl">
              {folder.description}
            </p>
          )}
          
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <i className="ri-calendar-line"></i>
              <span>{new Date(folder.event_date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-image-line"></i>
              <span>{photos.length} {photos.length === 1 ? 'Photo' : 'Photos'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        {photos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-image-line text-5xl text-gray-400"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Photos Yet</h3>
            <p className="text-gray-600">Photos will be added soon for this event.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={photo.image_url}
                  alt={photo.caption || `Photo ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {photo.caption && (
                      <p className="text-white text-sm font-medium line-clamp-2">
                        {photo.caption}
                      </p>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <i className="ri-zoom-in-line text-2xl text-blue-900"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && photos.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10 whitespace-nowrap"
            aria-label="Close lightbox"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium z-10 whitespace-nowrap">
            {currentPhotoIndex + 1} / {photos.length}
          </div>

          {/* Previous Button */}
          {photos.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10 whitespace-nowrap"
              aria-label="Previous photo"
            >
              <i className="ri-arrow-left-s-line text-2xl"></i>
            </button>
          )}

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10 whitespace-nowrap"
              aria-label="Next photo"
            >
              <i className="ri-arrow-right-s-line text-2xl"></i>
            </button>
          )}

          {/* Main Image */}
          <div className="max-w-7xl max-h-[90vh] mx-4">
            <img
              src={photos[currentPhotoIndex].image_url}
              alt={photos[currentPhotoIndex].caption || `Photo ${currentPhotoIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {photos[currentPhotoIndex].caption && (
              <div className="mt-4 text-center">
                <p className="text-white text-lg font-medium">
                  {photos[currentPhotoIndex].caption}
                </p>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 max-w-4xl overflow-x-auto">
              <div className="flex gap-2 px-4">
                {photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all whitespace-nowrap ${
                      index === currentPhotoIndex
                        ? 'ring-2 ring-white scale-110'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.image_url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
