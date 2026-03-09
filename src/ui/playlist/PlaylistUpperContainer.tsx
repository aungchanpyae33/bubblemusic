"use client";
import clsx from "clsx";
import { useContext } from "react";
import { SongListContext } from "./playlistOption/ContextSongListContainer";
import AlbumImg from "../albumContainer/AlbumImg";
import InfoList from "../searchPage/topResult/InfoList";
import type { ListSongPage } from "@/database/data-types-return";
import { DeviceContext } from "@/lib/DeviceContext/ContextDeviceCheck";
import { useTranslations } from "next-intl";

function PlaylistUpperContainer() {
  const l = useTranslations("ListTitle");
  const { device } = useContext(DeviceContext);
  const { name, type, cover_url, is_official, related_id, related_name } =
    useContext(SongListContext) as ListSongPage;
  return (
    <div
      className={clsx("Container w-full bg-section flex  items-center p-5 ", {
        "flex-col": device === "mobile" || device === "tablet",
        "gap-4": device === "mobile" || device === "tablet",
        "gap-8 md:gap-10 lg:gap-12": device === "desktop",
      })}
    >
      <AlbumImg cover_url={cover_url} />
      <div
        className={clsx("pt-2 max-w-full space-y-4  truncate flex-1 ", {
          "self-start ": device === "mobile" || device === "tablet",
        })}
      >
        <p className="font-black truncate text-2xl md:text-3xl lg:text-4xl">
          {name}
        </p>
        <div className="flex items-center ">
          <span className=" border text-base lg:text-lg border-borderFull font-medium p-1 mr-2">
            {l(type)}
          </span>
          <span className=" flex">
            <InfoList
              type={type}
              related_id={related_id}
              related_name={related_name}
              is_official={is_official}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlaylistUpperContainer;
