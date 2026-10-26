import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Uses the secret key, which bypasses row level security. `public.signups` has
 * RLS enabled with no policies at all, so this is the only credential that can
 * read or write it — email addresses are unreachable from the browser.
 *
 * Neither variable carries the NEXT_PUBLIC_ prefix, so Next will not inline
 * them into a client bundle. Importing this module from a client component
 * yields undefined, not a leaked key.
 */
export function supabaseServer() {
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SECRET_KEY must be set. See the Environment section of README.md.",
    );
  }

  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
