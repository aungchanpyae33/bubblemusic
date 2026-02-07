"use client";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import type { JwtPayload } from "@supabase/supabase-js";
import UserProfileContainer from "./UserProfileContainer";

function UserProfile({ user }: { user: JwtPayload }) {
  const userName = user.user_metadata.first_name.slice(0, 1);
  return (
    <div className=" relative  z-10">
      <MoreOptionContext>
        <MoreOption
          staticDrop={true}
          triggerEl={
            <div className=" size-[45px] flex bg-surface-1  hover:scale-105   active:scale-90 items-center justify-center rounded-full">
              {userName}
            </div>
          }
          targetElement={<UserProfileContainer user={user} />}
        />
      </MoreOptionContext>
    </div>
  );
}

export default UserProfile;
