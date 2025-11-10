import { supabase } from "../utils/supabase";

export default function TestSupabase() {
  async function handleClick() {
    const { data, error } = await supabase.auth.getSession();
    alert(error ? `Not connected: ${error.message}` : "Connected to Supabase!");
    console.log("Supabase response:", { data, error });
  }
  return <button onClick={handleClick}>Test Supabase</button>;
}
