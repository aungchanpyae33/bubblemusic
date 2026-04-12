"use client";
import type { JwtPayload } from "@supabase/supabase-js";
import ContextMoreOption from "@/Context/ContextMoreOption";
import UserProfileContainer from "../Option/UserOwnProfileOption/UserProfileContainer";
import MoreOption from "../general/MoreOption/MoreOption";
import IconWrapper from "../general/IconWrapper";
import { User } from "lucide-react";

function UserProfile({ user }: { user: JwtPayload }) {
  return (
    <div className=" relative  z-10">
      <ContextMoreOption>
        <MoreOption
          staticDrop={true}
          triggerEl={
            <div className="p-1 flex bg-surface-1  hover:scale-105   active:scale-90 items-center justify-center rounded-full">
              <IconWrapper Icon={User} size="small" />
            </div>
          }
          targetElement={<UserProfileContainer user={user} />}
        />
      </ContextMoreOption>
    </div>
  );
}

export default UserProfile;
