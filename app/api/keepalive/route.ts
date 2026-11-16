import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

// Free-tier Supabase pauses a project after ~7 days without database activity,
// which silently breaks the waitlist. A daily Vercel cron (vercel.json) hits this
// route and runs one cheap query so the project never goes idle.
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Vercel sends `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is set.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabaseServer()
    .from('signups')
    .select('email', { count: 'exact', head: true });

  if (error) {
    console.error('[keepalive] Supabase query failed', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
