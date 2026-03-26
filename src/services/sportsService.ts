import { supabase } from '../lib/supabase';

export interface SportsContent {
  id: string;
  title?: string;
  description?: string;
  image_url?: string;
  achievement_title?: string;
  achievement_description?: string;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSportsContentData {
  title?: string;
  description?: string;
  image_url?: string;
  achievement_title?: string;
  achievement_description?: string;
  display_order?: number;
}

export const sportsService = {
  async getAllContent(): Promise<SportsContent[]> {
    const { data, error } = await supabase
      .from('sports_content')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async createContent(contentData: CreateSportsContentData): Promise<SportsContent> {
    const { data, error } = await supabase
      .from('sports_content')
      .insert([contentData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateContent(id: string, contentData: Partial<CreateSportsContentData>): Promise<SportsContent> {
    const { data, error } = await supabase
      .from('sports_content')
      .update({ ...contentData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteContent(id: string): Promise<void> {
    const content = await this.getContentById(id);
    
    if (content?.image_url) {
      await this.deleteImage(content.image_url);
    }

    const { error } = await supabase
      .from('sports_content')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getContentById(id: string): Promise<SportsContent | null> {
    const { data, error } = await supabase
      .from('sports_content')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `sports/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('sports-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('sports-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deleteImage(imageUrl: string): Promise<void> {
    const path = imageUrl.split('/sports-images/')[1];
    if (path) {
      await supabase.storage.from('sports-images').remove([path]);
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
