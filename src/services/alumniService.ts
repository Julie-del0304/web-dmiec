import { supabase } from '../lib/supabase';

export interface Alumni {
  id: string;
  name?: string;
  batch?: string;
  designation?: string;
  company?: string;
  photo_url?: string;
  achievement?: string;
  linkedin_url?: string;
  email?: string;
  phone?: string;
  type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AlumniEvent {
  id: string;
  title?: string;
  description?: string;
  event_date?: string;
  location?: string;
  image_url?: string;
  attendees_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateAlumniData {
  name?: string;
  batch?: string;
  designation?: string;
  company?: string;
  photo_url?: string;
  achievement?: string;
  linkedin_url?: string;
  email?: string;
  phone?: string;
  type?: string;
}

export interface CreateAlumniEventData {
  title?: string;
  description?: string;
  event_date?: string;
  location?: string;
  image_url?: string;
  attendees_count?: number;
}

export const alumniService = {
  async getAllAlumni(): Promise<Alumni[]> {
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAlumniByType(type: string): Promise<Alumni[]> {
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createAlumni(alumniData: CreateAlumniData): Promise<Alumni> {
    const { data, error } = await supabase
      .from('alumni')
      .insert([alumniData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateAlumni(id: string, alumniData: Partial<CreateAlumniData>): Promise<Alumni> {
    const { data, error } = await supabase
      .from('alumni')
      .update({ ...alumniData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteAlumni(id: string): Promise<void> {
    const alumni = await this.getAlumniById(id);
    
    if (alumni?.photo_url) {
      await this.deletePhoto(alumni.photo_url);
    }

    const { error } = await supabase
      .from('alumni')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getAlumniById(id: string): Promise<Alumni | null> {
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  async getAllEvents(): Promise<AlumniEvent[]> {
    const { data, error } = await supabase
      .from('alumni_events')
      .select('*')
      .order('event_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createEvent(eventData: CreateAlumniEventData): Promise<AlumniEvent> {
    const { data, error } = await supabase
      .from('alumni_events')
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEvent(id: string, eventData: Partial<CreateAlumniEventData>): Promise<AlumniEvent> {
    const { data, error } = await supabase
      .from('alumni_events')
      .update({ ...eventData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteEvent(id: string): Promise<void> {
    const event = await this.getEventById(id);
    
    if (event?.image_url) {
      await this.deletePhoto(event.image_url);
    }

    const { error } = await supabase
      .from('alumni_events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getEventById(id: string): Promise<AlumniEvent | null> {
    const { data, error } = await supabase
      .from('alumni_events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  async uploadPhoto(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `alumni/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('alumni-photos')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('alumni-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deletePhoto(photoUrl: string): Promise<void> {
    const path = photoUrl.split('/alumni-photos/')[1];
    if (path) {
      await supabase.storage.from('alumni-photos').remove([path]);
    }
  },

  validatePhotoFile(file: File): string | null {
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
