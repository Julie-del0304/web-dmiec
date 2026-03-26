import { supabase } from '../lib/supabase';
import type { Laboratory, LaboratoryPhoto, CreateLaboratoryInput, UpdateLaboratoryInput, CreateLaboratoryPhotoInput } from '../types/laboratory';

export const laboratoryService = {
  // Get all laboratories
  async getAllLaboratories(): Promise<Laboratory[]> {
    const { data, error } = await supabase
      .from('laboratories')
      .select('*')
      .order('display_order')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  // Get laboratories by department
  async getLaboratoriesByDepartment(department: string): Promise<Laboratory[]> {
    const { data, error } = await supabase
      .from('laboratories')
      .select('*')
      .eq('department', department)
      .order('display_order')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  // Get laboratory by ID
  async getLaboratoryById(id: string): Promise<Laboratory | null> {
    const { data, error } = await supabase
      .from('laboratories')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  // Create laboratory
  async createLaboratory(input: CreateLaboratoryInput): Promise<Laboratory> {
    const { data, error } = await supabase
      .from('laboratories')
      .insert(input)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update laboratory
  async updateLaboratory(id: string, input: UpdateLaboratoryInput): Promise<void> {
    const { error } = await supabase
      .from('laboratories')
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  },

  // Delete laboratory
  async deleteLaboratory(id: string): Promise<void> {
    const { error } = await supabase
      .from('laboratories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get photos for a laboratory
  async getLaboratoryPhotos(laboratoryId: string): Promise<LaboratoryPhoto[]> {
    const { data, error } = await supabase
      .from('laboratory_photos')
      .select('*')
      .eq('laboratory_id', laboratoryId)
      .order('display_order')
      .order('created_at');

    if (error) throw error;
    return data || [];
  },

  // Add photo to laboratory
  async addPhoto(input: CreateLaboratoryPhotoInput): Promise<void> {
    const { error } = await supabase
      .from('laboratory_photos')
      .insert(input);

    if (error) throw error;
  },

  // Delete photo
  async deletePhoto(photoId: string): Promise<void> {
    const { error } = await supabase
      .from('laboratory_photos')
      .delete()
      .eq('id', photoId);

    if (error) throw error;
  },

  // Update photo caption
  async updatePhotoCaption(photoId: string, caption: string): Promise<void> {
    const { error } = await supabase
      .from('laboratory_photos')
      .update({ caption })
      .eq('id', photoId);

    if (error) throw error;
  }
};
