import { supabase } from '../lib/supabase';

export interface ContactInfo {
  id: string;
  address?: string;
  phone_primary?: string;
  phone_secondary?: string;
  email_primary?: string;
  email_secondary?: string;
  map_embed_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  updated_at?: string;
}

export interface UpdateContactInfoData {
  address?: string;
  phone_primary?: string;
  phone_secondary?: string;
  email_primary?: string;
  email_secondary?: string;
  map_embed_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  youtube_url?: string;
}

export const contactService = {
  async getContactInfo(): Promise<ContactInfo | null> {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateContactInfo(contactData: UpdateContactInfoData): Promise<ContactInfo> {
    const existing = await this.getContactInfo();

    if (existing) {
      const { data, error } = await supabase
        .from('contact_info')
        .update({ ...contactData, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('contact_info')
        .insert([contactData])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }
};
