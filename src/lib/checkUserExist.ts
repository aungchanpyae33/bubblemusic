import { Supabase } from "@/database/data";

export async function checkUserExist(supabase: Supabase) {
  const { data } = await supabase.auth.getClaims();
  const user = data ? data.claims : undefined;
  if (!user) {
    const err = new Error("no_authenticated");
    err.name = "custom_auth_error";
    throw err;
  }
  return user;
}
