import { supabase } from '../lib/supabase';

export interface NewsItem {
  id: string;
  title: string;
  image_url: string;
  date: string;
  created_at?: string;
}

export interface CreateNewsData {
  title: string;
  image_url: string;
  date: string;
}

export interface UpdateNewsData {
  title: string;
  image_url: string;
  date: string;
}

export const newsService = {
  async getAllNews(): Promise<NewsItem[]> {
    try {
      const { data, error } = await supabase
        .from('news_items')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to load news: ${error.message}`);
      }
      
      return data || [];
    } catch (error) {
      console.error('Error in getAllNews:', error);
      throw error;
    }
  },

  async createNews(newsData: Omit<NewsItem, 'id' | 'created_at'>): Promise<NewsItem> {
    try {
      console.log('Creating news with data:', newsData);
      
      const { data, error } = await supabase
        .from('news_items')
        .insert([newsData])
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error creating news:', error);
        throw new Error(`Failed to create news: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned after creating news');
      }
      
      console.log('News created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in createNews:', error);
      throw error;
    }
  },

  async updateNews(id: string, newsData: Partial<Omit<NewsItem, 'id' | 'created_at'>>): Promise<NewsItem> {
    try {
      const { data, error } = await supabase
        .from('news_items')
        .update(newsData)
        .eq('id', id)
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error updating news:', error);
        throw new Error(`Failed to update news: ${error.message}`);
      }

      if (!data) {
        throw new Error('News item not found');
      }

      return data;
    } catch (error) {
      console.error('Error in updateNews:', error);
      throw error;
    }
  },

  async deleteNews(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('news_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting news:', error);
        throw new Error(`Failed to delete news: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in deleteNews:', error);
      throw error;
    }
  },

  async uploadNewsImage(file: File): Promise<string> {
    try {
      console.log('Starting image upload:', file.name, file.type, file.size);
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `news-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      
      console.log('Uploading to path:', fileName);
      
      // Upload to news-images bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);

      console.log('Public URL:', urlData.publicUrl);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error in uploadNewsImage:', error);
      throw error;
    }
  }
};
