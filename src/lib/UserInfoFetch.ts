import { createClient } from "@/database/server";
import { cache } from "react";

export const userFetch = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data ? data.claims : undefined;
  return user;
});
