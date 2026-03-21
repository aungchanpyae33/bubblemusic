import { useRef } from "react";
import AudioFunctionButton from "../AudioActionRelatedUI/AudioFunction/AudioFunctionButton";
import AudioFunctionShuffle from "../AudioActionRelatedUI/AudioFunction/AudioFunctionShuffle";
import AudioFunctionPre from "../AudioActionRelatedUI/AudioFunction/AudioFunctionPre";
import AudioFunctionNext from "../AudioActionRelatedUI/AudioFunction/AudioFunctionNext";
import ToggleButton from "../AudioActionRelatedUI/Toggle/ToggleButton";
import AudioFunctionRepeat from "../AudioActionRelatedUI/AudioFunction/AudioFunctionRepeat";
import AudioSeekBar from "../general/SliderUi/AudioSeekBar";
import Volume from "../general/volume/Volume";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import useCloseFunctoionStack from "@/lib/CustomHooks/useCloseFunctionStack";
import FullCloseBtn from "./FullCloseBtn";
import FullThreeDots from "./FullThreeDots";
import AudioFullUpperWrapper from "./AudioFullUpperWrapper";
import AudioFullImg from "./AudioFullImg";
import { useMediaAudioFullContext } from "@/Context/ContextMediaAudioFull";
import FocusTrap from "../general/FocusTrap";
import TimeIndicatorCur from "../AudioActionRelatedUI/Time/TimeIndicatorCur";
import TimeIndicatorDur from "../AudioActionRelatedUI/Time/TimeIndicatorDur";
import LyricToggleBtn from "../Lyric/LyricToggleBtn";
import QueueToggle from "../Queue/QueueToggle";

function AudioFull({
  url,
  id,
  duration,
  toggleRef,
}: {
  url: string;
  id: string;
  duration: number;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const { open, setOpen } = useMediaAudioFullContext();
  const refFocus = useRef<HTMLDivElement | null>(null);

  useCloseFunctoionStack(open, setOpen, toggleRef);
  return (
    <AnimatePresence>
      {open && (
        <>
          {createPortal(
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                y: {
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 0.6,
                },
              }}
              className="fixed will-change-transform inset-0 z-50"
            >
              <FocusTrap refFocus={refFocus}>
                <div
                  className="w-full h-full  flex flex-col items-center justify-center bg-background relative"
                  ref={refFocus}
                >
                  <div className="mx-auto  w-[90%] h-[55px] min-h-[55px] max-h-[55px]  flex items-center justify-between sticky top-0">
                    <FullCloseBtn setOpen={setOpen} toggleRef={toggleRef} />
                    <FullThreeDots />
                  </div>

                  <AudioFullUpperWrapper>
                    <AudioFullImg />
                  </AudioFullUpperWrapper>
                  <div className=" h-[20%]  p-2  shrink-0  w-[98%] md:w-[90%]  rounded-md  inset-x-0 mx-auto sticky bottom-0">
                    <div className="audioFunctionContainer  flex  flex-col flex-1 h-full gap-y-10 items-center justify-center">
                      <div className="BottomContainer w-full static top-0 left-0 items-center ">
                        <div className="  w-full flex items-center relative">
                          <AudioSeekBar
                            isFull={true}
                            url={url}
                            hideSliderInSmScreen={false}
                            childrenFn={(value) => (
                              <TimeIndicatorCur
                                value={value}
                                duration={duration}
                                className="text-sm md:text-base  w-fit md:w-[5rem] text-start md:static md:left-auto md:bottom-auto md:translate-y-0  absolute left-0 bottom-0 translate-y-full"
                              />
                            )}
                            duration={duration}
                            key={url}
                            className="hidden"
                          />
                          <TimeIndicatorDur
                            duration={duration}
                            className="text-sm md:text-base w-fit md:w-[5rem] text-end md:static md:right-auto md:bottom-auto md:translate-y-0 absolute right-0 bottom-0 translate-y-full "
                          />
                        </div>
                      </div>
                      <div className="upContainer w-full flex justify-center md:justify-between">
                        <div className=" md:flex w-[20%] max-w-[250px]  items-center">
                          <LyricToggleBtn />
                        </div>
                        <AudioFunctionButton>
                          {(playListArray) => (
                            <div
                              className="flex flex-1  justify-center gap-5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <AudioFunctionShuffle
                                className="text-foreground/70 hover:text-foreground p-2  md:text-base text-2xl"
                                listSong={playListArray}
                                id={id}
                              />
                              <AudioFunctionPre
                                id={id}
                                listSong={playListArray}
                                className="text-foreground/70 hover:text-foreground p-2  md:text-base text-2xl"
                              />
                              <ToggleButton className="p-1" />
                              <AudioFunctionNext
                                id={id}
                                listSong={playListArray}
                                className="text-foreground/70 hover:text-foreground p-2"
                              />
                              <AudioFunctionRepeat className="text-foreground/70 hover:text-foreground p-2  md:text-base text-2xl" />
                            </div>
                          )}
                        </AudioFunctionButton>
                        <div className="flex   relative w-[20%] gap-x-3 max-w-[250px] items-center justify-end">
                          <QueueToggle />
                          <span className=" hidden md:inline">
                            <Volume isFull={true} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FocusTrap>
            </motion.div>,
            document.body,
          )}
        </>
      )}
    </AnimatePresence>
  );
}

export default AudioFull;
