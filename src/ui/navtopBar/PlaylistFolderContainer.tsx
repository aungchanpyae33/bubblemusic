import React, { SetStateAction, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserLibClient } from "@/database/client-data";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import Image from "next/image";
import IconWrapper from "../general/IconWrapper";
import { Folder } from "lucide-react";
import { Virtuoso } from "react-virtuoso";
import PlaylistFolderContainerLoader from "./PlaylistFolderContainerLoader";

function PlaylistFolderContainer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  const scrollRef = useRef<HTMLElement>(null);
  const { data, error } = queryData || {};
  if (!data || error || queryError) return;
  const { userLib } = data;
  if (!userLib) return;
  return (
    <div className=" relative  w-full h-full overflow-hidden">
      <PlaylistFolderContainerLoader
        scrollRef={scrollRef}
        length={userLib.idArray.length}
      />
      <div className=" w-full h-full will-change-scroll overflow-auto  ">
        <Virtuoso
          scrollerRef={(el) => {
            if (el instanceof HTMLElement) {
              scrollRef.current = el;
            }
          }}
          increaseViewportBy={{ top: 240, bottom: 240 }}
          style={{ height: "100%" }}
          className=" will-change-scroll"
          totalCount={userLib.idArray.length}
          itemContent={(index) => {
            const id = userLib.idArray[index];
            const item = userLib.byId[id];
            return (
              <div
                key={item.id}
                className="p-2 hover:bg-[#333333] bg-[#0A0A0A]"
              >
                <NoThankYouPreFetchLink
                  href={`/${item.type}/${item.id}`}
                  className=" h-[50px] leading-relaxed  flex items-center gap-x-2"
                  onClick={() => setOpen(false)}
                >
                  <div className="size-[50px] bg-[#333333] relative  cursor-pointer">
                    {item.cover_url ? (
                      <Image
                        src={item.cover_url}
                        fill
                        alt="image"
                        sizes="50px"
                      />
                    ) : item.type === "playlist" ? (
                      <div className=" absolute inset-0 flex items-center justify-center">
                        <IconWrapper
                          Icon={Folder}
                          className="hover:scale-100   active:scale-100 size-[30px]"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className=" flex-1  truncate pr-2">{item.name}</div>
                </NoThankYouPreFetchLink>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

export default PlaylistFolderContainer;
