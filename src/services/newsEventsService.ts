import { supabase } from '../lib/supabase';

export interface NewsEvent {
  id: string;
  title: string;
  date: string;
  image_url: string;
  description: string;
  tag: string;
  display_order: number;
}

export interface PlacementSlide {
  id: string;
  name: string;
  branch: string;
  company: string;
  image_url: string;
  display_order: number;
}

export interface CreateNewsEventData {
  title: string;
  date: string;
  image_url: string;
  description: string;
  tag: string;
  display_order: number;
}

export interface CreatePlacementSlideData {
  name: string;
  branch: string;
  company: string;
  image_url: string;
  display_order: number;
}

export const newsEventService = {
  async getAll(): Promise<NewsEvent[]> {
    const { data, error } = await supabase
      .from('news_events')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async create(newsData: CreateNewsEventData): Promise<NewsEvent> {
    const { data, error } = await supabase
      .from('news_events')
      .insert([newsData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, newsData: Partial<CreateNewsEventData>): Promise<NewsEvent> {
    const { data, error } = await supabase
      .from('news_events')
      .update(newsData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('news_events')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async uploadImage(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `news_${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from('placement-photos')
      .upload(path, file, { upsert: true });
    if (upErr) throw upErr;
    const { data } = supabase.storage
      .from('placement-photos')
      .getPublicUrl(path);
    return data.publicUrl;
  },
};

export const placementSlideService = {
  async getAll(): Promise<PlacementSlide[]> {
    const { data, error } = await supabase
      .from('placement_slides')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async create(slideData: CreatePlacementSlideData): Promise<PlacementSlide> {
    const { data, error } = await supabase
      .from('placement_slides')
      .insert([slideData])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, slideData: Partial<CreatePlacementSlideData>): Promise<PlacementSlide> {
    const { data, error } = await supabase
      .from('placement_slides')
      .update(slideData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async uploadPhoto(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const path = `placement_${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from('placement-photos')
      .upload(path, file, { upsert: true });
    if (upErr) throw upErr;
    const { data } = supabase.storage
      .from('placement-photos')
      .getPublicUrl(path);
    return data.publicUrl;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('placement_slides')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};