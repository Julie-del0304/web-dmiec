
import { supabase } from '../lib/supabase';

export interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  tenthMarks: number;
  tenthBoard: string;
  twelfthMarks: number;
  twelfthBoard: string;
  programType: string;
  specialization: string;
  tneaRank?: string;
  category: string;
  tenthCertificate?: File;
  twelfthCertificate?: File;
  photo?: File;
}

export const submitApplication = async (data: ApplicationData) => {
  try {
    // Upload files if provided
    let tenthCertificateUrl = null;
    let twelfthCertificateUrl = null;
    let photoUrl = null;

    if (data.tenthCertificate) {
      const fileName = `tenth_${Date.now()}_${data.tenthCertificate.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(fileName, data.tenthCertificate);

      if (uploadError) throw uploadError;
      
      const { data: urlData } = supabase.storage
        .from('application-documents')
        .getPublicUrl(fileName);
      
      tenthCertificateUrl = urlData.publicUrl;
    }

    if (data.twelfthCertificate) {
      const fileName = `twelfth_${Date.now()}_${data.twelfthCertificate.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(fileName, data.twelfthCertificate);

      if (uploadError) throw uploadError;
      
      const { data: urlData } = supabase.storage
        .from('application-documents')
        .getPublicUrl(fileName);
      
      twelfthCertificateUrl = urlData.publicUrl;
    }

    if (data.photo) {
      const fileName = `photo_${Date.now()}_${data.photo.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('application-documents')
        .upload(fileName, data.photo);

      if (uploadError) throw uploadError;
      
      const { data: urlData } = supabase.storage
        .from('application-documents')
        .getPublicUrl(fileName);
      
      photoUrl = urlData.publicUrl;
    }

    // Insert application data with correct field mapping
    const { data: applicationData, error: insertError } = await supabase
      .from('applications')
      .insert([
        {
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          date_of_birth: data.dateOfBirth,
          gender: data.gender,
          street_address: data.streetAddress,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          tenth_marks: parseFloat(data.tenthMarks.toString()),
          tenth_board: data.tenthBoard,
          twelfth_marks: parseFloat(data.twelfthMarks.toString()),
          twelfth_board: data.twelfthBoard,
          program_type: data.programType,
          specialization: data.specialization,
          tnea_rank: data.tneaRank || null,
          category: data.category,
          tenth_certificate_url: tenthCertificateUrl,
          twelfth_certificate_url: twelfthCertificateUrl,
          photo_url: photoUrl,
          application_status: 'pending',
        },
      ])
      .select();

    if (insertError) throw insertError;

    return { success: true, data: applicationData };
  } catch (error: any) {
    console.error('Error submitting application:', error);
    return { success: false, error: error.message };
  }
};
