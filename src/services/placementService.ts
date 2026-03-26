import { supabase } from '../lib/supabase';
import type { PlacementRecord, PlacementTeamMember, Recruiter } from '../types/placement';

export const placementService = {
  // Placement Records
  async getPlacementRecords(): Promise<PlacementRecord[]> {
    const { data, error } = await supabase
      .from('placement_records')
      .select('*')
      .order('display_order', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createPlacementRecord(record: Omit<PlacementRecord, 'id' | 'created_at' | 'updated_at'>): Promise<PlacementRecord> {
    const { data, error } = await supabase
      .from('placement_records')
      .insert([record])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePlacementRecord(id: string, record: Partial<PlacementRecord>): Promise<PlacementRecord> {
    const { data, error } = await supabase
      .from('placement_records')
      .update({ ...record, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePlacementRecord(id: string): Promise<void> {
    const { error } = await supabase
      .from('placement_records')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Placement Team
  async getPlacementTeam(): Promise<PlacementTeamMember[]> {
    const { data, error } = await supabase
      .from('placement_team')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async createTeamMember(member: Omit<PlacementTeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<PlacementTeamMember> {
    const { data, error } = await supabase
      .from('placement_team')
      .insert([member])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTeamMember(id: string, member: Partial<PlacementTeamMember>): Promise<PlacementTeamMember> {
    const { data, error } = await supabase
      .from('placement_team')
      .update({ ...member, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteTeamMember(id: string): Promise<void> {
    const { error } = await supabase
      .from('placement_team')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Recruiters
  async getRecruiters(): Promise<Recruiter[]> {
    const { data, error } = await supabase
      .from('recruiters')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async createRecruiter(recruiter: Omit<Recruiter, 'id' | 'created_at' | 'updated_at'>): Promise<Recruiter> {
    const { data, error } = await supabase
      .from('recruiters')
      .insert([recruiter])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateRecruiter(id: string, recruiter: Partial<Recruiter>): Promise<Recruiter> {
    const { data, error } = await supabase
      .from('recruiters')
      .update({ ...recruiter, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteRecruiter(id: string): Promise<void> {
    const { error } = await supabase
      .from('recruiters')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
