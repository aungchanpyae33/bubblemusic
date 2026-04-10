import type { JwtPayload } from "@supabase/supabase-js";
import UserProfile from "../user/UserProfile";

function AuthLeftSection({ user }: { user: JwtPayload }) {
  return <UserProfile user={user} />;
}

export default AuthLeftSection;
