import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import { ShowBlock, ShowBlockAction, useShowBlock } from "@/lib/zustand";
import { useEffect, useRef } from "react";
import QueueFull from "@/ui/Queue/QueueFull";
import CloseShowBlockBtn from "./CloseShowBlockBtn";
import Image from "next/image";
import ArtistWrapper from "@/ui/general/ArtistWrapper";
import ToolTip from "@/ui/general/ToolTip";

import Queue from "@/ui/Queue/Queue";
import { useDataContext } from "@/Context/ContextMedia";
import ContextContainerHeight from "@/Context/ContextContainerHeight";
import LyricContainer from "../Lyric/LyricContainer";
import LyricPaddingBlock from "../Lyric/LyricPaddingBlock";
function AudioFullUpperWrapper({ children }: { children: React.ReactNode }) {
  const showBlock = useShowBlock((state: ShowBlock) => state.showBlock);
  const setShowBlock = useShowBlock(
    (state: ShowBlockAction) => state.setShowBlock,
  );
  const containerHeightRef = useRef<HTMLDivElement>(null);
  const { name, artists, cover_url } = useDataContext();
  useEffect(() => {
    return () => {
      setShowBlock(undefined);
    };
  }, [setShowBlock]);
  return (
    <ContextContainerHeight containerHeightRef={containerHeightRef}>
      <div
        className=" mx-auto w-[98%] md:w-[90%] flex-1 flex relative overflow-hidden"
        ref={containerHeightRef}
      >
        <div
          className={clsx(
            "lg:items-end will-change-transform relative lg:w-[50%]  gap-2 lg:gap-4 lg:justify-start overflow-hidden flex-col flex    lg:flex-row items-center transition-[transform,opacity] duration-300 lg:scale-100 lg:translate-y-0 lg:opacity-100 justify-between  w-full",
            {
              " scale-100 translate-y-0  opacity-100 ": !showBlock.open,
              " scale-90 -translate-y-10 opacity-0": showBlock.open,
            },
          )}
        >
          <div
            className={clsx(
              " flex items-center justify-center overflow-hidden flex-1 w-full lg:w-auto lg:flex-none",
            )}
          >
            <div className=" w-[80%] aspect-square max-w-[384px] lg:w-[270px] relative h-full  ">
              {children}
            </div>
          </div>
          <div
            className={clsx(
              "min-h-[60px] max-w-fit   flex  items-center self-start lg:self-auto",
            )}
          >
            <div className="flex items-start  p-1 justify-center flex-col ">
              <p className={clsx("text-xl lg:text-2xl")}>{name}</p>

              <ArtistWrapper
                artists={artists}
                className=" text-ink-400  lg:text-xl text-base"
              />
            </div>
          </div>
        </div>
        <div
          className={clsx(
            " bg-section  will-change-transform  left-auto   lg:w-[50%] w-full  inset-0  absolute bg-red-300     shadow-md   transition-transform duration-500",
            {
              "translate-y-0": showBlock.open,
              "translate-y-[103%]": !showBlock.open,
            },
          )}
          tabIndex={-1}
        >
          <div className=" w-full h-full grid-rows-[60px_1fr] grid relative">
            <div
              className={clsx(
                "flex gap-x-3   border-b border-seperate-soft       items-center w-full",
              )}
            >
              <div
                className={clsx(
                  "relative border-b border-seperate-soft  size-[60px]",
                )}
              >
                <Image
                  src={cover_url}
                  alt={`cover art image of song called ${name}`}
                  fill
                  sizes="60px"
                />
              </div>
              <div
                className="flex-1 flex-col  overflow-hidden
              flex justify-center"
              >
                <ToolTip tooltipContent={name}>
                  <div
                    className="truncate
              "
                  >
                    {name}
                  </div>
                </ToolTip>

                <ArtistWrapper artists={artists} />
              </div>
              <CloseShowBlockBtn />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {showBlock.type === "lyric" && showBlock.open && (
                <LyricContainer type={showBlock.type} key={"lyric"} />
              )}
              {showBlock.type === "queue" && showBlock.open && (
                <Queue key="queue" wrapper={QueueFull} />
              )}
            </AnimatePresence>

            <LyricPaddingBlock className=" absolute top-[60px] w-full h-[4px]  bg-section" />
            <LyricPaddingBlock className="absolute bottom-0 w-full h-[4px]  bg-section" />
          </div>
        </div>
      </div>
    </ContextContainerHeight>
  );
}

export default AudioFullUpperWrapper;
