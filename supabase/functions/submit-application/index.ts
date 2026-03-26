import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const formData = await req.json();

    // Validate required fields
    const requiredFields = [
      'fullName', 'email', 'phone', 'dateOfBirth', 'gender',
      'streetAddress', 'city', 'state', 'pincode',
      'tenthMarks', 'tenthBoard', 'twelfthMarks', 'twelfthBoard',
      'programType', 'specialization', 'category'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      return new Response(
        JSON.stringify({ error: 'Phone number must be 10 digits' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert application data
    const { data, error } = await supabaseClient
      .from('applications')
      .insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          street_address: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          tenth_marks: parseFloat(formData.tenthMarks),
          tenth_board: formData.tenthBoard,
          twelfth_marks: parseFloat(formData.twelfthMarks),
          twelfth_board: formData.twelfthBoard,
          program_type: formData.programType,
          specialization: formData.specialization,
          tnea_rank: formData.tneaRank || null,
          category: formData.category,
          tenth_certificate_url: formData.tenthCertificateUrl || null,
          twelfth_certificate_url: formData.twelfthCertificateUrl || null,
          photo_url: formData.photoUrl || null,
          application_status: 'Pending'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to submit application', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        applicationId: data.id,
        message: 'Application submitted successfully'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});