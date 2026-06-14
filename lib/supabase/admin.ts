import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Privileged, server-only Supabase client using the service-role key.
 * Bypasses RLS — never import this into client code.
 * Returns null if Supabase env vars are not configured (e.g. local dev
 * before keys are set), so callers can degrade gracefully.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
