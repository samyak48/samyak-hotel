import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = 'https://dmmwddejibjnjhltnzlf.supabase.co'
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbXdkZGVqaWJqbmpobHRuemxmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjg5NDgwNSwiZXhwIjoyMDMyNDcwODA1fQ.2UFoVcY17xlGIhD4cvJJbN14TtDvhwQEVpJ1r1FYixA"
// export const supabase = createClient(supabaseUrl, supabaseKey)


export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
