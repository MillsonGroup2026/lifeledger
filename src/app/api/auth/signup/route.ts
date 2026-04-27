import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase/types'

export async function POST(req: NextRequest) {
  const { name, email, password, householdName } = await req.json()

  const cookieStore = await cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    }
  )

  // Create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  })

  if (authError || !authData.user) {
    return NextResponse.json({ error: authError?.message ?? 'Signup failed' }, { status: 400 })
  }

  // Use service role to create household (bypasses RLS) — no generic, admin client
  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: household, error: hhError } = await admin
    .from('households')
    .insert({ name: householdName })
    .select()
    .single()

  if (hhError || !household) {
    return NextResponse.json({ error: 'Could not create household' }, { status: 500 })
  }

  await admin.from('household_members').insert({
    user_id: authData.user.id,
    household_id: household.id,
    role: 'owner',
    nickname: name.split(' ')[0],
  })

  return NextResponse.json({ ok: true })
}
