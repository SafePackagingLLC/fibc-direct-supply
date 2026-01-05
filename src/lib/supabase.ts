import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jnfnlxtjdhkmafydlrsg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZm5seHRqZGhrbWFmeWRscnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NDI3ODMsImV4cCI6MjA4MzExODc4M30.vwLGHJkDW0xFkCGBP9q6jE3fRa_GMGq5nqoqGUIS7HY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
