import { createClient } from '@supabase/supabase-js';

// Client-side: only use NEXT_PUBLIC_ variables which are exposed to browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
if (!supabaseAnonKey) throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');

// Client-side Supabase client (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side: only initialize this on server
let supabaseServerInstance: any = null;

export const getSupabaseServer = () => {
  if (typeof window === 'undefined' && !supabaseServerInstance) {
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseServiceRoleKey) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    }
    supabaseServerInstance = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  return supabaseServerInstance;
};

// Export for backward compatibility, but will only work on server
export const supabaseServer = typeof window === 'undefined' ? getSupabaseServer() : null as any;
