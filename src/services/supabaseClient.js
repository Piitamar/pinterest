import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zvdabfyedpwhifjqggac.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZGFiZnllZHB3aGlmanFnZ2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxOTc0NjAsImV4cCI6MjA5NDc3MzQ2MH0.X62Fn2YsiwACS0g3aiD48KYGPAa0ILkxeAkKTLF0mQA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 