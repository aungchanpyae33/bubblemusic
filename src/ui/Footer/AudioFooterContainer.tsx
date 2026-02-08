import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import clsx from "clsx";
import { useContext, useRef } from "react";

function AudioFooterContainer({ children }: { children: React.ReactNode }) {
  const initialRef = useRef<HTMLElement | null>(null);
  const { open, setOpen } = useContext(Context);
  return (
    // <div className="cursor-not-allowed">
    // in chrome , when use top-0 and -translate-x- that is close and bigger the parent height make a little edge between , not found in firefox , use -top parent height
    <div
      className={clsx(
        "w-full h-full bg-red-950  border-t border-seperate-soft ",
      )}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setOpen(!open);
        }
      }}
      // to track initial click elemet , without this  check , if user click the button then hold and release the container that does not have e.stopP will trigger the parent onClick ,
      onPointerDown={(e) => {
        console.log("again");
        initialRef.current = e.target as HTMLElement;
      }}
      onClick={(e) => {
        if (e.target === initialRef.current) {
          console.log("hiel");
          setOpen(!open);
        }
      }}
    >
      <div
        className={clsx(
          " w-full h-full flex gap-4 sm:gap-5 md:gap-6 bg-section  lg:gap-10 justify-between",
          {},
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default AudioFooterContainer;
