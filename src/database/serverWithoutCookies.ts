// this will be used by not application user request
import { createServerClient } from "@supabase/ssr";
import type { Database } from "../../database.types-fest";

// no set cookies
export function createClientWithoutCookies() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // do nothing
        },
      },
    },
  );
}
