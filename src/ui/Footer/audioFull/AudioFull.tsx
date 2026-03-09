import { useMediaAudioFullContext } from "@/lib/MediaSource/ContextMediaAudioFull";
import { useRef } from "react";
import AudioFunctionButton from "../audio/AudioFunction/AudioFunctionButton";
import AudioFunctionShuffle from "../audio/AudioFunction/AudioFunctionShuffle";
import AudioFunctionPre from "../audio/AudioFunction/AudioFunctionPre";
import AudioFunctionNext from "../audio/AudioFunction/AudioFunctionNext";
import ToggleButton from "../audio/Toggle/ToggleButton";
import AudioFunctionRepeat from "../audio/AudioFunction/AudioFunctionRepeat";
import TimeIndicatorDur from "../audio/Time/TimeIndicatorDur";
import AudioSeekBar from "../audio/SliderUi/AudioSeekBar";
import TimeIndicatorCur from "../audio/Time/TimeIndicatorCur";
import AudioFullInfoWrapper from "./AudioFullInfoWrapper";
import Volume from "../volume/Volume";
import AudioCurImg from "./AudioCurImg";
import { X } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";
import FocusTrap from "./FocusTrap";
import LyricToggleBtn from "./LyricToggleBtn";
import QueueToggle from "./QueueToggle";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";
import useCloseFunctoionStack from "@/lib/CustomHooks/useCloseFunctionStack";

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
                  <div className="mx-auto w-[90%] h-[55px] min-h-[55px] max-h-[55px]  flex items-center sticky top-0">
                    <button
                      className="  transition-colors  duration-200 bg-surface-1 hover:bg-surface-2 p-1 rounded-full flex items-center justify-center"
                      onClick={() => {
                        toggleRef.current?.focus();
                        setOpen(!open);
                      }}
                    >
                      <IconWrapper size="large" Icon={X} />
                    </button>
                  </div>

                  <AudioFullInfoWrapper>
                    <AudioCurImg />
                  </AudioFullInfoWrapper>
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
                          {/* in jsx when use arrow and {} , react expect to return elemetn , if it does not have  return ,  implicitly returns void, or undefined, so, react think nothing to render  */}
                          {(playListArray) => (
                            // return element
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
