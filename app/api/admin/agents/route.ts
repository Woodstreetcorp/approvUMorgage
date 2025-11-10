/**
 * Admin Agents API Route
 * CRUD operations for agents management
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/helpers'

// GET /api/admin/agents
export async function GET(request: NextRequest) {
  try {
    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('is_active')
    const id = searchParams.get('id')

    // If ID is provided, fetch single agent
    if (id) {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch agent', details: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({ agents: [data] })
    }

    // Otherwise, fetch all agents
    let query = supabase
      .from('agents')
      .select('*')
      .order('display_order', { ascending: true })

    if (isActive !== null) {
      query = query.eq('is_active', isActive === 'true')
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch agents', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ agents: data })
  } catch (error) {
    console.error('Agents GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/admin/agents
export async function POST(request: NextRequest) {
  try {
    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const supabase = createAdminClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from('agents')
      .insert(body)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create agent', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { agent: data, message: 'Agent created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Agents POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/agents
export async function PUT(request: NextRequest) {
  try {
    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const supabase = createAdminClient()
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Agent ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update agent', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      agent: data,
      message: 'Agent updated successfully',
    })
  } catch (error) {
    console.error('Agents PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/agents
export async function DELETE(request: NextRequest) {
  try {
    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      )
    }

    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Agent ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete agent', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Agent deleted successfully',
    })
  } catch (error) {
    console.error('Agents DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
