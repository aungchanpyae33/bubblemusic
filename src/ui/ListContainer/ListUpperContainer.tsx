import type { ListSongPage } from "@/database/data-types-return";
import type { listInfo } from "../../../database.types-fest";
import type { SongListValue } from "../playlist/playlistOption/ContextSongListContainer";
import clsx from "clsx";
import { DeviceFromUserAgentReturn } from "@/lib/DeviceCheck";
import { _Translator } from "next-intl";
import InfoList from "../searchPage/topResult/InfoList";
import ListImage from "./ListImage";
import ListUpperName from "./ListUpperName";

interface ListUpperContainerProps {
  list: SongListValue | listInfo | ListSongPage;
  device: DeviceFromUserAgentReturn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  l: _Translator<Record<"ListTitle", any>, "ListTitle">;
}

function ListUpperContainer({ list, device, l }: ListUpperContainerProps) {
  return (
    <div
      className={clsx("w-full bg-section flex  items-center p-5 ", {
        "flex-col": device === "mobile" || device === "tablet",
        "gap-4": device === "mobile" || device === "tablet",
        "gap-8 md:gap-10 lg:gap-12": device === "desktop",
      })}
    >
      <ListImage cover_url={list.cover_url} name={list.name} type={list.type} />
      <div
        className={clsx("pt-2 max-w-full space-y-4  truncate flex-1 ", {
          "self-start ": device === "mobile" || device === "tablet",
        })}
      >
        <ListUpperName>{list.name}</ListUpperName>
        <div className="flex items-center ">
          <span className=" border text-base lg:text-lg border-borderFull font-medium p-1 mr-2">
            {l(list.type)}
          </span>
          <span className=" flex">
            <InfoList
              type={list.type}
              related_id={list.related_id}
              related_name={list.related_name}
              is_official={list?.is_official}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ListUpperContainer;
