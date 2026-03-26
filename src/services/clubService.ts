import { supabase } from '../lib/supabase';

export interface Club {
  id: string;
  name: string;
  department: string;
  tagline?: string;
  about?: string;
  description?: string;
  icon_symbol?: string;
  category?: string;
  vision?: string;
  mission?: string;
  banner_url?: string;
  coordinator_name?: string;
  coordinator_email?: string;
  coordinator_phone?: string;
  meeting_schedule?: string;
  achievements?: string;
  display_order: number;
}

export interface ClubPhoto {
  id: string;
  club_id: string;
  photo_url: string;
  caption?: string;
  category?: string;
  display_order: number;
}

export interface ClubDocument {
  id: string;
  club_id: string;
  title: string;
  doc_url: string;
  doc_type: string;
  display_order: number;
}

export const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const clubService = {
  async getAll(): Promise<Club[]> {
    const { data, error } = await supabase
      .from('clubs')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getBySlug(slug: string): Promise<Club | null> {
    const { data, error } = await supabase.from('clubs').select('*');
    if (error) throw error;
    if (!data) return null;
    // Exact slug match from club name
    return data.find(c => toSlug(c.name) === slug) ?? null;
  },

  async getPhotos(clubId: string): Promise<ClubPhoto[]> {
    const { data, error } = await supabase
      .from('club_photos')
      .select('*')
      .eq('club_id', clubId)
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getDocuments(clubId: string): Promise<ClubDocument[]> {
    const { data, error } = await supabase
      .from('club_documents')
      .select('*')
      .eq('club_id', clubId)
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getAllPhotos(): Promise<ClubPhoto[]> {
    const { data, error } = await supabase
      .from('club_photos')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },
};