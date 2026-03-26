import { supabase } from '../lib/supabase';

export interface GalleryItem {
  id: string;
  title?: string;
  description?: string;
  type?: string;
  image_url?: string;
  video_url?: string;
  category?: string;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateGalleryItemData {
  title?: string;
  description?: string;
  type?: string;
  image_url?: string;
  video_url?: string;
  category?: string;
  display_order?: number;
}

export const galleryService = {
  async getAllItems(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async getItemsByCategory(category: string): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('category', category)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createItem(itemData: CreateGalleryItemData): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from('gallery_items')
      .insert([itemData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateItem(id: string, itemData: Partial<CreateGalleryItemData>): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from('gallery_items')
      .update({ ...itemData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deleteImage(imageUrl: string): Promise<void> {
    const path = imageUrl.split('/gallery-images/')[1];
    if (path) {
      await supabase.storage.from('gallery-images').remove([path]);
    }
  },

  validateImageFile(file: File): string | null {
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return 'Only JPG, PNG, and WEBP images are allowed';
    }

    if (file.size > maxSize) {
      return 'Image size must be less than 5MB';
    }

    return null;
  }
};
