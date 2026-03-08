import { supabase } from "../integrations/supabaseClient";

export async function getProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*");

  if (error) throw error;

  return data;
}
