import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../../database.types-fest";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}
export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);
