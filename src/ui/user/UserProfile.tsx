"use client";
import type { JwtPayload } from "@supabase/supabase-js";
import ContextMoreOption from "@/Context/ContextMoreOption";
import UserProfileContainer from "../Option/UserOwnProfileOption/UserProfileContainer";
import MoreOption from "../general/MoreOption/MoreOption";

function UserProfile({ user }: { user: JwtPayload }) {
  const userfistName = user.user_metadata.display_name ?? "";
  const sliceName = userfistName.slice(0, 1);

  return (
    <div className=" relative  z-10">
      <ContextMoreOption>
        <MoreOption
          staticDrop={true}
          triggerEl={
            <div className=" size-[45px] flex bg-surface-1  hover:scale-105   active:scale-90 items-center justify-center rounded-full">
              {sliceName}
            </div>
          }
          targetElement={<UserProfileContainer user={user} />}
        />
      </ContextMoreOption>
    </div>
  );
}

export default UserProfile;
