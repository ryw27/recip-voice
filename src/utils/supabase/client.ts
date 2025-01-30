import { createClient } from '@supabase/supabase-js'


const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseURL || !supabaseAnonKey || !supabaseServiceKey) {
    throw new Error("Missing supabase keys");
}

export const supabase = createClient(
    supabaseURL, 
    supabaseAnonKey
);
