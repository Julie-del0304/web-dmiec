import { supabase } from '../lib/supabase';
import type {
  EventFolder,
  EventPhoto,
  CreateEventFolderInput,
  UpdateEventFolderInput,
  CreateEventPhotoInput,
  EventFolderWithPhotoCount,
} from '../types/events';

// ==================== FOLDER OPERATIONS ====================

/**
 * Fetch all event folders with photo count
 */
export async function fetchAllFolders(): Promise<EventFolderWithPhotoCount[]> {
  try {
    const { data: folders, error: foldersError } = await supabase
      .from('event_folders')
      .select('*')
      .order('event_date', { ascending: false });

    if (foldersError) throw foldersError;

    // Get photo counts for each folder
    const foldersWithCount = await Promise.all(
      (folders || []).map(async (folder) => {
        const { count, error: countError } = await supabase
          .from('event_photos')
          .select('*', { count: 'exact', head: true })
          .eq('folder_id', folder.id);

        if (countError) {
          console.error('Error counting photos:', countError);
          return { ...folder, photo_count: 0 };
        }

        return { ...folder, photo_count: count || 0 };
      })
    );

    return foldersWithCount;
  } catch (error) {
    console.error('Error fetching folders:', error);
    throw new Error('Failed to fetch event folders');
  }
}

/**
 * Fetch a single event folder by ID
 */
export async function fetchFolderById(folderId: string): Promise<EventFolder | null> {
  try {
    const { data, error } = await supabase
      .from('event_folders')
      .select('*')
      .eq('id', folderId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching folder:', error);
    throw new Error('Failed to fetch event folder');
  }
}

/**
 * Create a new event folder
 */
export async function createFolder(input: CreateEventFolderInput): Promise<EventFolder> {
  try {
    const { data, error } = await supabase
      .from('event_folders')
      .insert([
        {
          name: input.name,
          description: input.description || null,
          event_date: input.event_date || null,
          cover_image_url: input.cover_image_url || null,
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase insert error:', JSON.stringify(error));
      throw error;
    }
    if (!data) throw new Error('No data returned after insert');
    return data;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw new Error(`Error creating folder: ${JSON.stringify(error)}`);
  }
}

/**
 * Update an existing event folder
 */
export async function updateFolder(
  folderId: string,
  input: UpdateEventFolderInput
): Promise<EventFolder> {
  try {
    const updateData: Record<string, string | null> = {};

    if (input.name !== undefined) updateData.name = input.name;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.event_date !== undefined) updateData.event_date = input.event_date;
    if (input.cover_image_url !== undefined) updateData.cover_image_url = input.cover_image_url;

    const { data, error } = await supabase
      .from('event_folders')
      .update(updateData)
      .eq('id', folderId)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Supabase update error:', JSON.stringify(error));
      throw error;
    }
    if (!data) throw new Error('No data returned after update');
    return data;
  } catch (error) {
    console.error('Error updating folder:', error);
    throw new Error('Failed to update event folder');
  }
}

/**
 * Delete an event folder (cascade deletes all photos)
 */
export async function deleteFolder(folderId: string): Promise<void> {
  try {
    // First, get all photos to delete from storage
    const photos = await fetchPhotosByFolderId(folderId);

    // Delete all photos from storage
    if (photos.length > 0) {
      const filePaths = photos
        .map((photo) => extractStoragePathFromUrl(photo.image_url))
        .filter((path): path is string => path !== null);

      if (filePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('event-images')
          .remove(filePaths);

        if (storageError) {
          console.error('Error deleting photos from storage:', storageError);
        }
      }
    }

    // Delete folder (photos will be cascade deleted by database)
    const { error } = await supabase.from('event_folders').delete().eq('id', folderId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting folder:', error);
    throw new Error('Failed to delete event folder');
  }
}

// ==================== PHOTO OPERATIONS ====================

/**
 * Fetch all photos for a specific folder
 */
export async function fetchPhotosByFolderId(folderId: string): Promise<EventPhoto[]> {
  try {
    const { data, error } = await supabase
      .from('event_photos')
      .select('*')
      .eq('folder_id', folderId)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw new Error('Failed to fetch event photos');
  }
}

/**
 * Upload a photo to Supabase Storage and create database record
 */
export async function uploadPhoto(
  file: File,
  input: CreateEventPhotoInput
): Promise<EventPhoto> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${input.folder_id}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}.${fileExt}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = supabase.storage.from('event-images').getPublicUrl(uploadData.path);

    // Create database record
    const { data: photoData, error: photoError } = await supabase
      .from('event_photos')
      .insert([
        {
          folder_id: input.folder_id,
          image_url: urlData.publicUrl,
          caption: input.caption || null,
          display_order: input.display_order || 0,
        },
      ])
      .select()
      .single();

    if (photoError) throw photoError;
    return photoData;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw new Error('Failed to upload photo');
  }
}

