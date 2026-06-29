import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a Supabase client for browser-side use.
 * Uses the anon (public) key - respects Row Level Security.
 * For Realtime subscriptions and REST API calls from client components.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
