import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// To use this:
// first set up credentials using the instructions in my-app/.env.example
// then you can import it in files using: 
//      import { supabase } from './utils/supabase';