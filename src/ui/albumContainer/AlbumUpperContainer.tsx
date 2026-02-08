import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import AlbumImg from "./AlbumImg";

import InfoList from "../searchPage/topResult/InfoList";
import type { ListSongPage } from "@/database/data-types-return";

async function AlbumUpperContainer({ songs }: { songs: ListSongPage }) {
  const deviceFromUserAgent = await DeviceCheck();

  const is_official_exist = songs?.is_official;
  return (
    <div
      className={clsx("Container bg-section w-full flex  items-center p-5 ", {
        "flex-col":
          deviceFromUserAgent === "mobile" || deviceFromUserAgent === "tablet",
        "gap-4":
          deviceFromUserAgent === "mobile" || deviceFromUserAgent === "tablet",
        "gap-8 md:gap-10 lg:gap-12": deviceFromUserAgent === "desktop",
      })}
    >
      <AlbumImg cover_url={songs.cover_url} type={songs.type} />
      <div
        className={clsx("pt-2 max-w-full space-y-4  truncate flex-1 ", {
          "self-start ":
            deviceFromUserAgent === "mobile" ||
            deviceFromUserAgent === "tablet",
        })}
      >
        <p
          className={clsx("font-black truncate", {
            "text-3xl md:text-5xl lg:text-6xl":
              deviceFromUserAgent === "desktop",
            "text-2xl md:text-4xl lg:text-6xl ":
              deviceFromUserAgent === "mobile" ||
              deviceFromUserAgent === "tablet",
          })}
        >
          {songs.name}
        </p>
        <div className="flex items-center ">
          <span className=" border border-borderFull text-base lg:text-lg font-medium p-1 mr-2">
            {songs.type.toUpperCase()}
          </span>
          <span className=" flex">
            <InfoList
              type={songs.type}
              related_id={songs.related_id}
              related_name={songs.related_name}
              is_official={is_official_exist}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default AlbumUpperContainer;
