import Image from "next/image";
import InfoSong from "./InfoSong";
import InfoList from "./InfoList";
import SearchContainer from "../SearchContainer";
import clsx from "clsx";
import { DeviceCheck } from "@/lib/DeviceCheck";
import UnderLineLinkHover from "@/ui/general/UnderLineLinkHover";
import IconWrapper from "@/ui/general/IconWrapper";
import { Folder, User } from "lucide-react";
import type { GetSearchPage } from "@/database/data-types-return";
import type {
  SearchItem,
  SearchSong,
  SongInfo,
} from "../../../../database.types-fest";

function isListInfo(obj: SearchItem | SearchSong): obj is SearchItem {
  return (
    obj &&
    (obj.type === "album" || obj.type === "artist" || obj.type === "playlist")
  );
}

async function TopResult({
  topResult,
}: {
  topResult: GetSearchPage["top_result"];
}) {
  const deviceFromUserAgent = await DeviceCheck();
  if (!topResult) return;
  return (
    <SearchContainer className="bg-section">
      <div className=" max-w-[700px] p-2 px-4  flex flex-col  gap-4 rounded-lg ">
        <h1 className=" text-xl ">Top result</h1>
        <div className=" flex items-center gap-5">
          <div
            className=" lg:w-[170px] rounded overflow-hidden w-[130px] shrink-0   aspect-square  object-cover relative bg-placeholder
              "
          >
            {topResult.cover_url ? (
              <Image
                src={topResult.cover_url}
                priority={true}
                sizes="(min-width: 1024px) 250px, (min-width: 768px) 200px, 180px"
                fill
                alt="singer song"
              />
            ) : topResult.type === "profile" ? (
              <div className=" absolute inset-0 flex items-center justify-center">
                <IconWrapper
                  Icon={User}
                  className="hover:scale-100   active:scale-100 size-[50px]"
                />
              </div>
            ) : topResult.type === "playlist" ? (
              <div className=" absolute inset-0 flex items-center justify-center">
                <IconWrapper
                  Icon={Folder}
                  className="hover:scale-100   active:scale-100 size-[50px]"
                />
              </div>
            ) : null}
          </div>
          <p
            className={clsx("font-black truncate", {
              "text-3xl md:text-5xl lg:text-6xl":
                deviceFromUserAgent === "desktop",
              "text-2xl md:text-4xl lg:text-6xl ":
                deviceFromUserAgent === "mobile" ||
                deviceFromUserAgent === "tablet",
            })}
          >
            <UnderLineLinkHover
              href={`${topResult.type}/${topResult.id}`}
              prefetch={false}
              className=" block leading-relaxed w-full truncate text-start  "
            >
              {topResult.name}
            </UnderLineLinkHover>
          </p>
        </div>
        <div>
          <span className=" border text-base lg:text-lg font-medium p-1 mr-2">
            {topResult.type?.toUpperCase()}
          </span>
          {topResult.type === "track" && (
            <InfoSong songInfo={topResult as SongInfo} />
          )}
          {topResult && isListInfo(topResult) && (
            <InfoList
              type={topResult.type}
              related_id={topResult.related_id}
              related_name={topResult.related_name}
              is_official={topResult.is_official}
            />
          )}
        </div>
      </div>
    </SearchContainer>
  );
}

export default TopResult;