/**
 * Delete a photo from storage and database
 */
export async function deletePhoto(photoId: string): Promise<void> {
  try {
    // Get photo data first
    const { data: photo, error: fetchError } = await supabase
      .from('event_photos')
      .select('*')
      .eq('id', photoId)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!photo) throw new Error('Photo not found');

    // Extract storage path from URL
    const storagePath = extractStoragePathFromUrl(photo.image_url);

    // Delete from database
    const { error: deleteError } = await supabase.from('event_photos').delete().eq('id', photoId);

    if (deleteError) throw deleteError;

    // Delete from storage
    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from('event-images')
        .remove([storagePath]);

      if (storageError) {
        console.error('Error deleting from storage:', storageError);
      }
    }
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw new Error('Failed to delete photo');
  }
}

/**
 * Update photo order and caption
 */
export async function updatePhotoOrder(
  photoId: string,
  displayOrder: number,
  caption?: string
): Promise<EventPhoto> {
  try {
    const updateData: Record<string, number | string | null> = {
      display_order: displayOrder,
    };

    if (caption !== undefined) {
      updateData.caption = caption;
    }

    const { data, error } = await supabase
      .from('event_photos')
      .update(updateData)
      .eq('id', photoId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating photo:', error);
    throw new Error('Failed to update photo');
  }
}

/**
 * Batch update photo orders
 */
export async function batchUpdatePhotoOrders(
  updates: Array<{ id: string; display_order: number }>
): Promise<void> {
  try {
    const promises = updates.map((update) =>
      supabase
        .from('event_photos')
        .update({ display_order: update.display_order })
        .eq('id', update.id)
    );

    const results = await Promise.all(promises);

    const errors = results.filter((result) => result.error);
    if (errors.length > 0) {
      throw new Error('Some photo orders failed to update');
    }
  } catch (error) {
    console.error('Error batch updating photo orders:', error);
    throw new Error('Failed to update photo orders');
  }
}

/**
 * Get the first photo of a folder (for cover image)
 */
export async function getFirstPhoto(folderId: string): Promise<EventPhoto | null> {
  try {
    const { data, error } = await supabase
      .from('event_photos')
      .select('*')
      .eq('folder_id', folderId)
      .order('display_order', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching first photo:', error);
    return null;
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Extract storage path from Supabase public URL
 */
function extractStoragePathFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const bucketIndex = pathParts.findIndex((part) => part === 'event-images');

    if (bucketIndex === -1) return null;

    return pathParts.slice(bucketIndex + 1).join('/');
  } catch (error) {
    console.error('Error extracting storage path:', error);
    return null;
  }
}

/**
 * Validate image file type and size
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 10MB. Please upload a smaller image.',
    };
  }

  return { valid: true };
}

/**
 * Create lazy loading observer for images
 */
export function createImageLazyLoader(
  callback: (entry: IntersectionObserverEntry) => void
): IntersectionObserver {
  const options = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
}

/**
 * Preload image for smooth display
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

// ==================== SERVICE OBJECT ====================

export const eventService = {
  fetchFolderById: async (folderId: string): Promise<EventFolder> => {
    const { data, error } = await supabase
      .from('event_folders')
      .select('*')
      .eq('id', folderId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching folder:', error);
      throw new Error('Failed to fetch event folder');
    }

    if (!data) {
      throw new Error('Event folder not found');
    }

    return data;
  },

  fetchPhotosByFolderId: async (folderId: string): Promise<EventPhoto[]> => {
    const { data, error } = await supabase
      .from('event_photos')
      .select('*')
      .eq('folder_id', folderId)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching photos:', error);
      throw new Error('Failed to fetch event photos');
    }

    return data || [];
  },
};

/**
 * Alternate batch update implementation using upsert.
 * Kept for backward compatibility – exported under a distinct name.
 */
export const upsertBatchUpdatePhotoOrders = async (
  updates: { id: string; display_order: number }[]
): Promise<void> => {
  const { error } = await supabase
    .from('event_photos')
    .upsert(
      updates.map((update) => ({
        id: update.id,
        display_order: update.display_order,
      }))
    );

  if (error) throw error;
};
