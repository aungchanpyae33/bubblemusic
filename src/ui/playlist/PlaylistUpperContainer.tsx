"use client";
import clsx from "clsx";
import { useContext } from "react";
import { SongListContext } from "./playlistOption/ContextSongListContainer";
import AlbumImg from "../albumContainer/AlbumImg";
import InfoList from "../searchPage/topResult/InfoList";
import type { ListSongPage } from "@/database/data-types-return";
import { DeviceContext } from "@/lib/DeviceContext/ContextDeviceCheck";

function PlaylistUpperContainer() {
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
      <AlbumImg cover_url={cover_url} type={type} />
      <div
        className={clsx("pt-2 max-w-full space-y-4  truncate flex-1 ", {
          "self-start ": device === "mobile" || device === "tablet",
        })}
      >
        <p
          className={clsx("font-black truncate", {
            "text-3xl md:text-5xl lg:text-6xl": device === "desktop",
            "text-2xl md:text-4xl lg:text-6xl ":
              device === "mobile" || device === "tablet",
          })}
        >
          {name}
        </p>
        <div className="flex items-center ">
          <span className=" border text-base lg:text-lg border-borderFull font-medium p-1 mr-2">
            {type.toUpperCase()}
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
