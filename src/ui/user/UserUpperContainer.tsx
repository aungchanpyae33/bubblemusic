import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import OfficialBadgeName from "../albumContainer/OfficialBadgeName";
import UserImg from "./UserImg";
import type { listInfo } from "../../../database.types-fest";
import { getTranslations } from "next-intl/server";

async function UserUpperContainer({ profile }: { profile: listInfo }) {
  const l = await getTranslations("ListTitle");
  const deviceFromUserAgent = await DeviceCheck();

  const is_official_exist = profile?.is_official;
  return (
    <div
      className={clsx("Container w-full flex bg-section items-center p-5 ", {
        "flex-col":
          deviceFromUserAgent === "mobile" || deviceFromUserAgent === "tablet",
        "gap-4":
          deviceFromUserAgent === "mobile" || deviceFromUserAgent === "tablet",
        "gap-8 md:gap-10 lg:gap-12": deviceFromUserAgent === "desktop",
      })}
    >
      <UserImg cover_url={profile.cover_url} />
      <div
        className={clsx("pt-2 max-w-full space-y-4  truncate flex-1 ", {
          "self-start ":
            deviceFromUserAgent === "mobile" ||
            deviceFromUserAgent === "tablet",
        })}
      >
        <p className="font-black truncate text-2xl md:text-3xl lg:text-4xl">
          {profile.name}
          {is_official_exist && <OfficialBadgeName />}
        </p>
        <div className="flex items-center ">
          <span className=" border border-borderFull text-base lg:text-lg font-medium p-1 mr-2">
            {l(profile.type)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserUpperContainer;
