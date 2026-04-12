"use client";
import {
  currentSongPlaylist,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { Virtuoso } from "react-virtuoso";
import outputCurrentIndex from "@/lib/OutputCurrentIndex";
import type { ListSongPage } from "@/database/data-types-return";
import QueueItemSong from "./QueueItemSong";
import VirtuosoLoaderSingleItemList from "../general/VirtuosoLoader/VirtuosoLoaderSingleItemList";

function Queue({
  wrapper: Wrapper = React.Fragment,
}: {
  wrapper: React.ComponentType<{ children: ReactNode }>;
}) {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || [],
  ) as ListSongPage;

  const dataSongId = useSong(
    (state: SongState) => (state.songCu as Record<string, string>).id,
  );

  if (!playListArray || !playListArray.songs) return;

  const currendIndex = outputCurrentIndex(
    playListArray.songs.idArray,
    dataSongId,
  );
  const trimArray = playListArray.songs.idArray.slice(currendIndex);

  if (!trimArray?.length) return null;
  return (
    <Wrapper>
      <VirtuosoLoaderSingleItemList length={trimArray.length} />

      <div className={clsx("relative h-full  flex-1 ")}>
        <Virtuoso
          increaseViewportBy={{ top: 240, bottom: 240 }}
          style={{ height: "100%" }}
          className=" will-change-scroll scroll-container"
          fixedItemHeight={64}
          overscan={5}
          defaultItemHeight={64}
          totalCount={trimArray.length}
          itemContent={(index) => {
            if (!playListArray || !playListArray.songs) return;
            const id = trimArray[index];
            const item = playListArray.songs.byId[id];
            return (
              <QueueItemSong
                className="bg-section"
                listSong={playListArray}
                song={item}
                key={item.id}
              />
            );
          }}
        />
      </div>
    </Wrapper>
  );
}

export default Queue;
