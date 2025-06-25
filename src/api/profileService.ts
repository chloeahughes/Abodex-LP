// src/api/profileService.ts
import { supabase } from '@/lib/supabaseClient'

export async function listProfiles() {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw error
  return data           // data is an array of rows
}

export async function addProfile(profile: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .single()

  if (error) throw error
  return data           // data is the inserted row
}
