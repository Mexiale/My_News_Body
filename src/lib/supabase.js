import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variables Supabase manquantes : VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont requises (voir .env.example).'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
