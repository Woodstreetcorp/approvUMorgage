import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/auth/helpers';

// GET: Fetch single application by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('mortgage_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching application:', error);
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Fetch profile separately
    const { data: profile } = await supabase
      .from('profiles')
      .select('user_id, first_name, last_name, email, phone')
      .eq('user_id', data.user_id)
      .single();

    // Transform data to include applicant info
    const application = {
      id: data.id,
      applicant_name: profile 
        ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Unknown'
        : 'Unknown',
      applicant_email: profile?.email || '',
      applicant_phone: profile?.phone || '',
      applicant_first_name: profile?.first_name || '',
      applicant_last_name: profile?.last_name || '',
      status: data.status,
      application_type: data.application_type,
      property_address: data.property_address || '',
      property_city: data.property_city || '',
      property_province: data.property_province || '',
      property_postal_code: data.property_postal_code || '',
      property_value: data.property_value,
      down_payment: data.down_payment,
      credit_score: data.credit_score,
      annual_income: data.annual_income,
      employment_status: data.employment_status,
      notes: data.notes,
      submitted_at: data.submitted_at,
      approved_at: data.approved_at,
      created_at: data.created_at,
      updated_at: data.updated_at,
      user_id: data.user_id,
    };

    return NextResponse.json({ application });
  } catch (error) {
    console.error('Error in GET /api/admin/applications/[id]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
