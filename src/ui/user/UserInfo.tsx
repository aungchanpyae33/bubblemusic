import UserProfile from "./UserProfile";
import { createClient } from "@/database/server";
import UserLoginButton from "./UserLoginButton";

async function UserInfo() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? <UserProfile user={user} /> : <UserLoginButton />;
}

export default UserInfo;
