import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      email,
      phone,
      annual_income,
      property_value,
      down_payment_percentage,
      credit_score_range,
      employment_type,
      mortgage_type,
      property_address,
      property_city,
      property_province,
      property_postal_code,
    } = body;

    // Validation
    if (!full_name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Use admin client for all operations
    const adminSupabase = createAdminClient();
    
    // Parse values
    const parsedIncome = annual_income ? parseFloat(annual_income.toString().replace(/,/g, '')) : null;
    const parsedPropertyValue = property_value ? parseFloat(property_value.toString().replace(/,/g, '')) : null;
    
    // Calculate down payment amount if percentage provided
    let downPaymentAmount = null;
    if (down_payment_percentage && parsedPropertyValue) {
      const percentage = parseFloat(down_payment_percentage.replace('%', ''));
      downPaymentAmount = (parsedPropertyValue * percentage) / 100;
    }

    // Map credit score range to average value
    const creditScoreMap: { [key: string]: number } = {
      'Excellent (750+)': 775,
      'Good (650-749)': 700,
      'Fair (600-649)': 625,
      'Building Credit (Under 600)': 550,
    };
    const creditScore = credit_score_range ? creditScoreMap[credit_score_range] || null : null;

    // Find or create user profile based on email
    let userId: string;
    
    // Check if a profile exists for this email
    const { data: existingProfile } = await adminSupabase
      .from('profiles')
      .select('user_id')
      .eq('email', email)
      .maybeSingle();

    if (existingProfile && existingProfile.user_id) {
      userId = existingProfile.user_id; // Use user_id from profile, not the profile's id
    } else {
      // Create a minimal profile for the applicant
      const [firstName, ...lastNameParts] = full_name.split(' ');
      const lastName = lastNameParts.join(' ') || '';
      
      // First create an auth user
      const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
        email,
        email_confirm: true,
      });

      if (authError || !authData.user) {
        console.error('Error creating auth user:', authError);
        return NextResponse.json(
          { error: 'Failed to create user account' },
          { status: 500 }
        );
      }

      const { data: newProfile, error: profileError } = await adminSupabase
        .from('profiles')
        .insert([
          {
            user_id: authData.user.id,
            email,
            phone,
            first_name: firstName,
            last_name: lastName,
          },
        ])
        .select()
        .single();

      if (profileError) {
        console.error('Error creating profile:', profileError);
        return NextResponse.json(
          { error: 'Failed to create applicant profile' },
          { status: 500 }
        );
      }

      userId = authData.user.id; // Use the auth user ID, not profile ID
    }

    // Insert mortgage application
    const { data, error } = await adminSupabase
      .from('mortgage_applications')
      .insert([
        {
          user_id: userId,
          application_type: mortgage_type?.toLowerCase() || 'purchase',
          annual_income: parsedIncome,
          property_value: parsedPropertyValue,
          down_payment: downPaymentAmount,
          credit_score: creditScore,
          employment_status: employment_type || null,
          property_address: property_address || null,
          property_city: property_city || null,
          property_province: property_province || null,
          property_postal_code: property_postal_code || null,
          status: 'submitted',
          submitted_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Your mortgage application has been submitted successfully!',
      data: {
        application_id: data.id,
        status: data.status,
      },
    });
  } catch (error: any) {
    console.error('Error submitting mortgage application:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit mortgage application',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
