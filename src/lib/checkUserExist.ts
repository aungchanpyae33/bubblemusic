import { Supabase } from "@/database/data";

export async function checkUserExist(supabase: Supabase) {
  const { data } = await supabase.auth.getClaims();
  const user = data ? data.claims : undefined;
  if (!user) {
    const error = new Error("not-authenticated");
    throw error;
  }
  return user;
}
