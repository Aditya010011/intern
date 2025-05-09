
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jobmuzjvpqnynrbrrqnq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYm11emp2cHFueW5yYnJycW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2Nzk3MjAsImV4cCI6MjA2MjI1NTcyMH0.yASQlWz5oz789DDuu1RGdhFEtUm0Fjf-CfNE7i6KWzY';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key must be defined in environment variables');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
