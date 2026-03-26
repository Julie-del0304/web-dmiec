import { supabase } from '../lib/supabase';

export interface PageContent {
  id: string;
  page_slug: string;
  section_title?: string;
  body_text?: string;
  image_urls?: string[];
  pdf_urls?: string[];
  doc_urls?: string[];
  video_url?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePageContentData {
  page_slug: string;
  section_title?: string;
  body_text?: string;
  image_urls?: string[];
  pdf_urls?: string[];
  doc_urls?: string[];
  video_url?: string;
  display_order?: number;
}

export const pageContentService = {
  async getByPageSlug(pageSlug: string): Promise<PageContent[]> {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_slug', pageSlug)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  async create(contentData: CreatePageContentData): Promise<PageContent> {
    const { data, error } = await supabase
      .from('page_content')
      .insert([contentData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, contentData: Partial<CreatePageContentData>): Promise<PageContent> {
    const { data, error } = await supabase
      .from('page_content')
      .update({ ...contentData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('page_content')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('page-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('page-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async uploadDocument(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('page-documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('page-documents')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deleteFile(url: string, bucket: 'page-images' | 'page-documents'): Promise<void> {
    const path = url.split(`${bucket}/`)[1];
    if (path) {
      await supabase.storage.from(bucket).remove([path]);
    }
  }
};
