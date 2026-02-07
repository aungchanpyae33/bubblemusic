import UserProfile from "./UserProfile";
import { createClient } from "@/database/server";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";

async function UserInfo() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <UserProfile user={user} />
  ) : (
    <NoThankYouPreFetchLink href={"/auth/login"}>
      <button className=" bg-surface-1  hover:scale-105   active:scale-90 h-[40px] px-2  border-opacity-15 border border-borderFull rounded-sm flex items-center ">
        ဝင်ရန်
      </button>
    </NoThankYouPreFetchLink>
  );
}

export default UserInfo;
