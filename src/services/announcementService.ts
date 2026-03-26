import { supabase } from '../lib/supabase';

export interface Announcement {
  id: string;
  title?: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string;
  is_active: boolean;
  display_order?: number;
  created_at: string;
}

export interface CreateAnnouncementData {
  title?: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string;
  is_active: boolean;
  display_order?: number;
}

export interface UpdateAnnouncementData {
  title?: string;
  message?: string;
  type?: 'info' | 'warning' | 'success';
  date?: string;
  is_active?: boolean;
  display_order?: number;
}

export const announcementService = {
  // Get all announcements
  async getAll(): Promise<Announcement[]> {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get active announcements only
  async getActive(): Promise<Announcement[]> {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Create new announcement
  async create(announcementData: CreateAnnouncementData): Promise<Announcement> {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcementData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update announcement
  async update(id: string, announcementData: UpdateAnnouncementData): Promise<Announcement> {
    const { data, error } = await supabase
      .from('announcements')
      .update(announcementData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Toggle active status
  async toggleActive(id: string, isActive: boolean): Promise<Announcement> {
    const { data, error } = await supabase
      .from('announcements')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete announcement
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
