import { supabase } from '../lib/supabase';

export interface FacultyMember {
  id: string;
  name?: string;
  designation?: string;
  department?: string;
  qualifications?: string;
  bio?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  experience?: string;
  research_area?: string;
  image_url?: string;
  cv_url?: string;
  display_order?: number;
  created_at: string;
  updated_at?: string;
}

export interface CreateFacultyData {
  name?: string;
  designation?: string;
  department?: string;
  qualifications?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  bio?: string;
  experience?: string;
  research_area?: string;
  image_url?: string;
  cv_url?: string;
}

export interface UpdateFacultyData {
  name?: string;
  designation?: string;
  department?: string;
  qualifications?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  bio?: string;
  experience?: string;
  research_area?: string;
  image_url?: string;
  cv_url?: string;
}

// Fetch all faculty members
export async function fetchAllFaculty(): Promise<FacultyMember[]> {
  const { data, error } = await supabase
    .from('faculty_members')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Fetch faculty by department
export async function fetchFacultyByDepartment(department: string): Promise<FacultyMember[]> {
  const { data, error } = await supabase
    .from('faculty_members')
    .select('*')
    .eq('department', department)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Create new faculty member
export async function createFaculty(faculty: CreateFacultyData): Promise<FacultyMember> {
  const { data, error } = await supabase
    .from('faculty_members')
    .insert([faculty])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Create faculty error:', error);
    throw new Error(`Failed to create faculty: ${error.message}`);
  }
  
  if (!data) {
    throw new Error('Failed to create faculty: No data returned');
  }
  
  return data;
}

// Update faculty member
export async function updateFaculty(id: string, faculty: UpdateFacultyData): Promise<FacultyMember> {
  const { data, error } = await supabase
    .from('faculty_members')
    .update(faculty)
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Update faculty error:', error);
    throw new Error(`Failed to update faculty: ${error.message}`);
  }

  if (!data) {
    throw new Error('Faculty member not found or update failed');
  }

  return data;
}

// Delete faculty member
export async function deleteFaculty(id: string): Promise<void> {
  const { error } = await supabase
    .from('faculty_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete faculty error:', error);
    throw new Error(`Failed to delete faculty: ${error.message}`);
  }
}

// Upload faculty photo to Supabase Storage
export async function uploadFacultyPhoto(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `faculty/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('faculty-photos')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Failed to upload photo: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from('faculty-photos')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Delete faculty photo from Supabase Storage
export async function deleteFacultyPhoto(imageUrl: string): Promise<void> {
  try {
    const urlParts = imageUrl.split('/faculty-photos/');
    if (urlParts.length < 2) return;
    
    const filePath = urlParts[1];
    
    const { error } = await supabase.storage
      .from('faculty-photos')
      .remove([`faculty/${filePath}`]);

    if (error) {
      console.error('Delete photo error:', error);
    }
  } catch (error) {
    console.error('Error deleting photo:', error);
  }
}

// Validate faculty image file
export function validateFacultyImageFile(file: File): string | null {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return 'Please upload a valid image file (JPEG, PNG, or WebP)';
  }

  if (file.size > maxSize) {
    return 'Image size must be less than 5MB';
  }

  return null;
}

// Upload faculty CV to Supabase Storage
export async function uploadFacultyCV(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `cv/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('faculty-documents')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Failed to upload CV: ${uploadError.message}`);
  }

  const { data } = supabase.storage
    .from('faculty-documents')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Delete faculty CV from Supabase Storage
export async function deleteFacultyCV(cvUrl: string): Promise<void> {
  try {
    const urlParts = cvUrl.split('/faculty-documents/');
    if (urlParts.length < 2) return;
    
    const filePath = urlParts[1];
    
    const { error } = await supabase.storage
      .from('faculty-documents')
      .remove([filePath]);

    if (error) {
      console.error('Delete CV error:', error);
    }
  } catch (error) {
    console.error('Error deleting CV:', error);
  }
}

// Validate faculty CV file
export function validateFacultyCVFile(file: File): string | null {
  const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return 'Please upload a valid document file (PDF, DOC, or DOCX)';
  }

  if (file.size > maxSize) {
    return 'Document size must be less than 10MB';
  }

  return null;
}

// Legacy exports for backward compatibility
export const facultyService = {
  getFacultyByDepartment: fetchFacultyByDepartment,
  getAllFaculty: fetchAllFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty
};
