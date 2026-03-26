import { supabase } from '../lib/supabase';

export interface Facility {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FacilityPhoto {
  id: string;
  facility_id: string;
  image_url: string;
  caption: string;
  display_order: number;
  created_at: string;
}

export const facilityService = {
  // Get all facilities
  async getAllFacilities(): Promise<Facility[]> {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  // Get facility by slug
  async getFacilityBySlug(slug: string): Promise<Facility | null> {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Update facility description
  async updateFacility(id: string, description: string): Promise<void> {
    const { error } = await supabase
      .from('facilities')
      .update({ description, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  },

  // Get photos for a facility
  async getFacilityPhotos(facilityId: string): Promise<FacilityPhoto[]> {
    const { data, error } = await supabase
      .from('facility_photos')
      .select('*')
      .eq('facility_id', facilityId)
      .order('display_order');

    if (error) throw error;
    return data || [];
  },

  // Add photo to facility
  async addPhoto(facilityId: string, imageUrl: string, caption: string): Promise<void> {
    const { error } = await supabase
      .from('facility_photos')
      .insert({
        facility_id: facilityId,
        image_url: imageUrl,
        caption: caption,
        display_order: 0
      });

    if (error) throw error;
  },

  // Delete photo
  async deletePhoto(photoId: string): Promise<void> {
    const { error } = await supabase
      .from('facility_photos')
      .delete()
      .eq('id', photoId);

    if (error) throw error;
  },

  // Update photo caption
  async updatePhotoCaption(photoId: string, caption: string): Promise<void> {
    const { error } = await supabase
      .from('facility_photos')
      .update({ caption })
      .eq('id', photoId);

    if (error) throw error;
  }
};
