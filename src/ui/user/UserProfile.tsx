"use client";
import { ReactNode } from "react";
import { clsx } from "clsx";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";

function UserProfile({
  name,
  children,
}: {
  name: string | null | undefined;
  children: ReactNode;
}) {
  const userName = name && name.slice(0, 1);
  return (
    <div className=" relative  z-10">
      <MoreOptionContext>
        <MoreOption
          triggerEl={
            <div className=" size-[45px] flex bg-surface-1  hover:scale-105   active:scale-90 items-center justify-center rounded-full">
              {userName}
            </div>
          }
          targetElement={
            <div className={clsx("")}>
              <div className="p-2 flex  gap-x-3  border-b-[1px] border-gray-700">
                <div>icon</div>
                <div className="truncate">
                  <div className=" truncate select-all">{name}</div>
                  <div className=" select-all truncate">@aungchanpyae3304</div>
                </div>
              </div>
              {children}
            </div>
          }
        />
      </MoreOptionContext>
    </div>
  );
}

export default UserProfile;
