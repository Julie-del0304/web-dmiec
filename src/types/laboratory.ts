export interface Laboratory {
  id: string;
  name: string;
  department: string;
  description: string;
  equipment: string[];
  capacity: number;
  incharge_name: string;
  incharge_email: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface LaboratoryPhoto {
  id: string;
  laboratory_id: string;
  image_url: string;
  caption: string;
  display_order: number;
  created_at: string;
}

export interface CreateLaboratoryInput {
  name: string;
  department: string;
  description: string;
  equipment: string[];
  capacity: number;
  incharge_name: string;
  incharge_email: string;
  display_order?: number;
}

export interface UpdateLaboratoryInput {
  name?: string;
  department?: string;
  description?: string;
  equipment?: string[];
  capacity?: number;
  incharge_name?: string;
  incharge_email?: string;
  display_order?: number;
}

export interface CreateLaboratoryPhotoInput {
  laboratory_id: string;
  image_url: string;
  caption?: string;
  display_order?: number;
}
