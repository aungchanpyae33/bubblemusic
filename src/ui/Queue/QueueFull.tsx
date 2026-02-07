"use client";
import {
  currentSongPlaylist,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import clsx from "clsx";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import Image from "next/image";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import { useRef } from "react";
import ContextInfoTrack from "../trackComponent/ContextInfoTrack";
import ArtistWrapper from "../general/ArtistWrapper";
import ToolTip from "../general/ToolTip";
import ContextLike from "../trackComponent/ContextLike";
import QueueItemContainer from "./QueueItemContainer";
import { Virtuoso } from "react-virtuoso";
import QueueLoader from "./QueueLoader";
import { motion } from "motion/react";
import VerticalThreeDots from "../general/icon/VerticalThreeDots";
import outputCurrentIndex from "@/lib/OutputCurrentIndex";
import type { ListSongPage } from "@/database/data-types-return";
function QueueFull() {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || [],
  ) as ListSongPage;
  const dataSongId = useSong(
    (state: SongState) => (state.songCu as Record<string, string>).id,
  );
  const scrollRef = useRef<HTMLElement>(null);

  if (!playListArray || !playListArray.songs) return;
  const currendIndex = outputCurrentIndex(
    playListArray.songs.idArray,
    dataSongId,
  );
  const trimArray = playListArray.songs.idArray.slice(currendIndex);

  if (!trimArray?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className=" relative  h-full overflow-hidden flex-1 flex  "
    >
      <QueueLoader queeRef={scrollRef} length={trimArray.length} />
      <div
        className={clsx(
          "overflow-auto relative   no-scrollbar    h-full flex-1 ",
        )}
      >
        <Virtuoso
          scrollerRef={(el) => {
            if (el instanceof HTMLElement) {
              scrollRef.current = el;
            }
          }}
          increaseViewportBy={{ top: 240, bottom: 240 }}
          style={{ height: "100%" }}
          className=" will-change-scroll no-scrollbar"
          totalCount={trimArray.length}
          itemContent={(index) => {
            if (!playListArray || !playListArray.songs) return;
            const id = trimArray[index];
            const item = playListArray.songs.byId[id];
            return (
              <div
                key={item.id}
                data-id={item.id}
                className={clsx(
                  "flex z-50 bg-section gap-x-2 p-1 group hover:bg-surface-2 items-center justify-center",
                )}
              >
                <div className="w-[50px] relative">
                  <div className="size-[50px] group-hover:brightness-75 relative">
                    {item.cover_url && (
                      <Image src={item.cover_url} fill alt="img" sizes="50px" />
                    )}
                  </div>
                  <ToggleElement
                    playlistSong={playListArray}
                    song={item}
                    className="z-10 hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>

                <div className="flex-1 flex-col overflow-hidden flex justify-center">
                  <ToolTip tooltipContent={item.name}>
                    <div className="truncate">{item.name}</div>
                  </ToolTip>

                  <ArtistWrapper artists={item.artists} />
                </div>

                <div className="w-[30px] flex items-center">
                  <ContextInfoTrack
                    id={undefined}
                    source={undefined}
                    song={item}
                  >
                    <ContextLike id={item.song_id}>
                      <MoreOptionContext relative={item.artists}>
                        <MoreOption
                          triggerEl={<VerticalThreeDots />}
                          targetElement={<QueueItemContainer />}
                        />
                      </MoreOptionContext>
                    </ContextLike>
                  </ContextInfoTrack>
                </div>
              </div>
            );
          }}
        />
      </div>
    </motion.div>
  );
}

export default QueueFull;
