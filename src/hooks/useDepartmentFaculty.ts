
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualifications: string;
  bio: string | null;
  image_url: string | null;
  display_order: number;
}

// Department code mapping to database values
const departmentMap: Record<string, string> = {
  'CSE': 'Computer Science & Engineering',
  'ECE': 'Electronics & Communication Engineering',
  'EEE': 'Electrical & Electronics Engineering',
  'MECH': 'Mechanical Engineering',
  'IT': 'Information Technology',
  'AIDS': 'Artificial Intelligence & Data Science',
};

export function useDepartmentFaculty(departmentCode: string) {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const departmentName = departmentMap[departmentCode] || departmentCode;
        
        const { data, error: fetchError } = await supabase
          .from('faculty_members')
          .select('*')
          .eq('department', departmentName)
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;
        setFaculty(data || []);
      } catch (err) {
        console.error('Error fetching faculty:', err);
        setError('Failed to load faculty members');
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [departmentCode]);

  // Separate HOD from other faculty
  const hod = faculty.find(f => 
    f.designation.toLowerCase().includes('head of department') || 
    f.designation.toLowerCase() === 'hod'
  );
  const staff = faculty.filter(f => 
    !f.designation.toLowerCase().includes('head of department') && 
    f.designation.toLowerCase() !== 'hod'
  );

  return { faculty, hod, staff, loading, error };
}
