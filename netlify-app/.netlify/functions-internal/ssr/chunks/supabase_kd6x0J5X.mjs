import { createClient } from '@supabase/supabase-js';

const url = "https://fixcrytrbzkhuvzcsldw.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpeGNyeXRyYnpraHV2emNzbGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NTkyMjAsImV4cCI6MjA4NTQzNTIyMH0.R6SUXwMjrCaVIFguiBb3GAiudFxrW0wAmABpb5ddxlU";
const supabase = createClient(url, anonKey);

export { supabase as s };
