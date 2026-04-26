"use client";
import { useRef } from "react";
import { useSong } from "@/lib/zustand";
import ToggleButton from "../AudioActionRelatedUI/Toggle/ToggleButton";
import AudioDisplayFooter from "./AudioDisplayFooter";
import AudioInfo from "./AudioInfo";
import type { SongDetail, SongState } from "@/lib/zustand";
import AudioFunctionRepeat from "../AudioActionRelatedUI/AudioFunction/AudioFunctionRepeat";
import AudioFunctionShuffle from "../AudioActionRelatedUI/AudioFunction/AudioFunctionShuffle";
import Volume from "../general/volume/Volume";
import MediaSessionButtonWrapper from "../AudioActionRelatedUI/MediaSessionWrapper/MediaSessionButtonWrapper";
import AudioFunctionButton from "../AudioActionRelatedUI/AudioFunction/AudioFunctionButton";
import AudioFunctionPre from "../AudioActionRelatedUI/AudioFunction/AudioFunctionPre";
import AudioFunctionNext from "../AudioActionRelatedUI/AudioFunction/AudioFunctionNext";
import MediaSessionSeekWrapper from "../AudioActionRelatedUI/MediaSessionWrapper/MediaSessionSeekWrapper";
import AudioFooterContainer from "./AudioFooterContainer";
import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import ArtistWrapper from "../general/ArtistWrapper";
import MediaSessionDesWrapper from "../AudioActionRelatedUI/MediaSessionWrapper/MediaSessionDesWrapper";
import ToolTip from "../general/ToolTip";
import useMediaSourceBuffer from "@/lib/CustomHooks/useMediaSourceBuffer";
import LoadingAudioPlayer from "../loading/LoadingAudioPlayer";
import ContextMedia from "@/Context/ContextMedia";
import PlaceHolderToggleState from "@/Placeholder/PlaceHolderToggleState";
import PlaceHolderFetchQueue from "@/Placeholder/PlaceHolderFetchQueue";
import PlaceHolderTrackUser from "@/Placeholder/PlaceHolderTrackUser";
import PlaceholderToggleButtonSpaceKey from "@/Placeholder/PlaceholderToggleButtonSpaceKey";
import AudioFull from "../AudioFullUI/AudioFull";
import QueueButton from "../Queue/QueueButton";
import FullToggleButton from "../AudioFullUI/FullToggleButton";
import AudioElement from "../AudioActionRelatedUI/AudioElement";
import TimeIndicatorDur from "../AudioActionRelatedUI/Time/TimeIndicatorDur";
function AudioPlayer({ start }: { start: boolean }) {
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const { name, duration, id, song_id, is_lyric, artists, cover_url } = useSong(
    (state: SongState) => state.songCu,
  ) as SongDetail;
  const url = useSong(
    (state: SongState) =>
      Object.values(state.songCu as Record<string, string>)[0],
  );

  useMediaSourceBuffer(url);
  return (
    <ContextMedia
      data={{
        duration,
        song_id,
        id,
        is_lyric,
        name,
        artists,
        cover_url,
      }}
    >
      <AnimatePresence>
        {url && start ? (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={clsx(
              "w-full will-change-transform bg-section    relative flex   h-[70px]",
            )}
          >
            <MediaSessionDesWrapper
              name={name}
              artists={artists}
              cover_url={cover_url}
            />
            <PlaceHolderToggleState url={url} id={id}>
              <PlaceHolderFetchQueue />
              <PlaceholderToggleButtonSpaceKey />
              {/* this is for space key to toggle play and pause */}
            </PlaceHolderToggleState>
            <PlaceHolderTrackUser />

            <AudioFull
              url={url}
              id={id}
              duration={duration}
              toggleRef={toggleRef}
            />

            <AudioFooterContainer>
              <div className=" w-full sm:w-[25%]   md:w-[25%] max-w-[375px]  flex items-center">
                <AudioDisplayFooter song_cover={cover_url} />
                {/* without it will just changing data for audioinfo */}
                {name && (
                  <div className="flex flex-col overflow-hidden" key={name}>
                    <AudioInfo
                      el={
                        <ToolTip tooltipContent={name}>
                          <span>{name}</span>
                        </ToolTip>
                      }
                    />
                    <AudioInfo
                      el={
                        <div className=" truncate">
                          <ArtistWrapper artists={artists} />
                        </div>
                      }
                    />
                  </div>
                )}
              </div>

              <div className="max-w-[600px] sm:flex-1 w-fit  flex">
                <div className="flex  flex-col flex-1 items-end sm:items-center pr-2 sm:pr-0  justify-center">
                  <div className="">
                    <MediaSessionButtonWrapper id={id}>
                      <AudioFunctionButton>
                        {/* in jsx when use arrow and {} , react expect to return elemetn , if it does not have  return ,  implicitly returns void, or undefined, so, react think nothing to render  */}
                        {(playListArray) => {
                          return (
                            // return element
                            <div
                              className="flex w-full h-full gap-2"
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => e.stopPropagation()}
                            >
                              <AudioFunctionShuffle
                                className="text-foreground/70 hover:text-foreground aspect-square   sm:flex sm:items-center sm:justify-center text-sm md:text-base hidden"
                                listSong={playListArray}
                                id={id}
                              />
                              <AudioFunctionPre
                                className="text-foreground/70 hover:text-foreground    sm:inline-block text-sm md:text-base hidden"
                                id={id}
                                listSong={playListArray}
                              />
                              <ToggleButton className="p-1" />
                              <AudioFunctionNext
                                id={id}
                                listSong={playListArray}
                                className="text-foreground/70 hover:text-foreground  p-1 text-sm md:text-base"
                              />
                              <AudioFunctionRepeat className="text-foreground/70 hover:text-foreground aspect-square   sm:flex sm:items-center sm:justify-center text-sm md:text-base hidden" />
                            </div>
                          );
                        }}
                      </AudioFunctionButton>
                    </MediaSessionButtonWrapper>
                  </div>
                  <div className="BottomContainer  w-full absolute sm:static top-0 left-0 ">
                    <MediaSessionSeekWrapper duration={duration}>
                      <AudioElement url={url} isFull={false}>
                        <TimeIndicatorDur
                          duration={duration}
                          className="text-sm  w-[5rem] text-center hidden sm:inline"
                        />
                      </AudioElement>
                    </MediaSessionSeekWrapper>
                  </div>
                </div>
              </div>
              <div
                className="w-[20%] px-2 md:w-[25%] hidden max-w-[375px] sm:flex  items-center"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <div className="w-full sm:flex  gap-3 relative  items-center justify-around">
                  <QueueButton />
                  <Volume isFull={false} />
                  <FullToggleButton ref={toggleRef} />
                </div>
              </div>
            </AudioFooterContainer>
          </motion.div>
        ) : (
          <LoadingAudioPlayer />
        )}
      </AnimatePresence>
    </ContextMedia>
  );
}

export default AudioPlayer;
