export interface PlacementRecord {
  id: string;
  academic_year: string;
  total_students: number;
  placed_students: number;
  highest_package: number;
  average_package: number;
  companies_visited: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PlacementTeamMember {
  id: string;
  name: string;
  designation: string;
  role: string;
  email?: string;
  phone?: string;
  image_url?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Recruiter {
  id: string;
  company_name: string;
  logo_url: string;
  website_url?: string;
  category?: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}
