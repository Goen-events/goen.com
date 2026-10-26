import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

const asString = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot: real visitors never see the `company` field. Bots that fill it get a
  // normal-looking success so they don't retry, and nothing is stored.
  if (asString(body.company, 200)) return NextResponse.json({ ok: true });

  const email = asString(body.email, 320).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Upsert on the unique email so signing up twice still reads as a success,
  // with the newer name winning and the original created_at kept.
  const { error } = await supabaseServer()
    .from('signups')
    .upsert({ email, name: asString(body.name, 120) }, { onConflict: 'email' });

  if (error) {
    console.error('[waitlist] could not save signup', error);
    return NextResponse.json({ error: 'Could not save signup' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
