"use client";
import { useRef } from "react";
import { useSong } from "@/lib/zustand";
import AudioElement from "./audio/AudioElement";
import ToggleButton from "./audio/Toggle/ToggleButton";
import TimeIndicatorDur from "./audio/Time/TimeIndicatorDur";
import AudioDisplayFooter from "./AudioDisplayFooter";
import AudioInfo from "./AudioInfo";
import type { SongDetail, SongState } from "@/lib/zustand";
import AudioFunctionRepeat from "./audio/AudioFunction/AudioFunctionRepeat";
import AudioFunctionShuffle from "./audio/AudioFunction/AudioFunctionShuffle";
import Volume from "./volume/Volume";
import MediaSessionButtonWrapper from "./audio/MediaSessionWrapper/MediaSessionButtonWrapper";
import AudioFunctionButton from "./audio/AudioFunction/AudioFunctionButton";
import AudioFunctionPre from "./audio/AudioFunction/AudioFunctionPre";
import AudioFunctionNext from "./audio/AudioFunction/AudioFunctionNext";
import MediaSessionSeekWrapper from "./audio/MediaSessionWrapper/MediaSessionSeekWrapper";
import AudioFull from "./audioFull/AudioFull";
import FullToggleButton from "./audioFull/FullToggleButton";
import QueueButton from "./audio/QueueButton";
import AudioFooterContainer from "./AudioFooterContainer";
import clsx from "clsx";
import ContextMedia from "@/lib/MediaSource/ContextMedia";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import PlaceHolderToggleState from "./PlaceHolderToggleState";
import ToggleButtonSpaceKey from "./audio/Toggle/ToggleButtonSpaceKey";
import ArtistWrapper from "../general/ArtistWrapper";
import MediaSessionDesWrapper from "./audio/MediaSessionWrapper/MediaSessionDesWrapper";
import PlaceHolderFetchQueue from "./PlaceHolderFetchQueue";
import PlaceHolderTrackUser from "./PlaceHolderTrackUser";
import ToolTip from "../general/ToolTip";
import useMediaSourceBuffer from "@/lib/CustomHooks/useMediaSourceBuffer";
import LoadingAudioPlayer from "../loading/LoadingAudioPlayer";
import MoreOptionStackContext from "../trackComponent/MoreOptionStackContext";
function AudioPlayer({ start }: { start: boolean }) {
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const {
    sege,
    name,
    duration,
    song_time_stamp,
    id,
    song_id,
    is_lyric,
    artists,
    cover_url,
  } = useSong((state: SongState) => state.songCu) as SongDetail;
  const url = useSong(
    (state: SongState) =>
      Object.values(state.songCu as Record<string, string>)[0],
  );

  const {
    loadNextSegment,
    segNum,
    abortController,
    fetching,
    bufferThreshold,
  } = useMediaSourceBuffer(url, sege, song_time_stamp, id!);
  return (
    <ContextMedia
      data={{
        duration,
        abortController,
        fetching,
        segNum,
        song_time_stamp,
        loadNextSegment: loadNextSegment,
        sege,
        bufferThreshold,
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
            <MediaSessionDesWrapper name={name} artists={artists} />
            <PlaceHolderToggleState url={url} id={id}>
              <PlaceHolderFetchQueue />
              <ToggleButtonSpaceKey />
              {/* this is for space key to toggle play and pause */}
            </PlaceHolderToggleState>
            <PlaceHolderTrackUser />
            <MoreOptionStackContext>
              <AudioFull
                url={url}
                id={id}
                duration={duration}
                toggleRef={toggleRef}
              />
            </MoreOptionStackContext>

            <AudioFooterContainer>
              <div className=" w-full sm:w-[25%]   md:w-[25%] max-w-[375px]  flex items-center">
                <AudioDisplayFooter song_cover={cover_url} />
                {/* without it will just changing data for audioinfo */}
                {name && (
                  <div
                    className="flex flex-col overflow-hidden will-change-transform"
                    key={name}
                  >
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

              <div className="max-w-[600px] sm:flex-1 w-fit  flex    ">
                <div className="audioFunctionContainer flex  flex-col flex-1 items-end sm:items-center pr-2 sm:pr-0  justify-center">
                  <div className="upContainer ">
                    <MediaSessionButtonWrapper id={id}>
                      <AudioFunctionButton>
                        {/* in jsx when use arrow and {} , react expect to return elemetn , if it does not have  return ,  implicitly returns void, or undefined, so, react think nothing to render  */}
                        {(playListArray) => {
                          return (
                            // return element
                            <div
                              className="flex gap-2"
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => e.stopPropagation()}
                            >
                              <AudioFunctionShuffle
                                className="text-foreground/70 hover:text-foreground  p-1  sm:inline-block text-sm md:text-base hidden"
                                listSong={playListArray}
                                id={id}
                              />
                              <AudioFunctionPre
                                className="text-foreground/70 hover:text-foreground  p-1  sm:inline-block text-sm md:text-base hidden"
                                id={id}
                                listSong={playListArray}
                              />
                              <ToggleButton className="p-1" />
                              <AudioFunctionNext
                                id={id}
                                listSong={playListArray}
                                className="text-foreground/70 hover:text-foreground  p-1 text-sm md:text-base"
                              />
                              <AudioFunctionRepeat className="text-foreground/70 hover:text-foreground  p-1  sm:inline-block text-sm md:text-base hidden" />
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
