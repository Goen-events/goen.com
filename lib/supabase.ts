import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for the landing page.
 *
 * Uses the publishable key. `public.signups` has RLS enabled with no policies
 * and no table grants, so this key cannot read or write it directly; it can
 * only call the `join_waitlist(p_email, p_name)` function, which inserts or
 * refreshes one signup. Email addresses stay unreadable from outside the
 * Supabase dashboard.
 *
 * Neither variable carries the NEXT_PUBLIC_ prefix, so Next will not inline
 * them into a client bundle.
 */
export function supabaseServer() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set. See the Environment section of README.md.",
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
