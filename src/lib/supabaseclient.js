// lib/supabaseClient.js or in a top-level utils file
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gttvhadmroffvyscotjr.supabase.co'
const supabaseKey = 'your-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0dHZoYWRtcm9mZnZ5c2NvdGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3OTIyNTAsImV4cCI6MjA2NjM2ODI1MH0.InaM3k96KFBjsChkwAK5FZcByDMipBpbcF-GKd_T4ZU-public-key'
export const supabase = createClient(supabaseUrl, supabaseKey)
